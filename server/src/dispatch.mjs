import room from './reducers/room';
import controlActions from './util/control-actions';
import broadcast from './broadcast';
import {SERVER_ERROR} from './constants/action-types';

const state = {
  rooms: {}
};

export function dispatch (action) {
  const roomId = action.room;

  console.log(`user ${action.playerId} dispatched ${action.type} in ${roomId}`);

  try {
    const isActionAllowed = controlActions(state.rooms[roomId], action);

    if (! isActionAllowed) {
      return [];
    }

    state.rooms[roomId] = room(state.rooms[roomId], action, dispatch);
  } catch (e) {
    console.log(e);
    state.rooms[roomId] = room(state.rooms[roomId], {type: SERVER_ERROR, error: e}, dispatch);
  }

  return broadcast(roomId, state.rooms[roomId]);
}
