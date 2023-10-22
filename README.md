# **포켓몬 도감 프론트엔드 과제**

## **Contents**

- [**포켓몬 도감 프론트엔드 과제**](#포켓몬-도감-프론트엔드-과제)
  - [**Contents**](#contents)
  - [**Requirements**](#requirements)
  - [**Tools**](#tools)
  - [**환경 세팅**](#환경-세팅)
  - [**테스트 방법**](#테스트-방법)
  - [**실행 방법**](#실행-방법)
  - [**Features**](#features)
  - [**Dependencies**](#dependencies)
  - [**TroubleShooting**](#troubleShooting)
  - [**Code Structure**](#code-structure)

## **Requirements**

1. Typescript : 5.2.2
2. React : 18.2.0
3. Next: 13.5.6 (디렉토리 구조는 12버전의 구조로 진행)
4. Axios : 1.5.1
5. React-Query : 4.33.0
6. Reduxjs/toolkit : 1.9.7
7. Redux : 8.1.3
8. Redux-Persist : 6.0.0
9. Lodash : 4.17.21
10. React-Window : 1.8.9
11. Tailwindcss : 3.3.3
12. Postcss : 8.4.31
13. Autoprefixer : 10.4.16
14. ESLint : 8.51.0
15. Prettier : 3.0.3

## **Tools**

| Tool          | Name                                                       |
| ------------- | ---------------------------------------------------------- |
| IDE           | Visual Studio Code                                         |
| Code Managing | [Github](https://github.com/gggongbo/pokedex-frontend.git) |

## **환경 세팅**

```bash
# ubuntu 환경 기준으로 작성
sudo apt install nodejs #nodejs 설치
sudo apt install npm #npm 설치

# In project path
yarn | npm install #node_modules 설치
```

## **테스트 방법**

```bash
yarn dev | npm run dev
```

## **실행 방법**

```bash
yarn build | npm run build
yarn start | npm run start
```

## **Features**

| Feature               | Description                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 포켓몬 리스트 조회    | 첫 화면. 포켓몬 리스트(포켓몬 번호, 포켓몬 영문명) 조회 가능, 무한 스크롤 기능 동작                                  |
| 포켓몬 번호 검색      | 포켓몬 리스트 화면에서 포켓몬 번호로 포켓몬 검색 가능                                                                |
| 포켓몬 상세 화면 조회 | 포켓몬 리스트 화면에서 원하는 포켓몬 클릭하여 진입, 포켓몬 번호, 영문명, 키, 몸무게, 타입, 기술, 진화 단계 확인 가능 |

## **Dependencies**

| Dependency                         | Description                                                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-window                       | 무한 스크롤 사용 시 패칭된 데이터, 렌더링된 컴포넌트가 누적되어 DOM에 쌓이는 현상 발생. 이런 경우 버벅이는 현상 등이 발생할 수 있어, DOM 최적화를 위해 사용 |
| @reduxjs/toolkit                   | redux state 변경 및 관리를 위한 action, reducer를 slice 파일 하나에서 관리 가능하여 사용                                                                    |
| react-redux, redux-persist         | 글로벌 state 관리를 위해 사용                                                                                                                               |
| next-redux-wrapper                 | ServerSide에서 redux state 조회, 변경 작업을 위해 사용                                                                                                      |
| @tanstack/react-query              | 외부 API(포켓몬 API) 관련 캐싱, ServerSide에서의 Prefetch 기능을 쓰기 위해 사용                                                                             |
| axios                              | response timeout 설정 등 외부 API 통신시 다양한 옵션 이용 하기 위해 사용                                                                                    |
| lodash                             | isString과 같은 유틸성 함수 이용하기 위해 사용                                                                                                              |
| tailwindcss, postcss, autoprefixer | 빠른 스타일링 작업을 위해 사용                                                                                                                              |
| uuid                               | 컴포넌트의 unique Key 생성 위해 사용                                                                                                                        |

## **TroubleShooting**

| Date       | Issue                                                                                     | Description                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 2023-10-22 | 포켓몬 리스트 화면에서 포켓몬 번호 검색 후 Reset 버튼 클릭시 무한 스크롤 동작 안되는 현상 | 검색 관련 로컬 state 변화에 따라 IntersectObserver 동작하게 하여 해결                       |
| 2023-10-22 | url 직접 입력시 /pokemons/zz 와 같은 형식으로 접근하는 경우에 대한 예외 처리 없음         | 포켓몬 상세화면 Serverside에서 예외처리 후 포켓몬 리스트 화면으로 리다이렉트하도록해서 해결 |

## **Todo**

| Todo                  | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| 포켓몬 한글 이름 조회 | https://pokeapi.co/api/v2/pokemon-species 를 활용하여 한국 이름 및 다국어 조회 기능 추가 |

## **Code Structure**

- **components**: 아토믹 디자인 적용하여 공통 컴포넌트 작성
  - atom
    - Button.tsx
    - Search.tsx
- **hooks**: 커스텀 훅
  - useInClick.ts
  - useIntersectObserver.ts
  - useUpdateEffect.ts
- **store**: redux store 설정 로직 위치
- **slices**: redux toolkit slices(reducer+action) 로직 위치
- **services**: axios를 사용한 [포켓몬 API](https://pokeapi.co/) 통신 로직 위치
- **styles**: 공통 적용 css 위치
  - globals.css
- **pages**
  - pokemons
    - [pokemonId]
      - index.tsx : 포켓몬 상세 화면, 동적 라우팅
    - index.tsx : 포켓몬 리스트 화면
  - \_app.tsx
  - \_document.tsx
  - \_layout.tsx : 화면 공통 적용 레이아웃 위치
