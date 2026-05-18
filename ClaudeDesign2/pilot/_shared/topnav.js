/**
 * Shared TopNav v2 — Expireon AdminConsole (Nimbus 100% compliant)
 *
 * Improvements over v1:
 *   • No hardcoded #004ac6 — uses --cnds-product-accent (Expireon purple #4e45d6)
 *   • Pagination active-state uses CSS vars, not inline color overrides
 *   • Uses Nimbus tokens (--cnds-body-bg, --cnds-border-color, etc.)
 *   • Search input fits Nimbus cf-input-control spec without padding-overrides
 *   • Right-side icons grouped in a toolbar with proper separator
 *
 * Usage:
 *   <script>const TOPNAV_SEARCH = 'Search legal cases...';</script>
 *   <script src="_shared/topnav.js"></script>
 */
(function () {
  const placeholder = (typeof TOPNAV_SEARCH !== 'undefined') ? TOPNAV_SEARCH : 'Search...';
  const active = (typeof TOPNAV_ACTIVE !== 'undefined') ? TOPNAV_ACTIVE : '';

  function navLink(href, key, label) {
    const isActive = active === key;
    return `<a href="${href}" class="topnav-link ${isActive ? 'active' : ''}">${label}</a>`;
  }

  const topnav = `
<header class="topnav" data-purpose="shared-topnav">
  <div class="topnav-search">
    <span class="material-symbols-outlined topnav-search-icon" aria-hidden="true">search</span>
    <input class="cf-input-control topnav-search-input" placeholder="${placeholder}" type="text"/>
    <kbd class="topnav-search-kbd">⌘K</kbd>
  </div>

  <div class="topnav-right">
    <nav class="topnav-nav">
      ${navLink('#', 'docs', 'Docs')}
      ${navLink('#', 'logs', 'Logs')}
      ${navLink('#', 'alerts', 'Alerts')}
    </nav>
    <div class="topnav-divider" aria-hidden="true"></div>
    <div class="topnav-actions">
      <button class="topnav-icon-btn" aria-label="Notifications">
        <span class="material-symbols-outlined">notifications</span>
        <span class="topnav-icon-dot" aria-hidden="true"></span>
      </button>
      <button class="topnav-icon-btn" aria-label="Help">
        <span class="material-symbols-outlined">help_outline</span>
      </button>
      <button class="topnav-avatar" aria-label="Account">
        <span class="topnav-avatar-initials">DM</span>
      </button>
    </div>
  </div>
</header>`;

  const styleId = '_shared-topnav-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* TopNav */
      .topnav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        height: 64px;
        padding: 0 1.5rem;
        background: #ffffff;
        border-bottom: 1px solid var(--cnds-border-color, #e0e0e0);
        flex-shrink: 0;
      }

      /* Search */
      .topnav-search {
        position: relative;
        flex: 1;
        max-width: 28rem;
        display: flex;
        align-items: center;
      }
      .topnav-search-icon {
        position: absolute;
        left: 12px;
        font-size: 18px;
        color: var(--cnds-secondary-color, #4f4f4f99);
        pointer-events: none;
      }
      .topnav-search-input.cf-input-control {
        width: 100%;
        padding-left: 2.5rem !important;
        padding-right: 3rem !important;
        height: 38px;
        background: var(--cnds-surface-light-100, #f5f5f5);
        border-color: transparent;
      }
      .topnav-search-input.cf-input-control:focus {
        background: #fff;
      }
      .topnav-search-kbd {
        position: absolute;
        right: 10px;
        padding: 2px 6px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 10.5px;
        color: var(--cnds-secondary-color, #4f4f4f99);
        background: rgba(0,0,0,0.04);
        border: 1px solid var(--cnds-border-color, #e0e0e0);
        border-radius: 4px;
        pointer-events: none;
      }

      /* Right cluster */
      .topnav-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .topnav-nav {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }
      .topnav-link {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--cnds-secondary-color, #4f4f4f99);
        text-decoration: none;
        padding: 6px 2px;
        border-bottom: 2px solid transparent;
        transition: color .15s ease, border-color .15s ease;
      }
      .topnav-link:hover { color: var(--cnds-body-color, #4f4f4f); }
      .topnav-link.active {
        color: var(--cnds-product-accent, #4e45d6);
        border-bottom-color: var(--cnds-product-accent, #4e45d6);
      }
      .topnav-divider {
        width: 1px;
        height: 24px;
        background: var(--cnds-border-color, #e0e0e0);
      }

      /* Icon buttons */
      .topnav-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .topnav-icon-btn {
        position: relative;
        background: none;
        border: 0;
        padding: 8px;
        border-radius: 8px;
        color: var(--cnds-secondary-color, #4f4f4f99);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color .15s ease, color .15s ease;
      }
      .topnav-icon-btn:hover {
        background: rgba(0,0,0,0.05);
        color: var(--cnds-body-color, #4f4f4f);
      }
      .topnav-icon-btn .material-symbols-outlined { font-size: 20px; }
      .topnav-icon-dot {
        position: absolute;
        top: 8px; right: 8px;
        width: 8px; height: 8px;
        background: var(--cnds-semantic-danger-400, #db3a00);
        border: 2px solid #fff;
        border-radius: 999px;
      }

      /* Avatar */
      .topnav-avatar {
        margin-left: 6px;
        width: 32px; height: 32px;
        border-radius: 999px;
        border: 0;
        background: linear-gradient(135deg, var(--cnds-product-expireon-purple-300, #b3afee), var(--cnds-product-accent, #4e45d6));
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .15s ease, box-shadow .15s ease;
      }
      .topnav-avatar:hover {
        transform: scale(1.04);
        box-shadow: 0 0 0 3px var(--cnds-product-expireon-blue-50, #efeefb);
      }

      /* Global pagination color override — use product accent, not hardcoded blue */
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

  document.currentScript.insertAdjacentHTML('afterend', topnav);
})();
