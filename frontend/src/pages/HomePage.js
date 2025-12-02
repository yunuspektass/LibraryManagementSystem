import { useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";
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
    <div className="books-page-container" style={{ justifyContent: 'center' }}>
      <main className="books-main" style={{ maxWidth: '1200px', width: '100%', padding: '40px' }}>

        <div className="books-header-content" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #4a7c59, #5a9d6a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px"
          }}>
            Kitap Ara
          </h1>

          <div className="search-bar-container" style={{ margin: "0 auto 30px auto" }}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Kitap adı veya yazar ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="books-grid">
          {filtered.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
              <div className="book-card-new">
                <div className="book-cover-image" style={{
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '4rem' }}>📚</span>
                </div>

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>

                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '0.85rem', color: '#718096' }}>
                    <span>{book.year}</span>
                    <span>•</span>
                    <span>{book.pages} sayfa</span>
                  </div>

                  <div className={`status-badge-new ${book.stock > 0 ? "available" : "borrowed"}`}>
                    {book.stock > 0 ? `Mevcut (${book.stock})` : "Stokta Yok"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <ChatBot />
      </main>
    </div>
  );
}
