exports.handleNewUserConnect = (
  socket,
  userConnected,
  storeMessage,
  listPermission
) => {
  socket.of("/admin").on("user connect", (user) => {
    userConnected.push({ socketId: socket.id, role: user.role });
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
