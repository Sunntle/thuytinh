<<<<<<< HEAD
const userConnected = []
=======
const { Notification } = require("../models");

const userConnected = []
const callStaff = []
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
const listPermission = ['R2', 'R3', 'R4'];
exports.getAllUserOnline=()=>{
  return userConnected
}
<<<<<<< HEAD
exports.handleNewUserConnect = (
  socket
) => {
=======
exports.handleCallStaff = (
  socket
) => {
  socket.on("call staff", async(idTable) => {
    callStaff.push({ socketId: socket.id, idTable: idTable});
    const res = await Notification.create({
      type: "call-staff", description: "Gọi nhân viên !!!",
    },{ raw: true })
    _io.of('/admin').emit("new message", res);
  });
};
exports.handleNewUserConnect = (
  socket
) => {
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
  socket.on("user connect", (user) => {
    userConnected.push({ socketId: socket.id, role: user.role, id:user.id });
    _io.of('/admin').emit("update-admin-online",userConnected);
  });
};
exports.handleDisconnect = (
  socket
) => {
  socket.on("disconnect", () => {
    const index = userConnected.findIndex((el) => el.socketId == socket.id);
    if(index !== -1) {
      userConnected.splice(index, 1);
      _io.of('/admin').emit("update-admin-online",userConnected);
    }
  });
};
