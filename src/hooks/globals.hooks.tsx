import { useContext } from "react";
import { CampaignContext, UiContext } from "../globals/context/context";

export const useCampaignGlobal = () => {
	const context = useContext(CampaignContext);

	if (!context) {
		throw new Error("useCampaignGlobal must be used inside CampaignProvider");
	}

	return context;
};

export const useOptionsGlobal = () => {
	const optionContext = useContext(UiContext);

	if (!optionContext) {
		throw new Error("useOptionsGlobal must be used inside UiProvider");
	}

	return optionContext;
};
