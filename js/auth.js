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
    // Set language to Bulgarian and request location before showing the app so the browser prompts early
    currentLanguage = 'bg';
    // update page language immediately if function exists
    if (typeof updatePageLanguage === 'function') updatePageLanguage();
        
        if (typeof getCurrentLocation === 'function') {
            getCurrentLocation()
                .then(async (location) => {
                    try {
                        // update marker first
                        if (typeof updateUserLocationOnMap === 'function') updateUserLocationOnMap();
                        // attempt to fetch nearby real parkings and merge into dataset
                        if (typeof fetchNearbyParkings === 'function') {
                            await fetchNearbyParkings(location.lat, location.lng, 2500, 60);
                        }
                    } catch (e) {
                        console.warn('Post-login location handling failed', e);
                    }
                })
                .catch(err => {
                    console.warn('Could not get location at login:', err);
                })
                .finally(() => {
                    // show the app regardless of geolocation outcome
                    showApp();
                    if (typeof populateNavigationSelect === 'function') populateNavigationSelect();
                    showNotification('Добре дошъл, ' + user.name + '!', 'success');
                });
        } else {
            showApp();
            if (typeof populateNavigationSelect === 'function') populateNavigationSelect();
            showNotification('Добре дошъл, ' + user.name + '!', 'success');
        }
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
    // instead of reloading, show auth forms again
    if (typeof showAuth === 'function') {
        showAuth();
    } else {
        location.reload();
    }
}