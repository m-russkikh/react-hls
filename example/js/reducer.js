import {combineReducers} from 'redux';
import playerReducer from '../../src/reducers/player';

export default combineReducers({
	player: playerReducer
});