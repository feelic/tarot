import {playBotturn} from './bots/index.js';

let io;

export function configureBroadcaster (ioServer) {
  io = ioServer;
}

export default function broadcast (room, state) {
  const {players} = state;

  const responses = Object.values(players).map(player => {
    return {
      ...state,
      currentPlayer: player.id,
      room
    };
  });

  responses.forEach(message => {
    if (! players[message.currentPlayer]) {
      return console.log(`Player ${message.currentPlayer} no longer exists in room ${room}`);
    }
    if (players[message.currentPlayer].bot === true) {
      return playBotturn(room, message);
    }
    const socketId = players[message.currentPlayer].socketId;

    return io.in(socketId).emit('server-event', message);
  });
}
