## Development

This is a personal project developed for a D&D campaign I'm running. The application is a simple in-game date tracker that keeps track of the date from the start of a campaign.

The calendar can be customized in the options, including month names, day names, and the number of days in each month.

Leap years are currently not supported, as the calendar used in my campaign does not include them.

### Requirements

* [Node.js](https://nodejs.org/) 22+
* npm
* Git

This project uses [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3), which is a native Node module.

On Windows, building or rebuilding native dependencies may require:

* **Visual Studio Build Tools**

  * `Desktop development with C++`
* **Python 3** — required by `node-gyp`

> The full Visual Studio IDE is not required.

---

### Setup

Clone the repository:

```bash
git clone <repository-url>
cd ttrpg-campaign-date
```

Install dependencies:

```bash
npm install
```

Build the application:

```bash
npm run release
```

---

### Stack

* Electron
* React
* TypeScript
* Vite
* Emotion
* Prisma
* SQLite / `better-sqlite3`

---

### Notes

* Prisma Client is generated locally and is not tracked by Git.
* Prisma migration files and local SQLite database files are not tracked by the repository.
* Because `better-sqlite3` is a native dependency, it may need to be rebuilt for Electron after dependency or Electron version changes.
* The application was developed and tested using **Node.js 24.18.1** and **Visual Studio 2026 Build Tools** on Windows.
