import React, { useCallback, useState } from "react";
import { getOptionsConfig } from "../../../helpers/dateConfig.helper";
import {
	handleDaysOfTheWeekChange,
	handleMonthDaysChange,
	handleMonthNameChange,
	handleStartDateChange,
} from "../../../helpers/optionFunctions.helper";
import {
	useCampaignGlobal,
	useOptionsGlobal,
} from "../../../hooks/globals.hooks";
import { TDateConfig } from "../../../shared/types";
import * as S from "./options.window.layout.styles";
import { defaultConfig } from "../../../config/defaultDateData.config";

export const Options: React.FC = () => {
	const { activeCampaign, refreshCampaignList } = useCampaignGlobal();
	const [dateConfig, setDateConfig] = useState<TDateConfig>(
		getOptionsConfig(activeCampaign?.optionsConfig),
	);
	const { closeOptions } = useOptionsGlobal();

	const handleConfigUpdate = useCallback(
		async (type: "apply" | "reset") => {
			if (!activeCampaign) return;

			const config = type === "apply" ? dateConfig : defaultConfig;

			await window.api.config.update(activeCampaign.id, config);
			await refreshCampaignList();
			closeOptions();
		},
		[activeCampaign, closeOptions, dateConfig, refreshCampaignList],
	);

	return (
		<S.OptionsWrapper>
			<S.LeftSection>
				<S.StartDayWrapper>
					<S.StartElement>
						<S.Label>Start Day</S.Label>
						<S.Input
							$start
							type="number"
							placeholder={`${dateConfig.startDay.dayNumber}`}
							onChange={(e) =>
								setDateConfig((currentConfig) =>
									handleStartDateChange(
										"day",
										parseInt(e.target.value),
										currentConfig,
									),
								)
							}
						/>
					</S.StartElement>
					<S.StartElement>
						<S.Label>Start Month</S.Label>
						<S.Input
							$start
							type="number"
							placeholder={`${dateConfig.startDay.monthNumber}`}
							onChange={(e) =>
								setDateConfig((currentConfig) =>
									handleStartDateChange(
										"month",
										parseInt(e.target.value),
										currentConfig,
									),
								)
							}
						/>
					</S.StartElement>
					<S.StartElement>
						<S.Label>Start Year</S.Label>
						<S.Input
							$start
							type="number"
							placeholder={`${dateConfig.startDay.year}`}
							onChange={(e) =>
								setDateConfig((currentConfig) =>
									handleStartDateChange(
										"year",
										parseInt(e.target.value),
										currentConfig,
									),
								)
							}
						/>
					</S.StartElement>
				</S.StartDayWrapper>
				<S.WeekWrapper>
					{dateConfig.daysOfTheWeek.map((day, idx) => (
						<S.WeekElement key={idx}>
							<S.Label>{realDays[idx]}</S.Label>
							<S.Input
								placeholder={day}
								onChange={(e) =>
									setDateConfig((currentConfig) =>
										handleDaysOfTheWeekChange(
											idx,
											e.target.value,
											currentConfig,
										),
									)
								}
							/>
						</S.WeekElement>
					))}
				</S.WeekWrapper>
				<S.Button $type="apply" onClick={() => handleConfigUpdate("apply")}>
					Apply
				</S.Button>
				<S.Button $type="reset" onClick={() => handleConfigUpdate("reset")}>
					Reset
				</S.Button>
			</S.LeftSection>
			<S.RightSection>
				<S.MonthWrapper>
					{dateConfig.months.map((month, idx) => (
						<S.MonthElement key={idx}>
							<S.MonthSection>
								<S.Label>{realMonths[idx]}</S.Label>
								<S.Input
									placeholder={month.monthName}
									onChange={(e) =>
										setDateConfig((currentConfig) =>
											handleMonthNameChange(idx, e.target.value, currentConfig),
										)
									}
								/>
							</S.MonthSection>
							<S.DaysSection>
								<S.Label>Days:</S.Label>
								<S.Input
									placeholder={`${month.days}`}
									onChange={(e) =>
										setDateConfig((currentConfig) =>
											handleMonthDaysChange(idx, e.target.value, currentConfig),
										)
									}
								/>
							</S.DaysSection>
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
