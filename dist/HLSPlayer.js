'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('!script-loader!hls.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _screenfull = require('screenfull');

var _screenfull2 = _interopRequireDefault(_screenfull);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('rc-slider/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HLSPlayer = function (_Component) {
	_inherits(HLSPlayer, _Component);

	function HLSPlayer(props, context) {
		_classCallCheck(this, HLSPlayer);

		var _this = _possibleConstructorReturn(this, (HLSPlayer.__proto__ || Object.getPrototypeOf(HLSPlayer)).call(this, props, context));

		_this.state = {
			isPlaying: false,
			isMuted: false,
			isFullscreen: false,
			currentTime: '00:00',
			volume: 70
		};


		_this.player = null;

		_this.handlePlayBtn = _this.handlePlayBtn.bind(_this);
		_this.handleFullScreenBtn = _this.handleFullScreenBtn.bind(_this);
		_this.handleVolumeBtn = _this.handleVolumeBtn.bind(_this);
		_this.handleVolumeChange = _this.handleVolumeChange.bind(_this);
		_this.handleVideoListeners = _this.handleVideoListeners.bind(_this);
		return _this;
	}

	_createClass(HLSPlayer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var hlsParams = this.props.hlsParams;


			if (!Hls.isSupported()) return;

			this.player = new Hls(hlsParams);

			this.player.attachMedia(this.videoElement);

			this.player.on(Hls.Events.MEDIA_ATTACHED, this.onMediaAttached.bind(this));
			this.player.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed.bind(this));
			this.player.on(Hls.Events.ERROR, this.onHlsError.bind(this));

			document.addEventListener(_screenfull2.default.raw.fullscreenchange, this.handleScreenfullChange.bind(this));
		}
	}, {
		key: 'handleScreenfullChange',
		value: function handleScreenfullChange() {
			this.setState({
				isFullscreen: _screenfull2.default.isFullscreen
			});
		}
	}, {
		key: 'handleVideoListeners',
		value: function handleVideoListeners() {
			var _this2 = this;

			var disableControls = this.props.disableControls;


			this.videoElement.addEventListener('timeupdate', function () {
				if (!disableControls) {
					_this2.setState({
						currentTime: formatTime(_this2.videoElement.currentTime)
					});
				}
			});

			this.videoElement.addEventListener('canplay', function () {
				if (!disableControls) {
					_this2.setState({
						currentTime: formatTime(0)
					});
				}
			});

			this.videoElement.addEventListener('ended', function () {
				_this2.videoElement.pause();
			});
		}
	}, {
		key: 'onMediaAttached',
		value: function onMediaAttached() {
			this.player.loadSource(this.props.source);
		}
	}, {
		key: 'onManifestParsed',
		value: function onManifestParsed() {
			var isPlaying = this.state.isPlaying;


			this.player.startLoad();

			if (isPlaying) this.videoElement.play();

			this.handleVideoListeners();
		}
	}, {
		key: 'onHlsError',
		value: function onHlsError(event, data) {
			console.log('error with HLS...', data.type);
		}
	}, {
		key: 'handlePlayBtn',
		value: function handlePlayBtn(e) {
			e.stopPropagation();

			if (this.props.disableControls) return;
			if (e.target.classList.contains('rc-slider-step')) return;

			var isPlaying = this.state.isPlaying;


			if (isPlaying) this.videoElement.pause();else this.videoElement.play();

			this.setState({
				isPlaying: !isPlaying
			});
		}
	}, {
		key: 'handleFullScreenBtn',
		value: function handleFullScreenBtn(e) {
			e.stopPropagation();

			if (_screenfull2.default.enabled) _screenfull2.default.toggle(this.videoContainer);
		}
	}, {
		key: 'handleVolumeBtn',
		value: function handleVolumeBtn(e) {
			e.stopPropagation();

			var _state = this.state,
			    isMuted = _state.isMuted,
			    volume = _state.volume;


			if (volume === 0 && isMuted) return;

			this.videoElement.muted = !isMuted;
			this.volumeBar.setState({
				value: isMuted ? volume : 0
			});

			this.setState({
				isMuted: !isMuted
			});
		}
	}, {
		key: 'handleVolumeChange',
		value: function handleVolumeChange() {

			var volume = this.volumeBar.state.value;
			var isMuted = parseFloat(volume) <= 0;

			this.videoElement.volume = volume / 100;
			this.videoElement.muted = isMuted;
			this.setState({
				isMuted: isMuted,
				volume: volume
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state2 = this.state,
			    isPlaying = _state2.isPlaying,
			    isMuted = _state2.isMuted,
			    currentTime = _state2.currentTime,
			    duration = _state2.duration,
			    isFullscreen = _state2.isFullscreen;
			var disableControls = this.props.disableControls;


			var btnPlayClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-play', isPlaying && 'hlsPlayer-controls__btn-play_pause');
			var btnVolumeClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-volume', isMuted && 'hlsPlayer-controls__btn-volume_off');
			var btnFullscreenClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-fullscreen', isFullscreen && 'hlsPlayer-controls__btn-fullscreen_off');

			return _react2.default.createElement(
				'div',
				{ className: 'hlsPlayer', onClick: this.handlePlayBtn,
					ref: function ref(container) {
						_this3.videoContainer = container;
					}
				},
				_react2.default.createElement('video', { className: 'hlsPlayer-video',
					ref: function ref(video) {
						_this3.videoElement = video;
					}
				}),
				!disableControls && _react2.default.createElement(
					'div',
					{ className: 'hlsPlayer-controls' },
					_react2.default.createElement('div', { className: btnPlayClass }),
					_react2.default.createElement('div', { className: btnVolumeClass, onClick: this.handleVolumeBtn }),
					_react2.default.createElement(_rcSlider2.default, {
						className: 'hlsPlayer-controls__slider-volume',
						defaultValue: 70,
						maximumTrackStyle: { opacity: 0.4 },
						minimumTrackStyle: { backgroundColor: 'white' },
						handleStyle: {
							display: 'none'
						},
						ref: function ref(bar) {
							_this3.volumeBar = bar;
						},
						onAfterChange: this.handleVolumeChange
					}),
					_react2.default.createElement(
						'div',
						{ className: 'hlsPlayer-controls__block hlsPlayer-controls__block_right' },
						_react2.default.createElement(
							'span',
							{ className: 'hlsPlayer-controls__timer' },
							currentTime
						),
						_react2.default.createElement('div', { className: btnFullscreenClass, onClick: this.handleFullScreenBtn })
					)
				)
			);
		}
	}]);

	return HLSPlayer;
}(_react.Component);

HLSPlayer.defaultProps = {
	disableControls: false,
	source: '',
	hlsParams: {}
};
HLSPlayer.propTypes = {
	disableControls: _react.PropTypes.bool,
	source: _react.PropTypes.string.isRequired,
	hlsParams: _react.PropTypes.object
};
exports.default = HLSPlayer;


module.exports = HLSPlayer;

function formatTime(time) {
	time = parseInt(time);

	var hours = Math.floor(time / 3600);
	var minutes = Math.floor((time - hours * 3600) / 60);
	var seconds = time - hours * 3600 - minutes * 60;

	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;

	return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
}