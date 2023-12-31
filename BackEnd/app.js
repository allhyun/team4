const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8000;
const router = require('./routes');
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

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.set('io', io);

// 미들웨어를 사용하여 모든 뷰에 로그인 상태(세션)를 전달
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.user;
  console.log(res.locals.user);
  next();
});

app.use('/', router);

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

// socket 파트

// 소켓 연결시
io.on('connection', (socket) => {
  let user = {};
  console.log('Socket connected:', socket.id);

  // 클라이언트가 소켓 룸 생성 요청
  socket.on('createroom', (data) => {
    try {
      const { r_name, userid, nickname } = data;
      user = { r_name: r_name, userid: userid, nickname: nickname };

      socket.join(r_name);
      console.log('찍어보자...:', data);
      io.to(r_name).emit('notice', {
        msg: `${r_name}채팅방 생성 성공!!'`,
      });
    } catch (err) {
      console.error('Room 생성 Error 발생 ', err);
      socket.emit('error', { msg: '알수 없는 오류가 발생했습니다.' });
    }
  });

  socket.on('joinRoom', (data) => {
    try {
      // 방만들기와 비슷하게 data.r_name을 써야 할지?
      const { r_idx, r_name, nickname, userid, u_idx } = data;
      user = {
        r_idx: r_idx,
        r_name: r_name,
        nickname: nickname,
        userid: userid,
        u_idx: u_idx,
      };
      socket.join(r_name);
      console.log('조인할려는 룸', data);
      io.to(r_name).emit('enter', {
        // user닉네임으로 들어올지 아니면 userid로 들어올지
        msg: `${user.nickname} 님이 ${data.r_name} 방에 입장합니다`,
      });
    } catch (err) {
      console.error(err);
      socket.emit('error', { msg: '불러오기 실패' });
    }
  });

  // 채팅 메시지 전송 (이 부분 조금 생각 필요?) ***********
  socket.on('sendMsg', (data) => {
    console.log('채팅메시지 보내기', data);
    io.to(user.r_name).emit('chat', {
      nickname: data.nickname,
      msg: data.msg,
    });
  });

  // 채팅 끊기
  socket.on('disconnect', () => {
    console.log('user disconnected::', user);
    // Postman에서 테스트 해서는 알수 없다 바로 디스커넥트가 실행이 되므로
    // 다른 사용자의 페이지에서 확인해야 한다.
    io.emit('exit', {
      msg: `${user.nickname}님이 방을 떠났습니다.`,
    });
    socket.leave(user.r_name);
  });
});

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
