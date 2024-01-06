const db = require('../model');
// const UsedProducts = require('../model/Usedproducts'); 

// 찜하기
exports.addHeart = async(req,res) => {

  try {
    
    const {u_idx, ud_idx} = req.body;

    // 찜한상품인지 확인하기
    const alreadyHeart= await db.Heart.findOne({
      where: {u_idx,ud_idx}
    });
    if(alreadyHeart){
      res.send('이미 찜한 상품입니다.')
    }

    const newHeart = await db.Heart.create({u_idx,ud_idx}) 
    console.log(newHeart);

    res.send({ success: true, message: '상품을 찜했습니다.', data: newHeart });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
}

// 찜목록 조회
exports.heartList =async(req,res)=>{
  try {
    const { u_idx } = req.query;
    const heartList = await db.Heart.findAll({
      where:{u_idx},
      include:[{
        model : db.Usedproducts,
        attributes: [
          'ud_idx',
          'ud_title',
          'ud_image']
        }
      ]
    });
    res.send( {success: true, data:heartList})
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
}

// 찜 제거
exports.outHeart = async(req,res)=>{
  const deleteHid = req.params.h_idx;
  console.log(deleteHid);
  try{ 
  //   await db.Heart.destroy({
  //   where: {  h_idx:deleteHid },
  // });

  // res.send({message: '찜한 물품이 삭제되었습니다.'})

  const { u_idx, product_id } = req.body; // 클라이언트에서 사용자 ID와 상품 ID를 전달받아야 함

  // 찜 리스트에서 제거
  const deletedRows = await db.Heart.destroy({
    where: { u_idx, product_id },
  });

  if (deletedRows === 0) {
    return res.status(404).send('찜 리스트에서 해당 상품을 찾을 수 없습니다.');
  }

  res.send({ success: true, message: '찜 리스트에서 제거되었습니다.' });




} catch (error) {
  console.error(error);
  res.status(500).send('메인화면 에러 발생');
}
};