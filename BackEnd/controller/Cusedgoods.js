const db = require('../model');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

//중고물품 리스트
exports.getUsedgoods = async (req, res) => {
  try {
    const usedgoods = await db.Useproduct.findAll({
      where: {
        ud_date: {
          [Op.lt]: new Date(),
        },
      },
      order: [['ud_date', 'DESC']],
    });
    console.log(usedgoods);

    res.send({ usedgoods: usedgoods });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 판매등록
exports.createusedGoods = async (req, res) => {
  try {
    const {
      u_idx,
      buy_idx,
      ud_price,
      ud_title,
      c_idx,
      ud_content,
      ud_region,
      viewcount,
    } = req.body;
    console.log(req.body);
    // const image=req.file.path;

    if (req.files && req.files.length > 0) {
      // const ud_images = req.files.map(file => file.filename); // 이미지 파일 이름을 저장합니다.
      // 여러장의 이미지 파일의 이름을 배열로 저장
      const ud_images = req.files.map((file) => file.filename);

      // const ud_image = req.files[0].filename;
      const newProducts = await db.Useproduct.create({
        u_idx,
        buy_idx,
        ud_price,
        ud_title,
        c_idx,
        // 여러장의 이미지 이름을 배열로 저장
        ud_image: JSON.stringify(ud_images),
        ud_content,
        ud_region,
        viewcount: 0,
      });

      // 조회수 증가
      await db.Useproduct.increment('viewcount', {
        by: 1,
        where: { ud_idx: newProducts.ud_idx },
      });
      res.send(newProducts);
    } else {
      // 이미지 파일이 업로드되지 않은 경우 에러 메시지를 반환
      res.status(400).send('이미지를 업로드해주세요.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 상세 조회
exports.detailusedGoods = async (req, res) => {
  const usedGoodsId = req.params.ud_idx;
  console.log(usedGoodsId);
  try {

    const product = await db.Useproduct.findByPk(usedGoodsId);

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

//     const product = await db.Usedproducts.findByPk(usedGoodsId, {
//       include: [
//         {
//           model: db.User, // User 모델을 포함
//           attributes: ['nickname'], // User 모델에서 nickname 갖고오기!
//         },
//       ],
//     });
//     if (!product) {
//       res.status(404).send('게시물을 찾을 수 없습니다.');
//       return;
//     }
//     res.send(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('메인화면 에러 발생');
//   }
// };

// 중고물품 수정
exports.modifyusedGoods = async (req, res) => {
  const usedproductId = req.params.ud_idx;
  console.log(usedproductId);
  try {
    const { ud_price, ud_title, c_idx, ud_image, ud_content, ud_region } =
      req.body;
    const updatedusedGoods = await db.Useproduct.update(
      { ud_price, ud_title, c_idx, ud_image, ud_content, ud_region },
      { where: { ud_idx: usedproductId } }
    );
    res.send({ updatedusedGoods, msg: '수정완료!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 기존 코드
// 중고물품 삭제
// exports.deleteusedGoods = async (req, res) => {
//   const usedproductId = req.params.ud_idx;
//   console.log(usedproductId);
//   try {

//     await db.Usedproducts.destroy({ where: { ud_idx: usedproductId } });
//     res.send({ message: '물품이 성공적으로 삭제되었습니다.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('메인화면 에러 발생');
//   }
// };

exports.deleteusedGoods = async (req, res) => {
  const usedproductId = req.params.ud_idx;

  try {

//   디벨롭 서버 코드기준(240108)
    await db.Useproduct.destroy({ where: { ud_idx: usedproductId } });
    res.send({ message: '물품이 성공적으로 삭제되었습니다.' });

// 240108 나영혜 코드 기준  -> 받고 
//       const usedproduct = await db.Usedproducts.findOne({
//       where: { ud_idx: usedproductId },
//     });

//     if (!usedproduct) {
//       return res.status(404).send({ message: '물품을 찾을 수 없습니다.' });
//     }

//     let imagePaths = [];
//     if (usedproduct.ud_image && typeof usedproduct.ud_image === 'string') {
//       // ud_image 필드가 JSON 배열인 경우
//       const images = JSON.parse(usedproduct.ud_image);
//       imagePaths = images.map((image) =>
//         path.join(__dirname, '..', '..', 'static', 'userImg', image)
//       );
//     } else if (usedproduct.ud_image) {
//       // ud_image 필드가 단일 이미지 이름인 경우
//       imagePaths.push(
//         path.join(
//           __dirname,
//           '..',
//           '..',
//           'static',
//           'userImg',
//           usedproduct.ud_image
//         )
//       );
//     }

//     // 이미지 파일 삭제
//     imagePaths.forEach((filePath) => {
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error('이미지 파일 삭제 중 오류:', err);
//           }
//         });
//       }
//     });

//     // 데이터베이스에서 게시글 삭제
//     await usedproduct.destroy();
//     res.sendStatus(200);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류 발생');
  }
};

// 물품 검색
exports.searchusedGoods = async (req, res) => {
  const keyword = req.query.value; //검색어
  console.log('received keyword:', keyword);

  try {
    let result = await db.Useproduct.findAll({
      // 카테고리 검색은..?고민해보자..
      where: {
        [Op.or]: [
          { ud_title: { [Op.like]: `%${keyword}%` } },
          { ud_content: { [Op.like]: `%${keyword}%` } },
          { c_idx: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};
