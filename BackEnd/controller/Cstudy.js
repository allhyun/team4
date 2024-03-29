const db = require('../model');
const { Op } = require('sequelize');
// const fs = require('fs');
// const path = require('path');

// 스터디 리스트
// 첫 페이지는 5개 이후는 6개씩
exports.getStudiesPage = async (req, res) => {
  try {
    const page = req.query.page || 1; // 현재 페이지
    let pageSize;
    if (page == 1) {
      pageSize = 5;
    } else {
      pageSize = 6;
    }
    // 페이지당 보여질 항목 수

    let offset;
    if (page == 1) {
      offset = 0;
    } else {
      offset = (page - 1) * 6 - 1;
    }
    // 항상 5으로 설정하여 두 번째 페이지부터는 5개씩 가져오도록 함
    const totalCount = await db.Study.count();
    const resultstudy = await db.Study.findAll({
      attributes: [
        'st_idx',
        'u_idx',
        'st_title',
        'st_intro',
        'st_now_mem',
        'st_limit',
        'st_date',
        'st_fe',
        'st_be',
        'st_pub',
        'st_full',
      ],
      where: {
        st_date: {
          [Op.lt]: new Date(),
        },
      },
      order: [['st_date', 'DESC']],
      limit: pageSize,
      offset: offset,
    });
    res.set('Cache-Control', 'no-store');
    res.send({ resultstudy, totalCount });
    console.log('데이터 보내기', resultstudy);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

exports.createStudy = async (req, res) => {
  try {
    //const sessionUIdx = req.session.user.u_idx;
    const {
      //u_idx,
      st_title,
      st_intro,
      st_now_mem,
      st_limit,
      st_fe,
      st_be,
      st_pub,
      st_full,
    } = req.body;
    const sessionUIdx = req.session.user.u_idx;
    const newStudy = await db.Study.create({
      u_idx: sessionUIdx,
      st_title,
      st_intro,
      st_now_mem,
      st_limit,
      st_fe,
      st_be,
      st_pub,
      st_full,
    });
    res.send(newStudy);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};
// 스터디 상세 조회
exports.detailStudy = async (req, res) => {
  const studyId = req.params.st_idx;
  console.log(studyId); // 이 부분 추가
  try {
    const board = await db.Study.findByPk(studyId);
    if (!board) {
      res.status(404).send('게시물을 찾을 수 없습니다.');
      return;
    }
    res.send(board);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 수정
exports.modifyStudy = async (req, res) => {
  const studyId = req.params.st_idx;
  console.log(studyId);
  try {
    const {
      st_title,
      st_intro,
      st_now_mem,
      st_limit,
      st_fe,
      st_be,
      st_pub,
      st_full,
    } = req.body;
    const updatedStudy = await db.Study.update(
      {
        st_title,
        st_intro,
        st_now_mem,
        st_limit,
        st_fe,
        st_be,
        st_pub,
        st_full,
      },
      { where: { st_idx: studyId } }
    );
    res.send(updatedStudy);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 삭제
exports.deleteStudy = async (req, res) => {
  const studyId = req.params.st_idx;
  console.log(studyId);
  try {
    await db.Study.destroy({ where: { st_idx: studyId } });
    res.send({ message: '스터디모집이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 참여하자

exports.joinStudy = async (req, res) => {
  try {
    // 로그인 여부 확인
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const studyId = req.params.st_idx;
    const userId = req.session.user.id;

    const participant = await db.Study.create({
      st_idx: studyId,
      u_idx: userId,
    });

    // Study 모델에서 현재 참가 인원 업데이트
    await db.Study.increment('ST_NOW_MEM', {
      by: 1,
      where: { st_idx: studyId },
    });

    res.json(participant); // 클라이언트에게 성공적인 응답 전송
  } catch (error) {
    console.error(error);
    res.status(500).send('에러 발생');
  }
};

// 스터디 검색
exports.searchStudy = async (req, res) => {
  const keyword = req.query.value; //검색어
  console.log('received keyword:', keyword);

  try {
    let result = await db.Study.findAll({
      where: {
        [Op.or]: [
          { st_title: { [Op.like]: `%${keyword}%` } },
          { st_intro: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};
