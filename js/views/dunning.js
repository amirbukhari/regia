/* delonix — dunning.js */

VIEWS.dunning = (v)=>{
  const DUN_DATA = DUN_ROWS;
  const SEQ = [
    {day:'Day 1',  action:'Email · payment reminder',        done:true},
    {day:'Day 3',  action:'Email · second notice',             done:true},
    {day:'Day 7',  action:'Email + SMS · urgent notice',       done:false},
    {day:'Day 14', action:'Phone call · collections team',     done:false},
    {day:'Day 21', action:'Final notice email + letter',       done:false},
    {day:'Day 30', action:'Suspend account + legal referral',  done:false},
  ];
  const dayBarColor = (d) => d>=21?'var(--neg)':d>=7?'var(--warn)':'var(--mut)';
  const dunTotal = DUN_DATA.reduce((s,r)=>s+r.amt,0);
  const atRisk = DUN_DATA.filter(r=>r.day>=21).reduce((s,r)=>s+r.amt,0);

  v.appendChild(el(`<div class="view">
    ${pageHead('Dunning & Collections','Automated retry sequences, escalation rules and recovery tracking.',
      `<button class="btn ghost" data-act="dunningconfig">Sequence Rules</button><button class="btn primary" data-act="collectionssweep">Run Sweep</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr)">
      ${kpi('In Dunning',DUN_DATA.length+' accounts',fmt(dunTotal)+' total exposure',{accent:true})}
      ${kpi('At Risk',fmt(atRisk),'day 21+ in sequence',{})}
      ${kpi('Recovered MTD','$18,400','11 accounts cleared',{trend:8})}
      ${kpi('Success Rate','61%','failed → recovered MTD',{trend:4})}
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;margin-bottom:16px">
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">Recovery Trend · Rolling 6 Months</div>
        <canvas id="recoveryChart" height="130" style="width:100%"></canvas>
      </div>
      <div class="card" style="padding:16px 18px">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--mut);margin-bottom:14px">Dunning Sequence</div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${SEQ.map((s,i)=>`<div style="display:flex;gap:12px;align-items:flex-start;padding:9px 0;${i<SEQ.length-1?'border-bottom:1px solid var(--border)':''}"> `+
            `<div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;background:${s.done?'var(--accent)22':'var(--surface)'};border:1.5px solid ${s.done?'var(--accent)':'var(--border)'};color:${s.done?'var(--accent)':'var(--mut)'}">${s.done?'✓':String(i+1)}</div>`+
            `<div style="flex:1">`+
              `<div style="font-size:13px;font-weight:600;color:${s.done?'var(--text)':'var(--mut)'}">${s.day}</div>`+
              `<div style="font-size:11px;color:var(--mut);margin-top:1px">${s.action}</div>`+
            `</div></div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:13px;font-weight:600">Active Dunning Sequences <span class="tnum" style="font-weight:400;color:var(--mut)">· ${DUN_DATA.length} accounts</span></span>
        <div style="display:flex;gap:8px">
          <span class="chip">${svg(I.filter,13)} Stage</span>
          <span class="chip" style="cursor:pointer" data-act="download" data-arg="xlsx|Dunning Report|${DUN_DATA.length} sequences · ${fmt(dunTotal)} exposure">${svg(I.download,13)} Export</span>
        </div>
      </div>
      <div class="table-wrap" style="border:none">
        <table>
          <thead><tr>
            <th>Customer</th>
            <th class="num">Amount</th>
            <th class="num">Day</th>
            <th>Last Attempt</th>
            <th>Next Action</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
          <tbody>${DUN_DATA.map(r=>`<tr style="cursor:pointer" data-act="colldetail" data-arg="${r.acct}">`+
            `<td class="nm">${r.acct}</td>`+
            `<td class="num tnum">${fmt(r.amt)}</td>`+
            `<td class="num tnum" style="color:${dayBarColor(r.day)};font-weight:700">${r.day}</td>`+
            `<td class="mut">${r.last}</td>`+
            `<td style="font-size:12px;color:${dayBarColor(r.day)}">${r.next}</td>`+
            `<td>${pill(r.status,r.sl)}</td>`+
            `<td style="text-align:right"><button class="btn ghost" style="font-size:11px;padding:4px 8px;height:auto" data-act="colldetail" data-arg="${r.acct}">Log contact</button></td>`+
            `</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));

  requestAnimationFrame(()=>{
    const canvas = document.getElementById('recoveryChart'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || 400; const H = 130;
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const recovered = [9200, 11400, 13800, 15200, 14600, 18400];
    const atRisk =    [52000,48000,44000,51000,49000,47200];
    const mo = ['Jan','Feb','Mar','Apr','May','Jun'];
    const pad = {l:36,r:12,t:8,b:28};
    const cw = W-pad.l-pad.r, ch = H-pad.t-pad.b;
    const maxR = 55000;
    const xp = (i)=>pad.l+i*(cw/5);
    const yp = (v)=>pad.t+ch-(v/maxR)*ch;
    const style = getComputedStyle(document.documentElement);
    const borderC = style.getPropertyValue('--border').trim()||'#2a2521';
    const textC = style.getPropertyValue('--mut').trim()||'#7a7068';
    [0,20000,40000].forEach(g=>{
      ctx.beginPath(); ctx.strokeStyle=borderC; ctx.lineWidth=1;
      ctx.moveTo(pad.l,yp(g)); ctx.lineTo(pad.l+cw,yp(g)); ctx.stroke();
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='right';
      ctx.fillText(g===0?'$0':'$'+(g/1000)+'k', pad.l-4, yp(g)+3);
    });
    const bw = (cw/5)*0.35;
    atRisk.forEach((v,i)=>{
      ctx.fillStyle='rgba(239,68,68,0.18)';
      const bh = (v/maxR)*ch;
      ctx.fillRect(xp(i)-bw/2, pad.t+ch-bh, bw, bh);
    });
    ctx.beginPath();
    recovered.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+ch);
    grad.addColorStop(0,'rgba(34,197,94,0.25)'); grad.addColorStop(1,'rgba(34,197,94,0.02)');
    ctx.lineTo(xp(5),pad.t+ch); ctx.lineTo(xp(0),pad.t+ch); ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath();
    recovered.forEach((v,i)=>i===0?ctx.moveTo(xp(i),yp(v)):ctx.lineTo(xp(i),yp(v)));
    ctx.strokeStyle='#22c55e'; ctx.lineWidth=2; ctx.stroke();
    ctx.beginPath(); ctx.arc(xp(5),yp(recovered[5]),4,0,Math.PI*2);
    ctx.fillStyle='#22c55e'; ctx.fill();
    mo.forEach((m,i)=>{
      ctx.fillStyle=textC; ctx.font='10px ui-monospace,monospace'; ctx.textAlign='center';
      ctx.fillText(m, xp(i), H-8);
    });
  });
};

/* ---------- Revenue Recognition ---------- */
