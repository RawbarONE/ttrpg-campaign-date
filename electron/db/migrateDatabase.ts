import { app } from "electron";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export const runMigrations = (dbFile: string) => {
	const db = new Database(dbFile);

	db.exec(`
		CREATE TABLE IF NOT EXISTS _app_migrations (
			id TEXT PRIMARY KEY,
			appliedAt TEXT NOT NULL
		);
	`);

	const migrationsDir = app.isPackaged
		? path.join(process.resourcesPath, "prisma", "migrations")
		: path.join(process.cwd(), "prisma", "migrations");

	if (!fs.existsSync(migrationsDir)) {
		console.warn("Migrations folder not found:", migrationsDir);
		db.close();
		return;
	}

	const migrationFolders = fs.readdirSync(migrationsDir).sort();

	for (const folder of migrationFolders) {
		const migrationSqlPath = path.join(migrationsDir, folder, "migration.sql");

		if (!fs.existsSync(migrationSqlPath)) continue;

		const alreadyApplied = db
			.prepare("SELECT id FROM _app_migrations WHERE id = ?")
			.get(folder);

		if (alreadyApplied) continue;

		const sql = fs.readFileSync(migrationSqlPath, "utf8");

		db.transaction(() => {
			db.exec(sql);

			db.prepare(
				"INSERT INTO _app_migrations (id, appliedAt) VALUES (?, ?)",
			).run(folder, new Date().toISOString());
		})();
	}

	db.close();
};
