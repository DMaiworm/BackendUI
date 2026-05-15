# Expireon – Navigation Map

Vollständige 3-Ebenen-Navigation mit zugeordneten HTML-Prototypen.  
Breadcrumb der jeweiligen Seite ist die Referenz für die Zuordnung.  
`✅` = Seite vorhanden · `🔲` = noch nicht erstellt

---

## Dashboard

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Dashboard | — | — | `dashboard` | 🔲 | — |

---

## OnPrem

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| OnPrem | Endpoints | — | `endpoints` | ✅ | `endpoint_management_overview_focus/endpoint_management_overview_focus.html` |
| OnPrem | Appliances | — | `appliances` | ✅ | `appliance_management_unified_table_style/appliance_management_unified_table_style.html` |
| OnPrem | Nodes | — | `nodes` | 🔲 | — |
| OnPrem | Modules | — | `modules` | ✅ | `modules_management_card_view_layout/modules_management_card_view_layout.html` *(kanonisch; !modules_management_modernized_layout archiviert)* |

---

## Environments

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Environments | Active Directory | Custodians | `ad_custodians` | ✅ | `custodians_management_hybrid_view_cards_in_list_layout/custodians_management_hybrid_view_cards_in_list_layout.html` *(kanonisch; !custodians_management_list_view_layout archiviert)* |
| Environments | Active Directory | Domains | `ad_domains` | ✅ | `domains_management_list_view_sidebar_sync/domains_management_list_view_sidebar_sync.html` |
| Environments | Active Directory | UnResolved Custodians | `ad_unresolved` | ✅ | `unresolved_custodians_header_sync/unresolved_custodians_header_sync.html` |
| Environments | Enterprise Vault | EV Directories | `ev_directories` | ✅ | `ev_directories_footer_sync_1_1/ev_directories_footer_sync_1_1.html` |
| Environments | Enterprise Vault | Vault Stores | `ev_vault_stores` | ✅ | `ev_vault_stores_overview/ev_vault_stores_overview.html` |
| Environments | Enterprise Vault | EV Archives | `ev_archives` | 🔲 | — |
| Environments | SourceOne | Archive Connections | `so_archive_connections` | 🔲 | — |
| Environments | SourceOne | Business Folders | `so_business_folders` | 🔲 | — |
| Environments | SourceOne | Endpoints | `so_endpoints` | 🔲 | — |

---

## Mappings

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Mappings | Enterprise Vault | Mail Archive Mappings | `ev_mail_mappings` | ✅ | `archive_mappings_page_title_sync/archive_mappings_page_title_sync.html` |
| Mappings | Enterprise Vault | Journal Mappings | `ev_journal_mappings` | ✅ | `journal_mappings_content_sync/journal_mappings_content_sync.html` |
| Mappings | Native Folder Mappings | — | `native_folder_mappings` | 🔲 | — |
| Mappings | File Archive Mappings | — | `file_archive_mappings` | 🔲 | — |
| Mappings | OneDrive Mappings | — | `onedrive_mappings` | 🔲 | — |
| Mappings | SMTP Mappings | — | `smtp_mappings` | 🔲 | — |
| Mappings | SharePoint Mappings | — | `sharepoint_mappings` | 🔲 | — |
| Mappings | Source One Mappings | — | `sourceone_mappings` | 🔲 | — |

---

## Legal

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Legal | Legal Cases | — | `legal_cases` | ✅ | `legal_cases_advanced_filters_state_corrected/legal_cases_advanced_filters_state_corrected.html` *(kanonisch; !legal_cases_content_sync, !legal_cases_row_selection_state_final_sync archiviert)* |

---

## Configuration

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Configuration | Storage Buckets | — | `config_storage_buckets` | ✅ | `storage_buckets_content_sync/storage_buckets_content_sync.html` |
| Configuration | Storage Partitions | — | `config_storage_partitions` | ✅ | `storage_partitions_layout_correction/storage_partitions_layout_correction.html` |
| Configuration | Collaboration Links | — | `config_collaboration_links` | ✅ | `collaboration_links_design_sync/collaboration_links_design_sync.html` |
| Configuration | Retention Categories | — | `config_retention` | ✅ | `retention_categories_design_sync/retention_categories_design_sync.html` |
| Configuration | Containers | — | `config_containers` | ✅ | `containers_design_sync/containers_design_sync.html` |
| Configuration | Internal Domains | — | `config_internal_domains` | ✅ | `internal_domains_design_sync/internal_domains_design_sync.html` |
| Configuration | Dynamic AD Properties | — | `config_dynamic_ad` | 🔲 | — |
| Configuration | Export Policy | — | `config_export_policy` | 🔲 | — |
| Configuration | Report Location Policy | — | `config_report_location` | 🔲 | — |
| Configuration | Report Email Policy | — | `config_report_email` | 🔲 | — |
| Configuration | Tag Groups | — | `config_tag_groups` | 🔲 | — |
| Configuration | Audit Logs | — | `config_audit_logs` | ✅ | `audit_logs_sidebar_fixed/audit_logs_sidebar_fixed.html` |

---

## Administration

| Ebene 1 | Ebene 2 | Ebene 3 | ACTIVE_NAV | Status | Prototype |
|---|---|---|---|---|---|
| Administration | Identitätsverwaltung | Organisationseinheiten | `admin_org_units` | 🔲 | — |
| Administration | Identitätsverwaltung | Rollen | `admin_roles` | ✅ | `roles_design_sync/roles_design_sync.html` |
| Administration | Identitätsverwaltung | Benutzer | `admin_users` | ✅ | `users_design_sync/users_design_sync.html` |
| Administration | Identitätsverwaltung | Sicherheitsprotokoll | `admin_security_log` | ✅ | `security_logs_design_sync/security_logs_design_sync.html` |
| Administration | Sprachverwaltung | Sprachen | `admin_languages` | ✅ | `languages_improved_readability_card_view/languages_improved_readability_card_view.html` *(kanonisch; !languages_design_sync archiviert)* |
| Administration | Sprachverwaltung | Texte | `admin_texts` | ✅ | `languages_texte/languages_texte.html` |
| Administration | Textvorlagen | — | `admin_templates` | ✅ | `text_templates_localization_sync/text_templates_localization_sync.html` *(kanonisch; !text_templates_header_sync archiviert)* |
| Administration | Einstellungen | — | `admin_settings` | ✅ | `settings_management_maintenance_update/settings_management_maintenance_update.html` *(kanonisch; !settings_navigation_sync_tabs archiviert)* |

---

## Übersicht

| Status | Anzahl |
|---|---|
| ✅ Vorhanden | 27 |
| 🔲 Ausstehend | 13 |
| **Gesamt** | **40** |
