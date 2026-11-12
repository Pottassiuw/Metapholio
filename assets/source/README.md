# Fontes dos assets — Metapholio

## Retrato estilizado (seção Sobre)

`thiago-hero.jpg` é a segunda foto fornecida por Thiago Nascimento na conversa do projeto. Foi feita para a hero, mas a pedido dele o rosto saiu da hero e o retrato estilizado passou a abrir a seção Sobre. É uma foto lateral real, diferente de `public/images/thiago-nascimento-perfil.webp`, a foto frontal que também está em Sobre.

A fonte foi normalizada em orientação e teve os metadados de captura removidos. O comentário JPEG registra a procedência, não dados da câmera. Não foi usado modelo generativo.

## Reprodução do tratamento

Dependências apenas para autoria dos assets, não para servir ou compilar o site Astro:

```sh
python3 -m venv /tmp/metapholio-art
/tmp/metapholio-art/bin/pip install Pillow numpy
/tmp/metapholio-art/bin/python scripts/create-hero-art.py
```

Execute a partir da raiz do projeto. O script exporta `public/images/thiago-hero-art.webp` (1318×1318, RGBA) e provas de recorte claro/escuro em `.impeccable/review/`.

- Fundo removido pela conectividade de pixels claros e neutros com as bordas, preservando brilhos internos dos óculos/olhos.
- Máscara raster antialiasada seguindo cabelo, rosto e roupa — não um polígono aproximado.
- Mapeamento tonal para tinta, turquesa e papel, quantização moderada e retícula nos meios-tons.
- Contorno de papel e registro rosa derivados da mesma máscara real.
- Feições e proporções da foto preservadas, sem gerar outra pose ou partes do corpo. Em Sobre o retrato aparece de pé, sem rotação.
- A arte não recebe eventos de ponteiro.

Procedência do WebP: `public/images/thiago-hero-art.webp.json`. Manter o sidecar junto do asset. A implementação Astro referencia o WebP diretamente pela pasta pública, sem depender dos protótipos locais.

## Gravura do menu

A arte do menu é um recorte do anjo de *Melencolia I* (Albrecht Dürer, 1514), do original em alta resolução do Metropolitan Museum of Art (objeto 336228, Open Access, domínio público). `sh scripts/create-engraving-art.sh` baixa o original para `met/DP820348.jpg` (ignorado pelo Git, 4,4 MB) e gera `public/images/melencolia-anjo.avif` e `.webp`: recorte dentro da chapa, tons de cinza e níveis abertos, porque o CSS multiplica a gravura sobre o turquesa. Requer ImageMagick 7 com suporte a AVIF.
