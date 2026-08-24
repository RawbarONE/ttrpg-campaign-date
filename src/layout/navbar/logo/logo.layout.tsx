import React, { useEffect, useMemo, useRef, useState } from "react";
import LogoImg from "../../../assets/logo/dnd-logo.png";
import { useCampaignGlobal } from "../../../hooks/globals.hooks";
import { CreateCampaign } from "./createCampaign.logo.layout";
import * as S from "./logo.layout.styles";

export const Logo: React.FC = () => {
	return (
		<S.LogoWrapper>
			<S.Logo src={LogoImg} />
			<S.CampaignLabel>
				<DropdownCampaign />
			</S.CampaignLabel>
		</S.LogoWrapper>
	);
};

const DropdownCampaign: React.FC = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const { campaignsList, activeCampaign, refreshCampaignList } =
		useCampaignGlobal();

	const setActiveCampaign = async (id: number) => {
		await window.api.campaignDays.active(id);
		refreshCampaignList();
		setDropdownOpen(false);
	};

	const deleteCampaign = async (id: number) => {
		await window.api.campaignDays.delete(id);
		refreshCampaignList();
	};

	const campaignName = useMemo((): string => {
		if (campaignsList.length === 0) return "Create Campaign";
		return activeCampaign?.name ?? "Create Campaign";
	}, [campaignsList, activeCampaign]);

	const dropdownState = () => {
		setDropdownOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropdownRef.current) return;

			if (!dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<S.WrapperDropdown ref={dropdownRef}>
			<S.ActiveCampaign onClick={dropdownState}>
				{campaignName}
			</S.ActiveCampaign>
			{dropdownOpen && (
				<S.CampaignList>
					<S.CreateCampaignWrapper>
						<CreateCampaign
							availableCampaigns={refreshCampaignList}
							onCampaignCreation={dropdownState}
						/>
					</S.CreateCampaignWrapper>
					{campaignsList.map((c) => (
						<S.CampaignElement key={c.id}>
							<S.CampaignName onClick={() => setActiveCampaign(c.id)}>
								{c.name}
							</S.CampaignName>
							<S.DeleteCampaign onClick={() => deleteCampaign(c.id)}>
								X
							</S.DeleteCampaign>
						</S.CampaignElement>
					))}
				</S.CampaignList>
			)}
		</S.WrapperDropdown>
	);
};
