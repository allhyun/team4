const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8000;
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');

const {
  Board,
  Chatmessage,
  Chattingroom,
  Chatuser,
  Heart,
  Study,
  Useproduct,
  Volunteer,
} = require('./model');

const connectSocket = require('./socket');
connectSocket(server);

app.use('/static', express.static('static'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    secret: 'secret key', // 비밀키를 설정합니다.
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 옵션 추가하면 정확한 이유는 모르지만
      // 클라이언트에 쿠키가 저장 안 됨 옵션 추가하면 안 됩니다!!
      maxAge: 60 * 60 * 1000, // 세션 유지 시간을 한 시간으로 설정합니다.
    },
  })
);

// const io = require('socket.io')(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });

// app.set('io', io);

// 미들웨어를 사용하여 모든 뷰에 로그인 상태(세션)를 전달
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

// Router 부분
// app.use('/', router);
const userRouter = require('./routes/user');
app.use('/user', userRouter);

const studyRouter = require('./routes/study');
app.use('/study', studyRouter);

const useproductRouter = require('./routes/useproduct');
app.use('/product', useproductRouter);

// 이 부분은 통일성 있게 라우터를 작성해서 해야 한다..이 안을 바꾸면 프론트도 바꿔야 한다..
const chatRouter = require('./routes/chatting');
app.use('/', chatRouter);

app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    const boardCount = await Board.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const chatmessageCount = await Chatmessage.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const chattingroomCount = await Chattingroom.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const chatuserCount = await Chatuser.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const heartCount = await Heart.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const studyCount = await Study.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const UseproductCount = await Useproduct.count({
      where: { u_idx: req.session.user.u_idx },
    });
    const volunteerCount = await Volunteer.count({
      where: { u_idx: req.session.user.u_idx },
    });

    res.locals.boardCount = boardCount;
    res.locals.chatmessageCount = chatmessageCount;
    res.locals.chattingroomCount = chattingroomCount;
    res.locals.chatuserCount = chatuserCount;
    res.locals.heartCount = heartCount;
    res.locals.studyCount = studyCount;
    res.locals.UseproductCount = UseproductCount;
    res.locals.volunteerCount = volunteerCount;
  }
  next();
});

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
