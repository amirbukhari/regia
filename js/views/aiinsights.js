/* delonix — aiinsights.js */

VIEWS.aiinsights = (v)=>{
  v.appendChild(el(`<div class="view">
  ${pageHead('AI Insights','Natural language analytics, anomaly detection and revenue forecasting — powered by Delonix Intelligence',
    `<button class="btn ghost" data-act="scheduledigest" data-arg="">Schedule digest</button>`
  )}
    <div style="margin-bottom:18px;display:flex;gap:10px;align-items:center">
      <div style="flex:1;display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 14px">
        ${svg(I.ai,16)}<input class="finput" style="border:none;background:transparent;flex:1;font-size:14px;padding:0" placeholder="Ask your data… e.g. &quot;Which cohorts have net retention above 110%?&quot;" oninput="filterAIQuery(this.value)">
        <button class="btn primary" style="padding:5px 14px;font-size:13px" data-act="aiquery">Ask AI</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:18px">
      ${[
        {label:'Anomalies detected', val:'4', sub:'Last 7 days', color:'var(--crit)', icon:'dunning'},
        {label:'Forecast accuracy', val:'94.2%', sub:'vs actual last quarter', color:'var(--ok)', icon:'reports'},
        {label:'AI recommendations', val:'12', sub:'Revenue-impacting', color:'var(--ember)', icon:'ai'},
      ].map(k=>`
        <div class="kpi-card" style="cursor:default">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div class="kl">${k.label}</div>
            <div style="color:${k.color};opacity:.7">${svg(I[k.icon],16)}</div>
          </div>
          <div class="kv" style="font-size:26px;font-weight:700;color:${k.color}">${k.val}</div>
          <div class="ks">${k.sub}</div>
        </div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.dunning,14)} Anomalies</h3><span class="pill crit">4 active</span></div>
        <div style="display:flex;flex-direction:column;gap:2px">
          ${[
            {sev:'crit', title:'Churn spike — Cobalt Robotics segment', detail:'Gross churn 4.2% this week vs 1.1% baseline. 3 Enterprise accounts flagged for cancellation intent.', act:'accountseg'},
            {sev:'warn', title:'Invoice aging outlier — Helios Manufacturing', detail:'DSO 68 days vs account average of 41. Pattern consistent with payment dispute — recommend escalation.', act:'colldetail'},
            {sev:'warn', title:'Usage overrun — API tier mismatch', detail:'14 accounts consuming >2× plan limit for 3+ weeks. Estimated missed revenue: $18,400/mo.', act:'usage'},
            {sev:'info', title:'MRR bridge discrepancy', detail:'$2,100 gap between recognized MRR and subscription system. Likely draft invoice not finalized.', act:'invoices'},
          ].map(a=>`
            <div class="act" style="cursor:pointer;padding:10px 0;border-bottom:1px solid var(--border)" data-act="route" data-arg="${a.act}">
              <div style="margin-right:10px">${a.sev==='crit'?pill('crit','Critical'):a.sev==='warn'?pill('warn','Warning'):pill('info','Info')}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;margin-bottom:2px">${a.title}</div>
                <div class="mut" style="font-size:12px">${a.detail}</div>
              </div>
              <div style="color:var(--text-3)">${svg(I.migration,14)}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.reports,14)} Revenue forecast</h3><span class="sub">12-month · 90% CI</span></div>
        <canvas id="forecastChart" height="180" style="width:100%;margin-bottom:12px"></canvas>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:12px">
          ${[['Jul 2026 MRR','$436k','+4.2%','ok'],['ARR exit (Dec)','$5.61M','+11.7%','ok'],['Churn risk','$42k','↑ flagged','warn']].map(r=>`
            <div style="padding:8px;background:var(--surface);border-radius:6px">
              <div class="mut">${r[0]}</div>
              <div style="font-weight:700;font-size:14px;color:var(--${r[3]==='ok'?'ok':'warn'})">${r[1]}</div>
              <div class="mut" style="font-size:11px">${r[2]}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.ai,14)} AI recommendations</h3><span class="sub">Revenue-impacting · updated Jun 28</span></div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${[
            {tag:'Expansion',  tagc:'ok',   title:'Upgrade 14 usage-overrun accounts to Business+', impact:'+$18,400 MRR', effort:'Low — automated email sequence ready', action:'newsub'},
            {tag:'Retention',  tagc:'warn', title:'Proactive outreach for 3 at-risk Enterprise accounts', impact:'Protect $287k ARR', effort:'Medium — CSM assignment recommended', action:'dunning'},
            {tag:'Pricing',    tagc:'info', title:'Introduce API overage tier for top 8 API consumers', impact:'+$9,200 MRR', effort:'Low — update plan entitlements', action:'catalog'},
            {tag:'Efficiency', tagc:'muted',title:'Consolidate 38 stale draft invoices from May period', impact:'Clean close cycle', effort:'Low — batch finalize available', action:'invoices'},
            {tag:'Expansion',  tagc:'ok',   title:'Renewal risk: 7 Enterprise contracts expire in 90 days', impact:'$487k ARR at risk', effort:'High — NDA + pricing review required', action:'quotes'},
          ].map(r=>`
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer" data-act="route" data-arg="${r.action}">
              <div style="min-width:72px">${pill(r.tagc, r.tag)}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;margin-bottom:2px">${r.title}</div>
                <div class="mut" style="font-size:12px">${r.impact} · ${r.effort}</div>
              </div>
              <button class="btn ghost" style="font-size:11px;padding:3px 9px;white-space:nowrap" data-act="route" data-arg="${r.action}">Review →</button>
            </div>`).join('')}
        </div>
      </div>

      <div class="card panel">
        <div class="panel-head"><h3>${svg(I.ai,14)} Recent queries</h3></div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${[
            'Show me all accounts with NRR > 115% in Q2',
            'Which plans have the highest expansion rate?',
            'Compare churn by acquisition cohort 2023 vs 2024',
            'MRR movement bridge last 6 months by BU',
            'Top 10 accounts by expansion revenue YTD',
          ].map(q=>`
            <div style="padding:8px 10px;background:var(--surface);border-radius:6px;font-size:12.5px;cursor:pointer;display:flex;align-items:center;gap:8px" data-act="aiquery" data-arg="${q}">
              ${svg(I.ai,13)}<span class="mut">${q}</span>
            </div>`).join('')}
        </div>
        <button class="btn ghost" style="width:100%;margin-top:10px;justify-content:center" data-act="toast" data-arg="Opening AI query history">View all queries</button>
      </div>
    </div>
  </div>`));
  // draw forecast sparkline
  setTimeout(()=>{
    const c=document.getElementById('forecastChart'); if(!c) return;
    const ctx=c.getContext('2d'); const W=c.offsetWidth||400; c.width=W; c.height=180;
    const pts=[418,424,430,436,440,446,453,459,464,470,476,483];
    const mn=380,mx=520,h=160,pad=20;
    const x=(i)=>pad+(i/(pts.length-1))*(W-2*pad);
    const y=(v)=>h+pad-((v-mn)/(mx-mn))*h;
    // CI band
    ctx.beginPath();
    pts.forEach((v,i)=>{ const lo=v-i*2.5,hi=v+i*2.5; if(i===0) ctx.moveTo(x(i),y(hi)); else ctx.lineTo(x(i),y(hi)); });
    [...pts].reverse().forEach((v,i)=>{ const ri=pts.length-1-i; ctx.lineTo(x(ri),y(v-ri*2.5)); });
    ctx.closePath(); ctx.fillStyle='rgba(37,99,235,0.10)'; ctx.fill();
    // actual / forecast line
    ctx.beginPath(); pts.forEach((v,i)=>{ i===0?ctx.moveTo(x(i),y(v)):ctx.lineTo(x(i),y(v)); });
    ctx.strokeStyle='var(--ember,#2563eb)'; ctx.lineWidth=2; ctx.stroke();
    // month labels
    ctx.fillStyle='#888'; ctx.font='10px sans-serif'; ctx.textAlign='center';
    ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'].forEach((m,i)=>ctx.fillText(m,x(i),180));
  },100);
};

/* ============================================================
   Pricing Calculator Builder view
   ============================================================ */
