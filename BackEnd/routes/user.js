const express = require('express');
const router = express.Router();
const userController = require('../controller/Cuser');
const usedgoodsController = require('../controller/Cusedgoods');
const { upload } = require('../multer/multerConfig');

// 회원가입
router.get('/signup', userController.signup);
router.post(
  '/signup',
  upload.single('userProfileImg'),
  userController.postSignup
);

// 아이디 중복확인
router.post('/checkid', userController.checkId);

// 닉네임 중복확인
router.post('/checknickname', userController.checkNickname);

// 로그인 페이지
// router.get('/user/signin', userController.signin);
router.post('/signin', userController.postSignin);

// 아이디 찾기
router.get('/findId', userController.findId);
router.post('/findId', userController.postFindId);

// 비밀번호 찾기
router.get('/findPassword', userController.findPassword);
router.post('/findPassword', userController.postFindPassword);

// 비밀번호 변경페이지
router.get('/changePassword', userController.changePassword);
router.post('/changePassword', userController.updatePassword);

// 로그아웃
router.get('/logout', userController.logout);

// 마이페이지
router.post('/mypage', userController.mypage);

// 마이페이지 유저 정보 수정
router.patch('/updateUserInfo', userController.updateUserInfo);

// 마이페이지 닉네임 수정
router.patch('/updateMypageNickname', userController.updateMypageNickname);

// 마이페이지 비밀번호 수정
router.patch('/updateMypagePassword', userController.updateMypagePassword);

// 마이페이지 회원 탈퇴
router.delete('/deleteAccount', userController.deleteAccount);

router.post(
  '/upload',
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

// 중고물품 찜 목록 조회 이 부분은 user에 들어가야하는거 아님?
router.get('/heart', usedgoodsController.heartList);

module.exports = router;
