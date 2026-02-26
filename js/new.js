// ============ data.js ============
let parkingData = JSON.parse(localStorage.getItem('parkingData')) || [
    {
        id: 1,
        name: 'Паркинг "Море"',
        location: 'ул. Славянска, 2',
        totalSpots: 120,
        availableSpots: 45,
        price: '3.50 BGN/час',
        rating: 4.5,
        reviews: 128,
        description: 'Модерен паркинг близо до центъра, с видеонаблюдение и охрана.',
        coordinates: { lat: 42.5145, lng: 27.4615 },
        amenities: ['Видеонаблюдение', 'Охрана 24/7', 'Възлични'], status: 'available'
    },
    {
        id: 2,
        name: 'Паркинг "Централен"',
        location: 'Бургас Център',
        totalSpots: 250,
        availableSpots: 5,
        price: '5.00 BGN/час',
        rating: 4.2,
        reviews: 256,
        description: 'Най-голямата паркинг площадка в центъра на Бургас.',
        coordinates: { lat: 42.5038, lng: 27.4626 },
        amenities: ['Лифт', 'Достъп за инвалиди', 'Охрана'], status: 'full'
    },
    {
        id: 3,
        name: 'Паркинг "Плаж"',
        location: 'Южен плаж',
        totalSpots: 180,
        availableSpots: 120,
        price: '2.50 BGN/час',
        rating: 4.8,
        reviews: 345,
        description: 'Идеален паркинг за плажа с отличен поглед.',
        coordinates: { lat: 42.5080, lng: 27.4755 },
        amenities: ['Паркинг следи', 'WiFi', 'Охрана'], status: 'available'
    },
    {
        id: 4,
        name: 'Паркинг "Градина"',
        location: 'Парк Пейо Яворов',
        totalSpots: 100,
        availableSpots: 52,
        price: '2.00 BGN/час',
        rating: 4.6,
        reviews: 89,
        description: 'Спокойна паркинг площадка в зелена среда.',
        coordinates: { lat: 42.5155, lng: 27.4645 },
        amenities: ['Растители', 'Съседство парк', 'Охрана'], status: 'available'
    },
    {
        id: 5,
        name: 'Паркинг "Делтапорт"',
        location: 'Индустриална зона',
        totalSpots: 300,
        availableSpots: 180,
        price: '1.50 BGN/час',
        rating: 4.1,
        reviews: 167,
        description: 'Голяма паркинг площадка с добро съотношение цена/качество.',
        coordinates: { lat: 42.5200, lng: 27.4700 },
        amenities: ['Паркинг следи', 'Охрана', 'Осветление'], status: 'available'
    },
    {
        id: 6,
        name: 'Паркинг "Западен"',
        location: 'Западна част',
        totalSpots: 150,
        availableSpots: 0,
        price: '3.00 BGN/час',
        rating: 3.9,
        reviews: 94,
        description: 'Добър паркинг в западната част на град.',
        coordinates: { lat: 42.5120, lng: 27.4550 },
        amenities: ['Охрана', 'Кръг', 'Осветление'], status: 'full'
    },
    {
        id: 7,
        name: 'Паркинг "Северен"',
        location: 'Север',
        totalSpots: 200,
        availableSpots: 89,
        price: '2.75 BGN/час',
        rating: 4.3,
        reviews: 112,
        description: 'Просторен паркинг с модерни удобства.',
        coordinates: { lat: 42.5180, lng: 27.4620 },
        amenities: ['Видеонаблюдение', 'Охрана', 'Осветление'], status: 'available'
    },
    {
        id: 8,
        name: 'Паркинг "Пристанище"',
        location: 'Крайбрежна зона',
        totalSpots: 220,
        availableSpots: 1,
        price: '2.25 BGN/час',
        rating: 4.4,
        reviews: 203,
        description: 'Красив паркинг с изглед към морето.',
        coordinates: { lat: 42.5060, lng: 27.4700 },
        amenities: ['Изглед море', 'Охрана', 'Осветление'], status: 'full'
    },
    {
        id: 9,
        name: 'Паркинг "Изток"',
        location: 'Източна част',
        totalSpots: 160,
        availableSpots: 75,
        price: '2.80 BGN/час',
        rating: 4.0,
        reviews: 78,
        description: 'Удобен паркинг в източната част на града.',
        coordinates: { lat: 42.5160, lng: 27.4680 },
        amenities: ['Охрана', 'Осветление'], status: 'available'
    },
    {
        id: 10,
        name: 'Паркинг "Юг"',
        location: 'Южна зона',
        totalSpots: 140,
        availableSpots: 30,
        price: '3.20 BGN/час',
        rating: 4.1,
        reviews: 95,
        description: 'Паркинг близо до южните квартали.',
        coordinates: { lat: 42.5100, lng: 27.4630 },
        amenities: ['Видеонаблюдение', 'Охрана'], status: 'available'
    },
    {
        id: 11,
        name: 'Паркинг "Лазур"',
        location: 'Лазурен бряг',
        totalSpots: 250,
        availableSpots: 150,
        price: '4.00 BGN/час',
        rating: 4.7,
        reviews: 180,
        description: 'Луксозен паркинг с изглед към морето.',
        coordinates: { lat: 42.5050, lng: 27.4720 },
        amenities: ['Изглед море', 'WiFi', 'Охрана 24/7'], status: 'available'
    },
    {
        id: 12,
        name: 'Паркинг "Център 2"',
        location: 'Център на града',
        totalSpots: 180,
        availableSpots: 10,
        price: '5.50 BGN/час',
        rating: 4.3,
        reviews: 220,
        description: 'Втори централен паркинг с високо удобство.',
        coordinates: { lat: 42.5150, lng: 27.4620 },
        amenities: ['Лифт', 'Достъп за инвалиди', 'Видеонаблюдение'], status: 'full'
    },
    {
        id: 13,
        name: 'Паркинг "Меден Рудник"',
        location: 'Индустриална зона',
        totalSpots: 300,
        availableSpots: 200,
        price: '1.80 BGN/час',
        rating: 3.8,
        reviews: 145,
        description: 'Голям паркинг за работници и посетители.',
        coordinates: { lat: 42.5220, lng: 27.4650 },
        amenities: ['Осветление', 'Охрана'], status: 'available'
    },
    {
        id: 14,
        name: 'Паркинг "Слънчев"',
        location: 'Слънчев бряг',
        totalSpots: 200,
        availableSpots: 120,
        price: '3.50 BGN/час',
        rating: 4.5,
        reviews: 160,
        description: 'Паркинг близо до плажната ивица.',
        coordinates: { lat: 42.5070, lng: 27.4740 },
        amenities: ['Паркинг следи', 'WiFi', 'Охрана'], status: 'available'
    },
    {
        id: 15,
        name: 'Паркинг "Гората"',
        location: 'Горска зона',
        totalSpots: 120,
        availableSpots: 60,
        price: '2.50 BGN/час',
        rating: 4.2,
        reviews: 85,
        description: 'Спокоен паркинг в зелена среда.',
        coordinates: { lat: 42.5190, lng: 27.4660 },
        amenities: ['Растители', 'Съседство парк'], status: 'available'
    },
    {
        id: 16,
        name: 'Паркинг "Търговски"',
        location: 'Търговски център',
        totalSpots: 350,
        availableSpots: 50,
        price: '4.20 BGN/час',
        rating: 4.4,
        reviews: 300,
        description: 'Паркинг до големия търговски център.',
        coordinates: { lat: 42.5130, lng: 27.4590 },
        amenities: ['Лифт', 'Достъп за инвалиди', 'Видеонаблюдение', 'Охрана'], status: 'full'
    },
    {
        id: 17,
        name: 'Паркинг "Речен"',
        location: 'Край реката',
        totalSpots: 100,
        availableSpots: 45,
        price: '2.00 BGN/час',
        rating: 4.0,
        reviews: 70,
        description: 'Паркинг близо до реката с приятна атмосфера.',
        coordinates: { lat: 42.5170, lng: 27.4640 },
        amenities: ['Съседство река', 'Осветление'], status: 'available'
    },
    {
        id: 18,
        name: 'Паркинг "Академичен"',
        location: 'Университетска зона',
        totalSpots: 180,
        availableSpots: 90,
        price: '1.50 BGN/час',
        rating: 3.9,
        reviews: 120,
        description: 'Паркинг за студенти и преподаватели.',
        coordinates: { lat: 42.5210, lng: 27.4670 },
        amenities: ['Студентски отстъпки', 'Осветление'], status: 'available'
    },
    {
        id: 19,
        name: 'Паркинг "Саrafово"',
        location: 'Саrafово, Морска панорама',
        totalSpots: 200,
        availableSpots: 140,
        price: '2.75 BGN/час',
        rating: 4.6,
        reviews: 175,
        description: 'Паркинг с морска панорама в Саrafово.',
        coordinates: { lat: 42.5045, lng: 27.4810 },
        amenities: ['Изглед море', 'WiFi', 'Охрана 24/7'], status: 'available'
    },
    {
        id: 20,
        name: 'Паркинг "Славейково"',
        location: 'Квартал Славейков',
        totalSpots: 160,
        availableSpots: 85,
        price: '2.40 BGN/час',
        rating: 4.1,
        reviews: 110,
        description: 'Жилищен паркинг в квартал Славейков.',
        coordinates: { lat: 42.5240, lng: 27.4750 },
        amenities: ['Охрана', 'Осветление', 'Съседство парк'], status: 'available'
    },
    {
        id: 21,
        name: 'Паркинг "Младост"',
        location: 'Квартал Младост',
        totalSpots: 140,
        availableSpots: 70,
        price: '2.20 BGN/час',
        rating: 4.0,
        reviews: 95,
        description: 'Паркинг в младежкия квартал Младост.',
        coordinates: { lat: 42.5280, lng: 27.4680 },
        amenities: ['Охрана', 'Осветление'], status: 'available'
    },
    {
        id: 22,
        name: 'Паркинг "Боровец"',
        location: 'Квартал Боровец',
        totalSpots: 180,
        availableSpots: 95,
        price: '2.50 BGN/час',
        rating: 4.3,
        reviews: 130,
        description: 'Паркинг в хилядостното жилище Боровец.',
        coordinates: { lat: 42.5310, lng: 27.4640 },
        amenities: ['Видеонаблюдение', 'Охрана', 'Осветление'], status: 'available'
    },
    {
        id: 23,
        name: 'Паркинг "Морила"',
        location: 'Морила, Брегова зона',
        totalSpots: 220,
        availableSpots: 130,
        price: '3.10 BGN/час',
        rating: 4.5,
        reviews: 165,
        description: 'Паркинг с красив изглед към морските брегове.',
        coordinates: { lat: 42.5000, lng: 27.4700 },
        amenities: ['Изглед море', 'WiFi', 'Охрана'], status: 'available'
    },
    {
        id: 24,
        name: 'Паркинг "Меден Рудник 2"',
        location: 'Меден Рудник, Нов район',
        totalSpots: 250,
        availableSpots: 160,
        price: '1.90 BGN/час',
        rating: 4.0,
        reviews: 125,
        description: 'Нов паркинг в разширения район Меден Рудник.',
        coordinates: { lat: 42.5350, lng: 27.4720 },
        amenities: ['Осветление', 'Охрана', 'Модерни съоръжения'], status: 'available'
    },
    {
        id: 25,
        name: 'Паркинг "Канал"',
        location: 'Канални въдени пътища',
        totalSpots: 120,
        availableSpots: 60,
        price: '2.10 BGN/час',
        rating: 3.9,
        reviews: 85,
        description: 'Спокоен паркинг края на каналните водни пътища.',
        coordinates: { lat: 42.5140, lng: 27.4800 },
        amenities: ['Съседство вода', 'Осветление'], status: 'available'
    },
    {
        id: 26,
        name: 'Паркинг "Запад-Лог"',
        location: 'Западна логистична зона',
        totalSpots: 350,
        availableSpots: 210,
        price: '1.70 BGN/час',
        rating: 3.8,
        reviews: 145,
        description: 'Голяма логистична паркинг площадка.',
        coordinates: { lat: 42.5080, lng: 27.4500 },
        amenities: ['Осветление', 'Охрана', 'Паркинг следи'], status: 'available'
    },
    {
        id: 27,
        name: 'Паркинг "Северен парк"',
        location: 'Северна резидентска зона',
        totalSpots: 170,
        availableSpots: 88,
        price: '2.60 BGN/час',
        rating: 4.2,
        reviews: 110,
        description: 'Комфортен паркинг в северния квартал.',
        coordinates: { lat: 42.5380, lng: 27.4660 },
        amenities: ['Видеонаблюдение', 'Охрана', 'Съседство парк'], status: 'available'
    },
    {
        id: 28,
        name: 'Паркинг "Езеро"',
        location: 'Езерото край Бургас',
        totalSpots: 100,
        availableSpots: 55,
        price: '2.30 BGN/час',
        rating: 4.4,
        reviews: 95,
        description: 'Природен паркинг със спокойна атмосфера.',
        coordinates: { lat: 42.5400, lng: 27.4750 },
        amenities: ['Съседство природа', 'Осветление'], status: 'available'
    }
];

