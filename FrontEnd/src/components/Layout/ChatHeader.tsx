//리덕스에서 가져온 Study내용의 제목이 바뀌면
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setchatDetail } from '../../store/chatReducer';

const ChatHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chatRoomsList, setChatRoomsList] = useState([]);

  const u_idx = useSelector((state: any) => state.user.user.u_idx);
  const chatData = useSelector((state: any) => state.chat.chat.chatDetail);
  const data = { u_idx: u_idx };

  const getRoomsList = () => {
    const response = axios
      .post(`${process.env.REACT_APP_HOST}/getRooms`, data)
      .then((res) => {
        setChatRoomsList(res.data.rooms);
      });
  };

  useEffect(() => {
    // 룸 목록 불러오기
    getRoomsList();
  }, []);
  const changeRoomname = (rName: string) => {
    //리덕스값 변경후 chatting창으로 리다이렉트
    dispatch(setchatDetail({ st_title: rName, st_idx: chatData.st_idx }));
    navigate('/chatting', { state: { key: 'study-page' } });
  };
  return (
    <>
      <div className="chat-header">
        채팅방
        {chatRoomsList.length > 0 && (
          <div className="chat-room">
            {chatRoomsList.map((room: any) => (
              <div
                key={room.r_idx}
                className="room-idx"
                onClick={() => changeRoomname(room.r_name)}
              >
                {room.r_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatHeader;
