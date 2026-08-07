import { app } from "electron";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";
import { runMigrations } from "./migrateDatabase";
import fs from "node:fs";

let prisma: PrismaClient | null = null;

export function getPrisma() {
	if (prisma) return prisma;

	const isDev = !app.isPackaged;

	const dbFile = isDev
		? path.join(process.cwd(), "prisma", "dev.db")
		: path.join(app.getPath("userData"), "ttrpg-date.sqlite");

	if (!isDev) {
		fs.mkdirSync(path.dirname(dbFile), { recursive: true });
		runMigrations(dbFile);
	}

	const adapter = new PrismaBetterSqlite3({
		url: `file:${dbFile.replace(/\\/g, "/")}`,
	});

	prisma = new PrismaClient({ adapter });
	return prisma;
}
