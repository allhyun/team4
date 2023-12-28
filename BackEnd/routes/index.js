const express = require("express");
const router = express.Router();
const boardController = require("../controller/Cboard")
const studyController =require("../controller/Cstudy")


// 게시판 목록 조회
router.get('/board/list', boardController.board)
// 게시판 등록
router.post('/board/regist', boardController.createBoard)
// 게시판 상세조회
router.get('/board/list/:b_idx',boardController.detailBoard)
// 게시판 수정
// 주소 수정해야함
router.put('/board/list/:b_idx', boardController.modifyBoard)
// 게시판 삭제
// 주소 수정해야함
router.delete('/board/list/:b_idx', boardController.deleteBoard)


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



module.exports = router;