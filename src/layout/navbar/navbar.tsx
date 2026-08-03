import React from "react";
import * as S from "./navbar.layout.styles";
import { Logo } from "./logo/logo.layout";

export const Navbar: React.FC = () => {
	return (
		<S.NavbarWrapper>
			<Logo />
		</S.NavbarWrapper>
	);
};
