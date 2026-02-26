// ============ THEME HANDLING ============
function applyTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    localStorage.setItem('siteTheme', mode);
}

function applySelectedTheme() {
    const sel = document.getElementById('themeSelect');
    if (!sel) return;
    const val = sel.value;
    const mode = (val === 'Тъмна' || val === 'Dark') ? 'dark' : 'light';
    applyTheme(mode);
    showNotification((mode === 'dark' ? 'Тъмна тема приложена' : 'Светла тема приложена'), 'success');
}

function resetTheme() {
    localStorage.removeItem('siteTheme');
    applyTheme('light');
    const sel = document.getElementById('themeSelect');
    if (sel) sel.value = 'Светла';
    showNotification('Тема нулирана', 'success');
}

// ============ SETTINGS ============
function loadSettings() {
    const notifBooking = localStorage.getItem('notifBooking') !== 'false';
    const notifOffers = localStorage.getItem('notifOffers') === 'true';
    const notifSMS = localStorage.getItem('notifSMS') !== 'false';
    const theme = localStorage.getItem('theme') || 'light';
    const language = localStorage.getItem('currentLanguage') || 'bg';

    document.getElementById('notifBooking').checked = notifBooking;
    document.getElementById('notifOffers').checked = notifOffers;
    document.getElementById('notifSMS').checked = notifSMS;
    document.getElementById('themeSelect').value = theme === 'light' ? 'Светла' : 'Тъмна';
    document.getElementById('languageSelect').value = language === 'bg' ? 'Български' : 'English';

    document.getElementById('notifBooking').addEventListener('change', (e) => {
        localStorage.setItem('notifBooking', e.target.checked);
        showNotification('Настройката е запазена!', 'success');
    });
    
    document.getElementById('notifOffers').addEventListener('change', (e) => {
        localStorage.setItem('notifOffers', e.target.checked);
        showNotification('Настройката е запазена!', 'success');
    });
    
    document.getElementById('notifSMS').addEventListener('change', (e) => {
        localStorage.setItem('notifSMS', e.target.checked);
        showNotification('Настройката е запазена!', 'success');
    });
    
    document.getElementById('themeSelect').addEventListener('change', (e) => {
        localStorage.setItem('theme', e.target.value === 'Светла' ? 'light' : 'dark');
        showNotification('Тема променена!', 'success');
    });
    
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        const newLanguage = e.target.value === 'Български' ? 'bg' : 'en';
        currentLanguage = newLanguage;
        updatePageLanguage();
        
        const msgBg = 'Езикът е променен!';
        const msgEn = 'Language changed!';
        showNotification(newLanguage === 'bg' ? msgBg : msgEn, 'success');
    });
}

function changePassword() {
    const newPassword = prompt('Въведи нова пароля:', '');
    if (newPassword && newPassword.length >= 6) {
        currentUser.password = newPassword;
        saveToLocalStorage();
        showNotification('Паролата беше променена успешно!', 'success');
    } else if (newPassword) {
        showNotification('Паролата трябва да има поне 6 символа!', 'error');
    }
}

function deleteAccount() {
    if (confirm('Сигурен ли си, че искаш да изтриеш своя профил? Това действие не може да бъде отменено.')) {
        const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const newUsers = users.filter(u => u.id !== currentUser.id);
        localStorage.setItem('allUsers', JSON.stringify(newUsers));
        showNotification('Профилът беше изтрит.', 'success');
        handleLogout();
    }
}