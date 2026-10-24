'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 641px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

// Native tab controls support pointer use and standard arrow/Home/End navigation.
const tabs = [...document.querySelectorAll('.product-tabs [role="tab"]')];
function activateTab(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (!target) return;
    event.preventDefault();
    activateTab(target);
    target.focus();
  });
});

// Product screenshots are actual Studio captures, available at full size.
const imageDialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
let imageTrigger;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    const caption = button.dataset.caption;
    document.getElementById('dialog-image-frame').classList.toggle('crop-editor', button.dataset.crop === 'editor');
    dialogImage.src = button.dataset.image;
    dialogImage.alt = caption;
    document.getElementById('image-dialog-title').textContent = caption;
    imageDialog.showModal();
    document.body.classList.add('modal-open');
    imageDialog.querySelector('.dialog-close').focus();
  });
});
imageDialog.querySelector('.dialog-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const box = imageDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) imageDialog.close();
});
imageDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  imageTrigger?.focus();
});

document.querySelectorAll('[data-copy]').forEach(button => {
  const original = button.innerHTML;
  let resetTimer;
  button.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select the JSON below to copy';
    }
    resetTimer = setTimeout(() => { button.innerHTML = original; }, 2500);
  });
});

const shippingDemo = document.getElementById('shipping-demo');
shippingDemo?.addEventListener('submit', event => {
  event.preventDefault();
  if (!shippingDemo.reportValidity()) return;
  const subtotal = Number(new FormData(shippingDemo).get('subtotal'));
  document.getElementById('demo-result').textContent = Number.isFinite(subtotal) && subtotal >= 0
    ? JSON.stringify({ fee: subtotal >= 100 ? 0 : 9, method: 'Standard' }, null, 2)
    : 'Enter a non-negative subtotal.';
});
const walkthrough = document.getElementById('walkthrough-form');
walkthrough?.addEventListener('submit', event => {
  event.preventDefault();
  if (!walkthrough.reportValidity()) return;
  const data = new FormData(walkthrough);
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nPolicy to discuss:\n${data.get('policy')}`;
  window.location.href = `mailto:hello@srotax.com?subject=SrotaX%20Studio%20walkthrough&body=${encodeURIComponent(body)}`;
  document.getElementById('contact-status').textContent = 'Email draft requested. Send it from your email app; nothing has been submitted by this website.';
});

const industryFilter = document.getElementById('industry-filter');
industryFilter?.addEventListener('change', () => {
  let visible = 0;
  document.querySelectorAll('.library-grid article').forEach(card => {
    const industries = card.dataset.industries.split('|');
    card.hidden = industryFilter.value !== 'all' && !industries.includes(industryFilter.value) && !industries.includes('Cross-industry');
    if (!card.hidden) visible++;
  });
  document.getElementById('use-case-count').textContent = `${visible} ${visible === 1 ? 'example' : 'examples'}`;
  document.querySelectorAll('.library-grid').forEach(grid => {
    const empty = !grid.querySelector('article:not([hidden])');
    grid.hidden = empty;
    let heading = grid.previousElementSibling;
    if (heading?.classList.contains('library-intro')) { heading.hidden = empty; heading = heading.previousElementSibling; }
    if (heading?.classList.contains('library-subtitle')) heading.hidden = empty;
  });
});
