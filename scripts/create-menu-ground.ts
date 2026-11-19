// Fundo do menu (src/assets/ground/menu-ground*.webp).
// Uso: bun scripts/create-menu-ground.ts
// Gerado aqui, sem imagem de origem e sem IA. Imita o chão do menu de Metaphor (7.jpg): um turquesa calmo em dois
// tons com fronteira irregular e, por cima, marcas finas de pincel seco — riscos longos e estreitos deitados no
// ângulo do menu, em grupos: petróleo, raspado claro, alguns arranhões de tinta e raríssimos toques vermelhos.
// À direita (onde fica a gravura de Dürer, impressa em multiply) o chão clareia para um papel esverdeado calmo,
// para a figura ler como iluminada. Tudo é cor plana: nenhuma luz, sombra, relevo ou textura de empaste.
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';

type RGB=[number,number,number];
const hex=(h:string):RGB=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const mix=(a:RGB,b:RGB,t:number):RGB=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const smooth=(e0:number,e1:number,x:number)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t);};
function makeNoise(seed:number){
 const hash=(x:number,y:number)=>{let n=(x*374761393+y*668265263+seed*1442695041)|0;n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
 const v=(x:number,y:number)=>{const x0=Math.floor(x),y0=Math.floor(y),tx=x-x0,ty=y-y0,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty);
  const a=hash(x0,y0),b=hash(x0+1,y0),c=hash(x0,y0+1),d=hash(x0+1,y0+1);return(a+(b-a)*sx)*(1-sy)+(c+(d-c)*sx)*sy;};
 return(x:number,y:number,oct=3)=>{let s=0,a=1,n=0;for(let o=0;o<oct;o++){s+=a*v(x,y);n+=a;a*=.5;x*=2.03;y*=2.03;}return s/n;};
}
const BASE_A=hex('#6cc0bc'),BASE_B=hex('#5fb0b0'),PAPER=hex('#d4e6df');
const MARKS:[RGB,number,number][]=[ // cor, faixa do ruído (centro), largura da faixa (= espessura do risco)
 [hex('#3f8789'),.50,.030],   // petróleo
 [hex('#4c9aa8'),.30,.020],   // azul-petróleo
 [hex('#dcede7'),.70,.022],   // raspado claro
 [hex('#101c20'),.12,.006],   // arranhão de tinta
 [hex('#c8455a'),.88,.004],   // toque vermelho
];
const Z=makeNoise(5),G=makeNoise(17),R=makeNoise(31),B=makeNoise(43);
function render(W:number,H:number,portrait:boolean){
 const px=Buffer.alloc(W*H*3),ang=-8*Math.PI/180,ca=Math.cos(ang),sa=Math.sin(ang),S=Math.max(W,H);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const u=x/S,v=y/S,ru=u*ca-v*sa,rv=u*sa+v*ca;
  // Dois turquesas calmos com fronteira irregular e larga.
  let c=mix(BASE_A,BASE_B,smooth(.497,.503,Z(ru*1.4+G(ru*6,rv*30)*.08,rv*7,4)));
  // Papel à direita, onde a gravura é impressa (no retrato, em cima à direita).
  const edge=(B(ru*2,rv*14,4)-.5)*.16+(R(ru*4,rv*60,2)-.5)*.03;
  const pz=portrait?smooth(.598,.602,x/W*.7+(1-y/H)*.45+edge):smooth(.598,.602,x/W+edge);
  c=mix(c,PAPER,pz*.85);
  // Riscos finos: ruído quase só vertical (no referencial girado), recortado em faixas estreitas = linhas longas.
  const grp=smooth(.48,.62,G(ru*3.2,rv*5,2));                  // os riscos aparecem em grupos, não no campo todo
  const n=R(ru*1.6+G(ru*2,rv*9)*.25,rv*90,2);
  for(const [col,ctr,wd] of MARKS){
   const d=Math.abs(n-ctr);if(d>wd)continue;
   const a=smooth(wd,wd*.55,d)*grp*(1-pz*.75);                 // borda suave de 1–2 px, sem relevo
   c=mix(c,col,a);
  }
  const i=(y*W+x)*3;px[i]=c[0];px[i+1]=c[1];px[i+2]=c[2];
 }
 return px;
}
const OUT='src/assets/ground';
await mkdir(OUT,{recursive:true});
for(const [name,W,H,portrait] of [['menu-ground',2000,1125,false],['menu-ground-portrait',900,1600,true]] as const){
 await sharp(render(W,H,portrait),{raw:{width:W,height:H,channels:3}}).webp({quality:84,effort:6}).toFile(`${OUT}/${name}.webp`);
 console.log(name,W,H);
}
await writeFile(`${OUT}/PROVENANCE.md`,`# Fundo do menu\n\nGerado por scripts/create-menu-ground.ts, sem imagem de origem e sem IA: dois turquesas calmos, uma área de papel esverdeado à direita para a gravura de Dürer (impressa em multiply) e riscos finos de pincel seco em grupos (petróleo, raspado claro, arranhões de tinta, toques vermelhos raros), com a paleta medida no menu de referência de Metaphor fornecido pelo autor (7.jpg; nenhum pixel dela é usado). Cor plana, sem relevo, luz/sombra ou empaste.\n`);
