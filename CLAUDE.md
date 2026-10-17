# CLAUDE.md — UI 컴포넌트 및 UX 레이어 카탈로그 프로젝트

이 문서는 CareerFoundry의 [32 UI Elements Designers Need To Know](https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/)를 기반으로 한 **32가지 핵심 UI 컴포넌트**와 웹/앱 개발에 필수적인 **UX 공통 레이어 컴포넌트(모달, 알림, 토스트, 스낵바, 바텀 시트 등)**를 제공하는 인터랙티브 디자인 시스템 및 코드 쇼케이스 프로젝트의 개발 가이드입니다.

---

## 1. 프로젝트 개요

- **프로젝트명**: UI Element Specimen & UX Layer Showcase (UI 컴포넌트 & UX 레이어 도감)
- **목적**:
  - 디자이너와 프론트엔드 개발자가 자주 사용하는 표준 UI 컴포넌트 32종과 핵심 UX 피드백/레이어 컴포넌트들을 한곳에서 탐색.
  - 각 컴포넌트의 명확한 정의, 권장 사용 사례(Usecase), 접근성(A11y) 기준 제시.
  - 라이브 인터랙티브 미리보기(Live Preview) 환경 제공.
  - 실무 사이트에 즉시 복사하여 붙여넣을 수 있는 격리된 HTML, CSS, JavaScript 코드 제공 및 구문 강조(Syntax Highlighting), 원클릭 복사 기능 지원.

---

## 2. 기술 스택 및 개발 원칙

### 핵심 기술
- **구조 (Markup)**: Semantic HTML5, WAI-ARIA 접근성 속성 준수
- **스타일 (CSS)**: Vanilla CSS3, CSS Custom Properties (디자인 토큰 시스템), Flexbox & Grid 레이아웃 (외부 무거운 프레임워크 지양)
- **로직 (JavaScript)**: Modern Vanilla JavaScript (ES6+), 모듈화된 데이터 구조
- **코드 하이라이팅**: Prism.js (경량 CDN) 또는 내장 정규식 기반 구문 강조기
- **타이포그래피**: Outfit, Pretendard, JetBrains Mono (Google Fonts / CDN)

### 아키텍처 원칙
1. **독립성 (Self-contained & Copy-paste Ready)**:
   - 각 컴포넌트는 다른 컴포넌트나 거대한 외부 라이브러리에 의존하지 않고, 해당 컴포넌트의 HTML + CSS + JS만 복사하면 즉시 동작해야 합니다.
2. **시각적 완성도 (Visual Excellence & WOW Factor)**:
   - 다크 모드 / 라이트 모드 테마 전환 지원.
   - 정밀한 HSL 컬러 팔레트, 세련된 글래스모피즘, 부드러운 트랜지션 및 마이크로 인터랙션 적용.
3. **접근성 및 사용성 (Accessibility & UX)**:
   - 키보드 탐색 지원(`Enter`, `Space`, `Escape`, `Tab`).
   - 적절한 `aria-expanded`, `aria-hidden`, `role`, `aria-label` 속성 적용.

---

## 3. 디렉토리 구조

```plaintext
/home/erdos/workspace/ui-component/
├── index.html                 # 메인 애플리케이션 진입점 (단일 반응형 웹앱)
├── CLAUDE.md                  # 프로젝트 가이드 및 컨벤션 (본 문서)
├── README.md                  # 프로젝트 소개 문서
├── prompt.md                  # 요구사항 명세
├── css/
│   ├── main.css               # 메인 레이아웃 및 셸 스타일
│   ├── theme.css              # 색상 팔레트 및 디자인 토큰 (다크/라이트)
│   ├── prism-theme.css        # 코드 하이라이터 테마
│   └── components.css         # 공통 UI 및 쇼케이스용 베이스 스타일
├── js/
│   ├── app.js                 # 메인 애플리케이션 로직 (라우팅, 탭, 복사, 검색)
│   ├── highlighter.js         # 코드 구문 강조 모듈
│   └── data/
│       ├── components-32.js   # 32가지 CareerFoundry 표준 UI 컴포넌트 데이터
│       └── ux-layers.js       # 공통 모달, 알림, 토스트, 바텀 시트 등 레이어 데이터
└── docs/
    └── resource/              # 참고 원본 리소스 및 카탈로그 예제
```

---

## 4. 컴포넌트 구성 명세

### A. 32가지 표준 UI 컴포넌트 (CareerFoundry 기반)
카테고리는 4가지 대분류로 구성됩니다:

