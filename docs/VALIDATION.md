# Validação e pendências

## Verificações realizadas localmente

- `bun install --frozen-lockfile` para instalação reproduzível.
- `bun run check`: diagnóstico Astro/TypeScript.
- `bun run build`: geração de 12 páginas estáticas.
- `bun run check:static`: destinos locais de `href` e `src`, contagem de rotas e respeito à base de publicação. Testado na raiz e com `/Metapholio`.
- 72 renderizações diretas em navegador: as 12 rotas nas larguras 320, 390, 700, 1024, 1440 e 1920 px, sem erros JS de página, falhas HTTP de recursos, imagens não decodificadas ou overflow horizontal do documento.
- Capturas desktop/mobile das 12 rotas; revisão visual Impeccable executada inline, sem revisor nativo independente.
- Foco com setas, destino da requisição de navegação ao pressionar Enter e disclosure nativo de pendências conferidos.
- Procedência presente em todos os rasters publicados.

As capturas e registros locais de sessão não integram o repositório público. A checagem estática reproduzível está em `scripts/check-static.py`; não substitui testes de navegador.

## Limites da validação

O Helium automatizado apresentou timeout ao concluir navegações subsequentes entre documentos, inclusive com `goto`. Por isso, o teste de Enter confirma a requisição ao destino correto, **não** uma jornada completa concluída entre páginas. Essa validação continua pendente em outro navegador/ambiente. As páginas foram abertas e verificadas diretamente, e os links gerados apontam para arquivos existentes.

Não houve auditoria WCAG completa, avaliação auditiva, execução das aplicações dos projetos, teste de demos externas ou comprovação independente dos relatos curriculares. O site contém textos de contexto e pendências explícitas em vez de resultados ou métricas inventados.

## Pendências de produto

- Player musical com opt-in e controles nativos visíveis.
- Cópia pessoal pública da API Altave.
- Datas e cargos formais de estágios; detalhes de formação ainda não confirmados.
- Contexto operacional mais específico do ReObserve e motivação/origem do Boys-chat.
- Exemplos confirmados de soft skills por projeto, comprovantes curriculares e eventos.
- Screenshots/demos revisados para privacidade e disponibilidade. Qualquer demonstração de Helios deve usar dados fictícios e ser identificada como demonstração.

## Publicação

O workflow verifica tipos, build e links estáticos antes de enviar o artefato ao GitHub Pages. A situação de cada deploy é a mostrada em **Actions** e **Settings → Pages**; um build local bem-sucedido não comprova que o deploy remoto terminou.
