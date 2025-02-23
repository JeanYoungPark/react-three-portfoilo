# Interactive 3D Web Experience

React, Three.js, SCSS를 활용한 인터랙티브 3D 웹사이트입니다.
[🔗 Live Demo](http://react-3d-project-bucket.s3-website.ap-northeast-2.amazonaws.com/)

## 기술 스택

-   **Frontend**

    -   React
    -   Three.js (3D 렌더링)
    -   SCSS (스타일링)

-   **배포**
    -   AWS S3
    -   GitHub Actions (CI/CD)

## 주요 기능

-   3D 오브젝트 인터랙션
-   스크롤 기반 애니메이션
-   키보드 기반 캐릭터 컨트롤

## 프로젝트 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/JeanYoungPark/react-three-portfoilo.git
```

2. 종속성 설치

```
npm install
# 또는
yarn install
```

3. 개발 서버 실행

```
npm start
# 또는
yarn start
```

## 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 AWS S3에 배포됩니다.

-   메인 브랜치에 푸시하면 자동으로 배포가 트리거됩니다.
-   GitHub Actions workflow는 .github/workflows 디렉토리에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── components/     # 리액트 컴포넌트
├── styles/         # SCSS 스타일
├── three/          # Three.js 관련 코드
├── hook/           # 리액트 Hook
├── utils/          # 유틸리티 함수들
└── store/          # Recoil 상태 관리
```
