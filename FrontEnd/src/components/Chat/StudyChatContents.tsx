//방 나가는 기능
// 참여 방식을 바꿔야 할 것 같음 (후순위)
//마운트 되면 유저랑 채팅방 비교해서 불러오기
//프롭스로 채팅방 이름 넘기기
//왼쪽 헤더 누르면 리덕스안의 Rname값 바뀌게
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import Chat from './Chat';
import axios from 'axios';
import '../../styles/style.scss';
import { useNavigate } from 'react-router-dom';

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
  `${process.env.REACT_APP_HOST}`,
  {
    autoConnect: false,
  }
);
interface ChatMessage {
  type: string;
  content: string;
}
const StudyChatContents = () => {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatList, setChatList] = useState<{ type: string; content: string }[]>(
    []
  );
  const [Ridx, setRidx] = useState();
  const chatCon = useRef<HTMLDivElement | null>(null);
  const chatData = useSelector((state: any) => state.chat.chat.chatDetail);
  const userData = useSelector((state: any) => state.user.user);
  //소켓 관련

  // useEffect(() => {
  //   setChatList([]);
  //   socket.connect();
  //   setSocketConnected(true);
  //   makeRoom();
  //   getMsg();
  //   return () => {
  //     // 컴포넌트 언마운트 시 소켓 연결 해제
  //     setSocketConnected(false);
  //     socket.disconnect();
  //     // socket.emit('disconnect');
  //     socket.on('exit', (data) => {
  //       console.log(data.msg);
  //     });
  //   };
  // }, []);
  useEffect(() => {
    setChatList([]);
    socket.connect();
    setSocketConnected(true);
    makeRoom();
    getMsg();
    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      setSocketConnected(false);
      socket.disconnect();
      // socket.emit('disconnect');
      socket.on('exit', (data) => {
        console.log(data.msg);
      });
    };
  }, [chatData.st_title]);
  const getMsg = async () => {
    console.log('채팅방 내용 가져오기');
    //api요청 배열로 만들어서 addChatList안에 넣기.. 아마도
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/chatRoom/${chatData.st_title}/chat`
      );
      console.log('채팅방 내용', res.data.data);
      const modifiedData: ChatMessage[] = res.data.data.map(
        ({ c_content, nickname }: { c_content: string; nickname: string }) => ({
          type: nickname === userData.nickname ? 'my' : 'other',
          content: `${nickname}: ${c_content}`,
        })
      );

      // chatList 갱신
      setChatList((prevChatList) => [...prevChatList, ...modifiedData]);
    } catch (error) {
      console.error('axios error:', error);
    }
  };

  const sendMsg = async () => {
    console.log('룸번호', Ridx);
    if (Ridx) {
      if (chatInput !== '') {
        try {
          // axios로 메시지를 서버에 전송
          await axios.post(
            `${process.env.REACT_APP_HOST}/chatRoom/${Ridx}/chat`,
            {
              c_content: chatInput,
              u_idx: userData.u_idx,
            }
          );

          // axios 호출이 완료된 후에 socket.emit 호출
          socket.emit('sendMsg', {
            msg: chatInput,
            nickname: userData.nickname,
          });

          // 추가로 처리해야 할 로직이 있다면 여기에 추가

          setChatInput(''); // 입력창 비우기
        } catch (error) {
          console.error('axios error:', error);
        }
      }
    }
  };
  async function makeRoom() {
    const res = await axios.post(`${process.env.REACT_APP_HOST}/chatRoom`, {
      r_name: chatData.st_title,
      u_idx: userData.u_idx,
    });
    console.log('res.data.r_idx', res.data.r_idx);
    setRidx(res.data.r_idx);
    console.log('내부', Ridx);
    socket.emit('joinRoom', {
      r_idx: res.data.r_idx,
      r_name: chatData.st_title,
      nickname: userData.nickname,
      userid: userData.userid,
      u_idx: userData.u_idx,
    });
  }
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
  useEffect(() => {
    //ref건드려서 스크롤 맨 아래로 내리기
    if (chatCon.current) {
      chatCon.current.scrollTop = chatCon.current.scrollHeight;
    }
  }, [chatList]);
  const handleSendMessage = async () => {
    // 채팅 메시지 전송

    if (socketConnected) {
      // 만약 소켓이 연결되어 있다면 채팅 메시지 전송
      // socket.emit('sendMsg', { msg: chatInput });
      sendMsg();
      setChatInput('');
    } else {
      console.log('소켓이 아직 연결되지 않았습니다.');
    }
  };

  // useEffect(() => {
  //   sendMsg();
  // }, [Ridx]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };
  const destroyRoom = () => {
    // 룸 삭제 후 메인으로 리다이렉트
    axios
      .delete(`${process.env.REACT_APP_HOST}/deleteRoom`, {
        data: {
          r_name: chatData.st_title,
          u_idx: userData.u_idx,
        },
      })
      .then(() => {
        navigate('/');
      });
  };
  return (
    <>
      <div className="chat-name-con">
        <div className="chat-name">{chatData.st_title}</div>
        <button onClick={destroyRoom} className="exit-chat-button">
          채팅방 나가기
        </button>
      </div>

      <div className="chat-con" ref={chatCon}>
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
        <button onClick={handleSendMessage} className="chat-button">
          전송
        </button>
      </div>
    </>
  );
};

export default StudyChatContents;
