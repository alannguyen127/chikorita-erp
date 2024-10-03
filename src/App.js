import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";
function App() {
  return (
    <FrappeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </FrappeProvider>
  );
}

export default App;