const newsData = [
    {
        id: 1,
        title: 'Нови камери в центъра на Бургас',
        description: 'Монтирани са високотехнологични камери за видеонаблюдение на паркингите в центъра.',
        date: '20 февруари 2026',
        icon: '📹'
    },
    {
        id: 2,
        title: 'Разширение на Паркинг "Море"',
        description: 'Паркингът "Море" добавя 50 нови места. Очакваме завършване на май 2026.',
        date: '18 февруари 2026',
        icon: '🏗️'
    },
    {
        id: 3,
        title: 'Нова мобилна приложение',
        description: 'Стартира нова мобилна приложение за резервирани паркинги. Достъпна в iOS и Android.',
        date: '15 февруари 2026',
        icon: '📱'
    },
    {
        id: 4,
        title: 'Намаление на цени през лято',
        description: 'От юни до август ще има 20% отстъпка на всички паркингове.',
        date: '10 февруари 2026',
        icon: '🎉'
    }
];

const faqData = [
    {
        question: 'Как да тегля паркинг място?',
        answer: 'За да резервирате паркинг място, отворете страницата на паркинга, изберете желаното време и кликнете на бутона "Резервирай".'
    },
    {
        question: 'Какво се случва ако закаснея?',
        answer: 'Ако закаснеете, моля свържете се с нас поне 30 минути преди крайния час. Можем да продължим резервацията ако има свободни места.'
    },
    {
        question: 'Има ли гаранция за паркинга?',
        answer: 'Всички наши паркинги имат видеонаблюдение 24/7 и охрана. Осигурихме максимална безопасност за вашия автомобил.'
    },
    {
        question: 'Как да отменя резервация?',
        answer: 'За отмяна на резервация, отворете страницата "Резервации" и кликнете на "Отмени" до резервацията, която искате да отмените.'
    },
    {
        question: 'Приемате ли кредитни карти?',
        answer: 'Да, приемаме всички основни кредитни карти, дебитни карти и цифрови портфейли.'
    },
    {
        question: 'Какъв е минималния период на резервация?',
        answer: 'Минималният период на резервация е 1 час. Максимално можете да резервирате до 7 дни предварително.'
    }
];

