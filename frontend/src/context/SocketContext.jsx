import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/slices/notificationSlice';
import { updateAccountBalance } from '../store/slices/accountSlice';
import { addTransaction } from '../store/slices/transactionSlice';

const SocketContext = createContext();

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      const newSocket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Socket connected');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      });

      newSocket.on('notification', (data) => {
        dispatch(addNotification(data));
        toast(data.message, {
          icon: '🔔',
          duration: 5000,
        });
      });

      newSocket.on('balanceUpdate', (data) => {
        dispatch(updateAccountBalance(data));
      });

      newSocket.on('transactionUpdate', (data) => {
        dispatch(addTransaction(data));
        toast.success(`Transaction ${data.status}: ${data.reference}`);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, token, dispatch]);

  const joinRoom = useCallback(
    (room) => {
      if (socket) {
        socket.emit('join', room);
      }
    },
    [socket]
  );

  const leaveRoom = useCallback(
    (room) => {
      if (socket) {
        socket.emit('leave', room);
      }
    },
    [socket]
  );

  const emit = useCallback(
    (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket]
  );

  const value = {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
