import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/bookDetail.css";

export default function BookDetailPage() {
  const { id } = useParams();

  const books = [
    { id: 1, title: "Suç ve Ceza", author: "Dostoyevski", category: "Roman", stock: 5 },
    { id: 2, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", category: "Roman", stock: 2 },
    { id: 3, title: "1984", author: "George Orwell", category: "Distopya", stock: 0 }
  ];

  const book = books.find((b) => b.id === Number(id));

  // Ödünç alma durumu
  const [isBorrowed, setIsBorrowed] = useState(false);

  const handleBorrow = () => {
    setIsBorrowed(true);
    alert("Kitap ödünç alındı!");
  };

  const handleReturn = () => {
    setIsBorrowed(false);
    alert("Kitap iade edildi!");
  };

  if (!book) {
    return <h2>Kitap bulunamadı</h2>;
  }

  return (
    <div className="detail-container">
      <h1>{book.title}</h1>
      <p><strong>Yazar:</strong> {book.author}</p>
      <p><strong>Kategori:</strong> {book.category}</p>
      <p><strong>Stok:</strong> {book.stock}</p>

      <div className="btn-area">
        {!isBorrowed ? (
          <button className="borrow-btn" onClick={handleBorrow}>Ödünç Al</button>
        ) : (
          <button className="return-btn" onClick={handleReturn}>İade Et</button>
        )}
      </div>

      <Link className="back-btn" to="/books">← Kitaplara Dön</Link>
    </div>
  );
}
