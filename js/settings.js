// ============ ТЕМА - ТЪМНА/СВЕТЛА ============
function applyTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('siteTheme', 'dark');
        
        // Тъмна тема - цветове
        document.documentElement.style.setProperty('--bg-primary', '#1a1a2e');
        document.documentElement.style.setProperty('--bg-secondary', '#16213e');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#b8b8b8');
        document.documentElement.style.setProperty('--text-light', '#a0a0a0');
        document.documentElement.style.setProperty('--card-bg', '#0f3460');
        document.documentElement.style.setProperty('--border-color', '#2a2a4a');
        document.documentElement.style.setProperty('--shadow', '0 2px 10px rgba(0,0,0,0.5)');
        document.documentElement.style.setProperty('--input-bg', '#1e1e3f');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('siteTheme', 'light');
        
        // Светла тема - цветове
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f5f7fa');
        document.documentElement.style.setProperty('--text-primary', '#2c3e50');
        document.documentElement.style.setProperty('--text-secondary', '#7f8c8d');
        document.documentElement.style.setProperty('--text-light', '#7F8C8D');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#ecf0f1');
        document.documentElement.style.setProperty('--shadow', '0 2px 10px rgba(0,0,0,0.1)');
        document.documentElement.style.setProperty('--input-bg', '#ffffff');
    }
    
    // Актуализираме select полето за тема
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = mode === 'dark' ? 'Тъмна' : 'Светла';
    }
    
    // Актуализираме всички елементи, които ползват CSS променливи
    updateThemeElements();
}

function updateThemeElements() {
    // Карти
    document.querySelectorAll('.parking-card, .auth-card, .modal-content, .sidebar, .settings-section').forEach(el => {
        el.style.background = 'var(--card-bg)';
        el.style.color = 'var(--text-primary)';
    });
    
    // Текст
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label').forEach(el => {
        if (!el.closest('.btn')) {
            el.style.color = 'var(--text-primary)';
        }
    });
    
    // Input полета
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.style.background = 'var(--input-bg)';
        el.style.color = 'var(--text-primary)';
        el.style.borderColor = 'var(--border-color)';
    });
}

function applySelectedTheme() {
    const sel = document.getElementById('themeSelect');
    if (!sel) return;
    
    const val = sel.value;
    const mode = (val === 'Тъмна' || val === 'Dark') ? 'dark' : 'light';
    applyTheme(mode);
    
    showNotification(mode === 'dark' ? '🌙 Тъмна тема приложена' : '☀️ Светла тема приложена', 'success');
}

function resetTheme() {
    localStorage.removeItem('siteTheme');
    applyTheme('light');
    
    const sel = document.getElementById('themeSelect');
    if (sel) sel.value = 'Светла';
    
    showNotification('✓ Темата е нулирана към светла', 'success');
}

// ============ ЕЗИК - БЪЛГАРСКИ/АНГЛИЙСКИ ============
function toggleLanguage() {
    currentLanguage = currentLanguage === 'bg' ? 'en' : 'bg';
    localStorage.setItem('currentLanguage', currentLanguage);
    
    // Актуализираме бутона в хедъра
    updateLanguageButton();
    
    // Актуализираме select полето
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLanguage === 'bg' ? 'Български' : 'English';
    }
    
    updatePageLanguage();
    showNotification(currentLanguage === 'bg' ? '🇧🇬 Езикът е сменен на български' : '🇬🇧 Language changed to English', 'success');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('currentLanguage', lang);
    
    updateLanguageButton();
    
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = lang === 'bg' ? 'Български' : 'English';
    }
    
    updatePageLanguage();
    showNotification(lang === 'bg' ? '🇧🇬 Езикът е сменен на български' : '🇬🇧 Language changed to English', 'success');
}

function updateLanguageButton() {
    const langBtn = document.getElementById('languageBtn');
    const langBtnText = document.getElementById('languageBtnText');
    
    if (langBtn && langBtnText) {
        if (currentLanguage === 'bg') {
            langBtnText.textContent = '🇬🇧 EN';
            langBtn.title = 'Switch to English';
        } else {
            langBtnText.textContent = '🇧🇬 БГ';
            langBtn.title = 'Превключи на български';
        }
    }
}

