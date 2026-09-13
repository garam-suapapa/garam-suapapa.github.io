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
  const filters = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-row');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
      projects.forEach((project) => { project.hidden = filter !== 'all' && project.dataset.category !== filter; });
    });
  });
});
