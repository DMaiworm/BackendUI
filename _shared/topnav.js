/**
 * Shared TopNav – Expireon AdminConsole Prototype
 *
 * Usage in each page (as first child of main-content wrapper):
 *   <script>const TOPNAV_SEARCH = 'Search appliances...';</script>
 *   <script src="../_shared/topnav.js"></script>
 *
 * Optional variables:
 *   TOPNAV_SEARCH  – search field placeholder (default: 'Search...')
 *   TOPNAV_ACTIVE  – active nav link: 'docs' | 'logs' | 'alerts' (default: 'alerts')
 */
(function () {
  const placeholder = (typeof TOPNAV_SEARCH !== 'undefined') ? TOPNAV_SEARCH : 'Search...';
  const active = (typeof TOPNAV_ACTIVE !== 'undefined') ? TOPNAV_ACTIVE : 'alerts';

  function navLink(href, key, label) {
    const isActive = active === key;
    const activeClass = isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary';
    return `<a href="${href}" class="${activeClass}" style="padding-bottom:2px">${label}</a>`;
  }

  const topnav = `
<header class="bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-8 shrink-0" style="height:64px" data-purpose="shared-topnav">

  <!-- Search -->
  <div class="flex items-center flex-1" style="max-width:28rem">
    <div class="relative w-full">
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size:18px">search</span>
      </span>
      <input class="cf-input-control w-full" style="padding-left:2.25rem" placeholder="${placeholder}" type="text"/>
    </div>
  </div>

  <!-- Right: Nav + Icons -->
  <div class="flex items-center gap-6 ml-4">
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface-variant">
      ${navLink('#', 'docs', 'Docs')}
      ${navLink('#', 'logs', 'Logs')}
      ${navLink('#', 'alerts', 'Alerts')}
    </nav>
    <div class="h-6 w-px bg-outline-variant"></div>
    <div class="flex items-center gap-3">
      <button class="btn btn-link p-1">
        <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
      </button>
      <button class="btn btn-link p-1">
        <span class="material-symbols-outlined text-on-surface-variant">help_outline</span>
      </button>
      <div class="w-8 h-8 rounded-full bg-secondary-container border border-outline-variant overflow-hidden flex items-center justify-center">
        <img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXjfr-Upf6udV3Y5UixDu2gMjxkTrANKXueYeaJM1DlrT67TARk2RX8GIYFjFXDm8iR4v6B9oyDEHKTfxDVani0AIjF4rENTA_BlO30qVv7WGw7OrOcOPT22SXXtWnuRVxVXBefRilEOt_yF_-0kZyMPO5wU2N9xQOLY3W5bNybJShudCWT1ENVZpeK_9tfg3EhO5H2QH2F2AMniYZD5B0rM7svlkrf8v1I0OyeZceZvVuBBefc3Lw70iurrGZtU3pAENfp3A8rIQ"/>
      </div>
    </div>
  </div>

</header>`;

  // Global CSS fixes injected once
  if (!document.getElementById('_shared-global-fixes')) {
    const style = document.createElement('style');
    style.id = '_shared-global-fixes';
    style.textContent = `
      .page-item.active .page-link {
        background-color: #004ac6;
        border-color: #004ac6;
        color: #ffffff;
      }
      .page-item.disabled .page-link { opacity: .5; pointer-events: none; }
      .page-link { color: #004ac6; }
      .page-link:hover { color: #003ea8; }
    `;
    document.head.appendChild(style);
  }

  // Inject immediately after the <script> tag in the DOM
  document.currentScript.insertAdjacentHTML('afterend', topnav);
})();
