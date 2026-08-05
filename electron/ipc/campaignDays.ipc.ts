import { ipcMain } from "electron";
import { getPrisma } from "../db/prisma";
import { Campaign } from "../../generated/prisma/client";
import { defaultConfig } from "../../src/config/defaultDateData.config";

export function registerCampaignDaysIpc() {
	ipcMain.handle("campaignDays:list", async () => {
		const prisma = getPrisma();
		const rows = await prisma.campaign.findMany({
			orderBy: { createdAt: "desc" },
		});

		return rows.map((row: Campaign) => ({
			...row,
		}));
	});

	ipcMain.handle("campaignDays:create", async (_, name: string) => {
		const prisma = getPrisma();
		const campaignName = await prisma.campaign.create({ data: { name } });

		return {
			...campaignName,
			optionsConfig: JSON.stringify(defaultConfig),
			createdAt: campaignName.createdAt.toISOString(),
			updatedAt: campaignName.updatedAt.toISOString(),
		};
	});

	ipcMain.handle("campaignDays:active", async (_, id: number) => {
		const prisma = getPrisma();
		await prisma.campaign.updateMany({
			data: { isActive: false },
		});

		const active = await prisma.campaign.update({
			where: { id },
			data: { isActive: true },
		});

		return {
			...active,
		};
	});

	ipcMain.handle("campaignDays:delete", async (_, id: number) => {
		const prisma = getPrisma();
		await prisma.campaign.delete({ where: { id } });
		return { id };
	});

	ipcMain.handle("campaignDays:increase", async (_, id: number) => {
		const prisma = getPrisma();
		const addDay = await prisma.campaign.update({
			where: { id: id },
			data: {
				daysPast: {
					increment: 1,
				},
			},
			select: {
				daysPast: true,
			},
		});

		return addDay.daysPast;
	});

	ipcMain.handle("campaignDays:decrease", async (_, id: number) => {
		const prisma = getPrisma();
		const removeDay = await prisma.campaign.update({
			where: { id: id },
			data: {
				daysPast: {
					decrement: 1,
				},
			},
			select: {
				daysPast: true,
			},
		});

		return removeDay.daysPast;
	});
}
