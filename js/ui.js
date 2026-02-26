// ============ NOTIFICATIONS ============
function showNotification(message, type = 'info') {
    const bgColor = type === 'success' ? '#27AE60' : 
                   type === 'error' ? '#E74C3C' : 
                   type === 'warning' ? '#F39C12' : '#3498DB';

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        font-size: 14px;
        max-width: 350px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add animation styles for notifications
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ============ USER PROFILE MODAL ============
function openUserProfile() {
    const modal = document.getElementById('userProfileModal');
    const details = document.getElementById('userProfileDetails');

    details.innerHTML = `
        <div class="profile-section">
            <h3>Основна информация</h3>
            <div class="profile-field">
                <label>Име:</label>
                <value>${currentUser.name}</value>
            </div>
            <div class="profile-field">
                <label>Имейл:</label>
                <value>${currentUser.email}</value>
            </div>
            <div class="profile-field">
                <label>Телефон:</label>
                <value>${currentUser.phone}</value>
            </div>
            <div class="profile-field">
                <label>Член от:</label>
                <value>${currentUser.createdAt}</value>
            </div>
        </div>
        <div class="profile-section">
            <h3>Статистика</h3>
            <div class="profile-field">
                <label>Любими паркомества:</label>
                <value>${favorites.length}</value>
            </div>
            <div class="profile-field">
                <label>Активни резервации:</label>
                <value>${bookings.length}</value>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeUserProfile() {
    document.getElementById('userProfileModal').classList.remove('active');
}

function closeParkingModal() {
    document.getElementById('parkingModal').classList.remove('active');
}

// Close modals on background click
document.addEventListener('click', (e) => {
    const parkingModal = document.getElementById('parkingModal');
    const userModal = document.getElementById('userProfileModal');

    if (e.target === parkingModal) {
        parkingModal.classList.remove('active');
    }
    if (e.target === userModal) {
        userModal.classList.remove('active');
    }
});