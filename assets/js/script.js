// Flor & Cultura Pinhais — interações da página

// Substitua pelo Measurement ID real do Google Analytics 4 quando disponível
// (Google Analytics > Administrador > Fluxos de dados > Web). Enquanto o ID
// permanecer com "XXXX", nenhum script de analytics é carregado.
var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
var COOKIE_CONSENT_KEY = 'fc_cookie_consent';
var WHATSAPP_NUMBER = '5541997317189';
var currentCategory = 'todos';
var catalogData = null;

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

function formatPrice(price) {
  if (typeof price === 'number') {
    return 'R$ ' + price.toFixed(2).replace('.', ',').replace(',00', '');
  }
  return price || '';
}

// Desenha os cards do catálogo filtrados pela categoria ativa.
function renderProducts(items) {
  var grid = document.getElementById('productGrid');
  if (!grid || !Array.isArray(items)) return;

  grid.innerHTML = '';

  var visible = items.filter(function (item) {
    return currentCategory === 'todos' || (item.categories || []).indexOf(currentCategory) !== -1;
  });

  if (!visible.length) {
    var empty = document.createElement('p');
    empty.className = 'product-note';
    empty.textContent = 'Nenhum produto nessa categoria por enquanto — fale com a gente pelo WhatsApp.';
    grid.appendChild(empty);
    return;
  }

  visible.forEach(function (item) {
    var card = document.createElement('article');
    card.className = 'product-card';

    var img = document.createElement('img');
    img.src = item.image || 'assets/img/icon-buque.svg';
    img.alt = item.name || '';
    img.className = 'lightbox-trigger';
    if (item.description) {
      img.dataset.description = item.description;
    }
    card.appendChild(img);

    var scrim = document.createElement('div');
    scrim.className = 'product-card-scrim';
    card.appendChild(scrim);

    var body = document.createElement('div');
    body.className = 'product-card-body';

    var h3 = document.createElement('h3');
    h3.textContent = item.name || '';
    body.appendChild(h3);

    if (item.price !== undefined && item.price !== null && item.price !== '') {
      var price = document.createElement('span');
      price.className = 'product-price';
      price.textContent = formatPrice(item.price);
      body.appendChild(price);
    }

    var link = document.createElement('a');
    link.className = 'btn btn-whatsapp';
    link.target = '_blank';
    link.rel = 'noopener';
    var message = item.whatsappText || ('Olá, quero saber mais sobre ' + (item.name || 'os produtos') + '!');
    link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    link.textContent = 'Peça pelo WhatsApp';
    body.appendChild(link);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

// Monta os botões de filtro por categoria a partir de content/products.json.
function renderFilters(categories, items) {
  var wrap = document.getElementById('catalogFilters');
  if (!wrap || !Array.isArray(categories)) return;

  wrap.innerHTML = '';

  function makeChip(id, label, count, image) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-chip' + (id === currentCategory ? ' is-active' : '');

    if (image) {
      var thumb = document.createElement('img');
      thumb.src = image;
      thumb.alt = '';
      btn.appendChild(thumb);
    }

    var text = document.createElement('span');
    text.textContent = label + (count !== undefined ? ' (' + count + ')' : '');
    btn.appendChild(text);

    btn.addEventListener('click', function () {
      currentCategory = id;
      wrap.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
      btn.classList.add('is-active');
      renderProducts(items);
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return btn;
  }

  wrap.appendChild(makeChip('todos', 'Todos', items.length, 'assets/img/logo.png'));

  categories.forEach(function (cat) {
    var count = items.filter(function (item) { return (item.categories || []).indexOf(cat.id) !== -1; }).length;
    wrap.appendChild(makeChip(cat.id, cat.label, count, cat.image));
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
      if (!data || !data.items) return;
      catalogData = data;
      renderFilters(data.categories || [], data.items);
      renderProducts(data.items);
    })
    .catch(function () { /* mantém a mensagem de carregando no HTML */ });

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

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxCaption = document.getElementById('lightboxCaption');

  function openLightbox(src, alt, description) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    if (lightboxCaption) {
      lightboxCaption.innerHTML = '';
      if (alt) {
        var name = document.createElement('strong');
        name.textContent = alt;
        lightboxCaption.appendChild(name);
      }
      if (description) {
        var desc = document.createElement('span');
        desc.textContent = description;
        lightboxCaption.appendChild(desc);
      }
      lightboxCaption.classList.toggle('is-visible', !!(alt || description));
    }
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('.lightbox-trigger');
    if (trigger) {
      openLightbox(trigger.src, trigger.alt, trigger.dataset.description);
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
