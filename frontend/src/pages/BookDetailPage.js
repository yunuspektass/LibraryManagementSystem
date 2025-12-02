import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { booksAPI, borrowRecordsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/bookDetail.css";
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

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: '1.5rem', color: '#4a5568' }}>
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

  const imageUrl = getBookImageUrl(book.title);

  return (
    <div className="detail-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button className="back-link" onClick={() => navigate(-1)} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#4a7c59', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
          ← Geri Dön
        </button>

        <div className="book-detail-card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '50px', background: 'white', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>

          {/* Sol Taraf - Kapak Resmi */}
          <div className="book-cover" style={{
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
            background: imageError || !imageUrl ? 'linear-gradient(135deg, #4a7c59 0%, #5a9d6a 100%)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!imageError && imageUrl ? (
              <img
                src={imageUrl}
                alt={book.title}
                onError={() => setImageError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ fontSize: '5rem' }}>📚</div>
            )}
          </div>

          {/* Sağ Taraf - Bilgiler */}
          <div className="book-info" style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2d3748', marginBottom: '30px', lineHeight: '1.2' }}>
              <span style={{ background: 'linear-gradient(135deg, #4a7c59 0%, #5a9d6a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {book.title}
              </span>
            </h1>

            <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>YAZAR</span>
                <span className="info-value" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748' }}>{book.authorName || 'Bilinmiyor'}</span>
              </div>

              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>KATEGORI</span>
                <span className="info-value" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748' }}>{book.categoryName || 'Bilinmiyor'}</span>
              </div>

              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>YAYIN YILI</span>
                <span className="info-value" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748' }}>{book.publicationYear || '-'}</span>
              </div>

              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>SAYFA SAYISI</span>
                <span className="info-value" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748' }}>{book.pageCount || '-'}</span>
              </div>

              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>YAYINEVI</span>
                <span className="info-value" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748' }}>{book.publisher || '-'}</span>
              </div>

              <div className="info-item">
                <span className="info-label" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>STOK DURUMU</span>
                <span className={`stock-badge ${book.availableCopies > 0 ? 'in-stock' : 'out-of-stock'}`} style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: book.availableCopies > 0 ? '#c6f6d5' : '#fed7d7',
                  color: book.availableCopies > 0 ? '#22543d' : '#822727',
                  width: 'fit-content'
                }}>
                  {book.availableCopies > 0 ? `${book.availableCopies} adet mevcut` : 'Stokta yok'}
                </span>
              </div>
            </div>

            {book.description && (
              <div className="description" style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2d3748', marginBottom: '10px' }}>Açıklama</h3>
                <p style={{ color: '#4a5568', lineHeight: '1.7' }}>{book.description}</p>
              </div>
            )}

            <div className="action-buttons" style={{ marginTop: 'auto' }}>
              {!isBorrowed ? (
                <button
                  className="borrow-btn"
                  onClick={handleBorrow}
                  disabled={book.availableCopies === 0 || loading}
                  style={{
                    background: book.availableCopies > 0 ? '#4a7c59' : '#cbd5e0',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: book.availableCopies > 0 ? 'pointer' : 'not-allowed',
                    boxShadow: book.availableCopies > 0 ? '0 4px 12px rgba(74, 124, 89, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {book.availableCopies > 0 ? 'Ödünç Al' : 'Stokta Yok'}
                </button>
              ) : (
                <button
                  className="return-btn"
                  onClick={handleReturn}
                  disabled={loading}
                  style={{
                    background: '#e53e3e',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)'
                  }}
                >
                  İade Et
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
