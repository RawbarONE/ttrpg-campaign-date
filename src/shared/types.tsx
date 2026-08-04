export type TCampaign = {
	id: number;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	daysPast: number;
	optionsConfig: string;
};

export type TCampaignGlobalValue = {
	campaignsList: TCampaign[];
	activeCampaign: TCampaign | undefined;
	refreshCampaignList: () => Promise<void>;
};

export type TUiContext = {
	optionsOpened: boolean;
	toggleOptions: () => void;
};

export type TMonth = {
	monthNumber: number;
	monthName: string;
	days: number;
};

export type TStartDay = {
	monthNumber: number;
	dayNumber: number;
	year: number;
};

export type TDateConfig = {
	startDay: TStartDay;
	daysOfTheWeek: string[];
	months: TMonth[];
};
