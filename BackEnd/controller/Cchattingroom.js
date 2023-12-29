const { Chattingroom, User } = require('../model');
// const io = require('socket.io')(server, {});

exports.createChatRoom = async (req, res, next) => {
  try {
    const { u_idx, r_name } = req.body; // 요청으로부터 사용자 ID와 방 이름 추출??굳이?

    // 채팅방 생성 변수
    const newRoom = await ChattingRoom.create({
      u_idx: u.idx, // 사용자 번호 req.session.u_idx,
      r_name: req.body.r_name, // 방 이름
      // 여기서 생성 시간좀 확인해보기
    });
    io.on('connection', (socket) => {
      console.log(socket);
      socket.join(`room_${newRoom.r_idx}`);

      // 다른 소켓 동작들 추가할것.
    });

    return res
      .status(201)
      .json({ msg: 'Room create 성공이야!!', room: newRoom });
  } catch (err) {
    console.err('Room 생성 Error 발생 ', err);
    next(err);
  }
};
