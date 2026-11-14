// Gera a arte da página do Helios (public/images/helios) a partir da prancha assets/plates/helios-sheet.png.
// Uso: bun scripts/create-helios-art.ts
// A gravura é reimpressa "à noite", na identidade do Helios: o papel vira Marine Blue (#212E3E), o traço vira um
// verde-água claro e a rede elétrica mantém o Electric Green (#28FF52). Nenhum pixel é inventado: é um mapa de
// cores sobre a prancha, recortada na cidade (sem as bordas do papel).
import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';

const src='assets/plates/helios-sheet.png';
const out='public/images/helios';
const crop={left:300,top:36,width:1186,height:956};
const ground=[0x21,0x2e,0x3e],line=[0x62,0xa0,0x9b],green=[0x28,0xff,0x52];
const widths=[1186,760];

await mkdir(out,{recursive:true});
const {data,info}=await sharp(src).flatten({background:'#f3ead9'}).extract(crop).raw().toBuffer({resolveWithObject:true});
const px=Buffer.alloc(info.width*info.height*3);
const clamp=(v:number)=>Math.min(1,Math.max(0,v));
for(let i=0,o=0;i<data.length;i+=info.channels,o+=3){
 const r=data[i]/255,g=data[i+1]/255,b=data[i+2]/255;
 const lum=.2126*r+.7152*g+.0722*b;
 const ink=clamp((.86-lum)/.6)**1.15;           // quanto de tinta há no ponto (papel = 0)
 const net=clamp((g-Math.max(r,b)-.07)/.24);   // quanto o ponto pertence à rede verde
 for(let c=0;c<3;c++){
  const base=ground[c]+(line[c]-ground[c])*ink;
  px[o+c]=Math.round(base+(green[c]-base)*net);
 }
}
const sidecar=JSON.parse(await readFile(`${src}.json`,'utf8')) as {prompt:string};
for(const [i,w] of widths.entries()){
 const base=()=>sharp(px,{raw:{width:info.width,height:info.height,channels:3}}).resize({width:w,withoutEnlargement:true});
 const stem=`${out}/cidade${i===0?'':`-${w}`}`;
 const meta=await base().avif({quality:54,effort:6}).toFile(`${stem}.avif`);
 await base().webp({quality:80,effort:5}).toFile(`${stem}.webp`);
 for(const ext of ['avif','webp'])await writeFile(`${stem}.${ext}.json`,JSON.stringify({prompt:`DERIVED by scripts/create-helios-art.ts from ${src}: cropped to the city (${crop.width}x${crop.height}+${crop.left}+${crop.top}), recoloured by a fixed colour map (paper to Marine Blue #212E3E, ink to pale sea green, network lines kept Electric Green #28FF52), ${meta.width}x${meta.height}, ${ext.toUpperCase()}. The source plate was generated with GPT Image for this portfolio; it is an allegory of integrated maintenance planning, not a real EDP facility, screen or dataset. Source prompt: ${sidecar.prompt}`,createdAt:new Date().toISOString()},null,2)+'\n');
 console.log(stem,meta.width,meta.height);
}
