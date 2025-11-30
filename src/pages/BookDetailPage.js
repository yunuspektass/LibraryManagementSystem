import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { booksAPI, borrowRecordsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/bookDetail.css";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookData = await booksAPI.getById(id);
        setBook(bookData);
      } catch (err) {
        setError(err.message || "Kitap yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    if (!book || book.availableCopies === 0) {
      alert("Bu kitap şu anda stokta yok.");
      return;
    }

    try {
      setLoading(true);
      await borrowRecordsAPI.create({
        userId: user.id,
        bookId: book.id,
        borrowDate: new Date().toISOString(),
      });
      setIsBorrowed(true);
      // Kitap bilgisini güncelle
      setBook({ ...book, availableCopies: book.availableCopies - 1 });
      alert("Kitap başarıyla ödünç alındı!");
    } catch (err) {
      alert(err.message || "Kitap ödünç alınırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    try {
      setLoading(true);
      // Kullanıcının bu kitap için aktif ödünç kaydını bul
      const records = await borrowRecordsAPI.getAll();
      const activeRecord = records.find(
        r => r.userId === user.id && r.bookId === book.id && !r.returnDate
      );

      if (activeRecord) {
        await borrowRecordsAPI.update(activeRecord.id, {
          ...activeRecord,
          returnDate: new Date().toISOString(),
        });
        setIsBorrowed(false);
        // Kitap bilgisini güncelle
        setBook({ ...book, availableCopies: book.availableCopies + 1 });
        alert("Kitap başarıyla iade edildi!");
      }
    } catch (err) {
      alert(err.message || "Kitap iade edilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

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

  if (error || !book) {
    return (
      <div className="detail-container">
        <div className="not-found">
          <h2>{error || "Kitap bulunamadı"}</h2>
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
          {book.coverImageUrl ? (
            <img src={book.coverImageUrl} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="book-icon">📚</div>
          )}
        </div>

        <div className="book-info">
          <h1>{book.title}</h1>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Yazar</span>
              <span className="info-value">{book.authorName || 'Bilinmiyor'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Kategori</span>
              <span className="info-value">{book.categoryName || 'Bilinmiyor'}</span>
            </div>

            {book.publicationYear && (
              <div className="info-item">
                <span className="info-label">Yayın Yılı</span>
                <span className="info-value">{book.publicationYear}</span>
              </div>
            )}

            {book.pageCount && (
              <div className="info-item">
                <span className="info-label">Sayfa Sayısı</span>
                <span className="info-value">{book.pageCount}</span>
              </div>
            )}

            {book.publisher && (
              <div className="info-item">
                <span className="info-label">Yayınevi</span>
                <span className="info-value">{book.publisher}</span>
              </div>
            )}

            <div className="info-item">
              <span className="info-label">ISBN</span>
              <span className="info-value">{book.isbn}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Stok Durumu</span>
              <span className={`stock-badge ${book.availableCopies > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {book.availableCopies > 0 ? `${book.availableCopies} adet mevcut` : 'Stokta yok'}
              </span>
            </div>
          </div>

          {book.description && (
            <div className="description">
              <h3>Açıklama</h3>
              <p>{book.description}</p>
            </div>
          )}

          <div className="action-buttons">
            {!isBorrowed ? (
              <button
                className="borrow-btn"
                onClick={handleBorrow}
                disabled={book.availableCopies === 0 || loading}
              >
                {book.availableCopies > 0 ? 'Ödünç Al' : 'Stokta Yok'}
              </button>
            ) : (
              <button 
                className="return-btn" 
                onClick={handleReturn}
                disabled={loading}
              >
                İade Et
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
