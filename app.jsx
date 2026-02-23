const { useState, useEffect, useRef } = React;

const C = { green:"#86BC25", black:"#000", bg:"#0A0A0A", card:"#141414", border:"#222", gray600:"#666", gray400:"#999", gray200:"#CCC", white:"#FFF", blue:"#0097A9", blueHover:"#00ADC2", blueDark:"#007C89" };
const FP = C.blue, SLS = C.green, CERT = "#2D6A2E", POC = "#7DD3FC", NA = "N/A";

const F = "'Open Sans',sans-serif";
const B = { fontFamily:F, fontWeight:800 };
const S = { fontFamily:F, fontWeight:600 };
const R = { fontFamily:F, fontWeight:400 };
const L = { fontFamily:F, fontWeight:300 };

const Logo = ({ h = 48 }) => (
  React.createElement('svg', { height: h, viewBox: "0 0 400 80", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement('style', null, `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');`),
    React.createElement('text', { x: "0", y: "64", fill: "#FFF", style: { fontFamily: "'Open Sans',Impact,'Arial Black',sans-serif", fontWeight: 800, fontSize: "76px", letterSpacing: "-2px" } }, "Deloitte"),
    React.createElement('circle', { cx: "322", cy: "56", r: "10", fill: "#86BC25" })
  )
);

const Breadcrumb = ({ items }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 24px", borderBottom:`1px solid ${C.border}` }}>
    {items.map((item, i) => (
      <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
        {i > 0 && <span style={{ color:C.gray600, fontSize:12 }}>›</span>}
        {item.onClick
          ? <button onClick={item.onClick} style={{ color:C.gray400, fontSize:12, ...R, cursor:"pointer", background:"none", border:"none" }}>{item.label}</button>
          : <span style={{ color:C.white, fontSize:12, ...S }}>{item.label}</span>}
      </div>
    ))}
  </div>
);

const AnimSphere = ({ size = 500 }) => {
  const ref = useRef(null), raf = useRef(0);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"), dpr = window.devicePixelRatio || 1;
    cv.width = size * dpr; cv.height = size * dpr; ctx.scale(dpr, dpr);
    const cx = size/2, cy = size/2, r = size*0.4;
    let t = 0, run = true;
    const arcs = Array.from({length:90},()=>({tl:(Math.random()-0.3)*Math.PI*0.8,ph:Math.random()*Math.PI*2,sp:0.3+Math.random()*0.6,ln:0.15+Math.random()*0.35,br:0.4+Math.random()*0.6}));
    const nds = Array.from({length:60},()=>({tl:(Math.random()-0.3)*Math.PI*0.8,ph:Math.random()*Math.PI*2,sp:0.2+Math.random()*0.5,sz:1+Math.random()*2.5}));
    const pr = (th,tl) => {const x=r*Math.cos(th),y=r*Math.sin(th)*Math.cos(tl),z=r*Math.sin(th)*Math.sin(tl);return{x:cx+x,y:cy-y,z};};
    const draw = () => {
      if(!run) return; ctx.clearRect(0,0,size,size); t+=0.008;
      const g=ctx.createRadialGradient(cx,cy,r*0.2,cx,cy,r*1.3);g.addColorStop(0,"rgba(134,188,37,0.04)");g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.fillRect(0,0,size,size);
      for(const a of arcs){const s0=a.ph+t*a.sp,e0=s0+a.ln*Math.PI;ctx.beginPath();let st=false;for(let i=0;i<=30;i++){const th=s0+(e0-s0)*(i/30),p=pr(th,a.tl),d=(p.z+r)/(2*r);if(d<0.15){st=false;continue;}ctx.strokeStyle=`rgba(134,188,37,${Math.max(0,a.br*(0.1+d*0.7)*(1-Math.abs(i/30-0.5)*1.5))})`;ctx.lineWidth=0.5+d*1.8;if(!st){ctx.moveTo(p.x,p.y);st=true;}else ctx.lineTo(p.x,p.y);}ctx.stroke();}
      for(const n of nds){const th=n.ph+t*n.sp,p=pr(th,n.tl),d=(p.z+r)/(2*r);if(d<0.2)continue;const a2=0.2+d*0.8;ctx.beginPath();ctx.arc(p.x,p.y,n.sz+3,0,Math.PI*2);ctx.fillStyle=`rgba(134,188,37,${a2*0.2})`;ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,n.sz*d,0,Math.PI*2);ctx.fillStyle=`rgba(${120+d*60},${200+d*50},30,${a2})`;ctx.fill();}
      raf.current=requestAnimationFrame(draw);};draw();
    return()=>{run=false;cancelAnimationFrame(raf.current);};
  },[size]);
  return <canvas ref={ref} style={{width:size,height:size}}/>;
};

