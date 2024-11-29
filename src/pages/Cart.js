import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Menggunakan QRCodeCanvas untuk QR Code
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  const [showQRCode, setShowQRCode] = useState(false); // State untuk menampilkan QR Code

  // Mengelompokkan produk berdasarkan ID untuk menghitung quantity yang benar
  const groupedCart = cart.reduce((acc, item) => {
    const found = acc.find((cartItem) => cartItem.id === item.id);
    if (found) {
      found.quantity += item.quantity; // Menambahkan quantity yang ada
    } else {
      acc.push({ ...item, quantity: item.quantity });
    }
    return acc;
  }, []);

  // Fungsi untuk menghitung total harga berdasarkan quantity
  const getTotalPrice = () => {
    return groupedCart.reduce((total, item) => {
      return total + item.avg_price * item.quantity; // Mengalikan harga dengan quantity
    }, 0);
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemove = (id) => {
    removeFromCart(id); // Menghapus item berdasarkan ID
  };

  // Fungsi untuk mengonversi harga ke format IDR
  const convertToRupiah = (price) => {
    const exchangeRate = 15000; // Static exchange rate
    return (price * exchangeRate).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  // Fungsi untuk menampilkan QR Code saat checkout
  const handleCheckout = () => {
    setShowQRCode(true); // Menampilkan QR code saat checkout
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      {groupedCart.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div className="cart-items">
          {groupedCart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h2 className="cart-item-title">{item.title}</h2>
                <p className="cart-item-price">
                  Price: {convertToRupiah(item.avg_price)}
                </p>
                <p className="cart-item-quantity">
                  Quantity: {item.quantity}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {groupedCart.length > 0 && (
        <div className="cart-summary">
          <h3>Total Price: {convertToRupiah(getTotalPrice())}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Menampilkan QR Code jika Proceed to Checkout ditekan */}
      {showQRCode && (
        <div className="qr-code-container">
          <h3>Scan to Pay:</h3>
          <QRCodeCanvas value={`Total: ${convertToRupiah(getTotalPrice())}`} size={256} />
        </div>
      )}
    </div>
  );
}

export default Cart;
