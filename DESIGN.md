---
name: Metapholio
description: Portfólio de Thiago Nascimento com linguagem de menu editorial inspirada em Metaphor.
colors:
  primary: "#73c9c5"
  ink: "#101c20"
  selection: "#ff3461"
  paper: "#f4f3e9"
  accent-projetos: "#f26b1d"
  accent-experiencia: "#e0b400"
  accent-laboratorio: "#2fb36b"
  accent-formacao: "#d24fdb"
  accent-contato: "#d7262f"
  secondary-text: "#465a57"
typography:
  display:
    fontFamily: "Bodoni, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Barlow, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.55
rounded:
  square: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "38px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "12px 15px"
  button-primary-hover:
    backgroundColor: "{colors.selection}"
    textColor: "{colors.ink}"
  reading-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
---

## Overview

**Creative North Star: "Uma trajetória que se explora."**

O visitante escolhe sua próxima seção como em um menu de RPG. A direção foi fixada pelo usuário em Metaphor: ReFantazio; não reinterpretar o portfólio como uma landing page genérica.

**Key Characteristics:**
- Tipografia serifada monumental e navegação inclinada.
- Gravura de Dürer (anjo de *Melencolia I*) como arte de personagem do menu, multiplicada sobre o turquesa.
- O site é um museu: cada seção é uma sala com um mestre de domínio público (Piranesi, Hokusai, Haeckel, Cellarius, Doré) e um recorte de Thiago pintado como personagem.
- Retratos reais somente na seção Sobre, numa cena em tela cheia com frases em carrossel; o rosto de Thiago não aparece na hero, a pedido dele.
- Turquesa contínuo, seleção rosa e folhas de leitura em papel.
- Conteúdo factual com autoria; o que ainda não foi documentado fica fora do site, sem etiquetas de pendência.

## Colors

Turquesa é o campo de navegação. Tinta serve ao texto e às superfícies escuras. Cada seção tem a sua cor, como os submenus de Metaphor: Sobre e o menu em rosa, Projetos laranja, Experiência mostarda, Laboratório verde, Formação magenta, Contato vermelho. A cor da seção (`--accent`, com `--on-accent` para o texto sobre ela) aparece só como pincelada, mancha de fundo, numeral e etiqueta: nunca como cor de texto pequeno sobre tinta. Papel sustenta a leitura longa. O texto secundário no papel mantém contraste por um tom de tinta esverdeado.

**The Legible Ground Rule.** A gravura cede contraste ao menu: o véu turquesa cobre a coluna do menu e some depois dela, deixando o rosto do anjo legível entre o menu e o monograma. Não colocar texto escuro diretamente sobre regiões escuras da gravura ou do retrato.

## Typography

Bodoni Moda 900, servida localmente sob o nome Bodoni, conduz menu e títulos. Barlow Condensed 500, servida como Barlow, conduz textos e comandos. Arquivos e licenças locais; nenhuma dependência de Google Fonts em runtime.

O menu da hero é deliberadamente maior que a escala de leitura. Títulos internos são fluidos; textos de corpo usam linhas espaçosas e medida controlada. Evitar caixa alta nos parágrafos. Usar caixa alta apenas em navegação e comandos curtos.

## Layout

A hero mantém menu diagonal à esquerda e a gravura à direita, com o rosto do anjo na altura do menu. Páginas internas não usam folha de leitura: são cenas. O menu fica fixo em escala menor sobre o turquesa à esquerda; uma diagonal abre para a tinta pintada à direita, onde vivem o título gigante, o fragmento de Dürer e o conteúdo. A Sobre é a cena dos retratos. O documento, não um painel aninhado, rola conteúdos longos.

No celular, identidade, navegação e folha seguem o fluxo vertical. A hero e o menu mantêm a personalidade; os artigos ficam retos. As rotas são estáticas e funcionam sem JavaScript. Setas ajudam a mover o foco; Enter usa os links nativos e Escape retorna ao menu.

Com JavaScript, o `ClientRouter` do Astro troca só o palco (`#menu`), nunca o `<body>` inteiro: é isso que mantém a trilha tocando entre telas. Ao sair de uma tela, as letras do título e do menu se desmontam e uma faixa de papel cruza a tela (≈0,3 s, em paralelo ao carregamento); a cena seguinte monta as letras do título, pinta a arte (desfoque → nítido) e repinta as linhas da lista em sequência. Com movimento reduzido, nada disso roda. A cena fica sob o menu, o cabeçalho e o rodapé fixos (z-index), para que continuem clicáveis.