const OrganicSphere = ({ size = 320 }) => {
  const ref = useRef(null), raf = useRef(0);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"), dpr = window.devicePixelRatio||1;
    cv.width=size*dpr;cv.height=size*dpr;ctx.scale(dpr,dpr);
    const cx=size/2,cy=size/2,r=size*0.36;let t=0,run=true;
    const dots=Array.from({length:600},()=>({la:(Math.random()-0.5)*Math.PI,lo:Math.random()*Math.PI*2,j:0.92+Math.random()*0.16,sz:0.5+Math.random()*2,br:0.3+Math.random()*0.7}));
    const ten=Array.from({length:45},()=>({sla:-Math.PI*0.3-Math.random()*Math.PI*0.3,slo:Math.random()*Math.PI*2,cu:-0.5-Math.random()*1.5,ln:0.3+Math.random()*0.6,sp:0.1+Math.random()*0.15,w:1+Math.random()*2,br:0.4+Math.random()*0.6}));
    const bumps=[];for(let i=0;i<8;i++){const la2=(Math.random()-0.3)*Math.PI*0.7,lo2=Math.random()*Math.PI*2,bR=0.15+Math.random()*0.2;for(let j=0;j<35;j++){bumps.push({la:la2+(Math.random()-0.5)*bR,lo:lo2+(Math.random()-0.5)*bR,el:1+Math.random()*0.12,sz:0.8+Math.random()*1.5,br:0.5+Math.random()*0.5});}}
    const pr=(la,lo,rd)=>{const y=rd*Math.sin(la),rr=rd*Math.cos(la);return{x:cx+rr*Math.cos(lo),y:cy-y,z:rr*Math.sin(lo)};};
    const draw=()=>{if(!run)return;ctx.clearRect(0,0,size,size);t+=0.005;
    const g=ctx.createRadialGradient(cx,cy+r*0.3,0,cx,cy+r*0.3,r*1.5);g.addColorStop(0,"rgba(134,188,37,0.06)");g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.fillRect(0,0,size,size);
    const rot=t*0.3;
    for(const d of dots){const p=pr(d.la,d.lo+rot,r*d.j);const dp=(p.z+r)/(2*r);if(dp<0.1)continue;ctx.beginPath();ctx.arc(p.x,p.y,d.sz*dp,0,Math.PI*2);ctx.fillStyle=`rgba(134,188,37,${d.br*(0.1+dp*0.7)})`;ctx.fill();}
    for(const b of bumps){const p=pr(b.la,b.lo+rot,r*b.el);const dp=(p.z+r*b.el)/(2*r*b.el);if(dp<0.15)continue;const a=b.br*(0.15+dp*0.75);ctx.beginPath();ctx.arc(p.x,p.y,b.sz*dp+2,0,Math.PI*2);ctx.fillStyle=`rgba(134,188,37,${a*0.25})`;ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,b.sz*dp,0,Math.PI*2);ctx.fillStyle=`rgba(${100+dp*80},${200+dp*55},${20+dp*20},${a})`;ctx.fill();}
    for(const tr of ten){ctx.beginPath();let st=false;for(let i=0;i<=30;i++){const f=i/30,la=tr.sla+f*tr.ln*Math.PI,lo=tr.slo+rot+f*tr.cu,ext=1+f*f*0.6,p=pr(la,lo,r*ext),dp=(p.z+r*ext)/(2*r*ext);if(dp<0.05){st=false;continue;}ctx.strokeStyle=`rgba(134,188,37,${Math.max(0,tr.br*(0.1+dp*0.5)*(1-f*0.7))})`;ctx.lineWidth=tr.w*(1-f*0.5)*dp;if(!st){ctx.moveTo(p.x,p.y);st=true;}else ctx.lineTo(p.x,p.y);}ctx.stroke();}
    raf.current=requestAnimationFrame(draw);};draw();
    return()=>{run=false;cancelAnimationFrame(raf.current);};
  },[size]);
  return <canvas ref={ref} style={{width:size,height:size}}/>;
};

