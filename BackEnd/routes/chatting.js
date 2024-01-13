const express = require('express');
const router = express.Router();
const chatRoom = require('../controller/Cchattingroom');

// 소켓룸 생성
router.post('/chatRoom', chatRoom.createChatRoom);
// 방 목록 받아오기
router.post('/getRooms', chatRoom.getRooms);

// 방 삭제하기
router.delete('/deleteRoom', chatRoom.deleteChatRoom);

// 채팅 파트
// 채팅 전송
// r_idx지우고 Room/chat
router.post('/chatRoom/:r_idx/chat', chatRoom.createChat);
// 채팅방 내용조회
router.get('/chatRoom/:r_name/chat', chatRoom.getAllMsg);

module.exports = router;
