// Logotipos das tecnologias (Simple Icons, CC0). Tecnologias sem logotipo no Simple Icons, ou cujo logotipo
// foi retirado a pedido do titular (Power BI, Excel), viram um selo tipográfico com o monograma: nada inventado.
// Graus: autoavaliação de Thiago numa escala de categorias (roteiro do portfólio DSM, observação 2),
// nunca porcentagem. Mostrados como cinco estrelas de quatro pontas, com o numeral e o nome do grau.
import * as si from 'simple-icons';

type Icon={title:string;path:string};
const slug:Record<string,Icon>={
 'TypeScript':si.siTypescript,'JavaScript':si.siJavascript,'React':si.siReact,'Next.js':si.siNextdotjs,'NextAuth':si.siNextdotjs,
 'Node.js':si.siNodedotjs,'Express':si.siExpress,'Bun':si.siBun,'Astro':si.siAstro,'Vite':si.siVite,'TanStack Query':si.siReactquery,
 'HTML':si.siHtml5,'CSS':si.siCss,'Bootstrap':si.siBootstrap,'Python':si.siPython,'Flask':si.siFlask,'FastAPI':si.siFastapi,
 'pandas':si.siPandas,'Java':si.siOpenjdk,'Spring':si.siSpring,'Prisma':si.siPrisma,'PostgreSQL':si.siPostgresql,'MySQL':si.siMysql,
 'Supabase Storage':si.siSupabase,'Upstash Redis':si.siUpstash,'Pusher':si.siPusher,'Figma':si.siFigma,'GitHub Actions':si.siGithubactions,
 'Shell':si.siGnubash,'Lua':si.siLua,'Neovim':si.siNeovim,'Arch Linux':si.siArchlinux,'Linux':si.siLinux,'Docker':si.siDocker,
 'Git':si.siGit,'Databricks':si.siDatabricks,
};
export const GRADES=['Ouvi falar','Uso básico','Desenvolvo com apoio','Desenvolvo com autonomia','Proficiente'] as const;
export const ROMAN=['I','II','III','IV','V'] as const;
// Padrão: desenvolvo com autonomia. Acima disso, o que uso todo dia (SQL no desenvolvimento e na análise de dados
// da EDP); abaixo, só as bibliotecas e serviços mais específicos, em que ainda preciso de apoio.
const STRONG=['MySQL','Databricks'];
const ASSISTED=['Baileys','Lua','JavaFX','Spring','Pusher','Upstash Redis','Supabase Storage'];
const level=(name:string):1|2|3|4|5=>STRONG.includes(name)?5:ASSISTED.includes(name)?3:4;
export type Tech={name:string;path?:string;mono?:string;level?:1|2|3|4|5};
export const tech=(name:string):Tech=>{
 const icon=slug[name];
 if(icon)return {name,path:icon.path,level:level(name)};
 const mono=name.replace(/[^A-Za-zÀ-ú ]/g,'').split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase()||name.slice(0,2).toUpperCase();
 return {name,mono,level:level(name)};
};
// Constelação do Sobre: agrupada como no currículo; cada item mostra o seu grau.
export const constellation=[
 {group:'Interfaces web',items:['React','Next.js','TypeScript','JavaScript','HTML','CSS']},
 {group:'APIs e dados',items:['Node.js','Express','FastAPI','Prisma','PostgreSQL','MySQL']},
 {group:'Automação e análise',items:['Python','pandas','Power BI','Excel','Databricks']},
 {group:'Ferramentas',items:['Java','Bun','Astro','Git','Linux','Neovim']},
];
