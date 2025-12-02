import "../styles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";

export default function ProfilePage() {
  const navigate = useNavigate();
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

  // Bildirim context'inden verileri al (ödünç alınan kitaplar olarak kullanacağız)
  const { borrowedBooks, returnBook } = useNotification();

  const [isReturnConfirmOpen, setIsReturnConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Kullanıcının baş harflerini al
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

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

  const handleReturnClick = (e, id) => {
    e.stopPropagation();
    setSelectedBookId(id);
    setIsReturnConfirmOpen(true);
  };

  const handleConfirmReturn = () => {
    if (selectedBookId) {
      returnBook(selectedBookId);
      setIsReturnConfirmOpen(false);
      setIsSuccessOpen(true);
      setSelectedBookId(null);
    }
  };

  const handleCardClick = (id, returnRequested) => {
    if (!returnRequested) {
      navigate(`/books/${id}`);
    }
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
            <div
              key={book.id}
              className="borrowed-card"
              onClick={() => handleCardClick(book.id, book.returnRequested)}
              style={{ cursor: book.returnRequested ? 'default' : 'pointer' }}
            >
              <h3>{book.title}</h3>
              <p><strong>Yazar:</strong> {book.author}</p>
              <p><strong>Alınma Tarihi:</strong> {book.borrowDate}</p>
              <p><strong>Son Teslim:</strong> {book.dueDate}</p>

              <div className="profile-btn-group">
                <button
                  className="profile-return-btn"
                  onClick={(e) => handleReturnClick(e, book.id)}
                  disabled={book.returnRequested}
                  style={book.returnRequested ? { background: '#cbd5e0', cursor: 'default' } : {}}
                >
                  {book.returnRequested ? 'Talep Alındı' : 'İade Et'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isReturnConfirmOpen}
        onClose={() => setIsReturnConfirmOpen(false)}
        onConfirm={handleConfirmReturn}
        title="İade Talebi"
        message="İade talebi oluşturmak istiyor musunuz?"
        confirmText="Evet, Oluştur"
        cancelText="İptal"
        isDanger={false}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Talep Alındı"
        message="3 gün içerisinde kütüphane personeline teslim edebilirsiniz."
      />
    </div>
  );
}
