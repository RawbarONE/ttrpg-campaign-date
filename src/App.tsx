import "./App.css";
import { AppScaleWrapper } from "./components/scaled.main";
import {
	CampaignProvider,
	UiProvider,
} from "./globals/context/provider.context";
import { MainApp } from "./layout/main/main.layout";

function App() {
	return (
		<AppScaleWrapper>
			<CampaignProvider>
				<UiProvider>
					<MainApp />
				</UiProvider>
			</CampaignProvider>
		</AppScaleWrapper>
	);
}

export default App;
