import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import Success from "./pages/success";
import Summary from "./pages/summary";
import data from "./data";
import AuthProvider from "./context/auth";
import CardProvider from "./context/card";
import CheckoutProvider from "./context/checkout";

function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <CheckoutProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home data={data} />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/summary/success" element={<Success />} />
            </Routes>
          </BrowserRouter>
        </CheckoutProvider>
      </CardProvider>
    </AuthProvider>
  );
}

export default App;