// ============ main.js ============
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
    bg: {
        // Header & Navigation
        appTitle: 'ParkVision',
        appSubtitle: 'Умна система за паркирање',
        logout: 'Изход',
        
        // Main Navigation
        navigation: 'НАВИГАЦИЈА',
        services: 'УСЛУГИ',
        information: 'ИНФОРМАЦИЯ',
        map: 'Карта',
        parkingList: 'Паркомества',
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
        freeParkings: 'Свободен парк',
        fullParkings: 'Пълен парк',
        reservedParkings: 'Резервиран парк',
        
        // Parking List Section
        allParkings: 'Всички паркомества в Бургас',
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
        noParkings: 'Не намерихме паркомествата, които търсите',
        tryOther: 'Опитайте с други критерии за търсене',
        
        // Parking Details
        spots: 'места',
        hour: 'час',
        amenities: 'Удобства',
        description: 'Описание',
        directions: 'Посока до паркинга',
        distance: 'разстояние',
        walkingTime: 'пеша',
        details: 'Детайли',
        reserve: 'Резервирай',
        
        // Favorites Section
        myFavorites: 'Любимите ми паркомества',
        favoriteDesc: 'Паркомествата, които сте отбелязали като любими',
        noFavorites: 'Все още нямате любими паркомества',
        markFavorites: 'Отбележете паркомествата с',
        inList: 'в списъка',
        
        // Bookings Section
        myBookings: 'Моите резервации',
        bookingsDesc: 'Активни резервации и предстоящи паркирания',
        activeCount: 'Активни резервации',
        totalHours: 'Брой часове резервирани',
        noActiveBookings: 'Все още нямате активни резервации',
        goToParking: 'Преминете към Паркомества, за да резервирате паркинг',
        
        // Booking Form
        bookingDate: 'Дата опубликуване',
        duration: 'Продължителност',
        price: 'Цена',
        status: 'Статус',
        cancel: 'Отмени',
        cancelBooking: 'Отмена на резервация',
        cancelConfirm: 'Сигурен ли си, че искаш да отмениш тази резервация?',
        bookingCancelled: 'Резервация отменена!',
        
        // Statistics Section
        myStatistics: 'Моята статистика',
        statsDesc: 'Преглед на вашите паркинг дейности',
        totalBookings: 'Общо резервации',
        madeBookings: 'Брой направени резервации',
        totalSpent: 'Общи разходи',
        spentOnParking: 'Вложено в паркиране',
        totalHoursParking: 'Часове паркинг',
        hoursSpent: 'Брой изхарчени часове',
        avgRating: 'Среден рейтинг',
        onParkings: 'На посещаваните паркинги',
        
        // Reviews Section
        feedbackTitle: 'Отзиви и обратна връзка',
        reviewDesc: 'Вижте отзивите и споделете вашето мнение',
        appFeedback: 'Обратна връзка за приложението',
        shareFeedback: 'Споделете вашето мнение, предложения или проблеми...',
        sendFeedback: 'Изпрати обратна връзка',
        writeReview: 'Напиши отзив за паркинг',
        feedbackSent: 'Обратната връзка е изпратена успешно!',
        thanksFeedback: 'Благодаря за обратната връзка! Вашето мнение е важно за нас.',
        
        // Wallet Section
        myWallet: 'Портфейл',
        walletDesc: 'Управление на вашите средства и трансакции',
        yourBalance: 'Ваш баланс',
        addFunds: 'Добави средства',
        transactionHistory: 'История на преводи',
        status: 'Статус',
        active: 'Актуално',
        accountActive: 'Вашата сметка е активна и готова за ползване',
        
        // History Section
        bookingHistory: 'История на резервации',
        allCompleted: 'Всички ваши завършени паркирания',
        completedCount: 'Завършени паркирания',
        avgHistoryRating: 'Среден рейтинг',
        
        // News Section
        newsTitle: 'Новини за Бургас',
        newsDesc: 'Запознайте се с последните новини за паркирането',
        
        // FAQ Section
        faqTitle: 'Често задавани въпроси',
        faqDesc: 'Отговори на най-честите въпроси',
        
        // Contact Section
        contactTitle: 'Контакт с нас',
        contactDesc: 'Имате въпрос? Свържете се с нас безплатно',
        phone: 'Телефон',
        phoneBugras: '+359 56 123 456',
        phoneHours: 'Пн-Пт: 9:00 - 18:00',
        email: 'Имейл',
        emailAddr: 'contact@parkvision.bg',
        emailReply: 'Отговор потвърди за 24ч',
        office: 'Физически офис',
        officeAddr: 'ул. "Александър Батенберг" 1',
        officeCity: 'Бургас 8000',
        workHours: 'Работни часа',
        weekdays: 'Пн-Пт: 9:00 - 18:00',
        weekends: 'Съб-Нд: 10:00 - 16:00',
        sendMessage: 'Изпрати съобщение',
        yourName: 'Ваше име',
        namePlaceholder: 'Иван Петров',
        emailPlaceholder: 'your@email.com',
        subject: 'Тема',
        subjectPlaceholder: 'Тема на съобщението',
        message: 'Съобщение',
        messagePlaceholder: 'Вашето съобщение...',
        send: 'Изпрати',
        
        // Settings Section
        settingsTitle: 'Настройки',
        settingsDesc: 'Персонализирайте вашия профил и предпочетания',
        notifications: 'Уведомления',
        notifBooking: 'Уведомления при резервация',
        notifBookingDesc: 'Получавайте известия за вашите резервации',
        notifOffers: 'Email оферти',
        notifOffersDesc: 'Получавайте специални оферти и намаления',
        notifSMS: 'SMS напомняния',
        notifSMSDesc: 'SMS reminders преди паркирането',
        preferences: 'Преферирани настройки',
        theme: 'Тема',
        chooseTheme: 'Изберете предпочитаната визуална тема',
        language: 'Език',
        chooseLanguage: 'Изберете предпочитаният език',
        light: 'Светла',
        dark: 'Тъмна',
        security: 'Безопасност на акаунта',
        changePassword: 'Смени пароля',
        profileData: 'Профилни данни',
        deleteProfile: 'Изтрии профил',
        
        // Messages
        settingsSaved: 'Настройката е запазена!',
        themeChanged: 'Тема променена!',
        languageChanged: 'Езикът е променен!',
        successMsg: 'Успешно!',
        errorMsg: 'Грешка!',
        warningMsg: 'Внимание!',
        timerExpired: 'Времето за резервацията е изтекло!',
        locationUpdated: 'Местоположението е обновено!',
        locationError: 'Не можахме да получим вашето местоположение. Моля, разрешете достъпа до локация.'
    },
    en: {
        // Header & Navigation
        appTitle: 'ParkVision',
        appSubtitle: 'Smart Parking System',
        logout: 'Logout',
        
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
        noParkings: 'We could not find the parkings you are looking for',
        tryOther: 'Try with other search criteria',
        
        // Parking Details
        spots: 'spots',
        hour: 'hour',
        amenities: 'Amenities',
        description: 'Description',
        directions: 'Directions to Parking',
        distance: 'distance',
        walkingTime: 'walking',
        details: 'Details',
        reserve: 'Reserve',
        
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
        cancel: 'Cancel',
        cancelBooking: 'Cancel Booking',
        cancelConfirm: 'Are you sure you want to cancel this booking?',
        bookingCancelled: 'Booking cancelled!',
        
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
        
        // Wallet Section
        myWallet: 'Wallet',
        walletDesc: 'Manage your funds and transactions',
        yourBalance: 'Your Balance',
        addFunds: 'Add Funds',
        transactionHistory: 'Transaction History',
        status: 'Status',
        active: 'Active',
        accountActive: 'Your account is active and ready to use',
        
        // History Section
        bookingHistory: 'Booking History',
        allCompleted: 'All your completed parkings',
        completedCount: 'Completed Parkings',
        avgHistoryRating: 'Average Rating',
        
        // News Section
        newsTitle: 'News about Burgas',
        newsDesc: 'Stay updated with the latest parking news',
        
        // FAQ Section
        faqTitle: 'Frequently Asked Questions',
        faqDesc: 'Answers to the most common questions',
        
        // Contact Section
        contactTitle: 'Contact Us',
        contactDesc: 'Have a question? Contact us for free',
        phone: 'Phone',
        phoneBugras: '+359 56 123 456',
        phoneHours: 'Mon-Fri: 9:00 - 18:00',
        email: 'Email',
        emailAddr: 'contact@parkvision.bg',
        emailReply: 'Response within 24 hours',
        office: 'Physical Office',
        officeAddr: '"Alexander Battenberg" Street 1',
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
        preferences: 'Preferred Settings',
        theme: 'Theme',
        chooseTheme: 'Choose your preferred visual theme',
        language: 'Language',
        chooseLanguage: 'Choose your preferred language',
        light: 'Light',
        dark: 'Dark',
        security: 'Account Security',
        changePassword: 'Change Password',
        profileData: 'Profile Data',
        deleteProfile: 'Delete Profile',
        
        // Messages
        settingsSaved: 'Setting saved!',
        themeChanged: 'Theme changed!',
        languageChanged: 'Language changed!',
        successMsg: 'Success!',
        errorMsg: 'Error!',
        warningMsg: 'Warning!',
        timerExpired: 'Booking time has expired!',
        locationUpdated: 'Location has been updated!',
        locationError: 'We could not get your location. Please allow access to location.'
    }
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

// ============ ui.js ============
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

// ============ auth.js ============
// ============ AUTHENTICATION ============
function toggleForms() {
    document.getElementById('loginForm').classList.toggle('active-form');
    document.getElementById('registerForm').classList.toggle('active-form');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        favorites = user.favorites || [];
        bookings = user.bookings || [];
        wallet = user.wallet || 50.00;
        transactions = user.transactions || [];
        saveToLocalStorage();
        showApp();
        showNotification('Добре дошъл, ' + user.name + '!', 'success');
    } else {
        showNotification('Грешен имейл или пароля!', 'error');
    }

    document.getElementById('loginFormElement').reset();
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    if (password !== confirm) {
        showNotification('Паролите не съвпадат!', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('Този имейл вече е регистриран!', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        favorites: [],
        bookings: [],
        wallet: 50.00,
        transactions: [{ type: 'add', name: 'Начален баланс', amount: 50.00, date: new Date().toLocaleDateString('bg-BG') }],
        createdAt: new Date().toLocaleDateString('bg-BG')
    };

    users.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(users));

    currentUser = newUser;
    favorites = [];
    bookings = [];
    wallet = 50.00;
    transactions = [{ type: 'add', name: 'Начален баланс', amount: 50.00, date: new Date().toLocaleDateString('bg-BG') }];
    saveToLocalStorage();
    showApp();
    showNotification('Успешна регистрация! Добре дошъл, ' + name + '!', 'success');
    document.getElementById('registerFormElement').reset();
}

