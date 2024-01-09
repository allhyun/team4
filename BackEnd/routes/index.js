const express = require('express');
const userController = require('../controller/Cuser');
const router = express.Router();
// const boardController = require('../controller/Cboard');
const studyController = require('../controller/Cstudy');
const usedgoodsController = require('../controller/Cusedgoods');
const user = require('../controller/Cuser');
const { upload } = require('../multer/multerConfig');

// router.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

// 스터디 리스트
// router.get('/study', studyController.getStudies);
// 스터디 리스트 페이지(6개씩)
router.get('/study', studyController.getStudiesPage);
// 스터디 등록
router.post('/study/regist', studyController.createStudy);
// 스터디 상세 조회
router.get('/study/detail/:st_idx', studyController.detailStudy);
// 스터디 수정
router.put('/study/detail/:st_idx', studyController.modifyStudy);
// 스터디 삭제
router.delete('/study/delete/:st_idx', studyController.deleteStudy);
// 스터디 참여(?)
router.post('/study/join/:st_idx', studyController.joinStudy);

// 스터디 검색
router.get('/study/search', studyController.searchStudy);
//스터디 이미지
router.post('/study/upload', async (req, res) => {
  try {
    // 이미지 업로드 미들웨어
    upload.single('image')(req, res, (err) => {
      if (err) {
        // 업로드 실패
        console.error(err);
        res.status(500).json({ message: err.message });
      } else {
        // 업로드 성공 시 이미지 URL을 클라이언트에 응답
        res.json({ imageUrl: req.file.path.replace(/\\/g, '/') });
      }
    });
  } catch (error) {
    // 기타 에러 처리
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 중고물품 리스트
router.get('/product', usedgoodsController.getUsedgoods);
// 중고물품 판매하기
router.post(
  '/product/regist',
  upload.array('ud_image', 5),
  usedgoodsController.createusedGoods
);
// 중고물품 상세 조회
router.get('/product/detail/:ud_idx', usedgoodsController.detailusedGoods);
// 중고물품 내용 수정
router.put('/product/detail/:ud_idx', usedgoodsController.modifyusedGoods);
// 중고물품 삭제
router.delete('/product/delete/:ud_idx', usedgoodsController.deleteusedGoods);
// 중고물품 검색
router.get('/product/search', usedgoodsController.searchusedGoods);

// 유저 관심 목록 조회
// router.get('/user/heart', userController.hearList);

// 회원가입
router.get('/user/signup', userController.signup);
router.post(
  '/user/signup',
  upload.single('userProfileImg'),
  userController.postSignup
);

// 아이디 중복확인
router.post('/user/checkid', userController.checkId);

// 닉네임 중복확인
router.post('/user/checknickname', userController.checkNickname);

// 로그인 페이지
// router.get('/user/signin', userController.signin);
router.post('/user/signin', userController.postSignin);

// 아이디 찾기
router.get('/user/findId', userController.findId);
router.post('/user/findId', userController.postFindId);

// 비밀번호 찾기
router.get('/user/findPassword', userController.findPassword);
router.post('/user/findPassword', userController.postFindPassword);

// 비밀번호 변경페이지
router.get('/user/changePassword', userController.changePassword);
router.post('/user/changePassword', userController.updatePassword);

// 로그아웃
router.get('/user/logout', userController.logout);

// 마이페이지
router.post('/user/mypage', userController.mypage);

// 마이페이지 유저 정보 수정
router.patch('/user/updateUserInfo', userController.updateUserInfo);

// 마이페이지 닉네임 수정
router.patch('/user/updateMypageNickname', userController.updateMypageNickname);

// 마이페이지 비밀번호 수정
router.patch('/user/updateMypagePassword', userController.updateMypagePassword);

// 마이페이지 회원 탈퇴
router.delete('/user/deleteAccount', userController.deleteAccount);

router.post(
  '/user/upload',
  upload.single('image'),
  userController.uploadImage,
  (error, req, res, next) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      next();
    }
  }
);

const chatRoom = require('../controller/Cchattingroom');
// 소켓룸 생성
router.post('/chatRoom', chatRoom.createChatRoom);
// 방 목록 받아오기
router.get('/chatRoom', chatRoom.renderRooms);
// router.get('/chatRoom/:r_idx', chatRoom.renderRoom);
// 방에 입장하기
// router.post('/chatRoom/:r_idx', chatRoom.enterRoom);
// 이 방나가기 삭제하기 고민좀...해야할듯?
// 방 나가기
// router.delete('/chatRoom/:r_idx', chatRoom.outRoom);
// 방 삭제하기
// router.delete('/deleteRoom', chatRoom.deleteChatRoom);

// 채팅 파트
// 채팅 전송
// r_idx지우고 Room/chat
router.post('/chatRoom/:r_idx/chat', chatRoom.createChat);
// 채팅방 내용조회
router.get('/chatRoom/:r_idx/chat', chatRoom.getAllMsg);

module.exports = router;
