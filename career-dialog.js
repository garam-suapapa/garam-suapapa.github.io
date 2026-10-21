document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('career-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const scroller = dialog.querySelector('.dialog-scroll');
  const toc = dialog.querySelector('.dialog-toc');
  const title = document.getElementById('dialog-title');
  const position = document.getElementById('dialog-position');
  const closeButton = document.getElementById('dialog-close');
  const chapters = [...dialog.querySelectorAll('.dialog-chapter')];
  const entries = [...document.querySelectorAll('main [data-work]')];
  const work = new Map();
  chapters.forEach((chapter) => {
    chapter.querySelectorAll('[data-work-section]').forEach((section) => {
      const entry = entries.find((link) => link.dataset.work === section.id);
      if (entry) work.set(section.id, { section, chapter, entry });
    });
  });
  let activeChapter;
  let opener;
  let returnY = 0;
  let returnURL;
  let lastRoute;
  let closing = false;
  let scrollScheduled = false;
  history.scrollRestoration = 'manual';

  const markPosition = () => {
    scrollScheduled = false;
    if (!dialog.open || !activeChapter) return;
    const sections = [...activeChapter.querySelectorAll('[data-work-section]')];
    const top = scroller.getBoundingClientRect().top + 28;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= top) current = section;
      else break;
    }
    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 3) current = sections.at(-1);
    const currentWork = work.get(current.id);
    position.textContent = currentWork.entry.querySelector('strong').textContent;
    const links = [...toc.querySelectorAll('a')];
    links.forEach((link) => {
      if (link.dataset.work === current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const active = links.find((link) => link.dataset.work === current.id);
    if (active) {
      const bounds = toc.getBoundingClientRect();
      const item = active.getBoundingClientRect();
      if (item.left < bounds.left || item.right > bounds.right) toc.scrollLeft += item.left - bounds.left - 12;
    }
  };
  const schedulePosition = () => {
    if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(markPosition); }
  };
  const seek = (section) => {
    const top = scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 20;
    scroller.scrollTo({ top, behavior: 'instant' });
    markPosition();
  };
  const unlockPage = () => {
    document.body.classList.remove('dialog-open');
    document.body.style.removeProperty('--page-scroll-top');
    window.scrollTo({ top: returnY, behavior: 'instant' });
  };
  const dismiss = () => {
    if (!dialog.open) return;
    dialog.close();
    activeChapter = null;
    closing = false;
    unlockPage();
    opener?.focus({ preventScroll: true });
    document.dispatchEvent(new Event('portfolio:dialogclose'));
  };
  const show = (item) => {
    if (!dialog.open) {
      returnY = history.state?.portfolioScroll ?? window.scrollY;
      returnURL = history.state?.portfolioBase ?? `${location.pathname}${location.search}#${item.chapter.dataset.dialogGroup}`;
      opener = item.entry;
      document.body.style.setProperty('--page-scroll-top', `${-returnY}px`);
      document.body.classList.add('dialog-open');
    }
    if (activeChapter !== item.chapter) {
      chapters.forEach((chapter) => { chapter.hidden = chapter !== item.chapter; });
      activeChapter = item.chapter;
      title.textContent = activeChapter.dataset.title;
      toc.replaceChildren();
      activeChapter.querySelectorAll('[data-work-section]').forEach((section) => {
        const link = document.createElement('a');
        link.href = `#${section.id}`;
        link.dataset.work = section.id;
        link.textContent = work.get(section.id).entry.querySelector('strong').textContent;
        toc.append(link);
      });
      toc.scrollLeft = 0;
    }
    if (!dialog.open) dialog.showModal();
    seek(item.section);
    scroller.focus({ preventScroll: true });
    const startingScroll = scroller.scrollTop;
    // Align again after font loading only while the reader has stayed at the start.
    document.fonts.ready.then(() => {
      if (dialog.open && activeChapter === item.chapter && Math.abs(scroller.scrollTop - startingScroll) < 1) seek(item.section);
    });
  };
  const route = () => {
    if (lastRoute === location.hash) return;
    lastRoute = location.hash;
    const item = work.get(location.hash.slice(1));
    if (item) {
      closing = false;
      show(item);
    } else if (dialog.open) {
      returnY = history.state?.portfolioScroll ?? returnY;
      dismiss();
    } else if (history.state?.portfolioScroll != null) {
      window.scrollTo({ top: history.state.portfolioScroll, behavior: 'instant' });
    }
  };
  const openWork = (id, trigger) => {
    const item = work.get(id);
    if (!item) return;
    if (!dialog.open) {
      opener = trigger;
      returnY = window.scrollY;
      returnURL = `${location.pathname}${location.search}${location.hash}`;
      history.replaceState({ ...history.state, portfolioScroll: returnY }, '', location.href);
      history.pushState({ portfolioModal: true, portfolioBase: returnURL, portfolioScroll: returnY }, '', `#${id}`);
    } else {
      history.replaceState({ ...history.state }, '', `#${id}`);
    }
    lastRoute = undefined;
    route();
  };
  const requestClose = () => {
    if (!dialog.open || closing) return;
    closing = true;
    if (history.state?.portfolioModal) history.back();
    else {
      history.replaceState({ portfolioScroll: returnY }, '', returnURL);
      lastRoute = undefined;
      route();
    }
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-work]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!work.has(link.dataset.work)) return;
    event.preventDefault();
    openWork(link.dataset.work, link);
  });
  closeButton.addEventListener('click', requestClose);
  document.getElementById('dialog-back').addEventListener('click', requestClose);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) requestClose();
  });
  scroller.addEventListener('scroll', schedulePosition, { passive: true });
  new ResizeObserver(schedulePosition).observe(scroller);
  window.addEventListener('popstate', route);
  window.addEventListener('hashchange', route);

  const initial = work.get(location.hash.slice(1));
  if (initial) {
    // Give a direct work link its own list entry, so Back also closes it safely.
    const requestedHash = location.hash;
    const group = document.getElementById(initial.chapter.dataset.dialogGroup);
    group.scrollIntoView({ behavior: 'instant' });
    returnY = window.scrollY;
    returnURL = `${location.pathname}${location.search}#${group.id}`;
    history.replaceState({ portfolioScroll: returnY }, '', returnURL);
    history.pushState({ portfolioModal: true, portfolioBase: returnURL, portfolioScroll: returnY }, '', requestedHash);
    opener = initial.entry;
    route();
  } else lastRoute = location.hash;
});
