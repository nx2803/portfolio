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

### 1. 하이브리드 제스처 & 스크롤 보호 엔진
- **오버스크롤 쿨다운 (800ms Cooldown)**: 마우스 휠 및 모바일 스와이프 입력 관성으로 인해 여러 섹션이 빠르게 스킵되는 현상을 800ms 쿨다운 락(Lock)을 통해 제어했습니다.
- **수직 스크롤 영역 보호 (`isInsideVerticalScroll`)**: 프로젝트 상세 카드 등 요소 내부에 자체 수직 스크롤(`overflow-y-auto`)이 활성화되어 있을 때, 해당 영역 스크롤이 탑/바텀 끝에 닿기 전까지는 전체 페이지 섹션 이동을 전면 제한하고 자식 요소의 스크롤만 동작하도록 제귀적으로 DOM을 탐색해 조율했습니다.

### 2. 3D 가로 패럴랙스 우주 배경
- **3단계 멀티 레이어 패럴랙스**: 별무리 400개를 원경, 중경, 근경 3개 레이어로 물리 분리하고 횡축 스크롤에 맞추어 X축 이동 비율을 차등 부여하여 입체감 있는 우주 공간을 구현했습니다.
- **최적화**: Remount를 차단하도록 `key` 속성을 걷어내 60fps의 매끄러운 궤적 보간을 유지합니다.

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
