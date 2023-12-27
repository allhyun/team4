const express = require("express");
const app = express();
const server = http.createServer(app);
const PORT = 8000;

const boardController = require("../controller/Cboard")
const studyController =require("../controller/Cstudy")



const cors = require("cors");
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});



// 게시판 목록 조회
app.get('/board/list', boardController.board)
// 게시판 등록
app.post('/board/regist', boardController.createBoard)
// 게시판 상세조회
app.get('/board/list/:b_idx',boardController.detailBoard)
// 게시판 수정
// 주소 수정해야함
app.put('/board/list/:b_idx', boardController.modifyBoard)
// 게시판 삭제
// 주소 수정해야함
app.delete('/board/list/:b_idx', boardController.deleteBoard)


// 스터디 리스트
app.get('/study', studyController.getStudies);
// 스터디 등록
app.post('/study/regist', studyController.createStudy);
// 스터디 상세 조회
app.get('/study/:id', studyController.detailStudy);
// 스터디 수정
// 주소 수정해야함
app.put('/study/:id', studyController.modifyStudy);
// 스터디 삭제
// 주소 수정해야함
app.delete('/study/:id', studyController.deleteStudy);




// 소켓 연결시
io.on("connection", (socket) => {
  console.log('Client connected');

  // 클라이언트에게 메시지 전송
  socket.emit('message', 'Hello from server');

  // 클라이언트로부터 메시지 수신
  socket.on('clientMessage', (data) => {
    console.log(`Received message from client: ${data}`);
  });
});




app.listen(PORT, function () {
    console.log(`Sever Open: ${PORT}`);
  });