// Atmosfera: a camada 3D que fica por cima do site inteiro (Three.js), no idioma dos menus de Metaphor.
//  · Astrolábio: uma esfera armilar de anéis finos, com escala graduada, miras e um triângulo. Mora no numeral
//    da home, viaja até o numeral dos capítulos nas páginas de projeto e encolhe num canto nas salas.
//  · Estilhaços: triângulos de cor chapada que flutuam em profundidade, fogem do ponteiro, saltam da ponta da
//    pincelada a cada seleção do menu e cruzam a tela em rajada a cada troca de página.
//  · Brasas: pontos pequenos que sobem devagar e cintilam.
// A cor acompanha a seção (--accent-sel) e tudo pulsa com o grave quando a trilha toca.
// Carregado sob demanda por Atmosfera.astro; não roda com movimento reduzido nem sem WebGL.
import {
 Scene,PerspectiveCamera,WebGLRenderer,Group,Mesh,TorusGeometry,RingGeometry,BoxGeometry,SphereGeometry,PlaneGeometry,BufferGeometry,
 Float32BufferAttribute,MeshBasicMaterial,ShaderMaterial,InstancedMesh,Points,Object3D,Color,Vector2,Vector3,DoubleSide,DynamicDrawUsage,
} from 'three';
import {sound} from './sound';

const PAPER=0xf4f3e9,ROSE=0xff3461,INK=0x101c20,GOLD=0xffd27a;
const FOV=35,TILT=-8*Math.PI/180;
const rand=(a:number,b:number)=>a+Math.random()*(b-a);

let runSplash:((x:number,y:number,cor?:string)=>boolean)|null=null;
// Dispara o respingo de tinta em tela cheia a partir de (x, y) na cor da seção de destino.
export function splash(x:number,y:number,cor?:string){
 return runSplash?runSplash(x,y,cor):false;
}
if(typeof window!=='undefined')(window as unknown as {__splash?:typeof splash}).__splash=splash;

