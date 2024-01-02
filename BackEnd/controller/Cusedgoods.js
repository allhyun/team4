const db = require("../model");
const { Op } = require('sequelize');

//중고물품 리스트
exports.getUsedgoods =async (req, res) => {
  try{
    const usedgoods = await db.Usedproducts.findAll();
    console.log(usedgoods);

    res.send(usedgoods)
  }catch(error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
}

// 중고물품 판매하기 등록
exports.createusedGoods = async (req, res) => {
  try {
    const { u_idx, buy_idx, ud_price, ud_title, ud_category, ud_image, ud_content, ud_region, viewcount, ud_date } = req.body;
    console.log(req.body);
    const newProducts = await db.Usedproducts.create({
      u_idx,
      buy_idx,
      ud_price,
      ud_title,
      ud_category,
      ud_image,
      ud_content,
      ud_region,
      viewcount,
      ud_date
    });
    res.send(newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 상세 조회
exports.detailusedGoods = async (req, res) => {
  const usedGoodsId = req.params.ud_idx;
  console.log(usedGoodsId); // 이 부분 추가
  try {
    const product = await db.Usedproducts.findByPk(usedGoodsId);
    if (!product) {
      res.status(404).send('게시물을 찾을 수 없습니다.');
      return;
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};


// 중고물품 수정
exports.modifyusedGoods = async (req, res) => {
  const usedproductId = req.params.ud_idx;
  console.log(usedproductId);
  try {
    const { ud_price, ud_title, ud_category, ud_image, ud_content, ud_region } = req.body;
    const updatedusedGoods = await db.Usedproducts.update(
      { ud_price, ud_title, ud_category, ud_image, ud_content, ud_region },
      { where: { ud_idx: usedproductId } }
    );
    res.send({updatedusedGoods,msg:'수정완료!'});
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 삭제
exports.deleteusedGoods = async (req, res) => {
  const usedproductId = req.params.ud_idx;
  console.log(usedproductId)
  try {
    await db.Usedproducts.destroy({ where: { ud_idx: usedproductId } });
    res.send({ message: '물품이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 물품 검색
exports.searchusedGoods = async(req,res) => {
  const keyword = req.query.value //검색어
  console.log('received keyword:',keyword) 

  try{let result = await db.Usedproducts.findAll({
    // 카테고리 검색은..?고민해보자..
    where: { [Op.or] : [{ud_title:{[Op.like]:`%${keyword}%`}}, { ud_content: { [Op.like]: `%${keyword}%` } }] }
  });
  res.send(result);
  }catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
  
}
