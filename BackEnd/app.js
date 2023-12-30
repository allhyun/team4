const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8000;
const router = require('./routes');
const session = require('express-session');

const cors = require('cors');
app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(
  session({
    secret: 'secret key', // 비밀키를 설정합니다.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 세션 유지 시간을 한 시간으로 설정합니다.
    },
  })
);

// 미들웨어를 사용하여 모든 뷰에 로그인 상태(세션)를 전달
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    // const commentCount = await Comment.count({
    //   where: { id: req.session.user.id },
    // });
    // const Map_DatabaseCount = await Map_Database.count({
    //   where: { id: req.session.user.id },
    // });
    // const boardCount = await Board.count({
    //   where: { id: req.session.user.id },
    // });
    // res.locals.commentCount = commentCount;
    // res.locals.Map_DatabaseCount = Map_DatabaseCount;
    // res.locals.boardCount = boardCount;
  }

  next();
});

// 소켓 연결시
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // 클라이언트가 소켓 룸 생성 요청
  socket.on('createRoom', (data) => {
    const { roomName } = data;

    // 소켓 룸 생성
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room: ${roomName}`);

    // 클라이언트에게 알림
    io.to(roomName).emit(
      'roomCreate',
      `Socket ${socket.id} created room: ${roomName}`
    );

    // ================== 클라이언트에게 메시지 전송
    // socket.emit('message', 'Hello from server');

    // // 클라이언트로부터 메시지 수신
    // socket.on('clientMessage', (data) => {
    //   console.log(`Received message from client: ${data}`);
    // }); // ===============================
  });

  // 다른 소켓 이벤트 핸들러 등록!!!
});

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
