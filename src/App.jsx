import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PropertyDetail from "./pages/PropertyDetail";
import MyBookings from "./pages/MyBookings";
import Success from "./pages/Success";

import { LanguageProvider } from "./context/LanguageContext";

function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <LanguageProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          {/* 🏠 Public */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          {/* 📅 Protected */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* 💳 Stripe */}
          <Route path="/success" element={<Success />} />
        </Routes>

      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;