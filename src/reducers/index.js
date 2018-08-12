import {combineReducers} from 'redux';
import players from './players';
import status from './status';

export default combineReducers({
  players,
  status
});
