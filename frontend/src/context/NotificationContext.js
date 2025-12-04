import { createContext, useContext, useState, useEffect } from "react";
import { notificationsAPI, borrowRecordsAPI, booksAPI, authAPI } from "../services/api";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            if (!authAPI.isAuthenticated()) return;
            
            try {
                // Bildirimleri yükle
                const notifData = await notificationsAPI.getAll();
                setNotifications(notifData || []);
            } catch (err) {
                console.error("Bildirimler alınamadı:", err);
            }

            try {
                // Ödünç alınan kitapları yükle
                const borrowData = await borrowRecordsAPI.getAll();
                const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
                
                if (currentUserId) {
                    const userBorrows = (borrowData || []).filter(
                        record => record.userId === currentUserId && !record.isReturned
                    );
                    
                    // Her borrow record için kitap bilgilerini çek
                    const borrowsWithBookDetails = await Promise.all(
                        userBorrows.map(async (record) => {
                            try {
                                const bookData = await booksAPI.getById(record.bookId);
                                return {
                                    ...record,
                                    bookTitle: bookData.title,
                                    bookAuthor: bookData.authorName,
                                };
                            } catch (err) {
                                console.error(`Kitap bilgisi alınamadı (ID: ${record.bookId}):`, err);
                                return {
                                    ...record,
                                    bookTitle: `Kitap #${record.bookId}`,
                                    bookAuthor: 'Bilinmiyor',
                                };
                            }
                        })
                    );
                    
                    setBorrowedBooks(borrowsWithBookDetails);
                    console.log("Ödünç alınan kitaplar:", borrowsWithBookDetails);
                }
            } catch (err) {
                console.error("Ödünç kayıtları alınamadı:", err);
            }
        };
        
        loadData();
    }, []);

    const deleteNotification = async (id) => {
        try {
            await notificationsAPI.delete(id);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (err) {
            console.error("Bildirim silinemedi:", err);
        }
    };

    const markAsRead = async (id) => {
        try {
            await notificationsAPI.markRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
            );
        } catch (err) {
            console.error("Bildirim güncellenemedi:", err);
        }
    };

    const returnBook = (id) => {
        const updateStatus = (list) =>
            list.map((item) => {
                if (item.id === id) {
                    return { ...item, returnRequested: true };
                }
                return item;
            });

        setNotifications((prev) => updateStatus(prev));
        setBorrowedBooks((prev) => updateStatus(prev));
    };

    const refreshBorrowedBooks = async () => {
        try {
            const borrowData = await borrowRecordsAPI.getAll();
            const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
            
            if (currentUserId) {
                const userBorrows = (borrowData || []).filter(
                    record => record.userId === currentUserId && !record.isReturned
                );
                
                // Her borrow record için kitap bilgilerini çek
                const borrowsWithBookDetails = await Promise.all(
                    userBorrows.map(async (record) => {
                        try {
                            const bookData = await booksAPI.getById(record.bookId);
                            return {
                                ...record,
                                bookTitle: bookData.title,
                                bookAuthor: bookData.authorName,
                            };
                        } catch (err) {
                            console.error(`Kitap bilgisi alınamadı (ID: ${record.bookId}):`, err);
                            return {
                                ...record,
                                bookTitle: `Kitap #${record.bookId}`,
                                bookAuthor: 'Bilinmiyor',
                            };
                        }
                    })
                );
                
                setBorrowedBooks(borrowsWithBookDetails);
            }
        } catch (err) {
            console.error("Ödünç kayıtları yenilenemedi:", err);
        }
    };

    const notificationCount = notifications.filter((n) => !n.isRead).length;

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            borrowedBooks, 
            notificationCount, 
            deleteNotification, 
            returnBook, 
            markAsRead,
            refreshBorrowedBooks 
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
