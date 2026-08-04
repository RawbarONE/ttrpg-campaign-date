import React, { useCallback, useState } from "react";
import { getOptionsConfig } from "../../../helpers/dateConfig.helper";
import {
	handleMonthDaysChange,
	handleMonthNameChange,
} from "../../../helpers/optionFunctions.helper";
import {
	useCampaignGlobal,
	useOptionsGlobal,
} from "../../../hooks/globals.hooks";
import { TDateConfig } from "../../../shared/types";
import * as S from "./options.window.layout.styles";

export const Options: React.FC = () => {
	const { activeCampaign, refreshCampaignList } = useCampaignGlobal();
	const [dateConfig, setDateConfig] = useState<TDateConfig>(
		getOptionsConfig(activeCampaign?.optionsConfig),
	);
	const { closeOptions } = useOptionsGlobal();

	const configUpdate = useCallback(async () => {
		if (!activeCampaign) return;

		await window.api.config.update(activeCampaign.id, dateConfig);
		await refreshCampaignList();
		closeOptions();
	}, [activeCampaign, closeOptions, dateConfig, refreshCampaignList]);

	return (
		<S.OptionsWrapper>
			<S.LeftSection>
				<S.StartDayWrapper>
					<S.StartElement>
						<S.Label>Start Day</S.Label>
						{/* <S.Input /> */}
					</S.StartElement>
					<S.StartElement>
						<S.Label>Start Month</S.Label>
						{/* <S.Input /> */}
					</S.StartElement>
					<S.StartElement>
						<S.Label>Start Year</S.Label>
						{/* <S.Input /> */}
					</S.StartElement>
				</S.StartDayWrapper>
				<S.WeekWrapper>
					{dateConfig.daysOfTheWeek.map((day, idx) => (
						<S.WeekElement key={idx}>
							<S.Label>{realDays[idx]}</S.Label>
							<S.Input value={day} placeholder={day} onChange={() => {}} />
						</S.WeekElement>
					))}
				</S.WeekWrapper>
				<S.ApplyButton onClick={configUpdate}>Apply</S.ApplyButton>
			</S.LeftSection>
			<S.RightSection>
				<S.MonthWrapper>
					{dateConfig.months.map((month, idx) => (
						<S.MonthElement key={idx}>
							<S.Label>{realMonths[idx]}</S.Label>
							<S.Input
								value={month.monthName}
								placeholder={month.monthName}
								onChange={(e) =>
									setDateConfig((currentConfig) =>
										handleMonthNameChange(idx, e.target.value, currentConfig),
									)
								}
							/>
							<S.Label>Days:</S.Label>
							<S.Input
								value={month.days}
								placeholder={`${month.days}`}
								onChange={(e) =>
									setDateConfig((currentConfig) =>
										handleMonthDaysChange(idx, e.target.value, currentConfig),
									)
								}
							/>
						</S.MonthElement>
					))}
				</S.MonthWrapper>
			</S.RightSection>
		</S.OptionsWrapper>
	);
};

const realMonths = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const realDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
