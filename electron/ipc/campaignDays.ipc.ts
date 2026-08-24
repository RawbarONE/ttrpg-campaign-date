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

		const campaign = await prisma.$transaction(async (tx) => {
			await tx.campaign.updateMany({
				where: { isActive: true },
				data: { isActive: false },
			});

			return tx.campaign.create({
				data: {
					name,
					isActive: true,
					optionsConfig: JSON.stringify(defaultConfig),
				},
			});
		});

		return {
			...campaign,
			createdAt: campaign.createdAt.toISOString(),
			updatedAt: campaign.updatedAt.toISOString(),
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
