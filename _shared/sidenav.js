/**
 * Shared Sidenav – Expireon AdminConsole Prototype
 *
 * Usage in each page:
 *   <script>const ACTIVE_NAV = 'ad_custodians';</script>
 *   <script src="../_shared/sidenav.js"></script>
 *
 * ACTIVE_NAV keys:
 *
 *   dashboard
 *
 *   OnPrem:
 *     endpoints | appliances | nodes | modules
 *
 *   Environments:
 *     ad_domains | ad_custodians | ad_unresolved
 *     ev_directories | ev_vault_stores | ev_archives
 *     so_archive_connections | so_business_folders | so_endpoints
 *
 *   Mappings:
 *     ev_mail_mappings | ev_journal_mappings
 *     native_folder_mappings | file_archive_mappings | onedrive_mappings
 *     smtp_mappings | sharepoint_mappings | sourceone_mappings
 *
 *   Legal:
 *     legal_cases
 *
 *   Configuration:
 *     config_storage_buckets | config_storage_partitions | config_collaboration_links
 *     config_retention | config_containers | config_internal_domains
 *     config_dynamic_ad | config_export_policy | config_report_location
 *     config_report_email | config_tag_groups | config_audit_logs
 *
 *   Administration:
 *     admin_org_units | admin_roles | admin_users | admin_security_log
 *     admin_languages | admin_texts
 *     admin_templates | admin_settings
 */
