import React, { Component } from 'react';
import Hls from 'hls.js';

import { formatTime } from '../../../utils';
import { HlsVideoContainerPropType } from '../propTypes';
import '../styles/hls-video.scss';


class HlsVideoContainer extends Component {
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
  }

  componentDidUpdate(prevProps) {
    const { isPlaying, volume, isMuted } = this.props;
    const { isPlayingPrev, volumePrev, isMutedPrev } = prevProps;

    if (isPlaying !== isPlayingPrev) {
      this.videoElement[isPlaying ? 'play' : 'pause']();
    }

    if (volume !== volumePrev) {
      this.videoElement.volume = volume / 100;
    }

    if (isMuted !== isMutedPrev) {
      this.videoElement.muted = isMuted;
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

  handleCanPlay = () => {
    this.props.canPlay(true);
  };

  handleClick = () => {
    const { isPlaying, changePlaybackStatus } = this.props;

    changePlaybackStatus(!isPlaying);
  };

  handleEnded = () => {
    this.props.changePlaybackStatus(false);
  };

  handleTimeUpdate = (e) => {
    const currentTime = formatTime(e.currentTarget.currentTime);

    this.props.changeCurrentTime(currentTime);
  };

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
