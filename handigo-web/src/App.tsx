import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import CustomerHomePage from "./features/customer/pages/CustomerHomePage";
import ProviderHomePage from "./features/provider/pages/ProviderHomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/customer" element={<CustomerHomePage />} />
        <Route path="/provider" element={<ProviderHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
