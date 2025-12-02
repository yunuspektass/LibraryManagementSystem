import { useEffect, useState } from "react";
import "../styles/adminNotifications.css";

export default function AdminNotifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          bookTitle: "Suç ve Ceza",
          type: "borrow",
          date: "2025-12-02",
          user: {
            firstName: "Ali",
            lastName: "Koç",
            username: "alikoc34",
          },
        },
        {
          id: 2,
          bookTitle: "Kürk Mantolu Madonna",
          type: "return",
          date: "2025-12-01",
          user: {
            firstName: "Zeynep",
            lastName: "Demir",
            username: "zdemirr",
          },
        },
      ]);

      setLoading(false);
    }, 600);
  }, []);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
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
          <p>Ödünç alma ve iade taleplerini buradan yönetin.</p>
        </div>
      </div>

      {/* Empty State */}
      {requests.length === 0 ? (
        <div className="empty-state">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt=""
          />
          <h3>Yeni bildirim yok</h3>
          <p>Öğrencilerden gelecek talepler burada görünecek.</p>
        </div>
      ) : (
        <div className="notifications-grid">
          {requests.map((req) => (
            <div className="notif-card" key={req.id}>
              <div className="notif-icon">
                {req.type === "borrow" ? "📘" : "🔄"}
              </div>

              <div className="notif-content">
                <h3>{req.bookTitle}</h3>

                <p className="fullname">
                  {req.user.firstName} {req.user.lastName}
                </p>

                <p className="username">@{req.user.username}</p>

                <span
                  className={
                    req.type === "borrow"
                      ? "badge-status borrow"
                      : "badge-status return"
                  }
                >
                  {req.type === "borrow" ? "Ödünç Alma" : "İade Talebi"}
                </span>

                <p className="date">📅 {req.date}</p>
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
