export type TCampaign = {
	id: number;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	daysPast: number;
};

export type TCampaignGlobalValue = {
	campaignsList: TCampaign[];
	activeCampaign: TCampaign | undefined;
	refreshCampaignList: () => Promise<void>;
};
