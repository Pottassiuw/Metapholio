// Pinturas do Hermes para /interesses/hermes-agent/ (public/images/hermes/*).
// Uso: bun scripts/create-interests-art.ts [pasta-das-artes]
// Fonte: as artes oficiais do Hermes Agent fornecidas por Thiago (OneDrive/Pictures/Arts/Hermes/*.webp).
// Tratamento suave, na resolução original: nenhum desfoque, mediana ou Kuwahara, então o traço, o meio-tom e o
// pontilhado da gravura ficam intactos. Só a luminância é reimpressa como pigmento: sombra em preto (o mesmo da
// página, para a arte não ter borda), meios-tons em ardósia azul e luz em rosa quase vermelho. O pigmento não é
// chapado: dois campos de ruído de baixa frequência variam o tom como uma aguada, e um grão fino imita a
// granulação do pigmento no papel.
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';

const src=process.argv[2]??'C:/Users/potta/OneDrive/Pictures/Arts/Hermes';
const out='public/images/hermes';
// [arquivo, nome, larguras (a primeira é a maior servida)]
const pieces:[string,string,number[],boolean?][]=[
 ['7.webp','busto',[1080,720]],
 ['3.webp','ignicao',[1488,900]],
 ['8.webp','fios',[950,640]],
 ['1.webp','lembranca',[1600,900]],
 ['6.webp','escada',[1416,800]],
];
type RGB=[number,number,number];
const mix=(a:RGB,b:RGB,t:number):RGB=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const smooth=(e0:number,e1:number,x:number)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t);};
// Ruído de valor com interpolação suave, somado em oitavas (fbm).
function noiseField(w:number,h:number,scale:number,seed:number,octaves=4){
 const hash=(x:number,y:number)=>{let n=(x*374761393+y*668265263+seed*2147483647)|0;n=(n^(n>>13))*1274126177|0;return((n^(n>>16))>>>0)/4294967295;};
 const f=new Float32Array(w*h);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  let amp=1,sum=0,norm=0,fx=x/scale,fy=y/scale;
  for(let o=0;o<octaves;o++){
   const x0=Math.floor(fx),y0=Math.floor(fy),tx=fx-x0,ty=fy-y0,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty);
   const a=hash(x0,y0),b=hash(x0+1,y0),c=hash(x0,y0+1),d=hash(x0+1,y0+1);
   sum+=amp*((a+(b-a)*sx)*(1-sy)+(c+(d-c)*sx)*sy);norm+=amp;amp*=.5;fx*=2;fy*=2;
  }
  f[y*w+x]=sum/norm;
 }
 return f;
}
const INK:RGB=[4,4,7];
const SLATE_A:RGB=[24,38,82],SLATE_B:RGB=[58,82,138];
const ASH_A:RGB=[120,132,158],ASH_B:RGB=[170,178,198];
const ROSE_A:RGB=[226,16,52],ROSE_B:RGB=[255,44,78];
const BLUSH:RGB=[255,206,214];
let seed=11;const rand=()=>((seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff);

await mkdir(out,{recursive:true});
for(const [file,name,widths,invert] of pieces){
 const {data,info}=await sharp(`${src}/${file}`).flatten({background:'#000'}).raw().toBuffer({resolveWithObject:true});
 const w=info.width,h=info.height,ch=info.channels;
 const wash=noiseField(w,h,Math.max(w,h)/3.2,seed++);      // aguada: variação larga de tom
 const bloom=noiseField(w,h,Math.max(w,h)/7,seed++,3);      // onde o rosa "pega" mais
 const px=Buffer.alloc(w*h*3);
 for(let i=0;i<w*h;i++){
  const r=data[i*ch]/255,g=data[i*ch+1]/255,b=data[i*ch+2]/255;
  const L0=.2126*r+.7152*g+.0722*b,L=invert?1-L0:L0;
  const grain=(rand()-.5)*.05;                                // granulação do pigmento
  const v=Math.min(1,Math.max(0,L+grain*smooth(.15,.6,L)));
  const wv=wash[i],bl=bloom[i];
  const slate=mix(SLATE_A,SLATE_B,wv),ash=mix(ASH_A,ASH_B,1-wv),rose=mix(ROSE_A,ROSE_B,bl);
  // A luz vira rosa onde o campo "bloom" é alto; no resto, cinza. Assim o rosa é mancha, não filtro.
  const roseShare=smooth(.42,.7,bl*.8+v*.45);
  let c=mix(INK,slate,smooth(.04,.34,v));
  c=mix(c,ash,smooth(.32,.62,v)*(1-roseShare*.85));
  c=mix(c,rose,smooth(.42,.7,v)*roseShare);
  c=mix(c,BLUSH,smooth(.86,1,v)*.55);
  px[i*3]=c[0];px[i*3+1]=c[1];px[i*3+2]=c[2];
 }
 for(const [k,width] of widths.entries()){
  const base=()=>sharp(px,{raw:{width:w,height:h,channels:3}}).resize({width,withoutEnlargement:true,kernel:'lanczos3'});
  const stem=`${out}/${name}${k===0?'':`-${width}`}`;
  const m=await base().avif({quality:62,effort:6,chromaSubsampling:'4:4:4'}).toFile(`${stem}.avif`);
  await base().webp({quality:86,effort:6,smartSubsample:true}).toFile(`${stem}.webp`);
  const prompt=`DERIVED by scripts/create-interests-art.ts from official Hermes Agent artwork supplied by Thiago Nascimento (OneDrive/Pictures/Arts/Hermes/${file}, ${w}x${h})${invert?', luminance inverted so the paper becomes the black ground':''}. No blur, median or Kuwahara: original lines and halftone kept at native resolution${width<w?`, then Lanczos-resized to ${m.width}px`:''}. Only the luminance is re-inked: shadows to ink #040407 (the page ground), mid-tones to a slate-blue wash, light to near-red rose (#d61a40–#ff3a5c) that pools where a low-frequency noise field is high, with pigment grain. ${m.width}x${m.height}. The composition and figures belong to the original artwork.`;
  for(const ext of ['avif','webp'])await writeFile(`${stem}.${ext}.json`,JSON.stringify({prompt,createdAt:new Date().toISOString()},null,2)+'\n');
  console.log(stem,m.width,m.height);
 }
}
