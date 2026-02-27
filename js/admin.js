// ============ ADMIN PANEL ============

let adminCurrentSection = 'dashboard';
let adminMapInstance = null;
let adminAddPinMode = false;
let adminPreviewMarker = null;
let adminPinMarkers = [];

// Cached admin data
let _adminUsers = [];
let _adminStats = {};
let _adminBookings = [];
let _adminRevenue = [];

async function loadAdminPanel(skipFetch = false) {
    if (!currentUser || !currentUser.isAdmin) return;

    const container = document.getElementById('adminPanelContent');
    if (!container) return;

    const prevSection = adminCurrentSection || 'dashboard';

    // Prefetch admin data (skip if re-rendering for language change)
    if (!skipFetch) {
        try {
            [_adminStats, _adminUsers, _adminBookings, _adminRevenue] = await Promise.all([
                API.adminGetStats(),
                API.adminGetUsers(),
                API.adminGetBookings(),
                API.adminGetRevenue()
            ]);
        } catch (e) {
            console.error('Admin data load failed', e);
            _adminStats = {}; _adminUsers = []; _adminBookings = []; _adminRevenue = [];
        }
    }

    container.innerHTML = `
        <!-- Admin Header -->
        <div class="admin-header">
            <div>
                <h2><i class="fas fa-shield-alt"></i> ${t('adminPanelTitle')}</h2>
                <p>${t('adminPanelDesc')}</p>
            </div>
            <div class="admin-badge"><i class="fas fa-crown"></i> ${t('adminBadge')}</div>
        </div>

        <!-- Admin Navigation Tabs -->
        <div class="admin-tabs">
            <button class="admin-tab-btn active" onclick="adminSwitchSection('dashboard')" id="atab-dashboard">
                <i class="fas fa-tachometer-alt"></i> ${t('adminTabDashboard')}
            </button>
            <button class="admin-tab-btn" onclick="adminSwitchSection('map')" id="atab-map">
                <i class="fas fa-map-marked-alt"></i> ${t('adminTabMap')}
            </button>
            <button class="admin-tab-btn" onclick="adminSwitchSection('parkings')" id="atab-parkings">
                <i class="fas fa-parking"></i> ${t('adminTabParkings')}
            </button>
            <button class="admin-tab-btn" onclick="adminSwitchSection('users')" id="atab-users">
                <i class="fas fa-users"></i> ${t('adminTabUsers')}
            </button>
            <button class="admin-tab-btn" onclick="adminSwitchSection('bookings')" id="atab-bookings">
                <i class="fas fa-calendar-check"></i> ${t('adminTabBookings')}
            </button>
            <button class="admin-tab-btn" onclick="adminSwitchSection('revenue')" id="atab-revenue">
                <i class="fas fa-chart-line"></i> ${t('adminTabRevenue')}
            </button>
        </div>

        <!-- Dashboard Section -->
        <div class="admin-section active" id="asec-dashboard">
            ${buildDashboard()}
        </div>

        <!-- Map Section -->
        <div class="admin-section" id="asec-map">
            ${buildAdminMap()}
        </div>

        <!-- Parkings Section -->
        <div class="admin-section" id="asec-parkings">
            ${buildParkingsTable()}
        </div>

        <!-- Users Section -->
        <div class="admin-section" id="asec-users">
            ${buildUsersTable()}
        </div>

        <!-- Bookings Section -->
        <div class="admin-section" id="asec-bookings">
            ${buildBookingsOverview()}
        </div>

        <!-- Revenue Section -->
        <div class="admin-section" id="asec-revenue">
            ${buildRevenueSection()}
        </div>
    `;

    adminCurrentSection = 'dashboard';
    if (skipFetch && prevSection && prevSection !== 'dashboard') {
        adminSwitchSection(prevSection);
    }
}

// ---- Section Switcher ----
function adminSwitchSection(section) {
    document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(el => el.classList.remove('active'));

    const sec = document.getElementById(`asec-${section}`);
    const tab = document.getElementById(`atab-${section}`);
    if (sec) sec.classList.add('active');
    if (tab) tab.classList.add('active');

    adminCurrentSection = section;

    if (section === 'map') {
        setTimeout(initAdminMap, 150);
    }
    if (section === 'parkings') {
        filterAdminParkings('');
    }
    if (section === 'users') {
        // Refresh users from API
        API.adminGetUsers().then(users => { _adminUsers = users; filterAdminUsers(''); }).catch(() => { });
    }
}

