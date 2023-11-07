const { Notification } = require("../models");

const userConnected = [];
const callStaff = [];
const listPermission = ["R2", "R3", "R4"];
exports.getAllUserOnline = () => {
  return userConnected;
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
//client
exports.handleCallStaff = (socket) => {
  socket.on("call-staff", async (idTable) => {
    try {
      callStaff.push({ socketId: socket.id, idTable: idTable });
       await Notification.create({
        type: "call-staff",
        description: `Gọi nhân viên - Bàn ${idTable} !!!`,
      });
    } catch (err) {
      console.log(err);
    }
  });
};
exports.handlePayInCash = (socket) => {
  socket.on("pay-in-cash", async (idTable) => {
    try {
      callStaff.push({ socketId: socket.id, idTable: idTable });
       await Notification.create({
        type: "pay-in-cash",
        description: `Thanh toán - Bàn ${idTable} !!!`,
      });
    } catch (err) {
      console.log(err);
    }
  });
};