(function () {
  const nav = (typeof ACTIVE_NAV !== 'undefined') ? ACTIVE_NAV : '';

  // Group membership helpers
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

  // ── Render helpers ──────────────────────────────────────────────────────────

  // L1 direct link (no children)
  function item(href, key, icon, label) {
    const active = nav === key ? 'active' : '';
    return `
    <li class="sidenav-item" title="${label}" data-original-title="${label}">
      <a href="${href}" id="navlink_${key}" class="sidenav-link gap-3 ${active}">
        <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
        <span>${label}</span>
      </a>
    </li>`;
  }

  // L1 collapsible group
  function group(id, icon, label, open) {
    return `
    <li class="sidenav-item" title="${label}" data-original-title="${label}">
      <a href="#" id="tog_submenu_${id}" class="sidenav-link gap-3 ${open ? 'active' : ''}"
         data-cnds-toggle="sidenav-collapse" aria-expanded="${open}">
        <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
        <span class="flex-1">${label}</span>
        <span class="material-symbols-outlined sidenav-chevron" aria-hidden="true"
              style="font-size:18px;flex-shrink:0;transition:transform .2s">${open ? 'expand_more' : 'chevron_right'}</span>
      </a>`;
  }

  // L1 collapse container open/close
  function collapseStart(open) {
    return `<ul class="sidenav-collapse${open ? ' show' : ''}">`;
  }
  function collapseEnd() { return `</ul>\n    </li>`; }

  // L2 sub-link
  function sub(href, key, label) {
    const active = nav === key ? 'active fw-semibold' : '';
    return `
      <li class="sidenav-item" title="${label}" data-original-title="${label}">
        <a href="${href}" id="navlink_${key}" class="sidenav-link gap-3 ${active}"
           style="padding-left:2rem">${label}</a>
      </li>`;
  }

  // L2 collapsible sub-group
  function subGroup(id, label, open) {
    return `
      <li class="sidenav-item" title="${label}" data-original-title="${label}">
        <a href="#" id="tog_submenu_${id}" class="sidenav-link gap-3 ${open ? 'active' : ''}"
           data-cnds-toggle="sidenav-collapse" aria-expanded="${open}"
           style="padding-left:2rem">
          <span class="flex-1">${label}</span>
          <span class="material-symbols-outlined sidenav-chevron" aria-hidden="true"
                style="font-size:16px;flex-shrink:0;transition:transform .2s">${open ? 'expand_more' : 'chevron_right'}</span>
        </a>`;
  }

  // L3 sub-sub-link
  function subsub(href, key, label) {
    const active = nav === key ? 'active fw-semibold' : '';
    return `
        <li class="sidenav-item" title="${label}" data-original-title="${label}">
          <a href="${href}" id="navlink_${key}" class="sidenav-link gap-3 ${active}"
             style="padding-left:3.5rem">${label}</a>
        </li>`;
  }

  // ── HTML ────────────────────────────────────────────────────────────────────

  const sidenav = `
<aside class="sidenav show flex-shrink-0 flex flex-col"
       style="width:260px;position:relative;height:100vh;transform:none;box-shadow:none;border-right:1px solid var(--cnds-outline-variant,#e2e8f0);overflow-y:auto"
       data-cnds-accordion="true"
       aria-label="Application navigation"
       data-purpose="shared-sidenav">

  <div class="px-4 flex items-center shrink-0" style="height:61px">
    <img src="../_shared/cloudficient_cloudficient-expireon_1760436020615.png" alt="Expireon" style="max-height:48px;width:auto">
  </div>

  <ul class="sidenav-menu flex-1 px-2 pb-4">

    ${item('#', 'dashboard', 'grid_view', 'Dashboard')}

    <!-- OnPrem -->
    ${group('onprem', 'storage', 'OnPrem', onpremOpen)}
    ${collapseStart(onpremOpen)}
      ${sub('../endpoint_management_overview_focus/endpoint_management_overview_focus.html', 'endpoints', 'Endpoints')}
      ${sub('../appliance_management_unified_table_style/appliance_management_unified_table_style.html', 'appliances', 'Appliances')}
      ${sub('#', 'nodes', 'Nodes')}
      ${sub('../modules_management_card_view_layout/modules_management_card_view_layout.html', 'modules', 'Modules')}
    ${collapseEnd()}

    <!-- Environments -->
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

    <!-- Mappings -->
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

    <!-- Legal -->
    ${group('legal', 'gavel', 'Legal', legalOpen)}
    ${collapseStart(legalOpen)}
      ${sub('../legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html', 'legal_cases', 'Legal Cases')}
    ${collapseEnd()}

    <!-- Configuration -->
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

    <!-- Administration -->
    ${group('administration', 'manage_accounts', 'Administration', adminOpen)}
    ${collapseStart(adminOpen)}

      ${subGroup('admin_identity', 'Identitätsverwaltung', adminIdOpen)}
      ${collapseStart(adminIdOpen)}
        ${subsub('#', 'admin_org_units', 'Organisationseinheiten')}
        ${subsub('../roles_design_sync/roles_design_sync.html', 'admin_roles', 'Rollen')}
        ${subsub('../users_design_sync/users_design_sync.html', 'admin_users', 'Benutzer')}
        ${subsub('../security_logs_design_sync/security_logs_design_sync.html', 'admin_security_log', 'Sicherheitsprotokoll')}
      ${collapseEnd()}

      ${subGroup('admin_lang', 'Sprachverwaltung', adminLgOpen)}
      ${collapseStart(adminLgOpen)}
        ${subsub('../languages_improved_readability_card_view/languages_improved_readability_card_view.html', 'admin_languages', 'Sprachen')}
        ${subsub('../languages_texte/languages_texte.html', 'admin_texts', 'Texte')}
      ${collapseEnd()}

      ${sub('../text_templates_localization_sync/text_templates_localization_sync.html', 'admin_templates', 'Textvorlagen')}
      ${sub('../settings_management_maintenance_update/settings_management_maintenance_update.html', 'admin_settings', 'Einstellungen')}
    ${collapseEnd()}

  </ul>

  <div class="p-4" style="border-top:1px solid var(--cnds-outline-variant,#e2e8f0)">
    <ul class="sidenav-menu">
      <li class="sidenav-item">
        <a href="#" class="sidenav-link gap-3">
          <span class="material-symbols-outlined" aria-hidden="true">help_outline</span>
          <span>Support</span>
        </a>
      </li>
      <li class="sidenav-item">
        <a href="#" class="sidenav-link gap-3">
          <span class="material-symbols-outlined" aria-hidden="true">account_circle</span>
          <span>Account</span>
        </a>
      </li>
    </ul>
  </div>

</aside>`;

  document.body.insertAdjacentHTML('afterbegin', sidenav);

  // Close a toggle and all nested toggles inside it
  function closeToggle(t) {
    const c = t.nextElementSibling;
    if (!c || !c.classList.contains('sidenav-collapse')) return;
    c.classList.remove('show');
    t.setAttribute('aria-expanded', 'false');
    const ch = t.querySelector('.sidenav-chevron');
    if (ch) ch.textContent = 'chevron_right';
    c.querySelectorAll('[data-cnds-toggle="sidenav-collapse"]').forEach(closeToggle);
  }

  // Toggle group expand/collapse; close all siblings (accordion) on open
  document.querySelectorAll('[data-purpose="shared-sidenav"] [data-cnds-toggle="sidenav-collapse"]').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const collapse = toggle.nextElementSibling;
      if (!collapse || !collapse.classList.contains('sidenav-collapse')) return;

      const isOpen = collapse.classList.contains('show');

      if (!isOpen) {
        // Close all siblings at the same ul level (and their descendants)
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
})();
