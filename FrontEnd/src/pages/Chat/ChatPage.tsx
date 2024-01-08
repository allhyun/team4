import React from 'react';
import ChatHeader from '../../components/Layout/ChatHeader';
import ChatContents from '../../components/Chat/ChatContents';
import '../../styles/style.scss';
import StudyChatContents from '../../components/Chat/StudyChatContents';
import { useLocation } from 'react-router-dom';

//키값을 받아서 불러오는 컴포넌트를 다르게? key종류:study,market
const ChatPage = () => {
  const location = useLocation();
  const key = location.state?.key;

  return (
    <>
      <div className="chat-header-container">
        <ChatHeader />
        <div className="chat-contents-container">
          {key === 'study-page' && <StudyChatContents />}
          {key === 'market-page' && <StudyChatContents />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
