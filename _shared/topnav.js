/**
 * Shared TopNav v4 — Nimbus cnds-header compliant (full header system)
 *
 * Renders THREE pieces matching the Nimbus screenshot:
 *   1. Utility bar    — light-gray strip with brand logo (left) + theme toggle + user avatar (right)
 *   2. Main nav bar   — rounded gray pill container with tab items
 *   3. ca-title-bar   — back-arrow + ALL-CAPS section + ALL-CAPS sub-section + horizontal accent line
 *
 * Usage (per page) — all optional, smart defaults are built in:
 *   <script>const ACTIVE_NAV = 'modules';</script>          ← already required by sidenav, drives active tab
 *   <script>const TOPNAV_USER    = { name: 'Daniel Maiworm', initials: 'DM' };</script>
 *   <script>const TOPNAV_TITLE   = 'Modules';</script>       ← optional title bar text
 *   <script>const TOPNAV_SECTION = 'On-Prem';</script>       ← optional section label
 *   <script>const TOPNAV_BACK    = '#';</script>             ← optional back URL; '' to hide
 *   <script>const TOPNAV_TABS    = [...];</script>           ← override default tabs if needed
 *   <script src="../_shared/topnav.js"></script>
 */
(function () {
  const user    = (typeof TOPNAV_USER    !== 'undefined') ? TOPNAV_USER    : { name: 'Daniel Maiworm', initials: 'DM' };
  const title   = (typeof TOPNAV_TITLE   !== 'undefined') ? TOPNAV_TITLE   : '';
  const section = (typeof TOPNAV_SECTION !== 'undefined') ? TOPNAV_SECTION : '';
  const back    = (typeof TOPNAV_BACK    !== 'undefined') ? TOPNAV_BACK    : '';
  const activeNav = (typeof ACTIVE_NAV !== 'undefined') ? ACTIVE_NAV : '';

  // Map ACTIVE_NAV values to top-level tab keys
  const navToTab = {
    'dashboard':             'dashboard',
    'endpoints':             'onprem',
    'appliances':            'onprem',
    'nodes':                 'onprem',
    'modules':               'onprem',
    'ad_custodians':         'environments',
    'ad_domains':            'environments',
    'ad_unresolved':         'environments',
    'ev_directories':        'environments',
    'ev_vault_stores':       'environments',
    'ev_archives':           'environments',
    'so_archive_connections':'environments',
    'so_business_folders':   'environments',
    'so_endpoints':          'environments',
    'ev_mail_mappings':      'mappings',
    'ev_journal_mappings':   'mappings',
    'native_folder_mappings':'mappings',
    'file_archive_mappings': 'mappings',
    'onedrive_mappings':     'mappings',
    'smtp_mappings':         'mappings',
    'sharepoint_mappings':   'mappings',
    'sourceone_mappings':    'mappings',
    'legal_cases':           'legal',
    'config_storage_buckets':    'configuration',
    'config_storage_partitions': 'configuration',
    'config_collaboration_links':'configuration',
    'config_retention':          'configuration',
    'config_containers':         'configuration',
    'config_internal_domains':   'configuration',
    'config_dynamic_ad':         'configuration',
    'config_export_policy':      'configuration',
    'config_report_location':    'configuration',
    'config_report_email':       'configuration',
    'config_tag_groups':         'configuration',
    'config_audit_logs':         'configuration',
    'admin_org_units':       'administration',
    'admin_roles':           'administration',
    'admin_users':           'administration',
    'admin_security_log':    'administration',
    'admin_languages':       'administration',
    'admin_texts':           'administration',
    'admin_templates':       'administration',
    'admin_settings':        'administration',
  };

  const activeTabKey = navToTab[activeNav] || 'dashboard';

  // Default tabs — override by defining TOPNAV_TABS before this script
  const defaultTabs = [
    { key: 'dashboard',      label: 'Dashboard',      icon: 'grid_view',       href: '../dashboard/dashboard.html' },
    { key: 'onprem',         label: 'On-Prem',        icon: 'storage',         href: '../endpoint_management_overview_focus/endpoint_management_overview_focus.html' },
    { key: 'environments',   label: 'Environments',   icon: 'layers',          href: '../ev_vault_stores_overview/ev_vault_stores_overview.html' },
    { key: 'mappings',       label: 'Mappings',       icon: 'sync_alt',        href: '../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html' },
    { key: 'legal',          label: 'Legal',          icon: 'gavel',           href: '../legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html' },
    { key: 'configuration',  label: 'Configuration',  icon: 'tune',            href: '../storage_buckets_content_sync/storage_buckets_content_sync.html' },
    { key: 'administration', label: 'Administration', icon: 'manage_accounts', href: '../users_design_sync/users_design_sync.html' },
  ];

  const tabs = (typeof TOPNAV_TABS !== 'undefined') ? TOPNAV_TABS : defaultTabs.map(t => ({
    ...t,
    active: t.key === activeTabKey,
  }));

  const logoImg = `<img class="cf-brand-mark" src="../_shared/cloudficient_cloudficient-expireon_1760436020615.png" alt="Expireon">`;

  // ─── Utility bar ──────────────────────────────────────────────
  const utilityBar = `
<nav class="cf-utility-bar" aria-label="Utility navigation">
  <a class="cf-brand" href="../dashboard/dashboard.html" aria-label="Expireon Home">
    ${logoImg}
  </a>

  <div class="cf-utility-tools">
    <button class="cf-icon-btn" id="cf-nav-theme" data-cnds-toggle="theme"
            aria-label="Toggle theme" title="Switch to dark theme">
      <span class="material-symbols-outlined">bedtime</span>
    </button>

    <span class="cf-utility-divider" aria-hidden="true"></span>

    <div class="cf-user-info-wrapper">
      <button class="cf-user-info" id="cf-nav-user"
              aria-haspopup="menu" aria-expanded="false" aria-controls="cf-user-menu">
        <span class="cf-user-avatar">${user.initials}</span>
        <span class="cf-user-name">${user.name}</span>
      </button>
      <div class="cf-account-menu" id="cf-user-menu" role="menu" aria-hidden="true">
        <div class="cf-account-menu-header">${user.name}</div>
        <a class="cf-account-menu-item" href="#" role="menuitem">My Profile</a>
        <a class="cf-account-menu-item" href="#" role="menuitem">Account Settings</a>
        <a class="cf-account-menu-item" href="#" role="menuitem">API Keys</a>
        <a class="cf-account-menu-item" href="#" role="menuitem">Sign Out</a>
      </div>
    </div>
  </div>
</nav>`;

  // ─── Main nav bar ────────────────────────────────────────────
  const mainNav = `
<div class="cf-main-nav-wrapper">
  <nav class="cf-main-nav" aria-label="Main navigation">
    ${tabs.map(t => `
    <a href="${t.href || '#'}" class="cf-main-nav-link ${t.active ? 'active' : ''}" data-key="${t.key}">
      ${t.icon ? `<span class="material-symbols-outlined">${t.icon}</span>` : ''}
      <span>${t.label}</span>
    </a>`).join('')}
    <button class="cf-main-nav-more" aria-label="More" title="More">
      <span class="material-symbols-outlined">more_vert</span>
    </button>
  </nav>
</div>`;

  // ─── Title bar (optional, only if TOPNAV_TITLE provided) ────
  const titleBar = title ? `
<div class="cf-title-bar">
  ${back !== '' ? `<a href="${back}" class="cf-title-back" aria-label="Back"><span class="material-symbols-outlined">arrow_back</span></a>` : ''}
  <span class="cf-title-main">${title}</span>
  ${section ? `<span class="cf-title-divider" aria-hidden="true"></span><span class="cf-title-section">${section}</span>` : ''}
  <span class="cf-title-accent" aria-hidden="true"></span>
</div>` : '';

  // ─── Styles ────────────────────────────────────────────────────
  const styleId = '_shared-topnav-styles-v4';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* ─── App shell: top bar SPANS above sidebar + main ─── */
      body.cf-app-shell {
        display: flex !important;
        flex-direction: column !important;
      }
      body.cf-app-shell .cf-app-row {
        display: flex;
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }
      body.cf-app-shell .sidenav[data-purpose="shared-sidenav"] {
        height: auto !important;
      }
      body.cf-app-shell .sidenav[data-purpose="shared-sidenav"] .sidenav-header {
        display: none !important;
      }

      /* ─────────────────────────────────────────────────────────
         Nimbus Header — ExpireOn (light theme)
         ───────────────────────────────────────────────────────── */
      .cf-utility-bar {
        display: flex; align-items: center; justify-content: space-between;
        height: 64px; padding: 0 32px;
        background: var(--cnds-surface-light-200, #ebebeb);
        color: var(--cnds-surface-light-950, #141414);
        flex-shrink: 0;
        font-family: var(--cnds-typography-typeface-family-default, "Nunito Sans"), system-ui, sans-serif;
      }

      /* ─── Brand ──────────────────────────────────────────────── */
      .cf-brand {
        display: inline-flex; align-items: center;
        gap: 14px;
        text-decoration: none;
        color: inherit;
        flex-shrink: 0;
      }
      .cf-brand-mark { height: 32px; width: auto; display: block; flex-shrink: 0; }

      /* ─── Utility tools (right side) ────────────────────────── */
      .cf-utility-tools {
        display: flex; align-items: center; gap: 8px;
        flex-shrink: 0;
      }
      .cf-utility-divider {
        display: inline-block;
        width: 1px; height: 28px;
        background: rgba(20,20,20,0.18);
        margin: 0 8px;
      }
      .cf-icon-btn {
        background: 0; border: 0;
        width: 38px; height: 38px;
        border-radius: 999px;
        color: #141414;
        cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center;
        transition: background-color .15s;
      }
      .cf-icon-btn:hover { background: rgba(20,20,20,0.06); }
      .cf-icon-btn .material-symbols-outlined { font-size: 22px; }

      /* ─── User info ──────────────────────────────────────────── */
      .cf-user-info-wrapper { position: relative; }
      .cf-user-info {
        display: inline-flex; align-items: center; gap: 10px;
        height: 40px; padding: 0 12px 0 4px;
        background: 0; border: 0;
        color: #141414;
        font: inherit; font-size: 14px; font-weight: 500;
        border-radius: 999px;
        cursor: pointer;
        white-space: nowrap;
      }
      .cf-user-info:hover { background: rgba(20,20,20,0.06); }
      .cf-user-avatar {
        width: 32px; height: 32px;
        border-radius: 999px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        color: #fff;
        font-weight: 700; font-size: 12px;
        letter-spacing: -0.02em; line-height: 1;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        user-select: none;
      }
      .cf-user-name { color: #141414; }

      /* ─── Account menu ──────────────────────────────────────── */
      .cf-account-menu {
        display: none;
        position: absolute; top: calc(100% + 8px); right: 0;
        min-width: 220px;
        background: #fff;
        border: 1px solid #cccccc;
        border-radius: 8px;
        box-shadow: 0 2px 15px -3px rgba(0,0,0,.12), 0 10px 25px -2px rgba(0,0,0,.10);
        z-index: 1000;
        overflow: hidden;
      }
      .cf-account-menu.open { display: block; }
      .cf-account-menu-header {
        background: #ebebeb;
        padding: 12px 16px;
        font-size: 11px; font-weight: 800;
        letter-spacing: 0.10em; text-transform: uppercase;
        color: #4f4f4f;
      }
      .cf-account-menu-item {
        display: flex; align-items: center;
        padding: 10px 16px; height: 40px;
        font-size: 13.5px; font-weight: 400;
        color: #4f4f4f;
        text-decoration: none;
        transition: background-color .12s;
      }
      .cf-account-menu-item:hover { background: #e0e0e0; }

      /* ─── Main nav (pill container with tabs) ───────────────── */
      .cf-main-nav-wrapper {
        padding: 12px 24px 0;
        background: #fff;
        flex-shrink: 0;
      }
      .cf-main-nav {
        display: flex; align-items: stretch;
        background: var(--cnds-surface-light-200, #ebebeb);
        border-radius: 12px;
        padding: 4px;
        position: relative;
        overflow-x: auto;
        scrollbar-width: thin;
      }
      .cf-main-nav-link {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 12px 18px;
        font-size: 13px; font-weight: 700;
        letter-spacing: 0.12em; text-transform: uppercase;
        color: var(--cnds-body-color, #4f4f4f);
        text-decoration: none;
        border-radius: 8px;
        position: relative;
        white-space: nowrap;
        transition: background-color .15s, color .15s;
      }
      .cf-main-nav-link:hover {
        background: rgba(255,255,255,0.6);
        color: #1a1a1a;
      }
      .cf-main-nav-link.active {
        background: #fff;
        color: #1a1a1a;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      .cf-main-nav-link.active::after {
        content: '';
        position: absolute;
        left: 18px; right: 18px;
        bottom: 4px;
        height: 3px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        border-radius: 3px;
      }
      .cf-main-nav-link .material-symbols-outlined {
        font-size: 18px;
        color: var(--cnds-secondary-color, #4f4f4f99);
      }
      .cf-main-nav-link.active .material-symbols-outlined {
        color: var(--cnds-product-accent, #4e45d6);
      }
      .cf-main-nav-more {
        margin-left: auto;
        background: 0; border: 0;
        width: 38px; height: 38px;
        border-radius: 8px;
        color: var(--cnds-secondary-color, #4f4f4f99);
        cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .cf-main-nav-more:hover { background: rgba(255,255,255,0.6); color: #1a1a1a; }
      .cf-main-nav-more .material-symbols-outlined { font-size: 20px; }

      /* ─── Title bar (.cf-title-bar) ────────────────────────── */
      .cf-title-bar {
        display: flex; align-items: center; gap: 14px;
        padding: 18px 32px 14px;
        background: #fff;
        position: relative;
        flex-shrink: 0;
      }
      .cf-title-back {
        width: 32px; height: 32px;
        border-radius: 999px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        color: #fff;
        display: inline-flex; align-items: center; justify-content: center;
        text-decoration: none;
        flex-shrink: 0;
      }
      .cf-title-back:hover { background: var(--cnds-product-expireon-blue-700, #241e89); }
      .cf-title-back .material-symbols-outlined { font-size: 18px; }
      .cf-title-main {
        font-size: 15px; font-weight: 800;
        letter-spacing: 0.20em; text-transform: uppercase;
        color: #141414;
      }
      .cf-title-divider {
        display: inline-block;
        width: 1px; height: 18px;
        background: rgba(20,20,20,0.20);
      }
      .cf-title-section {
        font-size: 15px; font-weight: 800;
        letter-spacing: 0.20em; text-transform: uppercase;
        color: #141414;
      }
      .cf-title-accent {
        flex: 1; height: 1.5px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        margin-left: 6px;
        border-radius: 2px;
      }

      /* ─── Page font-family ──────────────────────────────────── */
      body {
        font-family: var(--cnds-typography-typeface-family-default, "Nunito Sans"), system-ui, sans-serif;
      }

      /* Pagination override — Expireon accent */
      .pagination .page-item.active .page-link {
        background-color: var(--cnds-product-accent, #4e45d6);
        border-color: var(--cnds-product-accent, #4e45d6);
        color: #fff;
      }
      .pagination .page-item.disabled .page-link { opacity: .5; pointer-events: none; }
      .pagination .page-link { color: var(--cnds-product-accent, #4e45d6); }
      .pagination .page-link:hover { color: var(--cnds-product-expireon-blue-700, #241e89); }
    `;
    document.head.appendChild(style);
  }

  // ─── Restructure DOM so the utility bar spans above sidebar + main ───
  (function mountShell() {
    const body    = document.body;
    const sidenav = document.querySelector('.sidenav[data-purpose="shared-sidenav"]');
    const appMain = document.querySelector('.app-main');

    if (sidenav && appMain && !document.querySelector('.cf-app-row')) {
      const row = document.createElement('div');
      row.className = 'cf-app-row';
      row.appendChild(sidenav);
      row.appendChild(appMain);
      body.classList.add('cf-app-shell');
      body.appendChild(row);
      body.insertAdjacentHTML('afterbegin', utilityBar);
      // Main-nav + title bar go inside app-main, right after this script tag
      document.currentScript.insertAdjacentHTML('afterend', mainNav + titleBar);
    } else {
      // Fallback: render everything inline
      document.currentScript.insertAdjacentHTML('afterend', utilityBar + mainNav + titleBar);
    }
  })();

  // ─── Interactivity ───────────────────────────────────────────
  (function init() {
    function bindToggle(triggerId, panelId) {
      const trigger = document.getElementById(triggerId);
      const panel = document.getElementById(panelId);
      if (!trigger || !panel) return;
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = panel.classList.toggle('open');
        document.querySelectorAll('.cf-account-menu.open').forEach(el => {
          if (el !== panel) el.classList.remove('open');
        });
        trigger.setAttribute('aria-expanded', String(isOpen));
        panel.setAttribute('aria-hidden', String(!isOpen));
      });
    }
    bindToggle('cf-nav-user', 'cf-user-menu');

    document.addEventListener('click', e => {
      if (!e.target.closest('.cf-user-info-wrapper')) {
        document.querySelectorAll('.cf-account-menu.open').forEach(el => el.classList.remove('open'));
      }
    });

    const themeBtn = document.getElementById('cf-nav-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-cnds-theme') === 'dark';
        html.setAttribute('data-cnds-theme', isDark ? 'light' : 'dark');
        const icon = themeBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = isDark ? 'bedtime' : 'light_mode';
      });
    }
  })();
})();
