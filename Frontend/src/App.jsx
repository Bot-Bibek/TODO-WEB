import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Home from "./Components/Home/Home";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	);
};

export default App;
