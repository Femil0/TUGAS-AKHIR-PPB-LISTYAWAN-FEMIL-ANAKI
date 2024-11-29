import React from "react";
import { FaUser, FaInfoCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Mengimpor Link dari react-router-dom untuk navigasi
import './index.css'; // Mengimpor file CSS untuk styling navbar

function Header() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
      </div>
      <div className="navbar-icons">
        <Link to="/profile" className="navbar-icon">
          <FaUser size={24} />
        </Link>
        <Link to="/about" className="navbar-icon"> {/* Link ke halaman About */}
          <FaInfoCircle size={24} />
        </Link>
        <Link to="/cart" className="navbar-icon">
          <FaShoppingCart size={24} />
        </Link>
        <Link to="/search" className="navbar-icon">
          <FaSearch size={24} />
        </Link>
      </div>
    </div>
  );
  
}

export default Header;
