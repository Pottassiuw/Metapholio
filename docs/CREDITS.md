# Créditos e procedência

## Retratos

Fotografias e pinturas fornecidas por Thiago Nascimento para seu portfólio. A Sobre usa as três pinturas em que ele aparece como personagem (`public/images/thiago/pintura-*`); as duas fotos profissionais aparecem no Contato. O retrato estilizado `public/images/thiago-hero-art.webp` (de `assets/source/thiago-hero.jpg`) e a foto `public/images/thiago-nascimento-perfil.webp` ficam no repositório, mas não são mais exibidos. A pedido dele, o rosto não aparece na hero.

O tratamento do retrato estilizado é determinístico e reproduzível com `scripts/create-hero-art.py`: máscara derivada dos pixels do fundo, tonalização, retícula e registro rosa. Nenhum modelo generativo foi usado para criar feições ou partes do corpo. A procedência está nos sidecars JSON e no comentário da fonte JPEG.

A disponibilização no repositório não autoriza reutilizar as fotografias para outros fins.

## Gravura da home

Albrecht Dürer, *Melencolia I* (1514), The Metropolitan Museum of Art, objeto 336228. Imagem de domínio público / Open Access. Um recorte da figura alada é a arte principal do menu; não representa Thiago Nascimento.

- Objeto: https://www.metmuseum.org/art/collection/search/336228
- Fonte: https://images.metmuseum.org/CRDImages/dp/original/DP820348.jpg
- Assets: `public/images/melencolia-anjo.avif` e `.webp` (recorte em tons de cinza), gerados por `scripts/create-engraving-art.sh`; procedência detalhada nos sidecars.

## Acervo das salas (domínio público)

- Giovanni Battista Piranesi, *The Drawbridge*, Carceri d'invenzione, c. 1749–50 — The Met, objeto 337060, Open Access.
- Katsushika Hokusai, *Under the Wave off Kanagawa (A grande onda)*, c. 1830–32 — The Met, objeto 45434, Open Access.
- Ernst Haeckel, *Discomedusae*, Kunstformen der Natur, prancha 8, 1904 — Wikimedia Commons, domínio público.
- Andreas Cellarius, *Planisphaerium Copernicanum*, Harmonia Macrocosmica, 1660 — Wikimedia Commons, domínio público.
- Gustave Doré, *O albatroz*, The Rime of the Ancient Mariner, 1876 — Wikimedia Commons, domínio público.

Assets em `public/images/museu/`, gerados por `scripts/create-museum-art.sh` (recorte, redimensionamento, tons de cinza nas gravuras); procedência em cada sidecar.

## Pinturas e fotos de Thiago

As pinturas em que Thiago aparece como personagem (usadas inteiras na Sobre e em recortes nas salas) e as duas fotos profissionais foram fornecidas por ele. Os recortes usados nas salas ficam em `public/images/thiago/`, gerados pelo mesmo script, só com recorte e redimensionamento. Os arquivos-fonte ficam com o autor e não são versionados.

## Logotipos das tecnologias

Glifos do [Simple Icons](https://simpleicons.org) (pacote `simple-icons`, licença CC0), em uma cor. As marcas pertencem aos seus titulares. Tecnologias sem logotipo no Simple Icons, ou cujo logotipo foi retirado a pedido do titular (Power BI, Excel), aparecem como selo com o monograma, sem logotipo inventado.

## Tipografia

- **Bodoni Moda 900**, distribuída pelo Google Fonts sob SIL Open Font License.
- **Barlow Condensed 500**, distribuída pelo Google Fonts sob SIL Open Font License.

As fontes são servidas localmente. As licenças completas acompanham a distribuição em `public/fonts/bodoni-LICENSE.txt` e `public/fonts/barlow-LICENSE.txt`.

## Referência e música

*Metaphor: ReFantazio* é uma referência visual do menu; marcas e direitos pertencem aos respectivos titulares. O portfólio não é produto oficial nem afiliado à Atlus/Sega. Nenhuma imagem do jogo é incluída no site.

A trilha é **Call of Magic**, de *Metaphor: ReFantazio* (ATLUS), em `public/audio/call-of-magic.mp3`. A faixa é protegida por direitos autorais e não é licenciada para este site: foi incluída por decisão de Thiago e será removida se o titular pedir. Toca só depois que o visitante clica em "Ouvir trilha".

## Código

A autoria de desenvolvimento do portfólio é de Thiago Nascimento, com assistência de ferramentas de IA. Não foi escolhida uma licença open-source para o código neste momento. Dependências mantêm suas próprias licenças; esta nota não altera licenças de terceiros.
