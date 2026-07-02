import Boot from './Boot';
import { LOGO_SYMBOL_INNER } from '../src/legacy/generated/logoSymbol';

/*
 * The markup below mirrors the mockup's index.html <body> one-to-one. Keep the
 * element order and attributes in sync with the mockup — the legacy scripts
 * (src/legacy) select these nodes by id and drive all interactivity.
 */

function LogoSymbol() {
  // delonix logo symbol — used in splash + sidebar (huge path data, injected verbatim)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'none' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: LOGO_SYMBOL_INNER }}
    />
  );
}

function Splash() {
  return (
    <div id="splash">
      <div className="splash-card">
        <div className="splash-logo-wrap">
          <svg className="splash-logo" viewBox="0 0 1254 1254" xmlns="http://www.w3.org/2000/svg" aria-label="delonix" role="img"><use href="#dlx-logo" /></svg>
        </div>
        <div className="splash-wordmark"><span className="splash-wm-del">del</span>onix</div>
        <div className="splash-tagline">Enterprise Revenue Operations</div>
        <form className="splash-form" id="loginForm">
          <label htmlFor="email">Work email</label>
          <input id="email" type="email" defaultValue="abukhari@rentsync.com" autoComplete="username" />
          <label htmlFor="pw">Password</label>
          <input id="pw" type="password" defaultValue="••••••••••" autoComplete="current-password" />
          <button className="enter-btn" type="button" data-act="enter">Sign in to console</button>
          <div className="splash-or"><span>or</span></div>
          <button className="sso-btn" type="button" data-act="enter">Continue with SSO · SAML</button>
        </form>
        <div className="splash-meta">
          <span><i className="dotg"></i> All systems operational</span>
          <span>SOC 2 Type II</span>
          <span className="build-stamp">Build v2026.06.30.1522 · deployed Jun 30, 2026 15:22 UTC</span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 1254 1254" xmlns="http://www.w3.org/2000/svg" aria-label="delonix emblem" role="img"><use href="#dlx-logo" /></svg>
        <div className="name"><b>del</b>onix</div>
        <div className="env">Prod</div>
      </div>
      <nav className="nav" id="nav"></nav>
      <div className="sb-foot">
        <div className="avatar">AB</div>
        <div className="who"><b>Amir Bukhari</b><br /><span>Revenue Operations</span></div>
        <button className="icon-btn" data-neonfix="true" title="Sign out" data-act="signout">
          {' '}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>{' '}
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <button className="menu-btn" data-act="menu" aria-label="Open menu" title="Menu">
        {' '}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>{' '}
      </button>
      <a className="topbar-brand" data-act="route" data-arg="dashboard" aria-label="delonix home">
        <svg className="brand-mark" viewBox="0 0 1254 1254" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><use href="#dlx-logo" /></svg>
        <span className="topbar-wm"><b>del</b>onix</span>
      </a>
      <div className="crumbs">delonix / <b id="crumb">Dashboard</b></div>
      <div className="search">
        <svg className="si" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input id="cmdInput" placeholder="Jump to… accounts, invoices, close, controls  ⌘K" autoComplete="off" />
        <div className="cmd-menu" id="cmdMenu"></div>
      </div>
      <div className="spacer"></div>
      <div className="pill-select ent" data-act="entityswitch"><span className="ent-dot"></span><span id="entLabel">Delonix Inc <b>North America</b></span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></div>
      <div className="pill-select" data-act="currencypanel">Currency <span id="curLabel"><b>USD $</b></span>{' '}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>{' '}
      </div>
      <div className="topbar-status" title="Revenue operations status"><span className="dotg"></span><span>Ops healthy</span></div>
      <button className="icon-btn" title="Notifications" data-act="notifications"><span className="dot"></span>{' '}
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>{' '}
      </button>
      <button className="btn primary" data-act="route" data-arg="billingruns">
        {' '}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></svg>{' '}
        Run billing{' '}
      </button>
    </header>
  );
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#view">Skip to main content</a>
      <LogoSymbol />

      {/* ============ SPLASH / LOGIN ============ */}
      <Splash />

      {/* ============ APP ============ */}
      <div id="app">
        <div className="nav-scrim" data-act="menu" aria-hidden="true"></div>
        <Sidebar />
        <div className="main">
          <Topbar />
          <main id="view"></main>
        </div>
      </div>

      {/* drawer */}
      <div className="drawer-bg" id="drawerBg" data-act="close"></div>
      <aside className="drawer" id="drawer"></aside>
      <div className="toast" id="toast"><span className="dotg"></span><span id="toastMsg"></span></div>

      <Boot />
    </>
  );
}
