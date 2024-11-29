import React, { useState, useEffect } from "react";
import "./ProfilePage.css"; // Import file CSS

function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(""); // State untuk notifikasi
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  // Cek login saat pertama kali komponen dimuat
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUserDetails(storedUser);
    }
  }, []);

  const handleLogin = () => {
    const email = "femil@gmail.com";
    const password = "12345";

    const inputEmail = document.getElementById("email").value;
    const inputPassword = document.getElementById("password").value;

    if (inputEmail === email && inputPassword === password) {
      const user = {
        name: "Listyawan Femil Anaki",
        email: "femil@gmail.com",
        profilePicture: "/Profile.png", // Lokasi gambar profil
      };

      // Menyimpan data pengguna ke localStorage
      localStorage.setItem("userDetails", JSON.stringify(user));
      setIsLoggedIn(true);
      setUserDetails(user);
      setNotification("Login berhasil! Selamat datang!");
    } else {
      setNotification("Login gagal! Email atau password salah!");
      setTimeout(() => setNotification(""), 3000); // Hapus notifikasi setelah 3 detik
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNotification(""); // Hapus notifikasi saat logout
    setUserDetails({
      name: "",
      email: "",
      profilePicture: "",
    });

    // Menghapus data pengguna dari localStorage
    localStorage.removeItem("userDetails");
  };

  return (
    <div className="profile-container">
      {notification && (
        <div className={`notification ${isLoggedIn ? "success" : "error"}`}>
          {notification}
        </div>
      )}
      {!isLoggedIn ? (
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome!</h1>
            <p>Please login to continue</p>
          </div>
          <div className="login-body">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="login-input"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="login-input"
            />
            <button onClick={handleLogin} className="login-btn">
              Log In
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-card">
          <div className="profile-picture-container">
            <img
              src={userDetails.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <h2>{userDetails.name}</h2>
          <p>{userDetails.email}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
