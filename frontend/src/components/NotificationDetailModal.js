import React from 'react';

export default function NotificationDetailModal({ isOpen, onClose, notification, onReturn }) {
    if (!isOpen || !notification) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#a0aec0',
                            padding: '5px'
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <img
                        src={notification.image}
                        alt={notification.title}
                        style={{
                            width: '100px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>

                <h3 style={{ marginBottom: '5px' }}>{notification.title}</h3>
                <p style={{ color: '#718096', marginBottom: '25px' }}>{notification.author}</p>

                <div style={{
                    background: '#f7fafc',
                    padding: '20px',
                    borderRadius: '12px',
                    display: 'grid',
                    gap: '15px',
                    textAlign: 'left',
                    marginBottom: '25px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#718096', fontSize: '0.9rem' }}>Ödünç Alma Tarihi</span>
                        <span style={{ fontWeight: '600', color: '#2d3748' }}>{notification.borrowDate}</span>
                    </div>

                    <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#718096', fontSize: '0.9rem' }}>Son Teslim Tarihi</span>
                        <span style={{ fontWeight: '600', color: '#e53e3e' }}>{notification.dueDate}</span>
                    </div>

                    <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#718096', fontSize: '0.9rem' }}>Durum</span>
                        <span className={`notif-badge ${notification.daysLeft < 0 ? 'late' : notification.daysLeft <= 2 ? 'warning' : 'ok'}`} style={{ fontSize: '0.85rem' }}>
                            {notification.daysLeft < 0
                                ? `${Math.abs(notification.daysLeft)} Gün Gecikti`
                                : notification.daysLeft === 0
                                    ? 'Bugün Teslim'
                                    : `${notification.daysLeft} Gün Kaldı`}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => onReturn(notification.id)}
                    style={{
                        background: '#e53e3e',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#c53030';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(229, 62, 62, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#e53e3e';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.3)';
                    }}
                >
                    İade Et
                </button>
            </div>
        </div>
    );
}
