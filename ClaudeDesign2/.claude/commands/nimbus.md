# Nimbus – Design System Agent

Du bist der Nimbus-Experte für das Expireon BackendUI.  
Deine Aufgabe: Nimbus Design System auf bestehende Plain-HTML-Seiten anwenden oder neue erstellen — als Grundlage der NextGenUI.

---

## Modus-Erkennung

| Aufruf | Modus |
|---|---|
| `/nimbus setup [Pfad]` | → CDN-Links in eine code.html einfügen |
| `/nimbus apply [Pfad]` | → Bestehende Tailwind-HTML auf Nimbus migrieren |
| `/nimbus new [Beschreibung]` | → Neue HTML-Seite komplett in Nimbus erstellen |
| `/nimbus review [Pfad]` | → Deep Review: Vollständige Compliance-Prüfung gegen Nimbus-Regeln |
| `/nimbus` (ohne Argumente) | → Frage nach gewünschtem Modus |

---

## Vor jedem Aufruf: Pflicht-Lektüre

1. `code.html` im Ziel-Ordner – **vollständig lesen als Basis**
2. `screen.png` im gleichen Ordner (falls vorhanden) – Referenz für das gewünschte Ergebnis

**Bei Unsicherheit zu einem Nimbus-Pattern:** Die zugehörige Docs-Seite per `WebFetch` holen.  
URL-Schema: `https://wswilliams67.github.io/nimbus/cnds-[name].html`  
Beispiele: `cnds-badges.html`, `cnds-cards.html`, `cnds-inputfields.html`, `cnds-buttons.html`, `cnds-sidenav.html`

---

## Modus 1: `/nimbus setup [Pfad]`

Fügt Nimbus-CDN-Links in eine bestehende `code.html` ein.  
Führe nur aus wenn die Nimbus-CSS-Links noch nicht vorhanden sind (vorher prüfen!).

**Einfügen vor `</head>`:**

```html
<!-- Nimbus Design System -->
<link rel="stylesheet" href="https://wswilliams67.github.io/nimbus/css/themes/primitives.css">
<link rel="stylesheet" href="https://wswilliams67.github.io/nimbus/css/themes/light.css">
<link rel="stylesheet" href="https://wswilliams67.github.io/nimbus/css/nimbus.css">
<!-- Nunito Font (Nimbus Standard) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Tailwind CDN bleibt erhalten — Nimbus und Tailwind koexistieren. Tailwind wird danach nur noch für Layout-Utilities verwendet.

---

## Modus 2: `/nimbus apply [Pfad]`

Liest die bestehende `code.html` als Vorlage und erstellt eine neue Nimbus-Version als **`[ordnername].html`** im selben Ordner. Die originale `code.html` bleibt unverändert.

### Ausgabe-Dateiname

- Argument: `[ordnername]` (Ordnerpfad oder -name, z.B. `appliance_management_unified_table_style`)
- Originaldatei: `[ordnername]/code.html` → **nicht anfassen, niemals überschreiben**
- Neue Datei: `[ordnername]/[ordnername].html`

Den Ordnernamen aus dem Pfad-Argument ableiten (letzter Segment ohne führenden `/`).

### Vorgehensweise

1. **`code.html` lesen** – vollständig als Basis
2. **screen.png lesen** (falls vorhanden) – Ziel-Optik verstehen
3. **Nimbus-CDN-Links** – immer einfügen (nicht prüfen ob vorhanden, da neue Datei)
4. **Analyse:** Identifiziere alle zu migrierenden Stellen:
   - Tailwind-Klassen für visuelle Elemente (Farben, Borders, Backgrounds, Shadows, Radius, Typography)
   - Direkte HTML-Klassen für Buttons, Cards, Badges, Alerts, Inputs, Labels, Tabellen, Navigation
5. **Migration nach Mapping-Tabelle:**

   | Vorher (Tailwind) | Nachher (Nimbus) |
   |---|---|
   | `bg-blue-600 text-white px-4 py-2 rounded` | `btn btn-primary` |
   | `bg-gray-200 text-gray-800 px-4 py-2 rounded` | `btn btn-secondary` |
   | `bg-red-600 text-white px-4 py-2 rounded` | `btn btn-danger` |
   | `text-blue-600 underline` (als Button) | `btn btn-link` |
   | `bg-white rounded shadow p-4` | `card` + `card-body` |
   | `text-xs bg-green-100 text-green-800 rounded-full px-2` | `badge badge-success` |
   | `text-xs bg-yellow-100 text-yellow-800 rounded-full px-2` | `badge badge-warning` |
   | `text-xs bg-red-100 text-red-800 rounded-full px-2` | `badge badge-danger` |
   | `text-xs bg-blue-100 text-blue-800 rounded-full px-2` | `badge badge-info` |
   | `text-xs bg-gray-100 text-gray-800 rounded-full px-2` | `badge badge-secondary` |
   | `bg-green-50 border border-green-200 text-green-800 p-3 rounded` | `alert alert-success` |
   | `bg-red-50 border border-red-200 text-red-800 p-3 rounded` | `alert alert-danger` |
   | `bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded` | `alert alert-warning` |
   | `bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded` | `alert alert-info` |
   | `border-b font-semibold text-gray-700` (th) | `<th>` in `.table` (automatisch gestylt) |
   | `border-b text-sm` (td) | `<td>` in `.table` (automatisch gestylt) |
   | Sidebar-Link-Klassen | `sidenav-link` / `sidenav-link active` |
   | Tab-Navigation | `.nav.nav-tabs` + `.nav-link` / `.nav-link.active` |
   | Filter-Tabs | `.nav.nav-pills` + `.nav-link` / `.nav-link.active` |
   | Input-Felder | `.cf-input-field` + `.cf-input-label` + `.cf-input-wrapper` + `.cf-input-control` |
   | `<select>` Element | `cf-input-control` + `style="width:auto"` |
   | `<input type="checkbox">` | `form-check-input` |
   | Progress-Bars | `.progress` + `.progress-bar` |
   | `bg-primary hover:brightness-90 text-on-primary ... rounded-lg` (Button mit MD3-Tokens) | `btn btn-primary` |
   | `border border-outline-variant ... bg-surface-container-lowest` (Button mit MD3-Tokens) | `btn btn-secondary` |
   | Icon-only Button (Bell, Kebab, Help) — rohes `<button>` mit SVG | `btn btn-link p-1` |
   | Status-Dot + "Active" Text in Primärfarbe | `badge badge-primary` |
   | Status-Dot + "Online/Enabled" in Grün | `badge badge-success` |
   | Pagination-Bereich am Ende einer Card | `card-footer` |
   | Einfache Prev/Next Pagination | `.card-footer` + `btn btn-secondary btn-sm` mit Chevron-Icons |
   | Nummerierte Pagination (viele Seiten) | `.pagination.pagination-sm` + `.page-item` + `.page-link` + `.page-item.active` |
   | Tab-Navigation auf Seiten-Ebene | `.nav.nav-tabs` + `.nav-item` + `.nav-link` / `.nav-link.active` |
   | Filter-Tabs (Pill-Style) | `.nav.nav-pills` + `.nav-link` / `.nav-link.active` |
   | Fortschrittsbalken | `.progress` + `.progress-bar` mit `style="width:X%"` |
   | SVG-Icon in `<svg>` Tag | `<span class="material-symbols-outlined">icon_name</span>` |

6. **Was NICHT anfassen:**
   - Tailwind Layout-Utilities: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`, `max-w-*`
   - `justify-*`, `items-*`, `space-y-*`, `overflow-*`, `z-*`, `fixed`, `relative`, `absolute`
   - Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
   - Inline-Styles (`style="..."`) für Icon-Größen, explizite Breiten auf Selects, etc. — beibehalten
   - **Tailwind-Config mit MD3-Tokens beibehalten** wenn Custom-Tokens wie `bg-primary-fixed`, `border-outline-variant`, `text-on-surface-variant` noch auf strukturellen Nicht-Nimbus-Elementen (Icon-Container, Trennlinien, Breadcrumbs, Avatar) verwendet werden

