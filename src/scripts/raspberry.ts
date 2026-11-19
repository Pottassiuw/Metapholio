// Raspberry Pi 4 Model B na case de duas cores (base framboesa, tampa branca), modelado à mão para a sala
// Meus interesses. Medidas aproximadas da placa em milímetros (85 × 56), sem logotipos: é um retrato do
// objeto, não uma réplica técnica. Carregado sob demanda por RaspberryPi.astro; sem WebGL, fica a
// renderização estática exportada deste mesmo modelo (public/images/interesses/raspberry-*.png).
import {
 Scene,PerspectiveCamera,WebGLRenderer,Group,Mesh,BoxGeometry,CylinderGeometry,PlaneGeometry,CanvasTexture,
 MeshStandardMaterial,MeshBasicMaterial,HemisphereLight,DirectionalLight,AmbientLight,ACESFilmicToneMapping,SRGBColorSpace,
} from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export type Pi={setOpen:(open:boolean,instant?:boolean)=>void;setAmount:(t:number,instant?:boolean)=>void;stop:()=>void;shot:(open:number,w:number,h:number)=>string};

const RASPBERRY=0xc51a4a,WHITE=0xf7f4f1;
const mat=(color:number,metal=0,rough=.6)=>new MeshStandardMaterial({color,metalness:metal,roughness:rough});

function build(){
 const root=new Group();
 const pcb=mat(0x1f5c3c,.05,.55),metal=mat(0xc9ccd2,.85,.32),black=mat(0x16181c,.1,.5),gold=mat(0xd8a64a,.9,.3);
 const blue=mat(0x1f4fbf,.1,.5),plastic=mat(0xece9e2,0,.5);
 const box=(w:number,h:number,d:number,m:MeshStandardMaterial,x:number,y:number,z:number,parent:Group=board)=>{
  const o=new Mesh(new BoxGeometry(w,h,d),m);o.position.set(x,y+h/2,z);parent.add(o);return o;
 };
 // ── Placa ───────────────────────────────────────────────
 const board=new Group();root.add(board);
 const slab=new Mesh(new RoundedBoxGeometry(85,1.4,56,2,3),pcb);slab.position.y=.7;board.add(slab);
 const top=1.4;
 for(const [x,z] of [[-39,-24.5],[19,-24.5],[-39,24.5],[19,24.5]]){
  const ring=new Mesh(new CylinderGeometry(3,3,.1,24),gold);ring.position.set(x,top+.05,z);board.add(ring);
  const hole=new Mesh(new CylinderGeometry(1.4,1.4,.12,20),black);hole.position.set(x,top+.1,z);board.add(hole);
 }
 box(15,1.6,15,metal,-8,top,-2);                      // SoC sob a tampa metálica
 box(10,1,14,black,9,top,-3);                         // 8 GB de RAM
 box(11,1.3,13,metal,-30,top,-6);                     // blindagem do Wi-Fi
 box(51,2.5,5,black,-6,top,-24);                      // GPIO: base
 const pin=new BoxGeometry(.64,6,.64);
 for(let i=0;i<20;i++)for(let r=0;r<2;r++){const p=new Mesh(pin,gold);p.position.set(-30.1+i*2.54,top+2.5+3,-25.3+r*2.54);board.add(p);}
 // Portas da borda curta: Ethernet e dois pares USB (os da direita, USB 3, têm a língua azul).
 box(21,13.5,16,metal,36,top,-18);
 box(17.5,15.5,13.5,metal,37,top,1);box(17.5,15.5,13.5,metal,37,top,19);
 for(const [z,m] of [[1,black],[19,blue]] as const)for(const y of [4,11.2]){const t=box(.4,1.8,9,m,46,top+y,z);t.position.x=45.9;}
 box(.6,9.5,12,black,46.6,top+1.5,-18).position.x=46.6;
 // Borda longa: USB-C, dois micro-HDMI e o conector de áudio.
 box(9,3.2,7.5,metal,-31,top,25);
 box(6.5,3,7.5,metal,-18,top,25);box(6.5,3,7.5,metal,-5,top,25);
 const jack=new Mesh(new CylinderGeometry(3.1,3.1,13,24),black);jack.rotation.x=Math.PI/2;jack.position.set(9,top+3.1,22.5);board.add(jack);
 box(5.6,4.4,6,black,9,top,26);
 // Conectores de câmera e display: as fitas brancas.
 box(3,5.5,22,black,-38.5,top,2);box(1,5.5,20,plastic,-37.5,top,2);
 box(22,5.5,3,black,-2,top,14);box(20,5.5,1,plastic,-2,top,13);
 // ── Case: base framboesa e tampa branca ─────────────────
 const shell=mat(RASPBERRY,0,.42),lidMat=mat(WHITE,0,.38);
 const base=new Group();root.add(base);
 const W=94,D=65,H=17,t=2.4;
 const floor=new Mesh(new RoundedBoxGeometry(W,3,D,3,4),shell);floor.position.y=-3;base.add(floor);
 const wall=(w:number,h:number,d:number,x:number,z:number)=>{const m=new Mesh(new RoundedBoxGeometry(w,h,d,2,1),shell);m.position.set(x,-1.5+h/2,z);base.add(m);};
 wall(W,H,t,0,-D/2+t/2);            // lado do GPIO
 wall(W,6,t,0,D/2-t/2);             // lado do HDMI: baixo, deixa as portas à vista
 wall(t,H,D,-W/2+t/2,0);            // lado do cartão
 wall(t,3.5,D,W/2-t/2,0);           // lado das USB: só um rebaixo
 const lid=new Group();root.add(lid);
 const lidTop=new Mesh(new RoundedBoxGeometry(W,4,D,3,4),lidMat);lid.add(lidTop);
 const lip=new Mesh(new RoundedBoxGeometry(W-6,5,D-6,2,2),lidMat);lip.position.y=-3.5;lid.add(lip);
 const closedY=H-1.5+2;lid.position.y=closedY;
 return {root,lid,closedY};
}

