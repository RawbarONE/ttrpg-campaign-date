export type TStartDateOptions = "day" | "month" | "year" | "era";

export type TDateOptionOptions = "dayOfWeek" | "era" | "year";

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

export type TShowDate = {
	dayOfWeek: boolean;
	era: boolean;
	year: boolean;
};

export type TUiContext = {
	optionsOpened: boolean;
	toggleOptions: () => void;
	closeOptions: () => void;
	toggleDateOptions: (option: keyof TShowDate) => void;
	showDate: TShowDate;
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
	era: number;
};

export type TDateConfig = {
	startDay: TStartDay;
	daysOfTheWeek: string[];
	months: TMonth[];
	showDate: TShowDate;
};
