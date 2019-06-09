import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import {dispatch} from './src/dispatch';
import {configureBroadcaster} from './src/broadcast';
import {JOIN_ROOM, DISCONNECT} from './src/constants/action-types';

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

configureBroadcaster(io);

io.on('connection', socket => {
  socket.on('join-room', data => {
    const {room, username, playerId} = data;

    socket.join(room);
    socket.username = username;
    socket.gameRoom = room;
    socket.playerId = playerId;
    handlePlayerAction.call(socket, {
      type: JOIN_ROOM,
      username,
      room,
      playerId: socket.playerId,
      socketId: socket.id
    });
  });
  socket.on('player-action', handlePlayerAction.bind(socket));
  socket.on('disconnect', () => {
    const {gameRoom, playerId} = socket;

    handlePlayerAction.call(socket, {
      type: DISCONNECT,
      room: gameRoom,
      playerId
    });
  });
});

function handlePlayerAction (data) {
  const {gameRoom, playerId} = this;

  if (data.type === 'LEAVE_ROOM') {
    this.leave(gameRoom);
  }

  return dispatch({...data, room: gameRoom, playerId});
}

server.listen(port, () => console.log(`Listening on port ${port}`));
