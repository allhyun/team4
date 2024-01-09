## 2차 팀 프로젝트: dev.join()

### 팀명: 사조참치사조

### 기획


개발자 스터디 모집 및 개발관련 중고물품 판매 커뮤니티 서비스입니다.
당근마켓, 스터디 모집 페이지 같은 사이트를 레퍼런스로 참고했습니다.

기존 테스트들이 html에 답이 노출되는데, 답을 감추고 서버에서 채점하고 결과를 보여주고자 MVC 패턴으로 기획했습니다.  
부트캠프의 두번째 프로젝트이며 새로 학습한 REACT , MULTER, AWS등을 이용하여 배운 내용과 기술들을 실습을 통해 구현하는데 의의를 뒀습니다.

### 프로젝트 진행 기간

> 23.12.26 ~ 24.01.11

### Stack


<div style="text-align: left;">
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 🛠️ Tech Stacks </h2> <br> 
    <div style="margin: ; text-align: left;" "text-align: left;"> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white">
          <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
          <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
          <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
          <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
          <br/><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
          <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
          <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
          <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
          <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
          <br/></div>
    </div>


### Directory
```bash
📦BackEnd
 ┣ 📂config
 ┃ ┗ 📜config.json
 ┣ 📂controller
 ┃ ┣ 📜Cboard.js
 ┃ ┣ 📜Cchatmessage.js
 ┃ ┣ 📜Cchattingroom.js
 ┃ ┣ 📜Cheart.js
 ┃ ┣ 📜Cstudy.js
 ┃ ┣ 📜Cusedgoods.js
 ┃ ┗ 📜Cuser.js
 ┣ 📂model
 ┃ ┣ 📜Board.js
 ┃ ┣ 📜Category.js
 ┃ ┣ 📜Chatmessage.js
 ┃ ┣ 📜Chattingroom.js
 ┃ ┣ 📜Chatuser.js
 ┃ ┣ 📜Heart.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜Relations.js
 ┃ ┣ 📜Study.js
 ┃ ┣ 📜Useproduct.js
 ┃ ┣ 📜User.js
 ┃ ┗ 📜Volunteer.js
 ┣ 📂multer
 ┃ ┗ 📜multerConfig.js
 ┣ 📂routes
 ┃ ┗ 📜index.js
 ┣ 📂static
 ┃ ┣ 📂marketState
 ┃ ┗ 📂userImg
 ┣ 📂utils
 ┃ ┗ 📜test.txt
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜create.sql
 ┣ 📜package-lock.json
 ┗ 📜package.json
📦FrontEnd
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Chat
 ┃ ┃ ┃ ┣ 📜Chat.tsx
 ┃ ┃ ┃ ┣ 📜ChatContents.tsx
 ┃ ┃ ┃ ┗ 📜StudyChatContents.tsx
 ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┣ 📜ChatHeader.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┃ ┗ 📜Sidebar.tsx
 ┃ ┃ ┣ 📂Market
 ┃ ┃ ┃ ┣ 📜MarketCategory.tsx
 ┃ ┃ ┃ ┣ 📜MarketDeleteModify.tsx
 ┃ ┃ ┃ ┣ 📜MarketEditor.tsx
 ┃ ┃ ┃ ┣ 📜MarketHeader.tsx
 ┃ ┃ ┃ ┣ 📜MarketModify.tsx
 ┃ ┃ ┃ ┣ 📜MarketRegion.tsx
 ┃ ┃ ┃ ┗ 📜MarketThumbnailPost.tsx
 ┃ ┃ ┣ 📂Study
 ┃ ┃ ┃ ┣ 📜StudyCreateBox.tsx
 ┃ ┃ ┃ ┣ 📜StudyDeleteModify.tsx
 ┃ ┃ ┃ ┣ 📜StudyHeader.tsx
 ┃ ┃ ┃ ┣ 📜StudyModify.tsx
 ┃ ┃ ┃ ┣ 📜StudyThumbnailBox.tsx
 ┃ ┃ ┃ ┗ 📜StudyToastEditor.tsx
 ┃ ┃ ┣ 📂StudyMainPage
 ┃ ┃ ┃ ┗ 📜StudyCreateBox.tsx
 ┃ ┃ ┣ 📂Types
 ┃ ┃ ┃ ┗ 📜MarketType.ts
 ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┣ 📜FindId.tsx
 ┃ ┃ ┃ ┣ 📜FindPw.tsx
 ┃ ┃ ┃ ┣ 📜HeaderUser.tsx
 ┃ ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┃ ┗ 📜UserMenu.tsx
 ┃ ┣ 📂Hooks
 ┃ ┃ ┗ 📜useOnClickOutside.tsx
 ┃ ┣ 📂img
 ┃ ┃ ┗ 📂icon
 ┃ ┃ ┃ ┗ 📜x-circle-fill.svg
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Chat
 ┃ ┃ ┃ ┗ 📜ChatPage.tsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┗ 📜Main.tsx
 ┃ ┃ ┣ 📂Market
 ┃ ┃ ┃ ┣ 📜MarketDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜MarketEditPage.tsx
 ┃ ┃ ┃ ┗ 📜MarketMainPage.tsx
 ┃ ┃ ┣ 📂Study
 ┃ ┃ ┃ ┣ 📜StudyDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜StudyEditPage.tsx
 ┃ ┃ ┃ ┣ 📜StudyMainPage.tsx
 ┃ ┃ ┃ ┗ 📜StudySearchPage.tsx
 ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┣ 📜UserFindPage.tsx
 ┃ ┃ ┃ ┣ 📜UserHeartListPage.tsx
 ┃ ┃ ┃ ┣ 📜UserLoginPage.tsx
 ┃ ┃ ┃ ┣ 📜UserMyPage.tsx
 ┃ ┃ ┃ ┗ 📜UserSignupPage.tsx
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜marketmodifyReducer.tsx
 ┃ ┃ ┣ 📜modifyReducer.tsx
 ┃ ┃ ┣ 📜searchReducer.tsx
 ┃ ┃ ┗ 📜user.slice.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📜_chat.scss
 ┃ ┃ ┃ ┣ 📜_header.scss
 ┃ ┃ ┃ ┣ 📜_layout.scss
 ┃ ┃ ┃ ┣ 📜_seacrh.scss
 ┃ ┃ ┃ ┗ 📜_sidebar.scss
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂market
 ┃ ┃ ┃ ┃ ┣ 📜_market_category.scss
 ┃ ┃ ┃ ┃ ┣ 📜_market_detail.scss
 ┃ ┃ ┃ ┃ ┣ 📜_market_edit.scss
 ┃ ┃ ┃ ┃ ┣ 📜_market_editor.scss
 ┃ ┃ ┃ ┃ ┣ 📜_market_header.scss
 ┃ ┃ ┃ ┃ ┗ 📜_market_main.scss
 ┃ ┃ ┃ ┣ 📂study
 ┃ ┃ ┃ ┃ ┣ 📜_study_detail.scss
 ┃ ┃ ┃ ┃ ┣ 📜_study_edit.scss
 ┃ ┃ ┃ ┃ ┗ 📜_study_main.scss
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📜_user_login.scss
 ┃ ┃ ┃ ┃ ┣ 📜_user_main.scss
 ┃ ┃ ┃ ┃ ┣ 📜_user_menu.scss
 ┃ ┃ ┃ ┃ ┣ 📜_user_modal.scss
 ┃ ┃ ┃ ┃ ┣ 📜_user_myPage.scss
 ┃ ┃ ┃ ┃ ┗ 📜_user_signup.scss
 ┃ ┃ ┃ ┗ 📜_main.scss
 ┃ ┃ ┣ 📂setting
 ┃ ┃ ┃ ┣ 📜_common.scss
 ┃ ┃ ┃ ┣ 📜_font.scss
 ┃ ┃ ┃ ┣ 📜_mixin.scss
 ┃ ┃ ┃ ┗ 📜_vars.scss
 ┃ ┃ ┗ 📜style.scss
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜firebase.js
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.tsx
 ┣ 📜.env
 ┣ 📜.env.development
 ┣ 📜.env.production
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
    

### Data Base
<img src="./erd데이터베이스.png" />

## 프로젝트 디테일








#### 팀원

