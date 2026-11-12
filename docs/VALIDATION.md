# Validação e pendências

## Verificações realizadas localmente

- `bun install --frozen-lockfile` para instalação reproduzível.
- `bun run check`: diagnóstico Astro/TypeScript.
- `bun run build`: geração de 17 páginas estáticas.
- `bun run check:static`: destinos locais de `href`, `src` e `srcset`, contagem de rotas e respeito à base de publicação. Testado na raiz e com `/Metapholio`.
- Renderizações diretas em navegador: as 17 rotas (102 renderizações) nas larguras 320, 390, 700, 1024, 1440 e 1920 px, sem erros JS de página, falhas HTTP de recursos, imagens não decodificadas ou overflow horizontal do documento.
- Capturas desktop/mobile das rotas. Revisão Impeccable independente (revisor sem o contexto de quem construiu) da rodada que tirou o rosto da hero e integrou a trilha: veredito `fix` com seis correções; todas pontuadas como resolvidas na verificação seguinte, veredito `ship` (escopo: essas correções, não uma nova revisão integral).
- Jornada completa no Firefox 158 (WebDriver BiDi), na raiz e com `/Metapholio`, 21 verificações: cliques no menu e em projetos, setas + Enter, Escape, voltar do navegador; mesma janela e mesmo iframe da trilha após cada troca; faixa correta por página conforme o estado informado pelo próprio player; hover não troca faixa; recolher pausa; sem erros do código do site.
- Cena da Sobre revisada por um revisor Impeccable independente: `fix` com 7 correções, todas resolvidas, veredito `ship` (escopo: essas correções). 14 verificações no Firefox: autoplay avança, segura com o ponteiro na frase/controles, setas ← →, pausar/retomar com `aria-pressed` e `aria-live`, slides ocultos `inert`, links do último slide navegam, reinicializa ao voltar pela navegação, começa pausada com movimento reduzido; sem JavaScript, os quatro slides aparecem empilhados e a página rola.
- Disclosure nativo de pendências conferido.
- Procedência presente em todos os rasters publicados.

As capturas e registros locais de sessão não integram o repositório público. A checagem estática reproduzível está em `scripts/check-static.py`; não substitui testes de navegador.

## Limites da validação

A jornada foi validada no Firefox; Chrome e Safari não foram testados nesta rodada. No console aparecem avisos do próprio script do YouTube (cookie `__Secure-YEC` recusado e um `postMessage` antes de o iframe carregar); não vêm do código do site e não afetam a reprodução.

Não houve auditoria WCAG completa, avaliação auditiva das faixas, execução das aplicações dos projetos, teste de demos externas ou comprovação independente dos relatos curriculares. O site contém textos de contexto e pendências explícitas em vez de resultados ou métricas inventados.

## Pendências de produto

- Cópia pessoal pública da API Altave.
- Datas e cargos formais de estágios; detalhes de formação ainda não confirmados.
- Contexto operacional mais específico do ReObserve e motivação/origem do Boys-chat.
- Exemplos confirmados de soft skills por projeto, comprovantes curriculares e eventos.
- Screenshots/demos revisados para privacidade e disponibilidade. Qualquer demonstração de Helios deve usar dados fictícios e ser identificada como demonstração.

## Publicação

O workflow verifica tipos, build e links estáticos antes de enviar o artefato ao GitHub Pages. A situação de cada deploy é a mostrada em **Actions** e **Settings → Pages**; um build local bem-sucedido não comprova que o deploy remoto terminou.
