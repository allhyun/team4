const { Chattingroom } = require('../model');
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

exports.createChatRoom = async (req, res) => {
  try {
    const data = {
      u_idx: req.body.u_idx,
      r_name: req.body.r_name,
    }; // 요청으로부터 사용자 ID와 방 이름 추출??굳이?
    console.log(data);
    // 채팅방 생성
    const newRoom = await Chattingroom.create(data);
    const createdTime = newRoom.r_create;
    io.of('/').on('connection', (socket) => {
      console.log('???????', socket);
      socket.join(`room_${newRoom.r_idx}`);

      // 다른 소켓 동작들 추가할것.
    });
    console.log(res);
    return res
      .status(201)
      .json({ msg: 'Room create 성공이야!!', room: newRoom });
  } catch (err) {
    console.error('Room 생성 Error 발생 ', err);
  }
};
