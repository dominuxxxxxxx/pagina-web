// Confeitaria Bom Gosto — interações da página

// Substitua pelo Measurement ID real do Google Analytics 4 quando disponível
// (Google Analytics > Administrador > Fluxos de dados > Web). Enquanto o ID
// permanecer com "XXXX", nenhum script de analytics é carregado.
var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
var COOKIE_CONSENT_KEY = 'bg_cookie_consent';

function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('XXXX') !== -1) return;

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var banner = document.getElementById('cookieBanner');
  var acceptBtn = document.getElementById('cookieAccept');
  if (!banner || !acceptBtn) return;

  if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted') {
    loadAnalytics();
  } else {
    banner.classList.add('is-visible');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    banner.classList.remove('is-visible');
    loadAnalytics();
  });
});
