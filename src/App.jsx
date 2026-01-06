import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import "./styles/index.css";
import { startAuthListener } from "./features/auth/authListener";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    startAuthListener(dispatch);
  }, [dispatch]);
  
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
