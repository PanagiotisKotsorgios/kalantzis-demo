/*
 * KALANTZIS FOODS | Motion Direction v5
 * Vanilla JS. Motion stays ornamental: no effects on navigation correctness, keyboard
 * interaction, reading order, forms, SEO, or the ability to view content without JS.
 */
(() => {
  'use strict';
  const doc = document;
  const html = doc.documentElement;
  const root = doc.getElementById('app');
  if (!root) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsObserver = 'IntersectionObserver' in window;
  const motionOK = !reduceMotion.matches && supportsObserver;
  if (!motionOK) return;
  html.classList.add('kf-motion-ready');

  const motionTargets = new WeakSet();
  const active = new WeakSet();
  let inFlight = false;
  let observer;

  const safeElement = el => el && el.nodeType === 1 && el.isConnected && !el.closest('.v4-mega, .search-panel, [hidden], #modalBackdrop, .kf-page-veil');
  const skip = el => !safeElement(el) || el.matches('input,select,textarea,option,svg,video,iframe,body,html,#app') || el.closest('[aria-hidden="true"],.p-mega') || motionTargets.has(el);
  const isDesktop = () => window.matchMedia('(min-width: 1101px)').matches;

  function prepare(el, index = 0, opts = {}) {
    if(skip(el)) return;
    if(el.closest('.topbar,.header,.nav-row') || el.matches('.p-hero-photo > img,.p-hero-photo-inset,.p-photo-caption')) return;
    if (el.getBoundingClientRect().width < 2 || el.getBoundingClientRect().height < 2) return;
    // Avoid transitioning an ancestor and its child simultaneously: choose meaningful leaves.
    motionTargets.add(el);
    const delay = Math.min(index * (opts.compact ? 37 : 74), opts.maxDelay || 400);
    el.style.setProperty('--kf-motion-delay', `${delay}ms`);
    el.style.setProperty('--kf-motion-duration', `${opts.duration || 820}ms`);
    el.style.setProperty('--kf-motion-travel', `${opts.travel || 24}px`);
    if(opts.direction === 'left') el.classList.add('kf-motion-from-left');
    if(opts.direction === 'right') el.classList.add('kf-motion-from-right');
    if(opts.fade) el.classList.add('kf-motion-fade');
    el.classList.add('kf-motion-item');
    observer.observe(el);
  }

  function reveal(el) {
    if (!el.classList.contains('kf-motion-item') || active.has(el)) return;
    active.add(el);
    el.classList.add('kf-motion-in');
    // Remove reveal classes once animation completes, so standard hover/active transforms work.
    const ms = parseFloat(el.style.getPropertyValue('--kf-motion-duration')) || 820;
    const delay = parseFloat(el.style.getPropertyValue('--kf-motion-delay')) || 0;
    window.setTimeout(() => {
      if (!el.isConnected) return;
      el.classList.remove('kf-motion-item','kf-motion-in','kf-motion-from-left','kf-motion-from-right','kf-motion-fade');
      el.style.removeProperty('--kf-motion-delay');
      el.style.removeProperty('--kf-motion-duration');
      el.style.removeProperty('--kf-motion-travel');
    },ms+delay+95);
  }

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, {threshold:.06,rootMargin:'0px 0px -3% 0px'});

  function intro(target, delay, variant='rise') {
    if (!target || !target.isConnected) return;
    if (target.closest('[hidden]')) return;
    target.style.setProperty('--kf-intro-delay', `${delay}ms`);
    target.classList.add(variant==='fade'?'kf-intro-fade':variant==='slide'?'kf-intro-slide':'kf-intro-rise');
    target.addEventListener('animationend',()=>{
      target.classList.remove('kf-intro-rise','kf-intro-fade','kf-intro-slide');
      target.style.removeProperty('--kf-intro-delay');
    },{once:true});
  }

  function animateHeader() {
    const top = doc.querySelector('.topbar');
    intro(top,0,'fade');
    const logo = doc.querySelector('.header .brand');
    intro(logo,55,'slide');
    const tools = [...doc.querySelectorAll('.header .nav-actions > *')];
    tools.forEach((tool,i)=>intro(tool,120+i*65));
    const bar = doc.querySelector('.header .nav-row');
    if(bar) {bar.classList.add('kf-nav-bar-enter');bar.addEventListener('animationend',()=>bar.classList.remove('kf-nav-bar-enter'),{once:true});}
    doc.querySelectorAll('.header #mainNav > .v4-nav-item, .header #mainNav > .mobile-partner, .header .nav-partner-cta').forEach((item,i)=>{
      if(isDesktop() && !item.classList.contains('mobile-partner'))intro(item,175+i*47);
    });
    doc.querySelectorAll('.v4-mega-nav').forEach(nav=>{
      nav.querySelectorAll('.v4-mega-option').forEach((el,i)=>el.style.setProperty('--kf-menu-order',i));
    });
  }

  function animateHero() {
    const hero = doc.querySelector('.p-hero');
    if(hero) {
      const selectors = [
        '.p-hero-copy > .p-overline','.p-hero-issue','.p-hero h1',
        '.p-hero-lead','.p-hero-small','.p-hero-actions > *', '.p-hero-bottom > *'
      ];
      let i = 0;
      selectors.forEach(s=>hero.querySelectorAll(s).forEach(el=>intro(el,240+(i++)*105)));
      hero.querySelector('.p-hero-photo > img')?.classList.add('kf-cinematic-image');
      hero.querySelector('.p-hero-photo-inset')?.classList.add('kf-hero-inset');
      hero.querySelector('.p-photo-caption')?.classList.add('kf-hero-caption');
      return;
    }
    const heroZone = doc.querySelector('.v4-pricing-hero, .page-banner, .banner, .p-page-hero, .v4-auth-visual, .login-copy, .v4-dash-head');
    if(heroZone) {
      const targets = heroZone.querySelectorAll('.v4-kicker,.eyebrow,h1,p,.v4-hero-links > *, .p-btn,.btn, .login-point');
      [...targets].slice(0,13).forEach((el,i)=>intro(el,200+i*92));
      heroZone.querySelector('img')?.classList.add('kf-cinematic-image');
    }
  }

  /* A page is composed of story blocks. Animate those blocks, then their siblings in rhythm. */
  const groupSelectors = [
    '.category-grid', '.feature-product-grid', '.blog-grid', '.product-grid',
    '.p-assurance-inner', '.p-food-cards', '.p-quotes', '.p-four-columns',
    '.p-info-grid', '.p-b2b-cards', '.p-step-list', '.p-quality-grid',
    '.p-contact-grid', '.p-pack-grid', '.p-journal-grid', '.benefits-grid',
    '.bottom-features-grid', '.v4-gateway-grid', '.v4-dash-tiles',
    '.v4-price-choices', '.v4-retail-chips', '.v4-catalog-grid',
    '.v4-dash-main', '.p-feature-list', '.footer-top',
    '.p-hero-actions', '.p-hero-bottom', '.p-quote-steps', '.p-form-two',
    '.p-origin-grid', '.p-origin-long-grid', '.about-row', '.faq-layout',
    '.p-lead-layout', '.p-contact-ribbon .wrap', '.contact-grid',
    '.story-grid', '.shop-layout', '.blog-layout', '.cart-layout',
    '.v4-auth-form-row', '.v4-dashboard .wrap', '.p-assurance',
    '.v4-gateway-heading', '.p-split-heading', '.p-order-photo',
    '.p-catalog-tiles', '.v4-price-list-intro', '.v4-retail-table',
    '.p-cart-inquiry-grid', '.v4-auth-benefits', '.v4-auth-tabs', '.v4-auth-form',
    '.v4-dash-favs', '.v4-dash-aside', '.journey-grid', '.story-teaser-grid',
    '.highlights-grid', '.blog-aside', '.faq-list', '.v4-auth-right',
  ];
  const groupSelector = groupSelectors.join(',');
  const textSelector = [
    '.p-intro > :is(.p-overline,h2,p)',
    '.feature-heading > :is(.eyebrow,h2,p)',
    '.section-head > :is(div,h2,p,a)',
    '.p-split-heading > :is(div,h2,p,a)',
    '.v4-section-head > :is(div,h2,p,a)',
    '.v4-gateway-heading > :is(.v4-kicker,h2,p)',
    '.p-lead-left > :is(.p-overline,h2,p,.p-lead-contact)',
    '.p-pack-grid > :is(div,figure)',
    '.p-food-guide .p-overline',
    '.p-auth-intro > :is(h2,p)',
    '.p-catalog-story > .wrap > :is(h2,p)',
  ].join(',');

  function prepGroups(scope) {
    // Group children (cards, columns, editorial panels). Skip hero/header; those have custom direction.
    const groups = [];
    if(scope.matches?.(groupSelector)) groups.push(scope);
    scope.querySelectorAll?.(groupSelector).forEach(x=>groups.push(x));
    for(const group of groups){
      if(group.closest('.p-hero,.v4-mega,.header')) continue;
      const children=[...group.children].filter(el=>!el.matches('script,style,.kf-page-veil,[hidden]'));
      // Avoid a huge cascade within sidebars or long tables.
      children.slice(0,38).forEach((el,i)=>{
        if(el.matches('.v4-mega,.nav-links,.header,.p-hero'))return;
        prepare(el,i,{compact:children.length>7,travel:el.matches('article,.category-card,.product-card,.post-card')?29:20});
      });
    }
  }

  function prepContent(scope) {
    const candidates=[];
    if(scope.matches?.(textSelector))candidates.push(scope);
    scope.querySelectorAll?.(textSelector).forEach(el=>candidates.push(el));
    let i=0;
    for(const el of candidates) {
      if(el.closest('.p-hero,.header,.v4-mega')) continue;
      if (el.parentElement && motionTargets.has(el.parentElement)) continue;
      prepare(el,i++ % 5,{compact:true,travel:18});
    }
  }

  function prepSections(scope) {
    const candidates = [
      'main > section', '#app > section', '#app > .benefits-strip',
      '#app > .p-contact-ribbon', '#app > .newsletter',
      '#app > .bottom-features', '#app > footer',
      '.v4-gateway-section', '.p-origin-feature', '.p-quality',
      '.p-proof', '.p-business', '.p-contact-channels',
      '.p-catalog-story', '.p-lead-section', '.p-food-guide'
    ].join(',');
    const sections=[];
    if(scope.matches?.(candidates))sections.push(scope);
    scope.querySelectorAll?.(candidates).forEach(el=>sections.push(el));
    sections.forEach(section=>{
      if(section.closest('.p-hero,.header,.v4-mega'))return;
      const namedBlock = section.querySelector(':scope > .wrap, :scope > .p-intro, :scope > .v4-gateway-heading');
      const direct = namedBlock || section;
      const children = [...direct.children].filter(el => !el.matches('script,style,.v4-mega'));
      // A grid/row is animated child-by-child elsewhere; standalone sections get a subtle entrance.
      if(children.length === 1 && !children[0].matches(groupSelector)) {
        const el=children[0];
        if(!el.querySelector(groupSelector))prepare(el,0,{travel:22});
      }
    });
  }

  function scan(scope=root) {
    if(!scope || !scope.isConnected) return;
    prepSections(scope);
    prepGroups(scope);
    prepContent(scope);
    // Footer: each column, headings, links, social elements and copyright rise in order.
    const footer = scope.matches?.('.footer')?scope:scope.querySelector?.('.footer');
    if(footer) {
      footer.querySelectorAll('.footer-top > div').forEach((c,i)=>{
        prepare(c,i,{duration:850,travel:30});
      });
      const bottom=footer.querySelector('.footer-bottom');
      if(bottom)prepare(bottom,0,{fade:true,duration:930});
    }
    // Distinct intro for internal page headings not in a hero block.
    const special = [
      '.v4-customer-auth .v4-auth-right > *',
      '.v4-dashboard .v4-dash-head',
      '.shop-top > *', '.blog-filters > *',
      '.cart-summary > *', '.p-hero-photo .p-photo-caption',
      '.v4-retail-section .v4-section-head > *',
      '.v4-gateway-section .v4-gateway-heading > *'
    ].join(',');
    scope.querySelectorAll?.(special).forEach((el,i)=>{
      if(el.closest('.p-hero,.header,.v4-mega'))return;
      if(!motionTargets.has(el.parentElement))prepare(el,i%6,{compact:true,travel:18});
    });
  }

  // Built-in animations remain visible by default if a CSS file or JS enhancement is blocked.
  animateHeader();
  animateHero();
  scan();

  // Product cards, blog posts, retail rows and cart rows change without a page reload.
  // Update precisely the inserted nodes so no already-read content flickers again.
  const dynamicHosts = ['productGrid','blogGrid','cartItems','v4RetailBody','productPager','cartSummary'];
  const dynamicObservers=[];
  dynamicHosts.forEach(id=>{
    const host=doc.getElementById(id);
    if(!host)return;
    const mo=new MutationObserver(records=>{
      const fresh=[];
      for(const r of records)for(const n of r.addedNodes) {
        if(n.nodeType!==1)continue;
        if(n.matches('article,.product-card,.post-card,tr,.cart-item,.cart-row,.empty-state'))fresh.push(n);
        else if(n.querySelectorAll)fresh.push(...n.querySelectorAll('article,.product-card,.post-card,tr,.cart-item,.cart-row,.empty-state'));
      }
      if(!fresh.length)return;
      fresh.slice(0,16).forEach((el,i)=>prepare(el,i,{compact:true,duration:620,travel:16}));
    });
    mo.observe(host,{childList:true,subtree:true});
    dynamicObservers.push(mo);
  });

  // As the reader proceeds down long pages, the gold progress line follows their place.
  const progress = doc.createElement('div');
  progress.className='kf-reading-progress';
  progress.setAttribute('aria-hidden','true');
  doc.body.appendChild(progress);
  let scrollQueued = false;
  function updateProgress() {
    scrollQueued=false;
    const max = doc.documentElement.scrollHeight - window.innerHeight;
    const p = max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
    progress.style.transform = `scaleX(${p.toFixed(4)})`;
  }
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});
  window.addEventListener('resize',()=>requestAnimationFrame(updateProgress),{passive:true});
  updateProgress();

  // On same-origin document links: editorial transition, with modifier keys, external links,
  // hash navigation, forms, downloads, and opening in a new tab working normally.
  const veil=doc.createElement('div');
  veil.className='kf-page-veil';
  veil.setAttribute('aria-hidden','true');
  veil.innerHTML='<span class="kf-veil-brand"><img src="assets/logo.png" alt=""> LAZAROS KALANTZIS FOODS</span>';
  doc.body.appendChild(veil);
  const currentPage = window.location.pathname;
  doc.addEventListener('click',event=>{
    if(reduceMotion.matches || inFlight || event.defaultPrevented || event.button!==0 || event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)return;
    const a=event.target.closest?.('a[href]');
    if(!a || a.hasAttribute('download') || a.getAttribute('target') && a.getAttribute('target')!=='_self' || a.closest('[contenteditable="true"]'))return;
    const raw=a.getAttribute('href');
    if(!raw || raw.startsWith('#') || /^(mailto:|tel:|javascript:|sms:)/i.test(raw))return;
    let url;
    try{url=new URL(a.href,window.location.href)}catch{return}
    if(url.origin!==window.location.origin || !url.pathname.toLowerCase().endsWith('.html'))return;
    // Same-page hash is instantaneous and native; avoid taking a full-page detour.
    if(url.pathname===currentPage && url.search===window.location.search){
      if(url.hash)return;
      return;
    }
    event.preventDefault();
    inFlight=true;
    html.classList.add('kf-route-leaving');
    veil.classList.add('kf-veil-enter');
    // Leave enough time for a recognizable wipe but avoid an artificial loading delay.
    window.setTimeout(()=>window.location.assign(url.href),360);
  },true);

  window.addEventListener('pageshow',event=>{
    if(event.persisted){
      inFlight=false;
      html.classList.remove('kf-route-leaving');
      veil.classList.remove('kf-veil-enter');
      updateProgress();
    }
  });
  reduceMotion.addEventListener?.('change',e=>{
    if(!e.matches)return;
    observer.disconnect();
    dynamicObservers.forEach(mo=>mo.disconnect());
    doc.querySelectorAll('.kf-motion-item').forEach(el=>{
      el.classList.remove('kf-motion-item','kf-motion-in','kf-motion-from-left','kf-motion-from-right','kf-motion-fade');
      el.style.removeProperty('--kf-motion-delay');
      el.style.removeProperty('--kf-motion-duration');
      el.style.removeProperty('--kf-motion-travel');
    });
    veil.remove();progress.remove();
  });
})();
