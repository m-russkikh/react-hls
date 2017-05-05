'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = playerReducer;

var _types = require('../actions/types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
	isPlaying: false,
	isMuted: false,
	isFullscreen: false,
	currentTime: '00:00',
	volume: 70,
	disableControls: false,
	startBuffering: false
};

function playerReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	switch (action.type) {
		case types.PLAYBACK_STATUS_CHANGED:
			return _extends({}, state, { isPlaying: action.isPlaying, disableControls: false });
		case types.MUTE_STATUS_CHANGED:
			return _extends({}, state, { isMuted: action.isMuted });
		case types.FULLSCREEN_CHANGED:
			return _extends({}, state, { isFullscreen: action.isFullscreen });
		case types.CURRENT_TIME_CHANGED:
			return _extends({}, state, { currentTime: action.currentTime });
		case types.VOLUME_CHANGED:
			return _extends({}, state, { volume: action.volume, isMuted: action.isMuted });
		case types.DISABLE_CONTROLS_CHANGED:
			return _extends({}, state, { disableControls: action.disableControls });
		case types.START_BUFFERING:
			return _extends({}, state, { startBuffering: action.startBuffering });
	}
	return state;
}