import React, { useState } from "react";
import { getOptionsConfig } from "../../helpers/dateConfig.helper";
import { useCurrentDate } from "../../hooks/currentDate.hooks";
import { useCampaignGlobal } from "../../hooks/globals.hooks";
import * as S from "./date.layout.styles";

export const CampaignDate: React.FC = () => {
	const { activeCampaign, refreshCampaignList } = useCampaignGlobal();
	const [clickAnimation, setClickAnimation] = useState<"add" | "remove" | null>(
		null,
	);
	const optionsConfig = getOptionsConfig(activeCampaign?.optionsConfig);
	const showDate = optionsConfig.showDate;

	const date = useCurrentDate(activeCampaign?.daysPast ?? 0, optionsConfig);

	const addDay = async () => {
		if (!activeCampaign) return;

		await window.api.campaignDays.increase(activeCampaign.id);
		await refreshCampaignList();
		setClickAnimation("add");
	};

	const removeDay = async () => {
		if (!activeCampaign) return;

		if (activeCampaign.daysPast <= 0) return;

		await window.api.campaignDays.decrease(activeCampaign.id);
		await refreshCampaignList();
		setClickAnimation("remove");
	};

	return (
		<S.CampaignDateWrapper>
			<S.DateContainer>
				<S.Date>
					{showDate.dayOfWeek && `${date.currentDayName}`}{" "}
					{date.currentDayNumber}.{date.currentMonthName},
					{showDate.era && `${date.currentEra}E`}{" "}
					{showDate.year && `${date.currentYear}`}
				</S.Date>
				<S.ButtonArea>
					<S.DateButton
						$active={clickAnimation === "add"}
						onClick={addDay}
						onAnimationEnd={() => setClickAnimation(null)}
					>
						Add
					</S.DateButton>
					<S.Text>Or</S.Text>
					<S.DateButton
						$active={clickAnimation === "remove"}
						onClick={removeDay}
						onAnimationEnd={() => setClickAnimation(null)}
					>
						Remove
					</S.DateButton>
					<S.Text>Day</S.Text>
				</S.ButtonArea>
			</S.DateContainer>
		</S.CampaignDateWrapper>
	);
};
