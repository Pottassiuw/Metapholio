---
name: Metapholio
description: Portfólio de Thiago Nascimento com linguagem de menu editorial inspirada em Metaphor.
colors:
  primary: "#73c9c5"
  ink: "#101c20"
  selection: "#ff3461"
  paper: "#f4f3e9"
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
- Retrato real com recorte orgânico e tratamento de impressão.
- Turquesa contínuo, seleção rosa e folhas de leitura em papel.
- Conteúdo factual com autoria e pendências distinguíveis.

## Colors

Turquesa é o campo de navegação. Tinta serve ao texto e às superfícies escuras. Rosa marca a seleção e a abertura do conteúdo; não é cor para texto pequeno. Papel sustenta a leitura longa. O texto secundário no papel mantém contraste por um tom de tinta esverdeado.

**The Legible Ground Rule.** O retrato e a gravura cedem contraste ao menu. Não colocar texto escuro diretamente sobre regiões escuras da foto.

## Typography

Bodoni Moda 900, servida localmente sob o nome Bodoni, conduz menu e títulos. Barlow Condensed 500, servida como Barlow, conduz textos e comandos. Arquivos e licenças locais; nenhuma dependência de Google Fonts em runtime.

O menu da hero é deliberadamente maior que a escala de leitura. Títulos internos são fluidos; textos de corpo usam linhas espaçosas e medida controlada. Evitar caixa alta nos parágrafos. Usar caixa alta apenas em navegação e comandos curtos.

## Layout

A hero mantém menu diagonal à esquerda e retrato ampliado à direita. Páginas internas deixam o menu fixo em escala menor e abrem uma folha de leitura à direita. O documento, não um painel aninhado, rola conteúdos longos.

No celular, identidade, navegação e folha seguem o fluxo vertical. A hero e o menu mantêm a personalidade; os artigos ficam retos. As rotas são estáticas e funcionam sem JavaScript. Setas ajudam a mover o foco; Enter usa os links nativos e Escape retorna ao menu.

## Elevation & Depth

A folha editorial tem sombra suave e deslocada, sem duplicar uma borda de contorno. A seleção rosa é plana. A faixa superior de uma folha é um sinal de abertura, não um contorno de cartão.

O retrato preserva feições e proporções. O tratamento de retícula, papel e registro rosa vem do asset raster, não de filtros que inventem uma ilustração.

## Shapes

Cantos retos. Recortes diagonais pertencem ao fundo e à faixa de seleção; nunca aproximam contornos humanos. A máscara do retrato é derivada de pixels reais. Diagramas editoriais descrevem conceitos e são explicitamente rotulados; não fingem ser screenshots.

## Components

### Navigation

Seis entradas reais: Sobre, Projetos, Experiência, Laboratório, Formação e Contato. Uma faixa rosa acompanha a seleção. Hover e foco podem atualizar a prévia da hero, nunca abrir projetos nem iniciar áudio.

### Reading sheet

Título editorial, metadados depois do título, texto legível e seções espaçadas. Voltar ao menu é um link visível no início. O rodapé permite continuar explorando. Usar revelação recortada curta; desativar movimento com `prefers-reduced-motion`.

### Project index

Entradas tipográficas separadas por regras finas, com nome, contexto, tecnologias e link de abertura. Não substituir por uma grade de cartões idênticos.

### Project detail

Problema, solução, contribuição pessoal, tecnologias, competências e fontes. A contribuição recebe um campo turquesa. Pendências ficam em disclosure nativo. Sem estrelas ou porcentagens de habilidade inventadas.

### Buttons and links

Comandos de fundo tinta e texto papel; hover rosa com texto tinta. Foco visível, claro no fundo escuro e tinta sobre papel. SVGs pequenos em traço consistente para setas e ícones.

## Do's and Don'ts

### Do:
- **Do** preservar a hero aprovada e a navegação dramática.
- **Do** manter retratos reais reconhecíveis e registrar a procedência dos assets.
- **Do** adaptar a densidade para leitura e respeitar movimento reduzido.
- **Do** distinguir conteúdo confirmado de informações pendentes.

### Don't:
- **Don't** reabrir Vintage Ads ou trocar a direção por um template de cards.
- **Don't** usar máscaras geométricas como substituto do contorno do retrato.
- **Don't** publicar telas reais, dados internos ou links privados do Helios.
- **Don't** iniciar som no carregamento ou trocar trilha no hover.
