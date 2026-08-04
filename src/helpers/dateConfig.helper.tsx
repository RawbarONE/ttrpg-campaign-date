import { defaultDateConfig } from "../config/defaultDateData.config";
import { TDateConfig } from "../shared/types";

export const getOptionsConfig = (dateConfig?: string | null): TDateConfig => {
	if (!dateConfig) return defaultDateConfig;

	try {
		return JSON.parse(dateConfig) as TDateConfig;
	} catch (error) {
		console.error("Failed to parse config:", error);
		return defaultDateConfig;
	}
};
