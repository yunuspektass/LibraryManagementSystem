import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/books.css";

export default function HomePage() {
  const [search, setSearch] = useState("");

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

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

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

        <div style={{ maxWidth: "450px", margin: "20px auto 0 auto" }}>
          <input
            type="text"
            placeholder="Kitap adı veya yazar ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #cbd5e0",
              fontSize: "1rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          />
        </div>
      </div>

      {/* AŞAĞI TAMAMEN BOOKSPAGE KARTLARI */}
      <div className="books-list">
        {filtered.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-card-cover">
              <div className="book-card-icon">📚</div>

              <div
                className={`stock-indicator ${
                  book.stock > 0 ? "available" : "unavailable"
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
                  className={`stock-badge ${
                    book.stock > 0 ? "in-stock" : "out-stock"
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
