//채팅을 표시할 배열만들기
//어떤 채팅방에 어떤입장으로 입장했다는 알림, 퇴장 알림(db삭제했을경우)
//한번 채팅 쓰면 db에 올리기
//엔터 누르면 입력버튼 눌리게
//방 나가는 기능
//특정 주소로 이동
// 채팅하나 보낼때마다 api요청
import { useCallback, useEffect, useMemo, useState } from "react";

import io from "socket.io-client";

const ChatContents = () => {
  return (
    <>
      <div className="chat-con">내용</div>
      <div className="chat-input-container">
        <input type="text" />
        <button>입력</button>
      </div>
    </>
  );
};

export default ChatContents;
