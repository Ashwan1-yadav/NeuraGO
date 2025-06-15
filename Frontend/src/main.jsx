import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import DriverContext from "../context/DriverContext.jsx";
import SocketContext from "../context/SocketContext.jsx";
import RideContext from "../context/RideContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById("root")).render(

  
  <DriverContext>
    <UserContext>
      <RideContext>
        <SocketContext>
          <BrowserRouter>
            <App />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover  />
          </BrowserRouter>
        </SocketContext>
      </RideContext>
    </UserContext>
  </DriverContext>

);
