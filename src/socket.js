import io from 'socket.io-client';
const socketURL = '/'
export const socket = io(socketURL);