7. **Neue Datei schreiben** – `[ordnername]/[ordnername].html` — `code.html` bleibt unverändert
8. **Ausgabe:** Zeige alle migrierten Stellen als kurze Auflistung (nicht den ganzen HTML-Diff).

---

## Modus 4: `/nimbus review [Pfad]`

Vollständige Compliance-Prüfung einer fertigen HTML-Seite gegen alle Nimbus-Regeln.  
Ziel: 100% Nimbus-konforme Seite, die ohne Beanstandungen an den Designer übergeben werden kann.

### Vorgehensweise

1. **HTML-Datei vollständig lesen** — keine Abkürzungen, jede Zeile zählt
2. **Jeden der 7 Prüfbereiche systematisch durchgehen** (s. Prüfkatalog unten)
3. **Violation-Tabelle erstellen** — jede Abweichung mit Zeilennummer, Kategorie, Problem und konkretem Fix
4. **Compliance-Score berechnen** — Punkte pro Kategorie, Gesamtscore /100
5. **Fixes anbieten** — nach dem Report fragen ob Korrekturen direkt angewendet werden sollen

### Prüfkatalog (7 Kategorien)

#### A — Infrastruktur (15 Punkte)
- [ ] Tailwind CDN vor Nimbus geladen
- [ ] Alle 3 Nimbus CDN-Links vorhanden: `primitives.css`, `light.css`, `nimbus.css`
- [ ] Nunito Font geladen
- [ ] Material Symbols Outlined geladen
- [ ] MD3 Tailwind-Config-Block vorhanden (mit Custom Color Tokens)
- [ ] Scrollbar-Style in `<style>` vorhanden

#### B — Seitenstruktur (15 Punkte)
- [ ] `ACTIVE_NAV` korrekt gesetzt (passend zur Seite, vor `sidenav.js`)
- [ ] Sidenav geladen via `../_shared/sidenav.js` — **keine inline Sidenav**
- [ ] `TOPNAV_SEARCH` gesetzt (sinnvoller Placeholder, vor `topnav.js`)
- [ ] TopNav geladen via `../_shared/topnav.js`
- [ ] Breadcrumb vorhanden mit `chevron_right` Separator
- [ ] Breadcrumb-Links sind echte Pfade — kein `href="#"` auf Eltern-Segmenten
- [ ] Page Title (`<h1>`) vorhanden und konsistent mit Breadcrumb

