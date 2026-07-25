/* ======================================== */
/*  Neoflows Free Tools - Shared JS           */
/* ======================================== */

// --- Dark Mode ---
function initDarkMode() {
  const saved = localStorage.getItem('nf_dark');
  if (saved === 'true') {
    document.body.classList.add('dark');
  }
}

function toggleDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('nf_dark', isDark);
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  const btn = document.getElementById('darkToggleBtn');
  if (!btn) return;
  btn.innerHTML = isDark
    ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
    : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
}

// --- Toast ---
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('nfToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nfToast';
    toast.className = 'nf-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// --- Back to Top ---
function initBackToTop() {
  const btn = document.getElementById('nfTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Stagger Animation on Scroll ---
function initStaggerAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('stagger-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stagger-hidden').forEach(el => observer.observe(el));
}

// --- Tool Header HTML Generator ---
function toolHeaderHTML(title, subtitle, colorClass) {
  return `
  <header class="nf-header">
    <div class="nf-container" style="display:flex;align-items:center;justify-content:space-between;padding-top:0.875rem;padding-bottom:0.875rem;">
      <div style="display:flex;align-items:center;gap:0.625rem;">
        <a href="index.html" style="display:flex;align-items:center;gap:0.625rem;text-decoration:none;color:inherit;">
          <div style="background:linear-gradient(135deg,#7c3aed,#d946ef);color:white;padding:0.625rem;border-radius:0.75rem;box-shadow:0 4px 14px rgba(124,58,237,0.3);">
            <svg style="width:1.125rem;height:1.125rem" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="font-size:1.125rem;font-weight:900;color:#0f172a;letter-spacing:-0.025em;">Neoflows</span>
              <span style="font-size:0.625rem;font-weight:700;background:#ede9fe;color:#7c3aed;border:1px solid #ddd6fe;padding:0.125rem 0.5rem;border-radius:9999px;">TOOLS</span>
            </div>
          </div>
        </a>
        <span style="color:#cbd5e1;font-size:1.25rem;">|</span>
        <div>
          <h1 style="font-size:1rem;font-weight:800;color:#0f172a;line-height:1.3;">${title}</h1>
          <p style="font-size:0.6875rem;color:#64748b;font-weight:500;">${subtitle}</p>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <button onclick="toggleDark()" id="darkToggleBtn" class="nf-btn nf-btn-ghost" style="padding:0.625rem;border-radius:0.75rem;" aria-label="다크모드 토글">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        </button>
        <a href="index.html" class="nf-btn nf-btn-ghost">
          <svg style="width:1rem;height:1rem" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>홈으로</span>
        </a>
      </div>
    </div>
  </header>`;
}

// --- Tool Footer HTML Generator ---
function toolFooterHTML() {
  const year = new Date().getFullYear();
  return `
  <footer class="nf-footer" style="padding:1.5rem 1rem;text-align:center;">
    <div class="nf-container">
      <p style="font-size:0.75rem;color:#94a3b8;font-weight:500;">© ${year} Neoflows. 모든 도구는 100% 무료이며 광고가 없습니다.</p>
    </div>
  </footer>
  <button id="nfTopBtn" class="nf-top-btn" aria-label="맨 위로">
    <svg style="width:1.125rem;height:1.125rem" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
  </button>`;
}

// --- Common Init ---
function commonInit() {
  initDarkMode();
  updateDarkIcon(document.body.classList.contains('dark'));
  initBackToTop();
  setTimeout(initStaggerAnimations, 100);
}

// --- Clipboard Copy ---
function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg || '클립보드에 복사되었습니다!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(msg || '클립보드에 복사되었습니다!');
  });
}

// --- Dark mode body overrides for tool pages ---
function updateBodyDarkStyles() {
  const style = document.getElementById('nfDarkOverrides');
  if (!style) return;
  const isDark = document.body.classList.contains('dark');
  style.textContent = isDark ? `
    .nf-tool-header-icon { background: linear-gradient(135deg,#7c3aed,#d946ef) !important; }
    .nf-card { background: #0f172a !important; border-color: #1e293b !important; }
    h1, h2, h3, .nf-text-primary { color: #f8fafc !important; }
    .nf-text-secondary { color: #94a3b8 !important; }
    .nf-text-muted { color: #64748b !important; }
    .nf-input, .nf-textarea, input, textarea, select { background: #0f172a !important; border-color: #1e293b !important; color: #e2e8f0 !important; }
    .nf-bg-subtle { background: #1e293b !important; }
    .nf-border-subtle { border-color: #1e293b !important; }
    .nf-stat-card { background: rgba(30,41,59,0.5) !important; border-color: #334155 !important; }
  ` : '';
}

// Observe dark mode class changes
const darkObserver = new MutationObserver(() => updateBodyDarkStyles());

document.addEventListener('DOMContentLoaded', () => {
  commonInit();
  darkObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  updateBodyDarkStyles();
});
