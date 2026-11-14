# Artes da Mesa de criação

Quatro artes geradas pela ferramenta nativa GPT Image, aprovadas pelo autor. As gravuras são alegorias e não representam instalações, telas ou dados operacionais reais.

**Em uso:** só a folha do Hélios, como arte da página `/edp-helios/` (`bun scripts/create-helios-art.ts` recorta a cidade e a reimprime em Marine Blue com a rede em Electric Green, em `public/images/helios/`). As outras três foram feitas para o estudo de abertura "Mesa de criação", que não substituiu o menu do site; ficam guardadas aqui, sem uso.

Os prompts abaixo são os textos exatos utilizados, também preservados nos arquivos `.png.json` e nos metadados dos PNGs. Podem ser copiados para gerar novas versões. Para refinar uma candidata, anexe o PNG correspondente e descreva a alteração desejada; preserve a área livre para os textos da interface.

| Arte | Papel na composição |
| --- | --- |
| [Fundo gravado](ground.png) | Campo azul-petróleo e turquesa, com margem framboesa. |
| [Hélios](helios-sheet.png) | Folha principal: cidade imaginária e rede elétrica verde, com área livre à esquerda. |
| [ConexZap](conex-sheet.png) | Folha menor: mensagens e caminhos entre contextos. |
| [Sobre](about-sheet.png) | Folha menor: gravura botânica e área livre para apresentação. |

Na montagem, títulos, navegação, números e ações serão elementos HTML. As folhas foram solicitadas com transparência; manter o canal alfa ao converter para formatos de entrega. O fundo é opaco. Nenhuma arte exige Three.js para ser exibida.

## ground

```text
Create a production full-bleed background image for the approved Metapholio portfolio composition. This is only the background beneath the paper folios: no sheets, no lettering, no buttons or symbols. Landscape 3:2 at high resolution, at least 1536 pixels wide. Based on the attached mockup's exposed background, expand that engraved turquoise field into a complete image: richly layered historical copperplate hatching, sweeping engraved botanical leaves and architectural scrolls, shadowed dark blue-green mass mostly toward the left edge and lower margin, quieter teal in the upper central area. Deep #123b3d and turquoise #388b87 to #73c9c5, matte printed ink with fine grain, no parchment beige, no white areas, no glowing effects. One restrained broad raspberry ink wash at the far right edge echoes Metaphor's screen-print graphic language. Preserve detailed etched linework and sufficient darkness behind the left navigation. This is an atmospheric illustration, not an illustration of a user interface. No copied composition of paper folios, no personal portraits, no numbers, no fantasy game items.
```

## helios-sheet

```text
Generate a production image asset, not a mockup: a single flat, front-facing rectangular sheet of off-white archival paper with naturally slightly deckled edges, entirely isolated on transparent background. Landscape 3:2 composition, with a narrow transparent margin around the whole sheet. No perspective rotation, no external shadow. The sheet is printed with a superb intricate historical copperplate engraving of an imaginary city with bridges, arches and a delicately integrated electricity distribution network. This is an allegory of integrated maintenance planning, not an actual EDP facility. The drawing occupies the right half and bottom edge; leave the upper left and left middle mostly blank textured paper for live UI text to be overlaid later. Restrained cross-hatching, bold dark ink masses and fine archival linework; depth through drawing, no photographic realism. Ink is marine blue #212E3E and deep greens #143F47 #225E66 with small vivid electric green #28FF52 printed accents along connected paths, like ink rather than neon light. All paper is opaque and warm off-white; only outside the natural sheet contour is transparent. Reference the approved portfolio image for engraving craftsmanship and paper material, not its text or arrangement. Do not include any text, letters, symbols resembling writing, numbers, charts, buttons, UI, dam, satellite antenna, logos or people. This is one coherent illustrated print for a premium medieval-fantasy editorial web portfolio inspired by Metaphor.
```

## conex-sheet

```text
Produce one production illustration asset for a portfolio, not a full UI. A flat front-facing horizontal 2:1 sheet of ivory archival paper with subtle natural deckled edges and fine paper grain, isolated on true transparent background with a small margin. No external shadow or rotation. On the right third and bottom edge, render a gorgeous precise historical copper engraving of an imaginary architectural message exchange: three little connected archive halls and narrow bridges, tiny envelopes passing between separate destinations. It suggests routing communications across distinct organizations, not a real software screenshot. Dark teal ink #173c3e with turquoise #73c9c5 over paper. Left two thirds mostly blank lightly textured paper for title and description to be added in HTML. Match the approved Metapholio reference's printing craft, hatching and paper, not its exact artwork. No words, characters, labels, numbers, logos, UI controls, satellite dishes or robots. Strong detailed illustration at the right, quiet at the left; high contrast and coherent perspective. Real alpha only outside the paper.
```

## about-sheet

```text
Generate one beautiful production illustration asset: a flat front-facing horizontal 3:2 piece of off-white archival paper with subtle natural uneven deckled edges, isolated on real transparent background with a small clear margin. No rotation or cast shadow. An elegant historical botanical copperplate engraving grows along its right edge and lower-right corner: one expressive leafy branch, finely cross-hatched dark blue-green ink #173c3e with a few faint sage details. The left two thirds stay quiet blank paper with tactile fine grain, intended for large live website typography added later. The leaf drawing feels curious, thoughtful, human and alive, its natural contour and black ink mass readable at small sizes. Reference the uploaded portfolio mockup only for craftsmanship of botanical print and material. No text, letters, writing, numbers, logos, frames, books, people or UI. Opaque paper, true alpha only outside the entire paper sheet. Rich yet controlled print texture, sharp confident hatching, no watercolor, no photographic plants.
```
