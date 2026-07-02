/* delonix — quotes.js */

VIEWS.quotes = (v)=>{
  const stages = [
    {label:'Discovery',   count:8,  value:142000},
    {label:'Proposal',    count:14, value:387000},
    {label:'Negotiation', count:6,  value:218000},
    {label:'Signed',      count:22, value:614000},
  ];
  const totalPipeline = stages.reduce((s,x)=>s+x.value,0);
  const stageColors = ['var(--text-3)','var(--info)','var(--warn)','var(--good)'];
  const quotes = [
    {id:'Q-2026-322', acct:'Pinnacle SaaS',     plan:'Enterprise+', val:312000, owner:'P. Anand',  stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-321', acct:'Stellar Systems',   plan:'Enterprise+', val:187200, owner:'M. Reyes',  stage:'Negotiation', exp:'Jul 05',    status:'warn',  sl:'Negotiating'},
    {id:'Q-2026-320', acct:'CloudBase Inc',     plan:'Enterprise',  val:144000, owner:'D. Cho',    stage:'Proposal',    exp:'Jul 12',    status:'info',  sl:'Sent'},
    {id:'Q-2026-319', acct:'Apex Systems',      plan:'Enterprise',  val:228000, owner:'P. Anand',  stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-318', acct:'Summit Digital',    plan:'Enterprise',  val:96000,  owner:'M. Reyes',  stage:'Negotiation', exp:'Jul 08',    status:'ember', sl:'Pending approval'},
    {id:'Q-2026-317', acct:'Zenith Cloud',      plan:'Enterprise',  val:57000,  owner:'D. Cho',    stage:'Proposal',    exp:'Jul 15',    status:'info',  sl:'Sent'},
    {id:'Q-2026-316', acct:'Fulcrum Labs',      plan:'Business+',   val:41880,  owner:'P. Anand',  stage:'Proposal',    exp:'Jul 18',    status:'info',  sl:'Sent'},
    {id:'Q-2026-315', acct:'Bridgepoint',       plan:'Business',    val:25800,  owner:'M. Reyes',  stage:'Discovery',   exp:'—',    status:'muted', sl:'Discovery'},
    {id:'Q-2026-314', acct:'Ironside Tech',     plan:'Business',    val:19800,  owner:'D. Cho',    stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
    {id:'Q-2026-313', acct:'Cascade Analytics', plan:'Business+',   val:34200,  owner:'P. Anand',  stage:'Proposal',    exp:'Jul 22',    status:'info',  sl:'Sent'},
    {id:'Q-2026-312', acct:'NovaSpark',         plan:'Business',    val:9360,   owner:'M. Reyes',  stage:'Discovery',   exp:'—',    status:'muted', sl:'Discovery'},
    {id:'Q-2026-311', acct:'Meridian Tech',     plan:'Business+',   val:44400,  owner:'D. Cho',    stage:'Signed',      exp:'—',    status:'good',  sl:'Signed'},
  ];
  v.appendChild(el(`<div class="view">
    ${pageHead('Quotes & Contracts','CPQ pipeline · approval routing · e-signature · June 2026',
      `<button class="btn ghost" data-act="approvalrules">Approval rules</button><button class="btn primary" data-act="newquote">+ New quote</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Pipeline value','$1.36M','total open ACV',{accent:true})}
      ${kpi('Win rate','68%','quote → signed, trailing 90d',{trend:4})}
      ${kpi('Avg deal cycle','23 days','first touch → close',{trend:-12})}
      ${kpi('Signed (30d)','22','$614k closed ACV',{trend:18})}
    </div>
    <div class="sec-title">Pipeline by stage</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px">
      ${stages.map((s,i)=>`<div class="card" style="padding:16px 18px">
        <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:1.1px;color:${stageColors[i]};font-weight:700;margin-bottom:8px">${s.label}</div>
        <div style="font-family:var(--display);font-size:26px;font-weight:700;font-variant-numeric:tabular-nums">${fmt(Math.round(s.value/1000))}k</div>
        <div style="color:var(--text-3);font-size:12px;margin-top:4px">${s.count} quotes</div>
        <div class="bar" style="margin-top:12px"><i style="width:${Math.round(s.value/totalPipeline*100)}%;background:${stageColors[i]}"></i></div>
      </div>`).join('')}
    </div>
    <div class="sec-title">All quotes</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Quote #</th><th>Customer</th><th class="num">Value (ACV)</th><th>Plan</th><th>Owner</th><th>Stage</th><th>Expires</th><th>Status</th></tr></thead>
        <tbody>
          ${quotes.map(q=>`<tr style="cursor:pointer" data-act="quotedetail" data-arg="${q.id}|${q.acct}|${q.plan}|${q.val}|${q.owner}|${q.stage}|${q.sl}|${q.exp}">
            <td class="mono">${q.id}</td>
            <td class="nm">${q.acct}</td>
            <td class="num tnum">${fmt(q.val)}</td>
            <td><span class="mut" style="font-size:12px">${q.plan}</span></td>
            <td class="mut">${q.owner}</td>
            <td><span class="mut" style="font-size:12px">${q.stage}</span></td>
            <td class="mono mut">${q.exp}</td>
            <td>${pill(q.status,q.sl)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Usage & Metering ---------- */
