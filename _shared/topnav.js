/**
 * Shared TopNav v4.1 — Nimbus cnds-header compliant
 *
 * Renders THREE pieces:
 *   1. Utility bar  — gray strip: logo (left) + bell + theme + user avatar (right)
 *   2. Main nav bar — flat white tab bar with underline active state
 *   3. Title bar    — SECTION | PAGE TITLE + horizontal accent line
 *
 * All smart defaults are built in — no per-page changes needed.
 * ACTIVE_NAV (set by sidenav.js on every page) drives both the active tab
 * and the auto-generated section/title breadcrumb.
 *
 * Optional per-page overrides:
 *   const TOPNAV_USER    = { name: 'Daniel Maiworm', initials: 'DM' };
 *   const TOPNAV_TABS    = [...];   // override default tab list
 *   const TOPNAV_TITLE   = 'Custom Title';
 *   const TOPNAV_SECTION = 'Custom Section';
 *   const TOPNAV_BACK    = '#';     // '' to hide back button
 */
(function () {
  const user      = (typeof TOPNAV_USER    !== 'undefined') ? TOPNAV_USER    : { name: 'Daniel Maiworm', initials: 'DM' };
  const back      = (typeof TOPNAV_BACK    !== 'undefined') ? TOPNAV_BACK    : '';
  const activeNav = (typeof ACTIVE_NAV     !== 'undefined') ? ACTIVE_NAV     : '';

  // ─── Auto-title map (ACTIVE_NAV → section + page title) ──────
  const navInfo = {
    'dashboard':              { section: null,            title: 'Dashboard' },
    'dash_general':           { section: 'Dashboard',    title: 'General' },
    'dash_users':             { section: 'Dashboard',    title: 'Users & Custodians' },
    'dash_email':             { section: 'Dashboard',    title: 'Email Capture' },
    'dash_gov':               { section: 'Dashboard',    title: 'Information Governance' },
    'dash_mig':               { section: 'Dashboard',    title: 'Migrations' },
    'endpoints':              { section: 'On-Prem',       title: 'Endpoints' },
    'appliances':             { section: 'On-Prem',       title: 'Appliances' },
    'nodes':                  { section: 'On-Prem',       title: 'Nodes' },
    'modules':                { section: 'On-Prem',       title: 'Modules' },
    'ad_custodians':          { section: 'Environments',  title: 'Custodians' },
    'ad_domains':             { section: 'Environments',  title: 'Domains' },
    'ad_unresolved':          { section: 'Environments',  title: 'Unresolved Custodians' },
    'ev_directories':         { section: 'Environments',  title: 'EV Directories' },
    'ev_vault_stores':        { section: 'Environments',  title: 'Vault Stores' },
    'so_archive_connections': { section: 'Environments',  title: 'Archive Connections' },
    'so_business_folders':    { section: 'Environments',  title: 'Business Folders' },
    'so_endpoints':           { section: 'Environments',  title: 'Endpoints' },
    'ev_mail_mappings':       { section: 'Mappings',      title: 'Mail Archive Mappings' },
    'ev_journal_mappings':    { section: 'Mappings',      title: 'Journal Mappings' },
    'native_folder_mappings': { section: 'Mappings',      title: 'Native Folder Mappings' },
    'file_archive_mappings':  { section: 'Mappings',      title: 'File Archive Mappings' },
    'onedrive_mappings':      { section: 'Mappings',      title: 'OneDrive Mappings' },
    'smtp_mappings':          { section: 'Mappings',      title: 'SMTP Mappings' },
    'sharepoint_mappings':    { section: 'Mappings',      title: 'SharePoint Mappings' },
    'sourceone_mappings':     { section: 'Mappings',      title: 'SourceOne Mappings' },
    'legal_cases':            { section: 'Legal',         title: 'Legal Cases' },
    'config_storage_buckets':     { section: 'Configuration', title: 'Storage Buckets' },
    'config_storage_partitions':  { section: 'Configuration', title: 'Storage Partitions' },
    'config_collaboration_links': { section: 'Configuration', title: 'Collaboration Links' },
    'config_retention':           { section: 'Configuration', title: 'Retention Categories' },
    'config_containers':          { section: 'Configuration', title: 'Containers' },
    'config_internal_domains':    { section: 'Configuration', title: 'Internal Domains' },
    'config_dynamic_ad':          { section: 'Configuration', title: 'Dynamic AD Properties' },
    'config_export_policy':       { section: 'Configuration', title: 'Export Policy' },
    'config_report_location':     { section: 'Configuration', title: 'Report Location Policy' },
    'config_report_email':        { section: 'Configuration', title: 'Report Email Policy' },
    'config_tag_groups':          { section: 'Configuration', title: 'Tag Groups' },
    'config_audit_logs':          { section: 'Configuration', title: 'Audit Logs' },
    'admin_org_units':    { section: 'Administration', title: 'Org Units' },
    'admin_roles':        { section: 'Administration', title: 'Roles' },
    'admin_users':        { section: 'Administration', title: 'Users' },
    'admin_security_log': { section: 'Administration', title: 'Security Log' },
    'admin_languages':    { section: 'Administration', title: 'Languages' },
    'admin_texts':        { section: 'Administration', title: 'Texts' },
    'admin_templates':    { section: 'Administration', title: 'Text Templates' },
    'admin_settings':     { section: 'Administration', title: 'Settings' },
    'evidence_reader':    { section: 'Legal',          title: 'File Preview' },
    'evidence_chat':      { section: 'Legal',          title: 'Chat Preview' },
  };

  const autoInfo  = navInfo[activeNav] || { section: null, title: '' };
  const title   = (typeof TOPNAV_TITLE   !== 'undefined') ? TOPNAV_TITLE   : autoInfo.title;
  const section = (typeof TOPNAV_SECTION !== 'undefined') ? TOPNAV_SECTION : (autoInfo.section || '');

  // ─── Active tab ───────────────────────────────────────────────
  const navToTab = {
    'dashboard':   'dashboard',
    'dash_general':'dashboard', 'dash_users': 'dashboard',
    'dash_email':  'dashboard', 'dash_gov':   'dashboard', 'dash_mig': 'dashboard',
    'endpoints':             'onprem',   'appliances': 'onprem', 'nodes': 'onprem', 'modules': 'onprem',
    'ad_custodians':         'environments', 'ad_domains': 'environments', 'ad_unresolved': 'environments',
    'ev_directories':        'environments', 'ev_vault_stores': 'environments', 'ev_archives': 'environments',
    'so_archive_connections':'environments', 'so_business_folders': 'environments', 'so_endpoints': 'environments',
    'ev_mail_mappings':      'mappings',  'ev_journal_mappings': 'mappings',
    'native_folder_mappings':'mappings',  'file_archive_mappings': 'mappings',
    'onedrive_mappings':     'mappings',  'smtp_mappings': 'mappings',
    'sharepoint_mappings':   'mappings',  'sourceone_mappings': 'mappings',
    'legal_cases':           'legal',
    'evidence_reader':       'legal',
    'evidence_chat':         'legal',
    'config_storage_buckets':'configuration', 'config_storage_partitions': 'configuration',
    'config_collaboration_links':'configuration', 'config_retention': 'configuration',
    'config_containers':     'configuration', 'config_internal_domains': 'configuration',
    'config_dynamic_ad':     'configuration', 'config_export_policy': 'configuration',
    'config_report_location':'configuration', 'config_report_email': 'configuration',
    'config_tag_groups':     'configuration', 'config_audit_logs': 'configuration',
    'admin_org_units':       'administration', 'admin_roles': 'administration',
    'admin_users':           'administration', 'admin_security_log': 'administration',
    'admin_languages':       'administration', 'admin_texts': 'administration',
    'admin_templates':       'administration', 'admin_settings': 'administration',
  };
  const activeTabKey = navToTab[activeNav] || '';

  const defaultTabs = [
    { key: 'dashboard',      label: 'Dashboard',      icon: 'grid_view',       href: '../dashboard/dashboard.html' },
    { key: 'onprem',         label: 'On-Prem',        icon: 'storage',         href: '../endpoint_management_overview_focus/endpoint_management_overview_focus.html' },
    { key: 'environments',   label: 'Environments',   icon: 'layers',          href: '../ev_vault_stores_overview/ev_vault_stores_overview.html' },
    { key: 'mappings',       label: 'Mappings',       icon: 'sync_alt',        href: '../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html' },
    { key: 'legal',          label: 'Legal',          icon: 'gavel',           href: '../legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html' },
    { key: 'configuration',  label: 'Configuration',  icon: 'tune',            href: '../storage_buckets_content_sync/storage_buckets_content_sync.html' },
    { key: 'administration', label: 'Administration', icon: 'manage_accounts', href: '../users_design_sync/users_design_sync.html' },
    { key: 'support',        label: 'Support',        icon: 'headset_mic',     href: '#' },
  ];

  const tabs = (typeof TOPNAV_TABS !== 'undefined') ? TOPNAV_TABS : defaultTabs.map(t => ({
    ...t,
    active: t.key === activeTabKey,
  }));

  const logoImg = `<img class="cf-brand-mark" src="../_shared/cloudficient_cloudficient-expireon_1760436020615.png" alt="Expireon">`;

  // ─── 1. Utility bar ────────────────────────────────────────────
  const utilityBar = `
<nav class="cf-utility-bar" aria-label="Utility navigation">
  <a class="cf-brand" href="../dashboard/dashboard.html" aria-label="Expireon Home">
    ${logoImg}
  </a>
  <div class="cf-utility-tools">
    <button class="cf-icon-btn" aria-label="Notifications" title="Notifications">
      <span class="material-symbols-outlined">notifications</span>
      <span class="cf-notif-dot" aria-hidden="true"></span>
    </button>
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

  // ─── 2. Main nav bar (flat tab bar, white background) ─────────
  const mainNav = `
<div class="cf-main-nav-wrapper">
  <nav class="cf-main-nav" aria-label="Main navigation">
    ${tabs.map(t => `
    <a href="${t.href || '#'}" class="cf-main-nav-link ${t.active ? 'active' : ''}" data-key="${t.key}">
      ${t.icon ? `<span class="material-symbols-outlined" aria-hidden="true">${t.icon}</span>` : ''}
      <span>${t.label}</span>
    </a>`).join('')}
    <button class="cf-main-nav-more" aria-label="More" title="More">
      <span class="material-symbols-outlined">more_vert</span>
    </button>
  </nav>
</div>`;

  // ─── 3. Title bar (SECTION | PAGE — accent line) ───────────────
  const titleBar = title ? `
<div class="cf-title-bar">
  ${back !== '' ? `<a href="${back}" class="cf-title-back" aria-label="Back"><span class="material-symbols-outlined">arrow_back</span></a>` : ''}
  ${section ? `<span class="cf-title-section">${section}</span><span class="cf-title-divider" aria-hidden="true"></span>` : ''}
  <span class="cf-title-main">${title}</span>
  <span class="cf-title-accent" aria-hidden="true"></span>
</div>` : '';

  // ─── Styles ────────────────────────────────────────────────────
  const styleId = '_shared-topnav-styles-v4';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* ─── App shell ─────────────────────────────────────────── */
      html { height: 100%; }
      body.cf-app-shell {
        display: flex !important;
        flex-direction: column !important;
        height: 100vh !important;
        overflow: hidden !important;
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

      /* ─── Utility bar ───────────────────────────────────────── */
      .cf-utility-bar {
        display: flex; align-items: center; justify-content: space-between;
        height: 56px; padding: 0 28px;
        background: var(--cnds-surface-light-200, #ebebeb);
        color: #141414;
        flex-shrink: 0;
        font-family: var(--cnds-typography-typeface-family-default, "Nunito Sans"), system-ui, sans-serif;
      }
      .cf-brand {
        display: inline-flex; align-items: center; gap: 12px;
        text-decoration: none; color: inherit; flex-shrink: 0;
      }
      .cf-brand-mark { height: 40px; width: auto; display: block; }
      .cf-utility-tools {
        display: flex; align-items: center; gap: 4px; flex-shrink: 0;
      }
      .cf-utility-divider {
        display: inline-block; width: 1px; height: 24px;
        background: rgba(20,20,20,0.18); margin: 0 10px;
      }
      .cf-icon-btn {
        position: relative;
        background: 0; border: 0;
        width: 36px; height: 36px;
        border-radius: 999px; color: #141414;
        cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center;
        transition: background-color .15s;
      }
      .cf-icon-btn:hover { background: rgba(20,20,20,0.08); }
      .cf-icon-btn .material-symbols-outlined { font-size: 20px; }
      .cf-notif-dot {
        position: absolute; top: 7px; right: 7px;
        width: 7px; height: 7px;
        background: #e53e3e; border: 1.5px solid #ebebeb;
        border-radius: 999px;
      }

      /* ─── User info ─────────────────────────────────────────── */
      .cf-user-info-wrapper { position: relative; }
      .cf-user-info {
        display: inline-flex; align-items: center; gap: 10px;
        height: 38px; padding: 0 10px 0 4px;
        background: 0; border: 0; color: #141414;
        font: inherit; font-size: 14px; font-weight: 500;
        border-radius: 999px; cursor: pointer; white-space: nowrap;
      }
      .cf-user-info:hover { background: rgba(20,20,20,0.08); }
      .cf-user-avatar {
        width: 30px; height: 30px; border-radius: 999px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        color: #fff; font-weight: 700; font-size: 11px;
        letter-spacing: -0.02em;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; user-select: none;
      }
      .cf-user-name { color: #141414; }
      .cf-account-menu {
        display: none; position: absolute; top: calc(100% + 8px); right: 0;
        min-width: 220px; background: #fff;
        border: 1px solid #ccc; border-radius: 8px;
        box-shadow: 0 2px 15px -3px rgba(0,0,0,.12), 0 10px 25px -2px rgba(0,0,0,.10);
        z-index: 1000; overflow: hidden;
      }
      .cf-account-menu.open { display: block; }
      .cf-account-menu-header {
        background: #ebebeb; padding: 12px 16px;
        font-size: 11px; font-weight: 800;
        letter-spacing: 0.10em; text-transform: uppercase; color: #4f4f4f;
      }
      .cf-account-menu-item {
        display: flex; align-items: center; padding: 10px 16px; height: 40px;
        font-size: 13.5px; font-weight: 400; color: #4f4f4f;
        text-decoration: none; transition: background-color .12s;
      }
      .cf-account-menu-item:hover { background: #e8e8e8; }

      /* ─── Main nav bar (flat, white, underline active) ──────── */
      .cf-main-nav-wrapper {
        padding: 0 24px;
        background: #ffffff;
        border-bottom: 1px solid #e5e7eb;
        flex-shrink: 0;
      }
      .cf-main-nav {
        display: flex; align-items: stretch;
        background: transparent;
        overflow-x: auto; scrollbar-width: none;
      }
      .cf-main-nav::-webkit-scrollbar { display: none; }
      .cf-main-nav-link {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 0 16px; height: 52px;
        font-size: 12.5px; font-weight: 700;
        letter-spacing: 0.08em; text-transform: uppercase;
        color: #6b7280;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        white-space: nowrap;
        transition: color .15s, border-color .15s;
        position: relative;
      }
      .cf-main-nav-link:hover {
        color: #1a1a1a;
        background: transparent;
      }
      .cf-main-nav-link.active {
        color: #111827;
        border-bottom-color: var(--cnds-product-expireon-blue-500, #4e45d6);
        background: transparent;
        box-shadow: none;
      }
      .cf-main-nav-link .material-symbols-outlined {
        font-size: 17px;
        color: #9ca3af;
      }
      .cf-main-nav-link.active .material-symbols-outlined {
        color: var(--cnds-product-accent, #4e45d6);
      }
      .cf-main-nav-link:hover .material-symbols-outlined {
        color: #6b7280;
      }
      .cf-main-nav-more {
        margin-left: auto; align-self: center;
        background: 0; border: 0;
        width: 34px; height: 34px; border-radius: 6px;
        color: #9ca3af; cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .cf-main-nav-more:hover { background: #f3f4f6; color: #374151; }
      .cf-main-nav-more .material-symbols-outlined { font-size: 20px; }

      /* ─── Title bar (SECTION | PAGE ————) ──────────────────── */
      .cf-title-bar {
        display: flex; align-items: center; gap: 12px;
        padding: 14px 28px 12px;
        background: #fff;
        flex-shrink: 0;
      }
      .cf-title-back {
        width: 28px; height: 28px; border-radius: 999px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        color: #fff;
        display: inline-flex; align-items: center; justify-content: center;
        text-decoration: none; flex-shrink: 0;
      }
      .cf-title-back:hover { background: var(--cnds-product-expireon-blue-700, #241e89); }
      .cf-title-back .material-symbols-outlined { font-size: 16px; }
      .cf-title-section {
        font-size: 13px; font-weight: 800;
        letter-spacing: 0.18em; text-transform: uppercase;
        color: #374151;
      }
      .cf-title-divider {
        display: inline-block; width: 1.5px; height: 16px;
        background: #d1d5db; margin: 0 2px;
      }
      .cf-title-main {
        font-size: 13px; font-weight: 800;
        letter-spacing: 0.18em; text-transform: uppercase;
        color: #111827;
      }
      .cf-title-accent {
        flex: 1; height: 2px;
        background: var(--cnds-product-expireon-blue-500, #4e45d6);
        border-radius: 2px; margin-left: 4px;
      }

      /* ─── Font family ───────────────────────────────────────── */
      body {
        font-family: var(--cnds-typography-typeface-family-default, "Nunito Sans"), system-ui, sans-serif;
      }

      /* ─── Pagination override ───────────────────────────────── */
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

  // ─── Mount shell ─────────────────────────────────────────────
  // Target layout (body flex-column):
  //   cf-utility-bar        ← full width
  //   cf-main-nav-wrapper   ← full width
  //   cf-title-bar          ← full width (optional)
  //   cf-app-row (flex:1)
  //     sidenav  |  app-main
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
      // All three nav bands span full width — inserted at top of body
      body.insertAdjacentHTML('afterbegin', utilityBar + mainNav + titleBar);
      body.appendChild(row);
    } else {
      document.currentScript.insertAdjacentHTML('afterend', utilityBar + mainNav + titleBar);
    }
  })();

  // ─── Interactivity ───────────────────────────────────────────
  (function init() {
    const trigger = document.getElementById('cf-nav-user');
    const panel   = document.getElementById('cf-user-menu');
    if (trigger && panel) {
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = panel.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
        panel.setAttribute('aria-hidden', String(!isOpen));
      });
    }
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
