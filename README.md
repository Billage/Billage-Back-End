<div align="center">

![header](https://capsule-render.vercel.app/api?type=Waving&color=EBCAFD&fontColor=FFF&height=200&section=header&text=Billage%20Server&fontSize=70)


# 💜1인 가구를 위한 대여 서비스, 빌리지💜

#### 한 번의 나들이 때문에 돗자리 사기를 망설이신 적, <br/>특별한 날에 우리 집에 없는 빔 프로젝터를 사용해보고 싶으셨던 적, <br/> 혼자 먹기에 많은 양의 야채와 과일을 누군가와 나누고 싶었던 적, <br/> 방학 때 사용하지 않는 자취방 때문에 월세가 아까우셨던 적 없으신가요? <br/>그게 아니라면, 몇번 쓰지 않을 물건을 산다고 과소비 해보신 적은 없으신가요? 
#### <br/>빌리지는 이러한 상황에 내 근처에 사는 사람들에게 물건을 빌려주거나 빌릴 수 있는 모바일 웹 서비스입니다. <br/> 가끔은 새로운 물건을 사기보다는 우리 주변에서 빌려보는 건 어떨까요? <br/>빌리지에서 환경은 물론 내 통장 잔고까지 지켜보세요!

</div>


<br/><br/>
## 🔥Server Member🔥
<table align="center">
    <tr align="center" >
        <td align="right">
          <img src="https://user-images.githubusercontent.com/80065381/189288405-06b59bdf-d174-4a6b-9b79-8067f2e80512.png" width="200px">
        </td>
    </tr>
    <tr align="center">
        <td>
             <a href="https://github.com/k-kbk">
              <b>김보겸</b>
            </a>
        </td>
    </tr>
     <tr align="center">
         <td>
            명지대학교 융합소프트웨어학부
        </td>
    </tr>
    <tr align="center">
         <td>
           kkbk-@naver.com
        </td>
    </tr>
</table>



<br/><br/>

## 📝API Sheet📝

| Category     | Method| URI| 설명|
| -------- | --------| --------| --------|
| auth     | GET| /auth| 로그인 상태 확인|
| auth     | POST| /auth/join| 회원가입|
| auth     | POST| /auth/join/kakao| 카카오 로그인 후 회원가입|
| auth     | GET| /auth/email?:email| 이메일 중복 확인|
| auth     | GET| /auth/nick?:nick| 닉네임 중복 확인|
| auth     | GET| /auth/id?:id| 아이디 중복 확인|
| auth     | POST| /auth/login | 로컬 로그인|
| auth     | GET| /auth/logout | 로그아웃|
| auth     | GET| /auth/kakao | 카카오 로그인|
| auth     | GET|/auth/kakao/callback | 카카오 로그인 |
| auth     | POST| /auth/update | 회원정보 수정|
| auth     | GET|/auth/delete | 회원탈퇴|
| mail     | GET|/mail/id?:email	 | 아이디 찾기 메일 전송 |
| mail     | GET|	/mail/pw?:email | 비밀번호 찾기 메일 전송|
| post     | GET|/post/lend | 빌려줄게요 게시판 조회 |
| post     | GET|/post/borrow	 | 빌려줄게요 게시판 조회 |
| post     | POST|/post/img	 | 이미지 업로드 |
| post     | POST|/post/write/lend| 빌려줄게요 게시글 작성 |
| post     | POST|/post/write/borrow	 | 빌려주세요 게시글 작성 |
| post     | POST|/post/update	 | 게시글 수정 |
| post     | GET|/post/id?:id| 게시글 조회 |
| post     | DELETE|/post/id?:id | 게시글 삭제 |
| review     | POST|/review/write	 | 리뷰 작성 |
| review     | GET|/review/list| 내가 쓴 리뷰 조회 |
| revie     | POST|/review/update | 리뷰 수정 |
| review     | GET|/review/id?:id	 | 리뷰 조회 |
| review     | DELETE|/review/id?:id| 리뷰 삭제|
| wish     | POST|/wish/on | 찜 등록 |
| wish     | POST|/wish/off	 | 찜 해제 |
| wish     | GET|/wish/id?:id| 찜 여부 조회|
| wish     | GET|/wish/lend | 빌려줄게요 찜 목록 조회 |
| wish     | GET|/wish/borrow | 빌려주세요 찜 목록 조회 |
| chat     | GET|/chat	| 쪽지 목록 조회|
| chat     | POST|	/chat/send | 쪽지 보내기 |
| chat     | POST|/chat/room |쪽지 방 생성 |
| chat     | GET|/chat/room/room?:roomId		| 쪽지 방 조회|






<br/><br/>

## 🔗ERD🔗

<img width="500" alt="ERD 빌리지" src="https://user-images.githubusercontent.com/80065381/189300928-17aa1adc-752a-4678-923c-e39d4e9d2284.png">


<br/><br/>

## 🔨Tech Stack🔨
- Node.js
- Express
- MySQL
- Sequelize
- GitHub
- Slack


```json
"dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "multer": "^1.4.3",
    "mysql2": "^2.3.0",
    "nodemailer": "^6.7.2",
    "passport": "^0.4.1",
    "passport-kakao": "^1.0.1",
    "passport-local": "^1.0.0",
    "sequelize": "^6.6.5",
    "sequelize-cli": "^6.2.0"
  }
```
<br/><br/>
## 📂Directory📂
<img width="450" alt="디렉토리 - 백" src="https://user-images.githubusercontent.com/80065381/189302340-70c8fa9a-4134-4f94-b5bc-9a4911dd2a32.png">
