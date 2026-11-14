const CACHE='radar-ad-v10';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
// installation : on force le téléchargement depuis le réseau (pas le cache HTTP du navigateur)
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const url=new URL(req.url); if(url.origin!==location.origin)return;
  const isPage=req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('.html');
  if(isPage){
    // page : réseau d'abord (toujours la dernière version), cache si hors ligne
    e.respondWith((async()=>{
      try{
        const ctl=new AbortController(); const to=setTimeout(()=>ctl.abort(),4000);
        const resp=await fetch(new Request(req,{cache:'no-cache'}),{signal:ctl.signal}); clearTimeout(to);
        if(resp.ok){const c=await caches.open(CACHE); c.put('./index.html',resp.clone()); c.put('./',resp.clone());}
        return resp;
      }catch(err){ return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error(); }
    })());
    return;
  }
  // icônes, manifeste : cache d'abord
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req).then(resp=>{if(resp.ok){const cp=resp.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return resp;})));
});
