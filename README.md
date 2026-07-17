# Confeitaria Bom Gosto — Site

Landing page em português (pt-BR) para a Confeitaria Bom Gosto, em Weissópolis,
Pinhais - PR. HTML/CSS/JS estático, sem build, mobile-first.

## Estrutura

```
index.html            Página única (hero, sobre nós, cardápio, encomendas,
                       localização, contato)
assets/css/style.css   Estilos (paleta terracota/pastel, responsivo)
assets/js/script.js    Pequenas interações (ano do rodapé)
assets/img/            Ícones SVG das categorias, favicon e logo
```

## Rodar localmente

Não há dependências nem build. Basta servir a pasta como arquivos estáticos:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## Publicar

O site é 100% estático — pode ser publicado em qualquer hospedagem de
arquivos estáticos (Netlify, Vercel, GitHub Pages, Cloudflare Pages, ou
qualquer servidor com PHP/Apache/Nginx). Basta enviar os arquivos da raiz.

## O que personalizar antes de publicar

- **Fotos reais dos produtos**: hoje o cardápio usa ilustrações SVG de
  placeholder (bolo, doces, salgados, pavê). Troque por fotos reais dos
  produtos em `assets/img/` e atualize as tags `<img>` em `index.html`
  (seção `#cardapio`) para melhorar a conversão.
- **Domínio**: as tags `canonical` e Open Graph em `index.html` usam
  `https://confeitariabomgosto.com.br/` como placeholder — atualize para o
  domínio real depois da compra/configuração.
- **WhatsApp**: os links usam `https://wa.me/554136672764`. Se o número
  mudar, atualize em todas as ocorrências (botão flutuante, header, hero,
  seção de encomendas e rodapé).
- **Preços**: os valores "A partir de R$..." no cardápio são **ilustrativos**
  (placeholder), marcados com "*" e um aviso de "sujeitos a confirmação".
  Atualize com os preços reais em `.product-price` dentro de cada
  `.product-card` em `index.html` assim que tiver os valores definidos.

## SEO local

A página inclui dados estruturados (`schema.org/Bakery`) com endereço,
coordenadas, horário de funcionamento e avaliação agregada, além de meta
tags Open Graph e palavras-chave locais ("confeitaria Pinhais", "bolos
Pinhais", etc.) para ajudar no posicionamento em buscas e no Google Maps.

## Analytics (opcional)

O site já vem com um aviso de cookies (LGPD) e um scaffold do Google
Analytics 4 prontos, mas desativados até você configurar:

1. Crie uma propriedade GA4 em [analytics.google.com](https://analytics.google.com)
   e copie o Measurement ID (formato `G-XXXXXXXXXX`).
2. Substitua o valor de `GA_MEASUREMENT_ID` no topo de
   `assets/js/script.js` pelo ID real.
3. O script só carrega depois que o visitante aceita o aviso de cookies
   (botão "Entendi" no rodapé da página).

## Passos operacionais (fora do código)

Coisas que ajudam bastante e não dependem de código, só de configuração:

- **Google Business Profile**: reivindique/edite a ficha da confeitaria em
  [business.google.com](https://business.google.com) — é o que aparece no
  Google Maps e em buscas como "confeitaria perto de mim". Vale linkar o
  site assim que tiver o domínio definitivo.
- **Catálogo do WhatsApp Business**: no app do WhatsApp Business, cadastre
  os produtos (Bolos, Doces, Salgados, Pavês) com foto e preço em
  Ferramentas Comerciais > Catálogo — complementa a página e facilita o
  pedido dentro da própria conversa.
- **Domínio e hospedagem**: registrar `confeitariabomgosto.com.br` (ou
  similar) e publicar em algum host estático (ver seção "Publicar" acima).
  O `netlify.toml` incluso já deixa o deploy no Netlify praticamente
  zero-config.
