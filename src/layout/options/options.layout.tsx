import React from "react";
import * as S from "./options.layout.styles";
import { useOptionsGlobal } from "../../hooks/globals.hooks";

export const OptionsButton: React.FC = () => {
	const { toggleOptions } = useOptionsGlobal();

	return (
		<S.OptionsButtonWrapper>
			<S.Button onClick={toggleOptions}>Options</S.Button>
		</S.OptionsButtonWrapper>
	);
};
