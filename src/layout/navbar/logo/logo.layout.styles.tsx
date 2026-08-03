import styled from "@emotion/styled";

export const LogoWrapper = styled.div`
	position: absolute;
	left: 40%;
	top: 12%;
`;

export const Logo = styled.img`
	width: 350px;
	height: fit-content;
	object-fit: contain;
	position: absolute;
`;

export const CampaignLabel = styled.div`
	display: flex;
	position: absolute;
	width: 350px;
	top: 90px;
	left: 120px;
	font-family: "ITC Elan Pro", serif;
	font-size: 1.5rem;
`;

export const WrapperDropdown = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CampaignName = styled.div`
	display: flex;
	cursor: pointer;
`;

export const DeleteCampaign = styled.div`
	display: flex;
	padding-left: 20px;
	cursor: pointer;
`;

export const ActiveCampaign = styled.div`
	display: flex;
	cursor: pointer;
`;

export const CampaignList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CampaignElement = styled.div`
	display: flex;
	flex-direction: row;
`;

export const CreateCampaignWrapper = styled.div`
	display: flex;
`;
