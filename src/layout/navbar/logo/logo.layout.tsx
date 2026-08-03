import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./logo.layout.styles";
import LogoImg from "../../../assets/logo/dnd-logo.png";
import { TCampaign } from "../../../shared/types";
import { CreateCampaign } from "./createCampaign.logo.layout";

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
	const [campaigns, setCampaigns] = useState<TCampaign[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	async function availableCampaigns() {
		const list = await window.api.campaignDays.list();
		setCampaigns(list);
	}

	async function setActiveCampaign(id: number) {
		await window.api.campaignDays.active(id);
		availableCampaigns();
		setDropdownOpen(false);
	}

	async function deleteCampaign(id: number) {
		await window.api.campaignDays.delete(id);
		availableCampaigns();
	}

	const campaignName = useMemo((): string => {
		if (campaigns.length === 0) return "Campaign Name";
		return campaigns.find((c) => c.isActive)?.name || "Campaign Name";
	}, [campaigns]);

	const dropdownState = () => {
		setDropdownOpen((prev) => !prev);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (!dropdownRef.current) return;

			if (!dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		availableCampaigns();
	}, []);

	useEffect(() => {
		console.log("campaignName ", campaigns);
	}, [campaigns]);

	return (
		<S.WrapperDropdown ref={dropdownRef}>
			<S.ActiveCampaign onClick={dropdownState}>
				{campaignName}
			</S.ActiveCampaign>
			{dropdownOpen && (
				<S.CampaignList>
					<S.CreateCampaignWrapper>
						<CreateCampaign availableCampaigns={availableCampaigns} />
					</S.CreateCampaignWrapper>
					{campaigns.map((c) => (
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
