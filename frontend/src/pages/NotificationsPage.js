import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/notifications.css";

export default function NotificationsPage() {
  const { notifications, deleteNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
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

  const formatDays = (d) => {
    if (d < 0) return `${Math.abs(d)} Gün Gecikti`;
    if (d === 0) return `Bugün Teslim`;
    if (d === 1) return `1 Gün Kaldı`;
    return `${d} Gün Kaldı`;
  };

  return (
    <div className="books-container">

      <div className="books-header">
        <h1>Yaklaşan Teslimler</h1>
        <p>Ödünç alınan kitapların teslim tarihlerini buradan takip edebilirsin.</p>
      </div>

      <div className="notif-list">
        {notifications.map((b) => (
          <div className="notif-card" key={b.id} style={{ position: 'relative' }}>

            <button
              onClick={() => handleDeleteClick(b.id)}
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
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e53e3e';
                e.currentTarget.style.background = '#fff5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a0aec0';
                e.currentTarget.style.background = 'transparent';
              }}
              title="Bildirimi Sil"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="notif-left">
              <img src={b.image} alt={b.title} className="notif-cover" />
              <div>
                <h3>{b.title}</h3>
                <p className="notif-author">{b.author}</p>
              </div>
            </div>

            <div className="notif-right" style={{ marginRight: '30px' }}>
              <span
                className={
                  b.daysLeft < 0
                    ? "notif-badge late"
                    : b.daysLeft <= 2
                      ? "notif-badge warning"
                      : "notif-badge ok"
                }
              >
                {formatDays(b.daysLeft)}
              </span>

              <span className="notif-date">Teslim Tarihi: {b.dueDate}</span>
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
