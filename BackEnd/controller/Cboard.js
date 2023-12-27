const db = require("../model");


// 게시판 목록 조회
exports.board = async(req,res) => {
  try {
    const boards = await db.Board.findAll();
    res.render(boards);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};


// 게시판 등록
exports.createBoard= async (req, res) => {
  try {
    const { U_IDX, TITLE, CATEGORY, CONTENT, VIEWCOUNT, BREGDATE } = req.body;
    const newBoard = await db.Board.create({
      U_IDX,
      TITLE,
      CATEGORY,
      CONTENT,
      VIEWCOUNT,
      BREGDATE,
    });
    res.render(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 게시물 상세 조회
exports.detailBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await db.Board.findByPk(boardId);
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

// 게시물 수정
exports.modifyBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    const { TITLE, CATEGORY, CONTENT, VIEWCOUNT } = req.body;
    const updatedBoard = await db.Board.update(
      { TITLE, CATEGORY, CONTENT, VIEWCOUNT },
      { where: { B_IDX: boardId } }
    );
    res.json(updatedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};

// 게시물 삭제
exports.deleteBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    await db.Board.destroy({ where: { B_IDX: boardId } });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {console.error(error);
    res.status(500).send('메인화면 에러 발생');
  }
};
