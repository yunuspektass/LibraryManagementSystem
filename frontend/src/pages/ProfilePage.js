import "../styles/profile.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  // Şimdilik statik bilgiler — backend gelince API'den gelecek
  const user = {
    firstName: "Ahmet",
    lastName: "Yılmaz",
    username: "ahmety",
    email: "ahmet@example.com",
    role: localStorage.getItem("role"),
  };

  const borrowedBooks = [
    { id: 1, title: "Suç ve Ceza", author: "Dostoyevski", date: "10.11.2025" },
    { id: 3, title: "1984", author: "George Orwell", date: "05.11.2025" }
  ];

  return (
    <div className="profile-container">
      <h1>Profil</h1>

      <div className="profile-card">
        <div className="profile-photo"></div>

        <div className="profile-right">
          <p><strong>Ad:</strong> {user.firstName}</p>
          <p><strong>Soyad:</strong> {user.lastName}</p>
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>E-posta:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role === "admin" ? "Admin" : "Kullanıcı"}</p>

          <button className="edit-btn">Bilgileri Düzenle</button>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Ödünç Aldığım Kitaplar</h2>

      {borrowedBooks.length === 0 ? (
        <p>Hiç ödünç aldığınız kitap yok.</p>
      ) : (
        <div className="borrowed-list">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="borrowed-card">
              <h3>{book.title}</h3>
              <p><strong>Yazar:</strong> {book.author}</p>
              <p><strong>Alınma Tarihi:</strong> {book.date}</p>

              <div className="profile-btn-group">
                <Link className="detail-btn" to={`/books/${book.id}`}>Detay</Link>
                <button className="return-btn">İade Et</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
