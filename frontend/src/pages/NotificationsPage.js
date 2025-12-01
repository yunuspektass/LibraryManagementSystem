import { useEffect, useState } from "react";
import "../styles/notifications.css";

export default function NotificationsPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks([
      {
        id: 1,
        title: "Suç ve Ceza",
        author: "Fyodor Dostoyevski",
        image:
          "https://m.media-amazon.com/images/I/71l2wz9eEEL._AC_UF1000,1000_QL80_.jpg",
        dueDate: "2025-02-01",
        daysLeft: -1
      },
      {
        id: 2,
        title: "Kürk Mantolu Madonna",
        author: "Sabahattin Ali",
        image:
          "https://m.media-amazon.com/images/I/81u1t0E+n0L._AC_UF1000,1000_QL80_.jpg",
        dueDate: "2025-02-03",
        daysLeft: 3
      }
    ]);
  }, []);

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
        {books.map((b) => (
          <div className="notif-card" key={b.id}>
            
            <div className="notif-left">
              <img src={b.image} alt={b.title} className="notif-cover" />
              <div>
                <h3>{b.title}</h3>
                <p className="notif-author">{b.author}</p>
              </div>
            </div>

            <div className="notif-right">
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
      </div>
    </div>
  );
}
