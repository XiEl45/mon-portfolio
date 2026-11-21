/* Alexis Carpentier — portfolio v3
   The journey to the contact: a slow climb through a night mountain, in the fog, toward concert
   lights. At the top, a camera on its tripod; we end up behind it and its screen frames the contact.
   Three.js (r149, classic build) is loaded just before this file on the home page only. */
(() => {
const $ = s => document.querySelector(s);
const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
const mq = matchMedia('(max-width:760px)');
const journey = $('#contact'), ct = $('#ct'), jt = $('#jt'), glCanvas = $('#gl');
if (!journey || !glCanvas) return;
let gl = null, glTried = false;
function smoothstep(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}
function initGL(){
  glTried=true;
  if(!window.THREE||still)return null;
  const T=THREE,low=mq.matches||innerWidth<900;
  let R;try{R=new T.WebGLRenderer({canvas:glCanvas,antialias:true,powerPreference:'high-performance'})}catch(e){return null}
  const DPR_MAX=Math.min(devicePixelRatio,low?1.25:1.5);let dpr=DPR_MAX;R.setPixelRatio(dpr);
  R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.2;
  const scene=new T.Scene(),FOG=new T.Color(0x0a0c11);
  scene.background=FOG;scene.fog=new T.FogExp2(FOG,.018);
  const cam=new T.PerspectiveCamera(45,1,.03,900);

  /* ---------- noise ---------- */
  const hash=(x,y)=>{const h=Math.sin(x*127.1+y*311.7)*43758.5453;return h-Math.floor(h)};
  const vn=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
    const a=hash(xi,yi),b=hash(xi+1,yi),c=hash(xi,yi+1),d=hash(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
  const fbm=(x,y,o=4)=>{let s=0,a=.5,f=1;for(let i=0;i<o;i++){s+=vn(x*f,y*f)*a;a*=.5;f*=2.03}return s};
  const ridged=(x,y)=>{let s=0,amp=.5,f=1,w=1;for(let o=0;o<6;o++){let n=1-Math.abs(vn(x*f,y*f)*2-1);n*=n*w;w=Math.min(1,n*1.6);s+=n*amp;amp*=.5;f*=2.07}return s};
  const SX=0,SZ=-70;
  const H=(x,z)=>{
    const wx=x+(fbm(x*.02,z*.02)-.5)*18,wz=z+(fbm(x*.02+9,z*.02+4)-.5)*18; /* domain warp: less "noise", more "mountain" */
    let h=ridged(wx*.022+3.1,wz*.022+7.7)*26-9;
    const d2=(x-SX)**2+(z-SZ)**2;h+=42*Math.exp(-d2/(2*23*23));
    h-=16*Math.exp(-(x*x)/(2*16*16))*smoothstep(-30,40,z);
    return h};
  const SY=H(SX,SZ);
  const Hs=(x,z)=>{const d=Math.hypot(x-SX,z-SZ);return d<2.4?SY:d<5.5?SY+(H(x,z)-SY)*smoothstep(2.4,5.5,d):H(x,z)};

  /* ---------- sky: gradient dome, moon glow, stars ---------- */
  const sky=new T.Mesh(new T.SphereGeometry(800,48,24),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,fog:false,
    uniforms:{uM:{value:new T.Vector3(-.25,.32,-1).normalize()}},
    vertexShader:'varying vec3 vD;void main(){vD=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform vec3 uM;varying vec3 vD;void main(){float h=clamp(vD.y,0.,1.);vec3 top=vec3(.012,.014,.02),hor=vec3(.045,.05,.065);vec3 c=mix(hor,top,pow(h,.55));float m=max(dot(vD,uM),0.);c+=vec3(.55,.6,.7)*pow(m,180.)*1.4+vec3(.1,.12,.16)*pow(m,12.)*.5;gl_FragColor=vec4(c,1.);}'}));
  scene.add(sky);
  {const n=low?500:1200,a=new Float32Array(n*3);for(let i=0;i<n;i++){const t=hash(i,11)*Math.PI*2,u=.08+hash(i,12)*.9,r=700;
    a[i*3]=Math.cos(t)*Math.sqrt(1-u*u)*r;a[i*3+1]=u*r;a[i*3+2]=Math.sin(t)*Math.sqrt(1-u*u)*r}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(a,3));
   const st=new T.Points(g,new T.PointsMaterial({color:0xcfd6e2,size:1.3,sizeAttenuation:false,transparent:true,opacity:.55,fog:false,depthWrite:false}));sky.add(st)}

  /* ---------- terrain ---------- */
  const seg=low?140:230,geo=new T.PlaneGeometry(340,340,seg,seg);geo.rotateX(-Math.PI/2);geo.translate(0,0,-60);
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++)pos.setY(i,Hs(pos.getX(i),pos.getZ(i)));
  geo.computeVertexNormals();
  const nrm=geo.attributes.normal,col=new Float32Array(pos.count*3),c=new T.Color(),
        rockA=new T.Color(0x14171c),rockB=new T.Color(0x23262c),snow=new T.Color(0x6c727c);
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),ny=nrm.getY(i);
    c.copy(rockA).lerp(rockB,fbm(x*.15,z*.15,3));
    const s=smoothstep(12+fbm(x*.08,z*.08,3)*14,38,y)*smoothstep(.62,.9,ny);
    c.lerp(snow,s*.9);col.set([c.r,c.g,c.b],i*3);
  }
  geo.setAttribute('color',new T.BufferAttribute(col,3));
  scene.add(new T.Mesh(geo,new T.MeshStandardMaterial({vertexColors:true,roughness:.92,metalness:0})));
  /* distant range, for silhouettes against the sky */
  {const g=new T.PlaneGeometry(900,260,150,40);g.rotateX(-Math.PI/2);g.translate(0,0,-330);const p=g.attributes.position;
   for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);p.setY(i,ridged(x*.008+1,z*.012+5)*95-30)}
   g.computeVertexNormals();scene.add(new T.Mesh(g,new T.MeshStandardMaterial({color:0x101319,roughness:1})))}

  /* ---------- light ---------- */
  const moon=new T.DirectionalLight(0xb3c2dc,1.05);moon.position.set(-60,90,-200);scene.add(moon);
  const front=new T.DirectionalLight(0x44506a,.32);front.position.set(30,40,120);scene.add(front);
  scene.add(new T.HemisphereLight(0x2e3644,0x050506,.35));

  /* ---------- soft round sprite (snow, glows) ---------- */
  const dot=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
    g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.35,'rgba(255,255,255,.6)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new T.CanvasTexture(cv)})();

  /* ---------- concert beams: soft halo + bright core, with dust drifting through ---------- */
  const NOISE='float h1(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x),f.y);}float fb(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n2(p);p*=2.03;a*=.5;}return s;}';
  const beamMat=(pw,k)=>new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,
    uniforms:{uI:{value:0},uT:{value:0},uC:{value:new T.Color(0xf3ecdc)}},
    vertexShader:'varying vec2 vU;varying vec3 vN;varying vec3 vV;void main(){vU=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
    fragmentShader:NOISE+'uniform float uI,uT;uniform vec3 uC;varying vec2 vU;varying vec3 vN;varying vec3 vV;void main(){float e=pow(abs(dot(vN,vV)),'+pw+');float f=pow(1.-vU.y,1.4)*smoothstep(0.,.04,vU.y);float d=.65+.55*fb(vec2(vU.x*6.,vU.y*9.-uT*.25));float a=uI*e*f*d*'+k+';gl_FragColor=vec4(uC*a,a);}'});
  const beams=[],glows=[];
  const halo=new T.CylinderGeometry(9,.35,130,48,1,true);halo.translate(0,65,0);
  const core=new T.CylinderGeometry(3.2,.12,130,32,1,true);core.translate(0,65,0);
  for(let k=0;k<5;k++){
    const g=new T.Group();g.position.set(SX+(k-2)*7.5,SY-8,SZ-17-Math.abs(k-2)*3);
    const a=new T.Mesh(halo,beamMat('1.5','.16')),b=new T.Mesh(core,beamMat('2.5','.5'));g.add(a,b);
    g.userData={ph:k*1.3,base:(k-2)*.22,m:[a.material,b.material]};scene.add(g);beams.push(g);
    const gl2=new T.Sprite(new T.SpriteMaterial({map:dot,color:0xf3ecdc,transparent:true,blending:T.AdditiveBlending,depthWrite:false,opacity:0}));
    gl2.scale.set(9,9,1);g.add(gl2);glows.push(gl2);
  }
  const warm=new T.PointLight(0xf1e2c4,0,40,2);warm.position.set(SX,SY+5,SZ-9);scene.add(warm);

  /* ---------- fog: drifting cloud layers (animated noise), the valley banks and a sea of clouds ---------- */
  const fogMat=(o,s,col)=>new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,fog:false,
    uniforms:{uT:{value:0},uO:{value:o},uS:{value:s},uCam:{value:new T.Vector3()},uC:{value:new T.Color(col)}},
    vertexShader:'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:NOISE+'uniform float uT,uO,uS;uniform vec3 uCam,uC;varying vec3 vW;void main(){vec2 p=vW.xz*uS;float q=fb(p+vec2(uT*.012,uT*.006));float f=fb(p*1.6+q*1.8-vec2(uT*.01,0.));float a=smoothstep(.32,.8,f)*uO;a*=smoothstep(.4,5.,abs(uCam.y-vW.y));float d=length(uCam.xz-vW.xz);a*=1.-smoothstep(90.,200.,d);gl_FragColor=vec4(uC*(.75+.5*f),a);}'});
  const fogs=[];
  [[1,.55,.03],[7,.45,.026],[14,.35,.022],[SY-17,.7,.018]].slice(0,low?3:4).forEach(([y,o,s],k)=>{
    const m=new T.Mesh(new T.PlaneGeometry(420,420),fogMat(o,s,k>=3?0x7d8696:0x5f6777));m.rotation.x=-Math.PI/2;m.position.set(0,y,k>=3?-90:-10);scene.add(m);fogs.push(m)});

  /* ---------- snow ---------- */
  const N=low?900:2400,sp=new Float32Array(N*3),sv=new Float32Array(N);
  for(let i=0;i<N;i++){sp[i*3]=(hash(i,7)-.5)*80;sp[i*3+1]=hash(i,8)*80;sp[i*3+2]=70-hash(i,9)*150;sv[i]=.6+hash(i,10)*.8}
  const sGeo=new T.BufferGeometry();sGeo.setAttribute('position',new T.BufferAttribute(sp,3));
  const snowPts=new T.Points(sGeo,new T.PointsMaterial({map:dot,color:0xe9e6df,size:low?.28:.22,transparent:true,opacity:.75,depthWrite:false}));scene.add(snowPts);

  /* ---------- reflections for the camera (a tiny studio, baked once) ---------- */
  const pm=new T.PMREMGenerator(R),es=new T.Scene();
  es.add(new T.Mesh(new T.SphereGeometry(20,16,8),new T.MeshBasicMaterial({color:0x07080a,side:T.BackSide})));
  const panel=(x,y,z,w,h,cl,i)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(cl).multiplyScalar(i),side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m)};
  panel(0,9,-8,14,4,0xf3ecdc,2.4);panel(-10,4,4,4,9,0x9fb0cc,1.1);panel(9,2,6,3,6,0xffffff,.5);panel(0,-6,8,12,2,0x30343c,1);
  const env=pm.fromScene(es,.03).texture;

  /* ---------- the camera: a mirrorless body, built from rounded pieces ---------- */
  const rig=new T.Group();
  const M=(o)=>new T.MeshPhysicalMaterial(Object.assign({envMap:env,envMapIntensity:1},o));
  const body=M({color:0x1b1c20,roughness:.42,metalness:.15,clearcoat:.35,clearcoatRoughness:.5}),
        rub=M({color:0x0d0d0f,roughness:.82,envMapIntensity:.35}),
        metal=M({color:0x8d9097,roughness:.28,metalness:1}),
        glass=M({color:0x05080d,roughness:.04,metalness:.2,clearcoat:1,clearcoatRoughness:0,envMapIntensity:2.2}),
        legM=M({color:0x1e2024,roughness:.35,metalness:.6}),
        alu=M({color:0x45484e,roughness:.3,metalness:.9});
  function rbox(w,h,d,r,b=.02){const s=new T.Shape(),W2=w/2-b,H2=h/2-b,rr=Math.min(r,W2,H2);
    s.moveTo(-W2+rr,-H2);s.lineTo(W2-rr,-H2);s.quadraticCurveTo(W2,-H2,W2,-H2+rr);s.lineTo(W2,H2-rr);s.quadraticCurveTo(W2,H2,W2-rr,H2);
    s.lineTo(-W2+rr,H2);s.quadraticCurveTo(-W2,H2,-W2,H2-rr);s.lineTo(-W2,-H2+rr);s.quadraticCurveTo(-W2,-H2,-W2+rr,-H2);
    const g=new T.ExtrudeGeometry(s,{depth:d-2*b,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:5,curveSegments:10});g.translate(0,0,-(d-2*b)/2);return g}
  const put=(g,m,x,y,z,rx=0,ry=0,rz=0,par=rig)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);par.add(o);return o};
  const cyl=(r1,r2,h,s=48)=>new T.CylinderGeometry(r1,r2,h,s);
  put(rbox(1.2,.68,.36,.07,.025),body,0,0,0);                         /* body */
  put(rbox(.3,.74,.44,.13,.04),rub,.47,-.02,-.1);                      /* grip (front/right seen from the back) */
  put(rbox(.44,.22,.34,.05,.02),body,-.33,.43,.0);                     /* viewfinder hump */
  put(rbox(.34,.19,.08,.07,.02),rub,-.33,.42,.2);                      /* eyecup */
  put(cyl(.1,.1,.05),metal,.24,.36,.02);                               /* mode dial */
  put(cyl(.1,.1,.012,48),body,.24,.39,.02);
  put(cyl(.04,.045,.035,24),metal,.46,.38,-.17);                       /* shutter button */
  put(cyl(.07,.07,.025,40),body,.46,.355,-.17);
  put(new T.BoxGeometry(.16,.02,.14),metal,-.05,.35,.0);               /* hot shoe */
  put(rbox(.98,.62,.03,.04,.008),rub,-.06,-.02,.19);                   /* screen bezel */
  /* lens: mount, barrel, ribbed zoom ring, front ring, glass */
  const L=new T.Group();L.position.set(-.08,-.02,-.18);L.rotation.x=Math.PI/2;rig.add(L);
  put(cyl(.33,.33,.04),metal,0,-.02,0,0,0,0,L);
  put(cyl(.3,.31,.12),body,0,-.1,0,0,0,0,L);
  const rib=put(cyl(.315,.315,.14,96),rub,0,-.23,0,0,0,0,L);
  const ribG=new T.BoxGeometry(.012,.13,.01);for(let k=0;k<48;k++){const a=k/48*Math.PI*2;put(ribG,rub,Math.cos(a)*.318,-.23,Math.sin(a)*.318,0,-a,0,L)}
  put(cyl(.29,.3,.12),body,0,-.36,0,0,0,0,L);
  put(cyl(.3,.29,.025),metal,0,-.43,0,0,0,0,L);
  const gl3=new T.SphereGeometry(.26,48,16,0,Math.PI*2,0,.55);put(gl3,glass,0,-.4,0,Math.PI,0,0,L).scale.set(1,.35,1);
  /* back screen: a viewfinder that frames the contact */
  const scv=document.createElement('canvas');scv.width=1600;scv.height=1000;const g2=scv.getContext('2d');
  const grd=g2.createRadialGradient(800,500,100,800,500,900);grd.addColorStop(0,'#101216');grd.addColorStop(1,'#07080a');g2.fillStyle=grd;g2.fillRect(0,0,1600,1000);
  g2.strokeStyle='rgba(233,230,223,.6)';g2.lineWidth=5;
  [[90,90,1,1],[1510,90,-1,1],[90,910,1,-1],[1510,910,-1,-1]].forEach(([x,y,a,b])=>{g2.beginPath();g2.moveTo(x+a*110,y);g2.lineTo(x,y);g2.lineTo(x,y+b*110);g2.stroke()});
  g2.strokeStyle='rgba(233,230,223,.1)';g2.lineWidth=2;
  [533,1067].forEach(x=>{g2.beginPath();g2.moveTo(x,140);g2.lineTo(x,860);g2.stroke()});[333,667].forEach(y=>{g2.beginPath();g2.moveTo(140,y);g2.lineTo(1460,y);g2.stroke()});
  g2.fillStyle='#c8443a';g2.beginPath();g2.arc(150,170,13,0,7);g2.fill();
  g2.fillStyle='rgba(233,230,223,.85)';g2.font='600 38px Archivo, sans-serif';g2.fillText('REC',180,184);g2.textAlign='right';g2.fillText('4K · 24P',1450,184);
  g2.fillText('S-LOG3',1450,840);g2.textAlign='left';g2.fillText('00:00:00:00',150,840);
  const scTex=new T.CanvasTexture(scv);scTex.encoding=T.sRGBEncoding;scTex.anisotropy=8;
  const SW=.9,SH=.5625;
  const screen=put(new T.PlaneGeometry(SW,SH),new T.MeshBasicMaterial({map:scTex,toneMapped:false}),-.06,-.02,.207);
  /* tripod: ball head, plate, centre column, spider, three two-section legs that open toward the ground */
  put(new T.BoxGeometry(.5,.05,.36),alu,0,-.365,0);
  put(new T.SphereGeometry(.085,32,16),metal,0,-.45,0);
  put(cyl(.07,.09,.12),alu,0,-.55,0);
  put(cyl(.04,.04,.42,24),legM,0,-.8,0);
  put(cyl(.13,.12,.09),alu,0,-.93,0);
  const ROOT=-.95,GROUND=-2.15,up=new T.Vector3(0,1,0);
  const seg2=(a,b,r,m)=>{const d=new T.Vector3().subVectors(b,a),len=d.length(),o=new T.Mesh(cyl(r,r,len,20),m);
    o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(up,d.normalize());rig.add(o);return o};
  for(let k=0;k<3;k++){
    const an=k*Math.PI*2/3+Math.PI/2,top=new T.Vector3(Math.cos(an)*.1,ROOT,Math.sin(an)*.1),foot=new T.Vector3(Math.cos(an)*.95,GROUND,Math.sin(an)*.95);
    const mid=top.clone().lerp(foot,.55);
    seg2(top,mid,.034,legM);seg2(mid,foot,.024,legM);
    const cl=new T.Mesh(cyl(.042,.042,.06,20),alu);cl.position.copy(mid);cl.quaternion.setFromUnitVectors(up,foot.clone().sub(top).normalize());rig.add(cl);
    const ft=new T.Mesh(new T.SphereGeometry(.04,16,8),rub);ft.position.copy(foot);rig.add(ft);
  }
  rig.position.set(SX,SY+2.15,SZ);scene.add(rig);
  const fill=new T.PointLight(0xdfe3ea,0,9,2);scene.add(fill);
  const scrC=()=>{rig.updateMatrixWorld();return screen.getWorldPosition(new T.Vector3())};

  /* ---------- flight path ---------- */
  const safe=(x,y,z,m=5)=>new T.Vector3(x,Math.max(y,H(x,z)+m),z);
  let pathCam,pathLook;
  function buildPaths(){
    const s=scrC(),aspect=innerWidth/innerHeight,vf=2*Math.tan(T.MathUtils.degToRad(cam.fov/2));
    const dEnd=Math.max(SH/(vf*.82),SW/(vf*aspect*.92));
    pathCam=new T.CatmullRomCurve3([safe(0,4,78),safe(-12,9,44),safe(10,16,10),safe(-6,26,-24),safe(4,SY+7,-50,4),
      new T.Vector3(s.x+.9,s.y+1.4,s.z+5.5),new T.Vector3(s.x+.2,s.y+.4,s.z+2.2),new T.Vector3(s.x,s.y,s.z+dEnd)],false,'centripetal');
    pathLook=new T.CatmullRomCurve3([new T.Vector3(0,14,0),new T.Vector3(0,22,-40),new T.Vector3(0,SY+4,-70),
      new T.Vector3(s.x,s.y+.5,s.z-6),new T.Vector3(s.x,s.y+.05,s.z-1),s.clone()],false,'centripetal');
  }
  function size(){const w=glCanvas.clientWidth,h=glCanvas.clientHeight;if(!w||!h)return;R.setSize(w,h,false);
    cam.fov=w/h<1?62:45;cam.aspect=w/h;cam.updateProjectionMatrix();buildPaths()}
  size();addEventListener('resize',size);
  let time=0;const tmp=new T.Vector3();
  /* if frames get slow, render at a lower resolution rather than stutter */
  let ema=16,frames=0;
  function render(p,dt){
    ema+=(dt-ema)*.08;if(++frames>45&&ema>21&&dpr>1){dpr=Math.max(1,dpr-.25);R.setPixelRatio(dpr);size();frames=0}
    time+=dt/1000;
    const q=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
    cam.position.copy(pathCam.getPointAt(q));
    pathLook.getPointAt(q,tmp);cam.lookAt(tmp);
    const sway=(1-smoothstep(.8,1,p))*.12;cam.position.x+=Math.sin(time*.5)*sway;cam.position.y+=Math.sin(time*.37)*sway*.6;
    sky.position.copy(cam.position);
    const bi=smoothstep(.05,.75,p);
    beams.forEach((b,k)=>{b.rotation.z=b.userData.base+Math.sin(time*.35+b.userData.ph)*.28;b.rotation.x=-.32+Math.sin(time*.27+b.userData.ph*2)*.12;
      b.userData.m.forEach(m=>{m.uniforms.uI.value=.75+bi*.85;m.uniforms.uT.value=time});glows[k].material.opacity=.25+bi*.45});
    warm.intensity=bi*.5;
    fill.position.copy(cam.position);fill.intensity=smoothstep(.75,.95,p)*1.3;
    scene.fog.density=.02-smoothstep(.35,.9,p)*.011;
    fogs.forEach(f=>{f.material.uniforms.uT.value=time;f.material.uniforms.uCam.value.copy(cam.position)});
    const a=sGeo.attributes.position.array;for(let i=0,j=0;i<a.length;i+=3,j++){a[i+1]-=dt*.0016*sv[j];a[i]+=Math.sin(time*.6+j)*.002;if(a[i+1]<-5)a[i+1]+=85}sGeo.attributes.position.needsUpdate=true;
    R.render(scene,cam);
  }
  /* compile every shader now, so the first visible frame does not freeze the scroll */
  R.compile(scene,cam);render(0,16);
  return {render};
}
/* The journey plays by itself, like a film, and the section holds on to the scroll:
   - as soon as it takes up most of the screen, the page glides to fill the screen with it (scrolling
     during that glide is absorbed, so it always lands exactly);
   - while it is on screen, the wheel / trackpad / finger drive the camera (forward or back) and never
     move the page; the film picks up on its own a moment after the visitor lets go;
   - at either end, leaving takes a deliberate push (one firm scroll), not an accidental notch.
   Leave the section and it rewinds for the next visit. */