#### C — Nimbus-Komponenten (30 Punkte)
**Buttons:**
- [ ] Primäre Aktionen: `btn btn-primary` (max. eine pro Screen-Bereich)
- [ ] Sekundäre Aktionen: `btn btn-secondary`
- [ ] Tertiäre Aktionen: `btn btn-tertiary` (minimal sichtbar, zusätzliche Infos)
- [ ] Destruktive Aktionen: `btn btn-danger`
- [ ] Text-Links als Button: `btn btn-link`
- [ ] Icon-only Buttons: `btn btn-link p-1` — **niemals** `btn btn-secondary` für Icons
- [ ] Outline-Stil wenn nötig: `btn btn-outline-primary` / `btn btn-outline-secondary`
- [ ] Deaktivierte `<a>`-Buttons: `aria-disabled="true"` + `tabindex="-1"` statt nur `.disabled`

**Cards:**
- [ ] Standard-Card: `card` (hat Border + Shadow)
- [ ] Card ohne Shadow: `card card-basic`
- [ ] Alle Cards mit passendem Substruktur: `card-header`, `card-body`, `card-footer`
- [ ] `card-title` in `card-header` immer mit `mb-0`
- [ ] Schatten via `custom-shadow-l1` — kein Tailwind `shadow-*`
- [ ] Für farbige Highlight-Cards: `card-{primary|success|danger|warning|info}`

**Tabellen:**
- [ ] Wrapper: `<div class="table-responsive w-full">` — `w-full` PFLICHT
- [ ] Table: `<table class="table table-hover mb-0 w-full">` — `mb-0` und `w-full` PFLICHT
- [ ] Selektierte Zeilen: `class="table-active"` auf `<tr>`
- [ ] Keine manuellen Border/Padding-Klassen auf `<th>` oder `<td>`

**Badges:**
- [ ] Basis-Badge: `badge badge-{success|warning|danger|info|primary|secondary}`
- [ ] Rundere Badges: `badge badge-pill badge-{variant}`
- [ ] Status-Dots (kein Text): `badge badge-dot badge-{variant}`
- [ ] Badge in Button: `badge badge-btn badge-{variant}`
- [ ] Keine Tailwind-Farbklassen als Badge-Ersatz

**Alerts — ⚠️ Syntax-Anforderung:**
- [ ] Korrekte Attribut-Syntax: `<div class="alert" role="alert" data-cnds-color="{variant}" data-cnds-alert-init>`
- [ ] Varianten: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`
- [ ] NICHT: `class="alert alert-info"` (class-basierte Syntax ist nicht empfohlen — Nimbus Docs nutzen ausschließlich data-Attribute)
- [ ] Schließbar: `alert-dismissible` + `.btn-close` mit `data-cnds-dismiss="alert"`

**Formulare:**
- [ ] Vollständige Wrapper-Struktur: `cf-input-field` → `cf-input-label` → `cf-input-wrapper` → `cf-input-control`
- [ ] Fehler-Zustand: `.is-invalid` auf `cf-input-field` + `cf-input-error` sichtbar
- [ ] Größen wenn nötig: `cf-input-field-sm` / `cf-input-field-lg`
- [ ] Selects: `cf-input-control` mit `style="width:auto"`
- [ ] Checkboxen: `form-check-input`
- [ ] Trailing-Icon: `.cf-input-icon` innerhalb von `cf-input-wrapper`

**Pagination — ⚠️ Zwei gültige Muster:**
- [ ] **Nimbus-nativ (bevorzugt):** `.pagination-toolbar` + `.pagination-toolbar-btn` mit First/Prev/Next/Last + Range-Anzeige
- [ ] **Bootstrap-kompatibel (akzeptiert):** `.pagination.pagination-sm` + `.page-item` + `.page-link` + `.page-item.active` — für nummerierte Seitennavigation
- [ ] Chevron-Icons: `style="font-size:16px;vertical-align:middle"`
- [ ] Pagination immer in `card-footer` platziert

**Navigation Tabs — ⚠️ Nimbus-native Klasse:**
- [ ] Nimbus-Stil: `.nav.nav-tabs.nav-tabs-nimbus` (nicht nur `.nav-tabs`)
- [ ] Jeder Tab-Link: `data-cnds-tab-init` Attribut + `role="tab"` + `aria-controls` + `aria-selected`
- [ ] Tab-Container: `role="tablist"` auf `<ul>`
- [ ] Tab-Panes: `<div class="tab-content">` + `<div class="tab-pane fade show active" role="tabpanel">`
- [ ] Filter-Tabs (Pill-Style): `.nav.nav-pills`

**Progress Bars:**
- [ ] Wrapper: `<div class="progress">`
- [ ] Bar: `<div class="progress-bar" role="progressbar" style="width:X%" aria-valuenow="X" aria-valuemin="0" aria-valuemax="100">`
- [ ] Farbe via `bg-success`, `bg-warning`, `bg-danger`, `bg-info` — **kein** `bg-primary` (ist standard)
- [ ] Kreisförmig wenn nötig: `.progress.progress-circular` mit `style="--percentage:X"`

**Modals:**
- [ ] Struktur: `.modal` → `.modal-dialog` → `.modal-content` → `.modal-header` + `.modal-body` + `.modal-footer`
- [ ] `modal-title` im Header, `btn-close` mit `data-cnds-dismiss="modal"`
- [ ] Größen: `.modal-sm` (300px), `.modal-lg` (800px), `.modal-xl` (1140px)
- [ ] Zentriert: `.modal-dialog-centered`
- [ ] Sichtbar: `.modal.show` + `style="display:block"` — beides notwendig (kein JS-Framework)

#### D — Typografie (10 Punkte)
- [ ] Nimbus-Heading-Modifier: `.bold` / `.light` auf Heading-Elementen (`<h1 class="bold">`)
- [ ] Bootstrap-Utils akzeptiert: `fw-bold`, `fw-semibold` funktionieren durch Nimbus Bootstrap-Basis — kein Fehler, aber `.bold` ist native
- [ ] `text-muted` für sekundären Text — **kein** `text-gray-*` / `text-slate-*`
- [ ] `small` für kleineren Text (12px) — kein `text-sm` / `text-xs` innerhalb Nimbus-Komponenten
- [ ] `lead` für prominente Paragraphen (20px)
- [ ] `caption` für kleine beschreibende Texte (11px)
- [ ] `text-end` statt `text-right`, `text-start` statt `text-left` innerhalb Nimbus-Kontexten
- [ ] **Kein** roher `font-weight`-Inline-Style wenn Nimbus-Klassen verfügbar

#### E — Icons (10 Punkte)
- [ ] Ausschließlich `<span class="material-symbols-outlined">icon_name</span>`
- [ ] Keine inline SVG-Icons
- [ ] Keine Font Awesome (`fa-*`, `fas`, `far`) oder MDI (`mdi-*`) Icons
- [ ] Icons in Sidenav: `aria-hidden="true"` für Screenreader
- [ ] Icon-Größen via `style="font-size:Xpx"` — kein `w-5 h-5` etc.
- [ ] Icon-Variation für filled Icons: `style="font-variation-settings:'FILL' 1"` — nicht `font-fill`

#### F — Farben, Schatten & Tailwind-Nutzung (10 Punkte)
- [ ] Keine rohen Tailwind-Farben auf visuellen Elementen: `bg-blue-*`, `bg-red-*`, `text-green-*` etc.
- [ ] Tailwind nur für Layout: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`, Breakpoints
- [ ] MD3-Tokens (`text-on-surface-variant`, `bg-primary-fixed`, `border-outline-variant`) nur auf strukturellen Nicht-Nimbus-Elementen (Breadcrumb, Trennlinien, Avatar-Hintergründe)
- [ ] Buttons auf farbigen Hintergründen (Banner, Alerts): kein `btn btn-*` — Inline-Style verwenden
- [ ] **Schatten: `custom-shadow-l1` ist NICHT in Nimbus-Docs dokumentiert** — offiziell sind `.shadow-1` bis `.shadow-5`. `custom-shadow-l1` funktioniert in unseren Seiten, ist aber kein garantiertes Nimbus-Pattern. Für Designerübergabe: prüfen ob via `shadow-1` / `shadow-2` ersetzbar.

