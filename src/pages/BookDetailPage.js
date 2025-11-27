import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/bookDetail.css";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "Suç ve Ceza",
      author: "Fyodor Dostoyevski",
      category: "Roman",
      stock: 5,
      year: 1866,
      pages: 671,
      publisher: "İş Bankası Kültür Yayınları",
      description: "Suç ve Ceza, Rus yazar Fyodor Dostoyevski'nin 1866'da yayımlanan romanıdır. Eser, yoksul bir üniversite öğrencisi olan Raskolnikov'un bir tefeci kadını öldürmesi ve bunun ardından yaşadığı psikolojik çöküşü anlatır."
    },
    {
      id: 2,
      title: "Kürk Mantolu Madonna",
      author: "Sabahattin Ali",
      category: "Roman",
      stock: 2,
      year: 1943,
      pages: 176,
      publisher: "Yapı Kredi Yayınları",
      description: "Kürk Mantolu Madonna, Sabahattin Ali'nin 1943 yılında yazdığı romandır. Eser, bir ressamın geçmişte yaşadığı aşk hikayesini ve bu aşkın trajik sonunu anlatır."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      category: "Distopya",
      stock: 0,
      year: 1949,
      pages: 328,
      publisher: "Can Yayınları",
      description: "1984, George Orwell'in 1949'da yayımlanan distopik romanıdır. Totaliter bir rejimin hüküm sürdüğü gelecekte geçen roman, özgürlük, gerçek ve manipülasyon temalarını işler."
    }
  ];

  const book = books.find((b) => b.id === Number(id));

  // Ödünç alma durumu
  const [isBorrowed, setIsBorrowed] = useState(false);

  const handleBorrow = () => {
    if (book.stock > 0) {
      setIsBorrowed(true);
      alert("Kitap başarıyla ödünç alındı!");
    } else {
      alert("Bu kitap şu anda stokta yok.");
    }
  };

  const handleReturn = () => {
    setIsBorrowed(false);
    alert("Kitap başarıyla iade edildi!");
  };

  if (!book) {
    return (
      <div className="detail-container">
        <div className="not-found">
          <h2>Kitap bulunamadı</h2>
          <button className="back-link" onClick={() => navigate(-1)}>← Geri Dön</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button className="back-link" onClick={() => navigate(-1)}>← Geri Dön</button>

      <div className="book-detail-card">
        <div className="book-cover">
          <div className="book-icon">📚</div>
        </div>

        <div className="book-info">
          <h1>{book.title}</h1>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Yazar</span>
              <span className="info-value">{book.author}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Kategori</span>
              <span className="info-value">{book.category}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Yayın Yılı</span>
              <span className="info-value">{book.year}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Sayfa Sayısı</span>
              <span className="info-value">{book.pages}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Yayınevi</span>
              <span className="info-value">{book.publisher}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Stok Durumu</span>
              <span className={`stock-badge ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {book.stock > 0 ? `${book.stock} adet mevcut` : 'Stokta yok'}
              </span>
            </div>
          </div>

          <div className="description">
            <h3>Açıklama</h3>
            <p>{book.description}</p>
          </div>

          <div className="action-buttons">
            {!isBorrowed ? (
              <button
                className="borrow-btn"
                onClick={handleBorrow}
                disabled={book.stock === 0}
              >
                {book.stock > 0 ? 'Ödünç Al' : 'Stokta Yok'}
              </button>
            ) : (
              <button className="return-btn" onClick={handleReturn}>
                İade Et
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
