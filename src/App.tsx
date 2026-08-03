import "./App.css";
import { AppScaleWrapper } from "./components/scaled.main";
import { MainApp } from "./layout/main/main.layout";

function App() {
	return (
		<AppScaleWrapper>
			<MainApp />
		</AppScaleWrapper>
	);
}

export default App;
