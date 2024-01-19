module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      // 배포시에는 주소 변경해줄것!!!!
      origin: 'http://localhost:3000',
    },
  });
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
        io.to(r_name).emit('notice', {
          msg: `${r_name}채팅방 생성 성공!!'`,
        });
      } catch (err) {
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
        io.to(r_name).emit('enter', {
          // user닉네임으로 들어올지 아니면 userid로 들어올지
          msg: `${user.nickname} 님이 ${data.r_name} 방에 입장합니다`,
        });
      } catch (err) {
        socket.emit('error', { msg: '불러오기 실패' });
      }
    });

    // 채팅 메시지 전송 (이 부분 조금 생각 필요?) ***********
    socket.on('sendMsg', (data) => {
      io.to(user.r_name).emit('chat', {
        nickname: data.nickname,
        msg: data.msg,
      });
    });

    // 채팅 끊기
    socket.on('disconnect', () => {
      // Postman에서 테스트 해서는 알수 없다 바로 디스커넥트가 실행이 되므로
      // 다른 사용자의 페이지에서 확인해야 한다.
      io.emit('exit', {
        msg: `${user.nickname}님이 방을 떠났습니다.`,
      });
      socket.leave(user.r_name);
    });
  });
};
