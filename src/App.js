import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import AdminPage from "./pages/AdminPage";
import BookDetailPage from "./pages/BookDetailPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import NotificaionsPage from "./pages/NotificationsPage";


function App() {
  return (
    <BrowserRouter>
         <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
             <Route path="/books" element={<BooksPage />} />
             <Route path="/admin" element={<AdminPage />} />
             <Route path="/books/:id" element={<BookDetailPage />} />
             <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificaionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
