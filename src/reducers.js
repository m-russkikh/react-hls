import { combineReducers } from 'redux';
import playerReducer from './reducers/player';

export default combineReducers({
  player: playerReducer,
});
