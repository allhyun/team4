const { Chattingroom } = require('../model');

// 방생성
exports.createChatRoom = async (req, res) => {
  try {
    const data = {
      // u_idx: req.body.u_idx, // session으로 바꾸는 것도 성정해 놓을것.
      r_name: req.body.r_name,
    }; // 요청으로부터 사용자 ID와 방 이름 추출??굳이?
    console.log(data);
    // 채팅방 생성
    const newRoom = await Chattingroom.create(data);
    const createdTime = newRoom.r_create;
    res.send({ result: true, msg: '채팅방 생성 성공!!' });
  } catch (err) {
    console.error('Room 생성 Error 발생 ', err);
    res.send({ result: false, msg: '알수 없는 오류가 발생했습니다.' });
  }
};

// 방 입장
exports.enterChatRoom = async (req, res) => {
  const { r_idx } = req.body;

  try {
    const room = await Chattingroom.findAll({
      attributes: ['r_idx'],
      where: {
        r_idx: r_idx,
      },
    });

    // findAll()의 결과를 받아온 후에 room을 확인합니다.
    if (room.length > 0) {
      // findAll은 결과가 없어도 빈 배열을 반환하므로 길이를 확인해야 합니다.
      console.log('방 찾기 성공');
      res.send({ result: true });
    } else {
      console.log('방 찾기 실패');
      res.send({ result: false });
    }
  } catch (err) {
    console.error('방 찾기 실패했어ㅋ', err);
  }
};
