import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;