import React, { useState } from "react";
import "../styles/books.css";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availability, setAvailability] = useState("all");
  const [yearRange, setYearRange] = useState({ from: "", to: "" });

  // Statik örnek veri
  const books = [
    {
      id: 1,
      title: "Suç ve Ceza",
      author: "Fyodor Dostoyevski",
      category: "Dünya Klasikleri",
      stock: 5,
      year: 1866,
      pages: 671,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Kürk Mantolu Madonna",
      author: "Sabahattin Ali",
      category: "Dünya Klasikleri",
      stock: 2,
      year: 1943,
      pages: 176,
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      category: "Distopya",
      stock: 0,
      year: 1949,
      pages: 328,
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "Bilim",
      stock: 8,
      year: 2011,
      pages: 443,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      title: "Nutuk",
      author: "Mustafa Kemal Atatürk",
      category: "Tarih",
      stock: 12,
      year: 1927,
      pages: 543,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      title: "Steve Jobs",
      author: "Walter Isaacson",
      category: "Biyografi",
      stock: 3,
      year: 2011,
      pages: 656,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const categories = ["Bilim", "Biyografi", "Otobiyografi", "Çizgi Roman", "Felsefe", "Sanat", "Tarih", "Distopya", "Dünya Klasikleri"];

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

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(book.category);
    const matchesAvailability = availability === "all" ||
      (availability === "available" && book.stock > 0) ||
      (availability === "borrowed" && book.stock === 0);
    const matchesYear = (!yearRange.from || book.year >= parseInt(yearRange.from)) &&
      (!yearRange.to || book.year <= parseInt(yearRange.to));

    return matchesSearch && matchesCategory && matchesAvailability && matchesYear;
  });

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
          {filteredBooks.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
              <div className="book-card-new">
                <div className="book-cover-image" style={{ backgroundImage: `url(${book.cover})` }}>
                  {/* Fallback if image fails or for design */}
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <div className="book-card-footer">
                    <div className={`status-badge-new ${book.stock > 0 ? 'available' : 'borrowed'}`}>
                      {book.stock > 0 ? 'Mevcut' : 'Ödünç Alındı'}
                    </div>
                    <div className="category-badge-new">
                      {book.category}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
