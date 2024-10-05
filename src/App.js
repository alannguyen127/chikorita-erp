import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <FrappeProvider enableSocket={false} socketPort="9000">
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </FrappeProvider>
  );
}

export default App;
