import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage"; // Import halaman detail produk

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUserDetails(storedUser);
    }
  }, []);

  // Fungsi untuk menambahkan produk ke keranjang
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Fungsi untuk menghapus produk dari keranjang
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id)); // Menghapus item berdasarkan ID
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} /> {/* Pass removeFromCart sebagai prop */}
          <Route exact path="/category/:category" element={<CategoryPage />} />
          <Route exact path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} userDetails={userDetails} />} />
          <Route exact path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
