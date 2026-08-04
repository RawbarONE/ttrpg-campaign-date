import React from "react";
import { useOptionsGlobal } from "../../hooks/globals.hooks";
import * as S from "./options.layout.styles";

export const OptionsButton: React.FC = () => {
	const { toggleOptions } = useOptionsGlobal();
	// const { refreshCampaignList } = useCampaignGlobal();

	const handleOptionClick = () => {
		toggleOptions();
	};

	return (
		<S.OptionsButtonWrapper>
			<S.Button onClick={handleOptionClick}>Options</S.Button>
		</S.OptionsButtonWrapper>
	);
};
