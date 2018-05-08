import Hls from 'hls.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import screenfull from 'screenfull';
import classnames from 'classnames';
import 'rc-slider/assets/index.css';

import {
  playbackStatusChanged,
  muteStatusChanged,
  fullscreenChanged,
  currentTimeChanged,
  volumeChanged,
  disableControlsChanged,
  startBufferingChanged,
} from '../actions/player';

const DISABLE_CONTROLS_TIMEOUT_MSEC = 5000;

function formatTime(time) {
  const parsedTime = parseInt(time, 10);
  let hours = Math.floor(parsedTime / 3600);
  let minutes = Math.floor((parsedTime - (hours * 3600)) / 60);
  let seconds = parsedTime - (hours * 3600) - (minutes * 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${(hours !== '00' ? `${hours}:` : '') + minutes}:${seconds}`;
}

export class HLSPlayer extends Component {
  constructor(props, context) {
    super(props, context);

    this.player = null;
    this.timeoutId = null;

    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.handleFullScreenBtn = this.handleFullScreenBtn.bind(this);
    this.handleVolumeBtn = this.handleVolumeBtn.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayerMouseMove = this.handlePlayerMouseMove.bind(this);
    this.handleVideoListeners = this.handleVideoListeners.bind(this);
  }

  componentDidMount() {
    const { hlsParams } = this.props;

    if (!Hls.isSupported()) { return; }

    this.player = new Hls(hlsParams);

    this.player.attachMedia(this.videoElement);

    this.player.on(Hls.Events.MEDIA_ATTACHED, this.onMediaAttached.bind(this));
    this.player.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed.bind(this));
    this.player.on(Hls.Events.ERROR, this.onHlsError.bind(this));

    document.addEventListener(screenfull.raw.fullscreenchange, this.handleScreenfullChange.bind(this));
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  onMediaAttached() {
    this.player.loadSource(this.props.source);
  }

  onManifestParsed() {
    this.player.startLoad();
    this.handleVideoListeners();
  }

  onHlsError = (event, data) => {
    console.log('error with HLS...', data.type);
  }

  handleVideoListeners() {
    this.videoElement.addEventListener('loadeddata', () => {
      this.props.startBufferingChanged(true);
      this.disableControlsOnTimeout();
    });

    this.videoElement.addEventListener('timeupdate', () => {
      const currentTime = formatTime(this.videoElement.currentTime);
      this.props.currentTimeChanged(currentTime);
    });

    this.videoElement.addEventListener('ended', () => {
      this.videoElement.pause();
      this.props.playbackStatusChanged(false);
    });
  }

  handleScreenfullChange() {
    this.props.fullscreenChanged(screenfull.isFullscreen);
  }

  disableControlsOnTimeout() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.props.disableControlsChanged(true);
    }, DISABLE_CONTROLS_TIMEOUT_MSEC);
  }

  handlePlayerClick(e) {
    e.stopPropagation();

    const { isPlaying, startBuffering } = this.props.state;
    const { classList } = e.target;

    this.disableControlsOnTimeout();

    if (!startBuffering) return;
    if (!classList.contains('hlsPlayer-controls__btn-play') && !classList.contains('hlsPlayer-video')) { return; }

    if (isPlaying) { this.videoElement.pause(); } else { this.videoElement.play(); }

    this.props.playbackStatusChanged(!isPlaying);
  }

  handleFullScreenBtn(e) {
    e.stopPropagation();

    if (screenfull.enabled) { screenfull.toggle(this.videoContainer); }
  }

  handleVolumeBtn(e) {
    e.stopPropagation();
    console.log('handleVolumeBtn', this.props);
    const { isMuted, volume } = this.props.state;

    if (volume === 0 && isMuted) return;

    this.videoElement.muted = !isMuted;
    this.volumeBar.setState({
      value: isMuted ? volume : 0,
    });

    this.props.muteStatusChanged(!isMuted);
  }

  handleVolumeChange() {
    const volume = this.volumeBar.state.value;
    const isMuted = parseFloat(volume) <= 0;

    this.videoElement.volume = volume / 100;
    this.videoElement.muted = isMuted;

    this.props.volumeChanged(volume, isMuted);
  }

  handlePlayerMouseMove() {
    const { disableControls, startBuffering } = this.props.state;

    if (!disableControls || !startBuffering) return;

    this.props.disableControlsChanged(false);
    this.disableControlsOnTimeout();
  }

  render() {
    const {
      isPlaying, isMuted, volume, currentTime, isFullscreen, disableControls,
    } = this.props.state;

    const btnPlayClass = classnames(
      'hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-play',
      isPlaying && 'hlsPlayer-controls__btn-play_pause',
    );
    const btnVolumeClass = classnames(
      'hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-volume',
      isMuted && 'hlsPlayer-controls__btn-volume_off',
    );
    const btnFullscreenClass = classnames(
      'hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-fullscreen',
      isFullscreen && 'hlsPlayer-controls__btn-fullscreen_off',
    );

    return (
      <div
        className="hlsPlayer"
        onClick={this.handlePlayerClick}
        onMouseMove={this.handlePlayerMouseMove}
        ref={(container) => { this.videoContainer = container; }}
      >
        <video
          className="hlsPlayer-video"
          ref={(video) => { this.videoElement = video; }}
        />
        {
          (!disableControls || !this.props.source) &&
          <div className="hlsPlayer-title">{this.props.title}</div>
        }
        {
          !disableControls &&
          <div className="hlsPlayer-controls">
            <div className={btnPlayClass} />
            <div
              className={btnVolumeClass}
              onClick={this.handleVolumeBtn}
            />
            <Slider
              className="hlsPlayer-controls__slider-volume"
              defaultValue={volume}
              railStyle={{ opacity: 0.4 }}
              trackStyle={{ backgroundColor: 'white' }}
              handleStyle={{
                display: 'none',
              }}
              ref={(bar) => { this.volumeBar = bar; }}
              onAfterChange={this.handleVolumeChange}
            />
            <div className="hlsPlayer-controls__block hlsPlayer-controls__block_right">
              <span className="hlsPlayer-controls__timer">{currentTime}</span>
              <div
                className={btnFullscreenClass}
                onClick={this.handleFullScreenBtn}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

HLSPlayer.defaultProps = {
  title: '',
  hlsParams: {},
  state: {},
};

HLSPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string,
  hlsParams: PropTypes.object,
  state: PropTypes.object,
  playbackStatusChanged: PropTypes.func.isRequired,
  muteStatusChanged: PropTypes.func.isRequired,
  fullscreenChanged: PropTypes.func.isRequired,
  currentTimeChanged: PropTypes.func.isRequired,
  volumeChanged: PropTypes.func.isRequired,
  disableControlsChanged: PropTypes.func.isRequired,
  startBufferingChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state: state.player });

const mapDispatchToProps = {
  playbackStatusChanged,
  muteStatusChanged,
  fullscreenChanged,
  currentTimeChanged,
  volumeChanged,
  disableControlsChanged,
  startBufferingChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(HLSPlayer);
