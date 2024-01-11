const db = require('../model');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { User } = require('../model');

//  중고물품 리스트(페이지네이션)
exports.getUsedgoods = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 8; // 페이지당 8개의 항목
    const offset = (page - 1) * pageSize; // 올바른 오프셋 계산

    const totalCount = await db.Useproduct.count(); // 전체 항목 수
    const usedgoods = await db.Useproduct.findAll({
      attributes: [
        'ud_idx',
        'u_idx',
        'buy_idx',
        'ud_price',
        'ud_title',
        'ud_image',
        'ud_content',
        'ud_region',
        'viewcount',
        'ud_date',
        // 'nickname',
        // 'ud_images',
        'c_idx',
      ],
      where: {
        ud_date: {
          [Op.lt]: new Date(),
        },
      },
      order: [['ud_date', 'DESC']],
      limit: pageSize, // 페이지당 항목 수 제한
      offset: offset, // 페이지 시작점
    });
    console.log(usedgoods);

    res.send({ usedgoods: usedgoods, totalCount: totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 판매등록
exports.createusedGoods = async (req, res) => {
  try {
    // req.body와 req.files 로깅
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
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

      // await db.Useproduct.increment('viewcount', {
      //   by: 1,
      //   where: { ud_idx: newProducts.ud_idx },
      // });
      res.send(newProducts);
    } else {
      // 이미지 파일이 업로드되지 않은 경우 에러 메시지를 반환
      res.status(400).send('이미지를 업로드해주세요.');
    }
  } catch (error) {
    console.error('createusedGoods 에러:', error);
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
    // 조회수 증가
    await db.Useproduct.increment('viewcount', {
      where: { ud_idx: usedGoodsId },
    });

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고물품 수정
exports.modifyusedGoods = async (req, res) => {
  const UseproductId = req.params.ud_idx;
  console.log(UseproductId);
  try {
    const { ud_title, c_idx, ud_region, ud_price, ud_content } = req.body;
    console.log('req.body:', req.body);
    // 데이터베이스 업데이트
    await db.Useproduct.update(
      { ud_title, c_idx, ud_region, ud_price, ud_content },
      { where: { ud_idx: UseproductId } }
    );

    // 수정된 데이터 다시 조회
    const updatedProduct = await db.Useproduct.findByPk(UseproductId);
    if (updatedProduct) {
      res.send({ updatedusedGoods: updatedProduct, msg: '수정완료!' });
    } else {
      res.status(404).send({ msg: '수정된 데이터를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류 발생');
  }
};

// 중고 물품 삭제
exports.deleteusedGoods = async (req, res) => {
  const UseproductId = req.params.ud_idx;

  try {
    const Useproduct = await db.Useproduct.findOne({
      where: { ud_idx: UseproductId },
    });

    const usedproduct = await db.Useproduct.findOne({
      where: { ud_idx: UseproductId },
    });

    if (!Useproduct) {
      return res.status(404).send({ message: '물품을 찾을 수 없습니다.' });
    }

    let imagePaths = [];
    if (Useproduct.ud_image && typeof Useproduct.ud_image === 'string') {
      // ud_image 필드가 JSON 배열인 경우
      const images = JSON.parse(Useproduct.ud_image);
      imagePaths = images.map((image) =>
        path.join(__dirname, '..', '..', 'static', 'userImg', image)
      );
    } else if (Useproduct.ud_image) {
      // ud_image 필드가 단일 이미지 이름인 경우
      imagePaths.push(
        path.join(
          __dirname,
          '..',
          '..',
          'static',
          'userImg',
          Useproduct.ud_image
        )
      );
    }

    // 이미지 파일 삭제
    imagePaths.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('이미지 파일 삭제 중 오류:', err);
          }
        });
      }
    });

    // 데이터베이스에서 게시글 삭제
    await Useproduct.destroy();
    res.sendStatus(200);
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
      order: [['ud_date', 'DESC']], // 가장 최근 글부터 정렬
    });
    // 이미지 URL 변환 로직 적용
    const resultWithImageUrl = result.map((product) => {
      let images = JSON.parse(product.ud_image);
      images = images.map((img) => `${img}`);
      return { ...product.toJSON(), ud_image: images };
    });

    res.send(resultWithImageUrl);
  } catch (error) {
    console.error('백엔드 결과:', error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 중고 물품 찜 등록
exports.addHeart = async (req, res) => {
  try {
    // if (!req.session.isAuthenticated) {
    //   return res.status(401).send('로그인이 필요한 기능입니다.');
    // }
    const { u_idx, ud_idx } = req.body;
    const newHeart = await db.Heart.create({
      u_idx,
      ud_idx,
    });

    res.status(200).send(newHeart);
  } catch (error) {
    console.error('하트 추가 에러:', error);
    res.status(500).send('서버 오류 발생');
  }
};
// 중고 물품 찜 삭제
exports.removeHeart = async (req, res) => {
  try {
    // if (!req.session.isAuthenticated) {
    //   return res.status(401).send('로그인이 필요한 기능입니다.');
    // }
    const { u_idx, ud_idx } = req.query;
    await db.Heart.destroy({
      where: {
        u_idx: u_idx,
        ud_idx: ud_idx,
      },
    });
    res.status(200).send('하트 삭제 성공');
  } catch (error) {
    console.error('하트 삭제 에러:', error);
    res.status(500).send('서버 오류 발생');
  }
};

// 찜 목록 조회
// exports.heartList = async (req, res) => {
//   try {
//     const u_idx = req.query;
//     const heartList = await db.Heart.findAll({
//       where: { u_idx: u_idx },
//       includes: [
//         {
//           model: db.Useproduct,
//           attributes: ['ud_idx', 'ud_title', 'ud_image'],
//         },
//       ],
//     });
//     console.log('heartList', heartList);
//     res.send({ success: true, data: heartList });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('메인화면 에러 발생');
//   }
// };

// 찜 목록 조회 2
exports.heartList = async (req, res) => {
  try {
    const u_idx = req.body.query;
    const page = req.query.page || 1;
    const pageSize = 8; // 페이지당 8개의 항목
    const offset = (page - 1) * pageSize; // 올바른 오프셋 계산

    const totalCount = await db.Useproduct.count(); // 전체 항목 수
    const usedgoods = await db.Useproduct.findAll({
      attributes: [
        'ud_idx',
        'u_idx',
        'buy_idx',
        'ud_price',
        'ud_title',
        'ud_image',
        'ud_content',
        'ud_region',
        'viewcount',
        'ud_date',
        'c_idx',
      ],
      where: {
        ud_date: {
          [Op.lt]: new Date(),
        },
      },
      includes: [
        {
          model: db.Heart,
          where: {
            u_idx: u_idx,
            // ud_idx: db.Sequelize.col('Useproduct.ud_idx'),
          },
          required: true,
        },
      ],
      order: [['ud_date', 'DESC']],
      limit: pageSize, // 페이지당 항목 수 제한
      offset: offset, // 페이지 시작점
    });
    console.log(usedgoods);

    res.send({ usedgoods: usedgoods, totalCount: totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};
