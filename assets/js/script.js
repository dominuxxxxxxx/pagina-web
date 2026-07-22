// JPG Informática — interações do site

// Troque pelo Measurement ID real (formato G-XXXXXXXXXX) para ativar o Google Analytics 4.
const GA_MEASUREMENT_ID = "";

const WHATSAPP_NUMBER = "5541996156001";

document.getElementById("ano").textContent = new Date().getFullYear();

// Menu mobile
const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
document.getElementById("mobile-menu").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Categorias de produtos (content/products.json)
fetch("content/products.json")
  .then((res) => res.json())
  .then((data) => {
    const categorias = data.categorias || [];
    const grid = document.getElementById("categorias-grid");
    grid.innerHTML = categorias
      .map((cat) => {
        const itens = (cat.itens || []).map((item) => `<span>${item}</span>`).join("");
        const mensagem = encodeURIComponent(
          `Olá! Gostaria de saber mais sobre ${cat.nome}.`
        );
        return `
          <article class="categoria-card">
            <img src="assets/img/${cat.icone}" alt="" width="52" height="52">
            <h3>${cat.nome}</h3>
            <p>${cat.descricao}</p>
            <div class="categoria-itens">${itens}</div>
            <a class="btn btn-whatsapp" target="_blank" rel="noopener"
               href="https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}">
              Perguntar no WhatsApp
            </a>
          </article>`;
      })
      .join("");
  })
  .catch(() => {
    document.getElementById("categorias-grid").innerHTML =
      "<p>Não foi possível carregar os produtos no momento. Fale com a gente pelo WhatsApp.</p>";
  });

// Depoimentos (content/testimonials.json)
fetch("content/testimonials.json")
  .then((res) => res.json())
  .then((data) => {
    const depoimentos = data.depoimentos || [];
    const grid = document.getElementById("depoimentos-grid");
    grid.innerHTML = depoimentos
      .map(
        (dep) => `
          <div class="depoimento-card">
            <div class="quote-mark">&ldquo;</div>
            <p class="texto">${dep.texto}</p>
            <div class="autor">${dep.autor}</div>
          </div>`
      )
      .join("");
  })
  .catch(() => {
    document.getElementById("depoimentos-grid").innerHTML = "";
  });

// Aviso de cookies (LGPD) + Google Analytics 4
const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const COOKIE_KEY = "jpg-informatica-cookies-aceitos";

function carregarAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

if (localStorage.getItem(COOKIE_KEY) === "true") {
  carregarAnalytics();
} else {
  cookieBanner.classList.add("show");
}

cookieAccept.addEventListener("click", () => {
  localStorage.setItem(COOKIE_KEY, "true");
  cookieBanner.classList.remove("show");
  carregarAnalytics();
});
