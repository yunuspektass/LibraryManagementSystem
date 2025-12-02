import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // Mock verileri buraya taşıdık, böylece hem Navbar hem de Sayfa erişebilir
    useEffect(() => {
        // Gerçek uygulamada burası API'den veri çeker
        const mockNotifications = [
            {
                id: 1,
                title: "Suç ve Ceza",
                author: "Fyodor Dostoyevski",
                image:
                    "https://m.media-amazon.com/images/I/71l2wz9eEEL._AC_UF1000,1000_QL80_.jpg",
                borrowDate: "2025-01-18",
                dueDate: "2025-02-01",
                daysLeft: -1
            },
            {
                id: 2,
                title: "Kürk Mantolu Madonna",
                author: "Sabahattin Ali",
                image:
                    "https://m.media-amazon.com/images/I/81u1t0E+n0L._AC_UF1000,1000_QL80_.jpg",
                borrowDate: "2025-01-20",
                dueDate: "2025-02-03",
                daysLeft: 3
            },
            // Test için 3. bir bildirim ekleyelim
            {
                id: 3,
                title: "1984",
                author: "George Orwell",
                image:
                    "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
                borrowDate: "2025-01-22",
                dueDate: "2025-02-05",
                daysLeft: 5
            }
        ];

        setNotifications(mockNotifications);
    }, []);

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const returnBook = (id) => {
        // Gerçek uygulamada burada API çağrısı yapılır
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const notificationCount = notifications.length;

    return (
        <NotificationContext.Provider value={{ notifications, notificationCount, deleteNotification, returnBook }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
