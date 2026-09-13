document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const stored = localStorage.getItem('portfolio-theme');
  const initial = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const apply = (theme) => {
    root.dataset.theme = theme;
    if (!button) return;
    const dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? '밝은 테마로 전환' : '어두운 테마로 전환');
  };
  apply(initial);
  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    apply(next);
  });
});
