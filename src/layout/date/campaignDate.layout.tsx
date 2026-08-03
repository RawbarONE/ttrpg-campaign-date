import React, { useEffect, useState } from "react";
import { useCurrentDate } from "../../hooks/currentDate.hooks";
import { TCampaign } from "../../shared/types";
import * as S from "./date.layout.styles";

export const CampaignDate: React.FC = () => {
	const [campaignsList, setCampaignsList] = useState<TCampaign[]>([]);

	async function availableCampaigns() {
		const list = await window.api.campaignDays.list();
		setCampaignsList(list);
	}

	useEffect(() => {
		availableCampaigns();
	}, [campaignsList]);

	const date = useCurrentDate(
		campaignsList.find((c) => c.isActive)?.daysPast || 0,
	);

	const addDay = () => {
		window.api.campaignDays.increase(
			campaignsList.find((c) => c.isActive)?.id || 0,
		);
		availableCampaigns();
	};

	const removeDay = () => {
		window.api.campaignDays.decrease(
			campaignsList.find((c) => c.isActive)?.id || 0,
		);
		availableCampaigns();
	};

	return (
		<S.CampaignDateWrapper>
			<S.DateContainer>
				<S.Date>
					{date.currentDayName} {date.currentDayNumber}.{date.currentMonthName},
					3E {date.currentYear}
				</S.Date>
				<S.ButtonArea>
					<S.DateButton onClick={addDay}>Add</S.DateButton>
					<S.Text>Or</S.Text>
					<S.DateButton onClick={removeDay}>Remove</S.DateButton>
					<S.Text>Day</S.Text>
				</S.ButtonArea>
			</S.DateContainer>
		</S.CampaignDateWrapper>
	);
};
