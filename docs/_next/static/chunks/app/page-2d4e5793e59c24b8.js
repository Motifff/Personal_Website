(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6381:function(e,t,i){Promise.resolve().then(i.bind(i,2241))},2241:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return r}});var n=i(3827),s=i(3740),l=i(8652),o=i(6237);function r(){return(0,n.jsxs)("div",{className:"Homepage",style:{position:"absolute",left:0,top:0,width:"100vw",height:"100vh",padding:24,flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-start",gap:24,display:"inline-flex"},children:[(0,n.jsxs)("div",{className:"title",style:{flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-start",gap:"25vh",display:"flex"},children:[(0,n.jsx)(o.Z,{isSubpage:!1}),(0,n.jsx)(l.Z,{isSubpage:!1})]}),(0,n.jsx)("div",{className:"background",style:{position:"absolute",left:0,top:0,zIndex:-1},children:(0,n.jsx)(s.Z,{})})]})}},6237:function(e,t,i){"use strict";i.d(t,{Z:function(){return r}});var n=i(3827),s=i(288),l=i(4090),o=i(7907);function r(e){let t=(0,o.useRouter)(),i=(0,o.usePathname)(),[r,c]=(0,l.useState)(!1);(0,l.useEffect)(()=>{let e=setTimeout(()=>{c(!0)},300);return()=>clearTimeout(e)},[]);let a=(0,s.q_)({fontSize:i.includes("!")?"2.73vh":r&&e.isSubpage?"2.73vh":"12.5vh",letterSpacing:i.includes("!")?"-1.12px":r&&e.isSubpage?"-1.12px":"-3.84px"}),u=()=>{t.replace("/main")};return(0,n.jsxs)("div",{className:"name",style:{gap:8,display:"flex",flexDirection:"row",flexWrap:"wrap"},children:[(0,n.jsxs)("div",{style:{gap:8,display:"flex",flexDirection:"row",flexWrap:"wrap"},children:[(0,n.jsx)(s.q.div,{className:"YutingChen",onClick:u,style:{justifyContent:"center",color:"#D4D5D9",fontWeight:500,lineHeight:"100%",cursor:"pointer",mixBlendMode:"plus-lighter",...a},children:"Yuting"}),(0,n.jsx)(s.q.div,{className:"YutingChen",onClick:u,style:{justifyContent:"center",color:"#D4D5D9",fontWeight:500,lineHeight:"100%",cursor:"pointer",mixBlendMode:"plus-lighter",...a},children:"Chen"})]}),(0,n.jsx)("div",{className:"Vector",style:{width:12,height:12,opacity:.8,backgroundImage:"url(".concat("/Personal_Website/_next/static/media/Vector.7570c931.svg",")"),backgroundSize:"cover"}})]})}},8652:function(e,t,i){"use strict";i.d(t,{Z:function(){return l}});var n=i(3827),s=i(7907);function l(e){let t=(0,s.useRouter)(),i=(0,s.usePathname)(),l=n=>{console.log(i),console.log(e.isSubpage),i.includes(n)||(e.isSubpage?t.replace(n+"!"):t.replace(n))};return(0,n.jsxs)("div",{className:"tab",style:{minHeight:20,gap:16,display:"flex",flexDirection:"row",flexWrap:"wrap"},children:[(0,n.jsx)("div",{className:"Home",onClick:()=>l("/home"),style:{color:"#D4D5D9",fontSize:14,fontWeight:"500",height:20,cursor:"pointer"},children:"Home"}),(0,n.jsx)("div",{style:{opacity:.4,color:"#D4D5D9",fontSize:14,fontWeight:"400",height:20},children:"/"}),(0,n.jsx)("div",{className:"Blog",onClick:()=>l("/blog"),style:{color:"#D4D5D9",fontSize:14,fontWeight:"500",height:20,cursor:"pointer"},children:"Blog"}),(0,n.jsx)("div",{style:{opacity:.4,color:"#D4D5D9",fontSize:14,fontWeight:"400",height:20},children:"/"}),(0,n.jsx)("div",{className:"About",onClick:()=>l("/about"),style:{color:"#D4D5D9",fontSize:14,fontWeight:"500",height:20,cursor:"pointer"},children:"About"}),(0,n.jsx)("div",{style:{opacity:.4,color:"#D4D5D9",fontSize:14,fontWeight:"400",height:20},children:"/"}),(0,n.jsx)("div",{className:"Contacts",onClick:()=>l("/contacts"),style:{color:"#D4D5D9",fontSize:14,fontWeight:"500",height:20,cursor:"pointer"},children:"Contacts"})]})}},3740:function(e,t,i){"use strict";var n=i(3827),s=i(7315),l=i(5372),o=i(4090),r=i(6376),c=i(7908);let a=e=>{let{vertex:t,fragment:i}=e,l=(0,o.useRef)();(0,s.C)((e,t)=>{e.clock.getElapsedTime(),l.current.material.uniforms.u_time.value+=t});let c=(0,s.A)(e=>e.viewport),a=(0,o.useMemo)(()=>({u_time:{type:"f",value:0},u_resolution:{type:"v2",value:new r.Vector2(1920,1080)}}),[]);return(0,n.jsxs)("mesh",{ref:l,children:[(0,n.jsx)("planeGeometry",{args:[c.width,c.height]}),(0,n.jsx)("shaderMaterial",{uniforms:a,vertexShader:t,fragmentShader:i})]})};t.Z=function(){let[e,t]=(0,o.useState)(""),[i,s]=(0,o.useState)("");return((0,o.useEffect)(()=>{c.Z.get("/vert.glsl").then(e=>t(e.data)),c.Z.get("/frag.glsl").then(e=>s(e.data))},[]),""==e||""==i)?null:(0,n.jsx)(l.Xz,{style:{width:"100vw",height:"100vh"},children:(0,n.jsx)(a,{vertex:e,fragment:i})})}}},function(e){e.O(0,[689,800,618,971,69,744],function(){return e(e.s=6381)}),_N_E=e.O()}]);