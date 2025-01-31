import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  autoConnect: false,
});

export const connectSocket = (token: string) => {
  socket.io.opts.auth = { token };
  socket.connect();
};
setTimeout(() => {
  
})

// Delay store access to avoid circular dependency
setTimeout(() => {
  import('../app/store').then(({ store }) => {
    store.subscribe(() => {
      const token = store.getState().auth.token;
      if (token && !socket.connected) {
        socket.io.opts.auth = { token };
        socket.connect();
      }
    });
  });
}, 0);

export default socket;