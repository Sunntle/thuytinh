import { Manager } from "socket.io-client";
const URL_SERVER =
import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_API_URL_PRODUCTION : import.meta.env.VITE_APP_API_URL;
const manager = new Manager(URL_SERVER);
export const socket = manager.socket("/client");
socket.connect((error) => {
  if (error) {
    console.error("Error connecting to the server:", error);
  } else {
    console.log("Connected to the server");
  }
});
