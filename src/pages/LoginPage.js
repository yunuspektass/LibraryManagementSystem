import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("login"); // "login", "register", "staff"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Personel giriş formu
  const [staffData, setStaffData] = useState({
    staffId: "",
    password: ""
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

  // Personel form değişiklikleri
  const handleStaffChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({
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

    setLoading(true);
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
      setLoading(false);
    }
  };
   //deneme
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

    setLoading(true);
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
      setLoading(false);
    }
  };

  // Personel giriş işlemi
  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!staffData.staffId || !staffData.password) {
      setError("Lütfen tüm alanları doldurun!");
      return;
    }

    setLoading(true);
    try {
      // Personel girişi de normal login ile yapılır
      const result = await login(staffData.staffId, staffData.password);
      
      if (result.success) {
        if (result.user.role === "LibraryStaff") {
          navigate("/admin");
        } else {
          setError("Bu hesap personel hesabı değil!");
        }
      } else {
        setError(result.message || "Personel girişi başarısız!");
      }
    } catch (err) {
      setError(err.message || "Bir hata oluştu!");
    } finally {
      setLoading(false);
    }
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
         {activeTab !== "staff" && (
  <p>Hesabınıza giriş yapın veya yeni hesap oluşturun</p>
)}
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

       {activeTab !== "staff" && (
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
)}


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

            <button type="submit" className="login-btn" disabled={loading}>
              <span>{loading ? "Giriş yapılıyor..." : "Giriş Yap"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="login-footer">
              <p>Şifrenizi mi unuttunuz? <a href="#">Sıfırla</a></p>
              <p style={{ marginTop: "8px" }}>
                Personel misiniz? 
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("staff");
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  Personel Girişi
                </a>
              </p>
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

            <button type="submit" className="login-btn" disabled={loading}>
              <span>{loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}

        {/* Staff Login Form */}
        {activeTab === "staff" && (
          <form className="login-form" onSubmit={handleStaffLogin}>
          
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                name="staffId"
                placeholder="Personel ID"
                value={staffData.staffId}
                onChange={handleStaffChange}
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
                value={staffData.password}
                onChange={handleStaffChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              <span>{loading ? "Giriş yapılıyor..." : "Personel Girişi"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="login-footer">
              <p>
                Kullanıcı girişine dönmek için 
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("login");
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  buraya tıklayın
                </a>
              </p>
            </div>
          </form>
        )}
      </div>

      <div className="login-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
}