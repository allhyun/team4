import React from 'react';
type props = { chat: { type: string; content: string } };
const Chat = (props: props) => {
  return (
    <div className={`list${props.chat.type}-chat`}>
      <div className="content">{props.chat.content}</div>
    </div>
  );
};

export default Chat;
