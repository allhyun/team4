const { Chattingroom, User, Chatuser, Chatmessage } = require('../model');
const { Op } = require('sequelize');
// 방생성
exports.createChatRoom = async (req, res) => {
  try {
    const data = {
      // r_name이 axios 값으로 넘겨줘야한다.***************
      u_idx: req.body.u_idx,
      r_name: req.body.r_name,
    };
    console.log(data);

    // 채팅방 이름 중복확인
    const existingRoom = await Chattingroom.findOne({
      where: { r_name: data.r_name, u_idx: data.u_idx },
    });
    if (existingRoom) {
      // 채팅방 이름이 이미 존재하는 경우
      if (existingRoom.u_idx === data.u_idx) {
        // 같은 유저의 채팅방일경우
        return res.send({
          result: false,
          msg: '이미 존재하는 방입니다.',
          r_idx: existingRoom.r_idx,
        });
      } else {
        // 다른 유정의 채팅방인 경우
        const newRoom = await Chattingroom.create(data);
        const createdTime = newRoom.r_create;
        await Chatuser.create({
          u_idx: data.u_idx,
          r_idx: newRoom.r_idx,
        });
        return res.send({
          result: true,
          msg: '채팅방 생성 성공',
          r_idx: newRoom.r_idx,
        });
      }
    } else {
      // 채팅방 이름이 중복되지 않은경우
      const newRoom = await Chattingroom.create(data);
      const createdTime = newRoom.r_create;
      await Chatuser.create({
        u_idx: data.u_idx,
        r_idx: newRoom.r_idx,
      });
      return res.send({
        result: true,
        msg: '채팅방 생성 성공',
        r_idx: newRoom.r_idx,
      });
    }
  } catch (err) {
    console.error('Room 생성 Error 발생 ', err);
    return res.send({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
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
    res.send({ result: false, msg: '서버 오류 발생' });
  }
};

// 채팅방 삭제
exports.deleteChatRoom = async (req, res) => {
  try {
    await Chattingroom.destroy({
      where: { r_name: req.body.r_name },
    });
    res.send({ result: true, msg: '채팅방이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.send({ result: false, msg: '서버 오류 발생' });
  }
};

// 채팅메시지 기능들 ==========================
// 채팅메시지 생성하기
exports.createChat = async (req, res) => {
  try {
    const data = {
      u_idx: req.body.u_idx,
      r_idx: req.params.r_idx,
      c_content: req.body.c_content,
    };
    const newChat = await Chatmessage.create(data);
    const createdTime = newChat.c_date;
    res.send({ result: true, msg: '채팅생성 성공' });
  } catch (err) {
    console.error('채팅생성 실패!!!', err);
    res.send({ result: false, msg: '서버에서 오류가 발생했습니다.' });
  }
};

// 채팅메시지 조회 + 채팅 메시지 검색
exports.getAllMsg = async (req, res) => {
  try {
    const chatRoom = await Chattingroom.findOne({
      //  body로 방이름 받을건지 아니면 params로 번호를 받아올지
      where: { r_idx: req.params.r_idx },
    });

    let where = { r_idx: chatRoom.r_idx };
    const keyword = req.query.keyword;
    if (keyword) where.c_content = { [Op.like]: `%${keyword}%` };

    const dm = await Chatmessage.findAll({
      where: where,
      attributes: ['c_date', 'c_content', 'u_idx'],
    });
    res.send({ result: true, msg: '채팅한 내용 불러오기 성공.', data: dm });
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
};

//
