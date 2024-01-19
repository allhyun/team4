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
exports.getRooms = async (req, res) => {
  try {
    const u_idx = req.body.u_idx;
    console.log('u_idx', u_idx);

    const rooms = await Chattingroom.findAll({
      where: { u_idx: u_idx },
      includes: [
        {
          model: Chatuser,
          attributes: ['r_idx', 'r_name', 'r_create'],
        },
      ],
    });

    console.log('rooms', rooms);
    // return;
    if (rooms.length > 0) {
      res
        .status(200)
        .json({ result: true, msg: '방목록 불러오기 성공', rooms });
    } else {
      res
        .status(404)
        .json({ result: false, msg: '참가한 방인 존재하지 않습니다.' });
    }
  } catch (err) {
    console.error('방 목록 불러오기 실패', err);
    res
      .status(500)
      .json({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
  }
};



// 채팅방 삭제
exports.deleteChatRoom = async (req, res) => {
  try {
    await Chattingroom.destroy({
      where: { r_name: req.body.r_name, u_idx: req.body.u_idx },
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
    const chatRooms = await Chattingroom.findAll({
      //  body로 방이름 받을건지 아니면 params로 번호를 받아올지
      where: { r_name: req.params.r_name },
    });

    if (!chatRooms || chatRooms.length === 0) {
      return res.send({ result: false, msg: '채팅방을 찾을 수 없습니다.' });
    }
    const chatRoomIds = chatRooms.map((room) => room.r_idx);
    const where = { r_idx: { [Op.in]: chatRoomIds } };
    const keyword = req.query.keyword;
    if (keyword) where.c_content = { [Op.like]: `%${keyword}%` };

    const chatMessages = await Chatmessage.findAll({
      where: where,
      attributes: ['c_date', 'c_content', 'u_idx'],
      order: [['c_date', 'ASC']],
    });

    const chatMessagesWithNickname = await Promise.all(
      chatMessages.map(async (message) => {
        const user = await User.findOne({ where: { u_idx: message.u_idx } });
        const nickname = user ? user.nickname : 'Unknown'; // 존재하지 않는 경우에 대한 기본값 설정
        return {
          c_date: message.c_date,
          c_content: message.c_content,
          nickname,
        };
      })
    );

    res.send({
      result: true,
      msg: '채팅한 내용 불러오기 성공.',
      data: chatMessagesWithNickname,
    });
  } catch (err) {
    console.error(err);
    res.send({ result: false });
  }
};

//
