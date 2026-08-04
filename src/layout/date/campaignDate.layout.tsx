import React, { useState } from "react";
import { useCurrentDate } from "../../hooks/currentDate.hooks";
import { useCampaignGlobal } from "../../hooks/globals.hooks";
import * as S from "./date.layout.styles";

export const CampaignDate: React.FC = () => {
	const { activeCampaign, refreshCampaignList } = useCampaignGlobal();

	const [clickAnimation, setClickAnimation] = useState<"add" | "remove" | null>(
		null,
	);

	const date = useCurrentDate(activeCampaign?.daysPast ?? 0);

	const addDay = async () => {
		if (!activeCampaign) return;

		await window.api.campaignDays.increase(activeCampaign.id);
		await refreshCampaignList();
		setClickAnimation("add");
	};

	const removeDay = async () => {
		if (!activeCampaign) return;

		await window.api.campaignDays.decrease(activeCampaign.id);
		await refreshCampaignList();
		setClickAnimation("remove");
	};

	return (
		<S.CampaignDateWrapper>
			<S.DateContainer>
				<S.Date>
					{date.currentDayName} {date.currentDayNumber}.{date.currentMonthName},
					3E {date.currentYear}
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
