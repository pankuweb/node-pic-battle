const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socket = require("socket.io");
const http = require("http");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 4000;
// const server = server.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

const server = http.createServer(app);
// const io = socketIO(server, {
//   transports: ["polling"],
//   cors: {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   },
// });

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // server.close(() => {
  //   process.exit(1);
  // });
});
const io = new socket.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  console.log("A user is connected", `${socket.id}`);

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

app.set("io", io);
// module.exports = app.s;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
