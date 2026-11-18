(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  function apply() {
    root.dataset.theme = choice || (system.matches ? 'dark' : 'light');
    document.querySelector('.theme')?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    const language = document.querySelector('.lang');
    language.addEventListener('click', () => { language.hash = location.hash; });
    document.querySelector('.theme').addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', choice); } catch {}
      apply();
    });
  });
})();
