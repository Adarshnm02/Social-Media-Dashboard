import io from 'socket.io-client';
import { store } from '../app/store';
import { addNotification } from '../features/notifications/notificationsSlice';
import toast from 'react-hot-toast';

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

socket.on('newNotification', (notification: Notification) => {
  store.dispatch(addNotification(notification));
  toast.success(notification.message || 'new notification' );
});


export default socket;