function handleLogout() {
    currentUser = null;
    favorites = [];
    bookings = [];
    wallet = 50.00;
    transactions = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favorites');
    localStorage.removeItem('bookings');
    localStorage.removeItem('wallet');
    localStorage.removeItem('transactions');
    location.reload();
}

// ============ map.js ============
// ============ GEOLOCATION FUNCTIONS ============
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                resolve(currentLocation);
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

function calculateTravelTime(distanceKm, speedKmh = 30) {
    const timeHours = distanceKm / speedKmh;
    const timeMinutes = timeHours * 60;
    return Math.round(timeMinutes);
}

function getDirectionsToParking(parking) {
    if (!currentLocation) {
        return null;
    }

    const distance = calculateDistance(
        currentLocation.lat, currentLocation.lng,
        parking.coordinates.lat, parking.coordinates.lng
    );
    
    const time = calculateTravelTime(distance);
    
    return {
        distance: distance.toFixed(1),
        time: time,
        walkingTime: calculateTravelTime(distance, 5)
    };
}

function getUserLocation() {
    const button = document.getElementById('locationButton');
    const originalHTML = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    getCurrentLocation()
        .then(location => {
            updateUserLocationOnMap();
            showNotification('Местоположението е обновено!', 'success');
            renderParkingOnMap();
        })
        .catch(error => {
            console.error('Error getting location:', error);
            showNotification('Не можахме да получим вашето местоположение. Моля, разрешете достъпа до локация.', 'error');
        })
        .finally(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
        });
}

function refreshMapData() {
    const button = document.getElementById('refreshButton');
    button.classList.add('spinning');
    button.disabled = true;
    
    getCurrentLocation()
        .then(location => {
            updateUserLocationOnMap();
            updateWeatherData();
            renderParkingOnMap();
            populateNavigationSelect();
            showNotification('Данните са обновени!', 'success');
        })
        .catch(error => {
            console.error('Error refreshing data:', error);
            updateWeatherData();
            renderParkingOnMap();
            populateNavigationSelect();
            showNotification('Данни обновени (без локация)', 'info');
        })
        .finally(() => {
            button.classList.remove('spinning');
            button.disabled = false;
        });
}

function updateUserLocationOnMap() {
    if (!currentLocation || typeof L === 'undefined' || !leafletMap) return;

    if (userLocationMarker) {
        userLocationMarker.setLatLng([currentLocation.lat, currentLocation.lng]);
    } else {
        const checkSvg = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="#2ecc71" stroke="#ffffff" stroke-width="1.5"/>
              <path d="M7.5 12.5l2.5 2.5L16.5 9.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        const html = `<div class="user-location-marker">${checkSvg}</div>`;

        const userIcon = L.divIcon({
            className: 'user-location-divicon',
            html: html,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const popupText = (translations && translations[currentLanguage] && translations[currentLanguage].yourLocation) || 'You are here';

        userLocationMarker = L.marker([currentLocation.lat, currentLocation.lng], { icon: userIcon }).addTo(leafletMap);
        userLocationMarker.bindPopup(popupText, { maxWidth: 200, closeButton: true });
    }

    try {
        const latlng = [currentLocation.lat, currentLocation.lng];
        if (!leafletMap.getBounds().contains(latlng)) {
            leafletMap.setView(latlng, 14);
        }
    } catch (err) {
        leafletMap.setView([currentLocation.lat, currentLocation.lng], 14);
    }
}

function renderParkingOnMap() {
    if (typeof L === 'undefined') {
        setTimeout(renderParkingOnMap, 500);
        return;
    }

    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }
    
    const mapContainer = document.getElementById('leafletMap');
    if (!mapContainer) return;

    try {
        leafletMap = L.map('leafletMap').setView([42.5149, 27.4612], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            minZoom: 12
        }).addTo(leafletMap);
        
        parkingData.forEach(parking => {
            const color = parking.status === 'available' ? '#27AE60' : 
                         parking.status === 'full' ? '#E74C3C' : '#3498DB';
            
            const customIcon = L.divIcon({
                className: 'parking-marker-icon',
                html: `<div style="background: ${color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); cursor: pointer;"><i style="font-family: Arial; font-style: normal;">P</i></div>`,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20]
            });
            
            const marker = L.marker([parking.coordinates.lat, parking.coordinates.lng], { icon: customIcon }).addTo(leafletMap);
            
            const statusText = parking.status === 'available' ? '🟢 Свободен' :
                              parking.status === 'full' ? '🔴 Пълен' : '🔵 Резервиран';
            
            const directions = currentLocation ? getDirectionsToParking(parking) : null;
            
            const popupContent = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 280px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; text-align: center;">
                        <h3 style="margin: 0; font-size: 16px; font-weight: 700;">${parking.name}</h3>
                        <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">${parking.location}</div>
                    </div>
                    
                    <div style="padding: 16px; background: white;">
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${parking.status === 'available' ? '#27AE60' : parking.status === 'full' ? '#E74C3C' : '#3498DB'}; margin-right: 8px;"></div>
                            <span style="font-size: 14px; font-weight: 600; color: ${parking.status === 'available' ? '#27AE60' : parking.status === 'full' ? '#E74C3C' : '#3498DB'};">${statusText}</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                            <div style="text-align: center; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                                <div style="font-size: 18px; font-weight: 700; color: #2C3E50;">${parking.availableSpots}</div>
                                <div style="font-size: 10px; color: #7F8C8D;">свободни</div>
                            </div>
                            <div style="text-align: center; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                                <div style="font-size: 18px; font-weight: 700; color: #2C3E50;">${parking.price}</div>
                                <div style="font-size: 10px; color: #7F8C8D;">на час</div>
                            </div>
                        </div>
                        
                        ${directions ? `
                        <div style="background: #e8f4fd; border: 1px solid #3498DB; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                <i class="fas fa-route" style="color: #3498DB; margin-right: 8px;"></i>
                                <span style="font-size: 12px; font-weight: 600; color: #2C3E50;">Посока до паркинга</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #3498DB;">${directions.distance} km</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">разстояние</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #27AE60;">${directions.time} мин</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">с кола</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #F39C12;">${directions.walkingTime} мин</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">пеша</div>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        
                        <div style="display: flex; gap: 8px;">
                            <button onclick="showParkingDetails(${parking.id})" style="flex: 1; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                                <i class="fas fa-info-circle"></i>
                                Детайли
                            </button>
                            <button onclick="makeBooking(${parking.id})" style="flex: 1; padding: 10px; background: ${parking.status === 'available' ? 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' : '#E74C3C'}; color: white; border: none; border-radius: 8px; cursor: ${parking.status === 'available' ? 'pointer' : 'not-allowed'}; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;" ${parking.status !== 'available' ? 'disabled' : ''}>
                                <i class="fas fa-calendar-plus"></i>
                                Резервирай
                            </button>
                        </div>
                        
                        <div style="margin-top: 12px; text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                                <i class="fas fa-star" style="color: #FFD700; font-size: 12px;"></i>
                                <span style="font-size: 12px; color: #7F8C8D;">${parking.rating} (${parking.reviews} отзива)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                minWidth: 280,
                closeButton: true,
                className: 'modern-parking-popup'
            });
        });

        setTimeout(() => {
            if (leafletMap) leafletMap.invalidateSize();
        }, 100);

    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function updateWeatherWidget() {
    const weatherConditions = [
        { temp: '18°C', desc: 'Слънчево', icon: 'fas fa-sun', color: '#FFD700' },
        { temp: '15°C', desc: 'Облачно', icon: 'fas fa-cloud', color: '#95A5A6' },
        { temp: '12°C', desc: 'Дъждовно', icon: 'fas fa-cloud-rain', color: '#3498DB' },
        { temp: '20°C', desc: 'Ясно', icon: 'fas fa-sun', color: '#FFD700' }
    ];
    
    const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    document.getElementById('weatherTemp').textContent = currentWeather.temp;
    document.getElementById('weatherDesc').textContent = currentWeather.desc;
    document.querySelector('#weatherContent i').className = currentWeather.icon;
    document.querySelector('#weatherContent i').style.color = currentWeather.color;
    
    document.getElementById('weatherWind').textContent = (Math.floor(Math.random() * 20) + 5) + ' km/h';
    document.getElementById('weatherHumidity').textContent = (Math.floor(Math.random() * 30) + 50) + '%';
    document.getElementById('weatherVisibility').textContent = (Math.floor(Math.random() * 5) + 8) + ' km';
    document.getElementById('weatherPressure').textContent = (Math.floor(Math.random() * 20) + 1000) + ' hPa';
    document.getElementById('weatherRain').textContent = Math.floor(Math.random() * 30) + '%';
    
    const uvLevels = ['Нисък', 'Среден', 'Висок'];
    document.getElementById('weatherUV').textContent = uvLevels[Math.floor(Math.random() * uvLevels.length)];
}

function simulateAvailabilityChanges() {
    parkingData.forEach(parking => {
        if (Math.random() < 0.1) {
            const change = Math.random() < 0.5 ? 1 : -1;
            const oldAvailable = parking.availableSpots;
            
            parking.availableSpots = Math.max(0, Math.min(parking.totalSpots, parking.availableSpots + change));
            
            if (parking.availableSpots === 0) {
                parking.status = 'full';
            } else if (parking.availableSpots === parking.totalSpots) {
                parking.status = 'available';
            } else if (parking.status === 'full' && parking.availableSpots > 0) {
                parking.status = 'available';
                showNotification(`🎉 ${parking.name} вече има свободни места!`, 'success');
            }
            
            if (oldAvailable === 0 && parking.availableSpots > 0) {
                showNotification(`🅿️ Свободно място в ${parking.name}!`, 'success');
            }
        }
    });
    
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id === 'map') {
        renderParkingOnMap();
    } else if (activeTab && activeTab.id === 'parking-list') {
        loadAllParkings();
    }
}

// Navigation and routing
function populateNavigationSelect() {
    const sel = document.getElementById('navigateParkingSelect');
    if (!sel) return;
    sel.innerHTML = '';
    parkingData.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} — ${p.location}`;
        sel.appendChild(opt);
    });
}

function parseLatLngInput(input) {
    if (!input) return null;
    const parts = input.split(',').map(s => s.trim());
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
}

function clearRoute() {
    try {
        if (routeLine && leafletMap) {
            leafletMap.removeLayer(routeLine);
            routeLine = null;
        }
        if (routeStartMarker && leafletMap) {
            leafletMap.removeLayer(routeStartMarker);
            routeStartMarker = null;
        }
        if (routeEndMarker && leafletMap) {
            leafletMap.removeLayer(routeEndMarker);
            routeEndMarker = null;
        }
    } catch (e) {
        console.warn('Error clearing route', e);
    }
}

function startNavigationFromInput() {
    const input = document.getElementById('manualLocationInput');
    const select = document.getElementById('navigateParkingSelect');
    if (!select) return;

    let source = null;
    if (input && input.value.trim()) {
        source = parseLatLngInput(input.value.trim());
        if (!source) {
            showNotification('Въведи коректни координати в формат lat,lng', 'error');
            return;
        }
    } else if (currentLocation) {
        source = { lat: currentLocation.lat, lng: currentLocation.lng };
    } else {
        showNotification('Нямаме текуща локация. Въведи координати.', 'error');
        return;
    }

    const parkingId = parseInt(select.value, 10);
    const parking = parkingData.find(p => p.id === parkingId);
    if (!parking) {
        showNotification('Избери валиден паркинг', 'error');
        return;
    }

    clearRoute();

    requestRouteAndDraw({ lat: source.lat, lng: source.lng }, { lat: parking.coordinates.lat, lng: parking.coordinates.lng }, parking.name);
}

async function requestRouteAndDraw(start, end, parkingName) {
    clearRoute();
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Routing failed');
        const data = await resp.json();
        if (!data.routes || !data.routes.length) throw new Error('No route');

        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        routeLine = L.polyline(coords, { color: '#2980b9', weight: 5 }).addTo(leafletMap);

        const startIcon = L.divIcon({ className: 'route-start-icon', html: '<div style="width:18px;height:18px;background:#3498DB;border-radius:50%;border:3px solid #fff"></div>', iconSize: [18,18], iconAnchor: [9,9] });
        const endIcon = L.divIcon({ className: 'route-end-icon', html: '<div style="width:18px;height:18px;background:#2ecc71;border-radius:50%;border:3px solid #fff"></div>', iconSize: [18,18], iconAnchor: [9,9] });

        routeStartMarker = L.marker([start.lat, start.lng], { icon: startIcon }).addTo(leafletMap).bindPopup('Start');
        routeEndMarker = L.marker([end.lat, end.lng], { icon: endIcon }).addTo(leafletMap).bindPopup(parkingName || 'Destination');

        const dist = (data.routes[0].distance / 1000).toFixed(2);
        const durationMin = Math.round(data.routes[0].duration / 60);
        routeLine.bindPopup(`<strong>${parkingName}</strong><br>Разстояние: ${dist} km<br>Приблизително време: ${durationMin} мин.`).openPopup();

        leafletMap.fitBounds(routeLine.getBounds().pad(0.15));
    } catch (e) {
        console.warn('Routing error', e);
        routeLine = L.polyline([[start.lat, start.lng], [end.lat, end.lng]], { color: '#2980b9', weight: 4, dashArray: '6,6' }).addTo(leafletMap);
        leafletMap.setView([end.lat, end.lng], 14);
    }
}

