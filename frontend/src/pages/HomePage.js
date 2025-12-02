import { useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import "../styles/books.css";
import "../styles/home.css";

export default function HomePage() {
  const [search, setSearch] = useState("");

  // Kitap verileri
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

  // Duyurular
  const announcements = [
    {
      id: 1,
      title: "Yeni Kitaplar Eklendi!",
      description: "Bu hafta koleksiyonumuza 15 yeni kitap eklendi. Hemen göz atın!",
      date: "2 Aralık 2024",
      type: "info"
    },
    {
      id: 2,
      title: "Kütüphane Bakım Çalışması",
      description: "15 Aralık tarihinde kütüphanemiz bakım nedeniyle kapalı olacaktır.",
      date: "1 Aralık 2024",
      type: "warning"
    },
    {
      id: 3,
      title: "Okuma Kulübü Toplantısı",
      description: "Bu ayın kitabı 'Suç ve Ceza'. Toplantı 10 Aralık Salı günü saat 18:00'de.",
      date: "28 Kasım 2024",
      type: "success"
    }
  ];

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

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

                <div className={`status-badge-new ${book.stock > 0 ? "available" : "borrowed"}`}>
                  {book.stock > 0 ? `Mevcut (${book.stock})` : "Stokta Yok"}
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
          {announcements.map((announcement) => (
            <div key={announcement.id} className="ann-card">

              {/* Etiket */}
              <div
                className={`ann-badge ${
                  announcement.type === "info"
                    ? "ann-info"
                    : announcement.type === "warning"
                    ? "ann-warning"
                    : "ann-success"
                }`}
              >
                {announcement.type === "info" && "📘 Bilgi"}
                {announcement.type === "warning" && "⚠️ Uyarı"}
                {announcement.type === "success" && "✅ Etkinlik"}
              </div>

              <h3>{announcement.title}</h3>
              <p className="ann-desc">{announcement.description}</p>

              <div className="ann-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                {announcement.date}
              </div>

            </div>
          ))}
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
