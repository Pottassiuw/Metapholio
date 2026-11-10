# Metapholio

Portfólio acadêmico e profissional de **Thiago Nascimento**, construído com **Astro + Bun**. A direção visual é inspirada nos menus de *Metaphor: ReFantazio*: tipografia monumental, turquesa, tinta, seleção rosa e um retrato real tratado artisticamente.

**Site:** https://pottassiuw.github.io/Metapholio/

**Repositório:** https://github.com/Pottassiuw/Metapholio

> O site é totalmente estático. Não precisa de banco de dados, backend, chaves de API ou arquivo `.env`. Alguns conteúdos ainda aguardam confirmação; estão identificados nas próprias páginas. A trilha sonora foi selecionada, mas o player ainda não foi integrado.

## Requisitos

- **Bun 1.4.4** — versão usada no desenvolvimento e fixada no CI. Instalação: https://bun.sh/docs/installation
- **Git**, para clonar o repositório.
- **Python 3**, opcional para verificar os arquivos gerados ou recriar o retrato. Não é necessário para executar o site.

Confira as ferramentas:

```sh
bun --version
git --version
```

## Instalar e executar

```sh
git clone https://github.com/Pottassiuw/Metapholio.git
cd Metapholio
bun install --frozen-lockfile
bun run dev
```

Abra **http://localhost:4321/**. O Astro recarrega a página ao editar arquivos de `src/`.

Para escolher explicitamente endereço e porta:

```sh
bun run dev --host 127.0.0.1 --port 4321
```

Não abra os arquivos `.astro` diretamente no navegador; use o servidor de desenvolvimento ou a prévia do build.

## Comandos

| Comando | Função |
| --- | --- |
| `bun install --frozen-lockfile` | Instala exatamente as dependências do `bun.lock`. |
| `bun run dev` | Inicia o servidor de desenvolvimento. |
| `bun run check` | Verifica Astro e TypeScript. |
| `bun run build` | Gera o site estático em `dist/`. |
| `bun run preview` | Serve o build usando o preview do Astro. |
| `bun run check:static` | Confere as 12 rotas e os destinos locais de links/assets; requer Python 3. |
| `bun run preview:static` | Serve `dist/` em `http://127.0.0.1:4323/`, com Bun. |

### Testar a versão compilada

```sh
bun run check
bun run build
bun run check:static
bun run preview
```

Use o endereço exibido pelo terminal. Para apenas compilar e visualizar, o passo `check:static` pode ser omitido se Python não estiver instalado.

## Telas e navegação

| Rota local | Conteúdo |
| --- | --- |
| `/` | Menu principal com retrato artístico. |
| `/sobre/` | Apresentação, foto e trajetória. |
| `/projetos/` | Projetos acadêmicos: API Altave e Weeat. |
| `/experiencia/` | Experiência profissional: EDP/Helios e ReObserve/PIT. |
| `/laboratorio/` | Projeto pessoal Boys-chat. |
| `/formacao/` | Formação, cursos, idiomas e competências. |
| `/contato/` | E-mail, GitHub e LinkedIn. |
| `/api-altave/` | Detalhe da API de ordens de serviço. |
| `/weeat/` | Detalhe do TCC da ETEC. |
| `/edp-helios/` | Atuação no projeto profissional privado. |
| `/reobserve/` | Projeto de iniciação no estágio PIT. |
| `/boys-chat/` | Aplicação pessoal de mensagens. |

Na publicação, as rotas recebem o prefixo `/Metapholio`. O menu aceita cliques e links nativos; as setas movem o foco, Enter abre o link focado e Escape retorna ao menu. Sem JavaScript, as rotas continuam acessíveis pelos links. A interface respeita `prefers-reduced-motion`.

## Estrutura do projeto

