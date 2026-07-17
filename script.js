
(() => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false');
    }));
  }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    }), {threshold: .08, rootMargin:'0px 0px -40px'});
    revealEls.forEach(el => obs.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  const report = document.querySelector('[data-report]');
  const toc = document.querySelector('[data-toc]');
  if (report && toc) {
    let heads = [...report.querySelectorAll('h2')];
    if (!heads.length) heads = [...report.querySelectorAll('h3')];
    heads.forEach((h, idx) => {
      const id = h.id || `muc-${idx+1}`;
      h.id = id;
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
      toc.appendChild(a);
    });
    if (!heads.length) {
      toc.innerHTML = '<span class="toc-empty">Mục lục đang được cập nhật.</span>';
    }
  }

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const close = () => { lightbox.hidden = true; document.body.style.overflow=''; lbImg.removeAttribute('src'); };
    document.querySelectorAll('.report-figure img').forEach(img => img.addEventListener('click', () => {
      lbImg.src = img.src; lbImg.alt = img.alt || 'Ảnh minh chứng'; lightbox.hidden = false; document.body.style.overflow='hidden'; lightbox.querySelector('button').focus();
    }));
    lightbox.querySelector('button').addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) close(); });
  }
})();
