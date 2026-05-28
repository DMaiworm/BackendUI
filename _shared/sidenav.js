/**
 * Shared Sidenav v3 — Context-aware 2nd-level navigation
 *
 * Renders only the sub-items relevant to the active top-level section
 * (as determined by ACTIVE_NAV). The 1st-level navigation has moved to
 * the TopNav tab bar (topnav.js v4+).
 *
 * Usage (unchanged):
 *   <script>const ACTIVE_NAV = 'endpoints';</script>
 *   <script src="../_shared/sidenav.js"></script>
 */
(function () {
  const nav = (typeof ACTIVE_NAV !== 'undefined') ? ACTIVE_NAV : '';

  // ─── Section membership ─────────────────────────────────────
  const navToSection = {
    'dashboard':   'dashboard',
    'dash_general':'dashboard', 'dash_users': 'dashboard',
    'dash_email':  'dashboard', 'dash_gov':   'dashboard', 'dash_mig': 'dashboard',
    'endpoints':             'onprem',   'appliances': 'onprem', 'nodes': 'onprem', 'modules': 'onprem',
    'ad_custodians':         'environments', 'ad_domains': 'environments', 'ad_unresolved': 'environments',
    'ev_directories':        'environments', 'ev_vault_stores': 'environments', 'ev_archives': 'environments',
    'so_archive_connections':'environments', 'so_business_folders': 'environments', 'so_endpoints': 'environments',
    'ev_mail_mappings':      'mappings', 'ev_journal_mappings': 'mappings',
    'native_folder_mappings':'mappings', 'file_archive_mappings': 'mappings',
    'onedrive_mappings':     'mappings', 'smtp_mappings': 'mappings',
    'sharepoint_mappings':   'mappings', 'sourceone_mappings': 'mappings',
    'legal_cases':           'legal',
    'evidence_reader':       'legal',
    'evidence_chat':         'legal',
    'config_storage_buckets':    'configuration', 'config_storage_partitions': 'configuration',
    'config_collaboration_links':'configuration', 'config_retention': 'configuration',
    'config_containers':         'configuration', 'config_internal_domains': 'configuration',
    'config_dynamic_ad':         'configuration', 'config_export_policy': 'configuration',
    'config_report_location':    'configuration', 'config_report_email': 'configuration',
    'config_tag_groups':         'configuration', 'config_audit_logs': 'configuration',
    'admin_org_units':    'administration', 'admin_roles': 'administration',
    'admin_users':        'administration', 'admin_security_log': 'administration',
    'admin_languages':    'administration', 'admin_texts': 'administration',
    'admin_templates':    'administration', 'admin_settings': 'administration',
  };

  const section = navToSection[nav] || 'dashboard';

  // ─── Item helpers ───────────────────────────────────────────
  function item(href, key, icon, label) {
    const active = nav === key ? 'active' : '';
    return `
    <li class="sidenav-item">
      <a href="${href}" id="navlink_${key}" class="sidenav-link ${active}">
        <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">${icon}</span>
        <span class="sidenav-label">${label}</span>
      </a>
    </li>`;
  }

  function groupStart(id, icon, label, open) {
    return `
    <li class="sidenav-item">
      <a href="#" id="tog_submenu_${id}" class="sidenav-link sidenav-group-link ${open ? 'group-open' : ''}"
         data-cnds-toggle="sidenav-collapse" aria-expanded="${open}">
        <span class="material-symbols-outlined sidenav-icon" aria-hidden="true">${icon}</span>
        <span class="sidenav-label flex-1">${label}</span>
        <span class="material-symbols-outlined sidenav-chevron" aria-hidden="true">${open ? 'expand_more' : 'chevron_right'}</span>
      </a>
      <ul class="sidenav-collapse${open ? ' show' : ''}">`;
  }

  function groupEnd() { return `</ul>\n    </li>`; }

  function sub(href, key, label) {
    const active = nav === key ? 'active' : '';
    return `
        <li class="sidenav-item">
          <a href="${href}" id="navlink_${key}" class="sidenav-link sidenav-sublink ${active}">
            <span class="sidenav-label">${label}</span>
          </a>
        </li>`;
  }

  // ─── Section item lists ─────────────────────────────────────
  const adOpen  = ['ad_custodians','ad_domains','ad_unresolved'].includes(nav);
  const evEnvOpen = ['ev_directories','ev_vault_stores','ev_archives'].includes(nav);
  const soOpen  = ['so_archive_connections','so_business_folders','so_endpoints'].includes(nav);
  const evMapOpen = ['ev_mail_mappings','ev_journal_mappings'].includes(nav);
  const adminIdOpen = ['admin_org_units','admin_roles','admin_users','admin_security_log'].includes(nav);
  const adminLgOpen = ['admin_languages','admin_texts'].includes(nav);

  const sectionItems = {
    dashboard: `
      ${item('../dashboard/dashboard.html#general', 'dash_general', 'grid_view', 'General')}
      ${item('../dashboard/dashboard.html#users',   'dash_users',   'people',    'Users & Custodians')}
      ${item('../dashboard/dashboard.html#email',   'dash_email',   'mail',      'Email Capture')}
      ${item('../dashboard/dashboard.html#gov',     'dash_gov',     'policy',    'Information Governance')}
      ${item('../dashboard/dashboard.html#mig',     'dash_mig',     'moving',    'Migrations')}`,

    onprem: `
      ${item('../endpoint_management_overview_focus/endpoint_management_overview_focus.html', 'endpoints', 'computer', 'Endpoints')}
      ${item('../appliance_management_unified_table_style/appliance_management_unified_table_style.html', 'appliances', 'developer_board', 'Appliances')}
      ${item('#', 'nodes', 'device_hub', 'Nodes')}
      ${item('../modules_management_card_view_layout/modules_management_card_view_layout.html', 'modules', 'memory', 'Modules')}`,

    environments: `
      ${groupStart('active_directory', 'corporate_fare', 'Active Directory', adOpen)}
        ${sub('../custodians_management_hybrid_view_cards_in_list_layout/custodians_management_hybrid_view_cards_in_list_layout.html', 'ad_custodians', 'Custodians')}
        ${sub('../domains_management_list_view_sidebar_sync/domains_management_list_view_sidebar_sync.html', 'ad_domains', 'Domains')}
        ${sub('../unresolved_custodians_header_sync/unresolved_custodians_header_sync.html', 'ad_unresolved', 'Unresolved Custodians')}
      ${groupEnd()}
      ${groupStart('ev_env', 'lock', 'Enterprise Vault', evEnvOpen)}
        ${sub('../ev_directories_footer_sync_1_1/ev_directories_footer_sync_1_1.html', 'ev_directories', 'EV Directories')}
        ${sub('../ev_vault_stores_overview/ev_vault_stores_overview.html', 'ev_vault_stores', 'Vault Stores')}
        ${sub('#', 'ev_archives', 'EV Archives')}
      ${groupEnd()}
      ${groupStart('sourceone', 'source', 'SourceOne', soOpen)}
        ${sub('#', 'so_archive_connections', 'Archive Connections')}
        ${sub('#', 'so_business_folders', 'Business Folders')}
        ${sub('#', 'so_endpoints', 'Endpoints')}
      ${groupEnd()}`,

    mappings: `
      ${groupStart('ev_mappings', 'lock', 'Enterprise Vault', evMapOpen)}
        ${sub('../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html', 'ev_mail_mappings', 'Mail Archive Mappings')}
        ${sub('../journal_mappings_content_sync/journal_mappings_content_sync.html', 'ev_journal_mappings', 'Journal Mappings')}
      ${groupEnd()}
      ${item('#', 'native_folder_mappings', 'folder', 'Native Folder Mappings')}
      ${item('#', 'file_archive_mappings', 'folder_zip', 'File Archive Mappings')}
      ${item('#', 'onedrive_mappings', 'cloud', 'OneDrive Mappings')}
      ${item('#', 'smtp_mappings', 'outgoing_mail', 'SMTP Mappings')}
      ${item('#', 'sharepoint_mappings', 'share', 'SharePoint Mappings')}
      ${item('#', 'sourceone_mappings', 'source', 'SourceOne Mappings')}`,

    legal: `
      ${item('../legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html', 'legal_cases', 'gavel', 'Legal Cases')}
      ${item('../file_preview/file_preview.html', 'evidence_reader', 'preview', 'File Preview')}
      ${item('../chat_preview/chat_preview.html', 'evidence_chat', 'forum', 'Chat Preview')}`,

    configuration: `
      ${item('../storage_buckets_content_sync/storage_buckets_content_sync.html', 'config_storage_buckets', 'storage', 'Storage Buckets')}
      ${item('../storage_partitions_layout_correction/storage_partitions_layout_correction.html', 'config_storage_partitions', 'pie_chart', 'Storage Partitions')}
      ${item('../collaboration_links_design_sync/collaboration_links_design_sync.html', 'config_collaboration_links', 'link', 'Collaboration Links')}
      ${item('../retention_categories_design_sync/retention_categories_design_sync.html', 'config_retention', 'category', 'Retention Categories')}
      ${item('../containers_design_sync/containers_design_sync.html', 'config_containers', 'inventory_2', 'Containers')}
      ${item('../internal_domains_design_sync/internal_domains_design_sync.html', 'config_internal_domains', 'dns', 'Internal Domains')}
      ${item('#', 'config_dynamic_ad', 'manage_accounts', 'Dynamic AD Properties')}
      ${item('#', 'config_export_policy', 'ios_share', 'Export Policy')}
      ${item('#', 'config_report_location', 'pin_drop', 'Report Location Policy')}
      ${item('#', 'config_report_email', 'mail', 'Report Email Policy')}
      ${item('#', 'config_tag_groups', 'label', 'Tag Groups')}
      ${item('../audit_logs_sidebar_fixed/audit_logs_sidebar_fixed.html', 'config_audit_logs', 'history', 'Audit Logs')}`,

    administration: `
      ${groupStart('admin_identity', 'badge', 'Identity Management', adminIdOpen)}
        ${sub('#', 'admin_org_units', 'Org Units')}
        ${sub('../roles_design_sync/roles_design_sync.html', 'admin_roles', 'Roles')}
        ${sub('../users_design_sync/users_design_sync.html', 'admin_users', 'Users')}
        ${sub('../security_logs_design_sync/security_logs_design_sync.html', 'admin_security_log', 'Security Log')}
      ${groupEnd()}
      ${groupStart('admin_lang', 'translate', 'Language Management', adminLgOpen)}
        ${sub('../languages_improved_readability_card_view/languages_improved_readability_card_view.html', 'admin_languages', 'Languages')}
        ${sub('../languages_texte/languages_texte.html', 'admin_texts', 'Texts')}
      ${groupEnd()}
      ${item('../text_templates_localization_sync/text_templates_localization_sync.html', 'admin_templates', 'description', 'Text Templates')}
      ${item('../settings_management_maintenance_update/settings_management_maintenance_update.html', 'admin_settings', 'settings', 'Settings')}`,
  };

  const menuItems = sectionItems[section] || '';
  const hasSidebar = menuItems.trim() !== '';

  const sidenav = `
<nav id="sidebar-cf"
     class="sidenav show flex-shrink-0${!hasSidebar ? ' sidenav-hidden' : ''}"
     data-cnds-mode="side"
     data-cnds-slim="false"
     data-purpose="shared-sidenav"
     aria-label="Section navigation">

  <div class="sidenav-toggle-row">
    <button type="button" class="sidenav-slim-toggle" aria-label="Toggle slim mode" title="Toggle sidebar">
      <span class="material-symbols-outlined">menu_open</span>
    </button>
  </div>

  <ul class="sidenav-menu flex-1">
    ${menuItems}
  </ul>

</nav>`;

  // ─── Styles ─────────────────────────────────────────────────
  const styleId = '_shared-sidenav-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .sidenav[data-purpose="shared-sidenav"] {
        --cnds-sidenav-width: 220px;
        --cnds-sidenav-bg: #ffffff;
        position: relative;
        height: 100vh;
        transform: none;
        box-shadow: none;
        border-right: 1px solid var(--cnds-border-color, #e5e7eb);
        display: flex;
        flex-direction: column;
        padding: 0;
        width: var(--cnds-sidenav-width);
        transition: width .2s ease;
        background: #fff;
        flex-shrink: 0;
      }
      .sidenav[data-purpose="shared-sidenav"].sidenav-hidden {
        width: 0 !important;
        border-right: none !important;
        overflow: hidden !important;
      }
      .sidenav[data-purpose="shared-sidenav"][data-cnds-slim="true"] {
        --cnds-sidenav-width: 60px;
      }

      /* ── Slim toggle row ───────────────────────────────────── */
      .sidenav-toggle-row {
        display: flex; align-items: center;
        height: 48px; padding: 0 12px;
        border-bottom: 1px solid var(--cnds-border-color, #e5e7eb);
        flex-shrink: 0;
      }
      .sidenav-slim-toggle {
        background: none; border: 0;
        color: var(--cnds-secondary-color, #9ca3af);
        cursor: pointer; padding: 6px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 6px;
        transition: background-color .15s, color .15s;
      }
      .sidenav-slim-toggle:hover {
        background: rgba(0,0,0,0.05);
        color: var(--cnds-body-color, #374151);
      }
      .sidenav-slim-toggle .material-symbols-outlined { font-size: 20px; }

      /* ── Menu ─────────────────────────────────────────────── */
      .sidenav[data-purpose="shared-sidenav"] .sidenav-menu {
        list-style: none; margin: 0;
        padding: 8px 8px;
        overflow-y: auto; overflow-x: hidden;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link {
        display: flex; align-items: center; gap: 10px;
        height: 40px; padding: 0 10px; margin: 1px 0;
        border-radius: 6px;
        color: #374151;
        text-decoration: none;
        font-size: 0.875rem; font-weight: 400;
        position: relative;
        transition: background-color .15s, color .15s;
        white-space: nowrap; overflow: hidden;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link:hover {
        background: #f3f4f6;
        color: #111827;
      }
      .sidenav-icon { font-size: 20px; flex-shrink: 0; color: #6b7280; }
      .sidenav-chevron {
        font-size: 16px; flex-shrink: 0;
        color: #9ca3af;
        transition: transform .2s;
      }

      /* ── Active state ─────────────────────────────────────── */
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link.active {
        background-color: var(--cnds-product-expireon-blue-50, #efeefb);
        color: var(--cnds-product-accent, #4e45d6);
        font-weight: 600;
        box-shadow: inset 3px 0 0 var(--cnds-product-accent, #4e45d6);
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-link.active .sidenav-icon {
        color: var(--cnds-product-accent, #4e45d6);
      }

      /* ── Group header (collapsible) ───────────────────────── */
      .sidenav-group-link {
        font-weight: 500;
        color: #6b7280 !important;
        font-size: 0.8rem !important;
        letter-spacing: 0.04em;
        height: 36px !important;
      }
      .sidenav-group-link:hover { color: #374151 !important; }
      .sidenav-group-link.group-open .sidenav-icon { color: #4e45d6 !important; }

      /* ── Sub-items ────────────────────────────────────────── */
      .sidenav-collapse {
        list-style: none; margin: 0; padding: 0; display: none;
      }
      .sidenav-collapse.show { display: block; }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-sublink {
        height: 36px;
        font-size: 0.8125rem;
        padding-left: 2.75rem;
        color: #6b7280;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-sublink.active {
        color: var(--cnds-product-accent, #4e45d6);
        font-weight: 600;
      }
      .sidenav[data-purpose="shared-sidenav"] .sidenav-sublink:hover {
        color: #111827;
        background: #f3f4f6;
      }

      /* ── Slim mode ────────────────────────────────────────── */
      .sidenav[data-cnds-slim="true"] .sidenav-label,
      .sidenav[data-cnds-slim="true"] .sidenav-chevron { display: none; }
      .sidenav[data-cnds-slim="true"] .sidenav-link {
        justify-content: center; padding: 0; gap: 0;
      }
      .sidenav[data-cnds-slim="true"] .sidenav-sublink { display: none; }
      .sidenav[data-cnds-slim="true"] .sidenav-collapse { display: none !important; }
      .sidenav[data-cnds-slim="true"] .sidenav-icon { color: #6b7280; }
      .sidenav[data-cnds-slim="true"] .sidenav-link.active .sidenav-icon {
        color: var(--cnds-product-accent, #4e45d6);
      }
    `;
    document.head.appendChild(style);
  }

  document.body.insertAdjacentHTML('afterbegin', sidenav);

  // ─── Collapse toggle ─────────────────────────────────────────
  document.querySelectorAll('[data-purpose="shared-sidenav"] [data-cnds-toggle="sidenav-collapse"]').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const collapse = toggle.nextElementSibling;
      if (!collapse || !collapse.classList.contains('sidenav-collapse')) return;
      const isOpen = collapse.classList.contains('show');
      collapse.classList.toggle('show', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.classList.toggle('group-open', !isOpen);
      const ch = toggle.querySelector('.sidenav-chevron');
      if (ch) ch.textContent = isOpen ? 'chevron_right' : 'expand_more';
    });
  });

  // ─── Slim toggle ─────────────────────────────────────────────
  const slimBtn  = document.querySelector('[data-purpose="shared-sidenav"] .sidenav-slim-toggle');
  const sidenavEl = document.querySelector('[data-purpose="shared-sidenav"]');
  if (slimBtn && sidenavEl) {
    slimBtn.addEventListener('click', function() {
      const slim = sidenavEl.getAttribute('data-cnds-slim') === 'true';
      sidenavEl.setAttribute('data-cnds-slim', String(!slim));
      const icon = slimBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = !slim ? 'menu' : 'menu_open';
      try { localStorage.setItem('expireon-sidenav-slim', String(!slim)); } catch(_) {}
    });
    try {
      if (localStorage.getItem('expireon-sidenav-slim') === 'true') {
        sidenavEl.setAttribute('data-cnds-slim', 'true');
        const icon = slimBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    } catch(_) {}
  }
})();