#### G — Bekannte Fallstricke (10 Punkte)
- [ ] Kein hardcodierter Sidenav-HTML-Block in der Seite
- [ ] Keine Font Awesome oder MDI Icons (`fa-*`, `mdi-*`)
- [ ] Kein CTA-Button in der Sidenav-Region
- [ ] `<body>` hat `class="h-full overflow-hidden flex"`
- [ ] `<main>` hat `class="flex-1 overflow-y-auto p-8"`
- [ ] Modals: `.modal.show` + `style="display:block"` — beides notwendig

### Ausgabe-Format

```
## Deep Review: [Dateiname]
**Compliance Score: XX/100**

| Kategorie | Punkte | Max |
|---|---|---|
| A – Infrastruktur | X | 15 |
| B – Seitenstruktur | X | 15 |
| C – Nimbus-Komponenten | X | 30 |
| D – Typografie | X | 10 |
| E – Icons | X | 10 |
| F – Farben & Tailwind | X | 10 |
| G – Fallstricke | X | 10 |

### Gefundene Verstöße
| # | Zeile | Kat. | Problem | Fix |
|---|---|---|---|---|
| 1 | 47 | C | `font-bold` statt `fw-bold` | `class="fw-bold"` |
| 2 | 89 | C | Kein `w-full` auf `table-responsive` | `<div class="table-responsive w-full">` |

### ✅ Korrekte Bereiche
[Liste was einwandfrei war]

### Empfohlene Korrekturen
[Konkrete Before/After Snippets für jeden Verstoß]

---
Soll ich die Korrekturen direkt anwenden? (Datei wird überschrieben)
```

### Wichtig beim Review
- **Vollständigkeit vor Schnelligkeit:** Lieber 5 Minuten länger lesen als einen Verstoß übersehen
- **Kontext beachten:** Tailwind-Layout-Utilities (`flex`, `p-4`) sind kein Verstoß — nur Tailwind auf visuellen Elementen
- **Bei Unsicherheit:** Nimbus Docs via WebFetch holen (`https://wswilliams67.github.io/nimbus/cnds-[name].html`) bevor ein Urteil gefällt wird
- **Score-Abzug:** Pro Verstoß anteilig Punkte abziehen — mehrere Verstöße in einer Kategorie können die Kategorie auf 0 bringen

