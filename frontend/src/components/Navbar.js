import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const role = localStorage.getItem("role"); // user veya admin

  return (
    <nav className="navbar">
      <h2 className="logo">Kütüphane</h2>

      <div className="nav-links">
        <Link to="/home">Ana Sayfa</Link>
        <Link to="/books">Kitaplar</Link>

        {role === "admin" ? (
          <Link to="/admin">Admin Paneli</Link>
        ) : (
          <Link to="/profile">Profil</Link>
        )}

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}
