# JPG Informática — Site

Landing page em português (pt-BR) para a JPG Informática, loja de informática e
eletrônicos em Pinhais - PR. HTML/CSS/JS estático, sem build, mobile-first.

## Estrutura

```
index.html                 Página única (hero, sobre nós, produtos, serviços,
                            depoimentos, localização, contato)
assets/css/style.css       Estilos (paleta azul-marinho/cinza com acento
                            laranja, responsivo)
assets/js/script.js        Interações + carrega categorias e depoimentos dos
                            arquivos JSON em content/
assets/img/                Ícones SVG das categorias, logo e ícone do WhatsApp
assets/img/uploads/        Imagens enviadas pelo painel /admin
content/products.json      Categorias de produtos (nome, descrição, itens em
                            destaque, ícone) — editável via /admin ou direto
                            no arquivo
content/testimonials.json  Depoimentos de clientes — editável via /admin ou
                            direto no arquivo
admin/                     Painel de edição (Decap CMS)
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

## O que confirmar/personalizar antes de publicar

- **Número do WhatsApp**: o site usa `https://wa.me/5541996156001` (o número
  de celular informado) em todos os botões (header, hero, cards de produto,
  botão flutuante e rodapé). Confirme com o cliente qual dos três números é
  o usado para o WhatsApp Business e, se for outro, atualize todas as
  ocorrências — busque por `5541996156001` em `index.html` e
  `assets/js/script.js`.
- **Depoimentos reais**: hoje `content/testimonials.json` tem 3 textos de
  placeholder pedindo para serem substituídos. Troque por depoimentos reais
  copiados das avaliações do Google (com autorização do cliente que avaliou)
  — pelo painel `/admin` ou direto no arquivo.
- **Fotos reais da loja e dos produtos**: hoje as categorias usam ícones SVG
  de placeholder. Adicione fotos reais da fachada, do interior e de produtos
  em destaque em `assets/img/` e atualize as tags `<img>` correspondentes
  para melhorar a conversão.
- **Serviços oferecidos**: a seção "Serviços" lista montagem, manutenção,
  instalação de periféricos e assistência técnica como um ponto de partida
  comum para lojas do ramo — confirme com o cliente quais serviços
  realmente são oferecidos e ajuste/remova cards em `index.html` (seção
  `#servicos`).
- **Categorias e itens de produto**: os itens em destaque de cada categoria
  em `content/products.json` são exemplos — ajuste para refletir o estoque
  real da loja.
- **Anos de trajetória**: o texto da seção "Sobre nós" evita citar um número
  específico de anos. Se o cliente quiser destacar isso, adicione a
  informação em `index.html` (seção `#sobre`).
- **Domínio**: as tags `canonical` e Open Graph em `index.html`, além de
  `robots.txt` e `sitemap.xml`, usam `https://jpginformatica.com.br/` como
  placeholder — atualize para o domínio real depois da compra/configuração.

## SEO local

A página inclui dados estruturados (`schema.org/ElectronicsStore`) com
endereço, coordenadas, horário de funcionamento e avaliação agregada (4,8★
com 181 avaliações), além de meta tags Open Graph e palavras-chave locais
("informática Pinhais", "peças de computador", etc.) para ajudar no
posicionamento em buscas e no Google Maps.

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
loja consiga editar as categorias de produtos e os depoimentos sem mexer em
código — tudo pelo navegador, em `seusite.com/admin`. Cada edição salva vira
um commit automático neste repositório.

**Isso só funciona depois de publicar no Netlify** (o `netlify.toml` já
deixa o resto pronto). Ative uma única vez:

1. No painel do site no Netlify, vá em **Site configuration → Identity**
   e clique em **Enable Identity**.
2. Em **Identity → Registration**, deixe como **Invite only** (assim só
   quem for convidado consegue entrar no `/admin`).
3. Em **Identity → Services → Git Gateway**, clique em **Enable Git
   Gateway** (é isso que permite o painel salvar as edições como commits).
4. Em **Identity → Invite users**, convide o e-mail do dono/a da loja.
   Ele(a) vai receber um e-mail para definir uma senha e cair direto no
   painel.
5. Depois disso, é só acessar `seusite.com/admin`, logar, e editar as
   categorias de produtos e os depoimentos (inclusive enviar fotos reais
   pelo painel, sem precisar de ninguém mexer no código).

Se quiser ampliar o que é editável pelo painel (por exemplo, horário de
funcionamento, serviços ou o texto "Sobre nós"), é só adicionar os campos
correspondentes em `admin/config.yml` e ligar esses campos no
`assets/js/script.js` — hoje só produtos e depoimentos estão conectados ao
painel, o resto do texto do site continua fixo no `index.html`.

## Passos operacionais (fora do código)

Coisas que ajudam bastante e não dependem de código, só de configuração:

- **Google Business Profile**: reivindique/edite a ficha da loja em
  [business.google.com](https://business.google.com) — é o que aparece no
  Google Maps e em buscas como "informática perto de mim". Vale linkar o
  site assim que tiver o domínio definitivo.
- **Catálogo do WhatsApp Business**: no app do WhatsApp Business, cadastre
  os produtos e categorias (notebooks, periféricos, peças, acessórios,
  eletrônicos) com foto e preço em Ferramentas Comerciais > Catálogo —
  complementa a página e facilita o pedido dentro da própria conversa.
- **Domínio e hospedagem**: registrar `jpginformatica.com.br` (ou similar) e
  publicar em algum host estático (ver seção "Publicar" acima). O
  `netlify.toml` incluso já deixa o deploy no Netlify praticamente
  zero-config.
