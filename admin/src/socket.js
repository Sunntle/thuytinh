import { Manager } from "socket.io-client";
const URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_API_URL_PRODUCTION : import.meta.env.VITE_APP_API_URL;
const manager = new Manager(URL, {'multiplex': false});
export const socket = manager.socket("/admin");