1. **입력 제어 (Input Controls)**
   - `Button` (버튼): 사용자 작업 실행 및 제출
   - `Checkbox` (체크박스): 복수 선택 가능한 항목
   - `Radio Button` (라디오 버튼): 단일 선택 옵션
   - `Toggle` (토글 스위치): 온/오프 상태 즉시 전환
   - `Dropdown` (드롭다운): 목록에서 항목 선택
   - `Input Field` (입력 필드): 텍스트, 숫자 등 단일 행 입력
   - `Search Bar` (검색창): 실시간 쿼리 입력 및 초기화
   - `Slider` (슬라이더): 연속적/단계적 값 조절
   - `Stepper` (스텝퍼): 숫자 증감 카운터
   - `Date Picker` (날짜 선택기): 캘린더 기반 날짜 선택
   - `Picker` (피커): 색상, 시간 등 특정 속성 선택기
   - `Form` (폼): 유효성 검사를 포함한 종합 입력 양식

2. **내비게이션 (Navigational Components)**
   - `Accordion` (아코디언): 단계적 정보 노출 및 아코디언 접기/펼치기
   - `Breadcrumb` (브레드크럼): 현재 페이지 계층 경로 역추적
   - `Bento Menu` (벤토 메뉴): 3x3 그리드 형태의 앱/기능 런처
   - `Hamburger Menu` (햄버거 메뉴): 3선 모바일/서브 내비게이션 토글
   - `Kebab Menu` (케밥 메뉴): 세로 3점(⋮) 추가 옵션 메뉴
   - `Meatball Menu` (미트볼 메뉴): 가로 3점(…) 보조 메뉴
   - `Pagination` (페이지네이션): 긴 목록의 페이지 분할 탐색
   - `Side Menu` (사이드 메뉴): 수직 내비게이션 드로어/사이드바
   - `Tab Bar` (탭 바): 동일 위계의 뷰 전환 탭

3. **정보 제공 (Informational Components)**
   - `Icon` (아이콘): 시각적 메타포 및 보조 기호
   - `Loader` (로더/스피너): 비동기 작업 대기 인디케이터
   - `Notification Badge` (알림 배지): 읽지 않은 상태/수치 표시
   - `Progress Bar` (진행률 바): 작업 진행 상태 시각화
   - `Tag / Chip` (태그 및 칩): 메타데이터 분류, 필터링 및 삭제 가능한 태그
   - `Tooltip` (툴팁): 호버/포커스 시 보조 설명 팝오버

4. **컨테이너 (Containers)**
   - `Card` (카드): 관련 정보와 행동을 묶는 독립적 컨테이너
   - `Carousel` (캐러셀): 슬라이드 형태의 순차적 콘텐츠 뷰어
   - `Comment` (댓글 목록): 대댓글 및 사용자 소통 스레드 컨테이너
   - `Feed` (피드): 무한 스크롤 또는 타임라인 형태의 동적 콘텐츠 목록
   - `Modal` (기본 모달): 오버레이 기반 대화상자

---

### B. UX 필수 공통 모달 & 레이어 컴포넌트 (Layer & Feedback)
사이트 운영 및 사용자 피드백에 필수적인 레이어 처리 컴포넌트:

1. **Alert Modal (경고 모달)**: 치명적 오류, 주의 알림 및 확인을 강제하는 차단형 다이얼로그
2. **Confirm Modal (확인/삭제 다이얼로그)**: 삭제, 결제 등 취소 불가능한 작업 전 최종 확인(승인/취소) 모달
3. **Toast Notification (토스트 알림)**: 화면 우상단/하단에 떠서 3~4초 후 자동 소멸하는 비차단 피드백
4. **Action Snackbar (스낵바)**: "실행 취소(Undo)" 버튼이 포함된 작업 완료 피드백 바
5. **Top Announcement Banner (상단 공지 배너)**: 시스템 점검, 이벤트, 업데이트 등을 알리는 전체 너비 배너
6. **Bottom Sheet (바텀 시트)**: 모바일 친화적인 하단 슬라이드 시트 (드래그/모달/비모달 형태)
7. **Slide-over Drawer (슬라이드오버 패널)**: 화면 우측에서 슬라이드 인/아웃되는 상세 설정/장바구니 패널
8. **Popover Confirm (팝오버 인라인 확인창)**: 특정 버튼 바로 위/아래에 붙는 미니 확인창

