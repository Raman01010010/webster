// socketService.js
import io from 'socket.io-client';

const socket = io('ws://localhost:3500');

export default socket;