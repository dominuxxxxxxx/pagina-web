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

// Recria os cards do cardápio a partir de content/products.json, editável
// pelo painel /admin. Se o arquivo não carregar (offline, JS desativado),
// os cards estáticos já presentes no HTML permanecem como estão.
function renderProducts(items) {
  var grid = document.getElementById('productGrid');
  if (!grid || !Array.isArray(items) || !items.length) return;

  grid.innerHTML = '';

  items.forEach(function (item) {
    var card = document.createElement('article');
    card.className = 'product-card';

    var img = document.createElement('img');
    img.src = item.image || 'assets/img/icon-bolo.svg';
    img.alt = item.name ? item.name + ' artesanais' : '';
    img.width = 96;
    img.height = 96;
    card.appendChild(img);

    var h3 = document.createElement('h3');
    h3.textContent = item.name || '';
    card.appendChild(h3);

    var desc = document.createElement('p');
    desc.textContent = item.description || '';
    card.appendChild(desc);

    if (item.price) {
      var price = document.createElement('span');
      price.className = 'product-price';
      price.textContent = item.price;
      card.appendChild(price);
    }

    var link = document.createElement('a');
    link.className = 'btn btn-whatsapp';
    link.target = '_blank';
    link.rel = 'noopener';
    var message = item.whatsappText || ('Olá, quero saber mais sobre ' + (item.name || 'os produtos') + '!');
    link.href = 'https://wa.me/554136672764?text=' + encodeURIComponent(message);
    link.textContent = 'Peça pelo WhatsApp';
    card.appendChild(link);

    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  fetch('content/products.json', { cache: 'no-store' })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (data && data.items) renderProducts(data.items);
    })
    .catch(function () { /* mantém os cards estáticos do HTML */ });

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
