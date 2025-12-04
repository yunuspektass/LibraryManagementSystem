import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import AdminPage from "./pages/AdminPage";
import BookDetailPage from "./pages/BookDetailPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminNotificationsPage from "./pages/AdminNotificationsPage";
import LandingPage from "./pages/LandingPage";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const LandingOrRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    return <Navigate to={user.role === "LibraryStaff" ? "/admin" : "/home"} replace />;
  }
  return <LandingPage />;
};

const LoginOrRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    return <Navigate to={user.role === "LibraryStaff" ? "/admin" : "/home"} replace />;
  }
  return <LoginPage />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>

          <Navbar />

          <Routes>
            {/* 🔹 AÇILIŞTA LANDING / LOGIN DEĞİLSE ROLE'E YÖNLEN */}
            <Route path="/" element={<LandingOrRedirect />} />

            {/* 🔹 Login sayfası */}
            <Route path="/login" element={<LoginOrRedirect />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="LibraryStaff">
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute requiredRole="LibraryStaff">
                  <AdminNotificationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
          </Routes>

        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
