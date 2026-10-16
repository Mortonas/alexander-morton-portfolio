import { useLayoutEffect } from 'react';

export default function FragmentNavigation() {
  useLayoutEffect(() => {
    const header = document.querySelector('.site-header');
    let frame = 0;
    let observer = null;
    const measure = () => document.documentElement.style.setProperty('--header-height', `${header?.getBoundingClientRect().height || 0}px`);
    const resize = new ResizeObserver(measure);
    if (header) resize.observe(header);
    measure();

    function resolve() {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) {
        if (!observer) {
          observer = new MutationObserver(schedule);
          observer.observe(document.getElementById('root'), { childList: true, subtree: true });
        }
        return;
      }
      observer?.disconnect();
      observer = null;
      measure();
      const focusTarget = target.matches('main, h1, h2, h3, h4') ? target : target.querySelector('h1, h2, h3, h4') || target;
      if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resolve);
    }
    function navigate(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      event.preventDefault();
      if (url.hash !== window.location.hash) window.history.pushState(null, '', url.hash);
      schedule();
    }
    function changed() {
      observer?.disconnect();
      observer = null;
      schedule();
    }
    document.addEventListener('click', navigate);
    window.addEventListener('hashchange', changed);
    window.addEventListener('popstate', changed);
    if (window.location.hash) changed();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resize.disconnect();
      document.removeEventListener('click', navigate);
      window.removeEventListener('hashchange', changed);
      window.removeEventListener('popstate', changed);
    };
  }, []);
  return null;
}