// Geocoding
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeParking(parking) {
    try {
        const query = encodeURIComponent(`${parking.name} ${parking.location} Burgas`);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
        const resp = await fetch(url, { headers: { 'Accept-Language': 'bg' } });
        if (!resp.ok) return null;
        const data = await resp.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            return { lat, lng: lon };
        }
        return null;
    } catch (e) {
        console.warn('Geocode error', e);
        return null;
    }
}

async function geocodeAllParkings() {
    const btn = document.getElementById('geocodeParkingsBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Обновявам...'; }
    for (let i = 0; i < parkingData.length; i++) {
        const p = parkingData[i];
        const result = await geocodeParking(p);
        if (result) {
            p.coordinates.lat = result.lat;
            p.coordinates.lng = result.lng;
        }
        await sleep(1100);
    }
    if (btn) { btn.disabled = false; btn.textContent = 'Обнови координати на всички паркинги'; }
    showNotification('Координатите са актуализирани', 'success');
    localStorage.setItem('parkingData', JSON.stringify(parkingData));
    renderParkingOnMap();
}

// ============ parking.js ============
// ============ PARKING DISPLAY ============
function loadAllParkings() {
    const container = document.getElementById('parkingListContainer');
    container.innerHTML = '';

    parkingData.forEach(parking => {
        const card = createParkingCard(parking);
        container.appendChild(card);
    });
}

function createParkingCard(parking) {
    const card = document.createElement('div');
    card.className = 'parking-card';
    const isFavorite = favorites.includes(parking.id);
    const statusText = parking.status === 'available' ? 'Свободен' :
                      parking.status === 'full' ? 'Пълен' : 'Резервиран';
    const statusClass = `status-${parking.status}`;

    card.innerHTML = `
        <div class="parking-header">
            <h3 class="parking-name">${parking.name}</h3>
            <span class="parking-status ${statusClass}">${statusText}</span>
        </div>
        <div class="parking-info">
            <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${parking.location}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-car"></i>
                <span>${parking.availableSpots} / ${parking.totalSpots} места</span>
            </div>
            <div class="info-item">
                <i class="fas fa-dollar-sign"></i>
                <span class="parking-price">${parking.price}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-star" style="color: #FFD700;"></i>
                <span>${parking.rating}/5 (${parking.reviews} отзива)</span>
            </div>
        </div>
        <p class="parking-description">${parking.description}</p>
        <div class="parking-footer">
            <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" 
                    onclick="toggleFavorite(event, ${parking.id})">
                <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-compare" onclick="toggleCompare(event, ${parking.id})">
                <i class="fas fa-balance-scale"></i>
            </button>
            <button class="btn btn-view" onclick="showParkingDetails(${parking.id})">
                <i class="fas fa-eye"></i> Детайли
            </button>
            <button class="btn btn-reserve btn-success" onclick="makeBooking(${parking.id})">
                <i class="fas fa-calendar"></i> Резервирай
            </button>
        </div>
    `;

    return card;
}

