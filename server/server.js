const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 4000;
const socketio = require("socket.io");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const expressServer = app.listen(port, () => {
  console.log("Service is up on port " + port);
});

const io = socketio(expressServer);
const userNamespace = io.of("/user");
userNamespace.on("connect", (socket) => {
  console.log(`connnected ${socket.id}`);
  socket.on("error", (error) => {
    console.log("error", error);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("toggleBreakStatusFromClient", (data) => {
    userNamespace.emit("toggleBreakStatusFromServer", data);
  });

  socket.on("setNavFromClient", (data) => {
    userNamespace.emit("setNavFromServer", data);
  });

  socket.on("updateActivitiesFromClient", (data) => {
    userNamespace.emit("updateActivitiesFromServer", data);
  });
});
