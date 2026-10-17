/**
 * Main Application Logic
 * UI Element Specimen & UX Layer Showcase
 */

(function () {
  'use strict';

  // 1. 데이터 소스 병합 및 초기화
  const list32 = window.COMPONENTS_32 || [];
  const listLayers = window.UX_LAYERS || [];
  const ALL_COMPONENTS = [...list32, ...listLayers];

  let currentComponent = null;
  let currentCategory = 'all';
  let searchQuery = '';
  let currentViewport = 'desktop';

  // 2. DOM 요소 캐싱
  const dom = {
    // Header
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebar: document.getElementById('sidebar'),
    filterChips: document.querySelectorAll('.filter-chip'),

    // Sidebar lists
    nav32List: document.getElementById('nav32List'),
    navLayerList: document.getElementById('navLayerList'),
    count32: document.getElementById('count32'),
    countLayers: document.getElementById('countLayers'),

    // Main Viewer
    mainViewer: document.getElementById('mainViewer'),
    heroNum: document.getElementById('heroNum'),
    heroCat: document.getElementById('heroCat'),
    heroTitle: document.getElementById('heroTitle'),
    heroKo: document.getElementById('heroKo'),
    heroDesc: document.getElementById('heroDesc'),
    specUsecase: document.getElementById('specUsecase'),
    specFeature: document.getElementById('specFeature'),
    specA11y: document.getElementById('specA11y'),

    // Preview Stage
    stageContainer: document.getElementById('stageContainer'),
    stageViewportFrame: document.getElementById('stageViewportFrame'),
    stageIframe: document.getElementById('stageIframe'),
    stageResizer: document.getElementById('stageResizer'),
    reloadPreviewBtn: document.getElementById('reloadPreviewBtn'),
    viewportBtns: document.querySelectorAll('.viewport-btn'),

    // Code Tabs
    codeTabBtns: document.querySelectorAll('.tab-btn'),
    panelHtml: document.getElementById('panelHtml'),
    panelCss: document.getElementById('panelCss'),
    panelJs: document.getElementById('panelJs'),
    panelBundle: document.getElementById('panelBundle'),
    codeHtml: document.getElementById('codeHtml'),
    codeCss: document.getElementById('codeCss'),
    codeJs: document.getElementById('codeJs'),
    codeBundle: document.getElementById('codeBundle'),

    // Global Toast
    appToast: document.getElementById('appGlobalToast')
  };

  const catNames = {
    all: '전체',
    input: '입력 (Input)',
    nav: '내비게이션 (Nav)',
    info: '정보 (Info)',
    container: '컨테이너 (Container)',
    layer: 'UX 공통 레이어 (Modal & Layer)'
  };

  // 3. 앱 알림 토스트 (복사 완료 등)
  function showGlobalToast(message) {
    if (!dom.appToast) return;
    dom.appToast.textContent = message;
    dom.appToast.classList.add('show');
    clearTimeout(dom.appToast._timer);
    dom.appToast._timer = setTimeout(() => {
      dom.appToast.classList.remove('show');
    }, 2400);
  }

  // 4. 클립보드 복사 유틸리티
  function copyToClipboard(text, btnElement) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      showGlobalToast('📋 클립보드에 코드가 복사되었습니다!');
      if (btnElement) {
        const originText = btnElement.innerHTML;
        btnElement.classList.add('copied');
        btnElement.innerHTML = '✓ 복사 완료!';
        setTimeout(() => {
          btnElement.classList.remove('copied');
          btnElement.innerHTML = originText;
        }, 2000);
      }
    }).catch(err => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showGlobalToast('📋 클립보드에 코드가 복사되었습니다!');
    });
  }

  // 5. 사이드바 항목 생성
  function renderSidebarItem(item) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-item-btn';
    btn.dataset.id = item.id;
    if (currentComponent && currentComponent.id === item.id) {
      btn.classList.add('active');
    }

    const numDisplay = typeof item.num === 'number' ? String(item.num).padStart(2, '0') : item.num;
    const catLabel = item.cat.toUpperCase();

    btn.innerHTML = `
      <span class="nav-num">${numDisplay}</span>
      <span class="nav-name">${item.name}<span class="nav-ko">${item.nameKo || ''}</span></span>
      <span class="nav-badge" data-cat="${item.cat}">${catLabel}</span>
    `;

    btn.addEventListener('click', () => {
      selectComponent(item.id);
      // 모바일 화면이면 사이드바 자동 닫기
      if (window.innerWidth <= 820 && dom.sidebar) {
        dom.sidebar.classList.remove('open');
      }
    });

    return btn;
  }

  // 6. 사이드바 렌더링 및 필터링
  function updateSidebar() {
    if (!dom.nav32List || !dom.navLayerList) return;

    dom.nav32List.innerHTML = '';
    dom.navLayerList.innerHTML = '';

    const query = searchQuery.trim().toLowerCase();

    // 32가지 표준 UI 컴포넌트 필터
    const filtered32 = list32.filter(item => {
      const matchCat = currentCategory === 'all' || item.cat === currentCategory;
      const matchQuery = !query ||
        item.name.toLowerCase().includes(query) ||
        (item.nameKo && item.nameKo.toLowerCase().includes(query)) ||
        (item.desc && item.desc.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    // UX 레이어 컴포넌트 필터
    const filteredLayers = listLayers.filter(item => {
      const matchCat = currentCategory === 'all' || currentCategory === 'layer';
      const matchQuery = !query ||
        item.name.toLowerCase().includes(query) ||
        (item.nameKo && item.nameKo.toLowerCase().includes(query)) ||
        (item.desc && item.desc.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    filtered32.forEach(item => {
      dom.nav32List.appendChild(renderSidebarItem(item));
    });

    filteredLayers.forEach(item => {
      dom.navLayerList.appendChild(renderSidebarItem(item));
    });

    if (dom.count32) dom.count32.textContent = `${filtered32.length}`;
    if (dom.countLayers) dom.countLayers.textContent = `${filteredLayers.length}`;
  }

  // 7. 인터랙티브 미리보기 iframe 주입 (안전 격리 샌드박스)
  function renderLivePreview(item) {
    if (!dom.stageIframe) return;

    // 현재 테마 확인
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';

    // iframe 내부 HTML 문서 생성
    const docHtml = `<!DOCTYPE html>
<html lang="ko" data-theme="${currentTheme}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<style>
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }
  body {
    padding: 32px 20px 48px;
    font-family: 'Pretendard', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    color: ${currentTheme === 'dark' ? '#f8fafc' : '#0f172a'};
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* 중앙 정렬 래퍼 (콘텐츠가 짧을 땐 상하 중앙, 길어지면 상단부터 스크롤) */
  .preview-mount {
    width: 100%;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  ${item.css || ''}
</style>
</head>
<body>
  <div class="preview-mount">
    ${item.html || ''}
  </div>
  <script>
    try {
      ${item.js || ''}
    } catch(err) {
      console.warn("Component script preview warning:", err);
    }
    // 마우스 휠 이벤트 포워딩: 프리뷰 내부에서 휠 조작 시 부모 창(우측 메인 뷰어) 스크롤이 자연스럽게 이어지도록 처리
    window.addEventListener('wheel', function(e) {
      var isScrollable = document.body.scrollHeight > window.innerHeight;
      if (!isScrollable) {
        window.parent.postMessage({ type: 'FORWARD_WHEEL', deltaY: e.deltaY }, '*');
      } else {
        var atTop = e.deltaY < 0 && (document.documentElement.scrollTop <= 0 && document.body.scrollTop <= 0);
        var atBottom = e.deltaY > 0 && (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 2);
        if (atTop || atBottom) {
          window.parent.postMessage({ type: 'FORWARD_WHEEL', deltaY: e.deltaY }, '*');
        }
      }
    }, { passive: true });
  <\/script>
</body>
</html>`;

    dom.stageIframe.srcdoc = docHtml;
  }

  // 8. 컴포넌트 선택 및 화면 갱신
  function selectComponent(id) {
    const item = ALL_COMPONENTS.find(c => c.id === id);
    if (!item) return;

    currentComponent = item;
    window.location.hash = item.id;

    // 사이드바 활성 스타일 반영
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === item.id);
    });

    // 헤더 정보 채우기
    const numDisplay = typeof item.num === 'number' ? `#${String(item.num).padStart(2, '0')}` : `#${item.num}`;
    dom.heroNum.textContent = numDisplay;
    dom.heroCat.textContent = (item.cat || 'UI').toUpperCase();
    dom.heroCat.setAttribute('data-cat', item.cat);
    dom.heroTitle.textContent = item.name;
    dom.heroKo.textContent = item.nameKo ? `(${item.nameKo})` : '';
    dom.heroDesc.textContent = item.desc || '설명이 등록되어 있지 않습니다.';

    // 메타 세부정보
    dom.specUsecase.textContent = item.usecase || '일반 웹/앱 인터페이스 전반';
    dom.specFeature.textContent = item.feature || '반응형 UI 요소 및 모던 인터랙션';
    dom.specA11y.textContent = item.a11y || 'WAI-ARIA 표준 및 키보드 접근성 준수 권장';

    // Live Preview 렌더링
    renderLivePreview(item);

    // 코드 구문 강조 및 렌더링
    renderCodePanels(item);
  }

  // 9. 코드 패널 구문 강조 및 번들 구성
  function renderCodePanels(item) {
    const highlight = window.Highlighter ? window.Highlighter.highlight : (code) => code;

    // HTML
    dom.codeHtml.innerHTML = highlight(item.html || '<!-- HTML 코드 없음 -->', 'html');

    // CSS
    dom.codeCss.innerHTML = highlight(item.css || '/* CSS 코드 없음 */', 'css');

    // JavaScript
    if (item.js && item.js.trim()) {
      dom.codeJs.innerHTML = highlight(item.js, 'javascript');
    } else {
      dom.codeJs.innerHTML = `<span class="token comment">// 별도의 자바스크립트 로직이 필요 없는 순수 HTML/CSS 컴포넌트입니다.</span>`;
    }

    // 통합 단일 파일 번들 (Full Bundle ready to paste)
    const bundleCode = `<!-- [${item.name} - ${item.nameKo}] -->
<style>
${item.css || ''}
</style>

${item.html || ''}

${item.js && item.js.trim() ? `<script>\n${item.js}\n<\/script>` : ''}`;

    dom.codeBundle.innerHTML = highlight(bundleCode, 'html');
  }

  // 10. 탭 전환 리스너
  function setupTabs() {
    dom.codeTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        dom.codeTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.code-panel-tab').forEach(p => p.classList.remove('active'));
        if (tab === 'html') dom.panelHtml.classList.add('active');
        if (tab === 'css') dom.panelCss.classList.add('active');
        if (tab === 'js') dom.panelJs.classList.add('active');
        if (tab === 'bundle') dom.panelBundle.classList.add('active');
      });
    });

    // 개별 복사 버튼 바인딩
    document.querySelectorAll('.code-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!currentComponent) return;
        const target = btn.dataset.target;
        let textToCopy = '';
        if (target === 'html') textToCopy = currentComponent.html || '';
        if (target === 'css') textToCopy = currentComponent.css || '';
        if (target === 'js') textToCopy = currentComponent.js || '';
        if (target === 'bundle') {
          textToCopy = `<!-- [${currentComponent.name} - ${currentComponent.nameKo}] -->\n<style>\n${currentComponent.css || ''}\n</style>\n\n${currentComponent.html || ''}\n\n${currentComponent.js ? `<script>\n${currentComponent.js}\n</script>` : ''}`;
        }
        copyToClipboard(textToCopy, btn);
      });
    });
  }

  // 11. 뷰포트 반응형 조절 (Desktop, Tablet, Mobile)
  function setupViewportControls() {
    dom.viewportBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dom.viewportBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const vp = btn.dataset.viewport;
        currentViewport = vp;

        dom.stageViewportFrame.className = `stage-viewport-frame ${vp}`;
      });
    });

    if (dom.reloadPreviewBtn) {
      dom.reloadPreviewBtn.addEventListener('click', () => {
        if (currentComponent) {
          renderLivePreview(currentComponent);
          showGlobalToast('🔄 미리보기를 다시 로드했습니다.');
        }
      });
    }
  }

  // 12. 라이브 프리뷰 하단 드래그 높이 조절
  function setupStageResizer() {
    if (!dom.stageResizer || !dom.stageContainer) return;

    const DEFAULT_HEIGHT = 420;
    const MIN_HEIGHT = 280;
    const MAX_HEIGHT = 850;

    // 저장된 높이 복원 또는 기본 420px 적용
    try {
      const saved = localStorage.getItem('stage_container_height');
      if (saved && !isNaN(parseInt(saved, 10))) {
        const h = Math.min(Math.max(parseInt(saved, 10), MIN_HEIGHT), MAX_HEIGHT);
        dom.stageContainer.style.height = `${h}px`;
      } else {
        dom.stageContainer.style.height = `${DEFAULT_HEIGHT}px`;
      }
    } catch (e) {
      dom.stageContainer.style.height = `${DEFAULT_HEIGHT}px`;
    }

    let isDragging = false;
    let startY = 0;
    let startH = 0;

    function onPointerDown(e) {
      isDragging = true;
      startY = e.clientY ?? (e.touches && e.touches[0].clientY);
      startH = dom.stageContainer.getBoundingClientRect().height;

      document.body.classList.add('is-stage-resizing');
      dom.stageResizer.classList.add('is-active');

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);

      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const currentY = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (currentY === undefined) return;

      const deltaY = currentY - startY;
      const newHeight = Math.min(Math.max(Math.round(startH + deltaY), MIN_HEIGHT), MAX_HEIGHT);
      dom.stageContainer.style.height = `${newHeight}px`;

      e.preventDefault();
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      document.body.classList.remove('is-stage-resizing');
      dom.stageResizer.classList.remove('is-active');

      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);

      try {
        const finalH = Math.round(dom.stageContainer.getBoundingClientRect().height);
        localStorage.setItem('stage_container_height', `${finalH}`);
      } catch (e) {}
    }

    dom.stageResizer.addEventListener('mousedown', onPointerDown);
    dom.stageResizer.addEventListener('touchstart', onPointerDown, { passive: false });

    // 더블클릭 시 기본 높이(420px) 복원
    dom.stageResizer.addEventListener('dblclick', () => {
      dom.stageContainer.style.height = `${DEFAULT_HEIGHT}px`;
      try {
        localStorage.setItem('stage_container_height', `${DEFAULT_HEIGHT}`);
      } catch (e) {}
      showGlobalToast('기본 프리뷰 높이(420px)로 복원되었습니다.');
    });

    // 키보드 접근성 지원 (ArrowUp / ArrowDown / Enter / Space)
    dom.stageResizer.addEventListener('keydown', (e) => {
      const currentH = Math.round(dom.stageContainer.getBoundingClientRect().height);
      if (e.key === 'ArrowDown') {
        const nextH = Math.min(currentH + 24, MAX_HEIGHT);
        dom.stageContainer.style.height = `${nextH}px`;
        try { localStorage.setItem('stage_container_height', `${nextH}`); } catch(err) {}
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        const nextH = Math.max(currentH - 24, MIN_HEIGHT);
        dom.stageContainer.style.height = `${nextH}px`;
        try { localStorage.setItem('stage_container_height', `${nextH}`); } catch(err) {}
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        dom.stageContainer.style.height = `${DEFAULT_HEIGHT}px`;
        try { localStorage.setItem('stage_container_height', `${DEFAULT_HEIGHT}`); } catch(err) {}
        showGlobalToast('기본 프리뷰 높이(420px)로 복원되었습니다.');
        e.preventDefault();
      }
    });
  }

  // 13. 검색 및 카테고리 필터
  function setupFilters() {
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateSidebar();
      });
    }

    if (dom.searchClearBtn) {
      dom.searchClearBtn.addEventListener('click', () => {
        dom.searchInput.value = '';
        searchQuery = '';
        updateSidebar();
        dom.searchInput.focus();
      });
    }

    dom.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        dom.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.dataset.cat;
        updateSidebar();
      });
    });
  }

  // 14. 테마 토글 (Dark / Light)
  function setupTheme() {
    const savedTheme = localStorage.getItem('ui_catalog_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('ui_catalog_theme', nextTheme);
        updateThemeIcon(nextTheme);
        showGlobalToast(nextTheme === 'dark' ? '🌙 다크 모드로 전환되었습니다.' : '☀️ 라이트 모드로 전환되었습니다.');
      });
    }
  }

  function updateThemeIcon(theme) {
    if (!dom.themeToggleBtn) return;
    dom.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
  }

  // 15. 모바일 메뉴 토글
  function setupMobileMenu() {
    if (dom.mobileMenuBtn && dom.sidebar) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        dom.sidebar.classList.toggle('open');
      });
    }
  }

  // 16. 해시 라우팅 및 초기화 실행
  function init() {
    setupTheme();
    setupFilters();
    setupTabs();
    setupViewportControls();
    setupStageResizer();
    setupMobileMenu();
    updateSidebar();

    // 초기 컴포넌트 결정 (URL 해시 기준 또는 1번 아코디언)
    const initialHash = window.location.hash.replace('#', '');
    const found = ALL_COMPONENTS.find(c => c.id === initialHash);

    if (found) {
      selectComponent(found.id);
    } else if (ALL_COMPONENTS.length > 0) {
      selectComponent(ALL_COMPONENTS[0].id);
    }

    // 해시 변경 감지
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (!currentComponent || currentComponent.id !== hash)) {
        selectComponent(hash);
      }
    });

    // 키보드 단축키 (Cmd+K / Ctrl+K 검색 포커스)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (dom.searchInput) dom.searchInput.focus();
      }
    });

    // 프리뷰 iframe 휠 이벤트 수신 및 우측 메인 뷰어 스크롤 연동
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'FORWARD_WHEEL' && dom.mainViewer) {
        dom.mainViewer.scrollBy({ top: e.data.deltaY, behavior: 'auto' });
      }
    });
  }

  // DOMContentLoaded 시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
