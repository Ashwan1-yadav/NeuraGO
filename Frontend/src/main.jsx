import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import DriverContext from "../context/DriverContext.jsx";
import SocketContext from "../context/SocketContext.jsx";
import RideContext from "../context/RideContext.jsx";

createRoot(document.getElementById("root")).render(
  <DriverContext>
    <UserContext>
      <RideContext>
        <SocketContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketContext>
      </RideContext>
    </UserContext>
  </DriverContext>
);
