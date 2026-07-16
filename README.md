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
- **Preços**: os cards de produto não têm preço fixo (produtos variam por
  encomenda). Se quiser adicionar preços "a partir de", edite os parágrafos
  dentro de `.product-card` em `index.html`.

## SEO local

A página inclui dados estruturados (`schema.org/Bakery`) com endereço,
coordenadas, horário de funcionamento e avaliação agregada, além de meta
tags Open Graph e palavras-chave locais ("confeitaria Pinhais", "bolos
Pinhais", etc.) para ajudar no posicionamento em buscas e no Google Maps.
