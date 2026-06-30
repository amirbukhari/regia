/* delonix — migration.js */

VIEWS.migration = (v)=>{
  const recons = [
    {metric:'Customer records',legacy:'312',current:'289',delta:'-23',note:'23 pending mapping',status:'warn'},
    {metric:'Active subscriptions',legacy:'308',current:'289',delta:'-19',note:'19 remapped to BU-001/002',status:'ok'},
    {metric:'Invoice total (May 2026)',legacy:'$1,847,200',current:'$1,846,850',delta:'-$350',note:'Rounding & proration diff',status:'ok'},
    {metric:'Revenue recognized (May 2026)',legacy:'$142,800',current:'$143,100',delta:'+$300',note:'Tax recalculation applied',status:'ok'},
    {metric:'Open AR balance',legacy:'$24,200',current:'$23,850',delta:'-$350',note:'Void + re-bill corrections',status:'ok'},
    {metric:'Usage events ingested',legacy:'N/A',current:'47,214',delta:'47,214',note:'All BuildStream events imported',status:'ok'},
    {metric:'Failed usage events',legacy:'N/A',current:'23',delta:'23',note:'23 events need source mapping',status:'warn'},
    {metric:'Product SKU mappings',legacy:'14',current:'11',delta:'-3',note:'3 legacy SKUs unmapped',status:'warn'},
  ];

  const unresolved = [
    {legacyId:'BS-CUST-4821',name:'Riverfront Properties',product:'BuildStream Pro',issue:'No matching delonix account',severity:'crit'},
    {legacyId:'BS-CUST-4798',name:'Harborview Mgmt',product:'BuildStream Enterprise',issue:'Product SKU not found in BU-001',severity:'warn'},
    {legacyId:'BS-CUST-4791',name:'Meadow Creek HOA',product:'BuildStream Starter',issue:'Duplicate customer detected — may be alias',severity:'crit'},
    {legacyId:'BS-CUST-4765',name:'Sunrise Capital Group',product:'BuildStream Pro',issue:'Multiple delonix accounts match',severity:'warn'},
    {legacyId:'BS-CUST-4758',name:'Pacific Coast Properties',product:'BuildStream Enterprise',issue:'Missing invoice contact email',severity:'warn'},
    {legacyId:'BS-CUST-4742',name:'Lakefront Estates LLC',product:'BuildStream Pro',issue:'Currency mismatch: GBP vs USD',severity:'crit'},
  ];

  const idMappings = [
    {legacy:'BS-CUST-0001',current:'ACC-2024-0847',type:'Customer',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-CUST-0002',current:'ACC-2024-0848',type:'Customer',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-CUST-0003',current:'ACC-2024-0851',type:'Customer',status:'ok',confidence:'Medium',batch:'BATCH-MIG-001'},
    {legacy:'BS-INV-10291',current:'INV-2026-0812',type:'Invoice',status:'ok',confidence:'High',batch:'BATCH-MIG-002'},
    {legacy:'BS-INV-10290',current:'INV-2026-0811',type:'Invoice',status:'ok',confidence:'High',batch:'BATCH-MIG-002'},
    {legacy:'BS-PROD-PRO',current:'PLN-ENTERPRISE',type:'Product',status:'ok',confidence:'High',batch:'BATCH-MIG-001'},
    {legacy:'BS-PROD-ENT',current:'PLN-ENTERPRISE-PLUS',type:'Product',status:'ok',confidence:'Medium',batch:'BATCH-MIG-001'},
    {legacy:'BS-PROD-STR',current:'—',type:'Product',status:'warn',confidence:'None',batch:'BATCH-MIG-001'},
  ];

  const batches = [
    {id:'BATCH-MIG-003',desc:'Failed usage events + 3 unresolved customers',started:'Jun 28 · 08:00',status:'running',pct:45},
    {id:'BATCH-MIG-002',desc:'Invoice history import — 1,847 invoices',started:'Jun 20 · 02:00',status:'complete',pct:100},
    {id:'BATCH-MIG-001',desc:'Customer + subscription initial migration — 312 accounts',started:'Jun 10 · 02:00',status:'complete',pct:100},
  ];

  v.appendChild(el(`<div class="view">
    ${pageHead('Migration & Source Systems','BuildStream acquisition · 312 legacy customers · 3 source systems',
      `<button class="btn ghost" data-act="download" data-arg="xlsx|Migration Reconciliation Report|BuildStream">${svg(I.download,14)} Export Report</button><button class="btn primary" data-act="migrationdetail" data-arg="bulk">Bulk Map</button>`)}

    <div class="grid kpis" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${kpi('Legacy Customers','312','from BuildStream acquisition',{accent:true})}
      ${kpi('Mapped','289','93% complete',{trend:6.1})}
      ${kpi('Unresolved','23','need manual mapping',{})}
      ${kpi('Revenue Variance','-$350','invoice total diff — within tolerance',{})}
    </div>

    <!-- Source Systems -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Source Systems</h3></div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>System</th><th>Type</th><th>Records</th><th>Last Sync</th><th>Coverage</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${SOURCE_SYSTEMS.map(s=>`<tr data-act="migrationdetail" data-arg="${s.id}" style="cursor:pointer">
              <td style="font-weight:600;font-size:13px">${s.name}</td>
              <td class="mut" style="font-size:12px">${s.type}</td>
              <td class="tnum" style="font-size:12.5px">${s.records}</td>
              <td class="mut tnum" style="font-size:11.5px">${s.lastSync}</td>
              <td style="font-size:12px">${s.coverage}</td>
              <td>${s.status==='active'?pill('good','Active'):s.status==='complete'?pill('ember','Complete'):pill('warn',s.status)}</td>
              <td class="mut">${svg('<polyline points="9 18 15 12 9 6"/>',14)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Migration Batches -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)"><h3>Migration Batches</h3></div>
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px">
        ${batches.map(b=>`<div style="padding:12px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface)">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span class="mono mut" style="font-size:12px">${b.id}</span>
            <span style="font-size:13px;font-weight:600;flex:1">${b.desc}</span>
            ${b.status==='complete'?pill('good','Complete'):b.status==='running'?pill('ember','Running'):pill('warn',b.status)}
            <span class="mut" style="font-size:11.5px">${b.started}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden">
              <div style="width:${b.pct}%;height:100%;background:${b.pct===100?'var(--pos)':'var(--ember)'}"></div>
            </div>
            <span class="mut" style="font-size:11.5px;font-variant-numeric:tabular-nums;min-width:35px">${b.pct}%</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Reconciliation -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>BuildStream Reconciliation — May 2026</h3>
        <span class="mut" style="font-size:12px">Last run: Jun 28 · 02:00 AM · auto-runs nightly</span>
      </div>
      <div style="padding:0 18px 18px">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:0;padding:8px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-2);border-bottom:1px solid var(--border)">
          <div>Metric</div><div class="num">Legacy (BuildStream)</div><div class="num">Current (delonix)</div><div class="num">Delta</div>
        </div>
        ${recons.map(r=>`<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:0;padding:8px 0;border-bottom:1px solid var(--border);align-items:center">
          <div style="font-size:13px;font-weight:600">${r.metric}</div>
          <div class="num tnum" style="font-size:13px">${r.legacy}</div>
          <div class="num tnum" style="font-size:13px">${r.current}</div>
          <div class="num tnum" style="font-size:13px;font-weight:600;color:${r.status==='warn'?'var(--warn)':'var(--text)'}">
            ${r.delta} <span class="mut" style="font-weight:400;font-size:11px">${r.note}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Unresolved Customers -->
    <div class="card panel" style="margin-bottom:20px;padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>Unresolved Customers (${unresolved.length})</h3>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px" data-act="migrationdetail" data-arg="bulk">Bulk Map</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>Legacy ID</th><th>Legacy Name</th><th>Legacy Product</th><th>Issue</th><th>Severity</th><th>Actions</th></tr></thead>
          <tbody>${unresolved.map(u=>`<tr>
            <td class="mono mut" style="font-size:11.5px">${u.legacyId}</td>
            <td style="font-size:13px;font-weight:600">${u.name}</td>
            <td class="mut" style="font-size:12px">${u.product}</td>
            <td style="font-size:12px;color:${u.severity==='crit'?'var(--neg)':'var(--warn)'}">${u.issue}</td>
            <td>${u.severity==='crit'?pill('crit','Critical'):pill('warn','Warning')}</td>
            <td><button class="btn ghost" style="padding:4px 9px;font-size:11px" data-act="migrationdetail" data-arg="${u.legacyId}">${u.severity==='crit'?'Resolve':'Map'}</button></td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Legacy ID Mapping Table -->
    <div class="card panel" style="padding:0;overflow:hidden">
      <div class="panel-head" style="border-bottom:1px solid var(--border)">
        <h3>Legacy ID Mappings</h3>
        <span class="mut" style="font-size:12px">${idMappings.filter(m=>m.status==='ok').length}/${idMappings.length} mapped · showing sample</span>
        <button class="btn ghost" style="font-size:12px;padding:5px 10px;margin-left:8px" data-act="download" data-arg="csv|Legacy ID Mapping|full export">Export All</button>
      </div>
      <div class="table-wrap" style="margin:0">
        <table>
          <thead><tr><th>Legacy ID</th><th>Type</th><th>Maps To</th><th>Batch</th><th>Confidence</th><th>Status</th></tr></thead>
          <tbody>${idMappings.map(m=>`<tr>
            <td class="mono mut" style="font-size:11.5px">${m.legacy}</td>
            <td class="mut" style="font-size:12px">${m.type}</td>
            <td class="mono" style="font-size:11.5px;${m.current==='—'?'color:var(--neg)':''}">${m.current}</td>
            <td class="mono mut" style="font-size:11px">${m.batch}</td>
            <td style="font-size:12px;color:${m.confidence==='High'?'var(--pos)':m.confidence==='Medium'?'var(--text)':m.confidence==='None'?'var(--neg)':'var(--warn)'}">${m.confidence}</td>
            <td>${m.status==='ok'?pill('good','Mapped'):pill('warn','Unmapped')}</td>
          </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`));
};
