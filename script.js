// スクロールに合わせて、現在表示中のセクションに対応するナビリンクをハイライトする
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlinks a');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
}
