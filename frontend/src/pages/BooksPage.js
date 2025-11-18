import "../styles/books.css";
import { Link } from "react-router-dom";

export default function BooksPage() {
  // Statik örnek veri (backend gelene kadar)
  const books = [
    { id: 1, title: "Suç ve Ceza", author: "Dostoyevski", category: "Roman", stock: 5 },
    { id: 2, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", category: "Roman", stock: 2 },
    { id: 3, title: "1984", author: "George Orwell", category: "Distopya", stock: 0 }
  ];

  return (
    <div className="books-container">
      <h2>Kitap Listesi</h2>

      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Yazar:</strong> {book.author}</p>
            <p><strong>Kategori:</strong> {book.category}</p>
            <p><strong>Stok:</strong> {book.stock}</p>

            <Link className="detail-btn" to={`/books/${book.id}`}>
              Detayları Gör
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
