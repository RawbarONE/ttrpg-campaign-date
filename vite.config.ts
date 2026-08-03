import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		babel({
			plugins: [
				[
					"@emotion/babel-plugin",
					{
						sourceMap: true,
						autoLabel: "dev-only",
						labelFormat: "[local]",
					},
				],
			],
		}),
		electron({
			main: {
				entry: "electron/main.ts",
				vite: {
					build: {
						rolldownOptions: {
							external: [
								"better-sqlite3",
								"prisma",
								/^@prisma\/client\/runtime\/.*/,
							],
						},
					},
				},
			},
			preload: {
				input: path.join(__dirname, "electron/preload.ts"),
			},
		}),
	],
});
