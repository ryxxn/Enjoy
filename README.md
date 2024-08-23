## [Enjoy](https://enjoy-enter.web.app)

<div align="center">
   <img src="https://github.com/ryxxn/Enjoy/assets/88328436/04435318-c4e4-4e24-b31f-367427424dc0" alt="logo" />
</div>
<br />
<div align="center">
   <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
   <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
   <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white"/>
   <img src="https://img.shields.io/badge/Zustand-3178C6?style=flat&logo=zustand&logoColor=white"/>
   <img src="https://img.shields.io/badge/Styled%20Components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
   <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white"/>
   <img src="https://img.shields.io/badge/Algolia-003DFF?style=flat&logo=algolia&logoColor=white"/>   
</div>
<br />

## 1. 서비스 개요
   
https://enjoy-enter.web.app/
   
 대학교 학과 행사 참여 스탬프 및 공지 관리 서비스입니다.
해당 학과 이메일로 로그인하면 별도 인증 절차 없이 서비스를 이용할 수 있습니다.

## 2. 주요 기능
   - 사용자
   - - 프로필 수정
     - 스탬프 등록
     - 공지사항 확인
   - 관리자
   - - 사용자 권한 및 상태 관리
     - 스탬프 등록, 수정, 삭제, QR코드 생성 및 다운로드
     - 공지사항 등록, 수정, 삭제
       
  - firebase & algolia를 이용한 실시간 검색 기능 연동
  - code spliting으로 초기 로딩 속도 개선
  - optimistic update로 검색 DB와 싱크가 맞지 않는 문제 해결

## 3. 화면

### 사용자
#### 1. 접속 및 상태별 화면
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/aa73fb58-5d77-440b-b711-6d9ed6378732" alt="user_sreen_by_status1" width="200"/>
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/837aa2f4-0976-4b1d-9762-5dee5645117e" alt="user_sreen_by_status2" width="200" />
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/61bffef3-3262-4fa4-8e19-fd93e581e238" alt="user_sreen_by_status3" width="200" />


#### 2. 프로필 이미지 수정
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/d97a46d2-641c-4fc0-b030-55937c2751cc" alt="user_profile_add" width="200"/>

#### 3. 스탬프 추가
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/25c907e4-ddb1-4693-86b1-172e74e1a6f6" alt="user_stamps" width="200" />

#### 4. 공지사항 조회
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/8d9b01e4-1778-4576-9781-ec0254b3ec44" alt="user_notices" width="200" />

---

### 관리자
#### 1. 사용자 권한, 스탬프, 상태 관리
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/abf01e87-bae1-40c2-863c-403e708ee47f" alt="admin_users" width="1000" />

#### 2. 스탬프 관리 및 QR코드 생성
<img src="https://github.com/ryxxn/Enjoy/assets/88328436/6213cc06-f25f-4dfc-b5cc-820d95e6b1e1" alt="admin_stamp_qr" width="1000" />

## 4. 개발 기간
   - 사용자 웹앱 - 2023.07.20 ~ 2023.07.23
   - 관리자 페이지 - 2024.02.23 ~ 2024.03.01
   - ~ 리팩토링 및 유지 보수 중
     
## 5. 개발 스택
   - React
   - Typescript
   - zustand
   - Styped-component (legacy)
   - Sass
   - Firebase
   - algolia

