import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import AppRoutes from "./routes/AppRoutes";
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