---

## 5. 컴포넌트 데이터 규격 (Data Schema)

컴포넌트 데이터 객체는 일관된 형식을 유지합니다:

```javascript
{
  id: "accordion",                // 고유 식별자 (영문 케밥케이스)
  num: 1,                         // 번호 (1 ~ 32 또는 레이어 ID)
  name: "Accordion",              // 영문 명칭
  nameKo: "아코디언",             // 국문 명칭
  category: "container",          // 카테고리 (input | nav | info | container | layer)
  desc: "제목을 클릭하면 본문이...", // 핵심 정의 및 설명
  usecase: "FAQ, 설정 메뉴, 상품 상세", // 권장 활용처
  feature: "단계적 정보 노출 (Progressive Disclosure)", // 주요 특징
  a11y: "aria-expanded 속성으로 열림/닫힘 상태를 스크린리더에 전달합니다.", // 웹 접근성 팁
  html: `<div class="...">...</div>`, // 복사 가능한 HTML
  css: `.accordion { ... }`,          // 격리된 CSS (클래스 스코프)
  js: `// 인터랙션 로직...`           // 필요한 경우 JS 코드 (없으면 빈 문자열)
}
```

---

## 6. 개발 및 실행 가이드

### 실행 방법
별도의 빌드 과정 없이 정적 파일 호스팅 또는 브라우저에서 직접 구동 가능합니다:

```bash
# 옵션 1: Python 내장 HTTP 서버
python3 -m http.server 3000

# 옵션 2: Node.js npx serve
npx serve . -l 3000

# 브라우저 접속: http://localhost:3000
```

### 코딩 스타일 가이드
1. **HTML**: 시맨틱 태그 우선 사용(`button`, `dialog`, `nav`, `section`, `details`). 불필요한 div 래핑 지양.
2. **CSS**:
   - 컴포넌트 클래스 네이밍 충돌 방지를 위해 컴포넌트별 고유 프리픽스 또는 계층 구조 사용.
   - 반응형 디자인은 모바일 퍼스트(`min-width`) 또는 데스크톱 최적화 후 `@media (max-width: ...)`로 브레이크포인트 관리.
   - transition 시간은 150ms ~ 250ms 사이의 부드러운 이징(`ease`, `cubic-bezier`) 적용.
3. **JS**:
   - `document.querySelector` / `addEventListener` 기반의 순수 자바스크립트.
   - 복사 버튼 클릭 시 `navigator.clipboard.writeText`를 기본으로 하고 미지원 환경 폴백(`textarea` select) 제공.
   - XSS 방지를 위해 소스코드 출력 시 HTML 엔티티 이스케이프 철저히 수행.

---

## 7. 화면 인터페이스 구조

```
┌────────────────────────────────────────────────────────────────────────┐
│  헤더: 로고/타이틀 | 검색창(Cmd+K) | 카테고리 필터 | 다크/라이트 토글   │
├───────────────────┬────────────────────────────────────────────────────┤
│ [좌측 사이드바]   │ [우측 메인 콘텐츠 영역]                            │
│                   │                                                    │
│ 🔍 빠른 검색      │  #01. Accordion (아코디언)  [Container 뱃지]       │
│                   │  정의 & 설명: 제목 클릭 시 콘텐츠 토글...           │
│ [32 UI 컴포넌트]  │  권장 활용: FAQ, 설정 메뉴                         │
│ • Input (12)      ├────────────────────────────────────────────────────┤
│ • Navigation (9)  │  [Live Preview (인터랙티브 미리보기)]              │
│ • Info (6)        │  ┌──────────────────────────────────────────────┐  │
│ • Container (5)   │  │   실제 클릭 및 동작이 작동하는 컴포넌트      │  │
│                   │  └──────────────────────────────────────────────┘  │
│ [UX 공통 레이어]  ├────────────────────────────────────────────────────┤
│ • Alert 경고      │  [HTML]  [CSS]  [JavaScript]     [📋 코드 복사]    │
│ • Confirm 확인    │  ┌──────────────────────────────────────────────┐  │
│ • Toast 토스트    │  │  <div class="accordion">...</div>            │  │
│ • Snackbar 스낵바 │  │  (구문 강조 하이라이팅 적용)                 │  │
│ • Bottom Sheet    │  └──────────────────────────────────────────────┘  │
│ • Slide-over      │                                                    │
└───────────────────┴────────────────────────────────────────────────────┘
```
