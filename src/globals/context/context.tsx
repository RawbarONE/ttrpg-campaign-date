import { createContext } from "react";
import { TCampaignGlobalValue } from "../../shared/types";

export const CampaignContext = createContext<TCampaignGlobalValue | null>(null);
