import "../styles/login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("login"); // "login", "register", "forgot-password"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      navigate(user.role === "LibraryStaff" ? "/admin" : "/home", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Giriş formu
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: ""
  });

  // Kayıt formu
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Giriş form değişiklikleri
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Kayıt form değişiklikleri
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Giriş işlemi
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.usernameOrEmail || !loginData.password) {
      setError("Lütfen tüm alanları doldurun!");
      return;
    }

    setSubmitting(true);
    try {
      const result = await login(loginData.usernameOrEmail, loginData.password);

      if (result.success) {
        // Kullanıcı rolüne göre yönlendirme
        if (result.user.role === "LibraryStaff") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError(result.message || "Giriş başarısız!");
      }
    } catch (err) {
      setError(err.message || "Bir hata oluştu!");
    } finally {
      setSubmitting(false);
    }
  };

  // Kayıt işlemi
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Form validasyonu
    if (!registerData.firstName || !registerData.lastName || !registerData.username ||
      !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError("Lütfen tüm alanları doldurun!");
      return;
    }

    // Şifre kontrolü
    if (registerData.password !== registerData.confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setError("Geçerli bir e-posta adresi girin!");
      return;
    }

    // Şifre güvenlik kontrolü
    if (registerData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    setSubmitting(true);
    try {
      const result = await register({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });

      if (result.success) {
        alert("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz.");
        navigate("/home");
      } else {
        setError(result.message || "Kayıt başarısız!");
      }
    } catch (err) {
      setError(err.message || "Bir hata oluştu!");
    } finally {
      setSubmitting(false);
    }
  };

  // Şifre Sıfırlama İşlemi
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError("Lütfen e-posta adresinizi girin!");
      return;
    }

    // Show custom popup
    setShowSuccessPopup(true);

    // Reset form
    setForgotEmail("");
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>Kütüphane Sistemi</h1>
          <p>Hesabınıza giriş yapın veya yeni hesap oluşturun</p>
          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '8px',
              marginTop: '10px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Giriş Yap
          </button>

          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Kayıt Ol
          </button>
        </div>


        {/* Login Form */}
        {activeTab === "login" && (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="text"
                name="usernameOrEmail"
                placeholder="Kullanıcı Adı veya E-posta"
                value={loginData.usernameOrEmail}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={submitting}>
              <span>{submitting ? "Giriş yapılıyor..." : "Giriş Yap"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="login-footer">
              <p>
                Şifrenizi mi unuttunuz?{" "}
                <button
                  type="button"
                  className="link-like"
                  style={{ border: "none", background: "transparent", color: "#2f855a", cursor: "pointer" }}
                  onClick={() => setActiveTab("forgot-password")}
                >
                  Sıfırla
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Forgot Password Form */}
        {activeTab === "forgot-password" && (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '8px' }}>Şifre Sıfırlama</h3>
              <p style={{ color: '#718096', fontSize: '14px' }}>
                Lütfen hesabınıza kayıtlı e-posta adresinizi girin.
              </p>
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="email"
                name="forgotEmail"
                placeholder="E-posta Adresi"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              <span>Sıfırla</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="login-footer">
              <button
                type="button"
                className="link-like"
                style={{ border: "none", background: "transparent", color: "#2f855a", cursor: "pointer" }}
                onClick={() => setActiveTab("login")}
              >
                Giriş Yap'a Dön
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form className="login-form register-form" onSubmit={handleRegister}>
            <div className="form-row">
              <div className="input-group">
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ad"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Soyad"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresi"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Şifre Tekrar"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={submitting}>
              <span>{submitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}

      </div>

      <div className="login-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="popup-title">Sıfırlama Bağlantısı Gönderildi</h3>
            <p className="popup-message">
              Şifrenizi sıfırlamak için mail adresine gelen linkten sıfırlayabilirsiniz.
            </p>
            <button
              className="popup-btn"
              onClick={() => {
                setShowSuccessPopup(false);
                setActiveTab("login");
              }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
