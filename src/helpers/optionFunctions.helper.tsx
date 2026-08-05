import { defaultConfig } from "../config/defaultDateData.config";
import {
	TDateConfig,
	TDateOptionOptions,
	TStartDateOptions,
} from "../shared/types";

export const handleMonthNameChange = (
	idx: number,
	value: string,
	configData: TDateConfig,
): TDateConfig => {
	const updatedMonths = [...configData.months];

	updatedMonths[idx] = {
		...updatedMonths[idx],
		monthName: value,
	};

	return {
		...configData,
		months: updatedMonths,
	};
};

export const handleMonthDaysChange = (
	idx: number,
	value: string,
	configData: TDateConfig,
) => {
	const updatedDaysMonth = [...configData.months];

	updatedDaysMonth[idx] = {
		...updatedDaysMonth[idx],
		days: Number(value),
	};

	return {
		...configData,
		months: updatedDaysMonth,
	};
};

export const handleDaysOfTheWeekChange = (
	idx: number,
	value: string,
	configData: TDateConfig,
) => {
	const updatedDaysWeek = [...configData.daysOfTheWeek];

	updatedDaysWeek[idx] = value;

	return {
		...configData,
		daysOfTheWeek: updatedDaysWeek,
	};
};

export const handleStartDateChange = (
	prop: TStartDateOptions,
	value: number,
	configData: TDateConfig,
) => {
	const updatedStartDate = { ...configData.startDay };

	if (prop === "day") updatedStartDate.dayNumber = value;

	if (prop === "month") updatedStartDate.monthNumber = value;

	if (prop === "year") updatedStartDate.year = value;

	if (prop === "era") updatedStartDate.era = value;

	return {
		...configData,
		startDay: updatedStartDate,
	};
};

export const toggleDateOptions = (
	prop: TDateOptionOptions,
	configData: TDateConfig,
): TDateConfig => {
	const showDate = configData.showDate ?? defaultConfig.showDate;
	console.log("helpers toggle config data: ", configData);
	console.log("helpers toggle showDate data: ", showDate);

	return {
		...configData,
		showDate: {
			...showDate,
			[prop]: !showDate[prop],
		},
	};
};
