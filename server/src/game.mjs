import room from './reducers/room';
import controlActions from './util/control-actions';
import broadcast from './broadcast';

const state = {
  rooms: {}
};

export function dispatch (action) {
  const roomId = action.room;
  const isActionAllowed = controlActions(state.rooms[roomId], action);

  if (! isActionAllowed) {
    return [];
  }

  state.rooms[roomId] = room(state.rooms[roomId], action, dispatch);

  return broadcast(roomId, state.rooms[roomId]);
}
