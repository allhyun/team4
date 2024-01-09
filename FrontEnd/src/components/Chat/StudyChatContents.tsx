//채팅을 표시할 배열만들기
//어떤 채팅방에 어떤입장으로 입장했다는 알림, 퇴장 알림(db삭제했을경우)
//한번 채팅 쓰면 db에 올리기
//엔터 누르면 입력버튼 눌리게
//방 나가는 기능
//특정 주소로 이동
// 채팅하나 보낼때마다 api요청

//-----------------배열만들기 마운트시에 axios로 채팅방 내용 가져와서 배열에 차곡차곡 담기
//전송버튼 배열안의 개수가 0이면 룸만들고 룸정보 db에 넣기
//전송버튼 누르면
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import Chat from './Chat';
import axios from 'axios';
import '../../styles/style.scss';

// 서버에서 보내는 이벤트 및 클라이언트에서 보내는 이벤트의 타입을 정의
type ServerToClientEvents = {
  // 서버에서 보내는 이벤트 타입 정의 (필요에 따라 수정)
  receivedMessage: (message: string) => void;
  connection: () => void;
  enter: (data: { msg: string }) => void;
  notice: (data: { msg: string }) => void;
  chat: (data: { nickname: string; msg: string }) => void;
  exit: (data: { msg: string }) => void;
};

type ClientToServerEvents = {
  // 클라이언트에서 서버로 보내는 이벤트 타입 정의 (필요에 따라 수정)
  sendMsg: (data: { msg: string; nickname: string }) => void;
  createroom: (data: {
    r_name: string;
    userid: string;
    nickname: string;
  }) => void; // 방 만들기 이벤트
  joinRoom: (data: {
    r_idx: string;
    r_name: string;
    nickname: string;
    userid: string;
    u_idx: string;
  }) => void; // 방 참여 이벤트
  disconnect: () => void;
};

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:8000',
  {
    autoConnect: false,
  }
);

const StudyChatContents = () => {
  const [chatInput, setChatInput] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatList, setChatList] = useState<{ type: string; content: string }[]>(
    []
  );
  const [Ridx, setRidx] = useState();
  const studyData = useSelector((state: any) => state.study.study.studyDetail);
  const userData = useSelector((state: any) => state.user.user);
  //소켓 관련

  useEffect(() => {
    socket.connect();
    setSocketConnected(true);

    // // 방 생성 성공 시의 서버 응답 처리
    // socket.on('notice', (data) => {
    //   console.log(data.msg);
    // });

    // // 방 입장 성공 시의 서버 응답 처리
    // socket.on('enter', (data) => {
    //   console.log(data.msg);
    // });

    // // 채팅 메시지 수신 시의 서버 응답 처리
    // socket.on('chat', (data) => {
    //   console.log(`${data.nickname}: ${data.msg}`);
    // });

    // // 방 떠남 시의 서버 응답 처리
    // socket.on('exit', (data) => {
    //   console.log(data.msg);
    // });

    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      setSocketConnected(false);
      socket.disconnect();
      // socket.emit('disconnect');
      socket.on('exit', (data) => {
        console.log(data.msg);
      });
    };
  }, []);

  const sendMsg = () => {
    console.log('룸번호', Ridx);
    if (chatInput !== '') {
      socket.emit('sendMsg', { msg: chatInput, nickname: userData.nickname });
      setChatInput('');
      axios.post(`${process.env.REACT_APP_HOST}/chatRoom/${Ridx}/chat`, {
        c_content: chatInput,
        u_idx: userData.u_idx,
      });
    }
  };
  const addChatList = useCallback(
    (res: { nickname: string; msg: string }) => {
      const type = res.nickname === userData.nickname ? 'my' : 'other';
      const content = `${res.nickname}: ${res.msg}`;
      const newChatList: { type: string; content: string }[] = [
        ...chatList,
        { type: type, content: content },
      ];
      setChatList(newChatList);
    },
    [chatList]
  );
  useEffect(() => {
    socket.on('chat', addChatList);
  }, [addChatList]);

  const handleSendMessage = async () => {
    // 채팅 메시지 전송

    if (socketConnected) {
      // 만약 소켓이 연결되어 있다면 채팅 메시지 전송
      // socket.emit('sendMsg', { msg: chatInput });
      if (chatList.length === 0) {
        // socket.emit('createroom', {
        //   r_name: 'study' + studyData.st_idx,
        //   userid: userData.u_idx,
        //   nickname: userData.nickname,
        // });
        console.log('u_idx값', userData.u_idx);
        const res = await axios.post('http://localhost:8000/chatRoom', {
          r_name: 'study' + studyData.st_idx,
          u_idx: userData.u_idx,
        });
        console.log(res.data.r_idx);
        setRidx(res.data.r_idx);
        console.log('내부', Ridx);
        socket.emit('joinRoom', {
          r_idx: res.data.r_idx,
          r_name: 'study' + studyData.st_idx,
          nickname: userData.nickname,
          userid: userData.userid,
          u_idx: userData.u_idx,
        });
        sendMsg();
        // addChatList({ nickname: userData.nickname, msg: chatInput });
        //배열안에 내용 집어넣기
      } else {
        // addChatList({ nickname: userData.nickname, msg: chatInput });
        sendMsg();
      }

      setChatInput('');
    } else {
      console.log('소켓이 아직 연결되지 않았습니다.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  return (
    <>
      <div className="chat-con">
        스터디 관련 채팅 내용
        {chatList.map((chat, i) => {
          // if (chat.type === 'notice') return <Notice key={i} chat={chat} />;
          return <Chat key={i} chat={chat} />;
        })}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </>
  );
};

export default StudyChatContents;
