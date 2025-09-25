// /scripts/aem.js — modern AEM bootstrap
import {
  decorateMain,
  loadBlocks,
  loadHeader,
  loadFooter,
  loadCSS,
  waitForLCP,
  sampleRUM,
} from 'https://www.aem.live/tools/aem.js';

// list blocks that might affect LCP (tune for your site)
const LCP_BLOCKS = ['hero', 'carousel'];

function addFavicon(href = '/favicon.svg') {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  document.head.appendChild(link);
}

async function decoratePage(doc) {
  addFavicon();
  const main = doc.querySelector('main');
  decorateMain(main);
  await loadBlocks(main);
}

async function loadEager(doc) {
  document.documentElement.lang = document.documentElement.lang || 'en';
  sampleRUM('top'); // optional
  await decoratePage(doc);
  await waitForLCP(LCP_BLOCKS);
}

async function loadLazy(doc) {
  await loadHeader(doc.querySelector('header'));
  await loadFooter(doc.querySelector('footer'));
  // optional: your lazy CSS
  // await loadCSS('/styles/lazy-styles.css');
}

function loadDelayed() {
  window.setTimeout(() => {
    // optional: split delayed work
    // import('/scripts/delayed.js');
  }, 2000);
}

(async function init() {
  const doc = document;
  await loadEager(doc);
  await loadLazy(doc);
  loadDelayed();
})();
