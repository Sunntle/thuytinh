exports.handleNewUser = (
  socket,
  userConnected,
  storeMessage,
  listPermission
) => {
  socket.on("new user", (user) => {
    userConnected.push({ socketId: socket.id, role: user.role });
    if (listPermission.includes(user.role)) {
      storeMessage.length > 0 && socket.emit("new message", storeMessage);
    }
  });
};

exports.handleNewOrder = (socket, userConnected, storeMessage) => {
  socket.on("new order", (arg) => {
    if (userConnected.some((el) => el.role === "R4")) {
      socket.broadcast.emit("new message", arg);
    } else {
      storeMessage.unshift(arg);
    }
  });
};

exports.handleDisconnect = (
  socket,
  userConnected,
  storeMessage,
  listPermission
) => {
  socket.on("disconnect", () => {
    if (
      userConnected.some(
        (el) => el.socketId == socket.id && listPermission.includes(el.role)
      )
    ) {
      storeMessage.splice(0, storeMessage.length);
    }
    const index = userConnected.findIndex((el) => el.socketId == socket.id);
    userConnected.splice(index, 1);
  });
};
