import {resolve,extname} from 'node:path';
const root=resolve('dist');
const port=Number(process.env.PORT??4323);
Bun.serve({port,hostname:'127.0.0.1',async fetch(request){
 let path:string;try{path=decodeURIComponent(new URL(request.url).pathname)}catch{return new Response('Bad request',{status:400})}
 const filePath=resolve(root,'.'+path+(extname(path)?'':path.endsWith('/')?'index.html':'/index.html'));
 if(!filePath.startsWith(root+'/'))return new Response('Forbidden',{status:403});
 const file=Bun.file(filePath);if(!await file.exists())return new Response('Not found',{status:404});
 return new Response(file,{headers:{'Cache-Control':'no-cache'}});
}});
console.log(`Metapholio static preview: http://127.0.0.1:${port}/`);
