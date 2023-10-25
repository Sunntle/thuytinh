import { Manager } from "socket.io-client";
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';
const manager = new Manager(URL);
export const socket = manager.socket("/admin");
socket.connect((error) => {
  if (error) {
    console.error('Error connecting to the server:', error);
  } else {
    console.log('Connected to the server');
  }
});