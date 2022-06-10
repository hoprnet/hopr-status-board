import{r as h,d as $,j as t,R as N,a as q,b as f,F as _,T as D,c as X,B as O,e as R,f as T,g as E,h as Y,I as ee,i as k,k as te,l as y,m as ne,C as se,W as oe,n as re,o as ce,S as ae,p as S,u as ie,q as le,s as de,L as pe,t as ue,v as he,w as me}from"./vendor.e840d27e.js";const fe=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}};fe();const C=async(e,n,c,s)=>await(await fetch(`${e}${c}`,{headers:n}).catch(r=>({json:()=>s}))).json(),x=async(e,n,c,s,r)=>(await C(e,n,c,s))[r],j=(e,n)=>c=>x(e,n,"/api/v2/account/balances",Promise.resolve({[c]:""}),c),H=(e,n)=>c=>x(e,n,"/api/v2/account/addresses",Promise.resolve({[c]:""}),c),ge=(e,n)=>H(e,n)("hopr"),Ee=(e,n)=>H(e,n)("native"),ve=(e,n)=>j(e,n)("hopr"),be=(e,n)=>j(e,n)("native"),we=(e,n)=>C(e,n,"/api/v2/channels",Promise.resolve({})),ye=(e,n)=>C(e,n,"/api/v2/node/info",Promise.resolve({})),Te=async(e,n)=>{const c=performance.now(),s=await await C(e,n,"/api/v2/node/version",Promise.resolve(0)),r=performance.now();return s?r-c:0},Ce=(e,n)=>C(e,n,"/api/v2/tickets/statistics",Promise.resolve({})),Se=(e,n)=>C(e,n,"/api/v2/node/version",Promise.resolve("")),Ne=e=>{const[n,c]=h.exports.useState(),[s,r]=h.exports.useState({status:"DISCONNECTED"}),o=h.exports.useRef(),m=$.debounce(a=>{c(a)},1e3),v=()=>{console.info("WS CONNECTED"),r(a=>({status:"CONNECTED",error:a.error}))},b=()=>{console.info("WS DISCONNECTED"),r(a=>({status:"DISCONNECTED",error:a.error})),m(+new Date)},g=a=>{console.error("WS ERROR",a),r({status:"DISCONNECTED",error:String(a)}),m(+new Date)};return h.exports.useEffect(()=>{if(!(typeof window>"u")){o.current&&(console.info("WS Disconnecting.."),o.current.close(1e3,"Shutting down"));try{const a=new URL(e.wsEndpoint);a.protocol=a.protocol==="https:"?"wss":"ws",e.securityToken&&(a.search=`?apiToken=${e.securityToken}`),console.info("WS Connecting.."),o.current=new WebSocket(a),o.current.addEventListener("open",v),o.current.addEventListener("close",b),o.current.addEventListener("error",g)}catch{console.error("URL is invalid",e.wsEndpoint)}return()=>{!o.current||(o.current.removeEventListener("open",v),o.current.removeEventListener("close",b),o.current.removeEventListener("error",g))}}},[e.wsEndpoint,e.securityToken]),{state:s,socketRef:o}},ke=({wsEndpoint:e,securityToken:n})=>{const[c,s]=h.exports.useState([]),r=Ne({wsEndpoint:e,securityToken:n}),{socketRef:o}=r,m=b=>{let g=new Uint8Array(JSON.parse(`[${b}]`)),a=q(g);if(a[0]instanceof Uint8Array)return new TextDecoder().decode(a[0]);throw Error(`Could not decode received message: ${b}`)};h.exports.useEffect(()=>{console.log({messages:c})},[c]);const v=async b=>{try{const g=m(b.data);console.log("WebSocket PRev: ",c),console.log("WebSocket Data: ",g),s(a=>[...a,g])}catch(g){console.error(g)}};return h.exports.useEffect(()=>{if(!!o.current)return o.current.addEventListener("message",v),()=>{!o.current||o.current.removeEventListener("message",v)}},[o.current]),t(N,{src:{messages:c},collapsed:!0})},A=(e,n=10)=>e.substr(0,n)+"..."+e.substr(e.length-n,n),U=e=>Number((BigInt(e)/10n**14n).toString())/1e4,Ae=({endpoint:e,variant:n="solid",label:c})=>{const{hasCopied:s,onCopy:r}=ie(e);return t(O,{onClick:r,leftIcon:t(le,{}),colorScheme:"teal",variant:n,children:s?`Copied ${c}`:c})},Ue=({uptimer:e})=>{const[n,c]=h.exports.useState([0]);return h.exports.useEffect(()=>{const s=setTimeout(async()=>{const r=e?await e():Math.random()*10;c(o=>[...o.length>10?o.slice(1):o,r])},1e3);return()=>{clearTimeout(s)}},[n]),t("div",{style:{width:"200px"},children:t(de,{children:t(pe,{data:n,stroke:{color:{solid:[255,0,0,1]},width:2,style:"solid"}})})})},L=({host:e,nodes:n,domain:c})=>f(D,{size:"sm",children:[t(te,{children:t(T,{children:t(y,{colSpan:5,children:e})})}),t(R,{children:n[e]&&n[e].map(s=>f(h.exports.Fragment,{children:[f(T,{children:[t(E,{children:f(ne,{alignItems:"center",children:[s.address?t(se,{}):t(oe,{})," ",t(re,{mx:"2",children:"Host"}),s.index+1,t(ce,{mx:"2",colorScheme:"yellow",children:c})]})}),t(E,{children:t(ae,{direction:"row",spacing:4,children:t(Ae,{endpoint:s.httpEndpoint,label:"API Endpoint",variant:"outline"})})}),t(E,{children:t(S,{children:s.address?A(s.address.hopr):"No HOPR address"})}),t(E,{children:t(S,{children:s.address?A(s.address.native):"No ETH address"})}),t(E,{children:t(Ue,{uptimer:s.uptimer})})]}),f(T,{children:[t(y,{children:"General"}),t(y,{children:"Messages"}),t(y,{children:"Info"}),t(y,{children:"Channels"}),t(y,{children:"Tickets"})]}),f(T,{children:[f(E,{children:[t(S,{children:"Balance"}),":",U(s.balance.hopr)," HOPR,"," ",U(s.balance.native)," ETH",t("br",{}),t(S,{children:"Version"}),":",s.version]}),t("td",{children:t(ke,{wsEndpoint:`${s.httpEndpoint}/api/v2/messages/websocket`,securityToken:s.securityToken||""})}),t(E,{children:t(N,{src:s.info,collapsed:!0})}),t(E,{children:t(N,{src:s.channels,collapsed:!0})}),t(E,{children:t(N,{src:s.tickets,collapsed:!0})})]})]},s.address.hopr))})]},e);function Le(){const e=new URLSearchParams(window.location.search),[n,c]=h.exports.useState(e.get("nodeHost")||""),[s,r]=h.exports.useState({}),[o,m]=h.exports.useState({}),[v,b]=h.exports.useState(e.get("securityToken")||""),g=(l,d=!1)=>{const i=new Headers;return d&&(i.set("Content-Type","application/json"),i.set("Accept-Content","application/json")),i.set("Authorization","Basic "+btoa(l)),i},a=async(l,d,i)=>await Promise.all([...Array(l)].map(async(w,p)=>{const u=g(d),W=await ge(i(p+1),u),B=await Ee(i(p+1),u),Z=await ve(i(p+1),u),z=await be(i(p+1),u),Q=await Se(i(p+1),u),G=()=>Te(i(p+1),u),J=await ye(i(p+1),u),M=await we(i(p+1),u),V=await Ce(i(p+1),u);return{index:p,address:{hopr:W,native:B},version:Q,uptimer:G,info:J,channels:M,tickets:V,balance:{hopr:Z,native:z},httpEndpoint:i(p+1),securityToken:d}})),I=async l=>a(5,"^^LOCAL-testing-123^^",p=>`https://1330${p}-${l.hostname}`),P=async l=>a(5,"^^LOCAL-testing-123^^",p=>`http://${l.hostname}:1330${p}`),F=async(l,d)=>a(1,d,u=>`http://${l.hostname}:3001`);h.exports.useEffect(()=>{(async()=>{Object.keys(s).map(async d=>{switch(s[d].domain){case"gitpod.io":const i=await I(s[d].url);m(u=>({[d]:i,...u}));break;case"localhost":const w=await P(s[d].url);m(u=>({[d]:w,...u}));break;default:const p=await F(s[d].url,v);m(u=>({[d]:p,...u}));break}})})()},[s]);const K=l=>{if(l.key==="Enter")try{const d=new URL(n),i=d.hostname.split(".").slice(-2).join(".");r(w=>({[n]:{url:d,domain:i,token:v},...w}))}catch{}};return f(_,{children:[f(D,{variant:"simple",children:[f(X,{children:["list of available hopr nodes"," ",t(O,{size:"sm",onClick:()=>r({}),children:"clear"})]}),f(R,{children:[t(T,{children:t(E,{children:t(L,{host:"localhost",nodes:{localhost:[{index:0,balance:{hopr:"1234000000000000000",native:"2345000000000000000"},channels:{incoming:[{type:"incoming",channelId:"0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5",peerId:"16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar",status:"Open",balance:"10000000000000000000"}],outgoing:[{type:"incoming",channelId:"0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5",peerId:"16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar",status:"Open",balance:"10000000000000000000"}]},info:{environment:"hardhat-localhost",announcedAddress:["/ip4/128.0.215.32/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit","/p2p/16Uiu2HAmLpqczAGfgmJchVgVk233rmB2T3DSn2gPG6JMa5brEHZ1/p2p-circuit/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit","/ip4/127.0.0.1/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit","/ip4/192.168.178.56/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit"],listeningAddress:["/ip4/0.0.0.0/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit"],network:"hardhat",hoprToken:"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",hoprChannels:"0x2a54194c8fe0e3CdeAa39c49B95495aA3b44Db63",channelClosurePeriod:1},tickets:{pending:0,unredeemed:0,unredeemedValue:"string",redeemed:0,redeemedValue:"string",losingTickets:0,winProportion:0,neglected:0,rejected:0,rejectedValue:"string"},version:"1.87.x",uptimer:()=>Promise.resolve(Math.random()*10),httpEndpoint:"http://localhost:3001",address:{hopr:"16Uiu2HAmE9b3TSHeF25uJS1Ecf2Js3TutnaSnipdV9otEpxbRN8Q",native:"0xEA9eDAE5CfC794B75C45c8fa89b605508A03742a"}}]},domain:"localhost"})})}),t(T,{children:t(E,{children:Object.keys(s).map(l=>t(L,{host:l,nodes:o,domain:s[l].domain},l))})})]})]}),t(Y,{children:f(ee,{children:[t(k,{placeholder:"node host e.g. https://hoprnet-hoprnet-j4zbg3yajqp.ws-eu31.gitpod.io/ or localhost",value:n,onChange:l=>c(l.target.value),onKeyPress:K}),t(k,{placeholder:"^^LOCAL-testing-123^^",value:v,onChange:l=>b(l.target.value)})]})})]})}ue.render(t(he.StrictMode,{children:t(me,{children:t(Le,{})})}),document.getElementById("root"));
