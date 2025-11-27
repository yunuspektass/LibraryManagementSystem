
 import "../styles/notifications.css";

// Kalan gün sayısını hesaplayan yardımcı fonksiyon
const calculateDaysLeft = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  // Tarihleri aynı günün başlangıcına (saat 00:00:00) çekme
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  // Farkı milisaniye cinsinden bulma ve güne çevirme
  const differenceInTime = due.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

// Kitap kapağı yüklenemezse yedek ikon gösteren bileşen
const CoverPlaceholder = ({ title, coverUrl }) => {
    // coverUrl "example.com" içeriyorsa veya boşsa placeholder göster
    const isPlaceholder = !coverUrl || coverUrl.includes("example.com");

    if (isPlaceholder) {
        return (
            <div className="cover-placeholder">
                <span role="img" aria-label="kitap ikonu">📖</span>
            </div>
        );
    }

    // Gerçek görselin yüklenmesi
    return <img src={coverUrl} alt={`${title} Kapak`} className="cover-image" />;
};


export default function NotificationsPage() {
  // Statik örnek veri: Ödünç Alınan Kitaplar
  const borrowedBooks = [
    {
      id: 101,
      title: "The Vanishing Half",
      author: "Brit Bennett",
      coverUrl: "https://example.com/vanishing-half-cover.jpg", 
      dueDate: "2025-11-29", // (2 gün sonra, 2025-11-27 varsayımıyla)
    },
    {
      id: 102,
      title: "Circe",
      author: "Madeline Miller",
      coverUrl: "https://example.com/circe-cover.jpg", 
      dueDate: "2025-12-02", // (5 gün sonra)
    },
    {
      id: 103,
      title: "Sapiens: İnsan Türünün Kısa Bir Tarihi",
      author: "Yuval Noah Harari",
      coverUrl: "https://example.com/sapiens-cover.jpg", 
      dueDate: "2025-12-15", // (Daha uzun süre)
    },
    {
        id: 104,
        title: "Dönüşüm",
        author: "Franz Kafka",
        coverUrl: "https://example.com/donusum-cover.jpg", 
        dueDate: "2025-11-27", // (Bugün)
    },
    {
        id: 105,
        title: "Bülbülü Öldürmek",
        author: "Harper Lee",
        coverUrl: "https://example.com/bulbulu-oldurmek-cover.jpg", 
        dueDate: "2025-11-26", // (Vadesi Geçmiş)
    },
  ];

  // Kalan gün sayısına göre bildirimleri sıralama (en yakında vadesi dolanlar üstte)
  const sortedNotifications = borrowedBooks
    .map((book) => ({
      ...book,
      daysLeft: calculateDaysLeft(book.dueDate),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Yakında Vadesi Dolacaklar</h1>
        <p>Ödünç aldığınız ve teslim tarihine yaklaşan kitaplar.</p>
      </div>
      <div className="notifications-list">
        {sortedNotifications.map((notification) => {
          const { id, title, author, daysLeft, dueDate, coverUrl } = notification;

          // Gün durumuna göre renk belirleme
          let daysStyle = "due-default";
          if (daysLeft < 0) {
            daysStyle = "due-overdue"; // Kırmızı: Vadesi Geçmiş
          } else if (daysLeft <= 2) {
            daysStyle = "due-critical"; // Kırmızı: Kritik (2 gün ve altı)
          } else if (daysLeft <= 5) {
            daysStyle = "due-warning"; // Turuncu/Sarı: Uyarı (3-5 gün arası)
          }

          // Görüntülenecek gün metni
          const daysText =
            daysLeft < 0
              ? `${Math.abs(daysLeft)} Gün Geçti`
              : daysLeft === 0
              ? "Bugün Teslim"
              : `${daysLeft} Gün`;

          // Tarih formatı (Örnek: 28 Kas)
          const dateOptions = { day: "numeric", month: "short" };
          const formattedDate = new Date(dueDate).toLocaleDateString(
            "tr-TR",
            dateOptions
          ).replace(".", ""); // Bazı sistemlerdeki nokta işaretini kaldırır.

          return (
            <div key={id} className="notification-card">
              <div className="notification-cover">
                <CoverPlaceholder title={title} coverUrl={coverUrl} />
              </div>
              <div className="notification-content">
                <span className="notification-title">{title}</span>
                <span className="notification-author">{author}</span>
              </div>
              <div className="notification-due-info">
                <div className={`days-left ${daysStyle}`}>
                  {daysText}
                </div>
                <div className="due-date">{formattedDate}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}