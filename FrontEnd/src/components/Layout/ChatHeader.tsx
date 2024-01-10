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

  const getRoomsList = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/getRooms`,
        data
      );
      setChatRoomsList(response.data.rooms);
    } catch (error) {
      // 오류 처리 안하면 가저올 데이터가 없을시 리액트 상에서 axios요청 404떠요!
      console.error('Error fetching room list:', error);
    }
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
        <div className="chat-header-top"></div>
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
