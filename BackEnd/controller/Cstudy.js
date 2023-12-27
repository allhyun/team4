const db = require("../model");



// 스터디 리스트
exports.getStudies = async (req, res) => {
  try {
    const studies = await db.Study.findAll();
    res.render(studies);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 등록
exports.createStudy = async (req, res) => {
  try {
    const { U_IDX, ST_TITLE, ST_INTRO, ST_NOW_MEM, ST_LIMIT, ST_FE, ST_BE, ST_PUB, ST_FULL } = req.body;
    const newStudy = await db.Study.create({
      U_IDX,
      ST_TITLE,
      ST_INTRO,
      ST_NOW_MEM,
      ST_LIMIT,
      ST_FE,
      ST_BE,
      ST_PUB,
      ST_FULL,
    });
    res.render(newStudy);
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
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 수정
exports.modifyStudy = async (req, res) => {
  const studyId = req.params.id;
  try {
    const { ST_TITLE, ST_INTRO, ST_NOW_MEM, ST_LIMIT, ST_FE, ST_BE, ST_PUB, ST_FULL } = req.body;
    const updatedStudy = await db.Study.update(
      { ST_TITLE, ST_INTRO, ST_NOW_MEM, ST_LIMIT, ST_FE, ST_BE, ST_PUB, ST_FULL },
      { where: { ST_IDX: studyId } }
    );
    res.render(updatedStudy);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 스터디 삭제
exports.deleteStudy = async (req, res) => {
  const studyId = req.params.id;
  try {
    await db.Study.destroy({ where: { ST_IDX: studyId } });
    res.render({ message: 'Study deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};