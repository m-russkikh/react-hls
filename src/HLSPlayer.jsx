import '!script-loader!hls.js';
import React, {Component, PropTypes} from 'react';
import Slider from 'rc-slider';
import screenfull from 'screenfull';
import classnames from 'classnames';

import 'rc-slider/assets/index.css';

const DISABLE_CONTROLS_TIMEOUT_MSEC = 5000;

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

	state = {
		isPlaying: false,
		isMuted: false,
		isFullscreen: false,
		currentTime: '00:00',
		volume: 70,
		disableControls: true,
		startBuffering: false
	};

	constructor(props, context) {
		super(props, context);

		this.player = null;
		this.timeoutId = null;

		this.handlePlayBtn = this.handlePlayBtn.bind(this);
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

	handleScreenfullChange() {
		this.setState({
			isFullscreen: screenfull.isFullscreen
		});
	}

	handleVideoListeners() {
		this.videoElement.addEventListener('loadeddata', () => {
			this.setState({
				startBuffering: true
			});
		});

		this.videoElement.addEventListener('timeupdate', () => {
			this.setState({
				currentTime: formatTime(this.videoElement.currentTime)
			});
		});

		this.videoElement.addEventListener('ended', () => {
			this.videoElement.pause();
		});
	}

	onMediaAttached() {
		this.player.loadSource(this.props.source);
	}

	onManifestParsed() {
		const { isPlaying } = this.state;

		this.player.startLoad();

		if (isPlaying)
			this.videoElement.play();

		this.handleVideoListeners();
	}

	onHlsError(event, data) {
		console.log('error with HLS...', data.type);
	}

	handlePlayBtn(e) {
		e.stopPropagation();

		if (e.target.classList.contains('rc-slider-step'))
			return;

		const { isPlaying } = this.state;

		if (isPlaying)
			this.videoElement.pause();
		else
			this.videoElement.play();

		this.setState({
			isPlaying: !isPlaying
		});
	}

	handleFullScreenBtn(e) {
		e.stopPropagation();

		if (screenfull.enabled)
			screenfull.toggle(this.videoContainer);
	}

	handleVolumeBtn(e) {
		e.stopPropagation();

		const { isMuted, volume } = this.state;

		if (volume === 0 && isMuted) return;

		this.videoElement.muted = !isMuted;
		this.volumeBar.setState({
			value: isMuted ? volume : 0
		});

		this.setState({
			isMuted: !isMuted
		});
	}

	handleVolumeChange() {
		const volume = this.volumeBar.state.value;
		const isMuted = parseFloat(volume) <= 0;

		this.videoElement.volume = volume / 100;
		this.videoElement.muted = isMuted;
		this.setState({
			isMuted: isMuted,
			volume: volume
		});
	}

	handlePlayerMouseMove() {
		const { disableControls, startBuffering } = this.state;

		if (!disableControls || !startBuffering) return;
		this.setState({
			disableControls: false
		});

		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.setState({
				disableControls: true
			});
		}, DISABLE_CONTROLS_TIMEOUT_MSEC);
	}

	render() {
		const { isPlaying, isMuted, currentTime, duration, isFullscreen, disableControls } = this.state;

		let btnPlayClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-play',
			isPlaying && 'hlsPlayer-controls__btn-play_pause');
		let btnVolumeClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-volume',
			isMuted && 'hlsPlayer-controls__btn-volume_off');
		let btnFullscreenClass = classnames('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-fullscreen',
			isFullscreen && 'hlsPlayer-controls__btn-fullscreen_off');

		return (
			<div className="hlsPlayer" onClick={this.handlePlayBtn} onMouseMove={this.handlePlayerMouseMove}
				 ref={ (container) => { this.videoContainer = container; } }
			>
				<video className='hlsPlayer-video'
					   ref={ (video) => { this.videoElement = video; } }
				/>
				{
					!disableControls &&
					<div className='hlsPlayer-controls'>
						<div className={btnPlayClass}></div>
						<div className={btnVolumeClass} onClick={this.handleVolumeBtn}></div>
						<Slider
							className="hlsPlayer-controls__slider-volume"
							defaultValue={70}
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

export default HLSPlayer;

module.exports = HLSPlayer;

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