const { User } = require('../model');
const crypto = require('crypto');

// 홈화면 랜더링
exports.index = (req, res) => {};
// 회원가입 페이지 랜더링
exports.signup = (req, res) => {};
// 회원가입 페이지 랜더링
exports.postSignup = async (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, salt, iterations, keylen, digest)
    .toString('base64');

  const data = {
    userid: req.body.userid,
    password: hashedPassword, // 암호화된 비밀번호 저장
    salt: salt, // 솔트 저장
    email: req.body.email,
    nickname: req.body.nickname,
  };
  const createUser = await User.create(data);
  // result 결과 필요해서 추가했습니
  // createUser를 클라이언트에서 열어보면 암호화 안 된 비밀번호가 보입니다
  res.send({ createUser, result: true });
};
// 아이디 중복확인
exports.checkId = (req, res) => {
  // user에 안 담으면 콘솔에 Executing(dafault)가 뜹니다
  // 큰 문제는 아니지만 공부할 여지가 있어 보입니다
  const user = User.findAll({
    where: {
      userid: req.body.userid,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 아이디가 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 아이디
      res.send({ duplicate: false });
    }
  });
};

// 닉네임 중복확인
exports.checkNickname = (req, res) => {
  User.findAll({
    where: {
      nickname: req.body.nickname,
    },
  }).then((result) => {
    if (result.length > 0) {
      // 이미 사용 중인 닉네임이 있음
      res.send({ duplicate: true });
    } else {
      // 사용 가능한 닉네임
      res.send({ duplicate: false });
    }
  });
};
// 로그인 화면 랜더링
exports.signin = (req, res) => {
  res.render('./user/signin');
};
// 로그인 화면 랜더링
exports.postSignin = async (req, res) => {
  const user = await User.findOne({ where: { userid: req.body.userid } });

  if (!user) {
    return res.send({ result: false });
  }

  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto
    .pbkdf2Sync(req.body.password, user.salt, iterations, keylen, digest)
    .toString('base64');

  if (user.password === hashedPassword) {
    req.session.user = user; // 세션에 사용자 정보 저장
    req.session.isAuthenticated = true; // 로그인 상태를 true로 설정
    console.log('세션 생성:', req.session); // 세션 상태 출력
    res.send({ result: true, u_idx: user.u_idx });
  } else {
    res.send({ result: false });
  }
};

// 아이디 찾기 페이지 랜더링
exports.findId = (req, res) => {
  res.render('./user/findId');
};
//
exports.postFindId = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((result) => {
    if (result) {
      // 해당 이메일로 등록된 아이디가 있음
      res.send({ userid: result.userid });
    } else {
      // 해당 이메일로 등록된 아이디가 없음
      res.send({ userid: null });
    }
  });
};

// 비밀번호 찾기
exports.findPassword = (req, res) => {};
// 비밀번호 찾기 검증
exports.postFindPassword = async (req, res) => {
  const { userid, email } = req.body;
  const user = await User.findOne({
    where: {
      userid: userid,
      email: email,
    },
  });
  const valid = user !== null;
  res.json({ success: valid });
};

// 비밀번호 변경
exports.changePassword = (req, res) => {};

// 비밀번호 변경 암호화
exports.updatePassword = async (req, res) => {
  const { userid, changePassword } = req.body;
  const user = await User.findOne({ where: { userid: userid } });

  if (!user) {
    return res.send({ result: false, message: '유저를 찾을 수 없습니다.' });
  }

  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto
    .pbkdf2Sync(changePassword, salt, iterations, keylen, digest)
    .toString('base64');

  user.password = hashedPassword;
  user.salt = salt;
  await user.save();

  res.send({
    result: true,
    message: '비밀번호가 성공적으로 변경되었습니다.',
    isAuthenticated: req.session.isAuthenticated,
  });
};

// 마이페이지 랜더링
exports.mypage = async (req, res) => {
  const u_idx = req.session.user;
  const user = await User.findOne({ where: { u_idx: u_idx } });
  console.log(user);
  // res.render('./user/mypage', { data: user });
};

// 닉네임 변경 컨트롤러
exports.updateMypageNickname = async (req, res) => {
  const u_idx = req.session.user.u_idx;
  // console.log(req.session);
  // const u_idx = 8;
  const { nickname } = req.body;

  const user = await User.findOne({ where: { u_idx: u_idx } });

  if (user) {
    user.nickname = nickname;
    await user.save();

    // 세션에 있는 사용자 정보도 업데이트
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        // 에러 처리
        res.send({ result: false, message: '세션 업데이트에 실패하였습니다.' });
      } else {
        res.send({
          result: true,
          message: '닉네임이 성공적으로 수정되었습니다.',
        });
      }
    });
  } else {
    res.send({ result: false, message: '유저를 찾을 수 없습니다.' });
  }
};

// 비밀번호 변경 컨트롤러
exports.updateMypagePassword = async (req, res) => {
  const { u_idx, password } = req.body;

  const salt = crypto.randomBytes(16).toString('base64');
  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString('base64');

  const user = await User.findOne({ where: { u_idx: u_idx } });

  if (user) {
    user.password = hashedPassword;
    user.salt = salt;
    await user.save();

    // 세션에 있는 사용자 정보도 업데이트
    req.session.user = user.dataValues;
    req.session.save((err) => {
      if (err) {
        // 에러 처리
        res.send({ result: false, message: '세션 업데이트에 실패하였습니다.' });
      } else {
        res.send({
          result: true,
          message: '비밀번호가 성공적으로 수정되었습니다.',
        });
      }
    });
  } else {
    res.send({ result: false, message: '유저를 찾을 수 없습니다.' });
  }
};

// 회원 탈퇴
exports.deleteAccount = async function (req, res) {
  const { u_idx, password } = req.body;

  const user = await User.findOne({ where: { u_idx: u_idx } });

  if (!user) {
    return res.send({ result: false, message: '유저를 찾을 수 없습니다.' });
  }

  const iterations = 100;
  const keylen = 64;
  const digest = 'sha512';
  const hashedPassword = crypto
    .pbkdf2Sync(password, user.salt, iterations, keylen, digest)
    .toString('base64');

  if (user.password === hashedPassword) {
    await User.destroy({ where: { u_idx: u_idx } });

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.send({
            result: false,
            message: '세션 삭제 중 오류가 발생했습니다.',
          });
        } else {
          res.send({
            result: true,
            message: '계정이 성공적으로 삭제되었습니다.',
          });
        }
      });
    } else {
      res.send({
        result: false,
        message: '세션이 초기화되지 않았습니다.',
      });
    }
  } else {
    res.send({ result: false, message: '비밀번호가 일치하지 않습니다.' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    // 세션에서 사용자 u_idx를 가져옵니다.
    const userId = req.session.user.u_idx;

    // 사용자를 찾습니다.
    const user = await User.findOne({ where: { u_idx: userId } });
    if (!user) throw new Error('User not found');

    // 이미지 경로를 설정합니다.
    user.image = req.file.path;

    // 변경 사항을 저장합니다.
    await user.save();

    // 세션에 있는 사용자 정보도 업데이트
    req.session.user = user.dataValues;
    req.session.save((err) => {
      if (err) {
        // 에러 처리
        res.send({
          success: false,
          message: '세션 업데이트에 실패하였습니다.',
        });
      } else {
        res.send({
          success: true,
          message: '이미지가 성공적으로 업로드되었습니다.',
          image: req.file.path,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
