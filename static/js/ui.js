// UI Enhancements: theme toggle, scroll-to-top, nav active state, footer year
(function () {
  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  function setIcon(theme) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon-stars"></i>';
  }
  setIcon(document.documentElement.getAttribute('data-theme'));

  toggleBtn && toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIcon(next);
  });

  // Scroll to top
  const toTop = document.getElementById('to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });
  toTop && toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-links .nav-link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((l) => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((sec) => observer.observe(sec));

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
