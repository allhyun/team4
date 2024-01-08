import React from "react";
import ChatHeader from "../../components/Layout/ChatHeader";
import ChatContents from "../../components/Chat/ChatContents";
import "../../styles/style.scss";
const ChatPage = () => {
  return (
    <>
      <div className="chat-header-container">
        <ChatHeader />
        <div className="chat-contents-container">
          <ChatContents />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
