// ============ STATE MANAGEMENT ============
let currentUser = null;
let favorites = [];
let bookings = [];
let wallet = 50.00;
let transactions = [
    { type: 'add', name: 'Начален баланс', amount: 50.00, date: '20 февруари 2026' }
];
let compareList = [];
let currentLocation = null;
let userLocationMarker = null;
let currentLanguage = 'bg'; // 'bg' for Bulgarian, 'en' for English
let bookingTimers = {}; // Store timers for bookings

// Routing globals
let leafletMap = null;
let routeLine = null;
let routeStartMarker = null;
let routeEndMarker = null;

// ============ LANGUAGE TRANSLATIONS ============
const translations = {
    bg: { /* full object from original script.js */ },
    en: { /* full object from original script.js */ }
};

// ============ LOCAL STORAGE ============
function saveToLocalStorage() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('bookings', JSON.stringify(bookings));
        localStorage.setItem('wallet', wallet.toString());
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }
}

function loadFromLocalStorage() {
    const savedUser = localStorage.getItem('currentUser');
    const savedFavorites = localStorage.getItem('favorites');
    const savedBookings = localStorage.getItem('bookings');
    const savedWallet = localStorage.getItem('wallet');
    const savedTransactions = localStorage.getItem('transactions');
    const savedCompareList = localStorage.getItem('compareList');

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
        bookings = savedBookings ? JSON.parse(savedBookings) : [];
        wallet = savedWallet ? parseFloat(savedWallet) : 50.00;
        transactions = savedTransactions ? JSON.parse(savedTransactions) : [{ type: 'add', name: 'Начален баланс', amount: 50.00, date: '20 февруари 2026' }];
        compareList = savedCompareList ? JSON.parse(savedCompareList) : [];
        showApp();
    }
}

