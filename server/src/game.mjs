import room from './reducers/room';
import controlActions from './util/control-actions';

const state = {
  'rooms': {}
};

export const dispatch = action => {
  const roomId = action.room;
  const isActionAllowed = controlActions(state.rooms[roomId], action);

  if (! isActionAllowed) {
    return [];
  }

  state.rooms[roomId] = room(state.rooms[roomId], action);

  return createPlayerViews(roomId, state.rooms[roomId]);
}

export function createPlayerViews(room, state) {
  const {players} = state;

  return Object.values(players).map(player => {
    return {
      ...state,
      currentPlayer: player.id,
      room
    }
  })
}