// ---- Dashboard ----
function buildDashboard() {
    const stats = _adminStats;
    const regularUsers = (stats.totalUsers || 0);
    const totalParkings = stats.totalParkings || parkingData.length;
    const availableParkings = stats.availableParkings || parkingData.filter(p => p.status === 'available').length;
    const totalBookingsCount = stats.totalBookings || 0;
    const totalRevenue = stats.totalRevenue || 0;

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const barValues = days.map(() => Math.floor(Math.random() * 80) + 10);
    const maxBar = Math.max(...barValues);

    const bars = days.map((d, i) => {
        const h = Math.round((barValues[i] / maxBar) * 100);
        const colors = ['#3498db', '#27ae60', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
        return `<div class="mini-bar" style="height:${h}%;background:${colors[i]};">
            ${barValues[i]}
            <span class="mini-bar-label">${d}</span>
        </div>`;
    }).join('');

    return `
        <div class="admin-stats-grid">
            <div class="admin-stat-card" style="border-color:#3498db;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#3498db,#2980b9);">
                    <i class="fas fa-users"></i>
                </div>
                <div>
                    <div class="admin-stat-number">${regularUsers}</div>
                    <div class="admin-stat-label">${t('adminRegisteredUsers')}</div>
                </div>
            </div>
            <div class="admin-stat-card" style="border-color:#27ae60;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#27ae60,#2ecc71);">
                    <i class="fas fa-parking"></i>
                </div>
                <div>
                    <div class="admin-stat-number">${totalParkings}</div>
                    <div class="admin-stat-label">${t('adminTotalParkingsLabel')} (${availableParkings} ${t('adminAvailableSuffix')})</div>
                </div>
            </div>
            <div class="admin-stat-card" style="border-color:#e74c3c;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#e74c3c,#c0392b);">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                    <div class="admin-stat-number">${totalBookingsCount}</div>
                    <div class="admin-stat-label">${t('adminTotalBookingsLabel')}</div>
                </div>
            </div>
            <div class="admin-stat-card" style="border-color:#f39c12;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#f39c12,#e67e22);">
                    <i class="fas fa-coins"></i>
                </div>
                <div>
                    <div class="admin-stat-number">${totalRevenue.toFixed(2)} EUR</div>
                    <div class="admin-stat-label">${t('adminTotalRevenueLabel')}</div>
                </div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:25px;">
            <div class="admin-chart-area">
                <h3><i class="fas fa-chart-bar" style="color:#3498db;"></i> ${t('adminBookingsByDay')}</h3>
                <div class="mini-bar-chart">${bars}</div>
                <div style="margin-top:28px;"></div>
            </div>
            <div style="background:white;border-radius:12px;padding:25px;box-shadow:var(--shadow);">
                <h3 style="margin:0 0 15px;font-size:1em;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-circle-notch" style="color:#e74c3c;"></i> ${t('adminParkingStatusTitle')}
                </h3>
                ${buildStatusDonut()}
            </div>
        </div>

        <div style="background:white;border-radius:12px;box-shadow:var(--shadow);overflow:hidden;">
            <div style="padding:20px 25px;border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:10px;">
                <h3 style="margin:0;font-size:1em;"><i class="fas fa-bolt" style="color:#f39c12;"></i> ${t('adminQuickActionsTitle')}</h3>
            </div>
            <div style="padding:20px;">
                <div class="admin-quick-actions">
                    <button class="admin-quick-btn" onclick="adminSwitchSection('map'); setTimeout(()=>document.getElementById('adminAddPinBtn')&&document.getElementById('adminAddPinBtn').click(),300);" style="color:#8e44ad;">
                        <i class="fas fa-map-pin" style="color:#9b59b6;"></i>
                        ${t('adminAddParkingBtn')}
                    </button>
                    <button class="admin-quick-btn" onclick="adminSwitchSection('parkings');" style="color:#2980b9;">
                        <i class="fas fa-edit" style="color:#3498db;"></i>
                        ${t('adminParkingsBtn')}
                    </button>
                    <button class="admin-quick-btn" onclick="adminSwitchSection('users');" style="color:#1e8449;">
                        <i class="fas fa-user-cog" style="color:#27ae60;"></i>
                        ${t('adminUsersBtn')}
                    </button>
                    <button class="admin-quick-btn" onclick="adminSwitchSection('bookings');" style="color:#c0392b;">
                        <i class="fas fa-calendar-times" style="color:#e74c3c;"></i>
                        ${t('adminAllBookingsBtn')}
                    </button>
                    <button class="admin-quick-btn" onclick="adminExportData();" style="color:#7d6608;">
                        <i class="fas fa-download" style="color:#f39c12;"></i>
                        ${t('adminExportBtn')}
                    </button>
                    <button class="admin-quick-btn" onclick="adminRefreshData();" style="color:#6e2fa0;">
                        <i class="fas fa-sync-alt" style="color:#9b59b6;"></i>
                        ${t('adminRefreshBtn')}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function buildStatusDonut() {
    const available = parkingData.filter(p => p.status === 'available').length;
    const full = parkingData.filter(p => p.status === 'full').length;
    const reserved = parkingData.filter(p => p.status === 'reserved').length;
    const total = parkingData.length || 1;

    const items = [
        { label: t('adminStatusFreeLabel'), count: available, color: '#27ae60' },
        { label: t('adminStatusFullLabel'), count: full, color: '#e74c3c' },
        { label: t('adminStatusReservedLabel'), count: reserved, color: '#3498db' }
    ];

    return items.map(item => `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:0.88em;">
                <div style="width:12px;height:12px;border-radius:3px;background:${item.color};flex-shrink:0;"></div>
                ${item.label}
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <div style="height:8px;width:${Math.round((item.count / total) * 80)}px;background:${item.color};border-radius:4px;min-width:4px;"></div>
                <strong style="font-size:0.9em;color:${item.color};min-width:28px;text-align:right;">${item.count}</strong>
            </div>
        </div>
    `).join('');
}

// ---- Admin Map Section ----
function buildAdminMap() {
    return `
        <div class="admin-map-container">
            <div class="admin-map-toolbar">
                <h3><i class="fas fa-map-marked-alt" style="color:#9b59b6;"></i> ${t('adminMapSectionTitle')}</h3>
                <button class="btn-add-pin" id="adminAddPinBtn" onclick="toggleAdminPinMode()">
                    <i class="fas fa-map-pin"></i> ${t('adminAddByClickBtn')}
                </button>
                <button class="btn-admin-add" onclick="openAdminAddParking()">
                    <i class="fas fa-plus"></i> ${t('adminManualAddBtn')}
                </button>
                <span id="adminPinStatus" style="font-size:0.88em;color:var(--text-light);"></span>
            </div>
            <div id="adminMapEl"></div>
        </div>
        <div style="margin-top:15px;padding:15px;background:var(--white);border-radius:12px;box-shadow:var(--shadow);font-size:0.9em;color:var(--text-light);border:1px solid var(--border-color);">
            <i class="fas fa-info-circle" style="color:#3498db;"></i>
            <strong style="color:var(--text-dark);">${t('adminMapInstructionsTitle')}:</strong> ${t('adminMapInstructionsText')}
            <br>${t('adminMapMarkersLegend')}: <span style="color:#27AE60;font-weight:700;">\u25cf ${t('adminStatusAvailableLabel')}</span>  <span style="color:#E74C3C;font-weight:700;">\u25cf ${t('adminStatusFullLabel2')}</span>  <span style="color:#3498DB;font-weight:700;">\u25cf ${t('adminStatusReservedLabel2')}</span>
        </div>
    `;
}

function initAdminMap() {
    if (typeof L === 'undefined') return;

    const mapEl = document.getElementById('adminMapEl');
    if (!mapEl) return;

    if (adminMapInstance) {
        adminMapInstance.remove();
        adminMapInstance = null;
    }

    adminMapInstance = L.map('adminMapEl').setView([42.5149, 27.4612], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(adminMapInstance);

    // Render existing parkings
    parkingData.forEach(p => addAdminParkingMarker(p));

    // Click to add pin
    adminMapInstance.on('click', function (e) {
        if (!adminAddPinMode) return;
        const lat = e.latlng.lat.toFixed(4);
        const lng = e.latlng.lng.toFixed(4);

        // Show preview pin
        if (adminPreviewMarker) {
            adminMapInstance.removeLayer(adminPreviewMarker);
        }
        const previewIcon = L.divIcon({
            className: 'parking-marker-icon',
            html: `<div style="background:#9b59b6;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18px;border:3px solid white;box-shadow:0 2px 12px rgba(155,89,182,0.6);animation:pulse 1.5s ease-in-out infinite;"><i class='fas fa-plus'></i></div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        adminPreviewMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: previewIcon }).addTo(adminMapInstance);

        openAdminAddParking(lat, lng);
    });

    setTimeout(() => { if (adminMapInstance) adminMapInstance.invalidateSize(); }, 200);
}

