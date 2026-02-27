// ============ AUTHENTICATION ============
function toggleForms() {
    document.getElementById('loginForm').classList.toggle('active-form');
    document.getElementById('registerForm').classList.toggle('active-form');
}

async function handleLogin(event) {
    event.preventDefault();
    const loginVal = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn = document.querySelector('#loginFormElement button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = '...'; }

    try {
        const result = await API.login(loginVal, password);
        setToken(result.token);
        currentUser = result.user;

        // Load all app data
        await loadAppData();

        currentLanguage = 'bg';
        if (typeof updatePageLanguage === 'function') updatePageLanguage();

        showApp();
        if (typeof populateNavigationSelect === 'function') populateNavigationSelect();
        showNotification('Добре дошъл, ' + currentUser.name + '!', 'success');

        // Non-admin: try to get location
        if (!currentUser.isAdmin && typeof getCurrentLocation === 'function') {
            getCurrentLocation()
                .then(async (loc) => {
                    if (typeof updateUserLocationOnMap === 'function') updateUserLocationOnMap();
                    if (typeof fetchNearbyParkings === 'function') {
                        await fetchNearbyParkings(loc.lat, loc.lng, 2500, 60);
                    }
                })
                .catch(() => {});
        }
    } catch (err) {
        showNotification(err.message || 'Грешно потребителско име или парола!', 'error');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Влез'; }
    }

    document.getElementById('loginFormElement').reset();
}

async function handleRegister(event) {
    event.preventDefault();
    const name     = document.getElementById('registerName').value;
    const email    = document.getElementById('registerEmail').value;
    const phone    = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirm  = document.getElementById('registerConfirm').value;

    if (password !== confirm) { showNotification('Паролите не съвпадат!', 'error'); return; }

    const btn = document.querySelector('#registerFormElement button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = '...'; }

    try {
        const result = await API.register(name, email, phone, password);
        setToken(result.token);
        currentUser = result.user;

        favorites = [];
        bookings  = [];
        wallet    = currentUser.wallet || 50.00;
        transactions = [{ type: 'add', name: 'Начален баланс', amount: 50.00, date: new Date().toLocaleDateString('bg-BG') }];

        await loadAppData();
        showApp();
        showNotification('Успешна регистрация! Добре дошъл, ' + name + '!', 'success');
        document.getElementById('registerFormElement').reset();
    } catch (err) {
        showNotification(err.message || 'Грешка при регистрация!', 'error');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Регистрирай се'; }
    }
}

async function handleLogout() {
    try { await API.logout(); } catch (_) {}
    setToken(null);
    currentUser = null;
    favorites = [];
    bookings = [];
    wallet = 50.00;
    transactions = [];
    parkingData = [];
    if (typeof showAuth === 'function') showAuth();
    else location.reload();
}
