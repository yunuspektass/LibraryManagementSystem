import React, { useState, useEffect } from "react";
import "../styles/books.css";
import { Link } from "react-router-dom";
import { booksAPI, categoriesAPI } from "../services/api";

// Kitap başlığını dosya adına çeviren fonksiyon
const getImageFileName = (bookTitle) => {
  if (!bookTitle) return null;
  
  return bookTitle
    .toLowerCase()
    .trim()
    // Türkçe karakterleri değiştir
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
    // Özel karakterleri kaldır ve boşlukları alt çizgi yap
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

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availability, setAvailability] = useState("all");
  const [yearRange, setYearRange] = useState({ from: "", to: "" });
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  // Backend'den kitapları ve kategorileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksData, categoriesData] = await Promise.all([
          booksAPI.getAll(),
          categoriesAPI.getAll()
        ]);
        
        setBooks(booksData);
        setCategories(categoriesData.map(cat => cat.name));
      } catch (err) {
        setError(err.message || "Veriler yüklenirken bir hata oluştu");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleYearChange = (e, type) => {
    setYearRange({ ...yearRange, [type]: e.target.value });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setAvailability("all");
    setYearRange({ from: "", to: "" });
    setSearchQuery("");
  };

  const handleImageError = (bookId) => {
    setImageErrors(prev => ({ ...prev, [bookId]: true }));
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.authorName && book.authorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategories.length === 0 || 
      (book.categoryName && selectedCategories.includes(book.categoryName));
    const matchesAvailability = availability === "all" ||
      (availability === "available" && book.availableCopies > 0) ||
      (availability === "borrowed" && book.availableCopies === 0);
    const bookYear = book.publicationYear || new Date(book.createdAt).getFullYear();
    const matchesYear = (!yearRange.from || bookYear >= parseInt(yearRange.from)) &&
      (!yearRange.to || bookYear <= parseInt(yearRange.to));

    return matchesSearch && matchesCategory && matchesAvailability && matchesYear;
  });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '1.5rem'
      }}>
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '1.2rem',
        color: '#c33'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div className="books-page-container">
      {/* Sidebar Filters */}
      <aside className="books-sidebar">
        <div className="filter-section">
          <h3>Kategori</h3>
          <div className="checkbox-group">
            {categories.map(category => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Durum</h3>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="availability"
                value="all"
                checked={availability === "all"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              <span>Tümü</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="availability"
                value="available"
                checked={availability === "available"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              <span>Mevcut</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="availability"
                value="borrowed"
                checked={availability === "borrowed"}
                onChange={(e) => setAvailability(e.target.value)}
              />
              <span>Ödünç Alındı</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3>Yayın Yılı</h3>
          <div className="year-inputs">
            <input
              type="number"
              placeholder="Başlangıç"
              value={yearRange.from}
              onChange={(e) => handleYearChange(e, 'from')}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Bitiş"
              value={yearRange.to}
              onChange={(e) => handleYearChange(e, 'to')}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button className="apply-btn">Filtreleri Uygula</button>
          <button className="reset-btn" onClick={resetFilters}>Sıfırla</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="books-main">
        <div className="books-header-content">
          <h1>Kitap Arama</h1>
          <p>Koleksiyonumuzdan yeni favori kitabınızı keşfedin.</p>

          <div className="search-bar-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Başlık, yazar veya ISBN ile arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="results-info">
            <span>{books.length} sonuçtan {filteredBooks.length} tanesi gösteriliyor</span>
          </div>
        </div>

        <div className="books-grid">
          {filteredBooks.map((book) => {
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
                    {/* Gizli img tag ile yükleme kontrolü */}
                    {imageUrl && !hasImageError && (
                      <img 
                        src={imageUrl} 
                        alt=""
                        onError={() => handleImageError(book.id)}
                        style={{ display: 'none' }}
                      />
                    )}
                    
                    {/* Resim yüklenemezse baş harf göster */}
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
                        {book.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.authorName || 'Yazar Bilgisi Yok'}</p>
                    <div className={`status-badge-new ${book.availableCopies > 0 ? 'available' : 'borrowed'}`}>
                      {book.availableCopies > 0 ? `Mevcut (${book.availableCopies})` : 'Ödünç Alındı'}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}