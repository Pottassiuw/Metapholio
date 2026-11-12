#!/bin/sh
# Acervo das salas (domínio público) e recortes das pinturas de Thiago para as cenas de seção.
# Originais em assets/source/museum/ (baixados abaixo) e assets/source/thiago/ (fornecidos pelo autor).
# Requer ImageMagick 7 com AVIF. Execute a partir da raiz do projeto.
set -eu

src=assets/source/museum
out=public/images/museu
mkdir -p "$src" "$out" public/images/thiago

get(){ [ -f "$src/$1" ] || curl -fsSL -A "MetapholioPortfolio/1.0" "$2" -o "$src/$1"; }
get piranesi-drawbridge.jpg https://images.metmuseum.org/CRDImages/dp/original/DP828200.jpg
get hokusai-great-wave.jpg https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg
get haeckel-discomedusae-8.jpg https://upload.wikimedia.org/wikipedia/commons/d/de/Haeckel_Discomedusae_8.jpg
get cellarius-copernicanum.jpg https://upload.wikimedia.org/wikipedia/commons/0/0b/Cellarius_Harmonia_Macrocosmica_-_Planisphaerium_Copernicanum.jpg
get dore-albatross.jpg https://upload.wikimedia.org/wikipedia/commons/2/26/Rime_of_the_Ancient_Mariner-Albatross-Dore.jpg

# nome  arquivo-fonte  recorte (vazio = inteiro)  largura  ajuste
web(){
  set -- "$@"
  name=$1 file=$2 crop=$3 width=$4; shift 4
  if [ -n "$crop" ]; then c="-crop $crop +repage"; else c=""; fi
  # shellcheck disable=SC2086
  magick "$file" $c "$@" -resize "${width}x>" -strip -quality 50 "$out/$name.avif"
  # shellcheck disable=SC2086
  magick "$file" $c "$@" -resize "${width}x>" -strip -quality 74 -define webp:method=6 "$out/$name.webp"
}
# Gravuras viram cinza com papel aberto (o CSS multiplica sobre a cor da sala); as obras coloridas ficam em cor.
web projetos     "$src/piranesi-drawbridge.jpg"     "2600x3500+130+130" 1100 -colorspace Gray -level 8%,92% -posterize 8
web experiencia  "$src/hokusai-great-wave.jpg"      "3700x2480+80+60"   2000
web laboratorio  "$src/haeckel-discomedusae-8.jpg"  "2120x3060+90+120"  1050
web formacao     "$src/cellarius-copernicanum.jpg"  ""                  1800
# Doré "gelo e tinta": gravura invertida e mapeada de tinta (#0a0d10) a gelo (#d6eef2), no próprio raster.
ice=$(mktemp -d)
magick -size 1x256 gradient:'#0a0d10-#d6eef2' "$ice/clut.png"
web contato      "$src/dore-albatross.jpg"          "2250x3000+75+60"   1400 -colorspace Gray -negate -level 6%,92%,1.15 "$ice/clut.png" -clut
rm -rf "$ice"

# Recortes de Thiago (pinturas 1672x941 e fotos 1254x1254).
t=assets/source/thiago
cut(){
  magick "$t/$2" -crop "$3" +repage -resize "${4}x>" -strip -quality 55 "public/images/thiago/$1.avif"
  magick "$t/$2" -crop "$3" +repage -resize "${4}x>" -strip -quality 78 -define webp:method=6 "public/images/thiago/$1.webp"
}
cut cidade        pintura-cidade.png      760x620+120+20   1100   # Projetos
cut viajante      pintura-cidade.png      430x400+560+541  860    # Experiência
cut mao           pintura-biblioteca.png  360x340+880+70   720    # Laboratório
cut esfera        pintura-biblioteca.png  640x500+0+441    1100   # Formação
cut olhar         pintura-perfil.png      520x380+930+110  1000   # Contato
cut foto-frontal  foto-frontal.jpg        1254x1254+0+0    900    # Contato, retrato oficial
cut foto-perfil   foto-perfil.png         1254x1254+0+0    900    # Contato, retrato oficial

# Disco do planisfério de Cellarius, recortado em quadrado para girar sozinho na sala de Formação
# (centro em 50% x 50,6% da prancha 2886x2490, diâmetro 72% da largura).
magick "$src/cellarius-copernicanum.jpg" -crop 2078x2078+404+221 +repage -resize 1100x -strip -quality 50 "$out/formacao-disco.avif"
magick "$src/cellarius-copernicanum.jpg" -crop 2078x2078+404+221 +repage -resize 1100x -strip -quality 74 -define webp:method=6 "$out/formacao-disco.webp"

# Pinturas inteiras (Thiago como personagem) para a cena da Sobre, em tela cheia.
for n in perfil cidade biblioteca; do
  magick "$t/pintura-$n.png" -strip -quality 52 "public/images/thiago/pintura-$n.avif"
  magick "$t/pintura-$n.png" -strip -quality 76 -define webp:method=6 "public/images/thiago/pintura-$n.webp"
done
