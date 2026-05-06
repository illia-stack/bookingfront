import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PropertyDetail from "./pages/PropertyDetail";

import MyBookings from "./pages/MyBookings";

import Success from "./pages/Success";

import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          {/* 🏠 Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          {/* 📅 User */}
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* 💳 Stripe Pages */}
          <Route path="/success" element={<Success />} />

        </Routes>

      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;