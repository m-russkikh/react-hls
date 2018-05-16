import {
  CHANGE_PLAYBACK_STATUS,
  CHANGE_MUTE_STATUS,
  CHANGE_FULLSCREEN_STATUS,
  CHANGE_CURRENT_TIME,
  CHANGE_VOLUME,
  CAN_PLAY,
} from '../actionTypes/player';

const initialState = {
  isPlaying: false,
  isMuted: false,
  isFullscreen: false,
  currentTime: '00:00',
  volume: 70,
  canPlayed: false,
};

export default function playerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_PLAYBACK_STATUS:
      if (!state.canPlayed) {
        return state;
      }

      return { ...state, isPlaying: payload.isPlaying };
    case CHANGE_MUTE_STATUS:
      return { ...state, isMuted: payload.isMuted };
    case CHANGE_FULLSCREEN_STATUS:
      return { ...state, isFullscreen: payload.isFullscreen };
    case CHANGE_CURRENT_TIME:
      return { ...state, currentTime: payload.currentTime };
    case CHANGE_VOLUME:
      return { ...state, volume: payload.volume };
    case CAN_PLAY:
      return { ...state, canPlayed: payload.canPlayed };
    default:
      return state;
  }
}
