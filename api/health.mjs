import { hasLiveStack } from './_lib/memory.mjs';
export default function handler(req,res){ return res.status(200).json({status:hasLiveStack()?'ok':'demo',services:['Omi webhook ready',hasLiveStack()?'Qdrant connected':'Qdrant demo memory',hasLiveStack()?'Lyzr connected':'Lyzr fallback reasoning'],live:hasLiveStack()}); }
