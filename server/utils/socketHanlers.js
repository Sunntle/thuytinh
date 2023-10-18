const userConnected = []
const listPermission = ['R2', 'R3', 'R4'];
exports.getAllUserOnline=()=>{
  return userConnected
}
exports.handleNewUserConnect = (
  socket
) => {
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
