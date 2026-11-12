#!/bin/sh
# Recorta o anjo de Melencolia I (Dürer, 1514) do original do Met para a arte principal do menu.
# Fonte: https://images.metmuseum.org/CRDImages/dp/original/DP820348.jpg (Open Access, domínio público).
# Requer ImageMagick 7 com suporte a AVIF. Execute a partir da raiz do projeto.
set -eu

src=assets/source/met/DP820348.jpg
out=public/images

if [ ! -f "$src" ]; then
  mkdir -p "$(dirname "$src")"
  curl -fsSL https://images.metmuseum.org/CRDImages/dp/original/DP820348.jpg -o "$src"
fi

# Recorte dentro da chapa (sem a margem branca), do pêndulo da balança ao vestido.
# Tons em cinza com níveis abertos: o CSS multiplica a gravura sobre o turquesa.
magick "$src" -crop 1460x2169+1215+260 +repage -colorspace Gray -level 12%,88%,1.05 -resize 1200x \
  -quality 45 "$out/melencolia-anjo.avif"
magick "$src" -crop 1460x2169+1215+260 +repage -colorspace Gray -level 12%,88%,1.05 -resize 1200x \
  -posterize 6 -define webp:lossless=true -define webp:method=6 "$out/melencolia-anjo.webp"

# Fragmentos por seção (como as partes do corpo nos submenus de Metaphor): um objeto da gravura por seção.
# nome largura x altura + x + y (pixels do original 2820x3561)
frag(){
  magick "$src" -crop "$2" +repage -colorspace Gray -level 12%,88%,1.05 -resize "900x900>" -quality 50 "$out/frag-$1.avif"
  magick "$src" -crop "$2" +repage -colorspace Gray -level 12%,88%,1.05 -resize "900x900>" -posterize 6 -define webp:lossless=true -define webp:method=6 "$out/frag-$1.webp"
}
frag poliedro  1171x1192+173+802   # Projetos: o sólido da construção
frag ampulheta 281x498+1724+249    # Experiência: tempo e trajetória
frag balanca   460x800+1280+300    # Laboratório: medir e testar
frag quadrado  422x422+2103+509    # Formação: o quadrado mágico
frag sino      433x470+2071+97     # Contato: o chamado

# Mancha de tinta para o fundo das cenas (o "chão pintado" dos submenus de Metaphor): a hachura do manto,
# ampliada e desfocada até virar mancha. Clara sobre escuro; o CSS a usa com mix-blend-mode.
magick "$src" -crop 700x500+1500+2400 +repage -colorspace Gray -resize 1600x1000! -blur 0x9 -level 30%,62% \
  -morphology Open Disk:3 -negate -quality 40 src/assets/textures/mancha.avif
magick "$src" -crop 700x500+1500+2400 +repage -colorspace Gray -resize 1600x1000! -blur 0x9 -level 30%,62% \
  -morphology Open Disk:3 -negate -quality 55 src/assets/textures/mancha.webp
