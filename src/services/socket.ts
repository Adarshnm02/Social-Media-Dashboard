import io from 'socket.io-client';
import { store } from '../app/store';

const socket = io('http://localhost:3001', {
  autoConnect: false,
});

export const connectSocket = (token: string) => {
    socket.io.opts.auth = { token };
  socket.connect();
};

store.subscribe(() => {
  const token = store.getState().auth.token;
  if(token && !socket.connected){
    socket.io.opts.auth = { token }
    socket.connect();
  }
})

export default socket;