const { Chattingroom, User, Chatuser, Chatmessage } = require('../model');

// 방생성
exports.createChatRoom = async (req, res) => {
  try {
    const data = {
      // r_name이 axios 값으로 넘겨줘야한다.***************
      u_idx: req.session.user.u_idx,
      r_name: req.body.r_name,
    };

    console.log(data);
    // 채팅방 생성
    const newRoom = await Chattingroom.create(data);
    const createdTime = newRoom.r_create;
    await Chatuser.create({
      u_idx: req.session.user.u_idx,
      r_idx: newRoom.r_idx,
    });
    res.send({ result: true, msg: '채팅방 생성 성공!!' });
  } catch (err) {
    console.error('Room 생성 Error 발생 ', err);
    res.send({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
  }
};
// 방목록 불러오기(리스트들)
exports.renderRooms = async (req, res) => {
  try {
    const rooms = await Chattingroom.findAll();
    console.log(rooms);
    if (rooms) {
      res.status(200).json({ result: true, msg: '방로딩 성공', data: rooms });
    } else {
      res.status(404).json({ result: false, msg: '방이 존재하지 않습니다.' });
    }
  } catch (err) {
    console.error('방 목록 불러오기 실패', err);
    res
      .status(500)
      .json({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
  }
};
exports.renderRoom = async (req, res) => {
  try {
    const room = await Chattingroom.findOne({
      where: { r_idx: req.params.r_idx },
    });
    console.log(room);
    if (room) {
      res.status(200).json({ result: true, msg: '방로딩 성공', data: room });
    } else {
      res.status(404).json({ result: false, msg: '방이 존재하지 않습니다.' });
    }
  } catch (err) {
    console.error('방 목록 불러오기 실패', err);
    res
      .status(500)
      .json({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
  }
};

// 채팅방 입장
exports.enterRoom = async (req, res) => {
  const r_idx = req.params.r_idx;
  try {
    const room = await Chattingroom.findOne({
      where: { r_idx: r_idx },
    });
    await Chatuser.create({
      u_idx: req.session.user.u_idx,
      r_idx: room.r_idx,
    });
    console.log(room, room.r_idx, room.r_name, '방에 입장합니다');
    res.send({ result: true, data: room });
  } catch (err) {
    console.error(err);
    res.send({ result: false, msg: '불러오기 실패' });
  }
};

// 채팅방 나가기
exports.outRoom = async (req, res) => {
  // const r_idx = req.params.r_idx;
  try {
    const ctuser = await Chatuser.findOne({
      where: { r_idx: req.params.r_idx },
    });
    const room = await Chattingroom.findOne({
      where: { r_idx: req.params.r_idx },
    });
    if (ctuser.r_idx === room.r_idx) {
      await Chatuser.destroy({
        where: {
          r_idx: ctuser.r_idx,
        },
      });
      console.log(ctuser, '삭제 성공');
      res.send({ result: true, data: { ctuser, room } });
    }
  } catch (err) {
    console.error(err);
    res.send({ result: false, msg: '뭐가 문제일가요?' });
  }
};
