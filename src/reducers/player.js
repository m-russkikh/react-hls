import * as types from '../actions/types';

const initialState = {
	isPlaying: false,
	isMuted: false,
	isFullscreen: false,
	currentTime: '00:00',
	volume: 70,
	disableControls: true,
	startBuffering: false
};

export default function playerReducer(state = initialState, action) {
	switch(action.type) {
		case types.PLAYBACK_STATUS_CHANGED:
			return {...state, isPlaying: action.isPlaying, disableControls: false};
		case types.MUTE_STATUS_CHANGED:
			return {...state, isMuted: action.isMuted};
		case types.FULLSCREEN_CHANGED:
			return {...state, isFullscreen: action.isFullscreen};
		case types.CURRENT_TIME_CHANGED:
			return {...state, currentTime: action.currentTime};
		case types.VOLUME_CHANGED:
			return {...state, volume: action.volume, isMuted: action.isMuted};
		case types.DISABLE_CONTROLS_CHANGED:
			return {...state, disableControls: action.disableControls};
		case types.START_BUFFERING:
			return {...state, startBuffering: action.startBuffering, disableControls: false};
	}
	return state;
}