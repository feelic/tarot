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
    io.in(message.currentPlayer).emit('server-event', message);
  });
}
