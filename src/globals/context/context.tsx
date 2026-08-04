import { createContext } from "react";
import { TCampaignGlobalValue, TUiContext } from "../../shared/types";

export const CampaignContext = createContext<TCampaignGlobalValue | null>(null);

export const UiContext = createContext<TUiContext | null>(null);
