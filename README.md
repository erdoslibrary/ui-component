# UI Element Specimen & UX Layer Showcase

CareerFoundry의 **[32 UI Elements Designers Need To Know](https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/)** 기반 32가지 표준 UI 컴포넌트와 웹/앱 서비스 구축에 필수적인 **8가지 공통 UX 레이어 컴포넌트(경고, 확인, 알림, 토스트, 스낵바, 바텀 시트 등)**를 제공하는 인터랙티브 디자인 시스템 & 코드 쇼케이스입니다.

---

## ✨ 핵심 기능

1. **32가지 표준 UI 컴포넌트 완벽 지원**
   - **Input (입력 제어)**: Button, Checkbox, Radio Button, Toggle Switch, Dropdown, Input Field, Search Bar, Slider, Stepper, Date Picker, Picker, Form (총 12종)
   - **Navigation (내비게이션)**: Accordion, Bento Menu, Breadcrumb, Hamburger Menu, Döner Menu, Kebab Menu, Meatballs Menu, Pagination, Sidebar, Tab Bar (총 10종)
   - **Information (정보 제공)**: Comment, Feed, Icon, Loader, Notification Badge, Progress Bar, Tag/Chip, Tooltip (총 8종)
   - **Container (컨테이너)**: Card, Carousel, Modal (총 3종)

2. **UX 필수 공통 모달 및 레이어 컴포넌트**
   - **Alert Dialog (경고 모달)**: 긴급 시스템 오류 및 세션 만료 차단형 대화상자
   - **Confirm Dialog (확인 / 삭제 모달)**: 파괴적 작업 전 위험 경고 및 승인/취소 모달
   - **Toast Notification (토스트 알림)**: 3~4초 후 자동 소멸하는 비차단 상태 알림 (Success/Error/Warning)
   - **Action Snackbar (스낵바)**: "실행 취소(Undo)" 버튼을 포함한 하단 피드백 바
   - **Bottom Sheet (바텀 시트)**: 모바일/웹 최적화 하단 슬라이드 시트 및 드래그 핸들
   - **Slide-over Drawer (슬라이드오버 패널)**: 화면 우측 장바구니/설정 사이드 패널
   - **Top Announcement Banner (상단 공지 배너)**: 시스템 점검/이벤트 전폭 알림 배너
   - **Popover Confirmation (팝오버 확인창)**: 특정 요소 위치 기반 인라인 미니 확인창

3. **인터랙티브 샌드박스 (Live Preview)**
   - 실제 클릭, 폼 전송, 토글, 모달 팝업 등이 완벽하게 동작하는 iframe 샌드박스
   - 데스크톱(100%), 태블릿(768px), 모바일(375px) 반응형 뷰포트 전환 지원
   - 새로고침/리셋 기능

4. **개발자 친화적 코드 뷰어 & 원클릭 복사**
   - HTML5, CSS3, ES6+ JavaScript 독립형 탭 분리
   - [Full Bundle] 탭으로 한번에 복사하여 즉시 사이트에 적용 가능
   - Prism.js 및 내장 구문 강조기(Syntax Highlighter) 탑재
   - 복사 버튼 클릭 시 시각적 애니메이션 피드백

5. **현대적 디자인 & 테마 시스템**
   - High-tech Dark 테마 및 Sleek Light 테마 실시간 토글 (로컬스토리지 저장)
   - Outfit, Pretendard, JetBrains Mono 폰트 조합
   - 실시간 검색(⌘K / Ctrl+K 지원) 및 카테고리 필터링
   - URL 해시(#accordion, #toast-notification 등) 기반 딥링킹 지원

---

## 🚀 빠른 시작

별도의 빌드 도구나 의존성 설치 없이 정적 서버 또는 브라우저에서 바로 실행할 수 있습니다.

```bash
# Python HTTP 서버 실행
python3 -m http.server 3000

# 또는 npx serve
npx serve . -l 3000

# 브라우저 열기: http://localhost:3000
```

---

## 📁 디렉토리 구조

```plaintext
├── index.html                 # 메인 애플리케이션 HTML
├── CLAUDE.md                  # Claude Code 실습 및 초기화 가이드
├── README.md                  # 프로젝트 설명서
├── prompt.md                  # 요구사항 정의서
├── css/
│   ├── theme.css              # 디자인 토큰 및 다크/라이트 테마
│   ├── code-theme.css         # 구문 강조 및 코드 에디터 스타일
│   └── main.css               # 반응형 레이아웃 및 컴포넌트 뷰어 스타일
├── js/
│   ├── app.js                 # 메인 앱 로직 (라우팅, 탭, 복사, 뷰포트 조절)
│   ├── highlighter.js         # 코드 구문 강조 엔진
│   └── data/
│       ├── components-32.js   # CareerFoundry 32개 UI 요소 데이터
│       └── ux-layers.js       # 공통 모달 및 UX 레이어 데이터
└── docs/
    └── resource/              # 참고 원본 HTML 리소스
```

---

## 📜 라이선스

이 프로젝트의 UI 명세는 CareerFoundry의 UI Element Glossary를 기반으로 제작되었습니다.
MIT License
