---
description: Stitch MCP – UI-Design Assistent. Projekte verwalten, Screens anzeigen und generieren.
---

# Stitch – UI-Design Assistent

Du hilfst dem User beim Arbeiten mit Stitch (Google UI-Prototyping Tool) via MCP.

## Argument: $ARGUMENTS

Analysiere `$ARGUMENTS` und führe die passende Aktion aus:

---

## Aktionen

### Kein Argument oder "list"
Zeige alle Stitch-Projekte sortiert nach letzter Änderung (neueste zuerst).
- Nutze `mcp__stitch__list_projects`
- Ausgabe als übersichtliche Tabelle: Titel | Typ (DESKTOP/MOBILE) | Screens | Zuletzt geändert
- Hebe das zuletzt geänderte Projekt hervor

### "open <Projektname oder Teil des Namens>"
1. Liste alle Projekte und finde das passende (case-insensitive, Teilstring-Match)
2. Zeige Projektdetails via `mcp__stitch__get_project`
3. Liste alle Screens via `mcp__stitch__list_screens`
4. Gib für jeden Screen: Name, Breite x Höhe, zuletzt geändert aus
5. Frage ob der User einen Screen im Detail sehen oder bearbeiten möchte

### "screen <Projektname> <Screenname oder Teil>"
1. Finde Projekt und Screen wie oben
2. Lade Screen-Details via `mcp__stitch__get_screen`
3. Beschreibe was auf dem Screen zu sehen ist (Komponenten, Layout, Farben)
4. Frage ob der User den Screen bearbeiten möchte

### "generate <Beschreibung>"
Generiere einen neuen Screen in einem bestehenden Projekt:
1. Frage den User: In welchem Projekt soll der Screen erstellt werden? (Liste Projekte)
2. Nutze `mcp__stitch__generate_screen_from_text` mit der Beschreibung
3. Zeige das Ergebnis

### "new <Projektname>"
Erstelle ein neues Stitch-Projekt:
1. Frage nach: Desktop oder Mobile?
2. Frage nach: Kurzbeschreibung / Zweck des Projekts
3. Nutze `mcp__stitch__create_project`
4. Bestätige Erstellung mit Projekt-ID

### "edit <Projektname> <Screenname>"
Öffne einen Screen zum Bearbeiten:
1. Finde Projekt und Screen
2. Frage was geändert werden soll (natürlichsprachliche Beschreibung)
3. Nutze `mcp__stitch__edit_screens` mit der Änderungsbeschreibung

### "variants <Projektname> <Screenname>"
Erstelle Varianten eines Screens:
1. Finde Projekt und Screen
2. Frage nach der Art der Varianten (z.B. "Dark Mode", "Mobile Version", "Alternative Farben")
3. Nutze `mcp__stitch__generate_variants`

---

## Allgemeine Regeln

- Antworte immer auf Deutsch
- Bei unklaren Projektnamen: zeige Treffer und frage nach
- Projekt-IDs sind lang (z.B. `projects/12345678`), zeige sie nur wenn relevant
- Screenshots/Thumbnails: zeige Download-URL nur wenn der User danach fragt
- Bei Fehlern: erkläre klar was schiefgelaufen ist und schlage Alternative vor
- Nach jeder Aktion: biete sinnvollen nächsten Schritt an

## Kontext: BackendUI / NextGenUI

Stitch-Screens in diesem Projekt sind Wireframes für die Expireon AdminConsole (NextGenUI).  
Exportierte `screen.png` Dateien landen in den jeweiligen Feature-Ordnern und werden mit `/nimbus apply` in HTML umgesetzt.

## Beispiele

- `/stitch` → Alle Projekte auflisten
- `/stitch open Expireon` → Expireon-Projekt + Screens anzeigen
- `/stitch generate Domains Management Listenansicht mit Sidebar für AdminConsole` → Screen generieren
- `/stitch edit Expireon DomainsManagement` → Screen bearbeiten
