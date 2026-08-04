import React, { useEffect, useMemo, useState } from "react";
import { TCampaign } from "../../shared/types";
import { CampaignContext } from "./context";

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [campaignsList, setCampaignsList] = useState<TCampaign[]>([]);

	const refreshCampaignList = async () => {
		const list = await window.api.campaignDays.list();
		setCampaignsList(list);
	};

	useEffect(() => {
		refreshCampaignList();
	}, []);

	const activeCampaign = useMemo(
		() => campaignsList.find((c) => c.isActive),
		[campaignsList],
	);

	const value = useMemo(
		() => ({
			campaignsList,
			activeCampaign,
			refreshCampaignList,
		}),
		[campaignsList, activeCampaign],
	);

	return (
		<CampaignContext.Provider value={value}>
			{children}
		</CampaignContext.Provider>
	);
};
