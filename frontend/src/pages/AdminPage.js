import "../styles/admin.css";

export default function AdminPage() {
  return (
    <div className="admin-container">
      <h1>Admin Paneli</h1>

      <div className="admin-sections">

        {/* Sol tarafta form */}
        <div className="admin-form">
          <h2>Kitap Ekle / Güncelle</h2>

          <input type="text" placeholder="Kitap Adı" />
          <input type="text" placeholder="Yazar" />
          <input type="text" placeholder="Kategori" />
          <input type="number" placeholder="Stok" />

          <button className="add-btn">Kitap Ekle</button>
          <button className="update-btn">Kitabı Güncelle</button>
        </div>

        {/* Sağ tarafta liste */}
        <div className="admin-list">
          <h2>Mevcut Kitaplar</h2>

          <ul>
            <li>Örnek Kitap 1 — Yazar: Test — Stok: 5 <button className="delete-btn">Sil</button></li>
            <li>Örnek Kitap 2 — Yazar: Deneme — Stok: 2 <button className="delete-btn">Sil</button></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
