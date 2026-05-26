/**
 * Shared Sidenav v2 — Expireon AdminConsole (Nimbus 100% compliant)
 *
 * Improvements over v1:
 *   • Width 240px (Nimbus default), not 260px
 *   • data-cnds-mode="side" + data-cnds-slim attributes (Nimbus spec)
 *   • Slim-mode toggle (72px icons-only) — Nimbus-native feature
 *   • 3px left accent bar on active items via box-shadow inset (Nimbus pattern)
 *   • Sub-items at Nimbus-spec 36px height / 0.81rem font-size
 *   • Logo max-height 32px (was 48px)
 *   • Uses CSS var(--cnds-product-accent) — automatically picks up Expireon purple
 *     when <body class="cnds-product-expireon"> is set
 *   • NO CTA button — per nimbus.md rulebook
 *   • Header height 64px (matches topnav for perfect grid alignment)
 *
 * Usage (unchanged from v1):
 *   <script>const ACTIVE_NAV = 'legal_cases';</script>
 *   <script src="../_shared/sidenav.js"></script>
 */
(function () {
  const nav = (typeof ACTIVE_NAV !== 'undefined') ? ACTIVE_NAV : '';

  const onpremKeys        = ['endpoints','appliances','nodes','modules'];
  const adKeys            = ['ad_domains','ad_custodians','ad_unresolved'];
  const evEnvKeys         = ['ev_directories','ev_vault_stores','ev_archives'];
  const soKeys            = ['so_archive_connections','so_business_folders','so_endpoints'];
  const envKeys           = [...adKeys, ...evEnvKeys, ...soKeys];
  const evMappingsKeys    = ['ev_mail_mappings','ev_journal_mappings'];
  const mappingsKeys      = [...evMappingsKeys,'native_folder_mappings','file_archive_mappings','onedrive_mappings','smtp_mappings','sharepoint_mappings','sourceone_mappings'];
  const legalKeys         = ['legal_cases'];
  const configKeys        = ['config_storage_buckets','config_storage_partitions','config_collaboration_links','config_retention','config_containers','config_internal_domains','config_dynamic_ad','config_export_policy','config_report_location','config_report_email','config_tag_groups','config_audit_logs'];
  const adminIdentityKeys = ['admin_org_units','admin_roles','admin_users','admin_security_log'];
  const adminLangKeys     = ['admin_languages','admin_texts'];
  const adminKeys         = [...adminIdentityKeys, ...adminLangKeys, 'admin_templates','admin_settings'];

  const onpremOpen  = onpremKeys.includes(nav);
  const envOpen     = envKeys.includes(nav);
  const adOpen      = adKeys.includes(nav);
  const evEnvOpen   = evEnvKeys.includes(nav);
  const soOpen      = soKeys.includes(nav);
  const mapOpen     = mappingsKeys.includes(nav);
  const evMapOpen   = evMappingsKeys.includes(nav);
  const legalOpen   = legalKeys.includes(nav);
  const configOpen  = configKeys.includes(nav);
  const adminOpen   = adminKeys.includes(nav);
  const adminIdOpen = adminIdentityKeys.includes(nav);
  const adminLgOpen = adminLangKeys.includes(nav);

  function item(href, key, icon, label) {
    const active = nav === key ? 'active' : '';
    return `
    <li class="sidenav-item" title="${label}" data-original-title="${label}">
      <a href="${href}" id="navlink_${key}" class="sidenav-link ${active}">
        <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">${icon}</span>
        <span class="sidenav-label">${label}</span>
      </a>
    </li>`;
  }
  function group(id, icon, label, open) {
    return `
    <li class="sidenav-item" title="${label}" data-original-title="${label}">
      <a href="#" id="tog_submenu_${id}" class="sidenav-link ${open ? 'active' : ''}"
         data-cnds-toggle="sidenav-collapse" aria-expanded="${open}">
        <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">${icon}</span>
        <span class="sidenav-label flex-1">${label}</span>
        <span class="material-symbols-outlined sidenav-chevron" aria-hidden="true">${open ? 'expand_more' : 'chevron_right'}</span>
      </a>`;
  }
  function collapseStart(open) { return `<ul class="sidenav-collapse${open ? ' show' : ''}">`; }
  function collapseEnd() { return `</ul>\n    </li>`; }
  function sub(href, key, label) {
    const active = nav === key ? 'active' : '';
    return `
      <li class="sidenav-item" title="${label}" data-original-title="${label}">
        <a href="${href}" id="navlink_${key}" class="sidenav-link sidenav-sublink ${active}">
          <span class="sidenav-label">${label}</span>
        </a>
      </li>`;
  }
  function subGroup(id, label, open) {
    return `
      <li class="sidenav-item" title="${label}" data-original-title="${label}">
        <a href="#" id="tog_submenu_${id}" class="sidenav-link sidenav-sublink ${open ? 'active' : ''}"
           data-cnds-toggle="sidenav-collapse" aria-expanded="${open}">
          <span class="sidenav-label flex-1">${label}</span>
          <span class="material-symbols-outlined sidenav-chevron" aria-hidden="true">${open ? 'expand_more' : 'chevron_right'}</span>
        </a>`;
  }
  function subsub(href, key, label) {
    const active = nav === key ? 'active' : '';
    return `
        <li class="sidenav-item" title="${label}" data-original-title="${label}">
          <a href="${href}" id="navlink_${key}" class="sidenav-link sidenav-subsublink ${active}">
            <span class="sidenav-label">${label}</span>
          </a>
        </li>`;
  }

  const sidenav = `
<nav id="sidebar-cf" class="sidenav show flex-shrink-0"
     data-cnds-mode="side"
     data-cnds-slim="false"
     data-cnds-slim-collapsed="false"
     data-purpose="shared-sidenav"
     aria-label="Application navigation">

  <div class="sidenav-header">
    <img src="../_shared/cloudficient_cloudficient-expireon_1760436020615.png" alt="Expireon">
    <button type="button" class="sidenav-slim-toggle" aria-label="Toggle slim mode" title="Toggle">
      <span class="material-symbols-outlined">menu_open</span>
    </button>
  </div>

  <ul class="sidenav-menu flex-1">

    ${item('../dashboard/dashboard.html', 'dashboard', 'grid_view', 'Dashboard')}

    ${group('onprem', 'storage', 'OnPrem', onpremOpen)}
    ${collapseStart(onpremOpen)}
      ${sub('../endpoint_management_overview_focus/endpoint_management_overview_focus.html', 'endpoints', 'Endpoints')}
      ${sub('../appliance_management_unified_table_style/appliance_management_unified_table_style.html', 'appliances', 'Appliances')}
      ${sub('#', 'nodes', 'Nodes')}
      ${sub('../modules_management_card_view_layout/modules_management_card_view_layout.html', 'modules', 'Modules')}
    ${collapseEnd()}

    ${group('environments', 'layers', 'Environments', envOpen)}
    ${collapseStart(envOpen)}
      ${subGroup('active_directory', 'Active Directory', adOpen)}
      ${collapseStart(adOpen)}
        ${subsub('../custodians_management_hybrid_view_cards_in_list_layout/custodians_management_hybrid_view_cards_in_list_layout.html', 'ad_custodians', 'Custodians')}
        ${subsub('../domains_management_list_view_sidebar_sync/domains_management_list_view_sidebar_sync.html', 'ad_domains', 'Domains')}
        ${subsub('../unresolved_custodians_header_sync/unresolved_custodians_header_sync.html', 'ad_unresolved', 'UnResolved Custodians')}
      ${collapseEnd()}
      ${subGroup('ev_env', 'Enterprise Vault', evEnvOpen)}
      ${collapseStart(evEnvOpen)}
        ${subsub('../ev_directories_footer_sync_1_1/ev_directories_footer_sync_1_1.html', 'ev_directories', 'EV Directories')}
        ${subsub('../ev_vault_stores_overview/ev_vault_stores_overview.html', 'ev_vault_stores', 'Vault Stores')}
        ${subsub('#', 'ev_archives', 'EV Archives')}
      ${collapseEnd()}
      ${subGroup('sourceone', 'SourceOne', soOpen)}
      ${collapseStart(soOpen)}
        ${subsub('#', 'so_archive_connections', 'Archive Connections')}
        ${subsub('#', 'so_business_folders', 'Business Folders')}
        ${subsub('#', 'so_endpoints', 'Endpoints')}
      ${collapseEnd()}
    ${collapseEnd()}

    ${group('mappings', 'sync_alt', 'Mappings', mapOpen)}
    ${collapseStart(mapOpen)}
      ${subGroup('ev_mappings', 'Enterprise Vault', evMapOpen)}
      ${collapseStart(evMapOpen)}
        ${subsub('../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html', 'ev_mail_mappings', 'Mail Archive Mappings')}
        ${subsub('../journal_mappings_content_sync/journal_mappings_content_sync.html', 'ev_journal_mappings', 'Journal Mappings')}
      ${collapseEnd()}
      ${sub('#', 'native_folder_mappings', 'Native Folder Mappings')}
      ${sub('#', 'file_archive_mappings', 'File Archive Mappings')}
      ${sub('#', 'onedrive_mappings', 'OneDrive Mappings')}
      ${sub('#', 'smtp_mappings', 'SMTP Mappings')}
      ${sub('#', 'sharepoint_mappings', 'SharePoint Mappings')}
      ${sub('#', 'sourceone_mappings', 'Source One Mappings')}
    ${collapseEnd()}

    ${group('legal', 'gavel', 'Legal', legalOpen)}
    ${collapseStart(legalOpen)}
      ${sub('../legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html', 'legal_cases', 'Legal Cases')}
    ${collapseEnd()}

    ${group('configuration', 'tune', 'Configuration', configOpen)}
    ${collapseStart(configOpen)}
      ${sub('../storage_buckets_content_sync/storage_buckets_content_sync.html', 'config_storage_buckets', 'Storage Buckets')}
      ${sub('../storage_partitions_layout_correction/storage_partitions_layout_correction.html', 'config_storage_partitions', 'Storage Partitions')}
      ${sub('../collaboration_links_design_sync/collaboration_links_design_sync.html', 'config_collaboration_links', 'Collaboration Links')}
      ${sub('../retention_categories_design_sync/retention_categories_design_sync.html', 'config_retention', 'Retention Categories')}
      ${sub('../containers_design_sync/containers_design_sync.html', 'config_containers', 'Containers')}
      ${sub('../internal_domains_design_sync/internal_domains_design_sync.html', 'config_internal_domains', 'Internal Domains')}
      ${sub('#', 'config_dynamic_ad', 'Dynamic AD Properties')}
      ${sub('#', 'config_export_policy', 'Export Policy')}
      ${sub('#', 'config_report_location', 'Report Location Policy')}
      ${sub('#', 'config_report_email', 'Report Email Policy')}
      ${sub('#', 'config_tag_groups', 'Tag Groups')}
      ${sub('../audit_logs_sidebar_fixed/audit_logs_sidebar_fixed.html', 'config_audit_logs', 'Audit Logs')}
    ${collapseEnd()}

    ${group('administration', 'manage_accounts', 'Administration', adminOpen)}
    ${collapseStart(adminOpen)}
      ${subGroup('admin_identity', 'Identity Management', adminIdOpen)}
      ${collapseStart(adminIdOpen)}
        ${subsub('#', 'admin_org_units', 'Org Units')}
        ${subsub('../roles_design_sync/roles_design_sync.html', 'admin_roles', 'Roles')}
        ${subsub('../users_design_sync/users_design_sync.html', 'admin_users', 'Users')}
        ${subsub('../security_logs_design_sync/security_logs_design_sync.html', 'admin_security_log', 'Security Log')}
      ${collapseEnd()}
      ${subGroup('admin_lang', 'Language Management', adminLgOpen)}
      ${collapseStart(adminLgOpen)}
        ${subsub('../languages_improved_readability_card_view/languages_improved_readability_card_view.html', 'admin_languages', 'Languages')}
        ${subsub('../languages_texte/languages_texte.html', 'admin_texts', 'Texts')}
      ${collapseEnd()}
      ${sub('../text_templates_localization_sync/text_templates_localization_sync.html', 'admin_templates', 'Text Templates')}
      ${sub('../settings_management_maintenance_update/settings_management_maintenance_update.html', 'admin_settings', 'Settings')}
    ${collapseEnd()}

  </ul>

  <div class="sidenav-footer">
    <ul class="sidenav-menu">
      <li class="sidenav-item">
        <a href="#" class="sidenav-link">
          <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">help_outline</span>
          <span class="sidenav-label">Support</span>
        </a>
      </li>
      <li class="sidenav-item">
        <a href="#" class="sidenav-link">
          <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">account_circle</span>
          <span class="sidenav-label">Account</span>
        </a>
      </li>
    </ul>
  </div>

</nav>`;

  // ── Style overrides ──────────────────────────────────────────────────────
  const styleId = '_shared-sidenav-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .sidenav[data-purpose="shared-sidenav"] {
        --cnds-sidenav-width: 240px;
        --cnds-sidenav-bg: #ffffff;
        position: relative;
        height: 100vh;
        transform: none;
        box-shadow: none;
        border-right: 1px solid var(--cnds-border-color, #e0e0e0);
        display: flex;
        flex-direction: column;
        padding: 0;
        width: var(--cnds-sidenav-width);
        transition: width .2s ease;
      }
      .sidenav[data-purpose="shared-sidenav"][data-cnds-slim="true"] {
        --cnds-sidenav-width: 72px;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-header {
        display: flex; align-items: center; justify-content: space-between;
        height: 64px;
        padding: 0 1.25rem;
        border-bottom: 1px solid var(--cnds-border-color, #e0e0e0);
        flex-shrink: 0;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-header img {
        max-height: 32px; width: auto;
      }
      .sidenav[data-purpose="shared-sidenav"][data-cnds-slim="true"] .sidenav-header img {
        max-width: 32px; object-fit: contain; object-position: left;
      }
      .sidenav-slim-toggle {
        background: none; border: 0;
        color: var(--cnds-secondary-color, #4f4f4f99);
        cursor: pointer; padding: 4px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 6px;
      }
      .sidenav-slim-toggle:hover { background: rgba(0,0,0,0.05); color: var(--cnds-body-color, #4f4f4f); }
      .sidenav-slim-toggle .material-symbols-outlined { font-size: 20px; }

      .sidenav[data-purpose="shared-sidenav"] .sidenav-menu {
        list-style: none; margin: 0; padding: 0.5rem;
        overflow-y: auto; overflow-x: hidden;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link {
        display: flex; align-items: center; gap: 0.75rem;
        height: 40px; padding: 0 0.75rem; margin: 1px 0;
        border-radius: 6px;
        color: var(--cnds-body-color, #4f4f4f);
        text-decoration: none;
        font-size: 0.875rem; font-weight: 400;
        position: relative;
        transition: background-color .15s ease, color .15s ease;
        white-space: nowrap; overflow: hidden;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link:hover {
        background: rgba(0,0,0,0.04);
        color: var(--cnds-body-color, #4f4f4f);
      }
      .sidenav-icon { font-size: 20px; flex-shrink: 0; }
      .sidenav-chevron {
        font-size: 18px; flex-shrink: 0;
        transition: transform .2s ease;
        color: var(--cnds-secondary-color, #4f4f4f99);
      }

      /* Active — Nimbus pattern: 3px left bar + product highlight */
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link.active {
        background-color: var(--cnds-product-expireon-blue-50, #efeefb);
        color: var(--cnds-product-accent, #4e45d6);
        font-weight: 600;
        box-shadow: inset 3px 0 0 var(--cnds-product-accent, #4e45d6);
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link.active .sidenav-chevron,
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link.active .sidenav-icon {
        color: var(--cnds-product-accent, #4e45d6);
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link[data-cnds-toggle="sidenav-collapse"].active {
        box-shadow: none;
        font-weight: 500;
      }

      /* Sub-items */
      .sidenav[data-purpose="shared-sidenav"] .sidenav-sublink {
        height: 36px; font-size: 0.8125rem;
        padding-left: 2.5rem;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-subsublink {
        height: 32px; font-size: 0.8125rem;
        padding-left: 3.25rem;
        color: var(--cnds-secondary-color, #4f4f4f99);
      }

      .sidenav-collapse {
        list-style: none; margin: 0; padding: 0; display: none;
      }
      .sidenav-collapse.show { display: block; }

      .sidenav[data-purpose="shared-sidenav"] .sidenav-footer {
        border-top: 1px solid var(--cnds-border-color, #e0e0e0);
        padding: 0.5rem; flex-shrink: 0;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-footer .sidenav-menu {
        padding: 0; overflow: visible;
      }

      /* Slim mode */
      .sidenav[data-cnds-slim="true"] .sidenav-label,
      .sidenav[data-cnds-slim="true"] .sidenav-chevron { display: none; }
      .sidenav[data-cnds-slim="true"] .sidenav-link {
        justify-content: center; padding: 0; gap: 0;
      }
      .sidenav[data-cnds-slim="true"] .sidenav-sublink,
      .sidenav[data-cnds-slim="true"] .sidenav-subsublink { display: none; }
      .sidenav[data-cnds-slim="true"] .sidenav-collapse { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  document.body.insertAdjacentHTML('afterbegin', sidenav);

  // Toggle behavior
  function closeToggle(t) {
    const c = t.nextElementSibling;
    if (!c || !c.classList.contains('sidenav-collapse')) return;
    c.classList.remove('show');
    t.setAttribute('aria-expanded', 'false');
    const ch = t.querySelector('.sidenav-chevron');
    if (ch) ch.textContent = 'chevron_right';
    c.querySelectorAll('[data-cnds-toggle="sidenav-collapse"]').forEach(closeToggle);
  }
  document.querySelectorAll('[data-purpose="shared-sidenav"] [data-cnds-toggle="sidenav-collapse"]').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const collapse = toggle.nextElementSibling;
      if (!collapse || !collapse.classList.contains('sidenav-collapse')) return;
      const isOpen = collapse.classList.contains('show');
      if (!isOpen) {
        const parentUl = toggle.closest('li').parentElement;
        parentUl.querySelectorAll(':scope > li > [data-cnds-toggle="sidenav-collapse"]').forEach(function(sibling) {
          if (sibling !== toggle) closeToggle(sibling);
        });
      }
      collapse.classList.toggle('show', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      const chevronEl = toggle.querySelector('.sidenav-chevron');
      if (chevronEl) chevronEl.textContent = isOpen ? 'chevron_right' : 'expand_more';
    });
  });

  // Slim-mode toggle
  const slimBtn = document.querySelector('[data-purpose="shared-sidenav"] .sidenav-slim-toggle');
  const sidenavEl = document.querySelector('[data-purpose="shared-sidenav"]');
  if (slimBtn && sidenavEl) {
    slimBtn.addEventListener('click', function() {
      const slim = sidenavEl.getAttribute('data-cnds-slim') === 'true';
      sidenavEl.setAttribute('data-cnds-slim', String(!slim));
      try { localStorage.setItem('expireon-sidenav-slim', String(!slim)); } catch(_) {}
    });
    try {
      if (localStorage.getItem('expireon-sidenav-slim') === 'true') {
        sidenavEl.setAttribute('data-cnds-slim', 'true');
      }
    } catch(_) {}
  }
})();
