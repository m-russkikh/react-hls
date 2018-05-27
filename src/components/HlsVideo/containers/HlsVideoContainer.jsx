import React, { Component } from 'react';
import Hls from 'hls.js';

import { formatTime } from '../../../utils';
import { HlsVideoContainerPropType } from '../propTypes';
import '../styles/hls-video.scss';


class HlsVideoContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCanPlay = this.handleCanPlay.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  componentDidMount() {
    if (!Hls.isSupported()) {
      console.error('Hls is not supported!');
      return;
    }

    this.hls = new Hls();
    this.hls.attachMedia(this.videoElement);
    this.hls.on(Hls.Events.MEDIA_ATTACHED, this.onMediaAttached);
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed);
    this.hls.on(Hls.Events.ERROR, this.onHlsError);

    this.handleVideoListeners();

    this.setVolume();
    this.setMuteStatus();
  }

  componentDidUpdate(prevProps) {
    const { isPlaying, volume, isMuted } = this.props;
    const { isPlaying: isPlayingPrev, volume: volumePrev, isMuted: isMutedPrev } = prevProps;

    if (isPlaying !== isPlayingPrev) {
      this.videoElement[isPlaying ? 'play' : 'pause']();
    }

    if (volume !== volumePrev) {
      this.setVolume();
    }

    if (isMuted !== isMutedPrev) {
      this.setMuteStatus();
    }
  }

  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }

    this.videoElement.removeEventListener('canplay', this.handleCanPlay);
    this.videoElement.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.videoElement.removeEventListener('ended', this.handleEnded);
  }

  onMediaAttached = () => {
    this.hls.loadSource(this.props.source);
  };

  onManifestParsed = () => {
    this.hls.startLoad();
  };

  onHlsError = (event, data) => {
    console.log('error with HLS...', data.type);
  }

  setVolume = () => {
    this.videoElement.volume = this.props.volume / 100;
  };

  setMuteStatus = () => {
    this.videoElement.muted = this.props.isMuted;
  };

  handleClick = () => {
    const { isPlaying, changePlaybackStatus } = this.props;

    changePlaybackStatus(!isPlaying);
  };

  handleCanPlay() {
    this.props.canPlay(true);
  }

  handleEnded() {
    this.props.changePlaybackStatus(false);
  }

  handleTimeUpdate(e) {
    const currentTime = formatTime(e.currentTarget.currentTime);

    this.props.changeCurrentTime(currentTime);
  }

  handleVideoListeners = () => {
    this.videoElement.addEventListener('canplay', this.handleCanPlay);
    this.videoElement.addEventListener('timeupdate', this.handleTimeUpdate);
    this.videoElement.addEventListener('ended', this.handleEnded);
  };

  render() {
    return (
      <video
        className="video"
        onClick={this.handleClick}
        ref={(video) => { this.videoElement = video; }}
      />
    );
  }
}

HlsVideoContainer.propTypes = HlsVideoContainerPropType;

export default HlsVideoContainer;
