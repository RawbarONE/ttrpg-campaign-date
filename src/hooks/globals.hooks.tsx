import { useContext } from "react";
import { CampaignContext } from "../globals/context/context";

export const useCampaignGlobal = () => {
	const context = useContext(CampaignContext);

	if (!context) {
		throw new Error("useCampaignGlobal must be used inside CampaignProvider");
	}

	return context;
};
