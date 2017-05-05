'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('!script-loader!hls.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _screenfull = require('screenfull');

var _screenfull2 = _interopRequireDefault(_screenfull);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _player = require('../actions/player');

var actions = _interopRequireWildcard(_player);

require('rc-slider/assets/index.css');

require('../../styles/react-hls-player.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DISABLE_CONTROLS_TIMEOUT_MSEC = 5000;

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

var HLSPlayer = function (_Component) {
	_inherits(HLSPlayer, _Component);

	function HLSPlayer(props, context) {
		_classCallCheck(this, HLSPlayer);

		var _this = _possibleConstructorReturn(this, (HLSPlayer.__proto__ || Object.getPrototypeOf(HLSPlayer)).call(this, props, context));

		_this.player = null;
		_this.timeoutId = null;

		_this.handlePlayerClick = _this.handlePlayerClick.bind(_this);
		_this.handleFullScreenBtn = _this.handleFullScreenBtn.bind(_this);
		_this.handleVolumeBtn = _this.handleVolumeBtn.bind(_this);
		_this.handleVolumeChange = _this.handleVolumeChange.bind(_this);
		_this.handlePlayerMouseMove = _this.handlePlayerMouseMove.bind(_this);
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
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.timeoutId);
		}
	}, {
		key: 'disableControlsOnTimeout',
		value: function disableControlsOnTimeout() {
			var _this2 = this;

			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(function () {
				_this2.props.actions.disableControlsChanged(true);
			}, DISABLE_CONTROLS_TIMEOUT_MSEC);
		}
	}, {
		key: 'handleScreenfullChange',
		value: function handleScreenfullChange() {
			this.props.actions.fullscreenChanged(_screenfull2.default.isFullscreen);
		}
	}, {
		key: 'handleVideoListeners',
		value: function handleVideoListeners() {
			var _this3 = this;

			this.videoElement.addEventListener('loadeddata', function () {
				_this3.props.actions.startBufferingChanged(true);
				_this3.disableControlsOnTimeout();
			});

			this.videoElement.addEventListener('timeupdate', function () {
				var currentTime = formatTime(_this3.videoElement.currentTime);
				_this3.props.actions.currentTimeChanged(currentTime);
			});

			this.videoElement.addEventListener('ended', function () {
				_this3.videoElement.pause();
				_this3.props.actions.playbackStatusChanged(false);
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
			this.player.startLoad();
			this.handleVideoListeners();
		}
	}, {
		key: 'onHlsError',
		value: function onHlsError(event, data) {
			console.log('error with HLS...', data.type);
		}
	}, {
		key: 'handlePlayerClick',
		value: function handlePlayerClick(e) {
			e.stopPropagation();

			var _props$state = this.props.state,
			    isPlaying = _props$state.isPlaying,
			    startBuffering = _props$state.startBuffering;

			var classList = e.target.classList;

			this.disableControlsOnTimeout();

			if (!startBuffering) return;
			if (!classList.contains('hlsPlayer-controls__btn-play') && !classList.contains('hlsPlayer-video')) return;

			if (isPlaying) this.videoElement.pause();else this.videoElement.play();

			this.props.actions.playbackStatusChanged(!isPlaying);
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

			var _props$state2 = this.props.state,
			    isMuted = _props$state2.isMuted,
			    volume = _props$state2.volume;


			if (volume === 0 && isMuted) return;

			this.videoElement.muted = !isMuted;
			this.volumeBar.setState({
				value: isMuted ? volume : 0
			});

			this.props.actions.muteStatusChanged(!isMuted);
		}
	}, {
		key: 'handleVolumeChange',
		value: function handleVolumeChange() {
			var volume = this.volumeBar.state.value;
			var isMuted = parseFloat(volume) <= 0;

			this.videoElement.volume = volume / 100;
			this.videoElement.muted = isMuted;

			this.props.actions.volumeChanged(volume, isMuted);
		}
	}, {
		key: 'handlePlayerMouseMove',
		value: function handlePlayerMouseMove() {
			var _props$state3 = this.props.state,
			    disableControls = _props$state3.disableControls,
			    startBuffering = _props$state3.startBuffering;


			if (!disableControls || !startBuffering) return;

			this.props.actions.disableControlsChanged(false);
			this.disableControlsOnTimeout();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props$state4 = this.props.state,
			    isPlaying = _props$state4.isPlaying,
			    isMuted = _props$state4.isMuted,
			    volume = _props$state4.volume,
			    currentTime = _props$state4.currentTime,
			    isFullscreen = _props$state4.isFullscreen,
			    disableControls = _props$state4.disableControls;


			var btnPlayClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-play', isPlaying && 'hlsPlayer-controls__btn-play_pause');
			var btnVolumeClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-volume', isMuted && 'hlsPlayer-controls__btn-volume_off');
			var btnFullscreenClass = (0, _classnames2.default)('hlsPlayer-controls__btn', 'hlsPlayer-controls__btn-fullscreen', isFullscreen && 'hlsPlayer-controls__btn-fullscreen_off');

			return _react2.default.createElement(
				'div',
				{ className: 'hlsPlayer', onClick: this.handlePlayerClick, onMouseMove: this.handlePlayerMouseMove,
					ref: function ref(container) {
						_this4.videoContainer = container;
					}
				},
				_react2.default.createElement('video', { className: 'hlsPlayer-video',
					ref: function ref(video) {
						_this4.videoElement = video;
					}
				}),
				(!disableControls || !this.props.source) && _react2.default.createElement(
					'div',
					{ className: 'hlsPlayer-title' },
					this.props.title
				),
				!disableControls && _react2.default.createElement(
					'div',
					{ className: 'hlsPlayer-controls' },
					_react2.default.createElement('div', { className: btnPlayClass }),
					_react2.default.createElement('div', { className: btnVolumeClass, onClick: this.handleVolumeBtn }),
					_react2.default.createElement(_rcSlider2.default, {
						className: 'hlsPlayer-controls__slider-volume',
						defaultValue: volume,
						maximumTrackStyle: { opacity: 0.4 },
						minimumTrackStyle: { backgroundColor: 'white' },
						handleStyle: {
							display: 'none'
						},
						ref: function ref(bar) {
							_this4.volumeBar = bar;
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


var mapStateToProps = function mapStateToProps(state) {
	return { state: state.player };
};

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			playbackStatusChanged: function playbackStatusChanged(isPlaying) {
				return dispatch(actions.playbackStatusChanged(isPlaying));
			},
			muteStatusChanged: function muteStatusChanged(isMuted) {
				return dispatch(actions.muteStatusChanged(isMuted));
			},
			fullscreenChanged: function fullscreenChanged(isFullscreen) {
				return dispatch(actions.fullscreenChanged(isFullscreen));
			},
			currentTimeChanged: function currentTimeChanged(currentTime) {
				return dispatch(actions.currentTimeChanged(currentTime));
			},
			volumeChanged: function volumeChanged(volume, isMuted) {
				return dispatch(actions.volumeChanged(volume, isMuted));
			},
			disableControlsChanged: function disableControlsChanged(disableControls) {
				return dispatch(actions.disableControlsChanged(disableControls));
			},
			startBufferingChanged: function startBufferingChanged(startBuffering) {
				return dispatch(actions.startBufferingChanged(startBuffering));
			}
		}
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HLSPlayer);