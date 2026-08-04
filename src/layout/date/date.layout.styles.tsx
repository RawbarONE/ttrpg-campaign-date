import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const backgroundButtonExplosionAnimation = keyframes`
	0% {
		background: transparent;
		width: 0;
		height: 0;
		border-radius: 50%;
		}
	20% {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 20%;
	}
	100% {
		background: transparent;
		width: 100%;
		height: 100%;
		border-radius: 0%;
	}
`;

export const CampaignDateWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

export const DateButton = styled.div<{ $active: boolean }>`
	position: relative;

	display: flex;
	cursor: pointer;
	border: 1px solid white;
	font-size: 3rem;
	padding: 1rem;
	width: 18rem;
	justify-content: center;
	align-items: center;
	color: white;
	user-select: none;
	transition:
		transform 0.5s ease-in-out,
		box-shadow 0.5s ease-in-out;

	&::before {
		content: "";
		position: absolute;
		${({ $active }) =>
			$active &&
			css`
				animation: ${backgroundButtonExplosionAnimation} 0.7s ease-in-out;
			`}
	}

	&:hover {
		transform: scale(1.1);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}
`;

export const DateContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Date = styled.div`
	display: flex;
	font-size: 6rem;
	font-family: "Middle-earth";
`;

export const ButtonArea = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	gap: 2rem;
	align-items: center;
	font-family: "Middle-earth";
`;

export const Text = styled.div`
	display: flex;
	height: 100%;
	font-size: 2rem;
`;
