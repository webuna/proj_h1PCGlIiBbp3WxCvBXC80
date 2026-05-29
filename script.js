(function () {
  'use strict';

  const UNIT_PRICE = 34;

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Quantity + price
  const qtyInput = document.getElementById('qty');
  const totalEl = document.getElementById('totalPrice');
  const stepButtons = document.querySelectorAll('.qty-control button[data-step]');

  function clampQty(n) {
    if (isNaN(n) || n < 1) return 1;
    if (n > 9) return 9;
    return Math.floor(n);
  }

  function updateTotal() {
    const q = clampQty(parseInt(qtyInput.value, 10));
    qtyInput.value = q;
    totalEl.textContent = '$' + (q * UNIT_PRICE);
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10) || 0;
      qtyInput.value = clampQty((parseInt(qtyInput.value, 10) || 1) + step);
      updateTotal();
    });
  });

  qtyInput.addEventListener('input', updateTotal);
  qtyInput.addEventListener('blur', updateTotal);

  // Toast
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // Cart submit
  const form = document.getElementById('buyForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = clampQty(parseInt(qtyInput.value, 10));
    const total = q * UNIT_PRICE;
    showToast(`Added ${q} Goobe${q > 1 ? 's' : ''} to your cart — $${total}`);
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