## Elevation & Depth

A folha editorial tem sombra suave e deslocada, sem duplicar uma borda de contorno. A seleção rosa é plana. A faixa superior de uma folha é um sinal de abertura, não um contorno de cartão.

O retrato preserva feições e proporções. O tratamento de retícula, papel e registro rosa vem do asset raster, não de filtros que inventem uma ilustração. A gravura é um recorte em tons de cinza do original do Met, sem retoque.

## Shapes

Cantos retos. Recortes diagonais pertencem ao fundo e à faixa de seleção; nunca aproximam contornos humanos. A máscara do retrato é derivada de pixels reais. Diagramas editoriais descrevem conceitos e são explicitamente rotulados; não fingem ser screenshots.

## Components

### Navigation

Seis entradas reais: Sobre, Projetos, Experiência, Laboratório, Formação e Contato. Como em Metaphor, a inicial de cada comando é maior e afunda na linha (SOBRE com o S grande). A seleção é uma pincelada na cor da seção (máscaras SVG em `src/assets/brush/`, geradas por `scripts/create-brushes.py`), repintada da esquerda para a direita. No hover e no foco (não só no clique), como no vídeo do menu de Metaphor: uma mancha grande da cor da seção é repintada atrás da linha selecionada, as letras da palavra pulam e uma legenda preta curta aparece ao lado ("missões acadêmicas"). Nas páginas internas, passar pelo menu repinta a inundação lateral inteira na cor do item e, ao sair do menu, ela volta à cor da página. Na hero, um dial com o numeral gigante do item selecionado, cortado pela borda direita, gira a cada troca, com o anel na cor da seção. A cada seleção, gotas e riscos de tinta (cor da seção e tinta) saltam da ponta da pincelada, voam ao longo do traço e caem; desligado com movimento reduzido. Hover e foco podem atualizar a prévia da hero, nunca abrir projetos nem iniciar áudio.

### About scene (Sobre)

A Sobre é uma cena em tela cheia com as três pinturas de Thiago como personagem (perfil olhando para o alto, biblioteca com o gato e a esfera, a cidade dentro da silhueta), uma por slide, em tela cheia; a cunha rosa da seção inunda o canto do menu por cima. Frases em Bodoni em faixas inclinadas (tinta, papel, rosa) nas áreas sem rosto: à direita da cunha no perfil, embaixo à direita na biblioteca e na cidade. Fatos vão na nota; a biblioteca ("como as partes se conectam") leva a constelação de competências, uma linha por grupo; o último slide leva aos projetos.

- **Movimento:** a pintura nova é pintada por uma pincelada que se abre, uma placa branca varre em diagonal (como no menu de Metaphor), as faixas abrem em sequência e a pintura ativa respira (zoom lento de 1,08 para 1). A frase do slide que sai some na hora. Barra rosa = cronômetro de 7 s.
- **Controle:** anterior, pausar/retomar, próximo e setas ← →; segura com o ponteiro na frase/controles e com o foco; slides ocultos `inert`; movimento reduzido começa pausado; sem JavaScript os slides se empilham.
- **Celular:** a pintura ocupa a parte de cima e funde em tinta; a frase fica abaixo, nunca sobre o rosto.

### Tech marks (tecnologias)

Logotipos de tecnologia em uma cor (Simple Icons, CC0), papel sobre tinta, com o nome em Barlow; no hover giram de leve e ganham a cor da seção. Tecnologia sem logotipo vira um selo circular com o monograma. Três usos: nas placas de Projetos, só os glifos das cinco principais; no capítulo "O arsenal" de cada história, glifos grandes com o nome; na Sobre, no slide da biblioteca, a constelação de competências põe cada grupo numa linha, com logotipo e nome (só logotipos abaixo de 1500px). Nunca níveis, barras ou porcentagens.

### Soundtrack (Trilha)

Botão em paralelogramo de tinta com equalizador desenhado ("Ouvir trilha", "Pausar trilha", "Retomar trilha"). Nada é baixado antes do clique. Ao tocar, aparece ao lado um mixer de tinta: ícone de volume, controle deslizante (trilha rosa, polegar em paralelogramo de papel) e o nome da faixa em Bodoni. Volume inicial 20%, escolha salva no navegador; liga e pausa com fade. O `<audio>` fica fora do palco trocado pelo ClientRouter, então a música não para entre páginas. Na hero, no alto à direita; nas internas, embaixo à esquerda; no celular, no canto inferior direito.

