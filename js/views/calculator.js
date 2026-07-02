/* delonix — calculator.js */

VIEWS.calculator = (v)=>{
  const CALCS = [
    {id:'CALC-001',name:'Enterprise ROI Calculator',status:'published',views:1284,leads:87,lastEdit:'Jun 22',url:'calc.delonix.io/enterprise-roi'},
    {id:'CALC-002',name:'API Pricing Estimator',status:'published',views:632,leads:41,lastEdit:'Jun 15',url:'calc.delonix.io/api-pricing'},
    {id:'CALC-003',name:'TCO vs Legacy System',status:'draft',views:0,leads:0,lastEdit:'Jun 27',url:'—'},
    {id:'CALC-004',name:'Multi-Site Property Manager',status:'published',views:319,leads:22,lastEdit:'May 30',url:'calc.delonix.io/property'},
  ];
  v.appendChild(el(`<div class="view">
  ${pageHead('Pricing Calculator','Build and embed interactive pricing calculators for sales, website and customer portal',
    `<button class="btn ghost" data-act="toast" data-arg="Opening template library…">Browse templates</button>
     <button class="btn primary" data-act="newcalculator">+ New calculator</button>`
  )}
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-bottom:18px;display:none">
      <button class="btn ghost" data-act="toast" data-arg="Opening template library…">Browse templates</button>
      <button class="btn primary" data-act="newcalculator">+ New calculator</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      ${CALCS.map(c=>`
        <div class="card" style="padding:18px;cursor:pointer" data-act="editcalculator" data-arg="${c.id}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div>
              <div style="font-size:15px;font-weight:650;margin-bottom:4px">${c.name}</div>
              <div class="mut" style="font-size:12px">${c.id} · edited ${c.lastEdit}</div>
            </div>
            ${c.status==='published'?pill('ok','Published'):pill('muted','Draft')}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700">${c.views.toLocaleString()}</div>
              <div class="mut" style="font-size:11px">Views</div>
            </div>
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700;color:var(--ok)">${c.leads}</div>
              <div class="mut" style="font-size:11px">Leads</div>
            </div>
            <div style="background:var(--surface);padding:8px;border-radius:6px;text-align:center">
              <div style="font-size:18px;font-weight:700">${c.leads&&c.views?Math.round(c.leads/c.views*100):0}%</div>
              <div class="mut" style="font-size:11px">Conversion</div>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="editcalculator" data-arg="${c.id}">${svg(I.settings,13)} Edit</button>
            ${c.status==='published'?`<button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="toast" data-arg="Copied embed code for ${c.name}">${svg(I.api,13)} Embed</button>`:''}
            <button class="btn ghost" style="flex:1;justify-content:center;font-size:12px" data-act="toast" data-arg="Opening preview for ${c.name}">${svg(I.portal,13)} Preview</button>
          </div>
        </div>`).join('')}
    </div>

    <div class="card panel">
      <div class="panel-head"><h3>Calculator builder</h3><span class="sub">Live preview — Enterprise ROI Calculator</span></div>
      <div style="display:grid;grid-template-columns:280px 1fr;gap:0;min-height:400px;border:1px solid var(--border);border-radius:8px;overflow:hidden">
        <div style="background:var(--surface);border-right:1px solid var(--border);padding:14px">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.08em;margin-bottom:10px">INPUTS</div>
          ${[
            {label:'Number of units', type:'slider', val:'120', min:'10', max:'500', step:'10'},
            {label:'Average monthly rent', type:'number', val:'2,400', prefix:'$'},
            {label:'Current software cost', type:'number', val:'3,200', prefix:'$', suffix:'/mo'},
            {label:'Staff time on billing', type:'slider', val:'8', min:'1', max:'40', suffix:'hrs/wk'},
            {label:'Payment processing fee', type:'select', val:'2.9%', opts:['1.5%','2.2%','2.9%','Custom']},
          ].map(f=>`
            <div class="fg" style="margin-bottom:10px">
              <label style="font-size:12px;font-weight:600;display:flex;justify-content:space-between">
                ${f.label}
                <span class="mut" style="font-size:11px;cursor:pointer" data-act="toast" data-arg="Field settings for ${f.label}" role="button" aria-label="Field settings for ${f.label}">${svg(I.settings,12)}</span>
              </label>
              ${f.type==='slider'?`
                <input type="range" class="finput" min="${f.min}" max="${f.max}" step="${f.step||1}" value="${f.val}" style="padding:4px 0;height:auto">
                <div style="font-size:12px;color:var(--ember);font-weight:600">${f.prefix||''}${f.val}${f.suffix||''}</div>
              `:f.type==='select'?`
                <select class="finput" style="font-size:12px">${f.opts.map(o=>`<option${o===f.val?' selected':''}>${o}</option>`).join('')}</select>
              `:`
                <div style="display:flex;align-items:center;gap:4px">
                  ${f.prefix?`<span class="mut">${f.prefix}</span>`:''}
                  <input class="finput" value="${f.val}" style="font-size:13px">
                  ${f.suffix?`<span class="mut">${f.suffix}</span>`:''}
                </div>`}
            </div>`).join('')}
          <button class="btn ghost" style="width:100%;justify-content:center;font-size:12px;margin-top:6px" data-act="addcalcfield" data-arg="">+ Add input field</button>
        </div>
        <div style="padding:24px;display:flex;flex-direction:column;gap:16px">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);letter-spacing:.08em">LIVE RESULTS PREVIEW</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            ${[
              {label:'Annual savings', val:'$147,600', color:'var(--ok)', sub:'vs current stack'},
              {label:'ROI', val:'312%', color:'var(--ember)', sub:'year one'},
              {label:'Payback period', val:'3.8 mo', color:'var(--ok)', sub:'fully loaded'},
            ].map(k=>`
              <div style="background:var(--surface);padding:14px;border-radius:8px;text-align:center">
                <div style="font-size:22px;font-weight:700;color:${k.color}">${k.val}</div>
                <div style="font-size:12px;font-weight:600;margin:2px 0">${k.label}</div>
                <div class="mut" style="font-size:11px">${k.sub}</div>
              </div>`).join('')}
          </div>
          <div style="background:var(--surface);padding:14px;border-radius:8px">
            <div style="font-size:12px;font-weight:700;margin-bottom:10px">5-YEAR VALUE BREAKDOWN</div>
            ${[['Billing automation savings','$61,200'],['Reduced payment failures','$28,400'],['Staff time recaptured','$47,040'],['Faster collections (DSO −12 days)','$18,200'],['Overage & expansion revenue','$22,800']].map(r=>`
              <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:13px">
                <span>${r[0]}</span><span style="font-weight:600;color:var(--ok)">${r[1]}</span>
              </div>`).join('')}
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn ghost" data-act="editformulas" data-arg="">Edit formulas</button>
            <button class="btn ghost" data-act="toast" data-arg="Copied embed code">Copy embed</button>
            <button class="btn primary" data-act="publishcalc" data-arg="enterprise-roi">Publish changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};

/* ============================================================
   Custom Entities view
   ============================================================ */
