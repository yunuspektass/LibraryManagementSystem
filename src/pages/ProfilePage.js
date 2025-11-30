import "../styles/profile.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {
  // Kullanıcı bilgileri state
  const [user, setUser] = useState({
    firstName: "Ahmet",
    lastName: "Yılmaz",
    username: "ahmety",
    email: "ahmet@example.com",
    role: localStorage.getItem("role") || "kullanici",
  });

  // Düzenleme modu state
  const [isEditing, setIsEditing] = useState(false);

  // Form verileri için geçici state
  const [formData, setFormData] = useState({ ...user });

  // Kullanıcının baş harflerini al
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const borrowedBooks = [
    { id: 1, title: "Suç ve Ceza", author: "Dostoyevski", date: "10.11.2025" },
    { id: 3, title: "1984", author: "George Orwell", date: "05.11.2025" }
  ];

  // Düzenleme modunu aç
  const handleEditClick = () => {
    setFormData({ ...user });
    setIsEditing(true);
  };

  // Form değişikliklerini takip et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Değişiklikleri kaydet
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert("Bilgileriniz başarıyla güncellendi!");
  };

  // İptal et
  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Profil</h1>

      <div className="profile-card">
        <div className="profile-photo" data-initials={initials}>
          {initials}
        </div>

        <div className="profile-right">
          {!isEditing ? (
            <>
              <p><strong>Ad:</strong> {user.firstName}</p>
              <p><strong>Soyad:</strong> {user.lastName}</p>
              <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
              <p><strong>E-posta:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role === "admin" ? "Admin" : "Kullanıcı"}</p>

              <button className="edit-btn" onClick={handleEditClick}>
                Bilgileri Düzenle
              </button>
            </>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="firstName">Ad</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Soyad</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Kullanıcı Adı</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-buttons">
                <button className="save-btn" onClick={handleSave}>
                  Kaydet
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  İptal
                </button>
              </div>
            </div>
          )}
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
                <button className="profile-return-btn">İade Et</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
