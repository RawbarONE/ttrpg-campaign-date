import React from "react";
import * as S from "./main.layout.styles";
import { Navbar } from "../navbar/navbar";
import { CampaignDate } from "../date/campaignDate.layout";

export const MainApp: React.FC = () => {
	return (
		<S.Wrapper>
			<Navbar />
			<CampaignDate />
		</S.Wrapper>
	);
};
