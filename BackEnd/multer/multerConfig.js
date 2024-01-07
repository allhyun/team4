const multer = require('multer');
const path = require('path');
const sanitizeFilename = require('sanitize-filename');
const fs = require('fs');

// 업로드용 폴더 자동 생성
try {
  fs.accessSync('static/userImg');
} catch (error) {
  console.log('userImg 폴더를 자동 생성합니다.');
  fs.mkdirSync('static/userImg');
}

// 업로드된 파일을 저장할 디렉터리 및 파일명 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/userImg'); // 파일을 저장할 디렉터리
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const sanitizedFilename = sanitizeFilename(
      path.basename(file.originalname, ext)
    );
    cb(null, sanitizedFilename + '__' + Date.now() + ext); // 파일명 설정
  },
});

// 파일 필터 함수 정의 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/tiff',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
  ]; // 허용할 이미지 MIME 타입 목록

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // 허용
  } else {
    cb(new Error('지원하지 않는 파일 형식입니다.'), false); // 거부
  }
};

// 프로필 이미지 파일 업로드를 처리할 Multer 인스턴스 생성
const upload = multer({
  dest: 'uploads/',
  storage: storage,
  fileFilter: fileFilter, // 파일 필터 적용
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = {
  upload,
};
