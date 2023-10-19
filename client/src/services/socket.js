import { Manager } from "socket.io-client";
const URL_SERVER =
  import.meta.env.NODE_ENV === "production"
    ? undefined
    : "http://localhost:8000";
const manager = new Manager(URL_SERVER);
export const socket = manager.socket("/client");
export const socketAdmin = manager.socket("/admin");
socket.connect((error) => {
  if (error) {
    console.error("Error connecting to the server:", error);
  } else {
    console.log("Connected to the server");
  }
});
socketAdmin.connect((error) => {
  if (error) {
    console.error("Error connecting to the server:", error);
  } else {
    console.log("Connected to the server");
  }
});
