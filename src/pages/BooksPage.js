import "../styles/books.css";
import { Link } from "react-router-dom";

export default function BooksPage() {
  // Statik örnek veri (backend gelene kadar)
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

  return (
    <div className="books-container">
      <div className="books-header">
        <h1>Kitap Koleksiyonu</h1>
        <p>Kütüphanemizde bulunan tüm kitapları keşfedin</p>
      </div>

      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-card-cover">
              <div className="book-card-icon">📚</div>
              <div className={`stock-indicator ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                {book.stock > 0 ? 'Mevcut' : 'Stokta Yok'}
              </div>
            </div>

            <div className="book-card-content">
              <h3>{book.title}</h3>

              <div className="book-meta">
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{book.author}</span>
                </div>

                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{book.category}</span>
                </div>
              </div>

              <div className="book-details">
                <span className="detail-badge">{book.year}</span>
                <span className="detail-badge">{book.pages} sayfa</span>
                <span className={`stock-badge ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                  {book.stock > 0 ? `${book.stock} adet` : 'Yok'}
                </span>
              </div>

              <Link className="book-detail-btn" to={`/books/${book.id}`}>
                <span>Detayları Gör</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
