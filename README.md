# Flut.digital

Website der Digitalagentur **Flut.digital** aus Schwedeneck bei Kiel. Webdesign, KI-Integrationen und 3D/AR-Erlebnisse.

Die Seite enthält Leistungen, Referenzen (Case Studies), Blog, Kontaktformular, einen KI-Chat über die Groq-API und einen passwortgeschützten Admin-Bereich für Blog, Referenzen und Kontaktanfragen.

## Tech-Stack

| Bereich | Technologie |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui (Radix UI), `@tailwindcss/typography` |
| Animation & 3D | Framer Motion, Three.js (Hero-Welle, Punktwolke im Hintergrund) |
| Daten & Login | Firebase: Cloud Firestore und Authentication |
| KI-Chat | [Groq](https://groq.com) API (Standardmodell `openai/gpt-oss-120b`) |
| Schrift | Inter (selbst gehostet über `@fontsource-variable/inter`) |

## Schnellstart

Voraussetzung: **Node.js 20 oder neuer** (siehe `.nvmrc`) und npm.

```bash
git clone https://github.com/L4223/Flut.digital.git
cd Flut.digital
npm ci
cp .env.example .env.local   # danach die Keys eintragen, siehe unten
npm run dev
```

Die Seite läuft dann unter **http://localhost:9002**.

> Ohne Keys startet die Seite trotzdem. Leistungen, die fest im Code hinterlegten Referenzen, Tech-Stack und Rechtsseiten funktionieren. Blog, Kontaktformular, Admin-Bereich und KI-Chat brauchen die Keys.

## API-Keys bereitstellen

Alle Keys stehen in der Datei **`.env.local`** im Projektordner. Diese Datei ist in `.gitignore` eingetragen und wird **nie committet**. Als Vorlage dient `.env.example`:

```bash
cp .env.example .env.local
```

Nach jeder Änderung an `.env.local` muss der Dev-Server neu gestartet werden.

### 1. Firebase (Firestore und Login)

1. In der [Firebase Console](https://console.firebase.google.com) das Projekt öffnen.
2. **Projekteinstellungen** (Zahnrad) → **Allgemein** → **Deine Apps**. Gibt es noch keine Web-App, über das `</>`-Symbol eine anlegen.
3. Unter **SDK-Einrichtung und -Konfiguration** → **Konfiguration** stehen die Werte. Sie werden so übertragen:

| `firebaseConfig` | `.env.local` |
| --- | --- |
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |
| `measurementId` | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional) |

Die Firebase-Werte tragen das Präfix `NEXT_PUBLIC_` und landen damit im Browser-Code. Das ist bei Firebase so vorgesehen und kein Geheimnis. Geschützt werden die Daten durch die **Firestore-Regeln** in `firestore.rules`: Lesen ist öffentlich, Schreiben nur für angemeldete Admins, und Kontaktanfragen kann jeder anlegen, aber nur Admins lesen.

### 2. Groq (KI-Chat)

1. In der [Groq Console](https://console.groq.com/keys) anmelden und unter **API Keys** einen kostenlosen Key erstellen.
2. In `.env.local` eintragen:

   ```env
   GROQ_API_KEY=gsk_dein-key
   ```

3. Optional ein anderes Modell wählen, z. B. das schnellere `openai/gpt-oss-20b`:

   ```env
   GROQ_MODEL=openai/gpt-oss-20b
   ```

   Ohne Angabe wird `openai/gpt-oss-120b` verwendet. Welche Modelle dein Account nutzen kann, siehst du im Playground der Groq Console. Geeignet für den Chat sind die Text-Modelle `openai/gpt-oss-120b`, `openai/gpt-oss-20b` und `qwen/qwen3.8-27b`, nicht dagegen Whisper (Sprache), Orpheus (Text-to-Speech) oder die Guard-/Safeguard-Modelle (Moderation).

Dieser Key ist **geheim**. Er wird nur auf dem Server genutzt, in `src/ai/groq.ts` über Server Actions, deshalb hat er **kein** `NEXT_PUBLIC_`-Präfix und taucht nie im Browser auf.

Der Free-Tier von Groq hat Anfragelimits pro Minute und pro Tag. Ist ein Limit erreicht, zeigt der Chat einen freundlichen Hinweis statt einer Antwort. Die Begrüßung im Chat ist fest hinterlegt und verbraucht kein Kontingent.

### 3. Admin-Zugang

Der Admin-Bereich unter `/admin` (Anmeldung über `/login`) nutzt Firebase Authentication mit E-Mail und Passwort. Ein Admin-Konto legst du in der Firebase Console an: **Authentication** → **Sign-in method** → „E-Mail/Passwort“ aktivieren, dann unter **Users** → **Nutzer hinzufügen**.

### Keys im Hosting hinterlegen

`.env.local` gilt nur lokal. Auf dem Server werden dieselben Variablen in der Hosting-Oberfläche gesetzt:

- **Railway** (`railway.json`): Projekt → Service → **Variables** → alle Variablen aus `.env.example` anlegen und neu deployen.
- **Firebase App Hosting** (`apphosting.yaml`): Die `NEXT_PUBLIC_…`-Werte als `env` in `apphosting.yaml` eintragen. `GROQ_API_KEY` als Secret anlegen, mit `firebase apphosting:secrets:set GROQ_API_KEY`, und in `apphosting.yaml` mit `secret: GROQ_API_KEY` referenzieren.

Die `NEXT_PUBLIC_…`-Werte werden beim **Build** eingebettet. Nach einer Änderung muss deshalb neu gebaut werden, ein bloßer Neustart reicht nicht.

## Skripte

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit Turbopack auf Port 9002 |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktions-Build starten (Port 3000) |
| `npm run typecheck` | TypeScript prüfen |
| `npm run lint` | ESLint |

## Projektstruktur

```text
src/
├── app/                  Seiten (App Router)
│   ├── admin/            Admin-Bereich: Blog, Referenzen, Kontaktanfragen
│   ├── blog/ kontakt/ leistungen/ referenzen/ tech/ ueber/ recht/
│   ├── layout.tsx        Root-Layout mit Metadaten
│   └── page.tsx          Startseite
├── ai/                   Groq-Client (groq.ts) und Server Actions für den Chat
├── components/
│   ├── home/             Startseiten-Sektionen, Hero-Welle, Punktwolke
│   ├── references/       Geräte-Mockup für Screenshots
│   ├── layout/           Header, Footer, SiteShell
│   └── ui/               shadcn/ui-Komponenten
├── config/               Inhalte: site.ts (Kontaktdaten), services.tsx, references.tsx, tech.ts
└── lib/                  Firebase-Initialisierung, Referenzen-Loader, Hilfsfunktionen
public/images/            Bilder, u. a. Referenz-Screenshots in referenzen/
```

## Inhalte pflegen

- **Kontaktdaten, Adresse, Social-Links:** `src/config/site.ts`. Social-Profile erscheinen im Footer, sobald dort eine URL eingetragen ist.
- **Leistungen:** `src/config/services.tsx`
- **Tech-Stack-Seite:** `src/config/tech.ts`
- **Referenzen:** Die Case Studies (Bei Jost, Kiel Visionen, SchoolXR) stehen in `src/config/references.tsx`, die Screenshots in `public/images/referenzen/`. Weitere Referenzen kannst du im Admin-Bereich anlegen. Sie werden aus Firestore zusätzlich angezeigt, und ein Firestore-Eintrag mit gleichem `slug` ersetzt den Eintrag aus dem Code.
- **Blog:** im Admin-Bereich unter `/admin/blog`

## Fehlerbehebung

**„Module not found: Can't resolve …“ beim Start.** `node_modules` ist unvollständig. Neu installieren:

```bash
rm -rf node_modules .next
npm ci
```

**KI-Chat antwortet nicht.** Prüfen, ob `GROQ_API_KEY` in `.env.local` gesetzt ist, und den Dev-Server neu starten. Im Terminal des Dev-Servers steht die genaue Fehlermeldung. `401` heißt, der Key ist ungültig, `429` heißt, das Free-Tier-Limit ist erreicht.

**Blog oder Referenzen aus dem Admin erscheinen nicht.** Prüfen, ob die Firebase-Variablen gesetzt sind und die Firestore-Regeln aus `firestore.rules` im Firebase-Projekt veröffentlicht wurden.
