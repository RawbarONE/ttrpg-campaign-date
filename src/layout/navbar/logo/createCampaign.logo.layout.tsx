import React, { useState } from "react";

interface ICreateCampaignProps {
	availableCampaigns: () => void;
}

export const CreateCampaign: React.FC<ICreateCampaignProps> = (
	p: ICreateCampaignProps,
) => {
	const [name, setName] = useState("");

	async function createCampaign() {
		const trimmed = name.trim();
		if (!trimmed) return;
		await window.api.campaignDays.create(trimmed);
		setName("");
		p.availableCampaigns();
	}

	return (
		<Wrapper>
			<Input
				value={name}
				onChange={(e) => setName(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") createCampaign();
				}}
				placeholder={"New campaign..."}
			/>
			<Create onClick={createCampaign}>+</Create>
		</Wrapper>
	);
};

import styled from "@emotion/styled";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.2rem;
`;

export const Input = styled.input`
	display: flex;
`;

export const Create = styled.button`
	display: flex;
`;
