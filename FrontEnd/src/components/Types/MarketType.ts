// 데이터 타입

// 메인 로고
export interface MainProps {
  children: React.ReactNode;
}

export interface DataType {
  ud_idx: number; // 게시판 포린키
  u_idx: number | null; // 유저 포린키
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
  nickname: string; // 사용자 닉네임
  ud_images?: string[]; // 이미지 배열
  c_idx: number | null; // 카테고리
}

export interface DetailDataType {
  ud_idx: number; // 게시판 포린키
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
  nickname: string; // 사용자 닉네임
  ud_images?: string[]; // 이미지 배열
  c_idx: number | null; // 카테고리
}
export interface DetailDataType2 {
  userNickname: string;
  ud_idx: number; // 게시판 포린키
  u_idx: number; // 유저 아이디
  buy_idx: number; // 판매 상태 : 0-판매중,1-예약중, 2-판매완료, 3-판매 보류
  ud_price: number | null; // 가격
  ud_title: string; // 상품명
  c_idx: number | null; // 카테고리
  ud_image: string | null; // 상품사진
  ud_content: string; // 상품설명
  ud_region: string; // 거래지역
  viewcount: number; // 조회수
  ud_date: string; // 작성시간
  nickname: string; // 사용자 닉네임
  ud_images?: string[]; // 이미지 배열
  ud_category: number | null;
}
// 에러 메시지 타입 정의
export interface ErrorMessages {
  ud_title: string;
  ud_price: string;
  ud_region: string;
  ud_content: string;
  ud_image: string;
  c_idx_error: string | null;
}

// 카테고리 숫자 변환 함수 타입 정의
export interface CategoryMap {
  [key: string]: number;
}

export interface marketudidx {
  ud_idx: number; // 게시판 포린키
}

export interface propsType {
  page: number;
}

export interface MarketRegionProps {
  value: string;
  onChange: (value: string) => void;
}

// 리덕스 타입지정
export interface MarketState {
  modifyPost: DataType | null;
}

// 찜하기 관련
export interface Heart {
  h_idx: number | null;
  u_idx: number | null;
  ud_idx: number;
}

export interface MarketHeartProps {
  user: number | null;
  product: number;
}

export interface CategoryMapping {
  [key: number]: string;
}