```text
.github/workflows/deploy.yml  # Build e deploy no GitHub Pages
src/
  assets/fonts/              # Fontes locais empacotadas pelo Astro
  components/MenuArt.astro   # Identidade, arte e navegação
  data/portfolio.ts          # Textos, categorias, tecnologias e links
  data/soundtrack.json       # Curadoria musical, ainda sem player
  layouts/Portfolio.astro    # Estrutura compartilhada e atalhos
  pages/index.astro          # Menu principal
  pages/[screen].astro       # Seções e detalhes estáticos
  styles/                   # Estilos da hero e da leitura
public/
  images/                   # Fotos, gravura e procedência
  fonts/                    # Licenças e cópias das fontes
assets/source/               # Fonte e receita do retrato
scripts/                     # Verificação estática e ferramentas locais
docs/                        # Operação, créditos e limites de validação
DESIGN.md                    # Sistema visual documentado com Impeccable
.impeccable/design.json       # Tokens estendidos e exemplos de componentes
```

Pesquisas internas, estado de sessões, capturas locais e protótipos de decisão não fazem parte da distribuição pública e não são necessários para executar o projeto.

## Atualizar conteúdo e aparência

- **Conteúdo:** edite `src/data/portfolio.ts`; textos específicos de apresentação, formação e contato também estão em `src/pages/[screen].astro`.
- **Links/rotas:** use os helpers `route()` e `asset()` de `portfolio.ts`, para respeitar a base de publicação.
- **Hero e menu:** `src/components/MenuArt.astro` e `src/styles/menu.css`.
- **Telas internas:** `src/styles/portfolio.css` e o layout compartilhado.
- **Identidade visual:** consulte `DESIGN.md` antes de adicionar telas ou mudar os tokens.
- **Retrato:** veja [`assets/source/README.md`](assets/source/README.md). Pillow e NumPy são necessários somente para recriar o asset, não para executar ou compilar o site.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy.yml` verifica, compila e publica automaticamente cada push na branch `main`. Também pode ser executado manualmente em **Actions → Deploy Metapholio to GitHub Pages → Run workflow**.

Em **Settings → Pages → Build and deployment**, a origem deve estar em **GitHub Actions**. Não selecionar uma pasta/branch de arquivos-fonte: o artefato publicado é `dist/`, produzido pelo workflow.

O CI usa:

```text
SITE_URL=https://pottassiuw.github.io
BASE_PATH=/Metapholio
```

Para reproduzir esse build em um shell POSIX:

```sh
SITE_URL=https://pottassiuw.github.io BASE_PATH=/Metapholio bun run build
BASE_PATH=/Metapholio bun run check:static
```

As variáveis são configuração pública de build, não segredos. Em PowerShell, defina `$env:SITE_URL` e `$env:BASE_PATH` antes dos comandos. Remova as variáveis ao voltar ao desenvolvimento na raiz. Se mudar o nome do repositório ou usar domínio próprio, atualize os valores no workflow e reconstrua o site.

Para preview local do build com prefixo, prefira `bun run preview`: o servidor alternativo `preview:static` foi pensado para builds locais na raiz.

## Créditos e condições de uso

Veja [`docs/CREDITS.md`](docs/CREDITS.md). O projeto não é afiliado à Atlus ou à Sega e não distribui arte ou áudio do jogo. Fontes e imagens têm procedências próprias. Não foi atribuída uma licença open-source ao código; repositório público não implica permissão irrestrita de reutilização, especialmente dos retratos.

## Estado e limites

Veja [`docs/VALIDATION.md`](docs/VALIDATION.md) para verificações realizadas e pendências. A publicação não transforma campos pendentes em fatos confirmados.

- A cópia pessoal da API Altave ainda precisa ser disponibilizada; não há link inventado para ela.
- Helios não expõe código privado, dados operacionais ou telas reais. O esquema editorial não é uma screenshot.
- Datas/cargos, alguns relatos de competências e comprovantes ainda aguardam atualização.
- Demos externas não foram executadas nem são anunciadas como funcionais.
- A trilha não toca: o player é uma etapa futura, com consentimento explícito, controles nativos visíveis e sem download/redistribuição de áudio.
