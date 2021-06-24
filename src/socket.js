import io from 'socket.io-client';
const socketURL =  "https://sprouts-control-center.herokuapp.com/"  || 'http://localhost:5000'; 
export const socket = io(socketURL);
