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
function whatsappLink(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

function imagemSrc(imagem) {
  if (!imagem) return "assets/img/produto-placeholder.svg";
  return imagem.startsWith("/") || imagem.startsWith("http") ? imagem : `assets/img/${imagem}`;
}

function produtoCardHtml(produto) {
  const tagCategoria = produto.categoriaNome
    ? `<span class="categoria-tag">${produto.categoriaNome}</span>`
    : "";
  return `
    <article class="produto-card" data-categoria="${produto.categoria || ""}">
      <div class="foto">
        <img src="${imagemSrc(produto.imagem)}" alt="${produto.nome}" loading="lazy">
      </div>
      <div class="info">
        ${tagCategoria}
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <a class="btn btn-whatsapp" target="_blank" rel="noopener"
           href="${whatsappLink(`Olá! Tenho interesse em: ${produto.nome}.`)}">
          Perguntar no WhatsApp
        </a>
      </div>
    </article>`;
}

fetch("content/products.json")
  .then((res) => res.json())
  .then((data) => {
    const categorias = data.categorias || [];
    const produtos = (data.produtos || []).map((p) => ({
      ...p,
      categoriaNome: (categorias.find((c) => c.id === p.categoria) || {}).nome || "",
    }));

    const filtros = document.getElementById("filtros-categoria");
    const grid = document.getElementById("produtos-grid");

    filtros.innerHTML =
      `<button class="filtro-btn active" data-categoria="todos">Todos</button>` +
      categorias
        .map(
          (cat) => `
            <button class="filtro-btn" data-categoria="${cat.id}">
              <img src="assets/img/${cat.icone}" alt="">
              ${cat.nome}
            </button>`
        )
        .join("");

    grid.innerHTML = produtos.map(produtoCardHtml).join("");

    filtros.addEventListener("click", (e) => {
      const btn = e.target.closest(".filtro-btn");
      if (!btn) return;
      filtros.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const categoria = btn.dataset.categoria;
      grid.querySelectorAll(".produto-card").forEach((card) => {
        const mostrar = categoria === "todos" || card.dataset.categoria === categoria;
        card.style.display = mostrar ? "" : "none";
      });
    });
  })
  .catch(() => {
    document.getElementById("produtos-grid").innerHTML =
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
