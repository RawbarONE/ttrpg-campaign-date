import "./App.css";
import { AppScaleWrapper } from "./components/scaled.main";
import { CampaignProvider } from "./globals/context/campaignProvider.context";
import { MainApp } from "./layout/main/main.layout";

function App() {
	return (
		<AppScaleWrapper>
			<CampaignProvider>
				<MainApp />
			</CampaignProvider>
		</AppScaleWrapper>
	);
}

export default App;
