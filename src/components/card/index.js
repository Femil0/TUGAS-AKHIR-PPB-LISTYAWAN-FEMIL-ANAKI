import React from 'react';
import { Link } from 'react-router-dom'; // Import Link untuk routing
import './index.css';

function Card({ product, onClick }) {
  const convertToRupiah = (price) => {
    const exchangeRate = 15000; // Static exchange rate
    return (price * exchangeRate).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  return (
    <div className="card">
      {/* Link menuju halaman detail produk */}
      <Link to={`/product/${product.id}`} className="card-link">
        <img src={product.image} alt={product.title} className="card-image" />
        <div className="card-content">
          <h3 className="card-brand">{product.brand}</h3>
          <p className="card-title">{product.title}</p>
          <p className="card-color">Color: {product.color || 'Unknown'}</p>
          <div className="card-price">
            <span className="card-final-price">
              {convertToRupiah(product.avg_price)}
            </span>
            {product.original_price && (
              <span className="card-original-price">
                {convertToRupiah(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
