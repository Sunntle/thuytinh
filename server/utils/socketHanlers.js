const { Notification } = require("../models");

const userConnected = [];
const callStaff = [];
const listPermission = ["R2", "R3", "R4"];
exports.getAllUserOnline = () => {
  return userConnected;
};
exports.handleCallStaff = (socket) => {
  socket.on("call staff", async (idTable) => {
    try {
      callStaff.push({ socketId: socket.id, idTable: idTable });
      const res = await Notification.create({
        type: "call-staff",
        description: `Gọi nhân viên - Bàn ${idTable} !!!`,
      });
      _io.of("/admin").emit("new message", res);
    } catch (err) {
      console.log(err);
    }
  });
};
exports.handleNewUserConnect = (socket) => {
  socket.on("user connect", (user) => {
    try {
      userConnected.push({ socketId: socket.id, role: user.role, id: user.id });
      _io.of("/admin").emit("update-admin-online", userConnected);
    } catch (err) {
      console.log(err);
    }
  });
};
exports.handleDisconnect = (socket) => {
  socket.on("disconnect", () => {
    try {
      const index = userConnected.findIndex((el) => el.socketId == socket.id);
      if (index !== -1) {
        userConnected.splice(index, 1);
        _io.of("/admin").emit("update-admin-online", userConnected);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
