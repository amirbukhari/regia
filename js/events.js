/* delonix — delegated event handlers */

/* ---- delegated events (CSP-safe: no inline on* handlers) ---- */

document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]'); if(!t) return;
  const a=t.dataset.act, arg=t.dataset.arg;
  if(a==='enter') return enterApp(e);
  if(a==='signout') return signOut();
  if(a==='close') return closeDrawer();
  if(a==='toggle') return t.classList.toggle('on');
  if(a==='featureflag') return toggleFeatureFlag(arg, t);
  if(a==='resetflags') return resetFeatureFlagUI();
  if(a==='menu') return document.getElementById('app').classList.toggle('nav-open');
  if(a==='route'){ closeDrawer(); return route(arg); }
  if(a==='invoice') return openInvoice(arg);
  if(a==='account') return openAccount(arg);
  if(a==='revsched') return openRevSchedule(arg);
  if(a==='subdetail') return openSubscription(arg);
  if(a==='paydetail') return openPayment(arg);
  if(a==='retrypay') return openRetryPayment(arg);
  if(a==='refund') return openRefund(arg);
  if(a==='colldetail') return openCollectionDetail(arg);
  if(a==='lens') return setDashLens(arg, t);
  if(a==='toast') return toast(arg);
  if(a==='featuredetail') return openFeatureDetail(arg);
  if(a==='workspaceaction') return openWorkspaceAction(arg);
  if(a==='workspacecard') return openWorkspaceCard(arg);
  if(a==='billingrunaction') return openBillingRunAction(arg);
  if(a==='billingrundetail') return openBillingRunDetail(arg);
  if(a==='billingrunexception') return openBillingRunException(arg);
  if(a==='workflowaction') return openWorkflowAction(arg);
  if(a==='workflowdetail') return openWorkflowDetail(arg);
  if(a==='workflowrun') return openWorkflowRun(arg);
  if(a==='workflowstep') return openWorkflowStep(arg);
        if(a==='theme') return setTheme(arg);
        if(a==='density') return setDensity(arg);
        if(a==='newinvoice') return openNewInvoice();
        if(a==='notifications') return openNotifications();
        if(a==='entityswitch') return openEntitySwitch();
        if(a==='currencypanel') return openCurrencyPanel();
        if(a==='newquote') return openNewQuote();
        if(a==='newcustomer') return openNewCustomer();
        if(a==='newsub') return openNewSub();
        if(a==='newcredit') return openNewCredit();
        if(a==='approveinv') return openApproveInvoice(arg);
        if(a==='voidinv') return openVoidInvoice(arg);
        if(a==='sendinvreminder') return openSendReminder(arg);
        if(a==='retrypayment') return openRetryPayment(arg);
        if(a==='refundpay') return openRefund(arg);
        if(a==='collectiondetail') return openCollectionDetail(arg);
        if(a==='manualmatch') return openManualMatch(arg);
        if(a==='dunningconfig') return openDunningConfig();
        if(a==='approvalrules') return openApprovalRules();
        if(a==='postjournals') return openPostJournals();
        if(a==='signoffclose') return openSignOff();
        if(a==='reportbuilder') return openReportBuilder();
        if(a==='schedulereport') return openScheduleReport();
        if(a==='inviteusr') return openInviteUser();
        if(a==='pricebook') return openPriceBook();
        if(a==='taxconfig') return openTaxConfig();
        if(a==='revrules') return openRevRules();
        if(a==='bizunit') return openBizUnit(arg);
        if(a==='legalentity') return openLegalEntity(arg);
        if(a==='invgrouping') return openInvoiceGroupingPolicy(arg);
        if(a==='ratingdetail') return openRatingDetail(arg);
        if(a==='audithistory') return openAuditHistory(arg);
        if(a==='creditrebill') return openCreditRebill(arg);
        if(a==='acctexport') return openAccountingExport(arg);
        if(a==='migrationdetail') return openMigrationDetail(arg);
        if(a==='draftvalidate') return openDraftValidation(arg);
        if(a==='usageevent') return openUsageEvent(arg);
        if(a==='groupingpolicy') return openGroupingPolicy(arg);
        if(a==='download') return openDownloadPanel(arg);
        if(a==='newplan') return openNewPlan();
        if(a==='newpricebook') return openNewPricebook();
        if(a==='editpricebook') return openEditPricebook(arg);
        if(a==='editplan') return openEditPlan(arg);
        if(a==='editobligation') return openEditObligation(arg);
        if(a==='newmeter') return openNewMeter();
        if(a==='usageimport') return openUsageImport();
        if(a==='manualpayment') return openManualPayment(arg);
        if(a==='glmapping') return openGLMappingEditor(arg);
        if(a==='connectintegration') return openIntegrationDetail(arg);
        if(a==='webhookdetail') return openWebhookDetail(arg);
        if(a==='sdkdocs') return openSDKDocs(arg);
        if(a==='apidocs') return openAPIDocs();
        if(a==='changeplan') return openChangePlan(arg);
        if(a==='daterange') return openDateRangePicker(arg);
        if(a==='customdomain') return openCustomDomain();
        if(a==='integeventlogs') return openIntegrationEventLogs();
        if(a==='invoicefooter') return openInvoiceFooterEditor();
        if(a==='logoupload') return openLogoUpload();
        if(a==='portaltheme') return openPortalThemeEditor();
        if(a==='renewalquote') return openRenewalQuote(arg);
        if(a==='refundpolicy') return openRefundPolicy();
        if(a==='reportarchive') return openReportArchive();
        if(a==='treasurysweep') return openTreasurySweep(arg);
        if(a==='eliminations') return openICEliminations();
        if(a==='consolidation') return openConsolidationRun();
        if(a==='collectionssweep') return openCollectionsSweep();
        if(a==='suspendaccount') return openSuspendAccount(arg);
        if(a==='apikey') return openAPIKeyCreator();
        if(a==='rotatekey') return openRotateKey(arg);
        if(a==='newbizunit') return openNewBizUnit();
        if(a==='newlegalentity') return openNewLegalEntity();
        if(a==='aiquery') return openAIQuery(arg);
        if(a==='newcalculator') return openNewCalculator();
        if(a==='editcalculator') return openEditCalculator(arg);
        if(a==='newentity') return openNewEntity();
        if(a==='newfield') return openNewField();
        if(a==='editfield') return openEditField(arg);
        if(a==='editrole') return openEditRole(arg);
        if(a==='editmember') return openEditMember(arg);
        if(a==='auditdetail') return openAuditDetail(arg);
        if(a==='applytheme') return openApplyTheme();
        if(a==='switchtheme') return doSwitchTheme(arg);
        if(a==='publishcalc') return openPublishCalc(arg);
        if(a==='editformulas') return openEditFormulas();
        if(a==='addcalcfield') return openAddCalcField();
        if(a==='scheduledigest') return openScheduleDigest();
});
const _lf=document.getElementById('loginForm');
if(_lf) _lf.addEventListener('submit',e=>{ e.preventDefault(); enterApp(e); });

