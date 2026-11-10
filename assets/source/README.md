# Retrato da hero — Metapholio

`thiago-hero.jpg` é a segunda foto fornecida por Thiago Nascimento na conversa do projeto, destinada à hero. É uma foto lateral real, diferente de `public/images/thiago-nascimento-perfil.webp`, reservada para Sobre.

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
- Feições e proporções da foto preservadas. A composição reclinada é rotação CSS de −52°, sem gerar outra pose ou partes do corpo.
- Enquadramento e campo turquesa de leitura adaptados ao celular; a arte não recebe eventos de ponteiro.

Procedência do WebP: `public/images/thiago-hero-art.webp.json`. Manter o sidecar junto do asset. A implementação Astro referencia o WebP diretamente pela pasta pública, sem depender dos protótipos locais.
