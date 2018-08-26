import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import {dispatch} from './src/game';
import {JOIN_ROOM, LEAVE_ROOM} from './src/constants/action-types';

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.on('join-room', data => {
    const {room, username} = data;

    socket.join(room);
    socket.username = username;
    socket.gameRoom = room;
    socket.playerId = socket.id;

    handlePlayerAction.call(socket, {
      type: JOIN_ROOM,
      username,
      room,
      playerId: socket.id
    });
  });
  socket.on('player-action', handlePlayerAction.bind(socket));
  socket.on('disconnect', () => {
    const {gameRoom, playerId} = socket;

    handlePlayerAction.call(socket, {type: LEAVE_ROOM, room: gameRoom, playerId});
  });
});

function handlePlayerAction(data) {
  const {gameRoom, id, username} = this;

  console.log(`user ${username} (id: ${id}) dispatched ${data.type} in ${gameRoom}`);

  const responses = dispatch({...data, room: gameRoom, playerId: id});

  responses.forEach(message => {

    io.in(message.currentPlayer).emit('server-event', message);
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
