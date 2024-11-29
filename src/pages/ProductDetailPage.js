import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  // Fungsi untuk mengonversi harga ke IDR
  const convertToRupiah = (price) => {
    const exchangeRate = 15000; // Static exchange rate (1 USD = 15,000 IDR)

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      console.error('Invalid price:', price);
      return 'Invalid Price'; // Return fallback jika harga invalid
    }

    return (numericPrice * exchangeRate).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  // Mengambil data produk dari API
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { Authorization: 'f-66a66aa58a3acfb7556649813f90f4d4' },
    };

    fetch(`https://api.sneakersapi.dev/api/v2/products/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);
        } else {
          console.error('Failed to load product details');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  if (!product) return <div>Product not found</div>;

  // Menampilkan harga produk dalam format IDR
  const getProductPrice = (product) => {
    if (!product || !product.price || isNaN(product.price)) {
      return 'Rp0';
    }
    return convertToRupiah(product.price);
  };

  // Fungsi untuk membersihkan deskripsi dan menghindari <br><br> 
  const cleanDescription = (description) => {
    if (!description) return '';
    return description.replace(/<br\s*\/?>/gi, '\n');
  };

  // Mengubah quantity
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // Pastikan quantity berupa number
  };
  
  return (
    <div className="product-detail-page">
      <h1>{product.title}</h1>
      <div className="product-detail-container">
        <img
          src={product.image || '/images/default-product.jpg'}
          alt={product.title}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Color:</strong> {product.color || 'Unknown'}</p>
          <p><strong>Price:</strong> {getProductPrice(product)}</p>
          {/* Deskripsi produk */}
          <p className="product-description">{cleanDescription(product.description)}</p>

          {/* Quantity selector */}
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="100"
              step="1"
            />
          </div>

          {/* Tombol Add to Cart */}
          <button className="add-to-cart" onClick={() => addToCart({ ...product, quantity })}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
