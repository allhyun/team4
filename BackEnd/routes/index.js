const express = require('express');
const userController = require('../controller/Cuser');
const router = express.Router();
const boardController = require('../controller/Cboard');
const studyController = require('../controller/Cstudy');
const user = require('../controller/Cuser');
const { upload } = require('../multer/multerConfig');

router.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// 게시판 목록 조회
router.get('/board/list', boardController.board);
// 게시판 등록
router.post('/board/regist', boardController.createBoard);
// 게시판 상세조회
router.get('/board/list/:b_idx', boardController.detailBoard);
// 게시판 수정
// 주소 수정해야함
router.put('/board/list/:b_idx', boardController.modifyBoard);
// 게시판 삭제
// 주소 수정해야함
router.delete('/board/list/:b_idx', boardController.deleteBoard);

// 스터디 리스트
router.get('/study', studyController.getStudies);
// 스터디 등록
router.post('/study/regist', studyController.createStudy);
// 스터디 상세 조회
router.get('/study/detail/:st_idx', studyController.detailStudy);
// 주소 수정해야함
router.put('/study/detail/:st_idx', studyController.modifyStudy);
// 스터디 삭제
router.delete('/study/delete/:st_idx', studyController.deleteStudy);
// 스터디 참여(?)
router.post('/study/join/:st_idx', studyController.joinStudy);

// 스터디 검색
router.get('/study/search', studyController.searchStudy);

// 로그인 페이지
router.get('/signin', userController.signin);

// 회원가입 페이지
router.get('/user/signup', user.signup);
router.post('/user/signup', user.postSignup);

// 아이디 중복확인
router.post('/user/checkid', user.checkId);

// 닉네임 중복확인
router.post('/user/checknickname', user.checkNickname);

// 로그인 페이지
router.get('/user/signin', user.signin);
router.post('/user/signin', user.postSignin);

// 아이디 찾기
router.get('/user/findId', user.findId);
router.post('/user/findId', user.postFindId);

// 비밀번호 찾기
router.get('/user/findPassword', user.findPassword);
router.post('/user/findPassword', user.postFindPassword);

// 비밀번호 변경페이지
router.get('/user/changePassword', user.changePassword);
router.post('/user/changePassword', user.updatePassword);

// 로그아웃
router.get('/user/logout', (req, res) => {
  req.session.destroy((err) => {
    // 세션 삭제
    if (err) {
      console.error(err);
    } else {
      console.log('세션 삭제, 현재 세션 상태:', req.session); // 세션 상태 출력
      res.redirect('/'); // 로그인 페이지로 리다이렉트
    }
  });
});

// 마이페이지
router.get('/user/mypage', user.mypage);

// 마이페이지 닉네임수정
router.patch('/user/updateMypageNickname', user.updateMypageNickname);

// 마이페이지 비밀번호 수정
router.patch('/user/updateMypagePassword', user.updateMypagePassword);

// 마이페이지 회원 탈퇴
router.delete('/user/deleteAccount', userController.deleteAccount);

router.post('/user/upload', upload.single('image'), user.uploadImage, (error, req, res, next) => {
  if (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } else {
    next();
  }
});

const chatRoom = require('../controller/Cchattingroom');
// 소켓룸 생성
router.post('/chatcre', chatRoom.createChatRoom);

// 방에 입장하기
// router.post('/joinroom', chatRoom.enterChatRoom);
module.exports = router;
