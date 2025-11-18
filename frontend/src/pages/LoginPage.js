import "../styles/login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>

      <form className="login-form">
        <input type="text" placeholder="Kullanıcı Adı" />
        <input type="password" placeholder="Şifre" />

        <button type="submit">Giriş</button>
      </form>
    </div>
  );
}
