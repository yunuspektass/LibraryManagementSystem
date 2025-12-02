import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import "../styles/books.css";
import "../styles/home.css";
import { announcementsAPI, booksAPI } from "../services/api";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [bookData, annData] = await Promise.all([
          booksAPI.getAll(),
          announcementsAPI.getAll(),
        ]);
        setBooks(bookData || []);
        setAnnouncements(annData || []);
      } catch (err) {
        console.error("Home data load error:", err);
        setBooks((prev) => prev || []);
        setAnnouncements((prev) => prev || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = books.filter(
    (b) =>
      (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.authorName || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* HEADER */}
      <div className="home-header">
        <h1>Kitap Ara</h1>
        <p>Kütüphane koleksiyonunu hızlıca keşfet</p>
      </div>

      {/* SEARCH */}
      <div className="home-search">
        <input
          type="text"
          placeholder="Kitap adı veya yazar ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BOOKS */}
      <div className="books-grid">
        {filtered.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
            <div className="book-card-new">

              <div className="book-cover-image gradient-bg">
                <span className="book-emoji">📚</span>
              </div>

              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">{book.author}</p>

                <div className="book-meta">
                  <span>{book.year}</span>
                  <span>•</span>
                  <span>{book.pages} sayfa</span>
                </div>

                <div className={`status-badge-new ${book.isAvailable ? "available" : "borrowed"}`}>
                  {book.isAvailable ? "Mevcut" : "Ödünçte"}
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="announcements-wrapper">
        <h2 className="ann-title">📢 Duyurular</h2>

        <div className="ann-grid">
          {announcements.length === 0 ? (
            <p>Henüz duyuru yok.</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="ann-card">
                <h3>{announcement.title}</h3>
                <p className="ann-desc">{announcement.content}</p>
                <div className="ann-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  {new Date(announcement.publishedAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
