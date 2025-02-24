import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      pauseOnHover
      draggable
      theme="light"
      transition={Slide}
    />
  </StrictMode>
);
