import "../styles/admin.css";
import { useState } from "react";

export default function AdminPage() {

  const [books, setBooks] = useState([
    { id: 1, title: "Suç ve Ceza", author: "Dostoyevski", category: "Roman", stock: 5 },
    { id: 2, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", category: "Roman", stock: 2 },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ➕ Kitap Ekle
  const handleAdd = () => {
    if (!formData.title.trim()) return alert("Kitap adı boş bırakılamaz");

    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      category: formData.category,
      stock: Number(formData.stock),
    };

    setBooks([...books, newBook]);

    // Form sıfırlama
    setFormData({ title: "", author: "", category: "", stock: "" });

    alert("Kitap başarıyla eklendi!");
  };

  // 🗑 Silme
  const handleDelete = (id) => {
    if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz?")) return;
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="admin-container">
      <div className="admin-sections">

        {/* --- Sol Form --- */}
        <div className="admin-form">
          <h2>Kitap Ekle</h2>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Kitap Adı"
          />

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            type="text"
            placeholder="Yazar"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            type="text"
            placeholder="Kategori"
          />

          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stok"
          />

          <div className="admin-buttons">
            <button className="add-btn" onClick={handleAdd}>Kitap Ekle</button>
          </div>
        </div>

        {/* --- Sağ Kitap Listesi --- */}
        <div className="admin-list">
          <h2>Mevcut Kitaplar</h2>

          <ul>
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <div className="item-info">
                  <strong>{book.title}</strong>
                  <span>Yazar: {book.author}</span>
                  <span>Stok: {book.stock}</span>
                </div>

                <button className="delete-btn" onClick={() => handleDelete(book.id)}>
                  Sil
                </button>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </div>
  );
}