### Bekannte Abweichungen unserer Prototyp-Seiten (bewusste Entscheidungen)
Diese Punkte sind **kein Fehler**, werden im Review aber als Hinweis notiert:
- **Alerts:** Wir nutzen `.alert-info` etc. (class-basiert). Nimbus-Docs empfehlen `data-cnds-color="info"` + `data-cnds-alert-init`. Beide funktionieren — beim Designerübergabe auf Attribut-Syntax migrieren.
- **Pagination:** Wir nutzen Bootstrap `.pagination.pagination-sm`. Nimbus-nativ wäre `.pagination-toolbar` mit First/Prev/Next/Last Buttons. Unser Pattern funktioniert durch Bootstrap-Kompatibilitätsschicht.
- **Tabs:** Wir nutzen `.nav.nav-tabs`. Nimbus-nativ wäre `.nav.nav-tabs.nav-tabs-nimbus` + `data-cnds-tab-init` + ARIA-Attribute. Ohne `.nav-tabs-nimbus` fehlt das Produkt-Styling.
- **`custom-shadow-l1`:** Nicht in Nimbus-Docs — funktioniert nur weil Nimbus diese Klasse intern definiert. Offiziell wären `.shadow-1` / `.shadow-2` die richtigen Klassen.
- **`fw-bold`/`fw-semibold`:** Bootstrap-Utils, die durch Nimbus mitgeliefert werden. Nimbus-native wären `.bold`/`.light` als Heading-Modifier. Beide korrekt.

---

## Modus 3: `/nimbus new [Beschreibung]`

Erstellt eine neue Plain-HTML-Seite komplett mit Nimbus-Klassen.

### Vorgehensweise

1. **Kontext verstehen:** Was soll die Seite zeigen? Welche Daten, Aktionen, Navigation?
2. **Ähnliche `code.html` lesen:** `ls` im Projektverzeichnis – gibt es vergleichbare Strukturen?
3. **HTML-Datei erstellen** nach diesen Regeln:
   - **Nimbus für alle visuellen Elemente:** Buttons, Cards, Badges, Alerts, Forms, Tabellen, Sidenav
   - **Tailwind nur für Layout:** `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`
   - **Icons:** Material Symbols Outlined (`<span class="material-symbols-outlined">icon_name</span>`)
   - **Kein React, kein TypeScript, kein JavaScript** außer für einfache Interaktionen (Dropdown, Modal-Toggle)
   - **Keine separaten CSS-Dateien** – alles inline in `<style>` oder Nimbus/Tailwind-Klassen
4. **Datei ablegen:** `[feature_name]/[feature_name].html` — neuen Ordner anlegen falls nötig. Die Datei heißt wie der Ordner, nicht `code.html`.

---

## Standard-Patterns für Plain HTML

### Breadcrumbs — Schnellste Einbindung einer neuen Seite

Der Breadcrumb kommt bereits fertig aus dem Stitch-Import (`code.html`). Beim `/nimbus apply` müssen nur die `href="#"` Platzhalter in den Breadcrumb-Links durch die echten relativen Pfade ersetzt werden — das verbindet die neue Seite sofort mit dem Prototyp.

**Breadcrumb Link-Referenz** (relative Pfade von jedem Feature-Ordner):

| Segment | Relativer Pfad |
|---|---|
| Home | `#` |
| OnPrem | `../endpoint_management_overview_focus/endpoint_management_overview_focus.html` |
| Endpoints | `../endpoint_management_overview_focus/endpoint_management_overview_focus.html` |
| Appliances | `../appliance_management_unified_table_style/appliance_management_unified_table_style.html` |
| Modules | `../modules_management_card_view_layout/modules_management_card_view_layout.html` |
| Nodes | `#` (noch keine Seite) |
| Environments | `../domains_management_list_view_sidebar_sync/domains_management_list_view_sidebar_sync.html` |
| Domains (Card View) | `../domains_management_card_view_final_sync/domains_management_card_view_final_sync.html` |
| Mappings | `../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html` |
| Journal Mappings | `../journal_mappings_content_sync/journal_mappings_content_sync.html` |
| Custodians (Card View) | `../custodians_management_hybrid_view_cards_in_list_layout/custodians_management_hybrid_view_cards_in_list_layout.html` |
| Custodians (List View) | `../custodians_management_list_view_layout/custodians_management_list_view_layout.html` |
| Archive Mappings → Enterprise Vault → Mail Archive Mappings | `../archive_mappings_page_title_sync/archive_mappings_page_title_sync.html` |
| Enterprise Vault → EV Directories | `../ev_directories_footer_sync_1_1/ev_directories_footer_sync_1_1.html` |
| Enterprise Vault → EV Vault Stores | `../ev_vault_stores_overview/ev_vault_stores_overview.html` |
| Assets | `#` (noch keine Seite) |
| Security | `#` (noch keine Seite) |
| Settings | `#` (noch keine Seite) |

Tabelle aktualisieren sobald eine neue Seite migriert wird.

---

### Seitenstruktur (Sidebar-Layout)

Sidenav **und** TopNav werden immer aus `_shared/` geladen — niemals inline in die Seite schreiben.

```html
<body class="h-full overflow-hidden flex">

  <!-- Shared Sidenav: ACTIVE_NAV vor dem Script-Tag setzen -->
  <script>const ACTIVE_NAV = 'appliances';</script>
  <script src="../_shared/sidenav.js"></script>

  <!-- Hauptinhalt -->
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

    <!-- Shared TopNav: TOPNAV_SEARCH vor dem Script-Tag setzen -->
    <script>const TOPNAV_SEARCH = 'Search appliances...';</script>
    <script src="../_shared/topnav.js"></script>

    <main class="flex-1 overflow-y-auto p-8">...</main>
  </div>

</body>
```

