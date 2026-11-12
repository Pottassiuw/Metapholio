// Logotipos das tecnologias (Simple Icons, CC0). Tecnologias sem logotipo no Simple Icons, ou cujo logotipo
// foi retirado a pedido do titular (Power BI, Excel), viram um selo tipográfico com o monograma: nada inventado.
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
export type Tech={name:string;path?:string;mono?:string};
export const tech=(name:string):Tech=>{
 const icon=slug[name];
 if(icon)return {name,path:icon.path};
 const mono=name.replace(/[^A-Za-zÀ-ú ]/g,'').split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase()||name.slice(0,2).toUpperCase();
 return {name,mono};
};
// Constelação da Formação: agrupada como no currículo, sem níveis nem porcentagens.
export const constellation=[
 {group:'Interfaces web',items:['React','Next.js','TypeScript','JavaScript','HTML','CSS']},
 {group:'APIs e dados',items:['Node.js','Express','FastAPI','Prisma','PostgreSQL','MySQL']},
 {group:'Automação e análise',items:['Python','pandas','Power BI','Excel','Databricks']},
 {group:'Ferramentas',items:['Java','Bun','Astro','Git','Linux','Neovim']},
];
