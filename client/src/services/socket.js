// socketService.js
import io from 'socket.io-client';

const socket = io('ws://localhost:3500');
//const socket = io('ws://172.29.50.69:3500/');

export default socket;