### Project story (capítulos)

A página de projeto conta a história em cinco capítulos (I O ponto de partida, II A resposta, III Minha parte, IV O arsenal, V Onde encontrar), um por vez sobre a obra da sala. Trocar de capítulo não rola a página: a câmera atravessa a obra (zoom e deslocamento por capítulo), o numeral romano gigante gira no canto, uma placa branca corta a cena e o capítulo abre em faixas. O sumário à esquerda usa a pincelada que ferve no capítulo atual; setas ← → e os botões também avançam, e o endereço guarda o capítulo (#arsenal). O capítulo V leva à próxima história da mesma sala. Sem JavaScript, os capítulos aparecem em sequência e o sumário vira âncoras.

### Museum rooms (seções)

Cada seção é uma sala de museu: um mestre de domínio público, um recorte de Thiago pintado como personagem e o conteúdo dentro da metáfora da obra. Projetos = Piranesi, *Carceri* (papel creme, gravura em multiply; os projetos são placas penduradas por correntes na ponte); Experiência = Hokusai, *A grande onda* (os estágios são nós hexagonais nas cristas, o Fuji é o "próximo"); Laboratório = Haeckel, *Discomedusae* (prancha emoldurada sobre tinta funda; experimentos como "Fig. n"); Formação = Cellarius, *Planisphaerium* (o disco gira devagar; o curso atual é o Sol; formação, certificações e idiomas em três órbitas); Contato = Doré, *O albatroz* (gravura invertida, gelo sobre tinta; canais como mensagens em escada; retrato oficial com as duas fotos profissionais).

A cor da seção inunda o canto do menu e se dissolve na sala num degradê, como o véu turquesa da hero sobre o Dürer (no celular, o bloco do menu funde no chão da sala); sem cauda de pincelada sólida na borda; o item atual do menu vira pincelada tinta com texto papel. Título gigante cortado pela borda. Etiqueta de museu em papel (artista, obra, origem, ano, acervo). Arte e personagem entram pintados (máscara de pincelada que se abre e desfoque que assenta); placas balançam nas correntes; nós da onda surgem em sequência. Texto sobre a arte sempre com fundo de tinta. No celular, a sala vira sequência sobre o seu próprio chão: o bloco do menu na cor da seção, depois título, personagem, frase, obra com a etiqueta de museu logo abaixo, e o conteúdo. A etiqueta sempre acompanha a obra-mestra, nunca a pintura de Thiago. Sem rótulo-pergunta acima da frase: a frase em Bodoni abre a sala. Acervo e recortes gerados por `scripts/create-museum-art.sh`, com procedência nos sidecars.

### Project detail (substituído)

As páginas de projeto usam o mesmo chão de cena e o título em uma linha cortado pela borda; a lista de leituras (problema, solução, contribuição, tecnologias, competências, fontes) faz o papel da lista de equipamentos, com a leitura ativa marcada pela pincelada. Helios mostra só um esquema editorial rotulado. Sem estrelas ou porcentagens de habilidade inventadas.

### Buttons and links

Comandos de fundo tinta e texto papel; hover rosa com texto tinta. Foco visível, claro no fundo escuro e tinta sobre papel. SVGs pequenos em traço consistente para setas e ícones.

## Do's and Don'ts

### Do:
- **Do** preservar a hero aprovada e a navegação dramática.
- **Do** manter o retrato real reconhecível (pinturas em todas as salas, fotos profissionais só na Sobre e no Contato) e registrar a procedência dos assets.
- **Do** trocar só `#menu` na navegação, para não interromper a trilha.
- **Do** adaptar a densidade para leitura e respeitar movimento reduzido.
- **Do** escrever como Thiago fala, em primeira pessoa e frases curtas; o que ainda não existe fica fora do site em vez de virar aviso.

### Don't:
- **Don't** reabrir Vintage Ads ou trocar a direção por um template de cards.
- **Don't** voltar às folhas de leitura brancas nas seções nem usar a cor da seção como cor de texto pequeno sobre tinta.
- **Don't** usar máscaras geométricas como substituto do contorno do retrato.
- **Don't** publicar telas reais, dados internos ou links privados do Helios.
- **Don't** iniciar som no carregamento, trocar trilha no hover ou esconder o player enquanto toca.
- **Don't** colocar o rosto de Thiago na hero ou ao fundo das páginas internas.
