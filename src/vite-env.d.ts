/// <reference types="vite/client" />

import { TDateConfig } from "./shared/types";

export {};

declare global {
	interface Window {
		api: {
			campaignDays: {
				list: () => Promise<
					Array<{
						id: number;
						name: string;
						isActive: boolean;
						createdAt: Date;
						updatedAt: Date;
						daysPast: number;
						optionsConfig: string;
					}>
				>;
				create: (name: string) => Promise<{
					id: string;
					name: string;
					isActive: boolean;
					createdAt: Date;
					updatedAt: Date;
					optionsConfig: string;
				}>;
				active: (id: number) => Promise<{
					id: number;
					name: string;
					isActive: boolean;
					createdAt: Date;
					updatedAt: Date;
					optionsConfig: string;
				}>;
				delete: (id: number) => Promise<{
					id: number;
				}>;
				increase: (id: number) => Promise<{ id: number }>;
				decrease: (id: number) => Promise<{ id: number }>;
			};
			config: {
				update: (
					id: number,
					config: TDateConfig,
				) => Promise<{
					id: string;
					name: string;
					isActive: boolean;
					createdAt: Date;
					updatedAt: Date;
					optionsConfig: string;
				}>;
			};
		};

		ipcRenderer: {
			on: (
				...args: Parameters<typeof import("electron").ipcRenderer.on>
			) => ReturnType<typeof import("electron").ipcRenderer.on>;
			off: (
				...args: Parameters<typeof import("electron").ipcRenderer.off>
			) => ReturnType<typeof import("electron").ipcRenderer.off>;
			send: (
				...args: Parameters<typeof import("electron").ipcRenderer.send>
			) => ReturnType<typeof import("electron").ipcRenderer.send>;
			invoke: <T = unknown>(
				...args: Parameters<typeof import("electron").ipcRenderer.invoke>
			) => Promise<T>;
		};
	}
}
