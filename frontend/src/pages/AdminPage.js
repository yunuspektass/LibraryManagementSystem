import "../styles/admin.css";
import { useState, useEffect } from "react";
import { booksAPI, authorsAPI, categoriesAPI, announcementsAPI } from "../services/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("books"); // "books", "authors", "categories", "announcements"
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data states
  const [bookFormData, setBookFormData] = useState({
    title: "",
    authorId: "",
    categoryId: "",
    isbn: "",
    publishDate: "",
  });

  const [authorFormData, setAuthorFormData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    biography: "",
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });

  // Verileri yükle
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [booksData, authorsData, categoriesData, announcementsData] = await Promise.all([
        booksAPI.getAll(),
        authorsAPI.getAll(),
        categoriesAPI.getAll(),
        announcementsAPI.getAll(),
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
      setCategories(categoriesData);
      setAnnouncements(announcementsData);
    } catch (err) {
      setError(err.message || "Veriler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Kitap işlemleri
  const handleBookChange = (e) => {
    setBookFormData({ ...bookFormData, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    if (!bookFormData.title.trim() || !bookFormData.authorId || !bookFormData.categoryId || !bookFormData.isbn) {
      setError("Lütfen tüm gerekli alanları doldurun");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newBook = await booksAPI.create({
        title: bookFormData.title,
        authorId: parseInt(bookFormData.authorId),
        categoryId: parseInt(bookFormData.categoryId),
        isbn: bookFormData.isbn,
        publishDate: bookFormData.publishDate || null,
        isAvailable: true,
      });
      
      setBooks([...books, newBook]);
      setBookFormData({ title: "", authorId: "", categoryId: "", isbn: "", publishDate: "" });
      alert("Kitap başarıyla eklendi!");
    } catch (err) {
      setError(err.message || "Kitap eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Yazar işlemleri
  const handleAuthorChange = (e) => {
    setAuthorFormData({ ...authorFormData, [e.target.name]: e.target.value });
  };

  const handleAddAuthor = async () => {
    if (!authorFormData.name.trim() || !authorFormData.surname.trim()) {
      setError("Lütfen yazar adı ve soyadı girin");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newAuthor = await authorsAPI.create({
        name: authorFormData.name,
        surname: authorFormData.surname,
        birthDate: authorFormData.birthDate || null,
        biography: authorFormData.biography || null,
      });
      
      setAuthors([...authors, newAuthor]);
      setAuthorFormData({ name: "", surname: "", birthDate: "", biography: "" });
      alert("Yazar başarıyla eklendi!");
    } catch (err) {
      setError(err.message || "Yazar eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Kategori işlemleri
  const handleCategoryChange = (e) => {
    setCategoryFormData({ ...categoryFormData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    if (!categoryFormData.name.trim()) {
      setError("Lütfen kategori adı girin");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newCategory = await categoriesAPI.create({
        name: categoryFormData.name,
        description: categoryFormData.description || null,
      });
      
      setCategories([...categories, newCategory]);
      setCategoryFormData({ name: "", description: "" });
      alert("Kategori başarıyla eklendi!");
    } catch (err) {
      setError(err.message || "Kategori eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleAnnouncementChange = (e) => {
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });
  };

  const handleAddAnnouncement = async () => {
    if (!announcementForm.title.trim() || !announcementForm.content.trim()) {
      setError("Lütfen başlık ve içerik girin");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const created = await announcementsAPI.create({
        title: announcementForm.title,
        content: announcementForm.content,
      });
      setAnnouncements([created, ...announcements]);
      setAnnouncementForm({ title: "", content: "" });
      alert("Duyuru yayınlandı ve bildirimler gönderildi!");
    } catch (err) {
      setError(err.message || "Duyuru eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading && books.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '1.5rem'
      }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Yönetim Paneli</h1>
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            Kitaplar
          </button>
          <button 
            className={`tab-button ${activeTab === "authors" ? "active" : ""}`}
            onClick={() => setActiveTab("authors")}
          >
            Yazarlar
          </button>
          <button 
            className={`tab-button ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Kategoriler
          </button>
          <button 
            className={`tab-button ${activeTab === "announcements" ? "active" : ""}`}
            onClick={() => setActiveTab("announcements")}
          >
            Duyurular
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div className="admin-sections">
        {/* Kitap Yönetimi */}
        {activeTab === "books" && (
          <>
            <div className="admin-form">
              <h2>Yeni Kitap Ekle</h2>
              <input
                name="title"
                value={bookFormData.title}
                onChange={handleBookChange}
                type="text"
                placeholder="Kitap Adı *"
              />
              <select
                name="authorId"
                value={bookFormData.authorId}
                onChange={handleBookChange}
              >
                <option value="">Yazar Seçin *</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name} {author.surname}
                  </option>
                ))}
              </select>
              <select
                name="categoryId"
                value={bookFormData.categoryId}
                onChange={handleBookChange}
              >
                <option value="">Kategori Seçin *</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                name="isbn"
                value={bookFormData.isbn}
                onChange={handleBookChange}
                type="text"
                placeholder="ISBN *"
              />
              <input
                name="publishDate"
                value={bookFormData.publishDate}
                onChange={handleBookChange}
                type="date"
                placeholder="Yayın Tarihi"
              />
              <div className="admin-buttons">
                <button 
                  className="add-btn" 
                  onClick={handleAddBook}
                  disabled={loading}
                >
                  {loading ? "Ekleniyor..." : "Kitap Ekle"}
                </button>
              </div>
            </div>

            <div className="admin-list">
              <h2>Mevcut Kitaplar ({books.length})</h2>
              <ul>
                {books.map((book) => (
                  <li key={book.id} className="book-item">
                    <div className="item-info">
                      <strong>{book.title}</strong>
                      <span>Yazar: {book.authorName || 'Bilinmiyor'}</span>
                      <span>Kategori: {book.categoryName || 'Bilinmiyor'}</span>
                      <span>ISBN: {book.isbn}</span>
                      <span>Mevcut: {book.availableCopies || 0}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Yazar Yönetimi */}
        {activeTab === "authors" && (
          <>
            <div className="admin-form">
              <h2>Yeni Yazar Ekle</h2>
              <input
                name="name"
                value={authorFormData.name}
                onChange={handleAuthorChange}
                type="text"
                placeholder="Ad *"
              />
              <input
                name="surname"
                value={authorFormData.surname}
                onChange={handleAuthorChange}
                type="text"
                placeholder="Soyad *"
              />
              <input
                name="birthDate"
                value={authorFormData.birthDate}
                onChange={handleAuthorChange}
                type="date"
                placeholder="Doğum Tarihi"
              />
              <textarea
                name="biography"
                value={authorFormData.biography}
                onChange={handleAuthorChange}
                placeholder="Biyografi"
                rows="4"
              />
              <div className="admin-buttons">
                <button 
                  className="add-btn" 
                  onClick={handleAddAuthor}
                  disabled={loading}
                >
                  {loading ? "Ekleniyor..." : "Yazar Ekle"}
                </button>
              </div>
            </div>

            <div className="admin-list">
              <h2>Mevcut Yazarlar ({authors.length})</h2>
              <ul>
                {authors.map((author) => (
                  <li key={author.id} className="book-item">
                    <div className="item-info">
                      <strong>{author.name} {author.surname}</strong>
                      {author.birthDate && (
                        <span>Doğum: {new Date(author.birthDate).toLocaleDateString('tr-TR')}</span>
                      )}
                      {author.biography && (
                        <span style={{ fontSize: '0.9em', color: '#666' }}>
                          {author.biography.substring(0, 100)}...
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Kategori Yönetimi */}
        {activeTab === "categories" && (
          <>
            <div className="admin-form">
              <h2>Yeni Kategori Ekle</h2>
              <input
                name="name"
                value={categoryFormData.name}
                onChange={handleCategoryChange}
                type="text"
                placeholder="Kategori Adı *"
              />
              <textarea
                name="description"
                value={categoryFormData.description}
                onChange={handleCategoryChange}
                placeholder="Açıklama"
                rows="4"
              />
              <div className="admin-buttons">
                <button 
                  className="add-btn" 
                  onClick={handleAddCategory}
                  disabled={loading}
                >
                  {loading ? "Ekleniyor..." : "Kategori Ekle"}
                </button>
              </div>
            </div>

            <div className="admin-list">
              <h2>Mevcut Kategoriler ({categories.length})</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className="book-item">
                    <div className="item-info">
                      <strong>{category.name}</strong>
                      {category.description && (
                        <span style={{ fontSize: '0.9em', color: '#666' }}>
                          {category.description}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Duyuru Yönetimi */}
        {activeTab === "announcements" && (
          <div className="admin-section">
            <h2>Duyuru Yayınla</h2>
            <div className="form-grid">
              <div>
                <label>Başlık</label>
                <input
                  type="text"
                  name="title"
                  value={announcementForm.title}
                  onChange={handleAnnouncementChange}
                />
              </div>
              <div>
                <label>İçerik</label>
                <textarea
                  name="content"
                  rows="4"
                  value={announcementForm.content}
                  onChange={handleAnnouncementChange}
                />
              </div>
            </div>
            <button className="add-button" onClick={handleAddAnnouncement} disabled={loading}>
              {loading ? "Kaydediliyor..." : "Duyuruyu Yayınla"}
            </button>

            <h3 style={{ marginTop: "24px" }}>Yayınlanan Duyurular</h3>
            <div className="admin-list">
              {announcements.map((a) => (
                <div key={a.id} className="admin-item">
                  <div>
                    <strong>{a.title}</strong>
                    <p style={{ color: "#4a5568", marginTop: "6px" }}>{a.content}</p>
                    <small style={{ color: "#718096" }}>
                      {a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ""}
                    </small>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && (
                <p>Henüz duyuru yok.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
