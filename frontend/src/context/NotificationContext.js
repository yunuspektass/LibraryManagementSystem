import { createContext, useContext, useState, useEffect } from "react";
import { notificationsAPI } from "../services/api";
import { authAPI } from "../services/api";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
            if (!authAPI.isAuthenticated()) return;
            try {
                const data = await notificationsAPI.getAll();
                setNotifications(data || []);
            } catch (err) {
                console.error("Bildirimler alınamadı:", err);
            }
        };
        loadNotifications();
    }, []);

    const deleteNotification = async (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
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

    const notificationCount = notifications.filter((n) => !n.isRead).length;

    return (
        <NotificationContext.Provider value={{ notifications, borrowedBooks, notificationCount, deleteNotification, returnBook, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
