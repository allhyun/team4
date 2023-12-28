const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 8000;
const router = require("./routes");

const cors = require("cors");
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));


app.use("/", router);


// 소켓 연결시
io.on("connection", (socket) => {
  console.log('Client connected');

  // 클라이언트에게 메시지 전송
  socket.emit('message', 'Hello from server');

  // 클라이언트로부터 메시지 수신
  socket.on('clientMessage', (data) => {
    console.log(`Received message from client: ${data}`);
  });
});


app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});