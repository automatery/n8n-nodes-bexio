# n8n-nodes-bexio

Eine n8n Community Node zur Integration mit der Bexio API.

## Features

Diese Node unterstützt folgende Bexio-Ressourcen:

- **Kontakte** (Contacts)
- **Angebote** (Quotes)
- **Produkte** (Products)
- **Aufträge** (Orders)
- **Rechnungen** (Invoices)
- **Projekte** (Projects)
- **Zeiterfassung** (Time Tracking)

Für jede Ressource sind folgende Operationen verfügbar:
- Create (Erstellen)
- Get (Einzeln abrufen)
- Get All (Alle abrufen)
- Update (Aktualisieren)
- Delete (Löschen)

## Installation

### Community Nodes (Empfohlen)

1. Gehen Sie zu **Settings > Community Nodes** in Ihrem n8n-Interface
2. Klicken Sie auf **Install**
3. Geben Sie `n8n-nodes-bexio` ein
4. Klicken Sie auf **Install**

### Manuelle Installation

1. Navigieren Sie zu Ihrem n8n-Installationsverzeichnis
2. Führen Sie aus: `npm install n8n-nodes-bexio`
3. Starten Sie n8n neu

## Konfiguration

### API-Zugangsdaten einrichten

1. Gehen Sie zu **Credentials** in n8n
2. Klicken Sie auf **Create New**
3. Wählen Sie **Bexio API**
4. Geben Sie Ihren Bexio API-Token ein

### API-Token erhalten

1. Loggen Sie sich in Ihr Bexio-Konto ein
2. Gehen Sie zu **Einstellungen > API**
3. Erstellen Sie einen neuen API-Token
4. Kopieren Sie den Token und fügen Sie ihn in n8n ein

## Verwendung

### Kontakte verwalten

```
Resource: Kontakt
Operation: Create
Fields:
- Name 1: "Max Mustermann"
- Email: "max@example.com"
- Phone Mobile: "+41 79 123 45 67"
```

### Angebote erstellen

```
Resource: Angebot
Operation: Create
Fields:
- Contact ID: 123
- Title: "Angebot für Webseite"
- User ID: 1
```

### Zeiterfassung

```
Resource: Zeiterfassung
Operation: Create
Fields:
- User ID: 1
- Date: "2024-01-15"
- Duration: 480 (in Minuten)
- Comment: "Projektarbeit"
- Project ID: 456
```

## Unterstützte Operationen

### Kontakte (Contacts)
- `GET /2.0/contact/{id}` - Kontakt abrufen
- `GET /2.0/contact` - Alle Kontakte abrufen
- `POST /2.0/contact` - Kontakt erstellen
- `POST /2.0/contact/{id}` - Kontakt aktualisieren
- `DELETE /2.0/contact/{id}` - Kontakt löschen

### Angebote (Quotes)
- `GET /2.0/kb_offer/{id}` - Angebot abrufen
- `GET /2.0/kb_offer` - Alle Angebote abrufen
- `POST /2.0/kb_offer` - Angebot erstellen
- `POST /2.0/kb_offer/{id}` - Angebot aktualisieren
- `DELETE /2.0/kb_offer/{id}` - Angebot löschen

### Produkte (Products)
- `GET /2.0/article/{id}` - Produkt abrufen
- `GET /2.0/article` - Alle Produkte abrufen
- `POST /2.0/article` - Produkt erstellen
- `POST /2.0/article/{id}` - Produkt aktualisieren
- `DELETE /2.0/article/{id}` - Produkt löschen

### Aufträge (Orders)
- `GET /2.0/kb_order/{id}` - Auftrag abrufen
- `GET /2.0/kb_order` - Alle Aufträge abrufen
- `POST /2.0/kb_order` - Auftrag erstellen
- `POST /2.0/kb_order/{id}` - Auftrag aktualisieren
- `DELETE /2.0/kb_order/{id}` - Auftrag löschen

### Rechnungen (Invoices)
- `GET /2.0/kb_invoice/{id}` - Rechnung abrufen
- `GET /2.0/kb_invoice` - Alle Rechnungen abrufen
- `POST /2.0/kb_invoice` - Rechnung erstellen
- `POST /2.0/kb_invoice/{id}` - Rechnung aktualisieren
- `DELETE /2.0/kb_invoice/{id}` - Rechnung löschen

### Projekte (Projects)
- `GET /2.0/pr_project/{id}` - Projekt abrufen
- `GET /2.0/pr_project` - Alle Projekte abrufen
- `POST /2.0/pr_project` - Projekt erstellen
- `POST /2.0/pr_project/{id}` - Projekt aktualisieren
- `DELETE /2.0/pr_project/{id}` - Projekt löschen

### Zeiterfassung (Time Tracking)
- `GET /2.0/timesheet/{id}` - Zeiteintrag abrufen
- `GET /2.0/timesheet` - Alle Zeiteinträge abrufen
- `POST /2.0/timesheet` - Zeiteintrag erstellen
- `POST /2.0/timesheet/{id}` - Zeiteintrag aktualisieren
- `DELETE /2.0/timesheet/{id}` - Zeiteintrag löschen

## Entwicklung

### Prerequisites

- Node.js 14.x oder höher
- npm oder yarn
- n8n

### Setup

1. Repository klonen:
```bash
git clone <repository-url>
cd n8n-nodes-bexio
```

2. Dependencies installieren:
```bash
npm install
```

3. Build:
```bash
npm run build
```

4. Für Entwicklung (Watch-Modus):
```bash
npm run dev
```

### Verzeichnisstruktur

```
n8n-nodes-bexio/
├── credentials/
│   └── BexioApi.credentials.ts
├── nodes/
│   └── Bexio/
│       ├── Bexio.node.ts
│       ├── GenericFunctions.ts
│       └── bexio.svg
├── dist/
├── package.json
├── tsconfig.json
├── gulpfile.js
└── README.md
```

## Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffnen Sie eine Pull Request

## Lizenz

MIT License - siehe LICENSE-Datei für Details.

## Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die [Bexio API-Dokumentation](https://docs.bexio.com/)
2. Erstellen Sie ein Issue in diesem Repository
3. Kontaktieren Sie den Entwickler

## Changelog

### 1.0.0
- Initial Release
- Support für alle Haupt-Bexio-Ressourcen
- CRUD-Operationen für alle Ressourcen
- Vollständige TypeScript-Implementierung