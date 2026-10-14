import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const memories = [
  'Q4 community dinner: venue shortlist is down to The Glasshouse and Linden Hall.',
  'Action item: send the revised invoice to Rahul before Friday afternoon.',
  'Decision: keep the first research sprint narrow around activation, not retention.',
  'Planning note: ask Maya to confirm dietary requirements for the community dinner.'
];
const json = (res, status, body) => { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(body)); };
const readBody = (req) => new Promise((resolve) => { let raw=''; req.on('data',(chunk)=>raw+=chunk); req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch{resolve({})}}); });
const answer = (question) => { const q=question.toLowerCase(); if(q.includes('action')||q.includes('promise')||q.includes('invoice')) return 'Your open action item is to send the revised invoice to Rahul before Friday afternoon. The community dinner also has one follow-up: ask Maya to confirm dietary requirements.'; if(q.includes('dinner')||q.includes('guest')||q.includes('venue')) return 'The community dinner venue shortlist is down to The Glasshouse and Linden Hall. Maya still needs to confirm dietary requirements.'; if(q.includes('owner')||q.includes('who')) return 'Rahul is the recipient of the revised invoice, and Maya owns the dietary-requirements follow-up for the dinner.'; return 'I found related voice memories, but no stronger answer than the context shown. Try asking about the invoice, dinner, venue, or owner.'; };
const handleApi = async (req, res, url) => { if(url.pathname==='/api/health') return json(res,200,{status:'demo',services:['Omi webhook ready','Qdrant demo memory','Lyzr fallback reasoning'],live:Boolean(process.env.QDRANT_URL&&process.env.LYZR_API_KEY)}); if(url.pathname==='/api/ask'&&req.method==='POST'){const body=await readBody(req); return json(res,200,{answer:answer(body.question||''),context:memories.slice(0,3),mode:'demo'});} if((url.pathname==='/api/omi/conversation'||url.pathname==='/api/omi/realtime')&&req.method==='POST'){const body=await readBody(req); const text=JSON.stringify(body).slice(0,150); memories.unshift(text); return json(res,200,{status:'ok',stored:true,mode:'demo'});} return json(res,404,{error:'Not found'}); };
const server=http.createServer(async (req,res)=>{ const url=new URL(req.url,`http://${req.headers.host}`); if(url.pathname.startsWith('/api/')) return handleApi(req,res,url); const requested=url.pathname==='/'?'/index.html':url.pathname; const relative=requested==='/manus-routes.json'?'/public/manus-routes.json':requested; const filePath=path.join(root,relative); if(!filePath.startsWith(root)){res.writeHead(403);return res.end('Forbidden');} fs.readFile(filePath,(error,data)=>{if(error){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':mime[path.extname(filePath)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)}); });
server.listen(port,'0.0.0.0',()=>console.log(`Lumae listening on 0.0.0.0:${port}`));
