import { useEffect, useState } from "react";
import "../styles/adminNotifications.css";
import { borrowRecordsAPI, usersAPI, booksAPI } from "../services/api";

export default function AdminNotifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await borrowRecordsAPI.getAll();
        console.log("Tüm ödünç kayıtları:", data);
        const onlyReturns = (data || []).filter((r) => r.returnRequested && !r.isReturned);
        console.log("İade talepleri:", onlyReturns);
        
        // Her talep için kullanıcı ve kitap bilgilerini çek
        const requestsWithDetails = await Promise.all(
          onlyReturns.map(async (request) => {
            try {
              const [userData, bookData] = await Promise.all([
                usersAPI.getById(request.userId),
                booksAPI.getById(request.bookId)
              ]);
              
              return {
                ...request,
                userName: `${userData.name} ${userData.surname}`,
                userEmail: userData.email,
                bookTitle: bookData.title,
                bookAuthor: bookData.authorName,
              };
            } catch (err) {
              console.error(`Detaylar alınamadı (User: ${request.userId}, Book: ${request.bookId}):`, err);
              return {
                ...request,
                userName: `Kullanıcı #${request.userId}`,
                userEmail: '-',
                bookTitle: `Kitap #${request.bookId}`,
                bookAuthor: 'Bilinmiyor',
              };
            }
          })
        );
        
        setRequests(requestsWithDetails);
      } catch (err) {
        console.error("Admin notifications error:", err);
        setError(err.message || "Bildirimler alınamadı");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      await borrowRecordsAPI.approveReturn(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message || "Onay sırasında hata oluştu");
    }
  };

  const handleReject = async (id) => {
    try {
      await borrowRecordsAPI.rejectReturn(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message || "Reddetme sırasında hata oluştu");
    }
  };

  if (loading) {
    return <div className="admin-notifications-loading">Yükleniyor...</div>;
  }

  return (
    <div className="admin-notifications-wrapper">

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Yönetici Bildirimleri</h1>
          <p>İade taleplerini buradan yönetin.</p>
        </div>
      </div>

      {error && (
        <div style={{ background: "#fee", color: "#c53030", padding: "10px", borderRadius: "8px", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      {/* Empty State */}
      {requests.length === 0 ? (
        <div className="empty-state">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt=""
          />
          <h3>Yeni iade talebi yok</h3>
          <p>Öğrencilerden gelecek talepler burada görünecek.</p>
        </div>
      ) : (
        <div className="notifications-grid">
          {requests.map((req) => (
            <div className="notif-card" key={req.id}>
              <div className="notif-icon">🔄</div>

              <div className="notif-content">
                <h3>İade Talebi</h3>

                <p className="fullname">
                  👤 {req.userName || `Kullanıcı #${req.userId}`}
                </p>

                <p className="username">📚 {req.bookTitle || `Kitap #${req.bookId}`}</p>
                <p className="username" style={{ fontSize: '0.85rem', color: '#a0aec0' }}>
                  ✍️ {req.bookAuthor || 'Bilinmiyor'}
                </p>

                <span className="badge-status return">
                  İade Talebi
                </span>

                <p className="date">📅 {new Date(req.borrowDate).toLocaleDateString()}</p>
              </div>

              <div className="notif-actions">
                <button
                  className="approve"
                  onClick={() => handleApprove(req.id)}
                >
                  Onayla
                </button>
                <button
                  className="reject"
                  onClick={() => handleReject(req.id)}
                >
                  Reddet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
