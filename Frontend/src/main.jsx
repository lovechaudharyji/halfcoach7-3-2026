import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store"; // Import your store
import { ToastContainer } from 'react-toastify';




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      
      <App />
      <ToastContainer />
    
    </Provider> 
  </StrictMode>
         

);