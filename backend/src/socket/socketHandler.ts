import { Server, Socket } from 'socket.io';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('leave', (room: string) => {
      socket.leave(room);
    });

    socket.on('notification', (data) => {
      io.to(data.userId).emit('notification', data);
    });

    socket.on('balanceUpdate', (data) => {
      io.to(data.userId).emit('balanceUpdate', data);
    });

    socket.on('transactionUpdate', (data) => {
      io.to(data.userId).emit('transactionUpdate', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