**TOPNAV_SEARCH** – Suchfeld-Placeholder, z.B. `'Search appliances...'` (Standard: `'Search...'`)  
**TOPNAV_ACTIVE** – Aktiver Nav-Link: `'docs'` | `'logs'` | `'alerts'` (Standard: `'alerts'`)

**ACTIVE_NAV Schlüssel** (entspricht den Nav-Einträgen in `_shared/sidenav.js`):

| Schlüssel | Bereich |
|---|---|
| `'dashboard'` | Dashboard |
| `'endpoints'` | OnPrem → Endpoints |
| `'appliances'` | OnPrem → Appliances |
| `'nodes'` | OnPrem → Nodes |
| `'modules'` | OnPrem → Modules |
| `'environments'` | Environments |
| `'mappings'` | Mappings |
| `'assets'` | Assets |
| `'security'` | Security |
| `'settings'` | Settings |

OnPrem expandiert automatisch wenn ein Sub-Item aktiv ist.

**Neue Nav-Links** in `_shared/sidenav.js` eintragen wenn eine neue Seite angelegt wird:
- `subLink('../[ordner]/[ordner].html', '[key]', 'Label')` für OnPrem Sub-Items
- `link('../[ordner]/[ordner].html', '[key]', 'icon_name', 'Label')` für Top-Level Items

### Card
```html
<div class="card">
  <div class="card-header flex items-center justify-between">
    <h5 class="card-title mb-0">Titel</h5>
    <button class="btn btn-primary btn-sm">Aktion</button>
  </div>
  <div class="card-body">
    <!-- Inhalt -->
  </div>
</div>
```

### Tabelle (standalone)
```html
<div class="table-responsive w-full">
  <table class="table table-hover w-full">
    <thead>
      <tr>
        <th style="width:48px"><input class="form-check-input" type="checkbox"/></th>
        <th>Name</th>
        <th>Status</th>
        <th class="text-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input class="form-check-input" type="checkbox"/></td>
        <td><span class="fw-semibold">Item Name</span></td>
        <td><span class="badge badge-success">Active</span></td>
        <td class="text-end">
          <button class="btn btn-link btn-sm p-1">
            <span class="material-symbols-outlined text-on-surface-variant">more_vert</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Tabelle in Card (mit Pagination)
```html
<div class="card custom-shadow-l1">
  <div class="table-responsive w-full">
    <!-- mb-0 PFLICHT: verhindert Lücke zwischen table und card-footer -->
    <!-- w-full PFLICHT: verhindert schmale Tabelle wenn Spalten wenig Inhalt haben -->
    <table class="table table-hover mb-0 w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw-semibold">Item</td>
          <td><span class="badge badge-primary">Online</span></td>
          <td class="text-end text-muted">—</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card-footer flex justify-between items-center">
    <div class="flex gap-2">
      <button class="btn btn-secondary btn-sm flex items-center gap-1">
        <span class="material-symbols-outlined" style="font-size:18px">chevron_left</span>
        Previous
      </button>
      <button class="btn btn-secondary btn-sm flex items-center gap-1">
        Next
        <span class="material-symbols-outlined" style="font-size:18px">chevron_right</span>
      </button>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-muted small">Page 1 of 5</span>
      <select class="cf-input-control" style="width:auto">
        <option>10 per page</option>
        <option>25 per page</option>
      </select>
    </div>
  </div>
</div>
```

### Formular-Feld
```html
<div class="cf-input-field">
  <label class="cf-input-label">Feldname <span class="cf-input-required">*</span></label>
  <div class="cf-input-wrapper">
    <input type="text" class="cf-input-control" placeholder="Eingabe...">
  </div>
  <div class="cf-input-helper">
    <span class="cf-input-error">Fehlermeldung</span>
  </div>
</div>
```

### Alert / Feedback-Banner
```html
<div class="alert alert-success flex items-center gap-2">
  <span class="material-symbols-outlined">check_circle</span>
  Erfolgreich gespeichert.
</div>
<div class="alert alert-danger flex items-center gap-2">
  <span class="material-symbols-outlined">error</span>
  Ein Fehler ist aufgetreten.
</div>
```

### Card mit edge-to-edge Inhalt (z.B. Map, Bild, Chart)
```html
<div class="card custom-shadow-l1">
  <div class="card-header flex items-center justify-between">
    <h3 class="card-title mb-0">Titel</h3>
    <!-- mb-0 PFLICHT auf card-title um doppelten Abstand zu verhindern -->
  </div>
  <div class="card-body p-0">
    <!-- p-0 damit Inhalt bis zum Rand der Card geht -->
    <div class="relative h-96">
      <img class="w-full h-full object-cover" src="..." alt="..."/>
    </div>
  </div>
</div>
```

### Icon-only Button (Notification, Help, Kebab-Menu)
```html
<!-- Nicht btn-secondary — immer btn-link für Icon-only Actions -->
<button class="btn btn-link p-1">
  <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<button class="btn btn-link btn-sm p-1">
  <span class="material-symbols-outlined text-on-surface-variant">more_vert</span>
</button>
```

### Sub-Navigation (verschachtelte Sidebar-Nav)
```html
<!-- Nimbus hat kein eigenes Pattern für verschachtelte Nav -->
<!-- Aktive Gruppe: sidenav-link active -->
<!-- Einrückung per Tailwind pl-* -->
<a href="#" class="sidenav-link active gap-3 justify-between">
  <span class="flex items-center gap-3">
    <span class="material-symbols-outlined">storage</span>
    OnPrem
  </span>
  <span class="material-symbols-outlined" style="font-size:20px">expand_more</span>
