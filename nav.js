(function () {
  const PAGES = [
    { href: 'index.html',         key: 'run',      label: 'Run Plan' },
    { href: 'strength.html',      key: 'strength', label: 'Strength' },
    { href: 'hr-zones.html',      key: 'hr',        label: 'HR Zones' },
    { href: 'longrun-card.html',  key: 'longrun',  label: 'Long Run' },
    { href: 'training-plan.html', key: 'plan',     label: 'Training Plan' },
  ];
  const active = document.currentScript.dataset.active;
  const html = PAGES.map(p =>
    `<a href="${p.href}" class="nav-link${p.key === active ? ' active' : ''}">${p.label}</a>`
  ).join('\n  ');
  document.write(`<nav class="site-nav">\n  ${html}\n</nav>`);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();
