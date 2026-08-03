import React from "react";
import styled from "@emotion/styled";
import { useSetScale } from "../hooks/window.hooks";

export const ScaleMainWrapper = styled.div`
	display: flex;
	/* width: 100vw; */
	height: 98vh;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ScaledContent = styled.div<{ $scale: number }>`
	width: 1920px;
	height: 1080px;
	transform: scale(${({ $scale }) => $scale});
	transform-origin: center center;
	flex-shrink: 0;
`;

export const AppScaleWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const scale = useSetScale();

	return (
		<ScaleMainWrapper>
			<ScaledContent $scale={scale}>{children}</ScaledContent>
		</ScaleMainWrapper>
	);
};
