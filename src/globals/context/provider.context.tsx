import React, { useEffect, useMemo, useState } from "react";
import { TCampaign } from "../../shared/types";
import { CampaignContext, UiContext } from "./context";

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

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [optionsOpened, setOptionsOpened] = useState(false);
	const [showDate, setShowDate] = useState({
		dayOfWeek: true,
		era: true,
		year: true,
	});

	const toggleOptions = () => setOptionsOpened((prev) => !prev);
	const closeOptions = () => setOptionsOpened(false);
	const toggleDateOptions = (option: "dayOfWeek" | "era" | "year") =>
		setShowDate((prev) => ({ ...prev, [option]: !prev }));

	const value = useMemo(
		() => ({
			optionsOpened,
			toggleOptions,
			closeOptions,
			toggleDateOptions,
			showDate,
		}),

		[optionsOpened, showDate],
	);

	return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};
