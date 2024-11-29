import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Untuk mengambil parameter kategori dari URL
import Card from "../components/card"; // Card untuk menampilkan item
import "./CategoryPage.css"; // CSS untuk halaman kategori

function CategoryPage() {
  const { category } = useParams(); // Mengambil kategori dari URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Jumlah maksimal item per halaman

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { Authorization: "f-66a66aa58a3acfb7556649813f90f4d4" },
    };

    fetch("https://api.sneakersapi.dev/api/v2/products", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          let filteredProducts = data.data;

          // Filter produk berdasarkan kategori
          if (category === "shoes") {
            filteredProducts = data.data.filter((product) =>
              product.category.includes("Shoes") || product.category.includes("Slippers")
            );
          } else if (category === "apparel") {
            // Filter hanya produk apparel jenis hoodie
            filteredProducts = data.data.filter((product) =>
              product.category.includes("Apparel") && product.title.toLowerCase().includes("hoodie")
            );
          }
          // Set hasil filter ke state
          setProducts(filteredProducts);
        } else {
          console.error("Failed to load products");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  // Menghitung total halaman
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Menentukan item yang ditampilkan pada halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk berpindah halaman
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="category-page">
      <h1>{category === "all-items" ? "All Items" : category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="product-list">
        {currentItems.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
