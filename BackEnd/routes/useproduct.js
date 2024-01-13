const express = require('express');
const router = express.Router();
const usedgoodsController = require('../controller/Cusedgoods');
const heartController = require('../controller/Cheart');
const { upload } = require('../multer/multerConfig');

// 중고물품 리스트
router.get('', usedgoodsController.getUsedgoods);
// 중고물품 판매하기
router.post(
  '/regist',
  upload.array('ud_image', 5),
  usedgoodsController.createusedGoods
);
// 중고물품 상세 조회
router.get('/detail/:ud_idx', usedgoodsController.detailusedGoods);
// 중고물품 내용 수정
router.put('/detail/:ud_idx', usedgoodsController.modifyusedGoods);
// 중고물품 삭제
router.delete('/delete/:ud_idx', usedgoodsController.deleteusedGoods);
// 중고물품 검색
router.get('/search', usedgoodsController.searchusedGoods);

// 중고물품 찜 등록
router.post('/heart', usedgoodsController.addHeart);
// 중고물품 찜 삭제
router.delete('/heart', usedgoodsController.removeHeart);

module.exports = router;
