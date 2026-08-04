import React from "react";
import * as S from "./main.layout.styles";
import { Navbar } from "../navbar/navbar";
import { CampaignDate } from "../date/campaignDate.layout";
import { OptionsButton } from "../options/options.layout";
import { useOptionsGlobal } from "../../hooks/globals.hooks";
import { Options } from "../options/optionsWindow/options.window.layout";

export const MainApp: React.FC = () => {
	const { optionsOpened } = useOptionsGlobal();

	return (
		<S.Wrapper>
			<Navbar />
			{optionsOpened ? <Options /> : <CampaignDate />}
			<OptionsButton />
		</S.Wrapper>
	);
};
