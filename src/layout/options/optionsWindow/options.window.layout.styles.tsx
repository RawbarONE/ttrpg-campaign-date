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
	height: 100%;
	gap: 1rem;
`;

export const StartDayWrapper = styled.div`
	display: flex;
	gap: 1rem;
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
		${({ $start }) =>
			$start &&
			css`
				text-align: center;
			`}
	}
`;

export const StartElement = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const MonthElement = styled.div`
	display: flex;
	gap: 4rem;
`;

export const WeekElement = styled.div`
	display: flex;
	align-items: center;
	width: 21rem;
	justify-content: space-between;
	gap: 0.3rem;
`;

export const Button = styled.button<{
	$type: "apply" | "reset";
	$active?: boolean;
}>`
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

	${({ $active }) =>
		$active &&
		css`
			background-color: green;
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

export const ButtonSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;

export const ButtonArea = styled.div`
	display: flex;
	flex-direction: row;
`;

export const ButtonDateArea = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 3rem;
	gap: 0.3rem;
`;
