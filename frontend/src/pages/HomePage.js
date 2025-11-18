import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Ana Sayfa</h1>

      <Link className="home-link" to="/books">
        Kitap Listesine Git
      </Link>
    </div>
  );
}
