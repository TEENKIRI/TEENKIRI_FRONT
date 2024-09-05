![null_틴키리](https://github.com/user-attachments/assets/08a561c5-f43c-4d95-a8ff-13dfd638a6af)

# 팀명: TEENKIRI

## 팀원

<center>
  
| 팀장 | 팀원 | 팀원 | 팀원 | 팀원 |
|:------:|:------:|:------:|:------:|:------:|
| 김창현 | 김정은 | 이예나 | 이한아 | 황요한 |
| ![김창현](https://github.com/user-attachments/assets/6cbde653-2dc2-41bc-967b-98c385ca0324) | ![김정은](https://github.com/user-attachments/assets/39f023ed-c272-4218-b11c-c03c2c51ed5e) | ![이예나](https://github.com/user-attachments/assets/50ca9133-e2ab-4d45-b4ee-200bc1f21f31) | ![이한아](https://github.com/user-attachments/assets/29f30df2-465e-45e3-925a-c84bdb003a72) | ![황요한](https://github.com/user-attachments/assets/f69d21a0-496b-46e3-b380-3443a905a791) |

</center>

- [ ] 아키텍처, 배포 아키텍쳐
- [ ] 아키텍쳐 선정이유
- [ ] 클라이언트랑 서버간에 hand shacke 어떻게 들어가는지
- [ ] 세션 로그인 플로우
- [ ] 시행착오 관련 사항



배포 url
## 주요 기능 명세

| 기능 | 설명 |
|------|------|
| **간편한 회원가입** | 소셜 로그인(구글, 카카오, 네이버) 또는 SMTP를 사용해 이메일 인증을 통한 간편한 회원가입으로, 학생들은 빠르고 쉽게 TEENKIRI의 모든 강의를 수강할 수 있습니다. |
| **다양한 강좌** | 과목별로 다채로운 강좌와 강의를 그리고 추천목록을 제공하여 학생들이 자신에게 맞는 선생님과 강좌를 자유롭게 선택할 수 있습니다. |
| **온라인 영상 강의** | 강의 제공에 필요한 사진과 및 동영상, 게시판 사진들을 로컬 저장소가 아닌 S3(Simple Storage Service)를 사용하여 저장하여 관리와 접근의 편의성을 높여, 언제 어디서든 수강 가능한 고품질 녹화 강의를 제공하여 학생들이 자신의 학습 속도에 맞춰 체계적으로 학습하고 진행률을 확인할 수 있습니다. |
| **소통 기능** | 채팅, 자유게시판, 댓글 등을 통해 다른 학생들과 자유롭게 의견을 나누고 소통할 수 있습니다. |
| **질의응답 시스템** | 학습 중 어려운 부분이나 궁금한 점이 생기면 사진이나 글로 질문을 남길 수 있으며, 실시간 알림을 통해 해당 강좌의 강사가 신속하고 정확한 답변을 제공합니다. |
| **실시간 알림** | SSE를 사용해 한번의 접속으로 질문에 대한 답변이나 댓글 알림을 학생들에게 실시간으로 전달하여 빠르고 원활한 학습 환경을 지원합니다. |
| **실시간 채팅** | web socket과 stomp, redis를 사용하여 서버와 클라이언트의 양방향 통신을 사용하고, web socket의 채널을 이용하여 각 과목별 실시간 채팅을 통해 다른 학생들과 자유롭게 소통할 수 있습니다. |
| **신고 기능** | 부적절한 게시글이나 댓글, 채팅을 신고하여 관리하며, 안전하고 건전한 학습 환경을 유지합니다. |
<br>


## API 명세서
[API 명세서](https://www.notion.so/ara-boka/fc5d0810549e4d1b824bbbaba4e4a317?v=7d45cf341d364c86aaf799a90e747692&pvs=4)

## 스택

### FRONTEND
![Vue.js](https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![vuetify](https://img.shields.io/badge/vuetify-1867C0?style=for-the-badge)


### TOOLS
![Notion](https://img.shields.io/badge/notion-181717?style=for-the-badge&logo=notion&logoColor=white)
![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white)
![Gather](https://img.shields.io/badge/gather-2F5EF5?style=for-the-badge)
![figma](https://img.shields.io/badge/figma-2F5EF5?style=for-the-badge)



<br>

## WBS

[WBS 보기](https://docs.google.com/spreadsheets/d/120qVjj7PFPoHNYqx8IHpAQztUI7F3E29oSD8xP9Lv3Y/edit?pli=1&gid=95638865#gid=95638865)

## 프로젝트 요구사항 명세서

[요구사항 명세서 보기](https://docs.google.com/spreadsheets/d/120qVjj7PFPoHNYqx8IHpAQztUI7F3E29oSD8xP9Lv3Y/edit?pli=1&gid=0#gid=0)
<br>


## 배포 아키텍쳐
이미지 들어갈 자리

### 아키텍쳐 선택이유
적어야할자리

## 시스템 아키텍쳐

### 프론트엔드 아키텍쳐
![프론트아키텍쳐](https://github.com/user-attachments/assets/adf255a8-bd52-484b-8cb5-865c86e1d877)

# 

<details>
  <summary> 통신플로우</summary>
  <img src="https://github.com/user-attachments/assets/a5c9e695-5d42-4d8c-bf0f-0e2914bcd0cf">
  <img src="https://github.com/user-attachments/assets/8b8a8a56-00da-402b-8d8e-d187f81f008c">
  <img src="https://github.com/user-attachments/assets/ced481be-325d-4dcb-b52b-826d4e9065c4">
</details>
<br>


## 구성 스크립트

<details>
  <summary> Front-End</summary>

  ```
  name: deploy teenkiri to aws s3

# main브랜치에 push될때 현재 스크립트 실행 trigger 발동! 
on:
  push:
    branches:
      - main

jobs:
# workflow는 하나 이상의 작업(job)으로 구성. 여기서는 하나의 작업만을 정의
  build-and-deploy:
    runs-on: ubuntu-latest
    # 각 작업은 여러 step(단계)로 구성
    steps: 
    # actions는 github에서 제공되는 공식 workflow
    # checkout은 현재 repo의 main브랜치 소스코드를 copy
      - name: source code checkout
        uses: actions/checkout@v2

      - name: setup node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: npm install
        working-directory: .
        # run은 직접 사용하고자 하는 명령어 !
        run: npm install

      - name: npm build
        working-directory: .
        run: npm run build

      - name: setup aws cli
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{secrets.AWS_ACCESS_KEY}}
          aws-secret-access-key: ${{secrets.AWS_SECRET}}
          aws-region: "ap-northeast-2"
          
      - name: clear s3 bucket
        run: aws s3 rm s3://www.teenkiri.site/ --recursive

      - name: deploy to s3
        run: aws s3 cp ./dist s3://www.teenkiri.site/ --recursive

      - name: invalidate cloudfront caches
        run: aws cloudfront create-invalidation --distribution-id E3SJ4CE9Q85SUU --paths "/*"
  ```
</details>

## 시행착오 및 관련사항

### 소셜로그인
### 실시간 채팅


## 프로젝트 시연

#### 👤 로그인, 회원가입
<details>
  <summary>회원가입 및 로그인</summary>
  <img src="https://github.com/user-attachments/assets/4cc8f76e-4b72-4a83-a12b-d6811b53b024">
</details>

<details>
  <summary>아이디 저장</summary>
  <img src="https://github.com/user-attachments/assets/271e8b47-4686-4949-9ee8-fd7c3d98414a">
</details>

<details>
  <summary>아이디 찾기</summary>
  <img src="https://github.com/user-attachments/assets/8dc01686-587a-4ae7-94ce-c8c9ef840a33">
</details>

<details>
  <summary>비밀번호 찾기</summary>
  <img src = "https://github.com/user-attachments/assets/31659318-a183-4825-9c6c-1a1f4fe5d9e3">
</details>

<details>
  <summary>비밀번호 재설정 링크 사용자 이메일로 전송</summary>
  <img width="1170" alt="비밀번호_재설정_링크" src="https://github.com/user-attachments/assets/d1d59ff7-ec19-4d0b-ae60-9d00ccc7128c">
</details>

<details>
  <summary>구글 로그인</summary>
<img src = "https://github.com/user-attachments/assets/6adbcfab-2034-4241-af68-9a29ea2bd0ad">
</details>

<details>
  <summary>id 저장</summary>
  <img src = "https://github.com/user-attachments/assets/f0aba189-fd64-4381-b8ce-dec71f413cb9">
</details>

<details>
  <summary>로그인 및 로그아웃</summary>
<br>
<summary>로그인</summary>
<img src ="https://github.com/user-attachments/assets/a2f71dc3-a939-4c40-a3da-964b0ed6dd87">
<br>
  <summary>로그아웃</summary>
<img src ="https://github.com/user-attachments/assets/ac47c3f1-f6d9-44c4-8c3f-d10393a46e89">
</details>

#### 📚 강좌 및 강의

<details>
  <summary>강좌 생성 및 강좌 리스트, 강좌 상세</summary>
  <img src="https://github.com/user-attachments/assets/531492fd-d958-40b2-ae54-912b8159e80c">
</details>

<details>
  <summary>강좌 추천</summary>
  <img src="https://github.com/user-attachments/assets/99f3a64f-570b-4c38-bf96-32972a88d6b2">
</details>

<details>
  <summary>강좌 수강신청 및 내가 수강중인 강좌 리스트</summary>
  <img src="https://github.com/user-attachments/assets/f968dfa0-8316-4fe1-8649-674f50c10ac5">
</details>

<details>
  <summary>강의 시청 플레이어, 강의 진행률 서버와 통신, 강의 수강완료 여부 통신</summary>
  <img src= "https://github.com/user-attachments/assets/f7ff0202-637b-4e0b-a25a-606fc532c506">
</details>

<details>
  <summary>강의 후기 작성 및 조회</summary>
  <img src="https://github.com/user-attachments/assets/ff13b853-5ae3-4912-9e99-fa06d87a334c" alt="별점 및 후기">
</details>

<details>
  <summary>강좌 찜, 찜 목록</summary>
  <img src="https://github.com/user-attachments/assets/f5046e16-c634-42a8-a4fd-f6477be81e82">
</details>


#### 📋 게시판

<details>
  <summary>자유게시판 검색</summary>
  <img src="https://github.com/user-attachments/assets/9d2d7b5b-ebe9-4a41-9783-ffd881b72362">
</details>

<details>
  <summary>자유게시판 작성, 수정, 삭제, 댓글, 신고</summary>
  <img src = "https://github.com/user-attachments/assets/bb5b3ce2-22ad-430d-91f9-4a63035acc82">
</details>

<details>
  <summary>질문 게시판 검색</summary>
  <img src = "https://github.com/user-attachments/assets/d21a2480-c7b3-4cf0-bfff-f376c90677e9">
</details>

<details>
  <summary>질문 게시판 작성, 수정, 삭제, 댓글, 신고, 알림</summary>
  <img src= "https://github.com/user-attachments/assets/849eccc6-42da-4238-bc25-e9f3e112923e">
</details>

#### 💬 실시간 채팅

<details>
  <summary>실시간 채팅</summary>
  <img src= "https://github.com/user-attachments/assets/c73dcbd6-9cff-46b1-88f5-4486eb3f6eed">
</details>

#### 🔔 알림

<details>
  <summary>알림 드롭다운, 알림 목록 조회</summary>
  <img src = "https://github.com/user-attachments/assets/5b904e40-f5b0-4864-ae66-4903ea1d1532">
</details>

#### 🚨 신고

<details>
  <summary>게시판별 신고 목록 - 관리자</summary>
  <img src= "https://github.com/user-attachments/assets/3fc0e9f5-54ba-4c33-88fa-be6c36749ea1">
</details>