function addAdminParkingMarker(parking) {
    if (!adminMapInstance || !parking.coordinates) return;
    const color = parking.status === 'available' ? '#27AE60' :
        parking.status === 'full' ? '#E74C3C' : '#3498DB';

    const icon = L.divIcon({
        className: 'parking-marker-icon',
        html: `<div style="background:${color};color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);">P</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });

    const marker = L.marker([parking.coordinates.lat, parking.coordinates.lng], { icon }).addTo(adminMapInstance);
    marker.bindPopup(`
        <div style="font-family:inherit;min-width:200px;">
            <strong style="font-size:1em;">${parking.name}</strong>
            <div style="font-size:0.85em;color:#666;margin:4px 0;">${parking.location}</div>
            <div style="font-size:0.85em;margin:8px 0;display:flex;gap:12px;">
                <span><strong>${parking.availableSpots}</strong>/${parking.totalSpots} ${t('spots')}</span>
                <span style="color:${color};font-weight:700;">${parking.status === 'available' ? t('adminStatusAvailableLabel') : parking.status === 'full' ? t('adminStatusFullLabel2') : t('adminStatusReservedLabel2')}</span>
            </div>
            <div style="font-size:0.82em;margin-bottom:10px;color:#555;">${parking.price}</div>
            <div style="display:flex;gap:6px;">
                <button onclick="closeAllPopups(); openAdminEditParking(${parking.id});" style="flex:1;padding:6px;background:#3498db;color:white;border:none;border-radius:6px;cursor:pointer;font-size:0.82em;font-weight:600;">
                    <i class="fas fa-edit"></i> ${t('adminEditBtnLabel')}
                </button>
                <button onclick="closeAllPopups(); adminDeleteParking(${parking.id});" style="flex:1;padding:6px;background:#e74c3c;color:white;border:none;border-radius:6px;cursor:pointer;font-size:0.82em;font-weight:600;">
                    <i class="fas fa-trash"></i> ${t('adminDeleteBtnLabel')}
                </button>
            </div>
        </div>
    `);
    adminPinMarkers.push(marker);
}

function closeAllPopups() {
    if (adminMapInstance) adminMapInstance.closePopup();
}

function toggleAdminPinMode() {
    adminAddPinMode = !adminAddPinMode;
    const btn = document.getElementById('adminAddPinBtn');
    const status = document.getElementById('adminPinStatus');
    const mapEl = document.getElementById('adminMapEl');

    if (adminAddPinMode) {
        btn.classList.add('active');
        btn.innerHTML = `<i class="fas fa-times"></i> ${t('adminCancelModeBtn')}`;
        if (status) status.textContent = t('adminClickMapHint');
        if (mapEl) mapEl.classList.add('pin-mode');
    } else {
        btn.classList.remove('active');
        btn.innerHTML = `<i class="fas fa-map-pin"></i> ${t('adminAddByClickBtn')}`;
        if (status) status.textContent = '';
        if (mapEl) mapEl.classList.remove('pin-mode');
    }
}

// ---- Admin Edit/Add Parking Modal ----
function openAdminAddParking(lat, lng) {
    adminAddPinMode = false;
    const btn = document.getElementById('adminAddPinBtn');
    const mapEl = document.getElementById('adminMapEl');
    if (btn) { btn.classList.remove('active'); btn.innerHTML = `<i class="fas fa-map-pin"></i> ${t('adminAddByClickBtn')}`; }
    if (mapEl) mapEl.classList.remove('pin-mode');

    const modal = document.getElementById('adminEditModal');
    const title = document.getElementById('adminEditTitle');
    if (!modal) return;

    title.innerHTML = `<i class="fas fa-plus-circle" style="color:#27ae60;"></i> ${t('adminAddNewParking')}`;
    document.getElementById('adminEditId').value = '';
    document.getElementById('adminEditName').value = '';
    document.getElementById('adminEditLocation').value = '';
    document.getElementById('adminEditTotal').value = '50';
    document.getElementById('adminEditAvailable').value = '25';
    document.getElementById('adminEditPrice').value = '3.00';
    document.getElementById('adminEditStatus').value = 'available';
    document.getElementById('adminEditDescription').value = '';
    document.getElementById('adminEditLat').value = lat || '42.5149';
    document.getElementById('adminEditLng').value = lng || '27.4612';

    modal.classList.add('active');
}

function openAdminEditParking(id) {
    const parking = parkingData.find(p => p.id === id);
    if (!parking) return;

    const modal = document.getElementById('adminEditModal');
    if (!modal) return;

    document.getElementById('adminEditTitle').innerHTML = `<i class="fas fa-edit" style="color:#3498db;"></i> ${t('adminEditParking')}`;
    document.getElementById('adminEditId').value = id;
    document.getElementById('adminEditName').value = parking.name;
    document.getElementById('adminEditLocation').value = parking.location;
    document.getElementById('adminEditTotal').value = parking.totalSpots;
    document.getElementById('adminEditAvailable').value = parking.availableSpots;
    document.getElementById('adminEditPrice').value = parseFloat(parking.price) || 3.00;
    document.getElementById('adminEditStatus').value = parking.status;
    document.getElementById('adminEditDescription').value = parking.description || '';
    document.getElementById('adminEditLat').value = parking.coordinates.lat;
    document.getElementById('adminEditLng').value = parking.coordinates.lng;

    modal.classList.add('active');
}

function closeAdminEditModal() {
    const modal = document.getElementById('adminEditModal');
    if (modal) modal.classList.remove('active');
    // Remove preview pin
    if (adminPreviewMarker && adminMapInstance) {
        adminMapInstance.removeLayer(adminPreviewMarker);
        adminPreviewMarker = null;
    }
}

async function saveAdminParking(event) {
    event.preventDefault();

    const id = document.getElementById('adminEditId').value;
    const name = document.getElementById('adminEditName').value.trim();
    const location = document.getElementById('adminEditLocation').value.trim();
    const totalSpots = parseInt(document.getElementById('adminEditTotal').value);
    const availableSpots = parseInt(document.getElementById('adminEditAvailable').value);
    const priceVal = parseFloat(document.getElementById('adminEditPrice').value);
    const status = document.getElementById('adminEditStatus').value;
    const description = document.getElementById('adminEditDescription').value.trim();
    const lat = parseFloat(document.getElementById('adminEditLat').value);
    const lng = parseFloat(document.getElementById('adminEditLng').value);

    if (isNaN(lat) || isNaN(lng)) {
        showNotification('Невалидни координати!', 'error');
        return;
    }

    const data = {
        name, location, totalSpots, availableSpots,
        price: `${priceVal.toFixed(2)} EUR/час`,
        status, description, lat, lng,
        amenities: [], rating: 4.0
    };

    try {
        if (id) {
            // Edit existing via API
            const updated = await API.updateParking(parseInt(id), data);
            const idx = parkingData.findIndex(p => p.id === parseInt(id));
            if (idx !== -1) parkingData[idx] = updated;
            showNotification(`Паркинг "${name}" е обновен!`, 'success');
        } else {
            // Add new via API
            const newParking = await API.createParking(data);
            parkingData.push(newParking);
            showNotification(`Паркинг "${name}" е добавен!`, 'success');

            // Add marker on admin map if visible
            if (adminMapInstance) {
                addAdminParkingMarker(newParking);
                adminMapInstance.setView([lat, lng], 15);
            }
        }
    } catch (err) {
        showNotification(err.message || 'Грешка при запис!', 'error');
        return;
    }

    closeAdminEditModal();

    // Refresh current section
    if (adminCurrentSection === 'map' && adminMapInstance) {
        adminPinMarkers.forEach(m => adminMapInstance.removeLayer(m));
        adminPinMarkers = [];
        parkingData.forEach(p => addAdminParkingMarker(p));
    } else if (adminCurrentSection === 'parkings') {
        const sec = document.getElementById('asec-parkings');
        if (sec) { sec.innerHTML = buildParkingsTable(); filterAdminParkings(''); }
    } else if (adminCurrentSection === 'dashboard') {
        const sec = document.getElementById('asec-dashboard');
        if (sec) sec.innerHTML = buildDashboard();
    }
}

// ---- Delete Parking ----
async function adminDeleteParking(id) {
    const parking = parkingData.find(p => p.id === id);
    if (!parking) return;
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${parking.name}"?`)) return;

    try {
        await API.deleteParking(id);
        const idx = parkingData.findIndex(p => p.id === id);
        if (idx !== -1) parkingData.splice(idx, 1);
        showNotification(`Паркинг "${parking.name}" е изтрит!`, 'success');
    } catch (err) {
        showNotification(err.message || 'Грешка при изтриване!', 'error');
        return;
    }

    // Refresh
    if (adminCurrentSection === 'map' && adminMapInstance) {
        adminPinMarkers.forEach(m => adminMapInstance.removeLayer(m));
        adminPinMarkers = [];
        parkingData.forEach(p => addAdminParkingMarker(p));
    } else if (adminCurrentSection === 'parkings') {
        const sec = document.getElementById('asec-parkings');
        if (sec) { sec.innerHTML = buildParkingsTable(); filterAdminParkings(''); }
    } else if (adminCurrentSection === 'dashboard') {
        const sec = document.getElementById('asec-dashboard');
        if (sec) sec.innerHTML = buildDashboard();
    }
}

