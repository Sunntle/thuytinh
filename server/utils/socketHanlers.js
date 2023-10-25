const { Notification } = require("../models");

const userConnected = []
const callStaff = []
const listPermission = ['R2', 'R3', 'R4'];
exports.getAllUserOnline = () => {
  return userConnected
}
exports.handleCallStaff = (
  socket
) => {
  socket.on("call staff", async (idTable) => {
    callStaff.push({ socketId: socket.id, idTable: idTable });
    const res = await Notification.create({
      type: "call-staff", description: `Gọi nhân viên - Bàn ${idTable} !!!`,
    }, { raw: true })
    _io.sockets.broadcast.emit("new message", res);
  });
};
exports.handleNewUserConnect = (
  socket
) => {
  socket.on("user connect", (user) => {
    userConnected.push({ socketId: socket.id, role: user.role, id: user.id });
    _io.of('/admin').emit("update-admin-online", userConnected);
  });
};
exports.handleDisconnect = (
  socket
) => {
  socket.on("disconnect", () => {
    const index = userConnected.findIndex((el) => el.socketId == socket.id);
    if (index !== -1) {
      userConnected.splice(index, 1);
      _io.of('/admin').emit("update-admin-online", userConnected);
    }
  });
};
