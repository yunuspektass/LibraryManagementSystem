# API Documentation

Bu klasör Library Management System API'si için dokümantasyon dosyalarını içerir.

## Dosyalar

### 📘 API_DOCUMENTATION.md
Tüm API endpoint'lerinin detaylı dokümantasyonu:
- Authentication endpoint'leri (Register, Login, Refresh Token)
- CRUD endpoint'leri (Author, Book, Category, User, BorrowRecord)
- Request/Response örnekleri
- Authentication ve Authorization gereksinimleri
- Hata mesajları ve durum kodları

### 🧪 API_TEST_DOCUMENTATION.md
API test senaryoları ve test verileri:
- Test environment setup
- Tüm endpoint'ler için test senaryoları
- Örnek test verileri (Authors, Books, Categories, Users, BorrowRecords)
- Test execution order
- Postman collection yapısı

## Hızlı Başlangıç

1. API sunucusunu başlatın
2. `API_DOCUMENTATION.md` dosyasını okuyarak endpoint'leri inceleyin
3. `API_TEST_DOCUMENTATION.md` dosyasındaki test senaryolarını takip ederek API'yi test edin

## Notlar

- Base URL: `https://localhost:5001/api`
- Authentication: JWT Bearer Token
- Roles: `User`, `LibraryStaff`
- Tüm tarihler ISO 8601 formatında olmalıdır