</a>
<div class="pl-10 mt-1 mb-1">
  <a href="#" class="sidenav-link gap-3">Endpoints</a>
  <a href="#" class="sidenav-link active gap-3 fw-semibold">Appliances</a>
  <a href="#" class="sidenav-link gap-3">Modules</a>
</div>
```

### Search Input mit Icon-Overlay
```html
<!-- cf-input-field NICHT verwenden wenn kein Label nötig -->
<!-- Relative Wrapper + padding-left für Icon -->
<div class="relative">
  <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <span class="material-symbols-outlined text-on-surface-variant" style="font-size:18px">search</span>
  </span>
  <input class="cf-input-control" style="padding-left:2.25rem" placeholder="Suche" type="text"/>
</div>
```

### Tab-Navigation (Seiten-Level Tabs)
```html
<!-- .nav.nav-tabs für Haupt-Tabs auf Seiten-Ebene (z.B. Archive Jobs / Mappings / Settings) -->
<ul class="nav nav-tabs mb-4">
  <li class="nav-item">
    <a href="#" class="nav-link active">Active Tab</a>
  </li>
  <li class="nav-item">
    <a href="#" class="nav-link">Second Tab</a>
  </li>
  <li class="nav-item">
    <a href="#" class="nav-link">Third Tab</a>
  </li>
</ul>
```

### Nummerierte Pagination (Bootstrap)
```html
<!-- Für Seiten mit vielen Datensätzen wo Seitensprung wichtig ist -->
<!-- .pagination-sm für kompakte Darstellung in Card-Footer -->
<nav>
  <ul class="pagination pagination-sm mb-0">
    <li class="page-item disabled">
      <a class="page-link" href="#">
        <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">chevron_left</span>
      </a>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">
        <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">chevron_right</span>
      </a>
    </li>
  </ul>
</nav>
```

### Progress Bar
```html
<!-- .progress als Wrapper, .progress-bar mit inline width -->
<!-- Für Upload/Sync/Processing-Fortschritt in Tabellenzellen oder Cards -->
<div class="progress mb-0" style="height:8px">
  <div class="progress-bar bg-success" style="width:75%"></div>
</div>
<!-- Mit Label darunter -->
<div class="progress mb-1" style="height:8px">
  <div class="progress-bar" style="width:45%"></div>
</div>
<div class="small text-muted">45% complete</div>
```

### KPI / Stat Card
```html
<!-- Kennzahlen-Card für Dashboards und Übersichtsseiten -->
<div class="card custom-shadow-l1 h-100">
  <div class="card-body d-flex flex-column justify-content-between">
    <div class="small text-muted text-uppercase fw-semibold mb-2">TOTAL ITEMS</div>
    <div class="fw-bold" style="font-size:2rem">1,234</div>
    <div class="small text-muted mt-1">
      <span class="badge badge-success">+12%</span> vs last month
    </div>
  </div>
</div>
```

### Button-Gruppe
```html
<div class="flex items-center justify-end gap-2 mt-4">
  <button class="btn btn-secondary">Abbrechen</button>
  <button class="btn btn-primary">Speichern</button>
</div>
```

### Modal
```html
<!-- Trigger -->
<button class="btn btn-primary" onclick="document.getElementById('myModal').classList.add('show'); document.getElementById('myModal').style.display='block'">
  Öffnen
</button>
<!-- Modal -->
<div class="modal" id="myModal" style="display:none">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Titel</h5>
        <button class="btn-close" onclick="document.getElementById('myModal').classList.remove('show'); document.getElementById('myModal').style.display='none'"></button>
      </div>
      <div class="modal-body">Inhalt</div>
      <div class="modal-footer">
        <button class="btn btn-secondary">Abbrechen</button>
        <button class="btn btn-primary">Bestätigen</button>
      </div>
    </div>
  </div>
