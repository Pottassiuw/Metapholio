# Créditos e procedência

## Retratos

Fotografias fornecidas por Thiago Nascimento para seu portfólio. A imagem de apresentação está em `public/images/thiago-nascimento-perfil.webp`. A hero usa `public/images/thiago-hero-art.webp`, derivada de `assets/source/thiago-hero.jpg`.

O tratamento é determinístico e reproduzível com `scripts/create-hero-art.py`: máscara derivada dos pixels do fundo, tonalização, retícula e registro rosa. A composição reclinada resulta de rotação CSS. Nenhum modelo generativo foi usado para criar feições ou partes do corpo. A procedência está nos sidecars JSON e no comentário da fonte JPEG.

A disponibilização no repositório não autoriza reutilizar as fotografias para outros fins.

## Gravura

Albrecht Dürer, *Melencolia I* (1514), The Metropolitan Museum of Art, objeto 336228. Imagem de domínio público / Open Access, utilizada como textura decorativa secundária.

- Objeto: https://www.metmuseum.org/art/collection/search/336228
- Fonte: https://images.metmuseum.org/CRDImages/dp/original/DP820348.jpg
- Asset: `public/images/melencolia.webp`; procedência detalhada no sidecar.

## Tipografia

- **Bodoni Moda 900**, distribuída pelo Google Fonts sob SIL Open Font License.
- **Barlow Condensed 500**, distribuída pelo Google Fonts sob SIL Open Font License.

As fontes são servidas localmente. As licenças completas acompanham a distribuição em `public/fonts/bodoni-LICENSE.txt` e `public/fonts/barlow-LICENSE.txt`.

## Referência e música

*Metaphor: ReFantazio* é uma referência visual do menu; marcas e direitos pertencem aos respectivos titulares. O portfólio não é produto oficial nem afiliado à Atlus/Sega. Nenhuma imagem do jogo é incluída no site.

`src/data/soundtrack.json` registra links e metadados da seleção musical. Não contém áudio. Reprodução ainda não implementada; qualquer integração futura precisa respeitar as condições do provedor, consentimento do visitante e player nativo visível.

## Código

A autoria de desenvolvimento do portfólio é de Thiago Nascimento, com assistência de ferramentas de IA. Não foi escolhida uma licença open-source para o código neste momento. Dependências mantêm suas próprias licenças; esta nota não altera licenças de terceiros.
