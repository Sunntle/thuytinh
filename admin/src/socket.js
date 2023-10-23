import { Manager } from "socket.io-client";
const URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'https://backend-thuytinh-production.up.railway.app/';
const manager = new Manager(URL);
export const socket = manager.socket("/admin");
socket.connect((error) => {
    if (error) {
      console.error('Error connecting to the server:', error);
    } else {
      console.log('Connected to the server');
    }
});