export function start(canvas:HTMLCanvasElement){
 let renderer:WebGLRenderer;
 try{renderer=new WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});}catch{return false;}
 renderer.setClearColor(0x000000,0);
 const scene=new Scene(),camera=new PerspectiveCamera(FOV,1,10,6000);
 let w=1,h=1,d=1,small=false;

 // ── Astrolábio ────────────────────────────────────────────────────────────
 const arm=new Group();scene.add(arm);
 const fades:[MeshBasicMaterial,number][]=[];
 const ink=(color:number,opacity:number,side=false)=>{const m=new MeshBasicMaterial({color,transparent:true,opacity,depthTest:false,depthWrite:false,...(side?{side:DoubleSide}:{})});fades.push([m,opacity]);return m;};
 const paper=ink(PAPER,.78),faint=ink(PAPER,.42),accentMat=ink(ROSE,.96),bandMat=ink(ROSE,.2,true),darkMat=ink(INK,.5);
 const spins:{pivot:Object3D,axis:Vector3,speed:number}[]=[];
 const X=new Vector3(1,0,0),Y=new Vector3(0,1,0),Z=new Vector3(0,0,1);
 function ring(radius:number,tube:number,mat:MeshBasicMaterial,tilt:[number,number,number],axis:Vector3,speed:number){
  const pivot=new Group();pivot.rotation.set(...tilt);pivot.add(new Mesh(new TorusGeometry(radius,tube,6,180),mat));
  arm.add(pivot);spins.push({pivot,axis,speed});return pivot;
 }
 function orbiter(parent:Object3D,radius:number,size:number,mat:MeshBasicMaterial,speed:number){
  const orb=new Group();orb.rotation.z=rand(0,6.28);const dot=new Mesh(new SphereGeometry(size,14,10),mat);dot.position.x=radius;
  orb.add(dot);parent.add(orb);spins.push({pivot:orb,axis:Z,speed});
 }
 const r1=ring(1,.0036,paper,[0,0,0],Y,.3);
 ring(.9,.0032,paper,[1.2,.3,0],X,-.22);
 const r3=ring(.8,.0062,accentMat,[1.05,0,.41],Y,-.42);
 r3.add(new Mesh(new RingGeometry(.725,.795,160),bandMat));
 const r4=ring(.62,.003,paper,[.4,.9,0],X,.58);
 ring(.44,.0028,faint,[-.8,.2,.5],Y,-.8);
 ring(.9,.002,darkMat,[.2,1.3,.6],X,.16);
 orbiter(r1,1,.03,ink(ROSE,1),.5);orbiter(r3,.8,.036,paper,-.7);orbiter(r4,.62,.022,accentMat,1.1);
 arm.add(new Mesh(new SphereGeometry(.05,18,12),paper));
 const rod=new Mesh(new BoxGeometry(.0045,2.5,.0045),faint);rod.rotation.z=.41;arm.add(rod);
 // Moldura graduada (não tomba; só gira devagar no próprio plano), miras e triângulo: as linhas finas das telas do jogo.
 const rim=new Group();arm.add(rim);spins.push({pivot:rim,axis:Z,speed:.045});
 rim.add(new Mesh(new TorusGeometry(1.12,.0026,6,200),faint));
 const ticks=new InstancedMesh(new BoxGeometry(.0048,.026,.0048),paper,72),o=new Object3D();
 for(let i=0;i<72;i++){const a=i/72*Math.PI*2,long=i%6===0;o.position.set(Math.cos(a)*(long?1.185:1.17),Math.sin(a)*(long?1.185:1.17),0);o.rotation.set(0,0,a-Math.PI/2);o.scale.set(1,long?2.4:1,1);o.updateMatrix();ticks.setMatrixAt(i,o.matrix);}
 rim.add(ticks);
 const tri=new Group();arm.add(tri);spins.push({pivot:tri,axis:Z,speed:-.07});
 for(let i=0;i<3;i++){const a=Math.PI/2+i*Math.PI*2/3,b=a+Math.PI*2/3,R=1.36,ax=Math.cos(a)*R,ay=Math.sin(a)*R,bx=Math.cos(b)*R,by=Math.sin(b)*R;
  const side=new Mesh(new BoxGeometry(Math.hypot(bx-ax,by-ay),.0026,.0026),faint);side.position.set((ax+bx)/2,(ay+by)/2,0);side.rotation.z=Math.atan2(by-ay,bx-ax);tri.add(side);}
 for(const a of [TILT,TILT+Math.PI/2]){const m=new Mesh(new BoxGeometry(9,.0022,.0022),faint);m.rotation.z=-a;arm.add(m);}

 // ── Estilhaços ────────────────────────────────────────────────────────────
 const triGeo=new BufferGeometry();triGeo.setAttribute('position',new Float32BufferAttribute([0,.64,0,-.5,-.36,0,.5,-.36,0],3));
 const MAX=220;let count=MAX;
 const shards=new InstancedMesh(triGeo,new MeshBasicMaterial({side:DoubleSide,transparent:true,opacity:.9,depthTest:false,depthWrite:false}),MAX);
 shards.instanceMatrix.setUsage(DynamicDrawUsage);shards.frustumCulled=false;scene.add(shards);
 const P=new Float32Array(MAX*3),V=new Float32Array(MAX*3),R=new Float32Array(MAX*3),W=new Float32Array(MAX*3),S=new Float32Array(MAX*2),K=new Float32Array(MAX),tint=new Uint8Array(MAX);
 const accent=new Color(ROSE),accentTo=new Color(ROSE),still=[new Color(ROSE),new Color(PAPER),new Color(INK),new Color(GOLD)];
 function paint(i:number){shards.setColorAt(i,tint[i]===0?accent:still[tint[i]-1]);}
 function seed(i:number,everywhere=true){
  P[i*3]=rand(-w*.62,w*.62);P[i*3+1]=everywhere?rand(-h*.62,h*.62):-h*.62;P[i*3+2]=rand(-760,280);
  V[i*3]=V[i*3+1]=V[i*3+2]=0;
  for(let k=0;k<3;k++){R[i*3+k]=rand(0,6.28);W[i*3+k]=rand(-1,1)*(k===2?.5:1.1);}
  // Os grandes são raros e ficam ao fundo, para não tapar o texto; os pequenos ocupam toda a profundidade.
  const big=Math.random()<.06,s=big?rand(30,58):rand(7,24);if(big)P[i*3+2]=rand(-760,-260);S[i*2]=s*rand(.45,1.25);S[i*2+1]=s*rand(.8,1.9);K[i]=everywhere?1:0;
  const q=Math.random();tint[i]=q<.52?0:q<.7?1:q<.86?2:q<.95?3:4;paint(i);
 }

 // ── Brasas ────────────────────────────────────────────────────────────────
 const emberMat=new ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,
  uniforms:{uTime:{value:0},uH:{value:1},uPx:{value:1},uD:{value:1},uLevel:{value:0},uA:{value:new Color(PAPER)},uB:{value:new Color(ROSE)},uC:{value:new Color(INK)}},
  vertexShader:`uniform float uTime,uH,uPx,uD,uLevel;attribute float aSeed,aSize;varying float vTw,vMix;
void main(){vec3 p=position;p.y=mod(p.y+uTime*(9.+aSeed*26.)+uH*.5,uH)-uH*.5;p.x+=sin(uTime*(.25+aSeed*.5)+aSeed*40.)*(14.+aSeed*22.);
vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=aSize*uPx*(uD/-mv.z)*(1.+uLevel*1.5);
vTw=.3+.7*abs(sin(uTime*(.5+aSeed*1.7)+aSeed*90.));vMix=fract(aSeed*7.13);}`,
  fragmentShader:`uniform vec3 uA,uB,uC;varying float vTw,vMix;
void main(){float r=length(gl_PointCoord-.5);float a=smoothstep(.5,.1,r)*vTw;if(a<.01)discard;
vec3 col=vMix<.5?uA:vMix<.8?uB:uC;gl_FragColor=vec4(col,a*.92);
#include <colorspace_fragment>
}`});
 let embers:Points|null=null;
 function sow(){
  if(embers){scene.remove(embers);embers.geometry.dispose();}
  const n=small?300:900,pos=new Float32Array(n*3),sd=new Float32Array(n),sz=new Float32Array(n);
  for(let i=0;i<n;i++){pos[i*3]=rand(-w*.7,w*.7);pos[i*3+1]=rand(-h*.6,h*.6);pos[i*3+2]=rand(-800,300);sd[i]=Math.random();sz[i]=Math.random()<.12?rand(5.5,9.5):rand(2,4.6);}
  const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(pos,3));g.setAttribute('aSeed',new Float32BufferAttribute(sd,1));g.setAttribute('aSize',new Float32BufferAttribute(sz,1));
  embers=new Points(g,emberMat);embers.frustumCulled=false;scene.add(embers);
 }

 // ── Respingo de troca de página (plano em tela cheia) ─────────────────────
 // Nasce no ponto do clique/foco na cor da seção de destino, com gotas satélite e uma massa em tinta (#101c20)
 // um passo atrás; cobre a tela na saída (~0,35 s) e recua na página nova (~0,52 s). Só desenha enquanto ativo.
 const splashMat=new ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,
  uniforms:{
   uRes:{value:new Vector2(1,1)},uOrigin:{value:new Vector2(0,0)},uMaxR:{value:1000},
   uOut:{value:0},uIn:{value:0},uSeed:{value:1},
   uColor:{value:new Color(ROSE)},uInk:{value:new Color(INK)},uPaper:{value:new Color(PAPER)},
  },
  vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
  fragmentShader:`uniform vec2 uRes,uOrigin;uniform float uMaxR,uOut,uIn,uSeed;uniform vec3 uColor,uInk,uPaper;varying vec2 vUv;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){return .53*n2(p)+.27*n2(p*2.03+17.1)+.13*n2(p*4.07+31.7)+.07*n2(p*8.11+53.3);}
void main(){
 vec2 p=vec2(vUv.x,1.-vUv.y)*uRes,d=p-uOrigin;
 float dist=length(d)/max(1.,uMaxR),s=min(uRes.x,uRes.y);
 vec2 dir=d/(length(d)+.001),q=d/max(1.,s);
 float ang1=fbm(dir*2.8+uSeed),ang2=fbm(dir.yx*3.1-uSeed*1.3);
 float spike1=pow(n2(dir*11.+uSeed*2.3),2.6),spike2=pow(n2(dir.yx*10.-uSeed*1.9),2.6);
 float blotch=fbm(q*3.6+uSeed*.7)-.48,grain=n2(q*15.-uSeed)-.5,env=smoothstep(0.,.09,dist);
 float w1=((ang1-.46)*.34+spike1*.24+blotch*.22+grain*.05)*env;
 float w2=((ang2-.46)*.32+spike2*.22+blotch*.2-grain*.05)*env;
 float k=uIn>0.?1.-smoothstep(0.,1.,uIn):1.-pow(1.-uOut,1.85);
 float kInk=uIn>0.?max(0.,(1.-pow(uIn,.76))*1.04-.16):pow(smoothstep(.24,1.,uOut),1.35);
 float r1=k*1.32,r2=kInk*1.32;
 float edge1=r1+w1*(1.-smoothstep(.8,1.,k));
 float edge2=r2+w2*(1.-smoothstep(.8,1.,kInk));
 float m1=smoothstep(edge1+.007,edge1-.007,dist);
 float m2=smoothstep(edge2+.007,edge2-.007,dist);
 float band=1.-smoothstep(0.,.2,abs(dist-edge1));
 if(band>.01&&k<.93){
  vec2 c1=floor(q*16.+dir*2.),f1=fract(q*16.+dir*2.)-.5;
  float h=h21(c1+uSeed);
  vec2 o=(vec2(fract(h*13.7),fract(h*29.3))-.5)*.44;
  float dropR=step(.65,h)*(.29+.18*spike1)*band;
  m1=max(m1,smoothstep(dropR,dropR-.06,length(f1-o)));
  vec2 c2=floor(q*29.-dir*3.),f2=fract(q*29.-dir*3.)-.5;
  float h2=h21(c2+uSeed*1.7);
  float dropR2=step(.73,h2)*.24*band;
  float d2=smoothstep(dropR2,dropR2-.07,length(f2));
  m1=max(m1,d2);if(h2>.83)m2=max(m2,d2*step(dist,edge2+.14));
 }
 float a=max(m1,m2);
 if(a<.01)discard;
 vec3 col=mix(uColor,uInk,m2);
 float ring=abs(dist-r1*.58),cross=min(abs(d.x*.99-d.y*.14),abs(d.x*.14+d.y*.99))/max(1.,s);
 float line=max(smoothstep(.0035,.001,ring),smoothstep(.0022,.0006,cross)*step(dist,r1*.72));
 col=mix(col,uPaper,line*m2*(1.-smoothstep(.75,.96,k))*.55);
 gl_FragColor=vec4(col,a);
 #include <colorspace_fragment>
}`});
 const splashMesh=new Mesh(new PlaneGeometry(2,2),splashMat);
 splashMesh.frustumCulled=false;splashMesh.renderOrder=999;splashMesh.visible=false;scene.add(splashMesh);
 const OUT_DUR=.34,IN_DUR=.52;
 let spPhase:0|1|2=0,spT=0,spSwapped=false;

 // ── Tamanho, âncora e cor ─────────────────────────────────────────────────
 const at={x:0,y:0,s:200,o:1},to={x:0,y:0,s:200,o:1};let placed=false,calm=1;
 function measure(){
  const dial=document.querySelector<HTMLElement>('.home .dial-num'),numeral=document.querySelector<HTMLElement>('.story-numeral');
  const box=(el:HTMLElement|null)=>{const b=el?.getBoundingClientRect();return b&&b.width>0&&b.height>0?b:null;};
  const a=box(dial),b=box(numeral);
  if(a&&!small){to.x=a.left+a.width*.5;to.y=a.top+a.height*.52;to.s=a.height*.47;to.o=1;}
  else if(b){to.x=b.left+b.width*.5;to.y=b.top+b.height*.45;to.s=Math.min(b.height*.62,w*.24);to.o=.62;}
  else if(small){to.x=w*.86;to.y=Math.max(90,150-scrollY);to.s=w*.3;to.o=document.documentElement.dataset.screen==='home'?.8:.42;}
  else{to.x=w*.93;to.y=h*.16;to.s=Math.min(w,h)*.17;to.o=.46;}
  // Nas páginas de leitura a chuva de estilhaços rareia: a home é o palco, as internas são para ler.
  calm=document.documentElement.dataset.screen==='home'?1:.5;
  if(!placed){Object.assign(at,to);placed=true;}
 }
 function resize(){
  w=innerWidth;h=innerHeight;small=w<=700;d=h/2/Math.tan(FOV*Math.PI/360);
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,small?1.5:2));renderer.setSize(w,h,false);
  camera.aspect=w/h;camera.position.set(0,0,d);camera.far=d+2400;camera.updateProjectionMatrix();
  count=small?80:Math.min(MAX,Math.round(150+w/28));shards.count=count;
  for(let i=0;i<count;i++)seed(i);
  shards.instanceColor!.needsUpdate=true;
  emberMat.uniforms.uH.value=h*1.2;emberMat.uniforms.uD.value=d;emberMat.uniforms.uPx.value=renderer.getPixelRatio();
  (splashMat.uniforms.uRes.value as Vector2).set(w,h);
  sow();measure();
 }
 function readAccent(){
  const cs=getComputedStyle(document.documentElement),v=cs.getPropertyValue('--accent-sel').trim()||cs.getPropertyValue('--accent').trim();
  if(!v)return false;const before=accentTo.getHex();try{accentTo.set(v);}catch{return false;}return accentTo.getHex()!==before;
 }

 // ── Gestos: seleção, troca de página, ponteiro ────────────────────────────
 let boost=0,next=0,lastBurst=0,mx=-9999,my=-9999,nx=0,ny=0,level=0;
 const gust=new Vector3();
 runSplash=(x:number,y:number,cor?:string)=>{
  if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return false;
  const ox=Number.isFinite(x)?Math.max(0,Math.min(w,x)):w*.5;
  const oy=Number.isFinite(y)?Math.max(0,Math.min(h,y)):h*.5;
  (splashMat.uniforms.uOrigin.value as Vector2).set(ox,oy);
  splashMat.uniforms.uMaxR.value=Math.hypot(Math.max(ox,w-ox),Math.max(oy,h-oy));
  splashMat.uniforms.uSeed.value=rand(1,95);
  splashMat.uniforms.uOut.value=0;splashMat.uniforms.uIn.value=0;
  const c=splashMat.uniforms.uColor.value as Color;
  if(cor){try{c.set(cor);}catch{c.copy(accentTo);}}else c.copy(accentTo);
  spPhase=1;spT=0;spSwapped=false;splashMesh.visible=true;canvas.style.transition='none';canvas.style.opacity='1';
  gust.set(1700*Math.cos(6*Math.PI/180),1700*Math.sin(6*Math.PI/180),0);boost=Math.min(9,boost+3.5);
  return true;
 };
 function burst(){
  const now=performance.now();if(now-lastBurst<110)return;lastBurst=now;boost=Math.min(9,boost+4.5);
  const link=document.querySelector<HTMLElement>('.menu-item.is-painted')??document.querySelector<HTMLElement>('.menu-item.is-selected');
  const b=link?.getBoundingClientRect();if(!b||b.width===0)return;
  const ox=b.left+b.width*.9-w/2,oy=h/2-(b.top+b.height*.5),n=small?10:24;
  for(let k=0;k<n;k++){
   const i=next=(next+1)%Math.max(1,Math.floor(count*calm)),z=rand(-140,220),f=(d-z)/d,sp=rand(260,980),a=-TILT+rand(-.5,.5);
   P[i*3]=ox*f;P[i*3+1]=oy*f;P[i*3+2]=z;V[i*3]=Math.cos(a)*sp;V[i*3+1]=Math.sin(a)*sp;V[i*3+2]=rand(-120,160);
   K[i]=0;tint[i]=Math.random()<.78?0:3;paint(i);
  }
  shards.instanceColor!.needsUpdate=true;
 }
 const onStyle=new MutationObserver(()=>{if(readAccent())burst();});
 onStyle.observe(document.documentElement,{attributes:true,attributeFilter:['style']});
 const onLeave=()=>{if(spPhase===0){gust.set(1700*Math.cos(6*Math.PI/180),1700*Math.sin(6*Math.PI/180),0);boost=Math.min(9,boost+3);}};
 const onLoad=()=>{document.documentElement.classList.add('has-splash');spSwapped=true;readAccent();measure();};
 const onPointer=(e:PointerEvent)=>{mx=e.clientX;my=e.clientY;nx=mx/w*2-1;ny=my/h*2-1;};
 const onOut=()=>{mx=my=-9999;};
 let scrollTick=0;const onScroll=()=>{if(!scrollTick)scrollTick=requestAnimationFrame(()=>{scrollTick=0;measure();});};
 document.addEventListener('astro:before-preparation',onLeave);document.addEventListener('astro:page-load',onLoad);
 addEventListener('pointermove',onPointer,{passive:true});document.documentElement.addEventListener('pointerleave',onOut);
 addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',resize);
 const timer=setInterval(measure,800);

 // ── Quadro ────────────────────────────────────────────────────────────────
 const dummy=new Object3D();let raf=0,last=performance.now(),t=0,tx=0,ty=0;
 function frame(now:number){
  raf=requestAnimationFrame(frame);
  const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
  const want=sound.on?(sound.live?sound.bass:.16+.1*Math.sin(t*2.4)):0;level+=(want-level)*Math.min(1,dt*(want>level?14:5));
  boost*=Math.exp(-2.6*dt);gust.multiplyScalar(Math.exp(-3*dt));
  if(spPhase===1){
   spT+=dt;splashMat.uniforms.uOut.value=Math.min(1,spT/OUT_DUR);
   if(spT>=OUT_DUR&&(spSwapped||spT>=.44)){spPhase=2;spT=0;}
  }else if(spPhase===2){
   spT+=dt;const p=Math.min(1,spT/IN_DUR);splashMat.uniforms.uIn.value=p;
   if(p>=1){spPhase=0;splashMesh.visible=false;}
  }
  // cor da seção
  if(!accent.equals(accentTo)){accent.lerp(accentTo,Math.min(1,dt*7));if(Math.abs(accent.r-accentTo.r)+Math.abs(accent.g-accentTo.g)+Math.abs(accent.b-accentTo.b)<.004)accent.copy(accentTo);
   accentMat.color.copy(accent);bandMat.color.copy(accent);(emberMat.uniforms.uB.value as Color).copy(accent);
   for(let i=0;i<count;i++)if(tint[i]===0)shards.setColorAt(i,accent);shards.instanceColor!.needsUpdate=true;}
  // astrolábio
  const ease=Math.min(1,dt*2.4);at.x+=(to.x-at.x)*ease;at.y+=(to.y-at.y)*ease;at.s+=(to.s-at.s)*ease;at.o+=(to.o-at.o)*ease;
  arm.position.set(at.x-w/2,h/2-at.y,0);arm.scale.setScalar(at.s*(1+level*.07));
  tx+=(ny*.38-tx)*Math.min(1,dt*3);ty+=(nx*.55-ty)*Math.min(1,dt*3);arm.rotation.set(tx+.18,ty-.25,0);
  const turn=dt*(1+boost+level*2.2);for(const s of spins)s.pivot.rotateOnAxis(s.axis,s.speed*turn);
  for(const [m,base] of fades)m.opacity=base*at.o;accentMat.opacity=Math.min(1,.96*at.o+level*.3);bandMat.opacity=(.2+level*.3)*at.o;
  // estilhaços
  const push=1+level*1.6,bx=w*.62+90,by=h*.62+90,lim=count*calm;
  for(let i=0;i<count;i++){
   const j=i*3,z=P[j+2],f=d/(d-z),depth=.55+f*.6;
   const ax=(15+Math.sin(t*.3+i)*7)*depth*push+gust.x*depth,ay=(8+Math.cos(t*.27+i*1.7)*6)*depth*push+gust.y*depth;
   const sx=P[j]*f+w/2,sy=h/2-P[j+1]*f,dx=sx-mx,dy=sy-my,dist=dx*dx+dy*dy;
   if(dist<25600){const q=(1-dist/25600)*2600*dt/(Math.sqrt(dist)+1);V[j]+=dx*q;V[j+1]-=dy*q;}
   const settle=Math.min(1,dt*1.5);V[j]+=(ax-V[j])*settle;V[j+1]+=(ay-V[j+1])*settle;V[j+2]*=1-settle;
   P[j]+=V[j]*dt;P[j+1]+=V[j+1]*dt;P[j+2]+=V[j+2]*dt;
   if(P[j]>bx){P[j]=-bx;K[i]=0;}else if(P[j]<-bx){P[j]=bx;K[i]=0;}
   if(P[j+1]>by){P[j+1]=-by;K[i]=0;}else if(P[j+1]<-by){P[j+1]=by;K[i]=0;}
   K[i]+=((i<lim?1:0)-K[i])*Math.min(1,dt*3.4);
   const tumble=dt*(1+Math.min(4,Math.hypot(V[j],V[j+1])/260)+boost*.25);R[j]+=W[j]*tumble;R[j+1]+=W[j+1]*tumble;R[j+2]+=W[j+2]*tumble;
   const k=K[i]*(2-K[i])*(1+level*.22);
   dummy.position.set(P[j],P[j+1],z);dummy.rotation.set(R[j],R[j+1],R[j+2]);dummy.scale.set(S[i*2]*k,S[i*2+1]*k,1);dummy.updateMatrix();shards.setMatrixAt(i,dummy.matrix);
  }
  shards.instanceMatrix.needsUpdate=true;
  emberMat.uniforms.uTime.value=t;emberMat.uniforms.uLevel.value=level;
  if(embers){embers.position.x+=(-nx*26-embers.position.x)*Math.min(1,dt*2);embers.position.y+=(ny*18-embers.position.y)*Math.min(1,dt*2);}
  renderer.render(scene,camera);
 }
 const onVisible=()=>{cancelAnimationFrame(raf);if(!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}else if(spPhase!==0){spPhase=0;splashMesh.visible=false;}};
 document.addEventListener('visibilitychange',onVisible);
 readAccent();accent.copy(accentTo);accentMat.color.copy(accent);bandMat.color.copy(accent);(emberMat.uniforms.uB.value as Color).copy(accent);
 resize();raf=requestAnimationFrame(frame);canvas.classList.add('is-on');document.documentElement.classList.add('has-splash');

 return ()=>{
  runSplash=null;splashMesh.visible=false;splashMesh.geometry.dispose();splashMat.dispose();
  cancelAnimationFrame(raf);clearInterval(timer);onStyle.disconnect();canvas.classList.remove('is-on');document.documentElement.classList.remove('has-splash');
  document.removeEventListener('astro:before-preparation',onLeave);document.removeEventListener('astro:page-load',onLoad);
  removeEventListener('pointermove',onPointer);document.documentElement.removeEventListener('pointerleave',onOut);
  removeEventListener('scroll',onScroll);removeEventListener('resize',resize);document.removeEventListener('visibilitychange',onVisible);
  renderer.dispose();
 };
}