</div>
```

---

## Checkliste vor Abgabe

- [ ] Nimbus-CDN-Links vorhanden (`primitives.css`, `light.css`, `nimbus.css`)
- [ ] Sidenav via `_shared/sidenav.js` geladen — **keine inline Sidenav**
- [ ] `ACTIVE_NAV` korrekt gesetzt (vor dem `<script src="../_shared/sidenav.js">`)
- [ ] Breadcrumb-Links funktionieren (Eltern-Segmente verlinkt nach Referenztabelle)
- [ ] Neuer Nav-Eintrag in `_shared/sidenav.js` eingetragen (falls neue Seite)
- [ ] Kein rohes Tailwind für Buttons, Badges, Cards, Inputs, Tabellen (außer Layout)
- [ ] Keine Font Awesome Klassen (`fa-*`, `fas`, `far`, `mdi-*`)
- [ ] Icons: ausschließlich Material Symbols Outlined
- [ ] Seite im Browser visuell plausibel (kein broken Layout)

---

## Bekannte Fallstricke (Plain HTML)

- **Sidenav Header = Expireon Logo, NIEMALS Text:** Der Sidenav-Header enthält ausschließlich `<img src="../_shared/cloudficient_cloudficient-expireon_1760436020615.png" alt="Expireon" style="max-height:36px;width:auto">`. Niemals Produktnamen wie "AdminConsole", "Endpoint Management" oder ähnlichen Text schreiben — das ist eine häufige Stitch-Halluzination.
- **Kein CTA-Button in der Sidenav:** Der untere Bereich der Sidenav enthält nur Support- und Account-Links. Niemals einen "Add New …"-Button oder ähnlichen primären CTA einfügen — das ist ebenfalls eine häufige Stitch-Halluzination. Die `_shared/sidenav.js` ist die einzige Quelle der Wahrheit.
- **`.sidenav-link` + Material Icons:** Nimbus definiert Icon-Spacing nur für `.fa`/`.mdi`. Immer `gap-3` als Tailwind-Utility ergänzen: `class="sidenav-link gap-3"`
- **Sidenav `position:fixed` Override:** Nimbus `.sidenav` ist standardmäßig `position:fixed` und per `transform:translateX(-100%)` versteckt — für ein statisches Sidebar-Layout unbrauchbar. `_shared/sidenav.js` überschreibt das inline: `style="position:relative;height:100vh;transform:none;box-shadow:none;border-right:1px solid var(--cnds-outline-variant)"` + Klasse `show`. Dieses Override ist bereits in `sidenav.js` enthalten — **nicht entfernen**.
- **Sidenav-Breite:** Nimbus setzt keine feste Breite auf `.sidenav`. Explizit setzen: `style="width:260px"` und `flex-shrink-0` damit sie im Flex-Layout nicht kollabiert.
- **`table-responsive` in `card` → immer `w-full`:** Nimbus's `.card` ist ein Flex-Column-Container. `.table-responsive` als Flex-Kind kollabiert ohne explizite Breite auf Content-Breite — dadurch verschiebt sich die Tabelle nach rechts/mittig statt die volle Card-Breite zu füllen. Immer: `<div class="table-responsive w-full">`. Das gilt auch für Tabellen mit vielen Spalten — dort fällt es weniger auf, ist aber strukturell falsch.
- **`table` in `card` → immer `mb-0 w-full`:** Ohne `mb-0` entsteht eine Lücke zwischen Tabelle und `card-footer`. `w-full` stellt zusätzlich sicher dass die Tabelle die volle Breite des `table-responsive`-Containers füllt. Immer: `class="table table-hover mb-0 w-full"`
- **`card-title` in `card-header` → immer `mb-0`:** Verhindert doppelten Abstand. Immer: `class="card-title mb-0"`
- **`card-body p-0`** für edge-to-edge Inhalte (Maps, Bilder, Charts) — ohne `p-0` hat der Inhalt unerwünschte Innenabstände
- **Icon-only Buttons** → immer `btn btn-link`, niemals `btn btn-secondary` — sonst entsteht ein sichtbarer Hintergrund/Rahmen um Icons wie Bell, Help, Kebab
- **Button auf farbigem Banner-Hintergrund:** Keine Nimbus-`btn`-Klassen verwenden — diese setzen Farben mit zu hoher Spezifizität. Stattdessen reines Inline-Styling: `style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.4);color:#fff;border-radius:6px;padding:6px 16px;font-size:0.875rem;font-weight:600;cursor:pointer;white-space:nowrap"`. Gilt für alle Buttons auf `bg-primary-container`, `alert alert-info` und ähnlichen farbigen Hintergründen.
- **SVG-Icons** immer durch Material Symbols Outlined ersetzen, auch wenn sie komplex sind
- **Bootstrap-Utilities verfügbar in Nimbus:** `text-muted`, `fw-semibold`, `fw-bold`, `small`, `mb-0`, `text-end`, `text-start` — diese direkt verwenden statt Tailwind-Äquivalente (`text-gray-500`, `font-semibold`, `text-right`) innerhalb von Nimbus-Komponenten
- **Tailwind-Config beibehalten** wenn die Seite MD3-Custom-Tokens auf strukturellen Nicht-Nimbus-Elementen nutzt (z.B. `bg-primary-fixed` für Icon-Container, `border-outline-variant` für Trennlinien, `text-on-surface-variant` für Breadcrumbs)
- **Modal sichtbar machen:** `.modal.show` + `style="display:block"` — beides nötig, kein JS-Framework
- **`.table-responsive`** als Wrapper für horizontales Scrollen auf kleinen Viewports
- **`.cf-input-field.is-invalid`** zeigt `.cf-input-error` an
- **`btn-close`** ist ein Nimbus-Button ohne Text — nur für Schließen-X in Modals/Alerts
- **Pagination-Stil wählen:** Einfache Prev/Next Pagination (`card-footer` + `btn btn-secondary`) für Tabellen mit wenig Seiten. Nummerierte Pagination (`.pagination.pagination-sm`) wenn Seitensprung wichtig ist (viele Datensätze, Archiv-Seiten). Auswahl nach Stitch-Mockup treffen.
- **`.pagination` + Icon-Chevrons:** Icon-Größe und Ausrichtung immer explizit setzen: `style="font-size:16px;vertical-align:middle"` — sonst sind die Chevrons zu groß oder falsch ausgerichtet.
- **`.nav.nav-tabs` vs `.nav.nav-pills`:** `nav-tabs` für Haupt-Navigation auf Seitenebene (wirkt wie Browser-Tabs). `nav-pills` für Filter-Switcher innerhalb einer Sektion. Auswahl nach Stitch-Mockup treffen.
- **Tailwind CDN vor Nimbus laden** damit Nimbus-Klassen Vorrang haben
