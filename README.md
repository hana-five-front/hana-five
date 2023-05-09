# Digital Hanaro Portal - 5조
## 1. 프로젝트 개요

> 1. "디지털 하나로" 수강생들에게 필요한 파편화된 정보를 "원큐"로 모았습니다.
> 2. 디지털 하나로의 다음 기수 홍보에 도움이 되는 사이트로 만들겠습니다.
> 3. 수강생간의 소통, QNA 등을 담아내는 커뮤니티 사이트로 만들겠습니다.

<br>

## 2. 프로젝트 컨벤션

<br>

### 2.1. 웹 표준 컨벤션
- 웹 표준에 맞춘 개발을 지향합니다.
    - 무분별한 `<div>`를 지양하고, `<main>`, `<nav>`, `<h2>`, `<input>` 태그를 적절히 사용합니다.
    - 각 컴포넌트별로 `<h2 style="display:hidden">영역 제목</h2>` 과 같은 형태로 웹 접근성을 준수합니다. 
    - `<meta>` 태그의 적극적인 활용으로 SEO에 진심을 다합니다.


<br>


## 2.2. CSS Convention
- 최신 Front-End 트렌드에 맞게 공통 스타일 클래스, 컬러등을 지정하는  `base.css`를 만들어 활용합니다.
- 각 페이지별 특화된 스타일링은 각 페이지별 CSS파일로 개발합니다.

<br>

## 2.3. 개발 Tool Convention
- Prettier, ESLint, Code Spell Checker를 사용합니다. 

<br>

## 2.4. Commit Convention
- Add, Fix, Style, Docs 등의 Prefix를 사용합니다.
- 상세 내용은 한글로 작성합니다.
- 필요시 커밋메시지 바디부에 상세 내용을 작성합니다.
- ex) `Add: 메인 페이지 캐러셀 구현` 

<br>

## 2.5. Branch 전략
- main - develop - page(또는 feature) 브랜칭합니다.
- Merge전략은 "Squash and Merge"로 진행합니다.


<br>

## 2.6. PR Convention
- PR Template을 통해 PR을 생성합니다.

> 
> ### 코드 작성 이유
> 
> <br>
> 
> ### 상세 사항
> 
> <br>
> 
> ### 참고 사항
> 
> <br>
> 
> #### CheckList
> 
> - [ ] 웹표준 준수
> - [ ] 코딩 컨벤션 준수
> - [ ] 커밋 컨벤션 준수
> 

<br>