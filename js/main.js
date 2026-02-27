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
// translations object defined further down with full content

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

function showAuth() {
    // Display the authentication container and hide the main app
    document.getElementById('authContainer').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
    // ensure login form is active by default
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm && registerForm) {
        loginForm.classList.add('active-form');
        registerForm.classList.remove('active-form');
    }
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

// ============ LANGUAGE TRANSLATIONS - ПЪЛНА ВЕРСИЯ ============
const translations = {
    bg: {
        // Header & Navigation
        appTitle: 'ParkMate',
        appSubtitle: 'Умна система за паркиране',
        logout: 'Изход',
        yourLocation: 'Вие сте тук',
        // Auth
        loginTitle: 'Вход',
        loginEmailLabel: 'Email',
        loginPasswordLabel: 'Парола',
        loginButton: 'Влез',
        noAccountPrompt: 'Нямаш акаунт?',
        registerLink: 'Регистрирай се',
        registerTitle: 'Регистрация',
        registerNameLabel: 'Име',
        registerPhoneLabel: 'Телефон',
        registerPasswordLabel: 'Парола',
        registerConfirmLabel: 'Повтори парола',
        registerButton: 'Регистрирай се',
        haveAccountPrompt: 'Вече имаш акаунт?',
        loginLink: 'Влез',
        
        // Main Navigation
        navigation: 'НАВИГАЦИЯ',
        services: 'УСЛУГИ',
        information: 'ИНФОРМАЦИЯ',
        map: 'Карта',
        parkingList: 'Паркоместа',
        favorites: 'Любими',
        bookings: 'Резервации',
        statistics: 'Статистика',
        reviews: 'Отзиви',
        wallet: 'Портфейл',
        history: 'История',
        news: 'Новини',
        faq: 'ЧЗВ',
        contact: 'Контакт',
        settings: 'Настройки',
        
        // Map Section
        mapTitle: 'Карта на Бургас',
        weather: 'Времето',
        myLocation: 'Моето местоположение',
        legend: 'Легенда',
        freeParkings: 'Свободен паркинг',
        fullParkings: 'Пълен паркинг',
        reservedParkings: 'Резервиран паркинг',
        
        // Parking List Section
        allParkings: 'Всички паркоместа в Бургас',
        findPerfect: 'Намерете идеалното място за вашия автомобил',
        search: 'Търси паркинг',
        searchPlaceholder: 'Въведи название на паркинг...',
        filterStatus: 'Филтрирай по статус',
        allStatus: 'Всички статуси',
        available: 'Свободни',
        full: 'Пълни',
        reserved: 'Резервирани',
        maxPrice: 'Макс. цена (BGN/час)',
        priceHint: 'Напр. 5.00',
        noParkings: 'Не намерихме паркоместа, които търсите',
        tryOther: 'Опитайте с други критерии за търсене',
        
        // Parking Details
        spots: 'места',
        hour: 'час',
        amenities: 'Удобства',
        description: 'Описание',
        directions: 'Посока до паркинга',
        distance: 'разстояние',
        byCar: 'с кола',
        walking: 'пеша',
        details: 'Детайли',
        reserve: 'Резервирай',
        freeSpots: 'Свободни места',
        perHour: 'На час',
    reviews: 'Отзиви',
        
        // Favorites Section
        myFavorites: 'Любимите ми паркоместа',
        favoriteDesc: 'Паркоместата, които сте отбелязали като любими',
        noFavorites: 'Все още нямате любими паркоместа',
        markFavorites: 'Отбележете паркоместата с',
        inList: 'в списъка',
        
        // Bookings Section
        myBookings: 'Моите резервации',
        bookingsDesc: 'Активни резервации и предстоящи паркирания',
        activeCount: 'Активни резервации',
        totalHours: 'Общо резервирани часове',
        noActiveBookings: 'Все още нямате активни резервации',
        goToParking: 'Преминете към Паркоместа, за да резервирате',
        
        // Booking Form
        bookingDate: 'Дата',
        duration: 'Продължителност',
        price: 'Цена',
        status: 'Статус',
        active: 'Активна',
        completed: 'Завършена',
        cancelled: 'Отменена',
        cancel: 'Отмени',
        cancelBooking: 'Отмяна на резервация',
        cancelConfirm: 'Сигурни ли сте, че искате да отмените тази резервация?',
        bookingCancelled: 'Резервацията е отменена!',
        timeRemaining: 'Време до края',
        
        // Statistics Section
        myStatistics: 'Моята статистика',
        statsDesc: 'Преглед на вашите паркинг дейности',
        totalBookings: 'Общо резервации',
        madeBookings: 'Брой направени резервации',
        totalSpent: 'Общи разходи',
        spentOnParking: 'Похарчени за паркиране',
        totalHoursParking: 'Часове паркинг',
        hoursSpent: 'Използвани часове',
        avgRating: 'Среден рейтинг',
        onParkings: 'На посетените паркинги',
        
        // Reviews Section
        feedbackTitle: 'Отзиви и обратна връзка',
        reviewDesc: 'Вижте отзивите и споделете вашето мнение',
        appFeedback: 'Обратна връзка за приложението',
        shareFeedback: 'Споделете вашето мнение, предложения или проблеми...',
        sendFeedback: 'Изпрати обратна връзка',
        writeReview: 'Напиши отзив за паркинг',
        feedbackSent: 'Обратната връзка е изпратена успешно!',
        thanksFeedback: 'Благодарим за обратната връзка! Вашето мнение е важно за нас.',
        rating: 'Рейтинг',
        yourReview: 'Вашият отзив',
        submitReview: 'Изпрати отзив',
        
        // Wallet Section
        myWallet: 'Портфейл',
        walletDesc: 'Управление на вашите средства и транзакции',
        yourBalance: 'Вашият баланс',
        addFunds: 'Добави средства',
        transactionHistory: 'История на транзакциите',
        accountActive: 'Вашата сметка е активна и готова за ползване',
        noTransactions: 'Няма транзакции',
        
        // History Section
        bookingHistory: 'История на резервации',
        allCompleted: 'Всички ваши завършени паркирания',
        completedCount: 'Завършени паркирания',
        avgHistoryRating: 'Среден рейтинг',
        
        // News Section
        newsTitle: 'Новини за Бургас',
        newsDesc: 'Запознайте се с последните новини за паркирането',
        readMore: 'Прочети повече →',
        
        // FAQ Section
        faqTitle: 'Често задавани въпроси',
        faqDesc: 'Отговори на най-честите въпроси',
        
        // Contact Section
        contactTitle: 'Контакт с нас',
        contactDesc: 'Имате въпрос? Свържете се с нас',
        phone: 'Телефон',
        phoneHours: 'Пн-Пт: 9:00 - 18:00',
        email: 'Имейл',
        emailReply: 'Отговор в рамките на 24ч',
        office: 'Офис',
        officeAddress: 'ул. "Александър Батенберг" 1',
        officeCity: 'Бургас 8000',
        workHours: 'Работно време',
        weekdays: 'Пн-Пт: 9:00 - 18:00',
        weekends: 'Съб-Нд: 10:00 - 16:00',
        sendMessage: 'Изпрати съобщение',
        yourName: 'Вашето име',
        namePlaceholder: 'Иван Петров',
        emailPlaceholder: 'your@email.com',
        subject: 'Тема',
        subjectPlaceholder: 'Тема на съобщението',
        message: 'Съобщение',
        messagePlaceholder: 'Вашето съобщение...',
        send: 'Изпрати',
        
        // Settings Section
        settingsTitle: 'Настройки',
        settingsDesc: 'Персонализирайте вашия профил и предпочитания',
        notifications: 'Уведомления',
        notifBooking: 'Уведомления при резервация',
        notifBookingDesc: 'Получавайте известия за вашите резервации',
        notifOffers: 'Email оферти',
        notifOffersDesc: 'Получавайте специални оферти и намаления',
        notifSMS: 'SMS напомняния',
        notifSMSDesc: 'SMS напомняния преди паркирането',
        visualSettings: 'Визуални настройки',
        theme: 'Тема',
        chooseTheme: 'Изберете предпочитаната визуална тема',
        light: 'Светла',
        dark: 'Тъмна',
        apply: 'Приложи',
        reset: 'Нулирай',
        language: 'Език',
        chooseLanguage: 'Изберете предпочитания език',
        security: 'Сигурност на акаунта',
        changePassword: 'Смени парола',
        profileData: 'Профилни данни',
        deleteProfile: 'Изтрий профил',
        
        // Buttons
        save: 'Запази',
        close: 'Затвори',
        confirm: 'Потвърди',
        
        // Messages
        settingsSaved: 'Настройките са запазени!',
        themeChanged: 'Темата е променена!',
        languageChanged: 'Езикът е променен!',
        success: 'Успешно!',
        error: 'Грешка!',
        warning: 'Внимание!',
        info: 'Информация',
        timerExpired: 'Времето за резервацията изтече!',
        locationUpdated: 'Местоположението е обновено!',
        locationError: 'Не можахме да получим вашето местоположение. Моля, разрешете достъп до локацията.',
        bookingSuccess: 'Резервацията е успешна!',
        bookingFailed: 'Резервацията не успя!',
        
        // Weather
        sunny: 'Слънчево',
        cloudy: 'Облачно',
        rainy: 'Дъждовно',
        clear: 'Ясно',
        wind: 'Вятър',
        humidity: 'Влажност',
        visibility: 'Видимост',
        pressure: 'Налягане',
        rain: 'Дъжд',
        uvIndex: 'UV индекс',
        low: 'Нисък',
        medium: 'Среден',
        high: 'Висок',
        
        // Navigation
        navigate: 'Навигация',
        start: 'Старт',
        destination: 'Дестинация',
        clear: 'Изчисти',
        
        // Compare
        compare: 'Сравни',
        compareParkings: 'Сравнение на паркинги',
        characteristic: 'Характеристика',
        location: 'Локация',
        pricePerHour: 'Цена/час',
        totalSpots: 'Общо места',
        availableSpots: 'Свободни места',
        rating: 'Рейтинг',
        amenities: 'Удобства',
        maxCompare: 'Можете да сравнявате максимум 3 паркинга!',
        addedToCompare: 'Добавено за сравнение!',
        removedFromCompare: 'Премахнато от сравнение!',
        compareCleared: 'Сравнението е изчистено!'
    },
    
    en: {
        // Header & Navigation
        appTitle: 'ParkMate',
        appSubtitle: 'Smart Parking System',
        logout: 'Logout',
        yourLocation: 'You are here',
        // Auth
        loginTitle: 'Login',
        loginEmailLabel: 'Email',
        loginPasswordLabel: 'Password',
        loginButton: 'Log In',
        noAccountPrompt: 'Don\'t have an account?',
        registerLink: 'Register',
        registerTitle: 'Register',
        registerNameLabel: 'Name',
        registerPhoneLabel: 'Phone',
        registerPasswordLabel: 'Password',
        registerConfirmLabel: 'Confirm Password',
        registerButton: 'Register',
        haveAccountPrompt: 'Already have an account?',
        loginLink: 'Log In',
        
        // Main Navigation
        navigation: 'NAVIGATION',
        services: 'SERVICES',
        information: 'INFORMATION',
        map: 'Map',
        parkingList: 'Parkings',
        favorites: 'Favorites',
        bookings: 'Bookings',
        statistics: 'Statistics',
        reviews: 'Reviews',
        wallet: 'Wallet',
        history: 'History',
        news: 'News',
        faq: 'FAQ',
        contact: 'Contact',
        settings: 'Settings',
        
        // Map Section
        mapTitle: 'Map of Burgas',
        weather: 'Weather',
        myLocation: 'My Location',
        legend: 'Legend',
        freeParkings: 'Free parking',
        fullParkings: 'Full parking',
        reservedParkings: 'Reserved parking',
        
        // Parking List Section
        allParkings: 'All Parkings in Burgas',
        findPerfect: 'Find the perfect spot for your car',
        search: 'Search Parking',
        searchPlaceholder: 'Enter parking name...',
        filterStatus: 'Filter by Status',
        allStatus: 'All Statuses',
        available: 'Available',
        full: 'Full',
        reserved: 'Reserved',
        maxPrice: 'Max Price (BGN/hour)',
        priceHint: 'e.g. 5.00',
        noParkings: 'No parkings found matching your criteria',
        tryOther: 'Try with different search criteria',
        
        // Parking Details
        spots: 'spots',
        hour: 'hour',
        amenities: 'Amenities',
        description: 'Description',
        directions: 'Directions to Parking',
        distance: 'distance',
        byCar: 'by car',
        walking: 'walking',
        details: 'Details',
        reserve: 'Reserve',
        freeSpots: 'Free spots',
        perHour: 'Per hour',
        reviews: 'reviews',
        
        // Favorites Section
        myFavorites: 'My Favorite Parkings',
        favoriteDesc: 'Parkings you have marked as favorites',
        noFavorites: 'You have no favorite parkings yet',
        markFavorites: 'Mark parkings with',
        inList: 'in the list',
        
        // Bookings Section
        myBookings: 'My Bookings',
        bookingsDesc: 'Active reservations and upcoming parkings',
        activeCount: 'Active Bookings',
        totalHours: 'Total Reserved Hours',
        noActiveBookings: 'You have no active bookings yet',
        goToParking: 'Go to Parkings to make a reservation',
        
        // Booking Form
        bookingDate: 'Date',
        duration: 'Duration',
        price: 'Price',
        status: 'Status',
        active: 'Active',
        completed: 'Completed',
        cancelled: 'Cancelled',
        cancel: 'Cancel',
        cancelBooking: 'Cancel Booking',
        cancelConfirm: 'Are you sure you want to cancel this booking?',
        bookingCancelled: 'Booking cancelled!',
        timeRemaining: 'Time remaining',
        
        // Statistics Section
        myStatistics: 'My Statistics',
        statsDesc: 'Overview of your parking activities',
        totalBookings: 'Total Bookings',
        madeBookings: 'Number of bookings made',
        totalSpent: 'Total Spent',
        spentOnParking: 'Spent on parking',
        totalHoursParking: 'Parking Hours',
        hoursSpent: 'Hours spent',
        avgRating: 'Average Rating',
        onParkings: 'Of visited parkings',
        
        // Reviews Section
        feedbackTitle: 'Reviews and Feedback',
        reviewDesc: 'See reviews and share your opinion',
        appFeedback: 'App Feedback',
        shareFeedback: 'Share your opinion, suggestions or issues...',
        sendFeedback: 'Send Feedback',
        writeReview: 'Write a review',
        feedbackSent: 'Feedback sent successfully!',
        thanksFeedback: 'Thank you for your feedback! Your opinion is important to us.',
        rating: 'Rating',
        yourReview: 'Your review',
        submitReview: 'Submit Review',
        
        // Wallet Section
        myWallet: 'Wallet',
        walletDesc: 'Manage your funds and transactions',
        yourBalance: 'Your Balance',
        addFunds: 'Add Funds',
        transactionHistory: 'Transaction History',
        accountActive: 'Your account is active and ready to use',
        noTransactions: 'No transactions',
        
        // History Section
        bookingHistory: 'Booking History',
        allCompleted: 'All your completed parkings',
        completedCount: 'Completed Parkings',
        avgHistoryRating: 'Average Rating',
        
        // News Section
        newsTitle: 'News about Burgas',
        newsDesc: 'Stay updated with the latest parking news',
        readMore: 'Read more →',
        
        // FAQ Section
        faqTitle: 'Frequently Asked Questions',
        faqDesc: 'Answers to the most common questions',
        
        // Contact Section
        contactTitle: 'Contact Us',
        contactDesc: 'Have a question? Contact us',
        phone: 'Phone',
        phoneHours: 'Mon-Fri: 9:00 - 18:00',
        email: 'Email',
        emailReply: 'Response within 24h',
        office: 'Office',
        officeAddress: '"Alexander Battenberg" Street 1',
        officeCity: 'Burgas 8000',
        workHours: 'Working Hours',
        weekdays: 'Mon-Fri: 9:00 - 18:00',
        weekends: 'Sat-Sun: 10:00 - 16:00',
        sendMessage: 'Send Message',
        yourName: 'Your Name',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'your@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'Subject of the message',
        message: 'Message',
        messagePlaceholder: 'Your message...',
        send: 'Send',
        
        // Settings Section
        settingsTitle: 'Settings',
        settingsDesc: 'Customize your profile and preferences',
        notifications: 'Notifications',
        notifBooking: 'Booking Notifications',
        notifBookingDesc: 'Get notified about your bookings',
        notifOffers: 'Email Offers',
        notifOffersDesc: 'Receive special offers and discounts',
        notifSMS: 'SMS Reminders',
        notifSMSDesc: 'SMS reminders before parking',
        visualSettings: 'Visual Settings',
        theme: 'Theme',
        chooseTheme: 'Choose your preferred visual theme',
        light: 'Light',
        dark: 'Dark',
        apply: 'Apply',
        reset: 'Reset',
        language: 'Language',
        chooseLanguage: 'Choose your preferred language',
        security: 'Account Security',
        changePassword: 'Change Password',
        profileData: 'Profile Data',
        deleteProfile: 'Delete Profile',
        
        // Buttons
        save: 'Save',
        close: 'Close',
        confirm: 'Confirm',
        
        // Messages
        settingsSaved: 'Settings saved!',
        themeChanged: 'Theme changed!',
        languageChanged: 'Language changed!',
        success: 'Success!',
        error: 'Error!',
        warning: 'Warning!',
        info: 'Info',
        timerExpired: 'Booking time has expired!',
        locationUpdated: 'Location updated!',
        locationError: 'Could not get your location. Please allow location access.',
        bookingSuccess: 'Booking successful!',
        bookingFailed: 'Booking failed!',
        
        // Weather
        sunny: 'Sunny',
        cloudy: 'Cloudy',
        rainy: 'Rainy',
        clear: 'Clear',
        wind: 'Wind',
        humidity: 'Humidity',
        visibility: 'Visibility',
        pressure: 'Pressure',
        rain: 'Rain',
        uvIndex: 'UV Index',
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        
        // Navigation
        navigate: 'Navigation',
        start: 'Start',
        destination: 'Destination',
        clear: 'Clear',
        
        // Compare
        compare: 'Compare',
        compareParkings: 'Compare Parkings',
        characteristic: 'Characteristic',
        location: 'Location',
        pricePerHour: 'Price/Hour',
        totalSpots: 'Total Spots',
        availableSpots: 'Available Spots',
        rating: 'Rating',
        amenities: 'Amenities',
        maxCompare: 'You can compare up to 3 parkings!',
        addedToCompare: 'Added to compare!',
        removedFromCompare: 'Removed from compare!',
        compareCleared: 'Compare cleared!'
    }
};
function updatePageLanguage() {
    const t = translations[currentLanguage] || translations['bg'];
    
    // 1. Header
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay && currentUser) {
        // Името остава на български, не се превежда
    }
    
    // 1a. Auth forms (login/register)
    const loginEmailLbl = document.querySelector('label[for="loginEmail"]');
    if (loginEmailLbl) loginEmailLbl.innerHTML = `<i class="fas fa-envelope"></i> ${t.loginEmailLabel}`;
    const loginPasswordLbl = document.querySelector('label[for="loginPassword"]');
    if (loginPasswordLbl) loginPasswordLbl.innerHTML = `<i class="fas fa-lock"></i> ${t.loginPasswordLabel}`;
    const loginBtn = document.querySelector('#loginFormElement button[type="submit"]');
    if (loginBtn) loginBtn.textContent = t.loginButton;
    const loginFooterP = document.querySelector('#loginForm .auth-footer p');
    if (loginFooterP) loginFooterP.innerHTML = `${t.noAccountPrompt} <a href="#" onclick="toggleForms()">${t.registerLink}</a>`;

    const registerNameLbl = document.querySelector('label[for="registerName"]');
    if (registerNameLbl) registerNameLbl.innerHTML = `<i class="fas fa-user"></i> ${t.registerNameLabel}`;
    const registerEmailLbl = document.querySelector('label[for="registerEmail"]');
    if (registerEmailLbl) registerEmailLbl.innerHTML = `<i class="fas fa-envelope"></i> ${t.loginEmailLabel}`;
    const registerPhoneLbl = document.querySelector('label[for="registerPhone"]');
    if (registerPhoneLbl) registerPhoneLbl.innerHTML = `<i class="fas fa-phone"></i> ${t.registerPhoneLabel}`;
    const registerPasswordLbl = document.querySelector('label[for="registerPassword"]');
    if (registerPasswordLbl) registerPasswordLbl.innerHTML = `<i class="fas fa-lock"></i> ${t.registerPasswordLabel}`;
    const registerConfirmLbl = document.querySelector('label[for="registerConfirm"]');
    if (registerConfirmLbl) registerConfirmLbl.innerHTML = `<i class="fas fa-lock"></i> ${t.registerConfirmLabel}`;
    const registerBtn = document.querySelector('#registerFormElement button[type="submit"]');
    if (registerBtn) registerBtn.textContent = t.registerButton;
    const registerFooterP = document.querySelector('#registerForm .auth-footer p');
    if (registerFooterP) registerFooterP.innerHTML = `${t.haveAccountPrompt} <a href="#" onclick="toggleForms()">${t.loginLink}</a>`;

    const authTitles = document.querySelectorAll('.auth-header h1');
    authTitles.forEach(el => {
        const icon = el.querySelector('i');
        if (icon) {
            el.innerHTML = `<i class="${icon.className}"></i> ${t.appTitle}`;
        } else {
            el.textContent = t.appTitle;
        }
    });

    const authSubtitles = document.querySelectorAll('.auth-header p');
    authSubtitles.forEach(el => el.textContent = t.appSubtitle);
    
    // 2. Navigation section titles
    document.querySelectorAll('.nav-section-title').forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('НАВИГАЦИЯ') || text.includes('NAVIGATION')) {
            el.textContent = t.navigation;
        } else if (text.includes('УСЛУГИ') || text.includes('SERVICES')) {
            el.textContent = t.services;
        } else if (text.includes('ИНФОРМАЦИЯ') || text.includes('INFORMATION')) {
            el.textContent = t.information;
        }
    });
    
    // 3. Navigation items
    document.querySelectorAll('[data-tab]').forEach(el => {
        const tabName = el.getAttribute('data-tab');
        const translateKey = {
            'map': 'map',
            'parking-list': 'parkingList',
            'favorites': 'favorites',
            'bookings': 'bookings',
            'statistics': 'statistics',
            'reviews': 'reviews',
            'wallet': 'wallet',
            'history': 'history',
            'faq': 'faq',
            'contact': 'contact',
            'settings': 'settings'
        }[tabName];
        
        if (translateKey && t[translateKey]) {
            const span = el.querySelector('span');
            if (span) span.textContent = t[translateKey];
        }
    });
    
    // 4. Section headers
    const headerUpdates = [
        { selector: '#map h2', key: 'mapTitle' },
        { selector: '#parking-list h2', key: 'allParkings' },
        { selector: '#parking-list p', key: 'findPerfect' },
        { selector: '#favorites h2', key: 'myFavorites' },
        { selector: '#favorites p', key: 'favoriteDesc' },
        { selector: '#bookings h2', key: 'myBookings' },
        { selector: '#bookings p', key: 'bookingsDesc' },
        { selector: '#statistics h2', key: 'myStatistics' },
        { selector: '#statistics p', key: 'statsDesc' },
        { selector: '#reviews h2', key: 'feedbackTitle' },
        { selector: '#reviews p', key: 'reviewDesc' },
        { selector: '#wallet h2', key: 'myWallet' },
        { selector: '#wallet p', key: 'walletDesc' },
    { selector: '#history h2', key: 'bookingHistory' },
    { selector: '#history p', key: 'allCompleted' },
    { selector: '#faq h2', key: 'faqTitle' },
        { selector: '#faq p', key: 'faqDesc' },
        { selector: '#contact h2', key: 'contactTitle' },
        { selector: '#contact p', key: 'contactDesc' },
        { selector: '#settings h2', key: 'settingsTitle' },
        { selector: '#settings p', key: 'settingsDesc' }
    ];
    
    headerUpdates.forEach(update => {
        const el = document.querySelector(update.selector);
        if (el && t[update.key]) {
            const icon = el.querySelector('i');
            if (icon) {
                el.innerHTML = `<i class="${icon.className}"></i> ${t[update.key]}`;
            } else {
                el.textContent = t[update.key];
            }
        }
    });
    
    // 5. Map legend
    const legendItems = document.querySelectorAll('.legend-item span');
    if (legendItems.length >= 3) {
        if (legendItems[0]) legendItems[0].textContent = t.freeParkings;
        if (legendItems[1]) legendItems[1].textContent = t.fullParkings;
        if (legendItems[2]) legendItems[2].textContent = t.reservedParkings;
    }
    
    // 6. Weather widget
    const weatherTitle = document.querySelector('#weatherWidget h3');
    if (weatherTitle) {
        const icon = weatherTitle.querySelector('i');
        if (icon) {
            weatherTitle.innerHTML = `<i class="${icon.className}"></i> ${t.weather}`;
        }
    }
    
    // 7. Filter labels
    const filterLabels = document.querySelectorAll('.filter-group label');
    if (filterLabels.length >= 3) {
        if (filterLabels[0]) filterLabels[0].innerHTML = `<i class="fas fa-search"></i> ${t.search}`;
        if (filterLabels[1]) filterLabels[1].innerHTML = `<i class="fas fa-filter"></i> ${t.filterStatus}`;
        if (filterLabels[2]) filterLabels[2].innerHTML = `<i class="fas fa-euro-sign"></i> ${t.maxPrice}`;
    }
    
    // 8. Filter placeholders
    const searchInput = document.getElementById('searchParkings');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    
    const priceInput = document.getElementById('priceFilter');
    if (priceInput) priceInput.placeholder = t.priceHint;
    
    // 9. Filter select options
    const filterSelect = document.getElementById('filterStatus');
    if (filterSelect) {
        const options = filterSelect.options;
        if (options.length >= 4) {
            options[0].text = t.allStatus;
            options[1].text = t.available;
            options[2].text = t.full;
            options[3].text = t.reserved;
        }
    }
    
    // 10. Bookings stats
    const activeLabel = document.querySelector('#bookings .stat-label');
    if (activeLabel) activeLabel.textContent = t.activeCount;
    
    const hoursLabel = document.querySelectorAll('#bookings .stat-label')[1];
    if (hoursLabel) hoursLabel.textContent = t.totalHours;
    
    // 11. Empty states
    const noFavoritesMsg = document.getElementById('noFavoritesMessage');
    if (noFavoritesMsg) {
        const paragraphs = noFavoritesMsg.querySelectorAll('p');
        if (paragraphs.length >= 2) {
            paragraphs[0].textContent = t.noFavorites;
            paragraphs[1].innerHTML = `${t.markFavorites} <i class="fas fa-heart" style="color: #ccc;"></i> ${t.inList}`;
        }
    }
    
    const noBookingsMsg = document.getElementById('noBookingsMessage');
    if (noBookingsMsg) {
        const paragraphs = noBookingsMsg.querySelectorAll('p');
        if (paragraphs.length >= 2) {
            paragraphs[0].textContent = t.noActiveBookings;
            paragraphs[1].textContent = t.goToParking;
        }
    }
    
    // 12. Settings sections
    const settingsSections = document.querySelectorAll('.settings-section h3');
    if (settingsSections.length >= 3) {
        if (settingsSections[0]) {
            const icon = settingsSections[0].previousElementSibling?.querySelector('i');
            if (icon) settingsSections[0].textContent = t.visualSettings;
        }
        if (settingsSections[1]) {
            const icon = settingsSections[1].previousElementSibling?.querySelector('i');
            if (icon) settingsSections[1].textContent = t.notifications;
        }
        if (settingsSections[2]) {
            const icon = settingsSections[2].previousElementSibling?.querySelector('i');
            if (icon) settingsSections[2].textContent = t.security;
        }
    }
    
    // 13. Theme and language labels
    const themeLabel = document.querySelector('#settings label[for="themeSelect"]');
    if (themeLabel) themeLabel.innerHTML = `<i class="fas fa-sun"></i> ${t.theme}`;
    
    const langLabel = document.querySelector('#settings label[for="languageSelect"]');
    if (langLabel) langLabel.innerHTML = `<i class="fas fa-globe"></i> ${t.language}`;
    
    // 14. Apply/Reset buttons
    const applyBtn = document.querySelector('#settings .btn-primary[onclick="applySelectedTheme()"]');
    if (applyBtn) applyBtn.innerHTML = `<i class="fas fa-check"></i> ${t.apply}`;
    
    const resetBtn = document.querySelector('#settings .btn[onclick="resetTheme()"]');
    if (resetBtn) resetBtn.innerHTML = `<i class="fas fa-undo"></i> ${t.reset}`;
    
    // 15. Notification checkboxes
    const notifLabels = document.querySelectorAll('#settings .setting-item label span');
    if (notifLabels.length >= 3) {
        if (notifLabels[0]) notifLabels[0].textContent = t.notifBooking;
        if (notifLabels[1]) notifLabels[1].textContent = t.notifOffers;
        if (notifLabels[2]) notifLabels[2].textContent = t.notifSMS;
    }
    
    const notifDescs = document.querySelectorAll('#settings .setting-item small');
    if (notifDescs.length >= 3) {
        if (notifDescs[0]) notifDescs[0].textContent = t.notifBookingDesc;
        if (notifDescs[1]) notifDescs[1].textContent = t.notifOffersDesc;
        if (notifDescs[2]) notifDescs[2].textContent = t.notifSMSDesc;
    }
    
    // 16. Security buttons
    const changePwdBtn = document.querySelector('#settings .btn-primary[onclick="changePassword()"]');
    if (changePwdBtn) changePwdBtn.innerHTML = `<i class="fas fa-key"></i> ${t.changePassword}`;
    
    const profileBtn = document.querySelector('#settings .btn[onclick="openUserProfile()"]');
    if (profileBtn) profileBtn.innerHTML = `<i class="fas fa-user"></i> ${t.profileData}`;
    
    const deleteBtn = document.querySelector('#settings .btn-danger[onclick="deleteAccount()"]');
    if (deleteBtn) deleteBtn.innerHTML = `<i class="fas fa-trash"></i> ${t.deleteProfile}`;
    
    // 17. Contact section
    const contactCards = document.querySelectorAll('.contact-card h3');
    if (contactCards.length >= 4) {
        if (contactCards[0]) contactCards[0].textContent = t.phone;
        if (contactCards[1]) contactCards[1].textContent = t.email;
        if (contactCards[2]) contactCards[2].textContent = t.office;
        if (contactCards[3]) contactCards[3].textContent = t.workHours;
    }
    
    const contactFormTitle = document.querySelector('.contact-form h3');
    if (contactFormTitle) {
        const icon = contactFormTitle.querySelector('i');
        if (icon) contactFormTitle.innerHTML = `<i class="${icon.className}"></i> ${t.sendMessage}`;
    }
    
    // 18. Contact form
    const nameInput = document.querySelector('.contact-form input[type="text"]');
    if (nameInput) nameInput.placeholder = t.namePlaceholder;
    
    const emailInput = document.querySelector('.contact-form input[type="email"]');
    if (emailInput) emailInput.placeholder = t.emailPlaceholder;
    
    const subjectInput = document.querySelectorAll('.contact-form input[type="text"]')[1];
    if (subjectInput) subjectInput.placeholder = t.subjectPlaceholder;
    
    const messageTextarea = document.querySelector('.contact-form textarea');
    if (messageTextarea) messageTextarea.placeholder = t.messagePlaceholder;
    
    const sendBtn = document.querySelector('.contact-form button[type="submit"]');
    if (sendBtn) sendBtn.innerHTML = `<i class="fas fa-send"></i> ${t.send}`;
    
    // 19. FAQ
    // Това ще се обнови при loadFAQ()
    
    // 20. News
    // Това ще се обнови при loadNews()
    
    // Запазваме избрания език
    localStorage.setItem('currentLanguage', currentLanguage);
}
// След като заредите currentLanguage, извикайте:
updatePageLanguage();