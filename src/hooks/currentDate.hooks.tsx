import { daysOfTheWeek, months, startDay } from "../config/monthDayData.config";

export const useCurrentDate = (daysPast: number) => {
	const currentDaysPast = startDay.days + daysPast;

	const currentDayIndex = (currentDaysPast - 1) % daysOfTheWeek.length;
	const currentDayName = daysOfTheWeek[currentDayIndex];

	let currentMonthIndex = startDay.monthNumber - 1;
	let currentDayNumber = currentDaysPast;
	let currentYear = startDay.year;

	while (currentDayNumber > months[currentMonthIndex].days) {
		currentDayNumber -= months[currentMonthIndex].days;
		currentMonthIndex++;

		if (currentMonthIndex >= months.length) {
			currentMonthIndex = 0;
			currentYear++;
		}
	}

	const currentMonthName = months[currentMonthIndex].monthName;

	return { currentDayName, currentMonthName, currentDayNumber, currentYear };
};
