import { TDateConfig } from "../shared/types";

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
	prop: "day" | "month" | "year",
	value: number,
	configData: TDateConfig,
) => {
	const updatedStartDate = { ...configData.startDay };

	if (prop === "day") {
		updatedStartDate.dayNumber = value;
	}

	if (prop === "month") {
		updatedStartDate.monthNumber = value;
	}

	if (prop === "year") {
		updatedStartDate.year = value;
	}

	return {
		...configData,
		startDay: updatedStartDate,
	};
};