/* ---- command palette wiring ---- */
const _ci=document.getElementById('cmdInput');
if(_ci){
  _ci.addEventListener('focus',()=>buildCmd(_ci.value));
  _ci.addEventListener('input',()=>buildCmd(_ci.value));
  _ci.addEventListener('keydown',e=>{
    const menu=document.getElementById('cmdMenu');
    const items=[...menu.querySelectorAll('.cmd-item')];
    let sel=menu.querySelector('.cmd-item.sel');
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();
      let i=items.indexOf(sel); i=(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;
      items.forEach(x=>x.classList.remove('sel')); items[i]?.classList.add('sel');
      items[i]?.scrollIntoView({block:'nearest'});
    } else if(e.key==='Enter'){ e.preventDefault(); (sel||items[0])?.click(); _ci.blur(); }
    else if(e.key==='Escape'){ closeCmd(); _ci.blur(); }
  });
}
document.addEventListener('click',e=>{ if(!e.target.closest('.search')) closeCmd(); });

/* ---- keyboard: ⌘K opens palette, Esc closes drawer ---- */
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault(); const ci=document.getElementById('cmdInput'); if(ci){ci.focus();ci.select();buildCmd('');}}
  if(e.key==='Escape')closeDrawer();
});
window.addEventListener('resize',()=>{ if(current==='dashboard'){drawRevChart();drawSparks();}
  if(current==='usage')drawUsageChart(); if(current==='reports')drawMrrChart(); });

/* auto-enter if user just wants to look (still shows splash first) */
