import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const [chatRoomsList, setChatRoomsList] = useState([]);
  const u_idx = useSelector((state: any) => state.user.user.u_idx);

  const getRoomsList = () => {
    const response = axios
      .get(`${process.env.REACT_APP_HOST}/chatRoom`, {
        params: { u_idx },
      })
      .then((res) => {
        setChatRoomsList(res.data.rooms);
      });
  };
  console.log('chatRoomsList', chatRoomsList);

  useEffect(() => {
    // 룸 목록 불러오기
    getRoomsList();
  }, []);

  return (
    <>
      <div className="caht-header">ChatHeader</div>
      {chatRoomsList.length > 0 && (
        <div className="chat-room">
          {chatRoomsList.map((room: any) => (
            <div className="room-idx">{room.r_name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatHeader;
