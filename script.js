(function () {
  const navLinks = Array.from(document.querySelectorAll('nav a'));
  const sections = Array.from(document.querySelectorAll('.page > section'));
  const subnav = document.querySelector('.subnav');

  let renderedFor = null;

  function renderSubnav(section) {
    if (renderedFor === section) return;
    renderedFor = section;
    subnav.innerHTML = '';
    section.querySelectorAll('h3').forEach((h) => {
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      subnav.appendChild(a);
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const href = '#' + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === href));
        renderSubnav(entry.target);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const subheaders = Array.from(document.querySelectorAll('h3'));
  const subheaderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = subnav.querySelector(`a[href="#${entry.target.id}"]`);
        if (!link) return;
        subnav.querySelectorAll('a').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  subheaders.forEach((h) => subheaderObserver.observe(h));
})();

// Open external links safely: avoid giving the target page a handle on `window.opener`.
document.querySelectorAll('a[target="_blank"]').forEach((a) => {
  a.rel = 'noopener noreferrer';
});

(function () {
  const backToTop = document.getElementById('backToTop');

  window.addEventListener(
    'scroll',
    () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    },
    { passive: true }
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
