/* delonix — consolidation.js */

VIEWS.consolidation = (v)=>{
  requestAnimationFrame(()=>{
    const b = document.getElementById('consoBody');
    if(!b) return;
    window._consoEntityRows = b.innerHTML;
    const rows = [...b.querySelectorAll('tr')];
    window._consoGroupRows = rows.length ? rows[rows.length-1].outerHTML : b.innerHTML;
  });
  v.appendChild(el(`<div class="view">
    ${pageHead('Consolidation',
      'Multi-entity consolidation · June 2026',
      `<div class="seg" id="consoSeg">
        <button data-act="consoview" data-arg="group">Consolidated</button>
        <button class="on" data-act="consoview" data-arg="entity">By entity</button>
      </div>
      <button class="btn ghost" data-act="download" data-arg="xlsx|Consolidated Statements|Q2 2026 · 3 entities">${svg(I.download,15)} Export</button>
      <button class="btn primary" data-act="eliminations">${svg(I.check,15)} Run Eliminations</button>`
    )}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      ${kpi('Consolidated ARR','$5.02M','all entities',{trend:6.1,accent:true})}
      ${kpi('Consolidated MRR','$418,350','Jun 2026',{trend:4.2})}
      ${kpi('Interco Eliminations','$38,400','Jun 2026',{})}
      ${kpi('FX Impact (MTD)','−$4,200','USD equivalent',{trend:-1.1})}
    </div>

    <div style="margin-bottom:16px">
      <div class="card panel">
        <div class="panel-head"><h3>Entity overview</h3><span class="sub">June 2026 · functional currency reporting</span></div>
        <div class="table-wrap" style="border:none">
          <table>
            <thead><tr><th>Entity</th><th>Country</th><th>Currency</th><th class="num">MRR (local)</th><th class="num">MRR (USD)</th><th class="num">ARR (USD)</th><th>Status</th></tr></thead>
            <tbody id="consoBody">
              <tr>
                <td class="nm">Delonix Inc</td>
                <td class="mut">United States</td>
                <td class="mut">USD</td>
                <td class="num tnum">$348,200</td>
                <td class="num tnum">$348,200</td>
                <td class="num tnum mut">$4.18M</td>
                <td>${pill('good','Open')}</td>
              </tr>
              <tr>
                <td class="nm">Delonix EU GmbH</td>
                <td class="mut">Germany</td>
                <td class="mut">EUR</td>
                <td class="num tnum">€56,400</td>
                <td class="num tnum">$60,800</td>
                <td class="num tnum mut">$730k</td>
                <td>${pill('good','Open')}</td>
              </tr>
              <tr>
                <td class="nm">Delonix APAC Pte</td>
                <td class="mut">Singapore</td>
                <td class="mut">SGD</td>
                <td class="num tnum">S$12,700</td>
                <td class="num tnum">$9,350</td>
                <td class="num tnum mut">$112k</td>
                <td>${pill('warn','Pending')}</td>
              </tr>
              <tr style="border-top:1px solid var(--border-2)">
                <td style="font-weight:700;color:var(--text-1)">Consolidated (pre-elim)</td>
                <td class="mut">—</td>
                <td class="mut">USD</td>
                <td class="num tnum">—</td>
                <td class="num tnum" style="font-weight:700">$418,350</td>
                <td class="num tnum mut" style="font-weight:700">$5.02M</td>
                <td>${pill('warn','In progress')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="two-col" style="margin-bottom:16px;align-items:start">
      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>Intercompany eliminations</h3><span class="sub">June 2026 · USD equivalent</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Transaction</th><th>From</th><th>To</th><th class="num">Amount</th><th>Type</th><th>Status</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Management fee</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="num tnum">$18,000</td>
                  <td>${pill('muted','Revenue')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">IP royalty</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix APAC Pte</td>
                  <td class="num tnum">$8,400</td>
                  <td>${pill('muted','Revenue')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">Shared services</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="num tnum">$7,200</td>
                  <td>${pill('muted','Expense')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr>
                  <td class="nm">Interco loan interest</td>
                  <td class="mut" style="font-size:11px">Delonix EU GmbH</td>
                  <td class="mut" style="font-size:11px">Delonix Inc</td>
                  <td class="num tnum">$4,800</td>
                  <td>${pill('muted','Interest')}</td>
                  <td>${pill('good','Eliminated')}</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)" colspan="3">Total eliminations</td>
                  <td class="num tnum" style="font-weight:700;color:var(--ember)">$38,400</td>
                  <td></td>
                  <td>${pill('good','All clear')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Consolidated P&amp;L (MTD)</h3><span class="sub">June 2026 · USD · post-elimination</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Line item</th><th class="num">Jun 2026</th><th class="num">May 2026</th><th class="num">Var</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">Gross revenue</td>
                  <td class="num tnum">$487,200</td>
                  <td class="num tnum mut">$463,000</td>
                  <td class="num tnum" style="color:var(--good)">+5.2%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Less: credits &amp; refunds</td>
                  <td class="num tnum mut" style="font-size:12px">($14,200)</td>
                  <td class="num tnum mut" style="font-size:12px">($13,100)</td>
                  <td class="num tnum mut" style="font-size:12px">+8.4%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Less: interco eliminations</td>
                  <td class="num tnum mut" style="font-size:12px">($38,400)</td>
                  <td class="num tnum mut" style="font-size:12px">($35,200)</td>
                  <td class="num tnum mut" style="font-size:12px">+9.1%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)">Net revenue</td>
                  <td class="num tnum" style="font-weight:700;color:var(--ember)">$434,600</td>
                  <td class="num tnum mut" style="font-weight:600">$414,700</td>
                  <td class="num tnum" style="color:var(--good);font-weight:600">+4.8%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Cost of revenue</td>
                  <td class="num tnum mut" style="font-size:12px">($126,000)</td>
                  <td class="num tnum mut" style="font-size:12px">($122,400)</td>
                  <td class="num tnum mut" style="font-size:12px">+2.9%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:600;color:var(--text-1)">Gross profit</td>
                  <td class="num tnum" style="font-weight:600">$308,600</td>
                  <td class="num tnum mut">$292,300</td>
                  <td class="num tnum" style="color:var(--good)">+5.6%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-3);font-size:11px;padding-left:4px">Gross margin</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-2)">71.0%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-3)">70.5%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--good)">+0.5pp</td>
                </tr>
                <tr>
                  <td style="color:var(--text-2);font-size:12px;padding-left:20px">Operating expenses</td>
                  <td class="num tnum mut" style="font-size:12px">($208,100)</td>
                  <td class="num tnum mut" style="font-size:12px">($201,800)</td>
                  <td class="num tnum mut" style="font-size:12px">+3.1%</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:700;color:var(--text-1)">EBITDA</td>
                  <td class="num tnum" style="font-weight:700;color:var(--good)">$100,500</td>
                  <td class="num tnum mut" style="font-weight:600">$90,500</td>
                  <td class="num tnum" style="color:var(--good);font-weight:600">+11.0%</td>
                </tr>
                <tr>
                  <td style="color:var(--text-3);font-size:11px;padding-left:4px">EBITDA margin</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-2)">23.1%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--text-3)">21.8%</td>
                  <td class="num tnum" style="font-size:11px;color:var(--good)">+1.3pp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>FX rates</h3><span class="sub">Jun 28, 2026 · vs USD</span></div>
          <div class="table-wrap" style="border:none">
            <table>
              <thead><tr><th>Currency</th><th class="num">Rate</th><th class="num">vs May avg</th><th class="num">MRR impact</th></tr></thead>
              <tbody>
                <tr>
                  <td class="nm">EUR / USD</td>
                  <td class="num tnum">1.0781</td>
                  <td class="num tnum" style="color:var(--warn)">−0.8%</td>
                  <td class="num tnum" style="color:var(--warn)">−$490</td>
                </tr>
                <tr>
                  <td class="nm">SGD / USD</td>
                  <td class="num tnum">0.7362</td>
                  <td class="num tnum" style="color:var(--warn)">−1.4%</td>
                  <td class="num tnum" style="color:var(--warn)">−$130</td>
                </tr>
                <tr style="border-top:1px solid var(--border-2)">
                  <td style="font-weight:600;color:var(--text-1)">Total FX impact</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum">—</td>
                  <td class="num tnum" style="font-weight:700;color:var(--warn)">−$620</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="font-size:11px;color:var(--text-3);margin-top:10px;letter-spacing:.03em">MTD FX translation loss: −$4,200 (cumulative unrealised)</div>
        </div>

        <div class="card panel" style="margin-bottom:16px">
          <div class="panel-head"><h3>MRR by entity</h3><span class="sub">June 2026 · USD equivalent</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;padding:4px 0">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix Inc (USD)</span>
                <span class="tnum" style="color:var(--text-2)">$348,200 · 83.2%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:83.2%;border-radius:4px;background:var(--ember)"></div>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix EU GmbH (EUR)</span>
                <span class="tnum" style="color:var(--text-2)">$60,800 · 14.5%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:14.5%;border-radius:4px;background:#64748b"></div>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                <span style="color:var(--text-1);font-weight:600">Delonix APAC Pte (SGD)</span>
                <span class="tnum" style="color:var(--text-2)">$9,350 · 2.2%</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--surface-3);overflow:hidden">
                <div style="height:100%;width:2.2%;border-radius:4px;background:var(--text-3)"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head"><h3>Consolidation status</h3></div>
          <div style="display:flex;flex-direction:column;gap:8px;padding:4px 0">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix Inc data</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix EU GmbH data</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Delonix APAC Pte data</span>
              ${pill('warn','Pending bank rec')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Interco eliminations</span>
              ${pill('good','Complete')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">FX translation</span>
              ${pill('good','Applied')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:12px;color:var(--text-2)">Consolidated statements</span>
              ${pill('warn','Pending APAC')}
            </div>
            <button class="btn primary" style="justify-content:center;margin-top:4px" data-act="consolidation">${svg(I.check,15)} Run Full Consolidation</button>
          </div>
        </div>
      </div>
    </div>
  </div>`));
};


/* ---------- Financial Statements ---------- */