// ---- Parkings Table ----
function buildParkingsTable() {
    return `
        <div class="admin-table-wrapper">
            <div class="admin-table-header">
                <h3><i class="fas fa-parking" style="color:#27ae60;"></i> ${t('adminAllParkingsLabel')} (${parkingData.length})</h3>
                <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                    <input type="text" class="admin-search-input" placeholder="${t('adminSearchParkingPlaceholder')}" oninput="filterAdminParkings(this.value)" id="parkingSearchInput">
                    <select onchange="filterAdminParkingsByStatus(this.value)" style="padding:9px 14px;border:1px solid var(--border-color);border-radius:8px;font-size:0.9em;">
                        <option value="">${t('adminAllStatusesOpt')}</option>
                        <option value="available">${t('adminAvailableOpt')}</option>
                        <option value="full">${t('adminFullOpt')}</option>
                        <option value="reserved">${t('adminReservedOpt')}</option>
                    </select>
                    <button class="btn-admin-add" onclick="openAdminAddParking()">
                        <i class="fas fa-plus"></i> ${t('adminAddBtnLabel')}
                    </button>
                </div>
            </div>
            <div class="admin-table-scroll">
                <table class="admin-table" id="adminParkingTable">
                    <thead>
                        <tr>
                            <th>${t('adminColId')}</th>
                            <th>${t('adminColName')}</th>
                            <th>${t('adminColLocation')}</th>
                            <th>${t('adminColSpots')}</th>
                            <th>${t('adminColPriceHour')}</th>
                            <th>${t('adminColRating')}</th>
                            <th>${t('adminColStatus')}</th>
                            <th>${t('adminColActions')}</th>
                        </tr>
                    </thead>
                    <tbody id="adminParkingBody">
                        ${buildParkingRows(parkingData)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function buildParkingRows(data) {
    if (!data.length) return `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-light);">${t('adminNoParkingsMsg')}</td></tr>`;
    return data.map(p => {
        const statusMap = { available: t('adminStatusAvailableLabel'), full: t('adminStatusFullLabel2'), reserved: t('adminStatusReservedLabel2') };
        return `
            <tr>
                <td style="font-size:0.8em;color:var(--text-light);">#${p.id}</td>
                <td><strong>${p.name}</strong></td>
                <td style="font-size:0.88em;">${p.location}</td>
                <td>${p.availableSpots}/${p.totalSpots}</td>
                <td>${p.price}</td>
                <td><i class="fas fa-star" style="color:#FFD700;font-size:0.85em;"></i> ${p.rating}</td>
                <td><span class="status-badge ${p.status}">${statusMap[p.status] || p.status}</span></td>
                <td>
                    <div class="actions">
                        <button class="btn-admin-edit" onclick="openAdminEditParking(${p.id})">
                            <i class="fas fa-edit"></i> ${t('adminEditBtnLabel')}
                        </button>
                        <button class="btn-admin-delete" onclick="adminDeleteParking(${p.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

let parkingStatusFilter = '';
function filterAdminParkings(query) {
    const q = query.toLowerCase();
    const filtered = parkingData.filter(p => {
        const matchesText = p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
        const matchesStatus = !parkingStatusFilter || p.status === parkingStatusFilter;
        return matchesText && matchesStatus;
    });
    const tbody = document.getElementById('adminParkingBody');
    if (tbody) tbody.innerHTML = buildParkingRows(filtered);
}

function filterAdminParkingsByStatus(status) {
    parkingStatusFilter = status;
    const input = document.getElementById('parkingSearchInput');
    filterAdminParkings(input ? input.value : '');
}

// ---- Users Table ----
function buildUsersTable() {
    const users = _adminUsers;
    return `
        <div class="admin-table-wrapper">
            <div class="admin-table-header">
                <h3><i class="fas fa-users" style="color:#3498db;"></i> ${t('adminAllUsersLabel')} (${users.length})</h3>
                <input type="text" class="admin-search-input" placeholder="${t('adminSearchUserPlaceholder')}" oninput="filterAdminUsers(this.value)">
            </div>
            <div class="admin-table-scroll">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>${t('adminColUser')}</th>
                            <th>Email</th>
                            <th>${t('adminColPhone')}</th>
                            <th>${t('adminColBalance')}</th>
                            <th>${t('adminColBookingsCount')}</th>
                            <th>${t('adminColDate')}</th>
                            <th>${t('adminColRole')}</th>
                            <th>${t('adminColActions')}</th>
                        </tr>
                    </thead>
                    <tbody id="adminUsersBody">
                        ${buildUserRows(users)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function buildUserRows(users) {
    if (!users.length) return `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-light);">${t('adminNoUsersMsg')}</td></tr>`;
    return users.map(u => {
        const initials = (u.name || 'U').substring(0, 2).toUpperCase();
        const isAdmin = u.isAdmin;
        return `
            <tr>
                <td>
                    <div class="user-chip">
                        <div class="user-avatar" style="background:${isAdmin ? 'linear-gradient(135deg,#c0392b,#e74c3c)' : 'linear-gradient(135deg,#667eea,#764ba2)'};">${initials}</div>
                        <strong>${u.name}</strong>
                    </div>
                </td>
                <td style="font-size:0.88em;">${u.email || u.username}</td>
                <td style="font-size:0.88em;">${u.phone || '—'}</td>
                <td style="font-weight:600;color:#27ae60;">${(u.wallet || 0).toFixed(2)} EUR</td>
                <td>${u.bookingCount || 0}</td>
                <td style="font-size:0.82em;color:var(--text-light);">${u.createdAt || '—'}</td>
                <td><span class="status-badge ${isAdmin ? 'admin' : 'available'}">${isAdmin ? 'Admin' : t('adminRoleUser')}</span></td>
                <td>
                    <div class="actions">
                        <button class="btn-admin-edit" onclick="adminViewUser(${u.id})">
                            <i class="fas fa-eye"></i> ${t('adminViewBtnLabel')}
                        </button>
                        ${!isAdmin ? `<button class="btn-admin-delete" onclick="adminDeleteUser(${u.id})"><i class="fas fa-trash"></i></button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterAdminUsers(query) {
    const q = query.toLowerCase();
    const filtered = _adminUsers.filter(u =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.username || '').toLowerCase().includes(q)
    );
    const tbody = document.getElementById('adminUsersBody');
    if (tbody) tbody.innerHTML = buildUserRows(filtered);
}

function adminViewUser(id) {
    const u = _adminUsers.find(x => x.id === id);
    if (!u) return;

    const info = `
Потребител: ${u.name}
Email: ${u.email || u.username}
Телефон: ${u.phone || '—'}
Баланс: ${(u.wallet || 0).toFixed(2)} EUR
Резервации: ${u.bookingCount || 0}
Член от: ${u.createdAt || '—'}
    `.trim();

    alert(info);
}

async function adminDeleteUser(id) {
    const u = _adminUsers.find(x => x.id === id);
    if (!u) return;
    if (u.isAdmin) { showNotification('Не можете да изтриете администраторски акаунт!', 'error'); return; }
    if (!confirm(`Сигурни ли сте, че искате да изтриете потребител "${u.name}"?`)) return;

    try {
        await API.adminDeleteUser(id);
        _adminUsers = _adminUsers.filter(x => x.id !== id);
        showNotification(`Потребител "${u.name}" е изтрит!`, 'success');

        const sec = document.getElementById('asec-users');
        if (sec) sec.innerHTML = buildUsersTable();
    } catch (err) {
        showNotification(err.message || 'Грешка при изтриване!', 'error');
    }
}

// ---- Bookings Overview ----
function buildBookingsOverview() {
    const allBookings = _adminBookings;

    const active = allBookings.filter(b => b.status === 'Активна').length;
    const completed = allBookings.filter(b => b.status === 'Завършена').length;
    const cancelled = allBookings.filter(b => b.status === 'Отменена').length;

    const rows = allBookings.slice(0, 50).map(b => `
        <tr>
            <td><strong>${b.userName || '—'}</strong><div style="font-size:0.8em;color:var(--text-light);">${b.userEmail || ''}</div></td>
            <td style="font-size:0.88em;">${b.parkingName || '—'}</td>
            <td style="font-size:0.85em;">${b.date || '—'}</td>
            <td>${b.duration || '\u2014'} ${t('adminHourAbbr')}</td>
            <td style="font-weight:600;color:#27ae60;">${(b.totalPrice || 0).toFixed(2)} EUR</td>
            <td><span class="status-badge ${b.status === 'Активна' ? 'available' : b.status === 'Отменена' ? 'full' : 'reserved'}">${b.status === 'Активна' ? t('adminActiveStatusLabel') : b.status === 'Завършена' ? t('adminCompletedStatusLabel') : b.status === 'Отменена' ? t('adminCancelledStatusLabel') : b.status || '\u2014'}</span></td>
        </tr>
    `).join('');

    return `
        <div class="admin-stats-grid" style="margin-bottom:20px;">
            <div class="admin-stat-card" style="border-color:#3498db;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#3498db,#2980b9);"><i class="fas fa-calendar-check"></i></div>
                <div><div class="admin-stat-number">${allBookings.length}</div><div class="admin-stat-label">${t('adminTotalBookingsLabel')}</div></div>
            </div>
            <div class="admin-stat-card" style="border-color:#27ae60;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#27ae60,#2ecc71);"><i class="fas fa-check-circle"></i></div>
                <div><div class="admin-stat-number">${active}</div><div class="admin-stat-label">${t('adminActiveLabel')}</div></div>
            </div>
            <div class="admin-stat-card" style="border-color:#9b59b6;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#9b59b6,#8e44ad);"><i class="fas fa-flag-checkered"></i></div>
                <div><div class="admin-stat-number">${completed}</div><div class="admin-stat-label">${t('adminCompletedLabel')}</div></div>
            </div>
            <div class="admin-stat-card" style="border-color:#e74c3c;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#e74c3c,#c0392b);"><i class="fas fa-times-circle"></i></div>
                <div><div class="admin-stat-number">${cancelled}</div><div class="admin-stat-label">${t('adminCancelledLabel')}</div></div>
            </div>
        </div>

        <div class="admin-table-wrapper">
            <div class="admin-table-header">
                <h3><i class="fas fa-list-alt" style="color:#e74c3c;"></i> ${t('adminAllBookingsTitle')}</h3>
            </div>
            <div class="admin-table-scroll">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>${t('adminColUser')}</th>
                            <th>${t('adminColParking')}</th>
                            <th>${t('adminColDate')}</th>
                            <th>${t('adminColDuration')}</th>
                            <th>${t('adminColAmount')}</th>
                            <th>${t('adminColStatus')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows || `<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-light);">${t('adminNoBookingsMsg')}</td></tr>`}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ---- Revenue Section ----
function buildRevenueSection() {
    const revenueData = _adminRevenue;

    const totalRevenue = revenueData.reduce((s, r) => s + (r.revenue || 0), 0);
    const totalBookingsCount = revenueData.reduce((s, r) => s + (r.bookings || 0), 0);
    const avgPerBooking = totalBookingsCount ? totalRevenue / totalBookingsCount : 0;

    const topRows = revenueData.map(r => `
        <tr>
            <td><strong>${r.name}</strong></td>
            <td style="font-weight:700;color:#27ae60;">${(r.revenue || 0).toFixed(2)} EUR</td>
            <td>
                <div style="height:8px;background:#e8f8f0;border-radius:4px;overflow:hidden;">
                    <div style="height:100%;width:${revenueData[0] && revenueData[0].revenue > 0 ? Math.round((r.revenue / revenueData[0].revenue) * 100) : 0}%;background:linear-gradient(135deg,#27ae60,#2ecc71);border-radius:4px;"></div>
                </div>
            </td>
        </tr>
    `).join('');

    return `
        <div class="admin-stats-grid" style="margin-bottom:20px;">
            <div class="admin-stat-card" style="border-color:#f39c12;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#f39c12,#e67e22);"><i class="fas fa-coins"></i></div>
                <div><div class="admin-stat-number">${totalRevenue.toFixed(2)} EUR</div><div class="admin-stat-label">${t('adminRevenueLabel')}</div></div>
            </div>
            <div class="admin-stat-card" style="border-color:#9b59b6;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#9b59b6,#8e44ad);"><i class="fas fa-receipt"></i></div>
                <div><div class="admin-stat-number">${totalBookingsCount}</div><div class="admin-stat-label">${t('adminPaidBookings')}</div></div>
            </div>
            <div class="admin-stat-card" style="border-color:#1abc9c;">
                <div class="admin-stat-icon" style="background:linear-gradient(135deg,#1abc9c,#16a085);"><i class="fas fa-calculator"></i></div>
                <div><div class="admin-stat-number">${avgPerBooking.toFixed(2)} EUR</div><div class="admin-stat-label">${t('adminAvgBookingValue')}</div></div>
            </div>
        </div>

        <div class="admin-table-wrapper">
            <div class="admin-table-header">
                <h3><i class="fas fa-trophy" style="color:#f39c12;"></i> ${t('adminTopParkingsTitle')}</h3>
            </div>
            <div class="admin-table-scroll">
                <table class="admin-table">
                    <thead><tr><th>${t('adminColName')}</th><th>${t('adminColRevenue')}</th><th>${t('adminColShare')}</th></tr></thead>
                    <tbody>
                        ${topRows || `<tr><td colspan="3" style="text-align:center;padding:30px;color:var(--text-light);">${t('adminNoRevenueMsg')}</td></tr>`}
                    </tbody>
                </table>
            </div>
        </div>

        <div style="margin-top:20px;padding:20px;background:white;border-radius:12px;box-shadow:var(--shadow);">
            <h3 style="margin:0 0 15px;font-size:1em;"><i class="fas fa-info-circle" style="color:#3498db;"></i> ${t('adminInfoTitle')}</h3>
            <p style="font-size:0.9em;color:var(--text-light);margin:0;">
                ${t('adminInfoText')}
            </p>
        </div>
    `;
}

// ---- Utility functions ----
async function adminExportData() {
    try {
        const [users, bookings] = await Promise.all([
            API.adminGetUsers(),
            API.adminGetBookings()
        ]);

        const exportData = {
            exportDate: new Date().toISOString(),
            totalUsers: users.length,
            totalParkings: parkingData.length,
            users: users.map(u => ({
                id: u.id, name: u.name, email: u.email,
                bookings: u.bookingCount || 0,
                wallet: u.wallet
            })),
            parkings: parkingData.map(p => ({
                id: p.id, name: p.name, location: p.location,
                status: p.status, availableSpots: p.availableSpots,
                totalSpots: p.totalSpots, price: p.price
            })),
            bookings: bookings
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `parkmate-export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Данните са експортирани успешно!', 'success');
    } catch (err) {
        showNotification(err.message || 'Грешка при експорт!', 'error');
    }
}

async function adminRefreshData() {
    try {
        parkingData = await API.getParkings();
        [_adminStats, _adminUsers, _adminBookings, _adminRevenue] = await Promise.all([
            API.adminGetStats(),
            API.adminGetUsers(),
            API.adminGetBookings(),
            API.adminGetRevenue()
        ]);
        showNotification('Данните са обновени!', 'success');

        // Refresh current section
        if (adminCurrentSection === 'dashboard') {
            const sec = document.getElementById('asec-dashboard');
            if (sec) sec.innerHTML = buildDashboard();
        }
    } catch (err) {
        showNotification(err.message || 'Грешка!', 'error');
    }
}
