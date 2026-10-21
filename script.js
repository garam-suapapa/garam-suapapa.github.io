document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const toast = document.getElementById('toast');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = storedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? '밝은 테마로 전환' : '어두운 테마로 전환');
    }
  };
  applyTheme(initialTheme);
  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  });
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      if (!value) return;
      try { await navigator.clipboard.writeText(value); showToast('연락처를 복사했습니다.'); }
      catch { showToast('복사하지 못했습니다. 직접 선택해 주세요.'); }
    });
  });
  const sidebar = document.getElementById('portfolio-toc');
  const tocToggle = document.getElementById('tocToggle');
  const position = document.getElementById('reading-position');
  const sections = [...document.querySelectorAll('main [data-scroll-section]')];
  if (!sidebar || !tocToggle || !sections.length) return;
  root.classList.add('has-scroll-nav');
  const links = [...sidebar.querySelectorAll('.toc-link')];
  const groups = [...sidebar.querySelectorAll('[data-toc-group]')];
  const mobile = matchMedia('(max-width: 760px)');
  let currentId;
  let scheduled = false;
  const closeToc = () => {
    sidebar.classList.remove('is-open');
    tocToggle.setAttribute('aria-expanded', 'false');
  };
  tocToggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('is-open');
    tocToggle.setAttribute('aria-expanded', String(open));
  });
  sidebar.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    closeToc();
    const target = document.getElementById(link.hash.slice(1));
    target?.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeToc();
      tocToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !tocToggle.contains(event.target)) closeToc();
  });
  sections.forEach((section) => { section.tabIndex = -1; });
  const updatePosition = () => {
    scheduled = false;
    if (document.getElementById('career-dialog')?.open) return;
    const offset = parseFloat(getComputedStyle(document.body).getPropertyValue('--reading-offset')) || 100;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset + 12) current = section;
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = sections.at(-1);
    if (current.id === currentId) return;
    currentId = current.id;
    groups.forEach((group) => group.classList.toggle('is-current', group.dataset.tocGroup === current.dataset.group));
    let activeLink;
    links.forEach((link) => {
      const active = link.hash === `#${currentId}`;
      if (active) { link.setAttribute('aria-current', 'location'); activeLink = link; }
      else link.removeAttribute('aria-current');
    });
    position.textContent = current.dataset.label;
    if (activeLink && !mobile.matches) {
      const bounds = sidebar.getBoundingClientRect();
      const activeBounds = activeLink.getBoundingClientRect();
      if (activeBounds.top < bounds.top || activeBounds.bottom > bounds.bottom) {
        sidebar.scrollTop += activeBounds.top - bounds.top - sidebar.clientHeight / 2;
      }
    }
  };
  const scheduleUpdate = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updatePosition); }
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.addEventListener('portfolio:dialogclose', scheduleUpdate);
  mobile.addEventListener('change', closeToc);
  new ResizeObserver(scheduleUpdate).observe(document.querySelector('main'));
  updatePosition();
});
