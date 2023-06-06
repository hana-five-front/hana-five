# 디지털 하나로 커뮤니티


<img src="https://github.com/hana-five-front/hana-five/assets/79887655/f74feb31-be31-4f85-b328-50375fcc0eb4" height="50%" width="50%">
&nbsp&nbsp
<img src="https://github.com/hana-five-front/hana-five/assets/79887655/49be1a95-3099-46d5-9153-8cb1d08d3ce1" height="20%" width="20%">

<br>

##  배포 Url
http://digital-hanaro.netlify.app

<br>

## 프로젝트 소개

<p align="justify">
디지털 하나로 수강생, 희망생에게 정보를 제공하고 소통할 수 있는 장을 마련
</p>
<p align="justify">
  반응형 웹으로 구현
</p>
<p align="justify">
Project Hosting : 디지털 하나로 1기 5조
</p>
<p align="justify">
개발 기간 : 2023.5~2023.6
</p>
<br>

## 구현 기능

### 메인 페이지

- 카카오 로그인
  - javascript key를 이용해 user 정보 가져옴
- 무한으로 돌아가는 자동/수동 메인 캐러셀
- 원형 룰렛 - 맛집 주소와 카카오맵 API 연동
- QnA, 슬랙과 연동된 1대 1 문의 챗봇
  - 소켓을 통해 슬랙 <-> 챗봇에서 소통

### 소개 페이지

- 스크롤 이벤트

### 지원 페이지

- 스크롤 이벤트

### 교육 페이지

- 월별 교육 캘린더
  - 캘린더 js로 구현
- 강사 소개

### 커뮤니티 페이지

- 글 작성 페이지
  - 이메일을 기준으로 sessionStorage user 내용을 확인하여 글 수정, 삭제가 가능
- slack과 연동된 공지사항 페이지
  -  redis 서버를 두어 공지사항 렌더 시간을 줄임

<br>

## 아키텍처

<img src="https://github.com/hana-five-front/hana-five/assets/79887655/bfdd4da9-49b2-4439-9c4d-d9ef488795cd" height="50%" width="50%">




## 기술 스택

| HTML | CSS | Javascript |
|:------------------------------:|:---------------------------------:|:----------------------------------:|
| ![html](https://github.com/hana-five-front/hana-five/assets/79887655/a4bf7a0c-3c23-4bfd-8be0-001409dcd041) | ![css](https://github.com/hana-five-front/hana-five/assets/79887655/45936309-7797-442e-8623-448c4099bf38) | ![javascript](https://github.com/hana-five-front/hana-five/assets/79887655/7abda892-b2fb-417e-b61a-0c6696694f68) |

<br>

## 협업 tool

| Notion | Figma | Github |
|:------------------------------:|:---------------------------------:|:----------------------------------:|
| ![notion](https://github.com/hana-five-front/hana-five/assets/79887655/f13c2115-1b75-44e1-b57a-c7725af1c52c) | ![figma](https://github.com/hana-five-front/hana-five/assets/79887655/ee2764d2-75d0-4190-b944-7fca83668678) | <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="100" height="100"/> |

<br>

## 팀원

| 이름                                      | 역할 |
| ----------------------------------------- | ---- |
| [이수창](https://github.com/eternalclash) | 팀장 |
| [임채동](https://github.com/Chaedie)      | 팀원 |
| [이상준](https://github.com/ssangjun)     | 팀원 |
| [이현주](https://github.com/hhyunjooo)    | 팀원 |
| [장주성](https://github.com/jangjuseong)  | 팀원 |
