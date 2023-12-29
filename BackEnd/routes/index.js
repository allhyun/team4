const express = require('express');
const userController = require('../controller/Cuser');
const router = express.Router();
const boardController = require('../controller/Cboard');
const studyController = require('../controller/Cstudy');
const user = require('../controller/Cuser');

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
router.get('/study/:id', studyController.detailStudy);
// 스터디 수정
// 주소 수정해야함
router.put('/study/:id', studyController.modifyStudy);
// 스터디 삭제
// 주소 수정해야함
router.delete('/study/:id', studyController.deleteStudy);
// 스터디 참여(?)

// 로그인 페이지
router.get('/signin', userController.signin);

// 회원가입 페이지
router.get('/signup', user.signup);
router.post('/signup', user.postSignup);

// 아이디 중복확인
router.post('/checkid', user.checkId);

// 닉네임 중복확인
router.post('/checknickname', user.checkNickname);

// 로그인 페이지
router.get('/signin', user.signin);
router.post('/signin', user.postSignin);

// 아이디 찾기
router.get('/findId', user.findId);
router.post('/findId', user.postFindId);

// 비밀번호 찾기
router.get('/findPassword', user.findPassword);
router.post('/findPassword', user.postFindPassword);

// 비밀번호 변경페이지
router.get('/changePassword', user.changePassword);
router.post('/changePassword', user.updatePassword);

// 로그아웃
router.get('/logout', (req, res) => {
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

const chatRoom = require('../controller/Cchattingroom');
// 소켓룸 생성
router.post('/chatcre', chatRoom.createChatRoom);

module.exports = router;
