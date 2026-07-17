# Confeitaria Bom Gosto — Site

Landing page em português (pt-BR) para a Confeitaria Bom Gosto, em Weissópolis,
Pinhais - PR. HTML/CSS/JS estático, sem build, mobile-first.

## Estrutura

```
index.html              Página única (hero, sobre nós, cardápio, encomendas,
                         localização, contato)
assets/css/style.css     Estilos (paleta terracota/pastel, responsivo)
assets/js/script.js      Interações + carrega o cardápio de content/products.json
assets/img/               Ícones SVG das categorias, favicon e logo
assets/img/uploads/        Fotos enviadas pelo painel /admin
content/products.json    Cardápio (nome, descrição, preço, foto) — editável
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
- **Preços e fotos do cardápio**: os valores "A partir de R$..." são
  **ilustrativos** (placeholder). Podem ser atualizados direto pelo painel
  `/admin` (veja seção abaixo) ou editando `content/products.json`.

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

## Painel de edição para o dono/a (/admin)

O site usa [Decap CMS](https://decapcms.org) para que quem administra a
confeitaria consiga editar o cardápio (nome, descrição, preço, foto) sem
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
   confeitaria. Ele(a) vai receber um e-mail para definir uma senha e cair
   direto no painel.
5. Depois disso, é só acessar `seusite.com/admin`, logar, e editar os
   produtos do cardápio (inclusive trocar as fotos placeholder por fotos
   reais direto pelo painel, sem precisar de ninguém mexer no código).

Se quiser ampliar o que é editável pelo painel (por exemplo, horário de
funcionamento ou o texto "Sobre nós"), é só adicionar os campos
correspondentes em `admin/config.yml` e ligar esses campos no
`assets/js/script.js` — hoje só o cardápio está conectado ao painel, o
resto do texto do site continua fixo no `index.html`.

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
