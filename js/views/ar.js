/* delonix — ar.js */

VIEWS.ar = (v)=>{
  /* aging derives from the live invoice ledger: pay or credit an invoice in
     the demo and it leaves this view */
  const ageOf = i => i.sl==='Sent' ? dlxRange(i.id,1,12)
    : i.period==='Jun 2026' ? dlxRange(i.id,15,28)
    : i.period==='May 2026' ? dlxRange(i.id,31,58)
    : i.period==='Apr 2026' ? dlxRange(i.id,61,88)
    : dlxRange(i.id,91,120);
  const bucketOf = a => a<=14?'Current':a<=30?'1–30d':a<=60?'31–60d':a<=90?'61–90d':'90d+';
  const AGING = db().invoices.filter(i=>i.sl==='Sent'||i.sl==='Overdue').map(i=>{
    const age = ageOf(i), bucket = bucketOf(age);
    return {acct:i.acct, inv:i.id, amt:i.amt, age, bucket,
      status: bucket==='Current'?'good':bucket==='1–30d'?'warn':'neg',
      sl: bucket==='Current'?'Current':bucket.replace('d',' days')};
  }).sort((a,b)=>a.age-b.age);
  const BUCKETS = [
    {label:'Current',  sub:'0–14 days',  color:'var(--good)'},
    {label:'1–30d',    sub:'past due',   color:'var(--warn)'},
    {label:'31–60d',   sub:'at risk',    color:'#f97316'},
    {label:'61–90d',   sub:'escalate',   color:'var(--neg)'},
    {label:'90d+',     sub:'write-off?', color:'#9f1239'},
  ].map(b=>({...b, val:AGING.filter(r=>r.bucket===b.label).reduce((s,r)=>s+r.amt,0)}));
  const total = BUCKETS.reduce((s,b)=>s+b.val,0);
  const UNAPPLIED = [
    {acct:'Vertex IO',       ref:'WIRE-2026-8821', amt:890,  date:'Jun 26', note:'No remittance data'},
    {acct:'NovaSpark',       ref:'ACH-2026-7740',  amt:780,  date:'Jun 25', note:'Invoice ref missing'},
    {acct:'Orbit Labs',      ref:'ACH-2026-7719',  amt:620,  date:'Jun 24', note:'Partial — short $120'},
  ].filter(u=>!db().matched.includes(u.ref));
  const bucketColor = (b) => ({Current:'var(--good)','1–30d':'var(--warn)','31–60d':'#f97316','61–90d':'var(--neg)','90d+':'#9f1239'}[b]||'var(--mut)');

  v.appendChild(el(`<div class="view">
    ${pageHead('A/R & Cash Application','Accounts-receivable aging, DSO tracking and incoming cash matching.',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|A/R Aging Report|Jun 28 · generating…">${svg(I.download,14)} Aging Report</button><button class="btn primary" data-act="collectionssweep">Send Statements</button>`)}

    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px">
      ${BUCKETS.map(b=>`<div class="card" style="padding:14px 16px">`+
        `<div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--mut);margin-bottom:6px">${b.label}</div>`+
        `<div class="tnum" style="font-size:22px;font-weight:700;color:${b.color}">${fmt(b.val)}</div>`+
        `<div style="font-size:12px;color:var(--mut);margin-top:3px">${b.sub}</div>`+
        `<div style="margin-top:10px;height:3px;background:var(--border);border-radius:2px">`+
          `<div style="width:${Math.round(b.val/total*100)}%;height:100%;background:${b.color};border-radius:2px"></div>`+
        `</div></div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 280px;gap:16px;margin-bottom:16px">
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">DSO Trend · Rolling 6 months</div>
        <canvas id="dsoChart" height="110" style="width:100%"></canvas>
        <div style="display:flex;gap:20px;margin-top:14px">
          ${[['Current DSO','28 days','var(--accent)'],['Industry Avg','35 days','var(--mut)'],['Target','25 days','var(--good)']]
            .map(([l,v,c])=>`<div><div style="font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut)">${l}</div><div class="tnum" style="font-size:18px;font-weight:700;color:${c}">${v}</div></div>`).join('')}
        </div>
      </div>
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:12px">Unapplied Cash ${UNAPPLIED.length?`<span class="pill warn" style="margin-left:6px">${UNAPPLIED.length} to match</span>`:`<span class="pill good" style="margin-left:6px">All applied</span>`}</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${UNAPPLIED.length?'':'<div class="empty" style="padding:18px 6px">Every incoming payment is matched — new unapplied cash will appear here.</div>'}
          ${UNAPPLIED.map(u=>`<div style="padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;border-left:3px solid var(--warn)">`+
            `<div style="display:flex;justify-content:space-between;align-items:baseline">`+
              `<span style="font-size:13px;font-weight:600">${u.acct}</span>`+
              `<span class="tnum" style="font-size:13px;font-weight:700">${fmt(u.amt)}</span>`+
            `</div>`+
            `<div style="font-size:11px;color:var(--mut);margin-top:3px">${u.ref} · ${u.date}</div>`+
            `<div style="font-size:11px;color:var(--warn);margin-top:3px">${u.note}</div>`+
            `<button class="btn ghost" style="font-size:11px;padding:4px 10px;margin-top:8px;height:auto" data-act="manualmatch" data-arg="${u.ref}">Match manually</button>`+
            `</div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:13px;font-weight:600">Open Receivables <span class="tnum" style="font-weight:400;color:var(--mut)">· ${fmt(total)} total</span></span>
        <span style="font-size:12px;color:var(--mut)">${AGING.length} invoices · 96.2% collection rate</span>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th>Customer</th>
            <th>Invoice</th>
            <th class="num">Amount</th>
            <th class="num">Age</th>
            <th>Bucket</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>${AGING.map(r=>`<tr data-act="invoice" data-arg="${r.inv}" style="cursor:pointer">`+
            `<td class="nm">${r.acct}</td>`+
            `<td class="mono mut" style="font-size:12px">${r.inv}</td>`+
            `<td class="num tnum">${fmt(r.amt)}</td>`+
            `<td class="num tnum" style="color:${bucketColor(r.bucket)}">${r.age}d</td>`+
            `<td><span style="font-size:12px;font-weight:600;color:${bucketColor(r.bucket)}">${r.bucket}</span></td>`+
            `<td>${pill(r.status,r.sl)}</td>`+
            `<td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:4px 8px;height:auto" data-act="account" data-arg="${r.acct}">View</button></td>`+
            `</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const canvas = document.getElementById('dsoChart'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || 400; const H = 110;
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const dso = [34,33,32,31,30,28];
    const ind = [35,35,35,35,35,35];
    const tgt = [25,25,25,25,25,25];
    const pad = {l:28,r:12,t:8,b:28};
    const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
    const minV=22, maxV=40;
    const xp = (i)=>pad.l+i*(cw/5);
    const yp = (val)=>pad.t+ch-(val-minV)/(maxV-minV)*ch;
    const style = getComputedStyle(document.documentElement);
    const borderC = style.getPropertyValue('--border').trim()||'#2a2521';
    const textC = style.getPropertyValue('--mut').trim()||'#7a7068';
    [30,35,40].forEach(g=>{
      ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1;
      ctx.moveTo(pad.l, yp(g)); ctx.lineTo(pad.l+cw, yp(g));
      ctx.stroke();
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='right';
      ctx.fillText(g, pad.l-4, yp(g)+3);
    });
    ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
    ind.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v))); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.strokeStyle='#22c55e44'; ctx.lineWidth=1.5; ctx.setLineDash([3,3]);
    tgt.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v))); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    dso.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    const grad = ctx.createLinearGradient(0,pad.t,0,pad.t+ch);
    grad.addColorStop(0,'rgba(37,99,235,0.22)'); grad.addColorStop(1,'rgba(37,99,235,0.02)');
    ctx.lineTo(xp(5),pad.t+ch); ctx.lineTo(xp(0),pad.t+ch); ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath(); dso.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    ctx.strokeStyle='#2563eb'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.arc(xp(5),yp(dso[5]),4,0,Math.PI*2);
    ctx.fillStyle='#2563eb'; ctx.fill();
    ['Jan','Feb','Mar','Apr','May','Jun'].forEach((m,i)=>{
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='center';
      ctx.fillText(m, xp(i), H-8);
    });
  });
};

/* ---------- Customer Portal ---------- */
