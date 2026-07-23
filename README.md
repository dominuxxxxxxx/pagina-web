# Flor & Cultura Pinhais — Site

Landing page em português (pt-BR) para a Flor & Cultura Pinhais, floricultura
em Weissópolis, Pinhais - PR. HTML/CSS/JS estático, sem build, mobile-first.

## Estrutura

```
index.html              Página única (hero, sobre nós, catálogo, como
                         funciona/entrega, depoimentos, localização, contato)
assets/css/style.css     Estilos (paleta rosa/verde-sálvia, responsivo)
assets/js/script.js      Interações + carrega o catálogo de content/products.json
assets/img/               Ícones SVG das categorias, logo e favicon
assets/img/uploads/        Fotos enviadas pelo painel /admin
content/products.json    Catálogo (nome, descrição, preço, foto) — editável
                         via /admin ou direto no arquivo
admin/                   Painel de edição (Decap CMS)
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

- **Logo real**: hoje o site usa um monograma floral em SVG como placeholder
  (`assets/img/logo.svg`). Troque pela logo real da floricultura, se houver
  uma, mantendo o mesmo nome de arquivo ou atualizando as referências em
  `index.html`.
- **Fotos reais dos produtos**: o catálogo usa ilustrações SVG de placeholder
  (buquê, cesta, arranjo, ocasiões especiais). Troque por fotos reais dos
  arranjos em `assets/img/` (ou pelo painel `/admin`) para melhorar a
  conversão — há bastante material disponível no Instagram do negócio.
- **Domínio**: as tags `canonical` e Open Graph em `index.html` usam
  `https://floreculturapinhais.com.br/` como placeholder — atualize para o
  domínio real depois da compra/configuração.
- **WhatsApp**: os links usam `https://wa.me/5541997317189`. Se o número
  mudar, atualize em todas as ocorrências (botão flutuante, header, hero,
  seção de entrega, catálogo e rodapé) e em `WHATSAPP_NUMBER` no
  `assets/js/script.js`.
- **Preços e fotos do catálogo**: os valores "A partir de R$..." são
  **ilustrativos** (placeholder). Podem ser atualizados direto pelo painel
  `/admin` (veja seção abaixo) ou editando `content/products.json`.
- **Depoimentos**: os 3 depoimentos na seção "Depoimentos" são **ilustrativos**
  — substitua pelo texto real de avaliações do Google antes de publicar (é
  uma boa prática não publicar depoimentos atribuídos a clientes reais sem
  usar o texto que eles de fato escreveram).

## SEO local

A página inclui dados estruturados (`schema.org/Florist`) com endereço,
coordenadas, horário de funcionamento e avaliação agregada, além de meta
tags Open Graph e palavras-chave locais ("floricultura Pinhais", "buquê
Pinhais", "entrega de flores Pinhais", etc.) para ajudar no posicionamento em
buscas e no Google Maps — a ideia é competir diretamente com as
floriculturas-intermediárias que hoje aparecem primeiro para "floricultura
Pinhais" sem terem operação local nem entrega própria.

## Analytics (opcional)

O site já vem com um aviso de cookies (LGPD) e um scaffold do Google
Analytics 4 prontos, mas desativados até você configurar:

1. Crie uma propriedade GA4 em [analytics.google.com](https://analytics.google.com)
   e copie o Measurement ID (formato `G-XXXXXXXXXX`).
2. Substitua o valor de `GA_MEASUREMENT_ID` no topo de
   `assets/js/script.js` pelo ID real.
3. O script só carrega depois que o visitante aceita o aviso de cookies
   (botão "Entendi" no rodapé da página).

## Painel de edição para o dono/a (/admin)

O site usa [Decap CMS](https://decapcms.org) para que quem administra a
floricultura consiga editar o catálogo (nome, descrição, preço, foto) sem
mexer em código — tudo pelo navegador, em `seusite.com/admin`. Cada edição
salva vira um commit automático neste repositório.

**Isso só funciona depois de publicar no Netlify** (o `netlify.toml` já
deixa o resto pronto). Ative uma única vez:

1. No painel do site no Netlify, vá em **Site configuration → Identity**
   e clique em **Enable Identity**.
2. Em **Identity → Registration**, deixe como **Invite only** (assim só
   quem for convidado consegue entrar no `/admin`).
3. Em **Identity → Services → Git Gateway**, clique em **Enable Git
   Gateway** (é isso que permite o painel salvar as edições como commits).
4. Em **Identity → Invite users**, convide o e-mail do dono/a da
   floricultura. Ele(a) vai receber um e-mail para definir uma senha e cair
   direto no painel.
5. Depois disso, é só acessar `seusite.com/admin`, logar, e editar os
   produtos do catálogo (inclusive trocar as fotos placeholder por fotos
   reais direto pelo painel, sem precisar de ninguém mexer no código).

Se quiser ampliar o que é editável pelo painel (por exemplo, horário de
funcionamento, depoimentos ou o texto "Sobre nós"), é só adicionar os campos
correspondentes em `admin/config.yml` e ligar esses campos no
`assets/js/script.js` — hoje só o catálogo está conectado ao painel, o
resto do texto do site continua fixo no `index.html`.

## Passos operacionais (fora do código)

Coisas que ajudam bastante e não dependem de código, só de configuração:

- **Google Business Profile**: reivindique/edite a ficha da floricultura em
  [business.google.com](https://business.google.com) — é o que aparece no
  Google Maps e em buscas como "floricultura perto de mim". Vale linkar o
  site assim que tiver o domínio definitivo.
- **Catálogo do WhatsApp Business**: no app do WhatsApp Business, cadastre
  os produtos (Buquês, Cestas, Arranjos, Ocasiões especiais) com foto e
  preço em Ferramentas Comerciais > Catálogo — complementa a página e
  facilita o pedido dentro da própria conversa.
- **Domínio e hospedagem**: registrar `floreculturapinhais.com.br` (ou
  similar) e publicar em algum host estático (ver seção "Publicar" acima).
  O `netlify.toml` incluso já deixa o deploy no Netlify praticamente
  zero-config.
- **Área e custo de entrega, e-mail de contato e o e-mail do dono/a para o
  painel /admin**: confirme esses detalhes antes de publicar (não estavam
  disponíveis no briefing).