const TRAVEL=still?0:11000, HAND=1300, PUSH=420, TOUCH_PUSH=110;
let jk=0,jkT=0,playing=false,settled=false,glide=null,handUntil=0,ty=null;
let esc={dir:0,amt:0,t:0},released=0,quietUntil=0; /* released: direction (+1 down, -1 up) the page may scroll in */
const maxY=()=>document.documentElement.scrollHeight-innerHeight;
const zone=()=>{const r=journey.getBoundingClientRect();return r.top<innerHeight*.8&&r.bottom>innerHeight*.4};
/* a glide continues the visitor's own movement: it starts at speed and settles softly (ease-out),
   timed on the clock (not on frame counts) so a dropped frame never makes it stutter */
function glideTo(to,after){const d=Math.abs(to-scrollY);glide={from:scrollY,to,start:performance.now(),dur:still?0:Math.min(1500,750+d*.9),after}}
function settle(){const r=journey.getBoundingClientRect();if(Math.abs(r.top)>4&&!glide){glideTo(journey.offsetTop)}settled=true;if(jkT<1)playing=true}
/* leaving is a glide too: up lands on the last project, down on the footer; inputs during the glide
   (and the tail of a trackpad fling right after it) are absorbed so nothing jolts */
function leave(dir){
  glideTo(dir<0?Math.max(0,journey.offsetTop-innerHeight):maxY(),()=>{released=dir;quietUntil=performance.now()+420});
}
/* one input of size d (in journey units, > 0 forward) and raw pixels px; returns true to block the page */
function input(d,px,push){
  if(still)return false;
  const dir=Math.sign(d)||0;
  if(released){if(dir===released)return false;released=0}
  if(!zone())return false;
  if(glide)return true;
  const r=journey.getBoundingClientRect();
  if(Math.abs(r.top)>4){settle();return true}
  const now=performance.now();
  if((d>0&&jkT>=1)||(d<0&&jkT<=0)){
    if(esc.dir!==dir||now-esc.t>450)esc={dir,amt:0,t:now};
    esc.amt+=Math.abs(px);esc.t=now;
    if(esc.amt>push){esc={dir:0,amt:0,t:0};leave(dir);return true}
    return true;
  }
  esc={dir:0,amt:0,t:0};
  jkT=Math.max(0,Math.min(1,jkT+d));playing=true;handUntil=now+HAND;return true;
}
addEventListener('wheel',e=>{
  if(e.ctrlKey)return;
  if(glide||performance.now()<quietUntil){e.preventDefault();return}
  const u=e.deltaMode===1?40:e.deltaMode===2?innerHeight:1,px=e.deltaY*u;
  if(input(px/2600,px,PUSH))e.preventDefault();
},{passive:false});
addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',e=>{
  if(ty===null)return;const y=e.touches[0].clientY,d=ty-y;ty=y;
  if(glide||performance.now()<quietUntil){e.preventDefault();return}
  if(input(d/1500,d,TOUCH_PUSH))e.preventDefault();
},{passive:false});
addEventListener('touchend',()=>{ty=null},{passive:true});
addEventListener('keydown',e=>{
  if(!zone()||e.target.closest('input,textarea,a,button'))return;
  const k={ArrowDown:1,PageDown:1,' ':1,ArrowUp:-1,PageUp:-1}[e.key];if(!k)return;
  if(input(k*.08,k*PUSH*.6,PUSH))e.preventDefault();
});
function journeySkip(){jk=jkT=1;playing=false;settled=true;glide=null;released=0}
function journeyStep(dt){
  const r=journey.getBoundingClientRect();
  if(!glTried&&r.top<innerHeight*2.5)gl=initGL();
  if(r.top>innerHeight*.98){jk=jkT=0;playing=false;settled=false}
  if(!zone()){released=0}
  /* glide the page (in or out); runs even while the section slides off screen */
  if(glide){const g=glide,t=g.dur?Math.min(1,(performance.now()-g.start)/g.dur):1,e=1-Math.pow(1-t,3.2);scrollTo(0,g.from+(g.to-g.from)*e);if(t>=1){glide=null;if(g.after)g.after()}}
  if(r.bottom<0||r.top>innerHeight)return;
  /* first arrival: fill the screen and start the film */
  if(!settled&&!released&&r.top<innerHeight*.55&&r.bottom>innerHeight*.45)settle();
  /* the film runs unless the visitor's hand is on it */
  if(playing&&performance.now()>handUntil){jkT=TRAVEL?Math.min(1,jkT+dt/TRAVEL):1}
  if(jkT>=1)playing=false;
  jk+=(jkT-jk)*(still?1:1-Math.pow(.86,dt/16.7));if(Math.abs(jkT-jk)<.0003)jk=jkT;
  if(gl)gl.render(jk,dt);
  const c=gl?smoothstep(.93,.995,jk):smoothstep(.6,.9,jk);ct.style.setProperty('--c',c.toFixed(3));ct.classList.toggle('live',c>.6);
  jt.style.setProperty('--t',(1-jk*5).toFixed(3));
}
window.journeySkip = journeySkip;
function warmUp(){if(glTried)return;const t=performance.now();gl=initGL();window.__glBuildMs=Math.round(performance.now()-t)}
const idle=window.requestIdleCallback||(f=>setTimeout(f,1));
addEventListener('load',()=>setTimeout(()=>idle(warmUp,{timeout:2500}),900));
window.journeyStep = journeyStep;
})();
