const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5115/api';

// Token yönetimi için yardımcı fonksiyonlar
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

const removeAuthToken = () => {
  localStorage.removeItem('token');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

// HTTP isteklerini yapan temel fonksiyon
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Token süresi dolmuşsa refresh token ile yenile
    if (response.status === 401 && !options.skipRefresh) {
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Yeniden dene
        return apiRequest(endpoint, { ...options, skipRefresh: true });
      } else {
        // Refresh başarısız, logout
        removeAuthToken();
        window.location.href = '/';
        throw new Error('Oturum süresi doldu');
      }
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Bir hata oluştu');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error instanceof TypeError || error.message === 'Failed to fetch') {
      throw new Error('Sunucuya ulaşılamadı. API adresini ve bağlantınızı kontrol edin.');
    }
    throw error;
  }
};

// Token yenileme
const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await apiRequest('/Auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      skipAuth: true,
      skipRefresh: true,
    });

    if (response.isSuccess && response.token) {
      setAuthToken(response.token);
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// Authentication API
export const authAPI = {
  // Giriş
  login: async (usernameOrEmail, password) => {
    const response = await apiRequest('/Auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
      skipAuth: true,
      skipRefresh: true,
    });

    if (response.isSuccess && response.token) {
      setAuthToken(response.token);
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      // Kullanıcı bilgilerini de kaydet
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.user.role) {
          localStorage.setItem('role', response.user.role);
        }
      }
    }

    return response;
  },

  // Kayıt
  register: async (userData) => {
    const response = await apiRequest('/Auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      skipAuth: true,
      skipRefresh: true,
    });

    if (response.isSuccess && response.token) {
      setAuthToken(response.token);
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.user.role) {
          localStorage.setItem('role', response.user.role);
        }
      }
    }

    return response;
  },

  // Çıkış
  logout: () => {
    removeAuthToken();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },

  // Kullanıcı bilgisi
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Kullanıcı rolü
  getUserRole: () => {
    const user = authAPI.getCurrentUser();
    return user?.role || localStorage.getItem('role') || null;
  },

  // Giriş kontrolü
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Books API
export const booksAPI = {
  // Tüm kitapları listele
  getAll: async (filters = {}) => {
    let endpoint = '/Book';
    const params = new URLSearchParams();
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.availability && filters.availability !== 'all') params.append('availability', filters.availability);
    if (filters.categories && filters.categories.length > 0) params.append('categories', filters.categories.join(','));
    if (filters.yearFrom) params.append('yearFrom', filters.yearFrom);
    if (filters.yearTo) params.append('yearTo', filters.yearTo);
    const qs = params.toString();
    if (qs) endpoint += `?${qs}`;

    return await apiRequest(endpoint);
  },

  // Tek kitap getir
  getById: async (id) => {
    return await apiRequest(`/Book/${id}`);
  },

  // Yeni kitap ekle
  create: async (bookData) => {
    return await apiRequest('/Book', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  },

  // Kitap güncelle
  update: async (id, bookData) => {
    return await apiRequest(`/Book/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  },
};

// Authors API
export const authorsAPI = {
  // Tüm yazarları listele
  getAll: async (startDate = null, endDate = null) => {
    let endpoint = '/Author';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return await apiRequest(endpoint);
  },

  // Tek yazar getir
  getById: async (id) => {
    return await apiRequest(`/Author/${id}`);
  },

  // Yeni yazar ekle
  create: async (authorData) => {
    return await apiRequest('/Author', {
      method: 'POST',
      body: JSON.stringify(authorData),
    });
  },

  // Yazar güncelle
  update: async (id, authorData) => {
    return await apiRequest(`/Author/${id}`, {
      method: 'PUT',
      body: JSON.stringify(authorData),
    });
  },
};

// Categories API
export const categoriesAPI = {
  // Tüm kategorileri listele
  getAll: async (startDate = null, endDate = null) => {
    let endpoint = '/Category';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return await apiRequest(endpoint);
  },

  // Tek kategori getir
  getById: async (id) => {
    return await apiRequest(`/Category/${id}`);
  },

  // Yeni kategori ekle
  create: async (categoryData) => {
    return await apiRequest('/Category', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Kategori güncelle
  update: async (id, categoryData) => {
    return await apiRequest(`/Category/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },
};

// Borrow Records API
export const borrowRecordsAPI = {
  // Tüm ödünç kayıtlarını listele
  getAll: async (startDate = null, endDate = null) => {
    let endpoint = '/BorrowRecord';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return await apiRequest(endpoint);
  },

  // Tek ödünç kaydı getir
  getById: async (id) => {
    return await apiRequest(`/BorrowRecord/${id}`);
  },

  // Yeni ödünç kaydı oluştur
  create: async (borrowData) => {
    return await apiRequest('/BorrowRecord', {
      method: 'POST',
      body: JSON.stringify(borrowData),
    });
  },

  // Ödünç kaydı güncelle (iade işlemi)
  update: async (id, borrowData) => {
    return await apiRequest(`/BorrowRecord/${id}`, {
      method: 'PUT',
      body: JSON.stringify(borrowData),
    });
  },
  requestReturn: async (id) => {
    return await apiRequest(`/BorrowRecord/${id}/request-return`, {
      method: 'POST',
      body: JSON.stringify({})
    });
  },
  approveReturn: async (id) => {
    return await apiRequest(`/BorrowRecord/${id}/approve-return`, {
      method: 'POST',
      body: JSON.stringify({})
    });
  },
  rejectReturn: async (id) => {
    return await apiRequest(`/BorrowRecord/${id}/reject-return`, {
      method: 'POST',
      body: JSON.stringify({})
    });
  },
};

// Users API
export const usersAPI = {
  // Tüm kullanıcıları listele
  getAll: async (startDate = null, endDate = null) => {
    let endpoint = '/User';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) endpoint += `?${params.toString()}`;

    return await apiRequest(endpoint);
  },

  // Tek kullanıcı getir
  getById: async (id) => {
    return await apiRequest(`/User/${id}`);
  },

  // Yeni kullanıcı ekle
  create: async (userData) => {
    return await apiRequest('/User', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Kullanıcı güncelle
  update: async (id, userData) => {
    const payload = {
      ...userData,
      phone: userData.phone && userData.phone.trim().length > 0 ? userData.phone : null
    };
    return await apiRequest(`/User/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};

// ChatBot API
export const chatBotAPI = {
  // Kitap önerisi al
  getRecommendation: async (message) => {
    return await apiRequest('/ChatBot/recommend', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

// Announcements API
export const announcementsAPI = {
  getAll: async () => {
    return await apiRequest('/Announcement');
  },
  create: async (data) => {
    return await apiRequest('/Announcement', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  delete: async (id) => {
    return await apiRequest(`/Announcement/${id}`, {
      method: 'DELETE'
    });
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return await apiRequest('/Notification');
  },
  markRead: async (id) => {
    return await apiRequest(`/Notification/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: true })
    });
  },
  delete: async (id) => {
    return await apiRequest(`/Notification/${id}`, {
      method: 'DELETE'
    });
  }
};

export default {
  authAPI,
  booksAPI,
  authorsAPI,
  categoriesAPI,
  borrowRecordsAPI,
  usersAPI,
  chatBotAPI,
  announcementsAPI,
  notificationsAPI,
};
