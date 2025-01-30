import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  autoConnect: false,
});

export const connectSocket = (token: string) => {
    socket.io.opts.auth = { token };
  socket.connect();
};

export default socket;