// ============ UI TRANSITIONS ============
function showApp() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    document.getElementById('userNameDisplay').textContent = currentUser.name;
    loadAllParkings();
    
    setTimeout(() => {
        renderParkingOnMap();
    }, 200);
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const tabElement = document.getElementById(tabName);
    if (tabElement) {
        tabElement.classList.add('active');
    }

    const navItem = document.querySelector(`[data-tab="${tabName}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }

    if (window.innerWidth <= 600) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }

    // Load content based on tab
    if (tabName === 'map') {
        setTimeout(() => {
            renderParkingOnMap();
        }, 100);
    } else if (tabName === 'parking-list') {
        loadAllParkings();
    } else if (tabName === 'favorites') {
        loadFavorites();
    } else if (tabName === 'bookings') {
        loadBookings();
    } else if (tabName === 'statistics') {
        loadStatistics();
    } else if (tabName === 'reviews') {
        loadReviews();
    } else if (tabName === 'wallet') {
        loadWallet();
    } else if (tabName === 'history') {
        loadHistory();
    } else if (tabName === 'news') {
        loadNews();
    } else if (tabName === 'faq') {
        loadFAQ();
    } else if (tabName === 'contact') {
        // static
    } else if (tabName === 'settings') {
        loadSettings();
    }
}

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

document.addEventListener('click', function(event) {
    if (window.innerWidth <= 600) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        if (sidebar && menuToggle && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// ============ LANGUAGE SWITCHING ============
function toggleLanguage() {
    currentLanguage = currentLanguage === 'bg' ? 'en' : 'bg';
    localStorage.setItem('currentLanguage', currentLanguage);
    
    const btn = document.getElementById('languageBtn');
    const langText = currentLanguage === 'bg' ? '🇬🇧 EN' : '🇧🇬 БГ';
    btn.innerHTML = `<i class="fas fa-globe"></i> <span style="margin-left: 5px; font-size: 0.85em;">${langText}</span>`;
    
    updatePageLanguage();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('currentLanguage', currentLanguage);
    updatePageLanguage();
    showNotification('Езикът е сменен!', 'success');
}

function updatePageLanguage() {
    localStorage.setItem('currentLanguage', currentLanguage);
    
    const t = translations[currentLanguage] || translations['bg'];
    
    document.querySelectorAll('[data-tab]').forEach(el => {
        const tabName = el.getAttribute('data-tab');
        const translateKey = tabName === 'map' ? 'map' :
                           tabName === 'parking-list' ? 'parkingList' :
                           tabName === 'favorites' ? 'favorites' :
                           tabName === 'bookings' ? 'bookings' :
                           tabName === 'statistics' ? 'statistics' :
                           tabName === 'reviews' ? 'reviews' :
                           tabName === 'wallet' ? 'wallet' :
                           tabName === 'history' ? 'history' :
                           tabName === 'news' ? 'news' :
                           tabName === 'faq' ? 'faq' :
                           tabName === 'contact' ? 'contact' :
                           tabName === 'settings' ? 'settings' : null;
        
        if (translateKey && t[translateKey]) {
            const span = el.querySelector('span');
            if (span) span.textContent = t[translateKey];
        }
    });
    
    document.querySelectorAll('.nav-section-title').forEach(el => {
        const text = el.textContent;
        if (text.includes('НАВИГАЦИЯ')) {
            el.textContent = currentLanguage === 'bg' ? 'НАВИГАЦИЯ' : 'NAVIGATION';
        } else if (text.includes('УСЛУГИ')) {
            el.textContent = currentLanguage === 'bg' ? 'УСЛУГИ' : 'SERVICES';
        } else if (text.includes('ИНФОРМАЦИЯ')) {
            el.textContent = currentLanguage === 'bg' ? 'ИНФОРМАЦИЯ' : 'INFORMATION';
        }
    });
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    const headerUpdates = [
        { selector: '#map h2', key: 'mapTitle' },
        { selector: '#parking-list h2', key: 'allParkings' },
        { selector: '#favorites h2', key: 'myFavorites' },
        { selector: '#bookings h2', key: 'myBookings' },
        { selector: '#statistics h2', key: 'myStatistics' },
        { selector: '#reviews h2', key: 'feedbackTitle' },
        { selector: '#wallet h2', key: 'myWallet' },
        { selector: '#history h2', key: 'myHistory' },
        { selector: '#news h2', key: 'news' },
        { selector: '#faq h2', key: 'faq' },
        { selector: '#contact h2', key: 'contact' },
        { selector: '#settings h2', key: 'settings' }
    ];
    
    headerUpdates.forEach(update => {
        const el = document.querySelector(update.selector);
        if (el && t[update.key]) {
            el.innerHTML = `<i class="${el.querySelector('i').className}"></i> ${t[update.key]}`;
        }
    });
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    loadAllParkings();
    
    const savedLanguage = localStorage.getItem('currentLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    const btn = document.getElementById('languageBtn');
    if (btn) {
        const langText = currentLanguage === 'bg' ? '🇬🇧 EN' : '🇧🇬 БГ';
        btn.innerHTML = `<i class="fas fa-globe"></i> <span style="margin-left: 5px; font-size: 0.85em;">${langText}</span>`;
    }
    
    updatePageLanguage();

    setTimeout(() => {
        renderParkingOnMap();
        updateWeatherWidget();
        
        getCurrentLocation()
            .then((location) => {
                console.log('Location obtained:', location);
                updateUserLocationOnMap();
                setTimeout(() => renderParkingOnMap(), 500);
            })
            .catch((error) => {
                console.log('Location not available, using default Burgas location');
                currentLocation = {
                    lat: 42.5038,
                    lng: 27.4626
                };
                updateUserLocationOnMap();
                setTimeout(() => renderParkingOnMap(), 500);
            });
    }, 300);
    
    setTimeout(() => populateNavigationSelect(), 350);
    
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = savedTheme === 'dark' ? 'Тъмна' : 'Светла';
    }
    
    setInterval(simulateAvailabilityChanges, 30000);
});