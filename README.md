<p align="center"><img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/main.JPG" height="200px"></p>

<div align="center">  

  
</div>  
<br/>

# Cockpybara

### 소개
Cockpybara는 Cocktail과 사람들에게 친근감 있는 동물로 알려진 capybara 를 합쳐 만든 이름입니다.
사용자들에게 친근감 있게 여러 칵테일 레시피 정보를 안내하고, 편리하게 이용할 수 있는 
서비스(레시피 즐겨찾기, 주간&월간 레시피 순위, 사용자 레시피 등록 및 조회)
형태를 제공합니다.
<br/><br/>  

### 개발배경 및 목적
소주와 맥주 중심으로 이뤄지던 대한민국 주류 시장의 판도가 바뀌었습니다. 코로나19로 인한 사회적
거리두기는 획일적인 문화와 고질적인 업무 술자리에서 벗어나 좀 더 개인의 취향에 맞는 주류를
지향하는 문화를 촉발시켰고, 다양한 주류와 재료를 취향에 따라 혼합하여 즐기는
칵테일 분야가 폭발적인 성장세를 보였습니다. 하지만, 시장의 성장세에 비해 관련된 정보를 얻을 수
있는 플랫폼, 커뮤니티는 대단히 한정적이고 많은 사람들이 다양한 레시피와 조합을 알지 못하거나
익숙하지 않아 항상 같은 칵테일을 선택하는 경우가 다반사입니다. 이에 따라 칵테일 레시피 조회/추천
웹서비스를 제안하고자 합니다.
<br/><br/>  

## 멤버
#### 프론트
|전소진                                    | 신승혜                                |
|-------------------------------------|-------------------------------------|
|<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/pjJun.jpg" height="200px">|<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/pjSin.jpg" height="200px">|
#### 백엔드
| 안민재                                   | 김지수                               |      
|---------------------------------------|---------------------------------------|
|<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/pjAn.jpg" height="200px">|<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/pjKim.jpg" height="200px">|

<br/><br/>    

## 셋업
- mariaDB에 프로젝트를 생성, 필요한 키값(url, username, password)를 properties에서 추가한다.
- JPA사용을 위한, JPA관련된 설정 properties에 추가한다.
- Naver Object Storage 연결을 위한 endpoint, region을 환경변수에 저장하고 properties에서 추가한다.
- 이미지 업로딩에 필요한 AWS S3 액세스 키와 시크릿 키를 환경변수에 저장하고 properties에서 추가한다.
<br/><br/>     

### 실행 방법
- 터미널 창에 `npm run build`를 입력해 빌드해준뒤, `npm run start`로 실행한다
<br/><br/><br/>    

<div>
	<h2>📚 기술 📚</h2>
</div>

- HTML/CSS/JavaScript
- React.js
- Java
- Spring Web(MVC)
- Spring data JPA
- MariaDB

### 개발툴
- Git & Github
- Github Projects & Issues
- Swagger
- Notion
<br/><br/>  

## 스크린샷
- 메인 화면
<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/main_image.JPG" height="500px">
<br/>

- 칵테일레시피 검색 화면
<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/cocktail_search_image.JPG" height="500px">
<br/>


- 칵테일 레시피 상세내용 화면
<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/recipe_detail_image.JPG" height="500px">
<br/>


- 커뮤니티 화면(주간&월간 레시피 순위, 최근 레시피)
<img src="https://github.com/Minjae-An/Cockpybara/blob/feature/%23190/Cockpybara/src/main/resources/assests/community_image.JPG" height="500px">
<br/>











