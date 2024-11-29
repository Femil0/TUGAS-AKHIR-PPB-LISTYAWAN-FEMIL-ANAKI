import React, { useState, useEffect } from "react";
import { FaUser, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Gunakan useNavigate untuk berpindah halaman
import './index.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Daftar halaman di mana navbar kategori tidak akan muncul
  const hideNavbarItems = ["/cart", "/profile", "/about"];

  // Tentukan apakah kita berada di halaman yang memerlukan navbar kategori disembunyikan
  const shouldHideNavbarItems = hideNavbarItems.includes(location.pathname);

  // Memeriksa status login dari localStorage setiap kali komponen di-render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fungsi untuk menavigasi ke halaman utama
  const handleLogoClick = () => {
    navigate("/category/all-items");
  };

  return (
    <div>
      {/* Header */}
      <div className="navbar">
        <div className="navbar-logo">
          {/* Klik logo untuk kembali ke halaman utama */}
          <img
            src="/FootAvenue.png"
            alt="FOOT AVENUE Logo"
            className="navbar-logo-img"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }} // Menambahkan pointer saat hover pada logo
          />
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search Products..."
            className="search-box"
          />
        </div>
        <div className="navbar-icons">
          <Link to="/cart" className="navbar-icon">
            <FaShoppingCart size={24} />
          </Link>
          {isLoggedIn ? (
            <Link to="/profile" className="navbar-icon">
              <FaUser size={24} />
            </Link>
          ) : (
            <Link to="/profile" className="navbar-icon">
              <FaUser size={24} />
            </Link>
          )}
          <Link to="/about" className="navbar-icon">
            <FaInfoCircle size={24} />
          </Link>
        </div>
      </div>

      {/* Navigation Bar under the Header */}
      {!shouldHideNavbarItems && (
        <div className="navbar-category">
          <Link to="/category/all-items" className="navbar-category-item">
            All Items
          </Link>
          <Link to="/category/shoes" className="navbar-category-item">
            Shoes
          </Link>
          <Link to="/category/apparel" className="navbar-category-item">
            Apparel
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
