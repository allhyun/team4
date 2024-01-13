const express = require('express');
const studyController = require('../controller/Cstudy');
const router = express.Router();
const { upload } = require('../multer/multerConfig');

// 스터디 리스트
// router.get('/study', studyController.getStudies);
// 스터디 리스트 페이지(6개씩)
router.get('', studyController.getStudiesPage);
// 스터디 등록
router.post('/regist', studyController.createStudy);
// 스터디 상세 조회
router.get('/detail/:st_idx', studyController.detailStudy);
// 스터디 수정
router.put('/detail/:st_idx', studyController.modifyStudy);
// 스터디 삭제
router.delete('/delete/:st_idx', studyController.deleteStudy);
// 스터디 참여(?)
router.post('/join/:st_idx', studyController.joinStudy);

// 스터디 검색
router.get('/search', studyController.searchStudy);
//스터디 이미지
router.post('/upload', async (req, res) => {
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

module.exports = router;
