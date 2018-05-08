import * as types from './types';

export function playbackStatusChanged(isPlaying) {
  return {
    type: types.PLAYBACK_STATUS_CHANGED,
    isPlaying,
  };
}

export function muteStatusChanged(isMuted) {
  return {
    type: types.MUTE_STATUS_CHANGED,
    isMuted,
  };
}

export function fullscreenChanged(isFullscreen) {
  return {
    type: types.FULLSCREEN_CHANGED,
    isFullscreen,
  };
}

export function currentTimeChanged(currentTime) {
  return {
    type: types.CURRENT_TIME_CHANGED,
    currentTime,
  };
}

export function volumeChanged(volume, isMuted) {
  return {
    type: types.VOLUME_CHANGED,
    volume,
    isMuted,
  };
}

export function disableControlsChanged(disableControls) {
  return {
    type: types.DISABLE_CONTROLS_CHANGED,
    disableControls,
  };
}

export function startBufferingChanged(startBuffering) {
  return {
    type: types.START_BUFFERING,
    startBuffering,
  };
}
