import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import "../styles/books.css";
import "../styles/home.css";
import { announcementsAPI, booksAPI } from "../services/api";

// Kitap başlığını dosya adına çeviren fonksiyon
const getImageFileName = (bookTitle) => {
  if (!bookTitle) return null;
  
  return bookTitle
    .toLowerCase()
    .trim()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

// Kitap resminin tam yolunu döndüren fonksiyon
const getBookImageUrl = (bookTitle) => {
  const fileName = getImageFileName(bookTitle);
  return fileName ? `/kitap_fotolar2/${fileName}.jpg` : null;
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (bookId) => {
    setImageErrors(prev => ({ ...prev, [bookId]: true }));
  };

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
        {filtered.map((book) => {
          const imageUrl = getBookImageUrl(book.title);
          const hasImageError = imageErrors[book.id];
          
          return (
            <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
              <div className="book-card-new">
                <div 
                  className="book-cover-image" 
                  style={{ 
                    backgroundImage: hasImageError || !imageUrl
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {imageUrl && !hasImageError && (
                    <img 
                      src={imageUrl} 
                      alt=""
                      onError={() => handleImageError(book.id)}
                      style={{ display: 'none' }}
                    />
                  )}
                  
                  {(hasImageError || !imageUrl) && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: '3rem',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {book.title?.charAt(0) || '📚'}
                    </div>
                  )}
                </div>

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.authorName}</p>

                  <div className="book-meta">
                    <span>{book.publicationYear || '-'}</span>
                    <span>•</span>
                    <span>sayfa</span>
                  </div>

                  <div className={`status-badge-new ${book.availableCopies > 0 ? "available" : "borrowed"}`}>
                    {book.availableCopies > 0 ? "Mevcut" : "Ödünçte"}
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
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
