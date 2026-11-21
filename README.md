# TRILOGY PORTFOLIO //

Astro와 React, TypeScript를 기반으로 구축된 테크니컬 감성의 3부작(Trilogy) 프로젝트 포트폴리오 웹사이트입니다. 정적 페이지 서빙의 이점과 복잡한 프론트엔드 인터랙션 요구사항을 아일랜드 아키텍처(Islands Architecture)를 통해 해결했습니다.

---

## 🛠 Tech Stack

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=F024B6)

---

## 🚀 Key Engineering Highlights

### 1. 단일 스크롤 엔진 & 섹션 상태 동기화
- **Lenis 인스턴스 전역 공유**: 스무스 스크롤 인스턴스를 하나만 띄우고 `src/lib/scroll.ts`의 `scrollToSection()`을 통해 헤더 내비게이션과 로드맵 카드 클릭이 모두 같은 엔진을 사용합니다. 네이티브 `scrollIntoView`와 Lenis가 서로 스크롤을 제어하며 발생하던 충돌을 제거했습니다.
- **IntersectionObserver 기반 활성 섹션 추적**: 세로로 이어진 7개 섹션 중 가장 많이 보이는 섹션이 `$activeSection`(nanostores)에 반영되고, 이 단일 상태가 액센트 컬러·배경 연출·헤더 인디케이터를 동시에 구동합니다.

### 2. 캔버스 기반 우주 배경 (세로 패럴랙스)
- **3단계 멀티 레이어 패럴랙스**: 별 1,600개를 원경·중경·근경 3개 레이어로 분리하고, 세로 스크롤 Y값과 마우스 오프셋에 레이어별 배율을 다르게 적용해 깊이감을 만듭니다. 화면을 벗어난 별은 모듈로 연산으로 반대편에서 순환합니다.
- **렌더 비용 최소화**: React 리렌더 없이 `requestAnimationFrame`과 `ref`로만 스크롤/마우스 값을 읽어 단일 `<canvas>`(DPR 대응)에 그립니다. 마우스 트레일은 `pointer: coarse` 환경에서 렌더 자체를 건너뜁니다.

---

## 📂 Trilogy Projects Architecture

### Phase 01. PEECE MAKER (제주 화장실 시각화 & 로컬 커뮤니티)
- **Supabase RLS 기반 Serverless 보안**: 백엔드 서버 없이 PostgreSQL RLS 정책과 JWT 세션 검증을 DB 단에 직접 구현하여 API 우회를 통한 악성 변조를 방지했습니다.
- **Kakao Map Marker Clustering**: 1,500개 이상의 지도 마커를 렌더링할 때 발생하는 DOM 렌더링 병목을 Kakao Map Clusterer 동적 그룹화로 최적화했습니다.

### Phase 02. FOR THE TEAM (실시간 글로벌 스포츠 허브 플랫폼)
- **이기종 데이터 어댑터 패턴**: ESPN, LCK, KBO 등 다양한 스포츠 제공업체의 데이터 규격을 단일 도메인(League, Team, Match)으로 정규화하여 유지보수성을 극대화했습니다.
- **Next.js PPR (Partial Prerendering)**: 페이지의 정적 뼈대를 고속 서빙하는 동시에 실시간 스코어 수신부를 WebSocket 및 React Query 캐시 Invalidation과 결합해 실시간 동기화했습니다.

### Phase 03. UFC - Ultimate Framework Championship (시계열 기술 분석 배치 & GenAI)
- **Java 21 Virtual Threads & Spring Batch 6**: 수천 건의 기술 지표 API I/O 호출 병목을 가상 스레드로 논블로킹 최적화하고 Spring Batch의 Chunk Processing 구조로 트랜잭션 적재를 마쳤습니다.
- **Gemini AI 정합성 2차 검증 엔진**: FastAPI 및 google-genai SDK 기반 해석 생성 전, 백엔드가 최근 데이터의 유효성을 2차 검증하여 AI 환각(Hallucination) 생성을 차단했습니다.

---

## 🛠 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
