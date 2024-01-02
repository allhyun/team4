const db = require("../model");

//중고물품 리스트
exports.getUsedgoods =async (req, res) => {
  try{
    const usedgoods = await db.Usedgoods.findAll();
    console.log(usedgoods);

    res.send(usedgoods)
  }catch(error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
}