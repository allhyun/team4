const db = require("../model");



// 스터디 리스트
exports.getStudies = async (req, res) => {
  try {
    const studies = await db.Study.findAll();
    console.log(studies);

    res.send(studies);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 등록
exports.createStudy = async (req, res) => {
  try {
    const { u_idx, st_title, st_intro, st_now_mem, st_limit, st_fe, st_be, st_pub, st_full } = req.body;
    console.log(req.body);
    const newStudy = await db.Study.create({
      u_idx,
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
  const studyId = req.params.id;
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
  const studyId = req.params.id;
  try {
    const { st_title, st_intro, st_now_mem, st_limit, st_fe, st_be, st_pub, st_full } = req.body;
    const updatedStudy = await db.Study.update(
      { st_title, st_intro, st_now_mem, st_limit, st_fe, st_be, st_pub, st_full },
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
  const studyId = req.params.id;
  try {
    await db.Study.destroy({ where: { st_idx: studyId } });
    res.render({ message: '스터디모집이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 참여하자

exports.joinStudy = async (req,res) => {
  const studyId = req.params.id;
  const userId = req.user.id;


  try {
    const participant = await db.Study.create({
      st_idx: studyId,
      u_idx: userId,
    });

    // Study 모델에서 현재 참가 인원 업데이트
    await Study.increment('ST_NOW_MEM', {
      by: 1,
      where: { ST_IDX: studyId },
    });

    res.json(participant); // 클라이언트에게 성공적인 응답 전송


  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
}