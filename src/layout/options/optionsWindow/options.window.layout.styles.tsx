import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const OptionsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export const MonthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	gap: 1rem;
`;

export const WeekWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StartDayWrapper = styled.div`
	display: flex;
`;

export const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	gap: 5rem;
`;

export const RightSection = styled.div`
	display: flex;
	gap: 0.5rem;
	height: 100%;
`;

export const Label = styled.div`
	display: flex;
	font-size: 2rem;
`;

export const Input = styled.input<{ $start?: boolean }>`
	display: flex;
	height: 40px;
	width: ${({ $start }) => ($start ? 80 : 150)}px;
	font-size: 1.5rem;
	background-color: #3b3b3b;

	&::placeholder {
		color: #eaeaea7a;
	}
`;

export const StartElement = styled.div`
	display: flex;
`;

export const MonthElement = styled.div`
	display: flex;
	gap: 4rem;
`;

export const WeekElement = styled.div`
	display: flex;
`;

export const Button = styled.button<{ $type: "apply" | "reset" }>`
	display: flex;
	width: 5rem;
	height: 2rem;
	justify-content: center;
	align-items: center;

	${({ $type }) =>
		$type === "reset" &&
		css`
			background-color: red;
		`}
`;

export const MonthSection = styled.div`
	justify-content: space-between;
	display: flex;
	width: 21rem;
`;

export const DaysSection = styled.div`
	display: flex;
	justify-content: space-between;
	width: 17rem;
`;