function shadowTexture(){
 const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d')!;
 const r=g.createRadialGradient(128,128,8,128,128,128);r.addColorStop(0,'rgba(60,8,24,.42)');r.addColorStop(.55,'rgba(60,8,24,.16)');r.addColorStop(1,'rgba(60,8,24,0)');
 g.fillStyle=r;g.fillRect(0,0,256,256);return new CanvasTexture(c);
}

export function start(canvas:HTMLCanvasElement,{still=false}={}):Pi|null{
 let renderer:WebGLRenderer;
 try{renderer=new WebGLRenderer({canvas,alpha:true,antialias:true,preserveDrawingBuffer:false});}catch{return null;}
 renderer.setClearColor(0x000000,0);renderer.toneMapping=ACESFilmicToneMapping;renderer.outputColorSpace=SRGBColorSpace;
 const scene=new Scene(),camera=new PerspectiveCamera(28,1,1,2000);
 scene.add(new HemisphereLight(0xfff6f6,0x5a1a2c,1.5),new AmbientLight(0xffffff,.35));
 const key=new DirectionalLight(0xffffff,2.6);key.position.set(-120,220,160);scene.add(key);
 const rim=new DirectionalLight(0xffd6e0,1.2);rim.position.set(180,80,-160);scene.add(rim);
 const {root,lid,closedY}=build();
 const pivot=new Group();pivot.add(root);scene.add(pivot);
 const shadow=new Mesh(new PlaneGeometry(190,150),new MeshBasicMaterial({map:shadowTexture(),transparent:true,depthWrite:false,premultipliedAlpha:true,toneMapped:false}));
 shadow.rotation.x=-Math.PI/2;shadow.position.y=-4.6;pivot.add(shadow);
 pivot.rotation.set(.0,-.62,0);
 let w=1,h=1,raf=0,visible=true,open=0,target=0,yaw=-.62,pitch=0,spin=still?0:.0016,drag:{x:number,y:number,yaw:number,pitch:number}|null=null,idle=0;
 const place=(aspect:number)=>{camera.aspect=aspect;const dist=aspect<1?260:212;camera.position.set(0,dist*.62,dist);camera.lookAt(0,15,0);camera.updateProjectionMatrix();};
 function resize(){
  const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);place(w/h);
 }
 function pose(){
  const e=open<.5?2*open*open:1-((-2*open+2)**2)/2;     // ease-in-out
  lid.position.set(-e*8,closedY+e*34,-e*18);lid.rotation.set(-e*.38,0,e*.06);
  pivot.rotation.set(pitch,yaw,0);
 }
 function frame(){
  raf=0;if(!visible)return;
  const dOpen=target-open;open+=Math.sign(dOpen)*Math.min(Math.abs(dOpen),.035);
  if(!drag&&performance.now()>idle)yaw+=spin;
  pose();renderer.render(scene,camera);
  if(Math.abs(target-open)>.001||spin||drag)raf=requestAnimationFrame(frame);
 }
 const kick=()=>{if(!raf)raf=requestAnimationFrame(frame);};
 const ro=new ResizeObserver(()=>{resize();kick();});ro.observe(canvas);
 const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting&&!document.hidden;if(visible)kick();});io.observe(canvas);
 const onVis=()=>{visible=!document.hidden;if(visible)kick();};document.addEventListener('visibilitychange',onVis);
 // Arrastar gira a case; ao soltar, o giro lento volta depois de um tempo.
 const down=(e:PointerEvent)=>{drag={x:e.clientX,y:e.clientY,yaw,pitch};canvas.setPointerCapture(e.pointerId);kick();};
 const move=(e:PointerEvent)=>{if(!drag)return;yaw=drag.yaw+(e.clientX-drag.x)*.008;pitch=Math.max(-.35,Math.min(.5,drag.pitch+(e.clientY-drag.y)*.005));};
 const up=()=>{drag=null;idle=performance.now()+2600;kick();};
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 resize();pose();kick();
 return {
  setOpen(next,instant=false){target=next?1:0;if(instant)open=target;kick();},
  // Abertura contínua (0 = fechada, 1 = tampa no alto), para a régua "abrir a caixa".
  setAmount(t,instant=false){target=Math.min(1,Math.max(0,t));if(instant)open=target;kick();},
  stop(){cancelAnimationFrame(raf);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',onVis);renderer.dispose();},
  // Exportação da renderização estática (fallback sem WebGL): só usada em desenvolvimento.
  shot(isOpen,sw,sh){
   const prev=[open,yaw,pitch] as const;open=isOpen;yaw=-.62;pitch=0;pose();
   renderer.setPixelRatio(1);renderer.setSize(sw,sh,false);place(sw/sh);renderer.render(scene,camera);
   const url=renderer.domElement.toDataURL('image/png');
   [open,yaw,pitch]=prev;resize();pose();renderer.render(scene,camera);return url;
  },
 };
}