const Btn = ({children,onClick,active,size="md",disabled}) => {
  const pad = size==="lg"?"14px 40px":size==="sm"?"8px 20px":"12px 28px";
  const fs = size==="lg"?16:size==="sm"?13:14;
  return <button onClick={onClick} disabled={disabled} style={{borderRadius:50,padding:pad,fontSize:fs,background:C.blue,color:C.white,border:"none",boxShadow:active?`0 0 20px ${C.blue}66`:"none",...S,opacity:disabled?0.3:1,cursor:disabled?"not-allowed":"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{if(!disabled)e.currentTarget.style.background=C.blueHover;}} onMouseLeave={e=>{if(!disabled)e.currentTarget.style.background=C.blue;}}>{children}</button>;
};

const StageIcon = ({stage,size=100}) => {
  const gid=`sg${stage}${Math.random().toString(36).slice(2,5)}`;
  const c1=stage===0?"#00D4AA":stage===1?"#86BC25":"#00B8D4";
  const c2=stage===0?"#007C6A":stage===1?"#4A8C00":"#0077A9";
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs><linearGradient id={gid} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/></linearGradient></defs>
      <circle cx="50" cy="50" r="46" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.3"/>
      <circle cx="50" cy="50" r="38" stroke={`url(#${gid})`} strokeWidth="0.8" opacity="0.15"/>
      {stage===0&&<><circle cx="44" cy="44" r="16" stroke={`url(#${gid})`} strokeWidth="3"/><line x1="56" y1="56" x2="70" y2="70" stroke={`url(#${gid})`} strokeWidth="4" strokeLinecap="round"/><circle cx="40" cy="40" r="2" fill={`url(#${gid})`} opacity="0.8"/><line x1="40" y1="34" x2="40" y2="46" stroke={`url(#${gid})`} strokeWidth="1" opacity="0.4"/><line x1="34" y1="40" x2="46" y2="40" stroke={`url(#${gid})`} strokeWidth="1" opacity="0.4"/></>}
      {stage===1&&<><line x1="50" y1="75" x2="50" y2="28" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round"/><path d="M40 38 L50 24 L60 38" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M50 55 C38 52,30 44,32 36 C34 44,40 48,50 50" stroke={`url(#${gid})`} strokeWidth="2" fill={`url(#${gid})`} opacity="0.3"/><path d="M50 45 C62 42,68 34,66 28 C64 36,58 40,50 42" stroke={`url(#${gid})`} strokeWidth="2" fill={`url(#${gid})`} opacity="0.3"/><path d="M35 75 L65 75" stroke={`url(#${gid})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/></>}
      {stage===2&&<><path d="M50 20 C44 28,42 40,42 52 L50 56 L58 52 C58 40,56 28,50 20Z" stroke={`url(#${gid})`} strokeWidth="2.5" fill={`url(#${gid})`} fillOpacity="0.15" strokeLinejoin="round"/><path d="M42 48 L34 58 L42 54" stroke={`url(#${gid})`} strokeWidth="2" fill={`url(#${gid})`} fillOpacity="0.2" strokeLinejoin="round"/><path d="M58 48 L66 58 L58 54" stroke={`url(#${gid})`} strokeWidth="2" fill={`url(#${gid})`} fillOpacity="0.2" strokeLinejoin="round"/><circle cx="50" cy="38" r="4" stroke={`url(#${gid})`} strokeWidth="1.5" fill={`url(#${gid})`} fillOpacity="0.1"/><path d="M46 56 C46 62,48 70,50 76 C52 70,54 62,54 56" stroke="#FF8C00" strokeWidth="1.5" opacity="0.7"/><path d="M48 56 C48 60,49 66,50 70 C51 66,52 60,52 56" fill="#FFD700" opacity="0.5"/></>}
    </svg>);
};

const ProfileIcon = ({size=52}) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <defs><linearGradient id="pig" x1="0" y1="0" x2="36" y2="36"><stop offset="0%" stopColor={C.blue}/><stop offset="100%" stopColor="#005F6B"/></linearGradient></defs>
    <rect rx="10" width="36" height="36" fill="url(#pig)" opacity="0.15"/>
    <circle cx="18" cy="13" r="5" stroke={C.blue} strokeWidth="1.8" fill="none"/>
    <path d="M8 30 C8 23 12 20 18 20 C24 20 28 23 28 30" stroke={C.blue} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  </svg>
);

/* SF & TITLE DATA */
const SF_DATA = {
  "Software Engineering":{"L20-L25":["Associate Software Engineer","Software Engineer I"],"L30-L35":["Associate Software Engineer II","Software Engineer II"],"L40-L45":["Associate Software Engineer III","Software Engineer III"],"L50-L55":["Lead Software Engineer I","Lead Software Engineer II"]},
  "SDET":{"L20-L25":["Associate SDET","SDET I"],"L30-L35":["Associate SDET II","SDET II"],"L40-L45":["Associate SDET III","SDET III"],"L50-L55":["Lead SDET I","Lead SDET II"]},
  "Integration Engineering":{"L20-L25":["Associate Integration Engineer","Integration Engineer I"],"L30-L35":["Associate Integration Engineer II","Integration Engineer II"],"L40-L45":["Associate Integration Engineer III","Integration Engineer III"],"L50-L55":["Lead Integration Engineer I","Lead Integration Engineer II"]},
  "DevOps":{"L20-L25":["Associate DevOps Engineer","DevOps Engineer I"],"L30-L35":["Associate DevOps Engineer II","DevOps Engineer II"],"L40-L45":["Associate DevOps Engineer III","DevOps Engineer III"],"L50-L55":["Lead DevOps Engineer I","Lead DevOps Engineer II"]},
  "Security Engineering":{"L20-L25":["Associate Security Engineer","Security Engineer I"],"L30-L35":["Associate Security Engineer II","Security Engineer II"],"L40-L45":["Associate Security Engineer III","Security Engineer III"],"L50-L55":["Lead Security Engineer I","Lead Security Engineer II"]},
  "Cloud Integrated Infrastructure":{"L20-L25":["Associate Cloud Integrated Infrastructure Engineer","Cloud Integrated Infrastructure Engineer I"],"L30-L35":["Associate Cloud Integrated Infrastructure Engineer II","Cloud Integrated Infrastructure Engineer II"],"L40-L45":["Associate Cloud Integrated Infrastructure Engineer III","Cloud Integrated Infrastructure Engineer III"],"L50-L55":["Lead Cloud Integrated Infrastructure Engineer I","Lead Cloud Integrated Infrastructure Engineer II"]},
  "Engineering Managed Services":{"L20-L25":["Associate Managed Services Engineer","Managed Services Engineer I"],"L30-L35":["Associate Managed Services Engineer II","Managed Services Engineer II"],"L40-L45":["Associate Managed Services Engineer III","Managed Services Engineer III"],"L50-L55":["Lead Managed Services Engineer I","Lead Managed Services Engineer II"]},
  "UX & Design":{"L20-L25":["Associate UX / UI Designer","UX / UI Designer I"],"L30-L35":["Associate UI Designer II","UX Designer II"],"L40-L45":["Associate UX Designer III","UX Designer III"],"L50-L55":["Lead UX Designer I","Lead UX Designer II"]},
  "Delivery Management":{"L20-L25":["Associate Delivery Management Engineer","Delivery Management Engineer I"],"L30-L35":["Associate Delivery Management Engineer II","Delivery Management Engineer II"],"L40-L45":["Associate Delivery Management Engineer III","Delivery Management Engineer III"],"L50-L55":["Engineering Delivery Manager I","Engineering Delivery Manager II"]},
  "Product Management":{"L20-L25":["Associate Product Analyst","Product Analyst"],"L30-L35":["Associate Product Specialist","Product Specialist"],"L40-L45":["Associate Senior Product Specialist","Senior Product Specialist"],"L50-L55":["Product Manager I","Product Manager II"]},
  "Engineering Management":{"L20-L25":["N/A","N/A"],"L30-L35":["N/A","N/A"],"L40-L45":["N/A","Senior Engineering Management Specialist"],"L50-L55":["Engineering Manager I","Engineering Manager II"]},
  "Architecture":{"L20-L25":["N/A","N/A"],"L30-L35":["N/A","N/A"],"L40-L45":["N/A","Associate Architect"],"L50-L55":["Lead Managed Services Engineer I","Lead Architect"]},
};
const SF_LIST = Object.keys(SF_DATA);
const LEVELS = ["L20-L25","L30-L35","L40-L45","L50-L55"];
const STAGES = [{label:"Exploring",period:"Year 1"},{label:"Growing",period:"Years 2-3"},{label:"Thriving",period:"Year(s) 3+"}];
const LEARNING_CATS = [{label:"Formal Programs",color:FP},{label:"Specialized Learning Sprints",color:SLS},{label:"Certifications",color:CERT},{label:"Personalized Offering Curriculum",color:POC}];
const getTitle = (sf, lv) => { const t=SF_DATA[sf]?.[lv]; if(!t)return"Coming soon"; const v=t.filter(x=>x!=="N/A"); return v.length?v.join(" / "):"N/A"; };

/* PATHWAY DATA — US SE L30-L35 */
const US_SE_DATA = {
  "Focused Learning":{
    0:[
      {n:"Solving Problems with Data: Getting Started",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0007301247"},
      {n:"Introduction to Logical Structuring and Storyboarding (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001613680%3FfromAutoSuggest%3Dtrue"},
      {n:"Tech Savvy Generative AI Jumpstart",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001171179?classId=dowbt000000000244983"},
      {n:"The Complete Python Bootcamp From Zero to Hero in Python",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/complete-python-bootcamp/"},
      {n:"NVIDIA: Generative AI Explained",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894098"},
      {n:"GenAI 101 & Prompt Engineering",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001645110%3FfromAutoSuggest%3Dtrue"},
    ],
    1:[
      {n:"Solving Problems with Data: Analyze Data for Insights",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0009175133"},
      {n:"Discover the Enduring Human Capabilities (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001036671"},
      {n:"Tech Savvy Agentic AI Jumpstart",c:SLS,cat:"Specialized Learning Sprints",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/GLDTA-187"},
      {n:"Anthropic Certification Sprint",c:SLS,cat:"Specialized Learning Sprints"},
      {n:"AWS Certified Cloud Practitioner (CLF-C02)",c:CERT,cat:"Certifications",link:"https://aws.amazon.com/certification/certified-cloud-practitioner/"},
      {n:"Azure Fundamentals (AZ-900)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification"},
      {n:"Google Cloud Digital Leader",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/cloud-digital-leader"},
      {n:"AWS Certified AI Practitioner (AIF-C01)",c:CERT,cat:"Certifications",link:"https://aws.amazon.com/certification/certified-ai-practitioner/"},
      {n:"Azure AI Fundamentals (AI 900)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/?practice-assessment-type=certification"},
      {n:"Azure Developer Associate (AZ-204)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/?practice-assessment-type=certification"},
      {n:"Google Associate Cloud Engineer",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/cloud-engineer"},
      {n:"Google Cloud Generative AI Leader",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/generative-ai-leader"},
      {n:"Oracle Certified Professional: Java SE 17 Developer",c:CERT,cat:"Certifications",link:"https://education.oracle.com/products/trackp_OCPJSE17"},
      {n:"Trustworthy Artificial Intelligence (TWAI) Framework",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001722104?regId=regdw000000107296716"},
      {n:"Tech Savvy AI Jumpstart",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001783298"},
      {n:"Python for Absolute Beginners",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001087318%3FfromAutoSuggest%3Dtrue"},
      {n:"Prompt Engineering for All: Self-Paced Pathway",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/learningeventdetail/crtfy000000005278626"},
      {n:"Prompt Engineering 101 Workshop",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001626831"},
      {n:"Prompt by KX Interactive User Guide",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001419852?regId=regdw000000091182889"},
      {n:"NVIDIA: Generative AI Sales Advisor Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894116"},
      {n:"Low-Code/No-Code Workshop: Skills Creation Tool from Sidekick",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_wdk/E103PRD0001/index/prelogin.rdf?spfUrl=%2FSaba%2FWeb_spf%2FE103PRD0001%2Fcommon%2Fledetail%2FUSDTA-1257%2Flatestversion"},
      {n:"Introduction to Agentic AI (Microlearning)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001662858?classId=dowbt000000000303578"},
      {n:"Getting Started with Sidekick",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_wdk/E103PRD0001/index/prelogin.rdf?spfUrl=%2FSaba%2FWeb_spf%2FE103PRD0001%2Fcommon%2Fleclassview%2Fdowbt-0004209646"},
      {n:"Discovering M365 Copilot",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001273365"},
      {n:"Deloitte's AI Assist Demo",c:POC,cat:"Personalized Offering Curriculum",link:"https://becurious.edcast.eu/insights/ECL-366537c5-7e01-441e-bd4d-301524bc1a8a"},
      {n:"Angular Deep Dive - Beginner to Advanced (Angular 20)",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/angular-course/"},
      {n:"Angular - The Complete Guide (2025 Edition)",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/the-complete-guide-to-angular-2/"},
      {n:"AI 101-Foundations of AI",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/dowbt-0007514908"},
      {n:"Advanced React: Design System, Design Patterns, Performance (Udemy)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001280498%3FfromAutoSuggest%3Dtrue"},
    ],
    2:[
      {n:"Technology Trust Ethics (TTE) Foundational Training",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001583714%3FfromAutoSuggest%3Dtrue"},
      {n:"Solving Problems with Data: Visualization and Presentation",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0007337211"},
      {n:"Building Powerful Networks & Connections (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001637443"},
      {n:"NVIDIA: Global Systems Integrator (GSI) Technologies Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/283953587"},
      {n:"NVIDIA: Generative AI Technical AI Advisor Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894117"},
      {n:"Microsoft Copilot Masterclass - Microsoft 365 Copilot Office (Udemy)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001250828"},
      {n:"Master Microservices with Java, Spring Boot and Spring Cloud",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/"},
      {n:"Intermediate to Advanced Python with 10 OOP Projects",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/the-python-pro-course/"},
      {n:"GPS Generative AI Essentials Program",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-963"},
      {n:"GPS Agentic AI Essentials: Module II",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-955"},
      {n:"GPS Agentic AI Essentials: Module I",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-953"},
      {n:"DevOps, CI/CD (Continuous Integration/Delivery) for Beginners",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/ci-cd-devops/"},
      {n:"Design Microservices Architecture with Patterns & Principles",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/design-microservices-architecture-with-patterns-principles/"},
      {n:"Complete UI/UX Design Course 2025: Figma + AI + Real Project",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/complete-uiux-design-course-figma-ai-real-project/"},
      {n:".NET 8 Microservices: DDD, CQRS, Vertical/Clean Architecture",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/microservices-architecture-and-implementation-on-dotnet/"},
    ],
  },
  "Milestones":{0:[{n:"CDx: Explore (US)",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-ACL/SitePages/ConsultingServices.aspx?env=WebView"}],1:NA,2:NA},
  "Onboarding":{0:[
    {n:"DLaunch",c:FP,cat:"Formal Programs",link:"https://develop.deloitte.com/dlhp-new-hire-learning#subpage/new-hire-journey"},
    {n:"EHO Accelerate",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-PPSF/SitePages/W2DC.aspx?env=WebView"},
    {n:"EHO Activate",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-PPSF/SitePages/W2DC.aspx?env=WebView"},
    {n:"US Engineering Bootcamp (Full-Stack)",c:FP,cat:"Formal Programs"},
    {n:"ATLAS Onboarding Program (US)",c:FP,cat:"Formal Programs",link:"https://becurious.edcast.eu/teams/fy23-atlas-onboarding-program"},
  ],1:NA,2:NA},
};

/* PATHWAY DATA — India SE L30-L35 */
const INDIA_SE_DATA = {
  "Focused Learning":{
    0:[
      {n:"Solving Problems with Data: Getting Started",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0007301247"},
      {n:"Introduction to Logical Structuring and Storyboarding (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001613680%3FfromAutoSuggest%3Dtrue"},
      {n:"Tech Savvy Agentic AI Jumpstart",c:SLS,cat:"Specialized Learning Sprints",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/GLDTA-187"},
      {n:"The Complete Python Bootcamp From Zero to Hero in Python",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/complete-python-bootcamp/"},
      {n:"Tech Savvy Generative AI Jumpstart",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001171179?classId=dowbt000000000244983"},
      {n:"NVIDIA: Generative AI Explained",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894098"},
      {n:"GenAI 101 & Prompt Engineering (USI)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001645110%3FfromAutoSuggest%3Dtrue"},
    ],
    1:[
      {n:"Solving Problems with Data: Analyze Data for Insights",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0009175133"},
      {n:"Discover the Enduring Human Capabilities (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001036671"},
      {n:"Anthropic Certification Sprint",c:SLS,cat:"Specialized Learning Sprints"},
      {n:"Oracle Certified Professional: Java SE 17 Developer",c:CERT,cat:"Certifications",link:"https://education.oracle.com/products/trackp_OCPJSE17"},
      {n:"Google Cloud Generative AI Leader",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/generative-ai-leader"},
      {n:"Google Cloud Digital Leader",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/cloud-digital-leader"},
      {n:"Google Associate Cloud Engineer",c:CERT,cat:"Certifications",link:"https://cloud.google.com/learn/certification/cloud-engineer"},
      {n:"Azure Fundamentals (AZ-900)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification"},
      {n:"Azure Developer Associate (AZ-204)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/?practice-assessment-type=certification"},
      {n:"Azure AI Fundamentals (AI 900)",c:CERT,cat:"Certifications",link:"https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/?practice-assessment-type=certification"},
      {n:"AWS Certified Cloud Practitioner (CLF-C02)",c:CERT,cat:"Certifications",link:"https://aws.amazon.com/certification/certified-cloud-practitioner/"},
      {n:"AWS Certified AI Practitioner (AIF-C01)",c:CERT,cat:"Certifications",link:"https://aws.amazon.com/certification/certified-ai-practitioner/"},
      {n:"Trustworthy Artificial Intelligence (TWAI) Framework",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001722104?regId=regdw000000107296716"},
      {n:"Tech Savvy AI Jumpstart",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001783298"},
      {n:"Python for Absolute Beginners",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001087318%3FfromAutoSuggest%3Dtrue"},
      {n:"Prompt Engineering for All: Self-Paced Pathway",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/learningeventdetail/crtfy000000005278626"},
      {n:"Prompt Engineering 101 Workshop",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001626831"},
      {n:"Prompt by KX Interactive User Guide",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001419852?regId=regdw000000091182889"},
      {n:"NVIDIA: Generative AI Sales Advisor Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894116"},
      {n:"Low-Code/No-Code Workshop: Skills Creation Tool from Sidekick",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_wdk/E103PRD0001/index/prelogin.rdf?spfUrl=%2FSaba%2FWeb_spf%2FE103PRD0001%2Fcommon%2Fledetail%2FUSDTA-1257%2Flatestversion"},
      {n:"Introduction to Agentic AI (Microlearning)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001662858?classId=dowbt000000000303578"},
      {n:"Getting Started with Sidekick",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_wdk/E103PRD0001/index/prelogin.rdf?spfUrl=%2FSaba%2FWeb_spf%2FE103PRD0001%2Fcommon%2Fleclassview%2Fdowbt-0004209646"},
      {n:"Discovering M365 Copilot",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001273365"},
      {n:"Deloitte's AI Assist Demo",c:POC,cat:"Personalized Offering Curriculum",link:"https://becurious.edcast.eu/insights/ECL-366537c5-7e01-441e-bd4d-301524bc1a8a"},
      {n:"Angular Deep Dive - Beginner to Advanced (Angular 20)",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/angular-course/"},
      {n:"Angular - The Complete Guide (2025 Edition)",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/the-complete-guide-to-angular-2/"},
      {n:"AI 101-Foundations of AI",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/dowbt-0007514908"},
      {n:"Advanced React: Design System, Design Patterns, Performance (Udemy)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001280498%3FfromAutoSuggest%3Dtrue"},
    ],
    2:[
      {n:"Technology Trust Ethics (TTE) Foundational Training",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001583714%3FfromAutoSuggest%3Dtrue"},
      {n:"Solving Problems with Data: Visualization and Presentation",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/leclassview/virtc-0007337211"},
      {n:"Building Powerful Networks & Connections (Virtual)",c:FP,cat:"Formal Programs",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail/cours000000001637443"},
      {n:"NVIDIA: Global Systems Integrator (GSI) Technologies Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/283953587"},
      {n:"NVIDIA: Generative AI Technical AI Advisor Curriculum",c:POC,cat:"Personalized Offering Curriculum",link:"https://develop.deloitte.com/deloitte-ai-academy#subpage/am/overlay/288894117"},
      {n:"Microsoft Copilot Masterclass - Microsoft 365 Copilot Office (Udemy)",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/app/me/learningeventdetail;spf-url=common%2Fledetail%2Fcours000000001250828"},
      {n:"Master Microservices with Java, Spring Boot and Spring Cloud",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/"},
      {n:"Intermediate to Advanced Python with 10 OOP Projects",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/the-python-pro-course/"},
      {n:"GPS Generative AI Essentials Program",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-963"},
      {n:"GPS Agentic AI Essentials: Module II",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-955"},
      {n:"GPS Agentic AI Essentials: Module I",c:POC,cat:"Personalized Offering Curriculum",link:"https://sabacloud.deloitteresources.com/Saba/Web_spf/E103PRD0001/common/ledetail/USGPS-953"},
      {n:"DevOps, CI/CD (Continuous Integration/Delivery) for Beginners",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/ci-cd-devops/"},
      {n:"Design Microservices Architecture with Patterns & Principles",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/design-microservices-architecture-with-patterns-principles/"},
      {n:"Complete UI/UX Design Course 2025: Figma + AI + Real Project",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/complete-uiux-design-course-figma-ai-real-project/"},
      {n:".NET 8 Microservices: DDD, CQRS, Vertical/Clean Architecture",c:POC,cat:"Personalized Offering Curriculum",link:"https://deloittedevelopment.udemy.com/course/microservices-architecture-and-implementation-on-dotnet/"},
    ],
  },
  "Milestones":{0:[{n:"CDx: Explore (USI)",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-ACL/SitePages/ConsultingServices.aspx?env=WebView"}],1:NA,2:NA},
  "Onboarding":{0:[
    {n:"USI Engineering Bootcamp (Full-Stack)",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-ACL/SitePages/ConsultingServices.aspx?env=WebView"},
    {n:"EHO Activate",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-PPSF/SitePages/W2DC.aspx?env=WebView"},
    {n:"EHO Accelerate",c:FP,cat:"Formal Programs",link:"https://amedeloitte.sharepoint.com/sites/DOL-c-US-PPSF/SitePages/W2DC.aspx?env=WebView"},
    {n:"DLaunch",c:FP,cat:"Formal Programs",link:"https://develop.deloitte.com/dlhp-new-hire-learning#subpage/new-hire-journey"},
    {n:"ATLAS Onboarding Program (USI)",c:FP,cat:"Formal Programs",link:"https://becurious.edcast.eu/teams/fy23-atlas-onboarding-program"},
  ],1:NA,2:NA},
};

const COMING_SOON = {
  "Focused Learning":{0:[],1:[],2:[]},
  "Milestones":{0:[],1:NA,2:NA},
  "Onboarding":{0:[],1:NA,2:NA},
};

/* APP */
function App() {
  const [scr,setScr] = useState("landing");
  const [region,setRegion] = useState(null);
  const [level,setLevel] = useState(null);
  const [sf,setSf] = useState(null);
  const [stage,setStage] = useState(null);
  const [fade,setFade] = useState(true);

  const go = (s,o={}) => { setFade(false); setTimeout(()=>{ setScr(s); if(o.region!==undefined)setRegion(o.region); if(o.level!==undefined)setLevel(o.level); if(o.sf!==undefined)setSf(o.sf); if(o.stage!==undefined)setStage(o.stage); setFade(true); },200); };

  const title = sf && level ? getTitle(sf,level) : "";
  const prof = [{k:"Position Title",v:title||"\u2014"},{k:"Location",v:region||"US"},{k:"JF",v:"Engineering & Product"},{k:"SF",v:sf||"\u2014"}];

  const getPD = () => {
    if (sf==="Software Engineering" && level==="L30-L35") {
      if (region==="US") return US_SE_DATA;
      if (region==="India") return INDIA_SE_DATA;
    }
    return COMING_SOON;
  };

  const BackBtn = ({onClick,label="Back"}) => (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:8,marginTop:32,borderRadius:50,color:C.gray400,padding:"8px 20px",border:`1px solid ${C.border}`,...S,fontSize:13,background:"none",transition:"all 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.color=C.blue;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray400;}}>{"← "+label}</button>
  );

  const getBreadcrumbs = () => {
    const items=[{label:"Home",onClick:()=>go("landing")}];
    if(scr==="region") items.push({label:"Region"});
    else if(scr==="level"){items.push({label:"Region",onClick:()=>go("region")});items.push({label:"Level ("+region+")"});}
    else if(scr==="subfam"){items.push({label:"Region",onClick:()=>go("region")});items.push({label:"Level",onClick:()=>go("level")});items.push({label:"Sub-Family ("+level+")"});}
    else if(scr==="career"){items.push({label:"Region",onClick:()=>go("region")});items.push({label:"Level",onClick:()=>go("level")});items.push({label:sf,onClick:()=>go("subfam")});items.push({label:"Career Stage"});}
    else if(scr==="pathway"){items.push({label:"Region",onClick:()=>go("region")});items.push({label:"Level",onClick:()=>go("level")});items.push({label:sf,onClick:()=>go("subfam")});items.push({label:"Career Stage",onClick:()=>go("career")});items.push({label:STAGES[stage].label});}
    return items;
  };

  const pg = {minHeight:"100vh",display:"flex",flexDirection:"column",background:C.black};

  return (
    <div style={{...R,minHeight:"100vh",background:C.bg}}>
    <div style={{transition:"opacity 0.3s",opacity:fade?1:0}}>

    {scr==="landing"&&(<div style={pg}>
      <div style={{padding:"24px 32px"}}><Logo/></div>
      <div style={{flex:1,display:"flex",alignItems:"center",padding:"0 64px",gap:16,flexWrap:"wrap"}}>
        <div style={{flex:1,maxWidth:500}}>
          <h1 style={{fontSize:48,color:C.white,lineHeight:1.15,...L,margin:"0 0 20px"}}>Welcome to the<br/><span style={{color:C.green,...B}}>Engineering & Product</span><br/>Learning Pathways Portal</h1>
          <p style={{fontSize:16,marginBottom:32,lineHeight:1.7,color:C.gray400,maxWidth:460,...R}}>Deep Dive to Your Growth & Development Journey. Explore personalized learning pathways aligned to your role, level, and career stage.</p>
          <Btn size="lg" onClick={()=>go("region")}>Get Started</Btn>
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"center"}}><AnimSphere size={500}/></div>
      </div>
      <div style={{padding:24,fontSize:12,color:C.gray400,...R}}>{"\u00A9 2026 Deloitte Development LLC. All rights reserved."}</div>
    </div>)}

    {scr==="region"&&(<div style={pg}>
      <div style={{padding:"24px 32px"}}><Logo/></div>
      <Breadcrumb items={getBreadcrumbs()}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px",textAlign:"center"}}>
        <OrganicSphere size={320}/>
        <h2 style={{fontSize:30,marginTop:24,marginBottom:12,color:C.white,...L}}>Select Your <span style={B}>Region</span></h2>
        <p style={{marginBottom:4,fontSize:14,color:C.gray400,maxWidth:480,...R}}>Aligning on where Job Family plays a role in learning is a critical input to the future G&D Strategy.</p>
        <p style={{fontSize:14,fontStyle:"italic",marginBottom:40,color:C.green,...R}}>Choose your region to explore the learning pathway.</p>
        <div style={{display:"flex",gap:20}}><Btn size="lg" onClick={()=>go("level",{region:"US"})}>United States</Btn><Btn size="lg" onClick={()=>go("level",{region:"India"})}>India</Btn></div>
        <BackBtn onClick={()=>go("landing")}/>
      </div>
    </div>)}

    {scr==="level"&&(<div style={pg}>
      <div style={{padding:"24px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><Logo/><span style={{fontSize:14,padding:"6px 16px",borderRadius:50,background:C.blue+"20",color:C.blue,border:"1px solid "+C.blue+"40",...S}}>{region}</span></div>
      <Breadcrumb items={getBreadcrumbs()}/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",gap:48,flexWrap:"wrap"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h2 style={{fontSize:30,marginBottom:8,color:C.white,...L}}>Select Your <span style={B}>Level</span></h2>
          <p style={{fontSize:14,fontStyle:"italic",marginBottom:40,color:C.green,...R}}>Select your level to view the recommended learning pathway.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,maxWidth:520,width:"100%"}}>{LEVELS.map(lv=><Btn key={lv} onClick={()=>go("subfam",{level:lv})}>{lv}</Btn>)}</div>
          <BackBtn onClick={()=>go("region")} label="Back to region"/>
        </div>
        <div><OrganicSphere size={260}/></div>
      </div>
    </div>)}

    {scr==="subfam"&&(<div style={pg}>
      <div style={{padding:"24px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><Logo/><div style={{display:"flex",gap:8}}><span style={{fontSize:14,padding:"6px 16px",borderRadius:50,background:C.blue+"20",color:C.blue,border:"1px solid "+C.blue+"40",...S}}>{region}</span><span style={{fontSize:14,padding:"6px 16px",borderRadius:50,background:C.green+"20",color:C.green,border:"1px solid "+C.green+"40",...S}}>{level}</span></div></div>
      <Breadcrumb items={getBreadcrumbs()}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
        <h2 style={{fontSize:30,marginBottom:8,color:C.white,...L}}>Select Your <span style={B}>Sub-Family</span></h2>
        <p style={{fontSize:14,fontStyle:"italic",marginBottom:40,color:C.green,...R}}>Choose your Engineering & Product sub-family to see your personalized pathway.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:800,width:"100%"}}>
          {SF_LIST.map(s=>{
            const titles=SF_DATA[s]?.[level]; const hasLv=!!titles; const isSE3035=s==="Software Engineering"&&level==="L30-L35";
            const avail=hasLv?titles.some(t=>t!=="N/A"):true; const soon=!isSE3035;
            return(<button key={s} onClick={()=>{if(avail)go("career",{sf:s});}} disabled={!avail}
              style={{borderRadius:12,padding:16,textAlign:"left",background:C.card,border:"1px solid "+C.border,opacity:avail?(soon?0.55:1):0.25,cursor:avail?"pointer":"not-allowed",transition:"all 0.2s"}}
              onMouseEnter={e=>{if(avail){e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.boxShadow="0 0 20px "+C.blue+"20";}}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:14,marginBottom:4,color:C.white,...S}}>{s}</div>
              <div style={{fontSize:12,color:soon?"#F59E0B":C.gray400,...R}}>{!avail?"Level not activated":soon?"Coming soon":titles.filter(t=>t!=="N/A").join(" / ")}</div>
            </button>);
          })}
        </div>
        <BackBtn onClick={()=>go("level")} label="Back to levels"/>
      </div>
    </div>)}

    {scr==="career"&&(<div style={pg}>
      <div style={{padding:"24px 32px"}}><Logo/></div>
      <Breadcrumb items={getBreadcrumbs()}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"0 56px"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px 32px",marginBottom:16,padding:"12px 16px",borderRadius:8,background:C.card,border:"1px solid "+C.border}}>{prof.map(p=><span key={p.k} style={{fontSize:12,...R}}><span style={{color:C.gray400}}>{p.k}: </span><span style={{color:C.green,...S}}>{p.v}</span></span>)}</div>
        <p style={{fontSize:14,fontStyle:"italic",marginBottom:16,color:C.green,...R}}>Select a career stage to explore focus areas and suggested learning.</p>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"relative",width:"100%",maxWidth:900,height:400}}>
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 900 400" fill="none" preserveAspectRatio="none">
              <path d="M0 360 C120 360,200 310,320 270 C440 230,500 170,620 130 C740 90,820 45,900 25" stroke={C.green} strokeWidth="3" opacity="0.35"/>
              <path d="M0 360 C120 360,200 310,320 270 C440 230,500 170,620 130 C740 90,820 45,900 25 L900 400 L0 400 Z" fill={C.green} opacity="0.03"/>
            </svg>
            {[{left:"18%",bottom:"5%"},{left:"50%",bottom:"30%"},{left:"82%",bottom:"56%"}].map((pos,i)=>(
              <div key={i} style={{position:"absolute",...pos,transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",background:C.card+"E0",border:"1px solid "+C.border,backdropFilter:"blur(8px)",minWidth:170,transition:"all 0.2s"}}
                  onClick={()=>go("pathway",{stage:i})}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.boxShadow="0 0 28px "+C.blue+"30";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                  <StageIcon stage={i} size={95}/>
                  <span style={{fontSize:16,marginTop:8,color:C.white,...B}}>{STAGES[i].label}</span>
                  <span style={{fontSize:12,marginTop:4,marginBottom:12,color:C.gray400,...R}}>{STAGES[i].period}</span>
                  <Btn size="sm" onClick={e=>{e.stopPropagation();go("pathway",{stage:i});}}>{STAGES[i].period}</Btn>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BackBtn onClick={()=>go("subfam")} label="Back to sub-family"/>
        <div style={{height:24}}/>
      </div>
    </div>)}

    {scr==="pathway"&&(<div style={pg}>
        <div style={{padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid "+C.border}}>
          <Logo/>
          <div style={{display:"flex",gap:8}}>{STAGES.map((s,i)=>(<button key={i} onClick={()=>setStage(i)} style={{borderRadius:50,fontSize:12,padding:"8px 16px",background:stage===i?C.blue:"transparent",color:stage===i?C.white:C.blue,border:"1.5px solid "+(stage===i?C.blue:C.blue+"40"),...S,transition:"all 0.2s"}}>{s.label+" \u2013 "+s.period}</button>))}</div>
        </div>
        <Breadcrumb items={getBreadcrumbs()}/>
        <div style={{flex:1,display:"flex",gap:20,padding:20}}>
          <div style={{width:192,flexShrink:0,borderRadius:12,padding:16,background:C.card,border:"1px solid "+C.border,display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><ProfileIcon size={52}/></div>
            {prof.map(p=><div key={p.k} style={{marginBottom:8}}><div style={{color:C.gray600,fontSize:10,textTransform:"uppercase",letterSpacing:"0.5px",...S}}>{p.k}</div><div style={{color:C.white,fontSize:12,...S}}>{p.v}</div></div>)}
            <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid "+C.border,display:"flex",justifyContent:"center"}}><StageIcon stage={stage} size={72}/></div>
            <div style={{textAlign:"center",marginTop:4,fontSize:10,color:C.green,...B}}>{STAGES[stage].label}</div>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:50,fontSize:12,marginBottom:16,background:C.blue,color:C.white,...B}}><StageIcon stage={stage} size={18}/>{STAGES[stage].label+" \u2013 "+STAGES[stage].period}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {Object.entries(getPD()).map(([cat,sd])=>{
                const items=sd[stage]; const isOB=cat==="Onboarding"; const empty=Array.isArray(items)&&items.length===0;
                return(<div key={cat}>
                  {isOB&&<div style={{marginBottom:4,marginLeft:168,fontSize:12,fontStyle:"italic",color:"#F59E0B",...S}}>{"\u26A0 New Experienced or Campus Hires ONLY"}</div>}
                  <div style={{display:"flex",gap:10,alignItems:"stretch"}}>
                    <div style={{width:160,flexShrink:0,borderRadius:8,padding:12,display:"flex",alignItems:"center",background:C.green+"10",border:"1px solid "+C.green+"18"}}><span style={{fontSize:12,color:C.green,...B}}>{cat}</span></div>
                    <div style={{flex:1,borderRadius:8,padding:12,background:C.card,border:"1px solid "+C.border,opacity:(items===NA||empty)?0.4:1}}>
                      {items===NA||empty
                        ? <span style={{fontSize:12,fontStyle:"italic",color:C.gray600,...R}}>{items===NA?"N/A":"Coming soon"}</span>
                        : <div style={{display:"flex",flexDirection:"column",gap:6}}>
                            {items.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:10,height:10,borderRadius:5,flexShrink:0,background:t.c}}/>
                              {t.link
                                ? <a href={t.link} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:C.gray200,...R,textDecoration:"none",transition:"color 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.color=C.blue;e.currentTarget.style.textDecoration="underline";}} onMouseLeave={e=>{e.currentTarget.style.color=C.gray200;e.currentTarget.style.textDecoration="none";}}>{t.n+" \u2197"}</a>
                                : <span style={{fontSize:12,color:C.gray200,...R}}>{t.n}</span>}
                              {t.cat&&<span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:t.c+"20",color:t.c,...S}}>{t.cat}</span>}
                            </div>))}
                          </div>}
                    </div>
                  </div>
                </div>);
              })}
            </div>
            <div style={{marginTop:20,borderRadius:8,padding:10,display:"flex",flexWrap:"wrap",alignItems:"center",gap:12,background:C.card,border:"1px solid "+C.border}}>
              <span style={{fontSize:12,color:C.white,...B}}>Learning Category:</span>
              {LEARNING_CATS.map(lc=>(<div key={lc.label} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:5,background:lc.color}}/><span style={{fontSize:12,color:C.gray400,...R}}>{lc.label}</span></div>))}
            </div>
          </div>
        </div>
        <div style={{padding:"0 20px 20px"}}><button onClick={()=>go("career")} style={{fontSize:14,color:C.gray600,...S,background:"none",border:"none",cursor:"pointer",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.blue} onMouseLeave={e=>e.currentTarget.style.color=C.gray600}>{"\u2190 Back to career stages"}</button></div>
      </div>)}

    </div></div>
  );
}
