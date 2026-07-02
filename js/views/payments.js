/* delonix — payments.js */

VIEWS.payments = (v)=>{
  const PAY_DATA = db().payments;
  const gwColors = {Stripe:'#635bff', Adyen:'#0abf53', Other:'#0891b2'};
  const okPays = PAY_DATA.filter(p=>p.sl==='Succeeded');
  const volBy = gw => okPays.filter(p=>p.gw===gw).reduce((s,p)=>s+p.net,0);
  const totNet = okPays.reduce((s,p)=>s+p.net,0)||1;
  const gwShare = [['Stripe','Healthy'],['Adyen','Operational'],['Other','Manual']].map(([gw,status])=>({gw,status,pct:Math.max(4,Math.round(volBy(gw)/totNet*100)),vol:fmt(volBy(gw))}));
  const totPend = PAY_DATA.filter(p=>p.sl==='Pending').reduce((s,p)=>s+p.amt,0);
  const failed = PAY_DATA.filter(p=>p.sl==='Failed');
  const totFail = failed.reduce((s,p)=>s+p.amt,0);
  const refunded = PAY_DATA.filter(p=>p.sl==='Refunded');
  const totRef = refunded.reduce((s,p)=>s+p.amt,0);

  const gwCycle = ['All','Stripe','Adyen','Other'];
  const stCycle = ['All','Succeeded','Pending','Failed','Refunded'];
  const payRowsFor = (gw, st) => PAY_DATA
    .filter(p => (gw==='All'||p.gw===gw) && (st==='All'||p.sl===st))
    .map(p=>`<tr style="cursor:pointer" data-act="paydetail" data-arg="${p.id}">`+
      `<td class="mono">${p.id}</td>`+
      `<td class="nm">${p.acct}</td>`+
      `<td class="num tnum">${fmt(p.amt)}</td>`+
      `<td class="num tnum" style="color:var(--mut)">${fmt(p.net)}</td>`+
      `<td><span style="font-size:12px;font-weight:600;color:${gwColors[p.gw]}">${p.gw}</span></td>`+
      `<td class="mono mut" style="font-size:12px">${p.method}</td>`+
      `<td class="mut">${p.date}</td>`+
      `<td>${pill(p.status,p.sl)}</td>`+
      `</tr>`).join('') || `<tr><td colspan="8" class="empty">No ${st==='All'?'':st.toLowerCase()+' '}payments${gw==='All'?'':' via '+gw}.</td></tr>`;
  window._payGw = 'All'; window._paySt = 'All';
  window._cyclePay = (dim, elBtn) => {
    const cyc = dim==='gw' ? gwCycle : stCycle;
    const cur = dim==='gw' ? window._payGw : window._paySt;
    const next = cyc[(cyc.indexOf(cur)+1)%cyc.length];
    if(dim==='gw') window._payGw = next; else window._paySt = next;
    elBtn.innerHTML = elBtn.innerHTML.replace(/(Gateway|Status)(: [^<]*)?/, (dim==='gw'?'Gateway':'Status') + (next==='All'?'':': '+next));
    elBtn.classList.toggle('on', next!=='All');
    document.getElementById('payBody').innerHTML = payRowsFor(window._payGw, window._paySt);
  };
  v.appendChild(el(`<div class="view">
    ${pageHead('Payments','Payment ledger — gateway receipts, fee netting and status across processors.',
      `<button class="btn ghost" data-act="download" data-arg="csv|Payment Ledger|312 payments · $329,400">${svg(I.download,14)} Export</button><button class="btn primary" data-act="manualpayment" data-arg="new">+ Record Payment</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">
      ${kpi('Collected MTD',fmt(totNet),'net of processing fees',{accent:true,trend:7})}
      ${kpi('Pending Settlement',fmt(totPend),'2–3 business days',{})}
      ${kpi('Failed Payments',fmt(totFail),failed.length+(failed.length===1?' retry':' retries')+' queued',{})}
      ${kpi('Refunds Issued',fmt(totRef),'MTD · '+refunded.length+' transaction'+(refunded.length===1?'':'s'),{})}
    </div>

    <div class="card" style="padding:16px 18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <span style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut)">Gateway split · June 2026</span>
        <span style="font-size:12px;color:var(--mut)">${fmt(totNet)} settled</span>
      </div>
      <div style="display:flex;gap:12px">
        ${gwShare.map(g=>`<div style="flex:${g.pct};background:${gwColors[g.gw]}18;border:1px solid ${gwColors[g.gw]}44;border-radius:6px;padding:12px 14px;min-width:0">`+
          `<div style="font-size:18px;font-weight:700;color:${gwColors[g.gw]};font-variant-numeric:tabular-nums">${g.pct}%</div>`+
          `<div style="font-size:13px;font-weight:600;margin:2px 0">${g.gw}</div>`+
          `<div style="font-size:12px;color:var(--mut)">${g.vol} · ${g.status}</div>`+
          `</div>`).join('')}
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--border)">
        <span style="font-size:13px;font-weight:600">All Payments</span>
        <div style="display:flex;gap:8px">
          <button class="chip" onclick="window._cyclePay('gw',this)" title="Cycle gateway filter">${svg(I.filter,13)} Gateway</button>
          <button class="chip" onclick="window._cyclePay('st',this)" title="Cycle status filter">${svg(I.filter,13)} Status</button>
        </div>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th style="width:120px">Reference</th>
            <th>Customer</th>
            <th class="num">Amount</th>
            <th class="num">Net</th>
            <th>Gateway</th>
            <th>Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr></thead>
          <tbody id="payBody">${payRowsFor('All','All')}</tbody>
        </table>
      </div>
    </div>
  </div>`));
};

/* ---------- Credits & Refunds ---------- */
