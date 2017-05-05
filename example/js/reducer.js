import {combineReducers} from 'redux';
import playerReducer from '../../dist/reducers/player';

export default combineReducers({
	player: playerReducer
});