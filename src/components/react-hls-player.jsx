import '!script-loader!hls.js';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import screenfull from 'screenfull';
import classnames from 'classnames';

import * as actions from '../actions/player';

import 'rc-slider/assets/index.css';
import '../../styles/react-hls-player.css';

const DISABLE_CONTROLS_TIMEOUT_MSEC = 5000;

function formatTime(time) {
	time = parseInt(time);

	var hours   = Math.floor(time / 3600);
	var minutes = Math.floor((time - (hours * 3600)) / 60);
	var seconds = time - (hours * 3600) - (minutes * 60);

	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;

	return (hours !== '00' ? hours + ':' : '') + minutes+ ':' + seconds;
}

class HLSPlayer extends Component {

	static defaultProps = {
		disableControls: false,
		source: '',
		hlsParams: {}
	};

	static propTypes = {
		disableControls: PropTypes.bool,
		source: PropTypes.string.isRequired,
		hlsParams: PropTypes.object
	};

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

		if (!Hls.isSupported())
			return;

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

	disableControlsOnTimeout() {
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.props.actions.disableControlsChanged(true);
		}, DISABLE_CONTROLS_TIMEOUT_MSEC);
	}

	handleScreenfullChange() {
		this.props.actions.fullscreenChanged(screenfull.isFullscreen);
	}

	handleVideoListeners() {
		this.videoElement.addEventListener('loadeddata', () => {
			this.props.actions.startBufferingChanged(true);
			this.disableControlsOnTimeout();
		});

		this.videoElement.addEventListener('timeupdate', () => {
			let currentTime = formatTime(this.videoElement.currentTime);
			this.props.actions.currentTimeChanged(currentTime);
		});

		this.videoElement.addEventListener('ended', () => {
			this.videoElement.pause();
			this.props.actions.playbackStatusChanged(false);
		});
	}

	onMediaAttached() {
		this.player.loadSource(this.props.source);
	}

	onManifestParsed() {
		this.player.startLoad();
		this.handleVideoListeners();
	}

	onHlsError(event, data) {
		console.log('error with HLS...', data.type);
	}

	handlePlayerClick(e) {
		e.stopPropagation();

		const { isPlaying, startBuffering } = this.props.state;
		let classList = e.target.classList;

		this.disableControlsOnTimeout();

		if (!startBuffering) return;
		if (!classList.contains('hlsPlayer-controls__btn-play') && !classList.contains('hlsPlayer-video'))
			return;

		if (isPlaying)
			this.videoElement.pause();
		else
			this.videoElement.play();

		this.props.actions.playbackStatusChanged(!isPlaying);
	}

	handleFullScreenBtn(e) {
		e.stopPropagation();

		if (screenfull.enabled)
			screenfull.toggle(this.videoContainer);
	}

	handleVolumeBtn(e) {
		e.stopPropagation();

		const { isMuted, volume } = this.props.state;

		if (volume === 0 && isMuted) return;

		this.videoElement.muted = !isMuted;
		this.volumeBar.setState({
			value: isMuted ? volume : 0
		});

		this.props.actions.muteStatusChanged(!isMuted);
	}

	handleVolumeChange() {
		const volume = this.volumeBar.state.value;
		const isMuted = parseFloat(volume) <= 0;

		this.videoElement.volume = volume / 100;
		this.videoElement.muted = isMuted;

		this.props.actions.volumeChanged(volume, isMuted);
	}

	handlePlayerMouseMove() {
		const { disableControls, startBuffering } = this.props.state;

		if (!disableControls || !startBuffering) return;

		this.props.actions.disableControlsChanged(false);
		this.disableControlsOnTimeout();
	}

	render() {
		const { isPlaying, isMuted, volume, currentTime, isFullscreen, disableControls } = this.props.state;

		let btnPlayClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-play',
			isPlaying && 'hlsPlayer-controls__btn-play_pause');
		let btnVolumeClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-volume',
			isMuted && 'hlsPlayer-controls__btn-volume_off');
		let btnFullscreenClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-fullscreen',
			isFullscreen && 'hlsPlayer-controls__btn-fullscreen_off');

		return (
			<div className="hlsPlayer" onClick={this.handlePlayerClick} onMouseMove={this.handlePlayerMouseMove}
				 ref={ (container) => { this.videoContainer = container; } }
			>
				<video className='hlsPlayer-video'
					   ref={ (video) => { this.videoElement = video; } }
				/>
				{
					(!disableControls || !this.props.source) &&
					<div className='hlsPlayer-title'>{this.props.title}</div>
				}
				{
					!disableControls &&
					<div className='hlsPlayer-controls'>
						<div className={btnPlayClass}></div>
						<div className={btnVolumeClass} onClick={this.handleVolumeBtn}></div>
						<Slider
							className="hlsPlayer-controls__slider-volume"
							defaultValue={volume}
							maximumTrackStyle={{ opacity: 0.4 }}
							minimumTrackStyle={{ backgroundColor: 'white'}}
							handleStyle={{
								display: 'none'
							}}
							ref={ (bar) => { this.volumeBar = bar; } }
							onAfterChange={ this.handleVolumeChange }
						/>
						<div className='hlsPlayer-controls__block hlsPlayer-controls__block_right'>
							<span className="hlsPlayer-controls__timer">{currentTime}</span>
							<div className={btnFullscreenClass} onClick={this.handleFullScreenBtn}></div>
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	return {state: state.player};
};

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			playbackStatusChanged: (isPlaying) => dispatch(actions.playbackStatusChanged(isPlaying)),
			muteStatusChanged: (isMuted) => dispatch(actions.muteStatusChanged(isMuted)),
			fullscreenChanged: (isFullscreen) => dispatch(actions.fullscreenChanged(isFullscreen)),
			currentTimeChanged: (currentTime) => dispatch(actions.currentTimeChanged(currentTime)),
			volumeChanged: (volume, isMuted) => dispatch(actions.volumeChanged(volume, isMuted)),
			disableControlsChanged: (disableControls) => dispatch(actions.disableControlsChanged(disableControls)),
			startBufferingChanged: (startBuffering) => dispatch(actions.startBufferingChanged(startBuffering))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HLSPlayer);