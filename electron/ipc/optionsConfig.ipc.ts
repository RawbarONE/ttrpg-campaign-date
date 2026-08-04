import { ipcMain } from "electron";
import { TDateConfig } from "../../src/shared/types";
import { getPrisma } from "../db/prisma";

export function registerOptionsConfigIpc() {
	ipcMain.handle(
		"config:update",
		async (_, campaignId: number, config: TDateConfig) => {
			const prisma = getPrisma();
			const configUpdate = await prisma.campaign.update({
				where: { id: campaignId },
				data: {
					optionsConfig: JSON.stringify(config),
				},
			});

			return {
				...configUpdate,
			};
		},
	);
}
