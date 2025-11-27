import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/books.css";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [stockStatus, setStockStatus] = useState("all"); // 'all', 'available', 'unavailable'
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  // Örnek veri
  const books = [
    {
      id: 1,
      title: "Suç ve Ceza",
      author: "Fyodor Dostoyevski",
      category: "Roman",
      stock: 5,
      year: 1866,
      pages: 671
    },
    {
      id: 2,
      title: "Kürk Mantolu Madonna",
      author: "Sabahattin Ali",
      category: "Roman",
      stock: 2,
      year: 1943,
      pages: 176
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      category: "Distopya",
      stock: 0,
      year: 1949,
      pages: 328
    }
  ];

  // Kategorileri dinamik olarak al
  const categories = ["Tümü", ...new Set(books.map(b => b.category))];

  // Dışarı tıklayınca filtreyi kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const filtered = books.filter(
    (b) =>
      (category === "Tümü" || b.category === category) &&
      (stockStatus === "all" || (stockStatus === "available" ? b.stock > 0 : b.stock === 0)) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()))
  );

  const clearFilters = () => {
    setCategory("Tümü");
    setStockStatus("all");
  };

  const hasActiveFilters = category !== "Tümü" || stockStatus !== "all";

  return (
    <div className="books-container">

      {/* SADE ÜST KISIM */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #4a7c59, #5a9d6a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Kitap Ara
        </h1>

        <div className="search-filter-container" ref={filterRef} style={{ maxWidth: "550px", margin: "20px auto 0 auto", position: "relative" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Kitap adı veya yazar ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4a7c59"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: "14px",
                borderRadius: "16px",
                border: "none",
                background: showFilters ? "#4a7c59" : "white",
                color: showFilters ? "white" : "#4a7c59",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "52px"
              }}
              title="Filtrele"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <div style={{
              position: "absolute",
              top: "115%",
              right: 0,
              left: 0,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              zIndex: 100,
              animation: "fadeInDown 0.3s ease-out",
              border: "1px solid rgba(255,255,255,0.5)",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                <h4 style={{ margin: 0, color: "#2d3748", fontSize: "0.95rem", fontWeight: 600 }}>Filtrele</h4>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e53e3e",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontWeight: 500
                    }}
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* Kategori Filtresi */}
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "0.85rem", color: "#718096", marginBottom: "8px", fontWeight: 500 }}>Kategori</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "10px",
                        border: "1px solid",
                        borderColor: category === cat ? "#4a7c59" : "#e2e8f0",
                        background: category === cat ? "#4a7c59" : "white",
                        color: category === cat ? "white" : "#4a5568",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "0.85rem",
                        fontWeight: 500
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stok Durumu Filtresi */}
              <div>
                <p style={{ fontSize: "0.85rem", color: "#718096", marginBottom: "8px", fontWeight: 500 }}>Stok Durumu</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <button
                    onClick={() => setStockStatus("all")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: stockStatus === "all" ? "#4a7c59" : "#e2e8f0",
                      background: stockStatus === "all" ? "#4a7c59" : "white",
                      color: stockStatus === "all" ? "white" : "#4a5568",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "0.85rem",
                      fontWeight: 500
                    }}
                  >
                    Tümü
                  </button>
                  <button
                    onClick={() => setStockStatus("available")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: stockStatus === "available" ? "#4a7c59" : "#e2e8f0",
                      background: stockStatus === "available" ? "#4a7c59" : "white",
                      color: stockStatus === "available" ? "white" : "#4a5568",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "0.85rem",
                      fontWeight: 500
                    }}
                  >
                    Mevcut
                  </button>
                  <button
                    onClick={() => setStockStatus("unavailable")}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: stockStatus === "unavailable" ? "#4a7c59" : "#e2e8f0",
                      background: stockStatus === "unavailable" ? "#4a7c59" : "white",
                      color: stockStatus === "unavailable" ? "white" : "#4a5568",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "0.85rem",
                      fontWeight: 500
                    }}
                  >
                    Stokta Yok
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* AŞAĞI TAMAMEN BOOKSPAGE KARTLARI */}
      <div className="books-list">
        {filtered.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-card-cover">
              <div className="book-card-icon">📚</div>

              <div
                className={`stock-indicator ${book.stock > 0 ? "available" : "unavailable"
                  }`}
              >
                {book.stock > 0 ? "Mevcut" : "Stokta Yok"}
              </div>
            </div>

            <div className="book-card-content">
              <h3>{book.title}</h3>

              <div className="book-meta">
                <div className="meta-item">{book.author}</div>
                <div className="meta-item">{book.category}</div>
              </div>

              <div className="book-details">
                <span className="detail-badge">{book.year}</span>
                <span className="detail-badge">{book.pages} sayfa</span>
                <span
                  className={`stock-badge ${book.stock > 0 ? "in-stock" : "out-stock"
                    }`}
                >
                  {book.stock > 0 ? `${book.stock} adet` : "Yok"}
                </span>
              </div>

              <Link className="book-detail-btn" to={`/books/${book.id}`}>
                <span>Detayları Gör</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
