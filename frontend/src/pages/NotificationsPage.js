import { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";
import { borrowRecordsAPI, booksAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/notifications.css";

export default function NotificationsPage() {
  const { notifications, deleteNotification, markAsRead } = useNotification();
  const { user } = useAuth();
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const data = await borrowRecordsAPI.getAll();
        const mine = (data || []).filter(
          (r) => r.userId === user.id && !r.isReturned
        );
        
        // Her borrow record için kitap bilgilerini çek
        const recordsWithBookDetails = await Promise.all(
          mine.map(async (record) => {
            try {
              const bookData = await booksAPI.getById(record.bookId);
              return {
                ...record,
                bookTitle: bookData.title,
                bookAuthor: bookData.authorName,
              };
            } catch (err) {
              console.error(`Kitap bilgisi alınamadı (ID: ${record.bookId}):`, err);
              return {
                ...record,
                bookTitle: `Kitap #${record.bookId}`,
                bookAuthor: 'Bilinmiyor',
              };
            }
          })
        );
        
        setBorrowRecords(recordsWithBookDetails);
      } catch (err) {
        setError(err.message || "Kayıtlar yüklenemedi");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteNotification(selectedId);
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const handleRequestReturn = async (id) => {
    try {
      console.log("İade talebi gönderiliyor, id:", id);
      await borrowRecordsAPI.requestReturn(id);
      console.log("İade talebi başarılı");
      setBorrowRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, returnRequested: true } : r))
      );
    } catch (err) {
      console.error("İade talebi hatası:", err);
      setError(err.message || "İade talebi oluşturulamadı");
    }
  };

  return (
    <div className="books-container">

      <div className="books-header">
        <h1>Bildirimler</h1>
        <p>Duyurular ve iade talepleri</p>
      </div>

      {error && (
        <div style={{ background: "#fee", color: "#c53030", padding: "10px", borderRadius: "8px", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      {/* Borrow records section */}
      <div style={{ marginBottom: "24px" }}>
        <h2>Ödünç Aldıklarım</h2>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : borrowRecords.length === 0 ? (
          <p>Aktif ödünç kaydınız yok.</p>
        ) : (
          <div className="notif-list">
            {borrowRecords.map((r) => (
              <div className="notif-card" key={r.id} style={{ position: "relative" }}>
                <div className="notif-left">
                  <div className="notif-cover" style={{ background: "#e6f4ff" }}>
                    📘
                  </div>
                  <div>
                    <h3>{r.bookTitle || `Kitap #${r.bookId}`}</h3>
                    <p className="notif-author">{r.bookAuthor || 'Bilinmiyor'}</p>
                    <p className="notif-author">Alınma: {new Date(r.borrowDate).toLocaleDateString()}</p>
                    {r.returnDate && <p className="notif-author">İade Tarihi: {new Date(r.returnDate).toLocaleDateString()}</p>}
                  </div>
                </div>

                <div className="notif-right" style={{ marginRight: "30px" }}>
                  <span
                    className="notif-badge"
                    style={{
                      background: r.returnRequested ? "#edf2f7" : "#c6f6d5",
                      color: r.returnRequested ? "#4a5568" : "#2f855a"
                    }}
                  >
                    {r.returnRequested ? "Talep Gönderildi" : "Devam ediyor"}
                  </span>

                  <button
                    className="approve"
                    onClick={() => handleRequestReturn(r.id)}
                    disabled={r.returnRequested}
                    style={{ marginTop: "8px", cursor: r.returnRequested ? "default" : "pointer" }}
                  >
                    {r.returnRequested ? "Beklemede" : "İade Talebi Oluştur"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notifications section */}
      <div className="notif-list">
        {notifications.map((b) => (
          <div
            className="notif-card"
            key={b.id}
            style={{ position: 'relative' }}
            onClick={() => markAsRead(b.id)}
          >

          <button
            onClick={(e) => handleDeleteClick(e, b.id)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#a0aec0',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            title="Bildirimi Sil"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

            <div className="notif-left">
              <div className="notif-cover" style={{ background: b.isRead ? "#edf2f7" : "#e6fffa" }}>
                📢
              </div>
              <div>
                <h3>{b.title}</h3>
                <p className="notif-author">{b.content}</p>
              </div>
            </div>

            <div className="notif-right" style={{ marginRight: '30px' }}>
              <span
                className="notif-badge"
                style={{
                  background: b.isRead ? "#edf2f7" : "#c6f6d5",
                  color: b.isRead ? "#4a5568" : "#2f855a"
                }}
              >
                {b.isRead ? "Okundu" : "Yeni"}
              </span>
              <span className="notif-date">
                {new Date(b.createdAtUtc || b.createdAt || Date.now()).toLocaleString()}
              </span>
            </div>

          </div>
        ))}

        {notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <p>Hiç bildiriminiz yok.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Bildirimi Sil"
        message="Bu bildirimi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      />
    </div>
  );
}
