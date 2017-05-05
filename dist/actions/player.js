'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.playbackStatusChanged = playbackStatusChanged;
exports.muteStatusChanged = muteStatusChanged;
exports.fullscreenChanged = fullscreenChanged;
exports.currentTimeChanged = currentTimeChanged;
exports.volumeChanged = volumeChanged;
exports.disableControlsChanged = disableControlsChanged;
exports.startBufferingChanged = startBufferingChanged;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function playbackStatusChanged(isPlaying) {
	return {
		type: types.PLAYBACK_STATUS_CHANGED,
		isPlaying: isPlaying
	};
}

function muteStatusChanged(isMuted) {
	return {
		type: types.MUTE_STATUS_CHANGED,
		isMuted: isMuted
	};
}

function fullscreenChanged(isFullscreen) {
	return {
		type: types.FULLSCREEN_CHANGED,
		isFullscreen: isFullscreen
	};
}

function currentTimeChanged(currentTime) {
	return {
		type: types.CURRENT_TIME_CHANGED,
		currentTime: currentTime
	};
}

function volumeChanged(volume, isMuted) {
	return {
		type: types.VOLUME_CHANGED,
		volume: volume,
		isMuted: isMuted
	};
}

function disableControlsChanged(disableControls) {
	return {
		type: types.DISABLE_CONTROLS_CHANGED,
		disableControls: disableControls
	};
}

function startBufferingChanged(startBuffering) {
	return {
		type: types.START_BUFFERING,
		startBuffering: startBuffering
	};
}