// ============ ЗАРЕЖДАНЕ НА НАСТРОЙКИТЕ ============
function loadSettings() {
    // Зареждаме запазените настройки
    const savedTheme = localStorage.getItem('siteTheme') || 'light';
    const savedLanguage = localStorage.getItem('currentLanguage') || 'bg';
    const notifBooking = localStorage.getItem('notifBooking') !== 'false';
    const notifOffers = localStorage.getItem('notifOffers') === 'true';
    const notifSMS = localStorage.getItem('notifSMS') !== 'false';
    
    // Прилагаме темата
    applyTheme(savedTheme);
    
    // Задаваме currentLanguage
    currentLanguage = savedLanguage;
    
    // Актуализираме езиковия бутон
    updateLanguageButton();
    
    // Задаваме стойностите на полетата
    const notifBookingEl = document.getElementById('notifBooking');
    const notifOffersEl = document.getElementById('notifOffers');
    const notifSMSEl = document.getElementById('notifSMS');
    const themeSelectEl = document.getElementById('themeSelect');
    const langSelectEl = document.getElementById('languageSelect');
    
    if (notifBookingEl) notifBookingEl.checked = notifBooking;
    if (notifOffersEl) notifOffersEl.checked = notifOffers;
    if (notifSMSEl) notifSMSEl.checked = notifSMS;
    if (themeSelectEl) themeSelectEl.value = savedTheme === 'dark' ? 'Тъмна' : 'Светла';
    if (langSelectEl) langSelectEl.value = savedLanguage === 'bg' ? 'Български' : 'English';
    
    // Добавяме event listeners
    setupSettingsListeners();
    // select fields
    const themeSelectField = document.getElementById('themeSelect');
    if (themeSelectField) {
        themeSelectField.addEventListener('change', () => applySelectedTheme());
    }
    const langSelectField = document.getElementById('languageSelect');
    if (langSelectField) {
        langSelectField.addEventListener('change', (e) => {
            const lang = e.target.value; // value now 'bg' or 'en'
            changeLanguage(lang);
        });
    }
}

function setupSettingsListeners() {
    // Известия
    const notifBooking = document.getElementById('notifBooking');
    const notifOffers = document.getElementById('notifOffers');
    const notifSMS = document.getElementById('notifSMS');
    
    if (notifBooking) {
        notifBooking.addEventListener('change', (e) => {
            localStorage.setItem('notifBooking', e.target.checked);
            showNotification(e.target.checked ? '🔔 Известията са включени' : '🔕 Известията са изключени', 'success');
        });
    }
    
    if (notifOffers) {
        notifOffers.addEventListener('change', (e) => {
            localStorage.setItem('notifOffers', e.target.checked);
            showNotification(e.target.checked ? '📧 Офертите са включени' : '📧 Офертите са изключени', 'success');
        });
    }
    
    if (notifSMS) {
        notifSMS.addEventListener('change', (e) => {
            localStorage.setItem('notifSMS', e.target.checked);
            showNotification(e.target.checked ? '📱 SMS напомнянията са включени' : '📱 SMS напомнянията са изключени', 'success');
        });
    }
}

// ============ ДРУГИ ФУНКЦИИ ============
function changePassword() {
    const newPassword = prompt('Въведи нова парола:', '');
    if (newPassword && newPassword.length >= 6) {
        if (currentUser) {
            currentUser.password = newPassword;
            saveToLocalStorage();
            showNotification('🔒 Паролата беше променена успешно!', 'success');
        }
    } else if (newPassword) {
        showNotification('❌ Паролата трябва да има поне 6 символа!', 'error');
    }
}

function deleteAccount() {
    if (confirm('⚠️ Сигурен ли си, че искаш да изтриеш своя профил? Това действие не може да бъде отменено.')) {
        const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const newUsers = users.filter(u => u.id !== currentUser.id);
        localStorage.setItem('allUsers', JSON.stringify(newUsers));
        showNotification('🗑️ Профилът беше изтрит.', 'success');
        handleLogout();
    }
}