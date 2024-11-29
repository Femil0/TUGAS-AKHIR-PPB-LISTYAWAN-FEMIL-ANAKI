import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LandingPage.css";
import Card from "../components/card";
import Modal from "../components/modal";

function LandingPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Redirect to home page on component mount
    navigate("/"); // Ensure the user is on the homepage
  }, [navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { Authorization: "f-66a66aa58a3acfb7556649813f90f4d4" },
    };

    fetch("https://api.sneakersapi.dev/api/v2/products", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        } else {
          console.error("Failed to load products");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="landing-page">
      <div className="product-list">
        {products.map((product) => (
            <Card
            key={product.id}
            product={{
                ...product,
                original_price: product.avg_price * 1.5, // Misal harga awal adalah 1.5x rata-rata
            }}
            onClick={setSelectedProduct}
            />
        ))}
        </div>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default LandingPage;
