const dotenv = require("dotenv").config();
const io = require("socket.io")(process.env.SOCKET_SERVER || 8900, {
  cors: {
    origin: "https://social-main.netlify.app",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUsers(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("sendBell", ({ senderName, receiverName, type }) => {
    const user = getUsers(receiverName);
    io.to(user?.socketId).emit("getBell", {
      senderName,
      type,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addNewUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendBell", ({ senderName, receiverName, type }) => {
    const user = getUsers(receiverName);
    io.to(user?.socketId).emit("getBell", {
      senderName,
      type,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});
