import { useEffect, useMemo, useState } from "react";

const getWindowDimensions = () => {
	const { clientWidth: width, clientHeight: height } = document.documentElement;
	return { width, height };
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions(),
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export const useSetScale = () => {
	const { width, height } = useWindowDimensions();

	return useMemo(() => {
		return Math.min(width / 1920, height / 1080);
	}, [width, height]);
};
