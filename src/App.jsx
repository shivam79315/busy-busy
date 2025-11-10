import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center items-center">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
