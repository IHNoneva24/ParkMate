// ============ API CLIENT ============
const API_BASE = '/api';
let _authToken = sessionStorage.getItem('pmToken') || null;

function setToken(t) {
    _authToken = t;
    if (t) sessionStorage.setItem('pmToken', t);
    else sessionStorage.removeItem('pmToken');
}

async function apiReq(method, path, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (_authToken) opts.headers['Authorization'] = `Bearer ${_authToken}`;
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + path, opts);
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
}

const API = {
    // Auth
    login:    (login, password) => apiReq('POST', '/auth/login', { login, password }),
    register: (name, email, phone, password) => apiReq('POST', '/auth/register', { name, email, phone, password }),
    logout:   () => apiReq('POST', '/auth/logout'),

    // Parkings
    getParkings:    ()        => apiReq('GET', '/parkings'),
    createParking:  (data)    => apiReq('POST', '/parkings', data),
    updateParking:  (id, data)=> apiReq('PUT', `/parkings/${id}`, data),
    deleteParking:  (id)      => apiReq('DELETE', `/parkings/${id}`),

    // Favorites
    getFavorites:   ()   => apiReq('GET', '/me/favorites'),
    addFavorite:    (id) => apiReq('POST', '/me/favorites', { parkingId: id }),
    removeFavorite: (id) => apiReq('DELETE', `/me/favorites/${id}`),

    // Bookings
    getBookings:   ()    => apiReq('GET', '/me/bookings'),
    createBooking: (data)=> apiReq('POST', '/me/bookings', data),
    cancelBooking: (id)  => apiReq('DELETE', `/me/bookings/${id}`),

    // Wallet
    getWallet:  ()      => apiReq('GET', '/me/wallet'),
    addFunds:   (amount)=> apiReq('POST', '/me/wallet/add', { amount }),

    // Me
    getMe:          ()            => apiReq('GET', '/me'),
    changePassword: (newPassword) => apiReq('POST', '/me/password', { newPassword }),
    deleteAccount:  ()            => apiReq('DELETE', '/me'),

    // Admin
    adminGetUsers:   ()   => apiReq('GET', '/admin/users'),
    adminDeleteUser: (id) => apiReq('DELETE', `/admin/users/${id}`),
    adminGetStats:   ()   => apiReq('GET', '/admin/stats'),
    adminGetBookings:()   => apiReq('GET', '/admin/bookings'),
    adminGetRevenue: ()   => apiReq('GET', '/admin/revenue'),
};
