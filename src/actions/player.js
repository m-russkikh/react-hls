import {
  CHANGE_PLAYBACK_STATUS,
  CHANGE_MUTE_STATUS,
  CHANGE_FULLSCREEN_STATUS,
  CHANGE_CURRENT_TIME,
  CHANGE_VOLUME,
  CAN_PLAY,
} from '../actionTypes/player';

export function changePlaybackStatus(isPlaying) {
  return {
    type: CHANGE_PLAYBACK_STATUS,
    payload: { isPlaying },
  };
}

export function changeMuteStatus(isMuted) {
  return {
    type: CHANGE_MUTE_STATUS,
    payload: { isMuted },
  };
}

export function changeFullscreenStatus(isFullscreen) {
  return {
    type: CHANGE_FULLSCREEN_STATUS,
    payload: { isFullscreen },
  };
}

export function changeCurrentTime(currentTime) {
  return {
    type: CHANGE_CURRENT_TIME,
    payload: { currentTime },
  };
}

export function changeVolume(volume) {
  return {
    type: CHANGE_VOLUME,
    payload: { volume },
  };
}

export function canPlay(canPlayed) {
  return {
    type: CAN_PLAY,
    payload: { canPlayed },
  };
}
