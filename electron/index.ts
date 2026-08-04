import { registerCampaignDaysIpc } from "./ipc/campaignDays.ipc";
import { registerOptionsConfigIpc } from "./ipc/optionsConfig.ipc";

export function registerIpc() {
	registerCampaignDaysIpc();
	registerOptionsConfigIpc();
}
