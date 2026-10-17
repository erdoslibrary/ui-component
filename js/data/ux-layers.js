/**
 * UX Common Layer & Feedback Components Dataset
 * 사이트에 필수적인 모달, 경고, 확인, 알림, 토스트, 스낵바, 바텀시트, 슬라이드오버 등 레이어 처리 컴포넌트
 */

const UX_LAYERS = [
  {
    id: 'alert-modal',
    num: 'L1',
    name: 'Alert Dialog',
    nameKo: '경고 모달',
    cat: 'layer',
    desc: '치명적인 오류나 중요한 시스템 알림 발생 시 화면 중앙에 나타나 사용자의 즉각적인 확인을 요구하는 차단형(Modal) 대화상자입니다.',
    usecase: '세션 만료 경고 · 시스템 에러 발생 · 권한 부족 안내 · 양식 입력 필수값 누락',
    feature: '배경 딤(Dim) 오버레이 · 포커스 트랩(Focus Trap) · Esc 키 또는 확인 클릭 시 닫힘',
    a11y: 'role="alertdialog" 및 aria-modal="true", aria-labelledby, aria-describedby 속성 적용 필수.',
    html: `<!-- Alert Dialog 마크업 -->
<div class="ux-layer-backdrop" id="alertDialog" role="alertdialog" aria-modal="true" aria-labelledby="alertTitle" aria-describedby="alertDesc" hidden>
  <div class="ux-dialog-card ux-dialog-alert">
    <div class="ux-dialog-icon danger"><svg class="lucide lucide-alert-triangle" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg></div>
    <div class="ux-dialog-content">
      <h3 class="ux-dialog-title" id="alertTitle">세션이 곧 만료됩니다</h3>
      <p class="ux-dialog-desc" id="alertDesc">보안을 위해 5분 동안 활동이 없어 로그아웃될 예정입니다. 계속 진행하시겠습니까?</p>
    </div>
    <div class="ux-dialog-actions">
      <button type="button" class="ux-btn ux-btn-primary" id="alertConfirmBtn">로그인 유지</button>
    </div>
  </div>
</div>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-trigger-btn" id="openAlertBtn">경고 모달 열기</button>`,
    css: `/* Alert Dialog 스타일 */
.ux-layer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
  padding: 16px;
}
.ux-layer-backdrop:not([hidden]) {
  opacity: 1;
  visibility: visible;
}
.ux-dialog-card {
  background: #ffffff;
  border-radius: 16px;
  max-width: 420px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
  transform: scale(0.95) translateY(10px);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
}
.ux-layer-backdrop:not([hidden]) .ux-dialog-card {
  transform: scale(1) translateY(0);
}
.ux-dialog-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.ux-dialog-icon.danger {
  background: #fef2f2;
  color: #ef4444;
}
.ux-dialog-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px;
}
.ux-dialog-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 20px;
}
.ux-dialog-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.ux-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.15s, transform 0.1s;
}
.ux-btn:active { transform: scale(0.98); }
.ux-btn-primary { background: #6366f1; color: white; }
.ux-btn-primary:hover { background: #4f46e5; }
.ux-trigger-btn {
  padding: 10px 18px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}`,
    js: `// Alert Dialog 컨트롤 로직
const alertDialog = document.getElementById('alertDialog');
const openAlertBtn = document.getElementById('openAlertBtn');
const alertConfirmBtn = document.getElementById('alertConfirmBtn');

function showAlert() {
  alertDialog.removeAttribute('hidden');
  alertConfirmBtn.focus();
}

function hideAlert() {
  alertDialog.setAttribute('hidden', '');
  if (openAlertBtn) openAlertBtn.focus();
}

if (openAlertBtn) openAlertBtn.addEventListener('click', showAlert);
if (alertConfirmBtn) alertConfirmBtn.addEventListener('click', hideAlert);

// Esc 키 입력 시 닫기
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !alertDialog.hasAttribute('hidden')) {
    hideAlert();
  }
});`
  },

  {
    id: 'confirm-modal',
    num: 'L2',
    name: 'Confirm Dialog',
    nameKo: '확인 / 삭제 모달',
    cat: 'layer',
    desc: '데이터 영구 삭제, 결제 승인, 회원 탈퇴 등 되돌릴 수 없는 파괴적 작업 전 사용자의 명확한 승인(확인) 또는 취소를 유도하는 확인 대화상자입니다.',
    usecase: '게시글 및 프로젝트 영구 삭제 · 결제 및 주문 확정 · 설정 초기화 · 위험 작업 확인',
    feature: '위험 행동 강조(빨간색 Destructive 스타일) · 취소 버튼 우선 포커스 지원 · 모달 외부 클릭 시 닫힘 방지 또는 취소 처리',
    a11y: '실수로 확인을 누르지 않도록 기본 포커스를 "취소" 버튼에 두는 것이 접근성 권장사항입니다.',
    html: `<!-- Confirm Dialog 마크업 -->
<div class="ux-layer-backdrop" id="confirmDialog" role="dialog" aria-modal="true" aria-labelledby="confirmTitle" hidden>
  <div class="ux-dialog-card">
    <div class="ux-dialog-icon destructive"><svg class="lucide lucide-trash-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></div>
    <div class="ux-dialog-content">
      <h3 class="ux-dialog-title" id="confirmTitle">프로젝트를 삭제하시겠습니까?</h3>
      <p class="ux-dialog-desc">삭제된 프로젝트와 연관된 모든 데이터는 영구 복구할 수 없습니다. 계속하시겠습니까?</p>
    </div>
    <div class="ux-dialog-actions">
      <button type="button" class="ux-btn ux-btn-secondary" id="confirmCancelBtn">취소</button>
      <button type="button" class="ux-btn ux-btn-danger" id="confirmDeleteBtn">영구 삭제</button>
    </div>
  </div>
</div>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-trigger-btn" id="openConfirmBtn" style="background:#dc2626">프로젝트 삭제</button>`,
    css: `/* Confirm Dialog 스타일 */
.ux-layer-backdrop {
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center;
  z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; padding: 16px;
}
.ux-layer-backdrop:not([hidden]) { opacity: 1; visibility: visible; }
.ux-dialog-card {
  background: #ffffff; border-radius: 16px; max-width: 420px; width: 100%;
  padding: 24px; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
  transform: scale(0.95); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
}
.ux-layer-backdrop:not([hidden]) .ux-dialog-card { transform: scale(1); }
.ux-dialog-icon.destructive {
  width: 52px; height: 52px; border-radius: 50%; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
  background: #fee2e2; color: #dc2626;
}
.ux-dialog-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
.ux-dialog-desc { font-size: 14px; color: #64748b; line-height: 1.5; margin: 0 0 24px; }
.ux-dialog-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ux-btn {
  padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.ux-btn-secondary { background: #f1f5f9; color: #475569; }
.ux-btn-secondary:hover { background: #e2e8f0; color: #0f172a; }
.ux-btn-danger { background: #dc2626; color: white; }
.ux-btn-danger:hover { background: #b91c1c; }`,
    js: `// Confirm Dialog 로직
const confirmDialog = document.getElementById('confirmDialog');
const openConfirmBtn = document.getElementById('openConfirmBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

function showConfirm() {
  confirmDialog.removeAttribute('hidden');
  confirmCancelBtn.focus(); // 안전을 위해 기본 취소 버튼 포커스
}

function hideConfirm() {
  confirmDialog.setAttribute('hidden', '');
  if (openConfirmBtn) openConfirmBtn.focus();
}

if (openConfirmBtn) openConfirmBtn.addEventListener('click', showConfirm);
if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', hideConfirm);
if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', () => {
  alert('성공적으로 삭제되었습니다.');
  hideConfirm();
});`
  },

  {
    id: 'toast-notification',
    num: 'L3',
    name: 'Toast Notification',
    nameKo: '토스트 알림',
    cat: 'layer',
    desc: '화면 모서리(우상단/하단)에 부드럽게 나타나 작업 상태를 알리고 일정 시간(3~4초) 후 자동으로 사라지는 비차단(Non-blocking) 피드백 컴포넌트입니다.',
    usecase: '복사 완료 안내 · 설정 저장 완료 · 메시지 전송 성공 · 가벼운 네트워크 경고',
    feature: '성공/오류/경고 4가지 상태 스타일 지원 · 자동 타이머 프로그레스 바 · 수동 닫기(X) 버튼 · 다중 토스트 스택 관리',
    a11y: 'aria-live="polite" 및 role="status"로 스크린리더 사용자의 현재 작업을 방해하지 않으면서 메시지를 읽어줍니다.',
    html: `<!-- 토스트 컨테이너 -->
<div class="ux-toast-container" id="toastContainer" aria-live="polite"></div>

<!-- 토스트 트리거 예시 -->
<div class="ux-trigger-group">
  <button type="button" class="ux-btn" onclick="triggerToast('success', '저장 완료', '변경사항이 성공적으로 저장되었습니다.')">성공 토스트</button>
  <button type="button" class="ux-btn" onclick="triggerToast('error', '오류 발생', '서버와 연결할 수 없습니다.')">에러 토스트</button>
  <button type="button" class="ux-btn" onclick="triggerToast('warning', '주의', '저장 공간이 80% 이상 사용되었습니다.')">경고 토스트</button>
</div>`,
    css: `/* Toast Notification 스타일 */
.ux-toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: 360px;
  width: 100%;
}
.ux-toast {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: opacity 0.25s, transform 0.25s;
}
.ux-toast.removing {
  opacity: 0;
  transform: translateX(30px);
}
@keyframes toastSlideIn {
  from { opacity: 0; transform: translateX(40px) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
.ux-toast-icon { font-size: 20px; line-height: 1; flex-shrink: 0; margin-top: 2px; }
.ux-toast-body { flex: 1; min-width: 0; }
.ux-toast-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
.ux-toast-desc { font-size: 12.5px; color: #64748b; line-height: 1.4; }
.ux-toast-close {
  background: none; border: none; font-size: 18px; color: #94a3b8;
  cursor: pointer; padding: 0 4px; line-height: 1;
}
.ux-toast-close:hover { color: #0f172a; }
.ux-toast-bar {
  position: absolute; bottom: 0; left: 0; height: 3px;
  background: #6366f1; width: 100%;
  animation: toastProgress 3.5s linear forwards;
}
.ux-toast.success .ux-toast-bar { background: #10b981; }
.ux-toast.error .ux-toast-bar { background: #ef4444; }
.ux-toast.warning .ux-toast-bar { background: #f59e0b; }
@keyframes toastProgress {
  from { width: 100%; }
  to { width: 0%; }
}`,
    js: `// 토스트 생성 함수
function triggerToast(type, title, message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '<svg class="lucide lucide-check-circle-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    error: '<svg class="lucide lucide-x-circle" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    warning: '<svg class="lucide lucide-alert-triangle" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    info: '<svg class="lucide lucide-info" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  };
  const toast = document.createElement('div');
  toast.className = \`ux-toast \${type}\`;
  toast.innerHTML = \`
    <span class="ux-toast-icon">\${icons[type] || '<svg class="lucide lucide-bell" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'}</span>
    <div class="ux-toast-body">
      <div class="ux-toast-title">\${title}</div>
      <div class="ux-toast-desc">\${message}</div>
    </div>
    <button type="button" class="ux-toast-close" aria-label="닫기"><svg class="lucide lucide-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    <div class="ux-toast-bar"></div>
  \`;

  const removeToast = () => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector('.ux-toast-close').addEventListener('click', removeToast);
  container.appendChild(toast);

  // 3.5초 후 자동 삭제
  setTimeout(removeToast, 3500);
}`
  },

  {
    id: 'action-snackbar',
    num: 'L4',
    name: 'Action Snackbar',
    nameKo: '스낵바 (실행취소 액션)',
    cat: 'layer',
    desc: '화면 하단 중앙에 나타나 사용자가 방금 수행한 작업 결과(예: 항목 보관, 삭제)를 알리고, "실행 취소(Undo)" 버튼을 제공하여 실수를 즉시 되돌릴 수 있게 돕는 컴포넌트입니다.',
    usecase: '이메일 보관함 이동 후 실행 취소 · 파일 삭제 후 되돌리기 · 북마크 추가/해제',
    feature: '하단 중앙 고정 · 인라인 액션 버튼(Undo) 내장 · 5~7초 간 유지 후 자동 소멸',
    a11y: '키보드로 즉시 실행 취소 버튼으로 이동할 수 있도록 Tab 키 포커스 순서를 보장합니다.',
    html: `<!-- Action Snackbar -->
<div class="ux-snackbar" id="snackbar" role="status" hidden>
  <span class="ux-snackbar-msg" id="snackbarMsg">항목이 휴지통으로 이동되었습니다.</span>
  <button type="button" class="ux-snackbar-action" id="snackbarUndoBtn">실행 취소</button>
  <button type="button" class="ux-snackbar-close" id="snackbarCloseBtn" aria-label="닫기"><svg class="lucide lucide-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
</div>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-btn ux-btn-primary" id="openSnackbarBtn">이메일 삭제 후 스낵바 보기</button>`,
    css: `/* Action Snackbar 스타일 */
.ux-snackbar {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  background: #1e293b;
  color: #f8fafc;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  z-index: 1500;
  font-size: 13.5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}
.ux-snackbar:not([hidden]) {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.ux-snackbar-action {
  background: transparent;
  border: none;
  color: #a5b4fc;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.ux-snackbar-action:hover {
  background: rgba(255,255,255,0.1);
  color: #c7d2fe;
}
.ux-snackbar-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
}`,
    js: `// Action Snackbar 로직
const snackbar = document.getElementById('snackbar');
const openSnackbarBtn = document.getElementById('openSnackbarBtn');
const snackbarUndoBtn = document.getElementById('snackbarUndoBtn');
const snackbarCloseBtn = document.getElementById('snackbarCloseBtn');
let snackbarTimer = null;

function showSnackbar(msg) {
  if (msg) document.getElementById('snackbarMsg').textContent = msg;
  snackbar.removeAttribute('hidden');
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(hideSnackbar, 5000);
}

function hideSnackbar() {
  snackbar.setAttribute('hidden', '');
}

if (openSnackbarBtn) openSnackbarBtn.addEventListener('click', () => showSnackbar('3개의 항목이 보관되었습니다.'));
if (snackbarCloseBtn) snackbarCloseBtn.addEventListener('click', hideSnackbar);
if (snackbarUndoBtn) snackbarUndoBtn.addEventListener('click', () => {
  alert('작업이 취소되었습니다! (Undo Completed)');
  hideSnackbar();
});`
  },

  {
    id: 'bottom-sheet',
    num: 'L5',
    name: 'Bottom Sheet',
    nameKo: '바텀 시트',
    cat: 'layer',
    desc: '화면 하단에서 위로 미끄러져 올라오는 모바일/웹 최적화 레이어 컴포넌트입니다. 상단에 드래그 핸들이 위치하며 모바일 터치 환경에서 특히 자연스러운 UX를 제공합니다.',
    usecase: '공유하기 옵션 시트 · 결제 수단 선택 · 필터 및 정렬 옵션 설정 · 상세 프로필 보기',
    feature: '배경 딤(Dim) 터치 시 닫힘 · 드래그 핸들 바(Handle Bar) 디자인 · 부드러운 하단 슬라이드 업 애니메이션',
    a11y: '키보드 Tab 내비게이션 시 바텀 시트 내부로 포커스가 한정되도록 처리합니다.',
    html: `<!-- Bottom Sheet 컴포넌트 -->
<div class="ux-sheet-backdrop" id="bottomSheet" hidden>
  <div class="ux-sheet-card" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
    <div class="ux-sheet-handle-wrap" id="sheetHandle">
      <div class="ux-sheet-handle"></div>
    </div>
    <div class="ux-sheet-head">
      <h3 class="ux-sheet-title" id="sheetTitle">공유하기</h3>
      <button type="button" class="ux-sheet-close" id="sheetCloseBtn" aria-label="닫기"><svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    </div>
    <div class="ux-sheet-body">
      <div class="ux-sheet-grid">
        <button class="ux-sheet-item"><span class="icon"><svg class="lucide lucide-link-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg></span>링크 복사</button>
        <button class="ux-sheet-item"><span class="icon"><svg class="lucide lucide-message-circle" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></span>카카오톡</button>
        <button class="ux-sheet-item"><span class="icon"><svg class="lucide lucide-mail" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>이메일</button>
        <button class="ux-sheet-item"><span class="icon"><svg class="lucide lucide-smartphone" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg></span>메시지</button>
      </div>
    </div>
  </div>
</div>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-btn ux-btn-primary" id="openSheetBtn">바텀 시트 열기</button>`,
    css: `/* Bottom Sheet 스타일 */
.ux-sheet-backdrop {
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(3px); z-index: 1200; display: flex;
  align-items: flex-end; justify-content: center;
  opacity: 0; visibility: hidden; transition: opacity 0.25s, visibility 0.25s;
}
.ux-sheet-backdrop:not([hidden]) { opacity: 1; visibility: visible; }
.ux-sheet-card {
  background: #ffffff; width: 100%; max-width: 500px;
  border-radius: 20px 20px 0 0; padding: 12px 24px 32px;
  transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 -10px 30px rgba(0,0,0,0.15);
}
.ux-sheet-backdrop:not([hidden]) .ux-sheet-card { transform: translateY(0); }
.ux-sheet-handle-wrap { padding: 8px 0 12px; cursor: grab; display: flex; justify-content: center; }
.ux-sheet-handle { width: 44px; height: 5px; background: #cbd5e1; border-radius: 3px; }
.ux-sheet-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.ux-sheet-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0; }
.ux-sheet-close { background: none; border: none; font-size: 22px; color: #94a3b8; cursor: pointer; }
.ux-sheet-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; text-align: center; }
.ux-sheet-item {
  background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 14px 8px; font-size: 12.5px; font-weight: 600; color: #334155;
  cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.ux-sheet-item:hover { background: #e0e7ff; color: #4338ca; border-color: #c7d2fe; }
.ux-sheet-item .icon { font-size: 24px; }`,
    js: `// Bottom Sheet 제어 로직
const bottomSheet = document.getElementById('bottomSheet');
const openSheetBtn = document.getElementById('openSheetBtn');
const sheetCloseBtn = document.getElementById('sheetCloseBtn');

function openSheet() { bottomSheet.removeAttribute('hidden'); }
function closeSheet() { bottomSheet.setAttribute('hidden', ''); }

if (openSheetBtn) openSheetBtn.addEventListener('click', openSheet);
if (sheetCloseBtn) sheetCloseBtn.addEventListener('click', closeSheet);

// 배경 클릭 시 닫기
if (bottomSheet) {
  bottomSheet.addEventListener('click', (e) => {
    if (e.target === bottomSheet) closeSheet();
  });
}`
  },

  {
    id: 'slideover-drawer',
    num: 'L6',
    name: 'Slide-over Drawer',
    nameKo: '슬라이드오버 드로어',
    cat: 'layer',
    desc: '화면 우측(또는 좌측)에서 부드럽게 미끄러져 나오는 사이드 레이어 패널입니다. 메인 페이지의 맥락을 유지하면서 상세 정보 열람, 장바구니 확인, 필터 옵션 조작 등을 수행할 때 이상적입니다.',
    usecase: '장바구니 퀵 뷰 · 상세 필터 설정 패널 · 실시간 알림 목록 · 사용자 프로필 편집',
    feature: '전체 높이(100vh) 패널 · 헤더, 스크롤 가능 바디, 하단 고정 액션 버튼 3단 구성',
    a11y: '열렸을 때 배경 스크롤을 방지(body overflow: hidden)하고 Esc 키 입력을 처리합니다.',
    html: `<!-- Slide-over Drawer -->
<div class="ux-drawer-backdrop" id="slideoverDrawer" hidden>
  <div class="ux-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
    <div class="ux-drawer-head">
      <h3 class="ux-drawer-title" id="drawerTitle">장바구니 (3)</h3>
      <button type="button" class="ux-drawer-close" id="drawerCloseBtn" aria-label="닫기"><svg class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
    </div>
    <div class="ux-drawer-body">
      <div class="ux-drawer-item">
        <div class="thumb"><svg class="lucide lucide-headphones" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg></div>
        <div class="info">
          <strong>무선 노이즈 캔슬링 헤드폰</strong>
          <span class="price">289,000원</span>
        </div>
      </div>
      <div class="ux-drawer-item">
        <div class="thumb"><svg class="lucide lucide-keyboard" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/></svg></div>
        <div class="info">
          <strong>기계식 텐키리스 키보드</strong>
          <span class="price">149,000원</span>
        </div>
      </div>
    </div>
    <div class="ux-drawer-footer">
      <div class="ux-drawer-total"><span>총 결제금액</span><strong>438,000원</strong></div>
      <button type="button" class="ux-btn ux-btn-primary" style="width:100%">주문하기</button>
    </div>
  </div>
</div>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-btn ux-btn-primary" id="openDrawerBtn" style="display:inline-flex;align-items:center;gap:6px;"><svg class="lucide lucide-shopping-cart" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg><span>장바구니 열기</span></button>`,
    css: `/* Slide-over Drawer 스타일 */
.ux-drawer-backdrop {
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px); z-index: 1300; display: flex; justify-content: flex-end;
  opacity: 0; visibility: hidden; transition: opacity 0.25s, visibility 0.25s;
}
.ux-drawer-backdrop:not([hidden]) { opacity: 1; visibility: visible; }
.ux-drawer-panel {
  width: 100%; max-width: 400px; height: 100vh; background: #ffffff;
  display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0,0,0,0.15);
  transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ux-drawer-backdrop:not([hidden]) .ux-drawer-panel { transform: translateX(0); }
.ux-drawer-head {
  padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
  display: flex; justify-content: space-between; align-items: center;
}
.ux-drawer-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
.ux-drawer-close { background: none; border: none; font-size: 16px; color: #64748b; cursor: pointer; }
.ux-drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
.ux-drawer-item { display: flex; gap: 14px; align-items: center; padding: 12px; background: #f8fafc; border-radius: 10px; }
.ux-drawer-item .thumb { font-size: 28px; width: 48px; height: 48px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.ux-drawer-item .info { display: flex; flex-direction: column; gap: 4px; }
.ux-drawer-footer { padding: 20px 24px; border-top: 1px solid #e2e8f0; background: #f8fafc; }
.ux-drawer-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-size: 15px; }`,
    js: `// Slide-over Drawer 로직
const slideoverDrawer = document.getElementById('slideoverDrawer');
const openDrawerBtn = document.getElementById('openDrawerBtn');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');

function openDrawer() { slideoverDrawer.removeAttribute('hidden'); }
function closeDrawer() { slideoverDrawer.setAttribute('hidden', ''); }

if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (slideoverDrawer) {
  slideoverDrawer.addEventListener('click', (e) => {
    if (e.target === slideoverDrawer) closeDrawer();
  });
}`
  },

  {
    id: 'top-banner',
    num: 'L7',
    name: 'Top Announcement Banner',
    nameKo: '상단 공지 배너',
    cat: 'layer',
    desc: '페이지 최상단에 전폭(Full-width)으로 표시되는 시스템 공지 바입니다. 정기 점검, 신규 기능 배포, 프로모션 안내 등을 전체 방문자에게 확실하게 전달합니다.',
    usecase: '서버 정기 점검 사전 예고 · 사이트 긴급 공지 · 블랙프라이데이 세일 프로모션',
    feature: '중앙 집중식 메시지 · 바로가기 링크 지원 · "오늘 하루 보지 않기" 또는 닫기(X) 지원',
    a11y: 'role="region" aria-label="공지사항"을 선언하여 보조기술로 건너뛸 수 있도록 지원합니다.',
    html: `<!-- Top Announcement Banner -->
<aside class="ux-banner warning" id="topBanner" role="region" aria-label="시스템 공지">
  <div class="ux-banner-content">
    <span class="ux-banner-badge">점검 안내</span>
    <span class="ux-banner-text">5월 20일(화) 새벽 02:00 ~ 06:00 정기 시스템 점검이 진행됩니다.</span>
    <a href="#" class="ux-banner-link"><span>자세히 보기</span><svg class="lucide lucide-arrow-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
  </div>
  <button type="button" class="ux-banner-close" id="bannerCloseBtn" aria-label="배너 닫기"><svg class="lucide lucide-x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
</aside>

<!-- 트리거 버튼 예시 -->
<button type="button" class="ux-btn" id="showBannerBtn">상단 공지 배너 다시 표시</button>`,
    css: `/* Top Announcement Banner 스타일 */
.ux-banner {
  width: 100%;
  padding: 10px 20px;
  background: linear-gradient(90deg, #312e81, #4338ca);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.ux-banner.warning {
  background: linear-gradient(90deg, #78350f, #b45309);
}
.ux-banner-content {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.ux-banner-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
}
.ux-banner-link {
  color: #fde68a;
  text-decoration: underline;
  font-weight: 600;
}
.ux-banner-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
}
.ux-banner-close:hover { color: #fff; }`,
    js: `// Top Banner 제어 로직
const topBanner = document.getElementById('topBanner');
const bannerCloseBtn = document.getElementById('bannerCloseBtn');
const showBannerBtn = document.getElementById('showBannerBtn');

if (bannerCloseBtn) {
  bannerCloseBtn.addEventListener('click', () => {
    topBanner.style.display = 'none';
  });
}
if (showBannerBtn) {
  showBannerBtn.addEventListener('click', () => {
    topBanner.style.display = 'flex';
  });
}`
  },

  {
    id: 'popover-confirm',
    num: 'L8',
    name: 'Popover Confirmation',
    nameKo: '팝오버 확인창',
    cat: 'layer',
    desc: '화면 전체를 가리지 않고, 클릭한 버튼 바로 위/아래에 말풍선 형태로 떠서 즉석 확인(Confirm)을 묻는 경량 인라인 레이어입니다.',
    usecase: '테이블 행 내 단일 항목 삭제 · 빠른 권한 해제 · 빠른 탈퇴 확인',
    feature: '타겟 요소 상대 위치(Absolute Positioning) · 꼬리표(Arrow) 디자인 · 외부 클릭 시 자동 닫힘',
    a11y: 'aria-haspopup="dialog" 및 aria-expanded 상태 토글 지원.',
    html: `<!-- Popover Confirm 마크업 -->
<div class="ux-popover-anchor" style="position:relative; display:inline-block;">
  <button type="button" class="ux-btn ux-btn-danger" id="popoverTriggerBtn">항목 삭제</button>
  
  <div class="ux-popover-box" id="popoverBox" hidden role="dialog">
    <div class="ux-popover-arrow"></div>
    <div class="ux-popover-title">정말 삭제하시겠습니까?</div>
    <div class="ux-popover-desc">이 작업은 취소할 수 없습니다.</div>
    <div class="ux-popover-actions">
      <button type="button" class="ux-btn-sm" id="popoverCancelBtn">취소</button>
      <button type="button" class="ux-btn-sm danger" id="popoverConfirmBtn">확인</button>
    </div>
  </div>
</div>`,
    css: `/* Popover Confirmation 스타일 */
.ux-popover-anchor { position: relative; display: inline-block; }
.ux-popover-box {
  position: absolute; bottom: calc(100% + 10px); left: 50%;
  transform: translateX(-50%); background: #ffffff;
  border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;
  width: 220px; box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  z-index: 100; text-align: left;
}
.ux-popover-arrow {
  position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
  width: 10px; height: 10px; background: #ffffff;
  border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;
}
.ux-popover-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.ux-popover-desc { font-size: 12px; color: #64748b; margin-bottom: 12px; }
.ux-popover-actions { display: flex; gap: 8px; justify-content: flex-end; }
.ux-btn-sm {
  padding: 5px 10px; font-size: 12px; font-weight: 600; border-radius: 5px;
  border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer;
}
.ux-btn-sm.danger { background: #ef4444; color: white; border-color: #ef4444; }`,
    js: `// Popover Confirm 로직
const popoverTriggerBtn = document.getElementById('popoverTriggerBtn');
const popoverBox = document.getElementById('popoverBox');
const popoverCancelBtn = document.getElementById('popoverCancelBtn');
const popoverConfirmBtn = document.getElementById('popoverConfirmBtn');

function togglePopover() {
  const isHidden = popoverBox.hasAttribute('hidden');
  if (isHidden) popoverBox.removeAttribute('hidden');
  else popoverBox.setAttribute('hidden', '');
}

if (popoverTriggerBtn) popoverTriggerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePopover();
});
if (popoverCancelBtn) popoverCancelBtn.addEventListener('click', () => popoverBox.setAttribute('hidden', ''));
if (popoverConfirmBtn) popoverConfirmBtn.addEventListener('click', () => {
  alert('삭제되었습니다.');
  popoverBox.setAttribute('hidden', '');
});

document.addEventListener('click', (e) => {
  if (popoverBox && !popoverBox.contains(e.target) && e.target !== popoverTriggerBtn) {
    popoverBox.setAttribute('hidden', '');
  }
});`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UX_LAYERS };
} else {
  window.UX_LAYERS = UX_LAYERS;
}
