import { useState } from 'react';
import { Book, Users, Clock, Search, BookOpen, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import '../styles/landing.css';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Search className="feature-icon" />,
      title: "Kolay Arama",
      description: "Binlerce kitap arasından kolayca aradığınızı bulun"
    },
    {
      icon: <Clock className="feature-icon" />,
      title: "7/24 Erişim",
      description: "İstediğiniz zaman, istediğiniz yerden erişin"
    },
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Dijital Katalog",
      description: "Güncel ve kapsamlı kitap koleksiyonu"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Kolay Yönetim",
      description: "Ödünç alma ve iade işlemlerinizi takip edin"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Kitap" },
    { number: "5,000+", label: "Üye" },
    { number: "50+", label: "Kategori" },
    { number: "24/7", label: "Destek" }
  ];

  const sampleBooks = [
    { title: "Suç ve Ceza", author: "Fyodor Dostoyevski", emoji: "📚", color: "#4a7c59" },
    { title: "1984", author: "George Orwell", emoji: "📖", color: "#5a9d6a" },
    { title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", emoji: "📕", color: "#6aad7a" }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-container">
          <div className="nav-content">
            <div className="nav-logo">
              <div className="logo-icon">
                <Book className="logo-svg" />
              </div>
              <span className="logo-text">Kütüphane Sistemi</span>
            </div>

            {/* Desktop Menu */}
            <div className="nav-menu desktop-menu">
              <a href="#features" className="nav-link">Özellikler</a>
              <a href="#about" className="nav-link">Hakkımızda</a>
              <a href="#stats" className="nav-link">İstatistikler</a>
              <button 
                onClick={() => window.location.href = '/login'}
                className="nav-btn-primary"
              >
                Giriş Yap
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" className="mobile-nav-link">Özellikler</a>
            <a href="#about" className="mobile-nav-link">Hakkımızda</a>
            <a href="#stats" className="mobile-nav-link">İstatistikler</a>
            <button 
              onClick={() => window.location.href = '/login'}
              className="mobile-nav-btn"
            >
              Giriş Yap
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="landing-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                🎉 Dijital Kütüphane Deneyimi
              </div>
              
              <h1 className="hero-title">
                Okuma Serüveniniz
                <span className="hero-title-gradient">Burada Başlıyor</span>
              </h1>
              
              <p className="hero-description">
                Modern kütüphane sistemimizle binlerce kitaba anında ulaşın. 
                Okuma alışkanlığınızı dijital dünyada sürdürün.
              </p>

              <div className="hero-buttons">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="btn-primary"
                >
                  <span>Hemen Başla</span>
                  <ArrowRight className="btn-icon" />
                </button>
                <button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary"
                >
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-bg"></div>
              <div className="hero-card">
                {sampleBooks.map((book, index) => (
                  <div key={index} className="sample-book-item" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="sample-book-icon" style={{ background: `linear-gradient(135deg, ${book.color} 0%, ${book.color}dd 100%)` }}>
                      {book.emoji}
                    </div>
                    <div className="sample-book-info">
                      <div className="sample-book-title">{book.title}</div>
                      <div className="sample-book-author">{book.author}</div>
                    </div>
                    <CheckCircle className="sample-book-check" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="landing-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="landing-container">
          <div className="section-header">
            <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
            <p className="section-description">
              Modern teknoloji ile klasik okuma deneyimini birleştiriyoruz
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="landing-container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="about-title">Dijital Çağda Kütüphane Deneyimi</h2>
              <p className="about-description">
                Geleneksel kütüphane hizmetlerini modern teknoloji ile buluşturuyoruz. 
                Kullanıcılarımız istedikleri kitaplara kolayca ulaşabilir, ödünç alma 
                süreçlerini dijital ortamda yönetebilir ve zengin katalogumuzda gezinebilir.
              </p>
              <div className="about-features">
                <div className="about-feature-item">
                  <CheckCircle className="about-check-icon" />
                  <div>
                    <div className="about-feature-title">Kullanıcı Dostu Arayüz</div>
                    <div className="about-feature-desc">Sezgisel tasarım ile kolay kullanım</div>
                  </div>
                </div>
                <div className="about-feature-item">
                  <CheckCircle className="about-check-icon" />
                  <div>
                    <div className="about-feature-title">Personel Paneli</div>
                    <div className="about-feature-desc">Kütüphane personeli için özel yönetim araçları</div>
                  </div>
                </div>
                <div className="about-feature-item">
                  <CheckCircle className="about-check-icon" />
                  <div>
                    <div className="about-feature-title">Anlık Bildirimler</div>
                    <div className="about-feature-desc">Ödünç ve iade işlemlerinizden haberdar olun</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-card">
                <div className="about-card-item">
                  <div className="about-card-icon">
                    <Users />
                  </div>
                  <div>
                    <div className="about-card-title">Kullanıcı Hesabı</div>
                    <div className="about-card-desc">Kitap ara, ödünç al, takip et</div>
                  </div>
                </div>
                
                <div className="about-card-divider"></div>
                
                <div className="about-card-item">
                  <div className="about-card-icon">
                    <Book />
                  </div>
                  <div>
                    <div className="about-card-title">Personel Paneli</div>
                    <div className="about-card-desc">Kitap ekle, sil, ödünç yönet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="landing-container">
          <div className="cta-card">
            <h2 className="cta-title">Hemen Başlayın</h2>
            <p className="cta-description">
              Binlerce kitap ve sınırsız okuma deneyimi sizi bekliyor
            </p>
            <div className="cta-buttons">
              <button 
                onClick={() => window.location.href = '/login'}
                className="cta-btn-primary"
              >
                Üye Girişi
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="cta-btn-secondary"
              >
                Yeni Hesap Oluştur
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Book className="footer-logo-icon" />
              <span className="footer-logo-text">Kütüphane Sistemi</span>
            </div>
            <p className="footer-text">&copy; 2024 Kütüphane Sistemi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}