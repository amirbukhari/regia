/* delonix — subscriptions.js */

VIEWS.subscriptions = (v)=>{
  const tiers = [
    {tier:'Enterprise+', mrr:127400, subs:12,  pct:30.5, color:'var(--ember)'},
    {tier:'Enterprise',  mrr:163200, subs:26,  pct:39.0, color:'var(--info)'},
    {tier:'Business+',   mrr:61300,  subs:22,  pct:14.7, color:'var(--good)'},
    {tier:'Business',    mrr:52900,  subs:88,  pct:12.6, color:'var(--warn)'},
    {tier:'Starter',     mrr:13550,  subs:694, pct:3.2,  color:'var(--text-3)'},
  ];
  const totalMrr = tiers.reduce((s,t)=>s+t.mrr,0);
  const changes = [
    {cust:'Pinnacle SaaS',    type:'Upgrade',   oldPlan:'Enterprise',  newPlan:'Enterprise+', delta:+2300, date:'Jun 24'},
    {cust:'DataVault',        type:'Upgrade',   oldPlan:'Business',    newPlan:'Business+',   delta:+900,  date:'Jun 22'},
    {cust:'Streamline Co',    type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2400, date:'Jun 21'},
    {cust:'Cascade Analytics',type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-400,  date:'Jun 20'},
    {cust:'Orbit Labs',       type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-620,  date:'Jun 19'},
    {cust:'Meridian Tech',    type:'Upgrade',   oldPlan:'Starter',     newPlan:'Business',    delta:+830,  date:'Jun 17'},
    {cust:'Bridgepoint',      type:'New',       oldPlan:'—',      newPlan:'Business',    delta:+2150, date:'Jun 15'},
    {cust:'Ironside Tech',    type:'Downgrade', oldPlan:'Business+',   newPlan:'Business',    delta:-500,  date:'Jun 13'},
    {cust:'NovaSpark',        type:'New',       oldPlan:'—',      newPlan:'Starter',     delta:+780,  date:'Jun 10'},
    {cust:'Vertex IO',        type:'Churn',     oldPlan:'Starter',     newPlan:'—',      delta:-890,  date:'Jun 08'},
  ];
  const changeType = t => t==='Upgrade'?pill('good','Upgrade'):t==='New'?pill('info','New'):t==='Downgrade'?pill('warn','Downgrade'):pill('crit','Churn');
  const deltaFmt = d => `<span class="tnum" style="color:${d>0?'var(--good)':'var(--crit)'};font-weight:600">${d>0?'+':''}${fmt(d)}</span>`;
  v.appendChild(el(`<div class="view">
    ${pageHead('Subscriptions','842 active · 34 trial · $418,350 MRR · June 2026',
      `<button class="btn ghost" data-act="route" data-arg="catalog">View catalog</button><button class="btn primary" data-act="newsub">+ New subscription</button>`)}
    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Active','842','+18 net new this month',{trend:2.2,accent:true})}
      ${kpi('Trial','34','avg 14-day window',{trend:6.3})}
      ${kpi('Paused','18','$22,400 MRR paused',{})}
      ${kpi('Cancelled (30d)','9','−$7,000 churned MRR',{trend:-9})}
    </div>
    <div class="sec-title">MRR by plan tier</div>
    <div class="table-wrap" style="margin-bottom:20px">
      <table>
        <thead><tr><th>Plan tier</th><th class="num">Subscriptions</th><th class="num">MRR</th><th>Share of MRR</th><th class="num">Avg MRR / sub</th></tr></thead>
        <tbody>
          ${tiers.map(t=>`<tr>
            <td><span class="nm" style="display:flex;align-items:center;gap:9px"><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${t.color};flex:none"></span>${t.tier}</span></td>
            <td class="num tnum">${t.subs.toLocaleString()}</td>
            <td class="num tnum">${fmt(t.mrr)}</td>
            <td><div style="display:flex;align-items:center;gap:10px"><div class="bar" style="width:120px"><i style="width:${t.pct}%;background:${t.color}"></i></div><span class="mut tnum" style="font-size:12px">${t.pct}%</span></div></td>
            <td class="num tnum">${fmt(Math.round(t.mrr/t.subs))}</td>
          </tr>`).join('')}
          <tr style="border-top:1px solid var(--border);font-weight:600">
            <td class="nm">Total</td>
            <td class="num tnum">842</td>
            <td class="num tnum">${fmt(totalMrr)}</td>
            <td><span class="mut">100%</span></td>
            <td class="num tnum">${fmt(Math.round(totalMrr/842))}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sec-title">Recent subscription changes</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Customer</th><th>Change</th><th>Previous plan</th><th>New plan</th><th class="num">MRR delta</th><th>Date</th></tr></thead>
        <tbody>
          ${changes.map(c=>`<tr style="cursor:pointer" data-act="subdetail" data-arg="${c.cust}">
            <td class="nm">${c.cust}</td>
            <td>${changeType(c.type)}</td>
            <td class="mut">${c.oldPlan}</td>
            <td>${c.newPlan==='—'?`<span class="mut">—</span>`:c.newPlan}</td>
            <td class="num">${deltaFmt(c.delta)}</td>
            <td class="mut">${c.date}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`));
};

/* ---------- Products & Plans ---------- */
