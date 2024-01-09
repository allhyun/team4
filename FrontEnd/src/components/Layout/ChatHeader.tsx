import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatHeader = () => {
  const [chatRoomsList, setChatRoomsList] = useState([]);

  const getRoomsList = () => {
    const response = axios
      .get(`${process.env.REACT_APP_HOST}/chatRoom`)
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
