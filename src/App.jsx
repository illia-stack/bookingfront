import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PropertyDetail from "./pages/PropertyDetail";
import MyBookings from "./pages/MyBookings";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard"; 

import {
  LanguageProvider,
  useLanguage
} from "./context/LanguageContext";



function AppContent() {

  const { lang } = useLanguage();

  // HTML LANG ATTRIBUTE
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    return token
      ? children
      : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* 🏠 PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
            path="/admin"
            element={
                <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            }
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetail />}
        />

        {/* 📅 PROTECTED */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 💳 STRIPE */}
        <Route
          path="/cancel"
          element={<Cancel />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

      </Routes>

    </BrowserRouter>
  );
}

function App() {

  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;