function showParkingDetails(parkingId) {
    const parking = parkingData.find(p => p.id === parkingId);
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');

    const statusText = parking.status === 'available' ? 'Свободен' :
                      parking.status === 'full' ? 'Пълен' : 'Резервиран';

    const spots = [];
    for (let i = 1; i <= parking.totalSpots; i++) {
        const isAvailable = i <= parking.availableSpots;
        spots.push(`
            <div class="spot ${isAvailable ? 'available' : 'occupied'}" 
                 onclick="${isAvailable ? `selectSpot(${parking.id}, ${i})` : ''}" 
                 data-spot="${i}">
                ${i}
            </div>
        `);
    }

    const directions = currentLocation ? getDirectionsToParking(parking) : null;

    details.innerHTML = `
        <div style="max-width: 600px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: var(--text-dark);">${parking.name}</h2>
                <p style="color: var(--text-light); margin: 5px 0;">${parking.location}</p>
                <div style="display: inline-flex; align-items: center; gap: 8px; background: ${parking.status === 'available' ? '#d4edda' : parking.status === 'full' ? '#f8d7da' : '#cce7ff'}; color: ${parking.status === 'available' ? '#155724' : parking.status === 'full' ? '#721c24' : '#004085'}; padding: 8px 16px; border-radius: 20px; font-weight: 600;">
                    ${statusText}
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-parking" style="font-size: 24px; color: #3498DB; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.availableSpots}/${parking.totalSpots}</div>
                    <div style="font-size: 12px; color: var(--text-light);">Свободни места</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-euro-sign" style="font-size: 24px; color: #27AE60; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.price}</div>
                    <div style="font-size: 12px; color: var(--text-light);">На час</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-star" style="font-size: 24px; color: #FFD700; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.rating}/5</div>
                    <div style="font-size: 12px; color: var(--text-light);">${parking.reviews} отзива</div>
                </div>
            </div>

            ${directions ? `
            <div style="background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); border: 1px solid #3498DB; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <i class="fas fa-route" style="color: #3498DB; font-size: 18px; margin-right: 10px;"></i>
                    <span style="font-size: 14px; font-weight: 700; color: #2C3E50;">Посока до паркинга</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #3498DB;">${directions.distance} km</div>
                        <div style="font-size: 11px; color: #7F8C8D;">РАЗСТОЯНИЕ</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #27AE60;">${directions.time} мин</div>
                        <div style="font-size: 11px; color: #7F8C8D;">С КОЛА</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #F39C12;">${directions.walkingTime} мин</div>
                        <div style="font-size: 11px; color: #7F8C8D;">ПЕША</div>
                    </div>
                </div>
            </div>
            ` : ''}

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: var(--text-dark); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-parking"></i>
                    Изберете паркомясто
                </h3>
                <div class="spot-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); gap: 8px; max-height: 200px; overflow-y: auto; padding: 10px; background: #f8f9fa; border-radius: 10px;">
                    ${spots.join('')}
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: var(--text-light);">
                    <span style="color: #27AE60;">●</span> Свободно 
                    <span style="color: #E74C3C; margin-left: 15px;">●</span> Заето
                    <span style="color: #3498DB; margin-left: 15px;">●</span> Избрано
                </div>
            </div>

            <div style="background: #f8f9fa; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-dark);">Описание</h4>
                <p style="margin: 0; color: var(--text-light); line-height: 1.5;">${parking.description}</p>
                
                <h4 style="margin: 15px 0 10px 0; color: var(--text-dark);">Удобства</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${parking.amenities.map(a => `<span style="background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 15px; font-size: 12px; display: flex; align-items: center; gap: 4px;"><i class="fas fa-check"></i>${a}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function selectSpot(parkingId, spotNumber) {
    document.querySelectorAll('.spot.selected').forEach(spot => {
        spot.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    
    showNotification(`Избрахте място №${spotNumber}`, 'success');
}

// ============ FAVORITES ============
function toggleFavorite(event, parkingId) {
    event.stopPropagation();
    if (favorites.includes(parkingId)) {
        favorites = favorites.filter(id => id !== parkingId);
    } else {
        favorites.push(parkingId);
    }
    saveToLocalStorage();

    document.querySelectorAll('.btn-favorite').forEach((btn, index) => {
        const cardParking = parkingData[index];
        if (favorites.includes(cardParking.id)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    showNotification(favorites.includes(parkingId) ? 'Добавено в любими!' : 'Премахнато от любими!', 'success');
}

function toggleCompare(event, parkingId) {
    event.stopPropagation();
    if (compareList.includes(parkingId)) {
        compareList = compareList.filter(id => id !== parkingId);
        showNotification('Премахнато от сравнение!', 'info');
    } else {
        if (compareList.length >= 3) {
            showNotification('Можете да сравнявате максимум 3 паркинга!', 'warning');
            return;
        }
        compareList.push(parkingId);
        showNotification('Добавено за сравнение!', 'success');
    }
    saveToLocalStorage();
    
    updateCompareButtons();
    updateCompareBar();
}

function updateCompareButtons() {
    document.querySelectorAll('.btn-compare').forEach(btn => {
        const parkingId = parseInt(btn.onclick.toString().match(/\d+/)[0]);
        if (compareList.includes(parkingId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateCompareBar() {
    let compareBar = document.getElementById('compareBar');
    if (!compareBar) {
        compareBar = document.createElement('div');
        compareBar.id = 'compareBar';
        compareBar.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            display: none;
            align-items: center;
            gap: 15px;
            font-weight: 600;
        `;
        document.body.appendChild(compareBar);
    }
    
    if (compareList.length > 0) {
        const compareParkings = compareList.map(id => parkingData.find(p => p.id === id));
        compareBar.innerHTML = `
            <span>Сравняване: ${compareParkings.map(p => p.name).join(', ')}</span>
            <button onclick="showCompareModal()" style="background: white; color: var(--primary-color); border: none; padding: 5px 15px; border-radius: 15px; cursor: pointer; font-weight: 600;">Сравни</button>
            <button onclick="clearCompare()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 5px 10px; border-radius: 50%; cursor: pointer;">×</button>
        `;
        compareBar.style.display = 'flex';
    } else {
        compareBar.style.display = 'none';
    }
}

function clearCompare() {
    compareList = [];
    saveToLocalStorage();
    updateCompareButtons();
    updateCompareBar();
    showNotification('Сравнението е изчистено!', 'info');
}

function showCompareModal() {
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');
    
    const compareParkings = compareList.map(id => parkingData.find(p => p.id === id));
    
    details.innerHTML = `
        <h2>Сравнение на паркинги</h2>
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background: var(--primary-light);">
                        <th style="padding: 12px; text-align: left; border: 1px solid var(--border-color);">Характеристика</th>
                        ${compareParkings.map(p => `<th style="padding: 12px; text-align: left; border: 1px solid var(--border-color);">${p.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Локация</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.location}</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Цена/час</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.price}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Общо места</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.totalSpots}</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Свободни места</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.availableSpots}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Рейтинг</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.rating}/5</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Отзиви</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.reviews}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Удобства</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.amenities.join(', ')}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top: 20px; text-align: center;">
            <button class="btn btn-primary" onclick="closeParkingModal()">Затвори</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function loadFavorites() {
    const container = document.getElementById('favoritesContainer');
    container.innerHTML = '';

    const favoritesParkings = parkingData.filter(p => favorites.includes(p.id));

    if (favoritesParkings.length === 0) {
        const emptyText = (translations && translations[currentLanguage] && translations[currentLanguage].noFavorites) || 'You have no favorite parkings yet';
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>${emptyText}</p>
            </div>
        `;
        return;
    }

    favoritesParkings.forEach(parking => {
        const card = createParkingCard(parking);
        container.appendChild(card);
    });
}

// Search and filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchParkings');
    const filterSelect = document.getElementById('filterStatus');
    const priceFilter = document.getElementById('priceFilter');

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const filterValue = filterSelect ? filterSelect.value : '';
        const maxPrice = priceFilter ? parseFloat(priceFilter.value) || Infinity : Infinity;
        
        const cards = document.querySelectorAll('.parking-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const status = card.querySelector('.parking-status');
            const priceText = card.querySelector('.parking-price')?.textContent || '';
            const price = parseFloat(priceText.replace(' BGN/час', '')) || 0;
            
            const matchesSearch = text.includes(searchTerm);
            const matchesStatus = !filterValue || status.className.includes(filterValue);
            const matchesPrice = price <= maxPrice;
            
            card.style.display = matchesSearch && matchesStatus && matchesPrice ? 'block' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', applyFilters);
    }

    if (priceFilter) {
        priceFilter.addEventListener('input', applyFilters);
    }
});

// ============ bookings.js ============
// ============ BOOKING TIMER ============
function startBookingTimer(bookingId, durationMinutes) {
    if (bookingTimers[bookingId]) {
        clearInterval(bookingTimers[bookingId]);
    }
    
    let timeRemaining = durationMinutes * 60; // seconds
    
    bookingTimers[bookingId] = setInterval(() => {
        timeRemaining--;
        
        if (timeRemaining <= 0) {
            clearInterval(bookingTimers[bookingId]);
            delete bookingTimers[bookingId];
            
            const booking = bookings.find(b => b.id === bookingId);
            if (booking) {
                showNotification(`⏰ Вашата резервация за ${booking.parkingName} е изтекла!`, 'warning');
            }
        }
        
        updateBookingTimerDisplay(bookingId, timeRemaining);
    }, 1000);
}

function updateBookingTimerDisplay(bookingId, timeRemaining) {
    const timerElement = document.getElementById(`timer-${bookingId}`);
    if (timerElement) {
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeRemaining < 600) {
            timerElement.style.color = '#E74C3C';
        }
    }
}

// ============ BOOKINGS ============
function makeBooking(parkingId) {
    const parking = parkingData.find(p => p.id === parkingId);
    
    if (parking.status === 'full') {
        showNotification('Съжалявам, този паркинг е пълен!', 'error');
        return;
    }

    showReservationForm(parkingId);
}

function showReservationForm(parkingId) {
    const parking = parkingData.find(p => p.id === parkingId);
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');

    details.innerHTML = `
        <h2>Резервация за ${parking.name}</h2>
        <form id="reservationForm" onsubmit="handleReservationSubmit(event, ${parkingId})">
            <div class="form-group">
                <label for="resName"><i class="fas fa-user"></i> Име</label>
                <input type="text" id="resName" required placeholder="Вашето име" value="${currentUser ? currentUser.name : ''}">
            </div>
            <div class="form-group">
                <label for="resPhone"><i class="fas fa-phone"></i> Телефон</label>
                <input type="tel" id="resPhone" required placeholder="+359888123456" value="${currentUser ? currentUser.phone : ''}">
            </div>
            <div class="form-group">
                <label for="resCarInfo"><i class="fas fa-car"></i> Информация за колата</label>
                <input type="text" id="resCarInfo" required placeholder="Марка, модел, цвят, номер">
            </div>
            <div class="form-group">
                <label for="resStartTime"><i class="fas fa-clock"></i> От час</label>
                <input type="datetime-local" id="resStartTime" required>
            </div>
            <div class="form-group">
                <label for="resEndTime"><i class="fas fa-clock"></i> До час</label>
                <input type="datetime-local" id="resEndTime" required>
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn btn-reserve">Резервирай</button>
                <button type="button" class="btn btn-primary" onclick="closeParkingModal()">Отмени</button>
            </div>
        </form>
    `;

    modal.classList.add('active');
}

function handleReservationSubmit(event, parkingId) {
    event.preventDefault();
    
    const parking = parkingData.find(p => p.id === parkingId);
    const name = document.getElementById('resName').value;
    const phone = document.getElementById('resPhone').value;
    const carInfo = document.getElementById('resCarInfo').value;
    const startTime = document.getElementById('resStartTime').value;
    const endTime = document.getElementById('resEndTime').value;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const durationHours = durationMs / (1000 * 60 * 60);
    
    if (durationHours <= 0) {
        showNotification('Крайният час трябва да е след началния!', 'error');
        return;
    }

    const pricePerHour = parseFloat(parking.price.replace(' BGN/час', ''));
    const totalCost = durationHours * pricePerHour;

    if (wallet < totalCost) {
        showNotification('Нямаш достатъчно средства! Добави средства в портфейла.', 'error');
        return;
    }

    const booking = {
        id: Date.now(),
        parkingId,
        parkingName: parking.name,
        bookingDate: new Date().toLocaleDateString('bg-BG'),
        bookingTime: new Date().toLocaleTimeString('bg-BG'),
        startTime: startTime,
        endTime: endTime,
        duration: `${durationHours.toFixed(1)} часа`,
        status: 'Активна',
        price: `${totalCost.toFixed(2)} BGN`,
        name: name,
        phone: phone,
        carInfo: carInfo
    };

    bookings.push(booking);
    wallet -= totalCost;
    transactions.unshift({
        type: 'subtract',
        name: `Резервация: ${parking.name}`,
        amount: totalCost,
        date: new Date().toLocaleDateString('bg-BG')
    });
    
    parking.status = 'reserved';
    parking.availableSpots -= 1;
    
    saveToLocalStorage();
    showNotification('Резервация направена успешно! Мястото е резервирано.', 'success');
    closeParkingModal();
    loadAllParkings();
}

function loadBookings() {
    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '';

    const activeBookings = bookings.filter(b => b.status === 'Активна').length;
    const totalHours = bookings.reduce((sum, booking) => {
        const hours = parseFloat(booking.duration.replace(' часа', '').replace(' час', ''));
        return sum + hours;
    }, 0);

    document.getElementById('activeBookingsCount').textContent = activeBookings;
    document.getElementById('totalReservedHours').textContent = totalHours.toFixed(1) + 'h';

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar"></i>
                <p>Все още нямаш резервации</p>
            </div>
        `;
        return;
    }

    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-details">
                <h3>${booking.parkingName}</h3>
                <p><i class="fas fa-calendar"></i> Дата: ${booking.bookingDate}</p>
                <p><i class="fas fa-clock"></i> Продължителност: ${booking.duration}</p>
                <p><i class="fas fa-tag"></i> Цена: ${booking.price}</p>
                <p><strong style="color: #27AE60; font-size: 1.1em;">${booking.status}</strong></p>
                ${booking.status === 'Активна' ? `
                <div style="background: #e3f2fd; padding: 10px; border-radius: 8px; margin-top: 10px; text-align: center;">
                    <div style="font-size: 0.9em; color: var(--text-light); margin-bottom: 5px;">Време до края:</div>
                    <div id="timer-${booking.id}" style="font-family: 'Courier New', monospace; font-size: 1.3em; font-weight: 700; color: #3498DB;">00:00:00</div>
                </div>
                ` : ''}
            </div>
            <div class="booking-actions">
                <button class="btn btn-cancel" onclick="cancelBooking(${booking.id})">Отмени</button>
            </div>
        `;
        container.appendChild(card);
        
        if (booking.status === 'Активна') {
            const durationMinutes = parseFloat(booking.duration.replace(' часа', '').replace(' час', '')) * 60;
            startBookingTimer(booking.id, durationMinutes);
        }
    });
}

function cancelBooking(bookingId) {
    if (confirm('Сигурен ли си, че искаш да отмениш тази резервация?')) {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
            const parking = parkingData.find(p => p.id === booking.parkingId);
            if (parking) {
                parking.status = parking.availableSpots < parking.totalSpots ? 'available' : 'full';
                parking.availableSpots += 1;
            }
        }
        
        bookings = bookings.filter(b => b.id !== bookingId);
        saveToLocalStorage();
        loadBookings();
        loadAllParkings();
        showNotification('Резервация отменена!', 'success');
    }
}

// ============ statistics.js ============
// ============ STATISTICS ============
function loadStatistics() {
    const totalBookings = bookings.length;
    const totalSpent = bookings.reduce((sum, booking) => sum + parseFloat(booking.price.replace(' BGN', '')), 0);
    const totalHours = bookings.reduce((sum, booking) => sum + parseFloat(booking.duration.replace(' часа', '').replace(' час', '')), 0);
    const avgRating = 4.5;

    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalSpent').textContent = totalSpent.toFixed(2) + ' BGN';
    document.getElementById('totalHours').textContent = totalHours.toFixed(1) + 'h';
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);

    const chartsContainer = document.getElementById('chartsContainer');
    const feb = Math.min(totalSpent, 100);
    const jan = 40;
    const dec = 65;
    
    chartsContainer.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h3 style="color: var(--text-dark); margin-bottom: 20px;">Разходи по месеци</h3>
            <div style="display: flex; align-items: flex-end; gap: 15px; height: 200px; margin-bottom: 20px;">
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #3498DB 0%, #3498DB ${feb}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Февруари</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">${totalSpent.toFixed(2)} BGN</p>
                </div>
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #27AE60 0%, #27AE60 ${jan}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Януари</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">28.00 BGN</p>
                </div>
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #E74C3C 0%, #E74C3C ${dec}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Декември</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">45.50 BGN</p>
                </div>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid var(--border-color);">
                <p style="color: var(--text-light); margin: 0;">Средна месячна разход: <span style="color: var(--text-dark); font-weight: 600; font-size: 1.2em;">${((totalSpent + 28 + 45.5) / 3).toFixed(2)} BGN</span></p>
            </div>
        </div>
        <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: var(--text-dark); margin-bottom: 20px;">Заетост на паркингите</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                ${parkingData.slice(0, 6).map(parking => {
                    const occupancyPercent = ((parking.totalSpots - parking.availableSpots) / parking.totalSpots) * 100;
                    const color = occupancyPercent > 80 ? '#E74C3C' : occupancyPercent > 50 ? '#F39C12' : '#27AE60';
                    return `
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="width: 120px; font-size: 0.9em; color: var(--text-dark); font-weight: 600;">${parking.name}</div>
                            <div style="flex: 1; background: #ecf0f1; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="width: ${occupancyPercent}%; height: 100%; background: ${color}; border-radius: 4px;"></div>
                            </div>
                            <div style="width: 60px; text-align: right; font-size: 0.9em; color: var(--text-light);">${Math.round(occupancyPercent)}%</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.9em; color: var(--text-light);">
                        <span style="color: #27AE60;">●</span> Свободен (< 50%) 
                        <span style="color: #F39C12; margin-left: 10px;">●</span> Среден (50-80%) 
                        <span style="color: #E74C3C; margin-left: 10px;">●</span> Пълен (> 80%)
                    </div>
                    <button onclick="loadStatistics()" style="background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                        <i class="fas fa-sync"></i> Обнови
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============ reviews.js ============
// ============ REVIEWS ============
function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    const reviews = [
        { parking: 'Паркинг "Море"', rating: 5, text: 'Отличен паркинг! Модерен и безопасен. Препоръчвам!', author: 'Иван П.' },
        { parking: 'Паркинг "Плаж"', rating: 4.5, text: 'Много хубаво място, удобна локация.', author: 'Мария К.' },
        { parking: 'Паркинг "Централен"', rating: 4, text: 'Добър паркинг, немного тесен но функционален.', author: 'Петър Т.' },
        { parking: 'Паркинг "Градина"', rating: 4.8, text: 'Най-спокойния паркинг в Бургас!', author: 'Анна Г.' },
        { parking: 'Паркинг "Делтапорт"', rating: 4.2, text: 'Добра цена, достойна услуга.', author: 'Стефан М.' }
    ];

    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <div>
                    <div class="review-parking">${review.parking}</div>
                    <div class="review-date">от ${review.author}</div>
                </div>
                <div class="review-rating">
                    ${'⭐'.repeat(Math.floor(review.rating))} ${review.rating}
                </div>
            </div>
            <div class="review-text">"${review.text}"</div>
        `;
        container.appendChild(card);
    });
}

function showReviewForm(parkingName) {
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');

    details.innerHTML = `
        <h2>Напиши отзив</h2>
        <form onsubmit="submitReview(event, '${parkingName}')" style="margin-top: 20px;">
            <div class="form-group">
                <label>Рейтинг (1-5 звезди)</label>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    ${[1,2,3,4,5].map(i => `<button type="button" class="star-btn" onclick="setRating(${i})" style="font-size: 2em; background: none; border: none; cursor: pointer; color: #ddd;" data-rating="${i}">★</button>`).join('')}
                </div>
                <input type="hidden" id="reviewRating" value="5">
            </div>
            <div class="form-group">
                <label>Твой отзив</label>
                <textarea id="reviewText" required placeholder="Напиши своето мнение за паркинга..." style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; min-height: 120px; resize: none;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Изпрати отзив</button>
            <button type="button" class="btn btn-secondary" style="width: 100%; margin-top: 10px;" onclick="closeParkingModal()">Отмени</button>
        </form>
    `;

    modal.classList.add('active');
}

function setRating(rating) {
    document.getElementById('reviewRating').value = rating;
    document.querySelectorAll('.star-btn').forEach((btn, idx) => {
        btn.style.color = (idx + 1) <= rating ? '#FFD700' : '#ddd';
    });
}

function submitReview(event, parkingName) {
    event.preventDefault();
    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value;
    
    showNotification(`Благодаря! Твоя ${rating}⭐ отзив за ${parkingName} беше записан!`, 'success');
    closeParkingModal();
}

function submitFeedback(event) {
    event.preventDefault();
    const text = document.getElementById('feedbackText').value;
    const messageDiv = document.getElementById('feedbackMessage');
    
    document.getElementById('feedbackText').value = '';
    
    messageDiv.style.display = 'block';
    messageDiv.style.background = '#d4edda';
    messageDiv.style.color = '#155724';
    messageDiv.style.border = '1px solid #c3e6cb';
    messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Благодаря за обратната връзка! Вашето мнение е важно за нас.';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
    
    showNotification('Обратната връзка е изпратена успешно!', 'success');
}

// ============ wallet.js ============
// ============ WALLET ============
function loadWallet() {
    document.getElementById('walletBalance').textContent = wallet.toFixed(2) + ' BGN';

    const container = document.getElementById('transactionsContainer');
    container.innerHTML = '';

    if (transactions.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center;">Няма транзакции</p>';
        return;
    }

    transactions.forEach(trans => {
        const item = document.createElement('div');
        item.className = 'transaction-item';

        const iconClass = trans.type === 'add' ? 'add' : 'subtract';
        const sign = trans.type === 'add' ? '+' : '-';
        const amountClass = trans.type === 'add' ? 'add' : 'subtract';

        item.innerHTML = `
            <div class="transaction-type">
                <div class="transaction-icon ${iconClass}">
                    ${trans.type === 'add' ? '✓' : '✗'}
                </div>
                <div class="transaction-details">
                    <div class="transaction-name">${trans.name}</div>
                    <div class="transaction-date">${trans.date}</div>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${sign}${trans.amount.toFixed(2)} BGN
            </div>
        `;
        container.appendChild(item);
    });
}

function addFunds() {
    const amount = prompt('Колко средства искаш да добавиш? (BGN)', '20');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        const parsedAmount = parseFloat(amount);
        wallet += parsedAmount;
        transactions.unshift({
            type: 'add',
            name: 'Добавяне на средства',
            amount: parsedAmount,
            date: new Date().toLocaleDateString('bg-BG')
        });
        saveToLocalStorage();
        loadWallet();
        showNotification(`Добавихте ${parsedAmount.toFixed(2)} BGN`, 'success');
    }
}

// ============ history.js ============
// ============ HISTORY ============
function loadHistory() {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';

    const demoCompletedBookings = [
        { parkingName: 'Паркинг "Море"', bookingDate: '18 февруари 2026', duration: '2 часа', price: '7.00 BGN', status: '✓ Завършена' },
        { parkingName: 'Паркинг "Плаж"', bookingDate: '15 февруари 2026', duration: '3 часа', price: '7.50 BGN', status: '✓ Завършена' },
        { parkingName: 'Паркинг "Северен"', bookingDate: '10 февруари 2026', duration: '1 час', price: '2.75 BGN', status: '✓ Завършена' },
        { parkingName: 'Паркинг "Централен"', bookingDate: '05 февруари 2026', duration: '2 часа', price: '10.00 BGN', status: '✓ Завършена' }
    ];

    const historyToShow = bookings.length > 0 ? bookings.slice(0, Math.floor(bookings.length / 2)) : demoCompletedBookings;

    if (historyToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>Все още нямаш завършени резервации</p>
            </div>
        `;
        return;
    }

    historyToShow.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-details">
                <h3>${booking.parkingName}</h3>
                <p><i class="fas fa-calendar"></i> Дата: ${booking.bookingDate}</p>
                <p><i class="fas fa-clock"></i> Продължителност: ${booking.duration}</p>
                <p><i class="fas fa-tag"></i> Цена: ${booking.price}</p>
                <p><strong style="color: #95a5a6; font-size: 1.1em;">${booking.status}</strong></p>
            </div>
            <div class="booking-actions">
                <button class="btn btn-primary" onclick="showReviewForm('${booking.parkingName}')" style="padding: 8px 15px; font-size: 0.9em;">
                    <i class="fas fa-star"></i> Напиши отзив
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============ news.js ============
// ============ NEWS ============
function loadNews() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-image">${news.icon}</div>
            <div class="news-content">
                <div class="news-date">${news.date}</div>
                <div class="news-title">${news.title}</div>
                <div class="news-description">${news.description}</div>
                <div class="news-footer">
                    <a class="read-more" href="#">Прочети повече →</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============ faq.js ============
// ============ FAQ ============
function loadFAQ() {
    const container = document.getElementById('faqContainer');
    container.innerHTML = '';

    faqData.forEach((faq, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        if (index === 0) item.classList.add('active');

        item.innerHTML = `
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">${faq.answer}</div>
        `;
        container.appendChild(item);
    });
}

function toggleFAQ(element) {
    element.closest('.faq-item').classList.toggle('active');
}

// ============ contact.js ============
// ============ CONTACT ============
function sendMessage(event) {
    event.preventDefault();
    showNotification('Съобщението беше изпратено успешно! Ще ви отговорим скоро.', 'success');
    event.target.reset();
}

// ============ settings.js ============
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