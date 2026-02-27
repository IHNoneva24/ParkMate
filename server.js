const express = require('express');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DB_PATH = path.join(__dirname, 'parkmate.db');

// ─── HELPER: wrap sql.js to feel like better-sqlite3 ─────────────────────────

let db;

function dbRun(sql, params = []) {
  db.run(sql, params);
  return {
    lastInsertRowid: db.exec("SELECT last_insert_rowid() AS id")[0]?.values[0]?.[0],
    changes: db.getRowsModified()
  };
}

function dbGet(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  let row = null;
  if (stmt.step()) {
    row = stmt.getAsObject();
  }
  stmt.free();
  return row;
}

function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// Auto-save every 5 seconds and on exit
let saveTimer = null;

function startAutoSave() {
  saveTimer = setInterval(saveDB, 5000);
  process.on('exit', saveDB);
  process.on('SIGINT', () => { saveDB(); process.exit(0); });
  process.on('SIGTERM', () => { saveDB(); process.exit(0); });
}

// ─── DATABASE SETUP ──────────────────────────────────────────────────────────

async function initDB() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run("PRAGMA journal_mode = WAL");
  db.run("PRAGMA foreign_keys = ON");

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      username  TEXT    UNIQUE,
      email     TEXT    UNIQUE,
      phone     TEXT,
      password  TEXT    NOT NULL,
      is_admin  INTEGER NOT NULL DEFAULT 0,
      wallet    REAL    NOT NULL DEFAULT 50.0,
      created_at TEXT   NOT NULL DEFAULT (date('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS parkings (
      id              INTEGER PRIMARY KEY,
      name            TEXT    NOT NULL,
      location        TEXT,
      total_spots     INTEGER NOT NULL DEFAULT 50,
      available_spots INTEGER NOT NULL DEFAULT 25,
      price           TEXT    NOT NULL DEFAULT '3.00 EUR/час',
      rating          REAL    NOT NULL DEFAULT 4.0,
      reviews         INTEGER NOT NULL DEFAULT 0,
      description     TEXT,
      lat             REAL,
      lng             REAL,
      amenities       TEXT    NOT NULL DEFAULT '[]',
      status          TEXT    NOT NULL DEFAULT 'available'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id      INTEGER NOT NULL,
      parking_id   INTEGER NOT NULL,
      parking_name TEXT    NOT NULL,
      booking_date TEXT    NOT NULL,
      booking_time TEXT    NOT NULL,
      start_time   TEXT    NOT NULL,
      end_time     TEXT    NOT NULL,
      duration     TEXT    NOT NULL,
      status       TEXT    NOT NULL DEFAULT 'Активна',
      price        TEXT    NOT NULL,
      car_name     TEXT,
      car_phone    TEXT,
      car_info     TEXT,
      FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
      FOREIGN KEY (parking_id) REFERENCES parkings(id) ON DELETE SET NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id    INTEGER NOT NULL,
      parking_id INTEGER NOT NULL,
      PRIMARY KEY (user_id, parking_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type    TEXT    NOT NULL,
      name    TEXT    NOT NULL,
      amount  REAL    NOT NULL,
      date    TEXT    NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  seedIfEmpty();
  saveDB();
  startAutoSave();
}

// ─── SEED DATA ────────────────────────────────────────────────────────────────

function seedIfEmpty() {
  // Admin user
  const adminExists = dbGet('SELECT id FROM users WHERE username = ?', ['admin']);
  if (!adminExists) {
    const r = dbRun(
      `INSERT INTO users (name, username, email, phone, password, is_admin, wallet, created_at)
       VALUES (?, ?, ?, ?, ?, 1, 9999.99, date('now'))`,
      ['Администратор', 'admin', 'admin@parkmate.bg', '+359 56 000 000', 'admin']
    );
    dbRun('INSERT INTO transactions (user_id, type, name, amount, date) VALUES (?, ?, ?, ?, date("now"))',
      [r.lastInsertRowid, 'add', 'Системен баланс', 9999.99]);
  }

  // Parkings
  const parkingCount = dbGet('SELECT COUNT(*) AS c FROM parkings');
  if (parkingCount.c === 0) {
    const parkings = [
      { id: 1, name: 'Градски гараж (ул. Славянска)', location: 'ул. Славянска, 2', totalSpots: 120, availableSpots: 45, price: '3.50 EUR/час', rating: 4.5, reviews: 128, description: 'Модерен паркинг близо до центъра, с видеонаблюдение и охрана.', lat: 42.5145, lng: 27.4615, amenities: '["Видеонаблюдение","Охрана 24/7","Възлични"]', status: 'available' },
      { id: 2, name: 'Централен гараж (Бургас център)', location: 'Бургас Център', totalSpots: 250, availableSpots: 5, price: '5.00 EUR/час', rating: 4.2, reviews: 256, description: 'Най-голямата паркинг площадка в центъра на Бургас.', lat: 42.5038, lng: 27.4626, amenities: '["Лифт","Достъп за инвалиди","Охрана"]', status: 'full' },
      { id: 4001, name: 'Паркинг „Жп гара"', location: 'до Централна жп гара', totalSpots: 200, availableSpots: 45, price: '3.80 EUR/час', rating: 4.0, reviews: 150, description: 'Паркинг в района на Централна жп гара Бургас.', lat: 42.4978, lng: 27.4748, amenities: '["WC","Осветление"]', status: 'available' },
      { id: 4002, name: 'Паркинг „Казино"', location: 'Приморски парк – Казино', totalSpots: 120, availableSpots: 30, price: '4.00 EUR/час', rating: 4.3, reviews: 98, description: 'Паркинг в зоната на Морското казино.', lat: 42.5028, lng: 27.4822, amenities: '["Подземен","Охрана"]', status: 'available' },
      { id: 4003, name: 'Паркинг „БСУ"', location: 'до Бургаски свободен университет', totalSpots: 120, availableSpots: 30, price: '2.80 EUR/час', rating: 4.0, reviews: 60, description: 'Паркинг близо до БСУ.', lat: 42.5148, lng: 27.4512, amenities: '["Достъп за инвалиди","Паркомати"]', status: 'available' },
      { id: 4004, name: 'Паркинг „Лазур"', location: 'ж.к. Лазур', totalSpots: 70, availableSpots: 20, price: '3.00 EUR/час', rating: 4.1, reviews: 48, description: 'Квартален паркинг в жилищен комплекс Лазур.', lat: 42.5082, lng: 27.4438, amenities: '["Осветление","Паркомати"]', status: 'available' },
      { id: 4005, name: 'Паркинг „Славейков"', location: 'ж.к. Славейков', totalSpots: 90, availableSpots: 14, price: '2.80 EUR/час', rating: 3.9, reviews: 34, description: 'Квартален паркинг в ж.к. Славейков.', lat: 42.5185, lng: 27.4552, amenities: '["Осветление"]', status: 'available' },
      { id: 4006, name: 'Паркинг „Автогара"', location: 'Централна автогара Бургас', totalSpots: 160, availableSpots: 22, price: '3.20 EUR/час', rating: 3.9, reviews: 44, description: 'Паркинг при Централна автогара.', lat: 42.4948, lng: 27.4762, amenities: '["WC","Осветление"]', status: 'available' },
      { id: 4010, name: 'Паркинг „Гурко"', location: 'ул. „Гурко", център', totalSpots: 80, availableSpots: 18, price: '3.00 EUR/час', rating: 4.1, reviews: 42, description: 'Паркинг в близост до ул. Гурко.', lat: 42.5045, lng: 27.4675, amenities: '["Осветление","Паркомати"]', status: 'available' },
      { id: 4011, name: 'Паркинг „Пристанище"', location: 'Пристанище Бургас', totalSpots: 140, availableSpots: 40, price: '4.50 EUR/час', rating: 4.1, reviews: 75, description: 'Зона за посетители на пристанището.', lat: 42.4892, lng: 27.4725, amenities: '["Осветление"]', status: 'available' },
      { id: 4012, name: 'Паркинг „Метро"', location: 'Метро, Бургас', totalSpots: 300, availableSpots: 120, price: '4.50 EUR/час', rating: 4.3, reviews: 240, description: 'Голям търговски паркинг при Метро.', lat: 42.5008, lng: 27.4552, amenities: '["Паркомати","Охрана"]', status: 'available' },
      { id: 4013, name: 'Паркинг „Приморски парк"', location: 'Приморски парк, южен вход', totalSpots: 60, availableSpots: 10, price: '3.00 EUR/час', rating: 3.8, reviews: 18, description: 'Паркинг до южния вход на Приморски парк.', lat: 42.4975, lng: 27.4798, amenities: '["Паркомати"]', status: 'available' },
      { id: 4014, name: 'Паркинг „МБАЛ"', location: 'до МБАЛ Бургас', totalSpots: 85, availableSpots: 26, price: '2.50 EUR/час', rating: 4.0, reviews: 36, description: 'Паркинг до Многопрофилна болница Бургас.', lat: 42.5132, lng: 27.4628, amenities: '["Осветление"]', status: 'available' },
      { id: 4015, name: 'Паркинг „Сарафово"', location: 'ж.к. Сарафово', totalSpots: 80, availableSpots: 25, price: '2.50 EUR/час', rating: 3.8, reviews: 28, description: 'Квартален паркинг в Сарафово.', lat: 42.5522, lng: 27.5048, amenities: '["Осветление"]', status: 'available' },
      { id: 4016, name: 'Паркинг „Кауфланд Лазур"', location: 'Кауфланд, ж.к. Лазур', totalSpots: 180, availableSpots: 40, price: '3.80 EUR/час', rating: 4.0, reviews: 190, description: 'Паркинг при Кауфланд в ж.к. Лазур.', lat: 42.5092, lng: 27.4475, amenities: '["Паркомати"]', status: 'available' },
      { id: 4028, name: 'Паркинг „Александровска"', location: 'ул. Александровска, център', totalSpots: 55, availableSpots: 10, price: '3.50 EUR/час', rating: 4.2, reviews: 65, description: 'Паркинг до главна пешеходна зона.', lat: 42.5052, lng: 27.4648, amenities: '["Паркомати"]', status: 'available' },
      { id: 4029, name: 'Паркинг „Яворов"', location: 'ж.к. Яворов', totalSpots: 60, availableSpots: 15, price: '2.80 EUR/час', rating: 3.7, reviews: 22, description: 'Квартален паркинг в ж.к. Яворов.', lat: 42.5188, lng: 27.4620, amenities: '["Осветление"]', status: 'available' },
      { id: 4030, name: 'Паркинг „Морска гара"', location: 'Морска гара Бургас', totalSpots: 120, availableSpots: 20, price: '4.00 EUR/час', rating: 4.2, reviews: 132, description: 'Паркинг при Морската гара.', lat: 42.4912, lng: 27.4702, amenities: '["Охрана"]', status: 'available' },
      { id: 4039, name: 'Паркинг „Опера"', location: 'до Оперния театър', totalSpots: 60, availableSpots: 12, price: '3.50 EUR/час', rating: 4.4, reviews: 88, description: 'Паркинг за посетители на Оперния театър.', lat: 42.5062, lng: 27.4658, amenities: '["Осветление"]', status: 'available' },
      { id: 4040, name: 'Паркинг „Триа Сити"', location: 'Триа Сити Център', totalSpots: 260, availableSpots: 90, price: '4.20 EUR/час', rating: 4.3, reviews: 210, description: 'Голям паркинг при Триа Сити Център.', lat: 42.5005, lng: 27.4612, amenities: '["Лифт","Паркомати"]', status: 'available' },
      { id: 4050, name: 'Паркинг „Меден Рудник – бл. А"', location: 'ж.к. Меден Рудник, блок А', totalSpots: 80, availableSpots: 22, price: '2.50 EUR/час', rating: 3.8, reviews: 30, description: 'Квартален паркинг в ж.к. Меден Рудник, зона блок А.', lat: 42.4868, lng: 27.4465, amenities: '["Осветление"]', status: 'available' },
      { id: 4051, name: 'Паркинг „Меден Рудник – бл. Б"', location: 'ж.к. Меден Рудник, блок Б', totalSpots: 90, availableSpots: 18, price: '2.50 EUR/час', rating: 3.7, reviews: 24, description: 'Квартален паркинг в ж.к. Меден Рудник, зона блок Б.', lat: 42.4822, lng: 27.4418, amenities: '["Осветление"]', status: 'available' },
      { id: 4053, name: 'Паркинг „Кауфланд Меден Рудник"', location: 'Кауфланд, ж.к. Меден Рудник', totalSpots: 180, availableSpots: 55, price: '3.50 EUR/час', rating: 4.0, reviews: 145, description: 'Паркинг при Кауфланд в ж.к. Меден Рудник.', lat: 42.4835, lng: 27.4488, amenities: '["Паркомати","Осветление"]', status: 'available' },
    ];

    for (const p of parkings) {
      dbRun(
        `INSERT OR IGNORE INTO parkings (id, name, location, total_spots, available_spots, price, rating, reviews, description, lat, lng, amenities, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.id, p.name, p.location, p.totalSpots, p.availableSpots, p.price, p.rating, p.reviews, p.description, p.lat, p.lng, p.amenities, p.status]
      );
    }
    console.log(`Seeded ${parkings.length} parkings.`);
  }
}

// ─── IN-MEMORY SESSIONS ───────────────────────────────────────────────────────

const sessions = new Map(); // token → userId

function createSession(userId) {
  const token = crypto.randomUUID();
  sessions.set(token, userId);
  return token;
}

function destroySession(token) {
  sessions.delete(token);
}

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────

function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  req.userId = sessions.get(token);
  req.token = token;
  next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    const user = dbGet('SELECT is_admin FROM users WHERE id = ?', [req.userId]);
    if (!user || !user.is_admin) return res.status(403).json({ error: 'Forbidden' });
    next();
  });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatParking(row) {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    totalSpots: row.total_spots,
    availableSpots: row.available_spots,
    price: row.price,
    rating: row.rating,
    reviews: row.reviews,
    description: row.description,
    coordinates: { lat: row.lat, lng: row.lng },
    amenities: JSON.parse(row.amenities || '[]'),
    status: row.status
  };
}

function formatUser(row) {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    email: row.email,
    phone: row.phone,
    isAdmin: row.is_admin === 1,
    wallet: row.wallet,
    createdAt: row.created_at
  };
}

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────────

app.post('/api/auth/login', (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Липсват данни' });

  const user = dbGet(
    'SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?',
    [login, login, password]
  );

  if (!user) return res.status(401).json({ error: 'Грешно потребителско име или парола!' });

  const token = createSession(user.id);
  res.json({ token, user: formatUser(user) });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Липсват данни' });

  const exists = dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (exists) return res.status(409).json({ error: 'Този имейл вече е регистриран!' });

  const r = dbRun(
    `INSERT INTO users (name, email, phone, password, wallet, created_at) VALUES (?, ?, ?, ?, 50.0, date('now'))`,
    [name, email, phone || '', password]
  );
  const uid = r.lastInsertRowid;

  dbRun('INSERT INTO transactions (user_id, type, name, amount, date) VALUES (?, ?, ?, ?, date("now"))',
    [uid, 'add', 'Начален баланс', 50.0]);

  const user = dbGet('SELECT * FROM users WHERE id = ?', [uid]);
  const token = createSession(uid);
  saveDB();
  res.status(201).json({ token, user: formatUser(user) });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  destroySession(req.token);
  res.json({ ok: true });
});

// ─── CURRENT USER ─────────────────────────────────────────────────────────────

app.get('/api/me', requireAuth, (req, res) => {
  const user = dbGet('SELECT * FROM users WHERE id = ?', [req.userId]);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(formatUser(user));
});

// ─── PARKINGS ─────────────────────────────────────────────────────────────────

app.get('/api/parkings', (req, res) => {
  const rows = dbAll('SELECT * FROM parkings ORDER BY id');
  res.json(rows.map(formatParking));
});

app.post('/api/parkings', requireAdmin, (req, res) => {
  const { name, location, totalSpots, availableSpots, price, rating, reviews, description, lat, lng, amenities, status } = req.body;
  if (!name) return res.status(400).json({ error: 'Липсва наименование' });

  const r = dbRun(
    `INSERT INTO parkings (name, location, total_spots, available_spots, price, rating, reviews, description, lat, lng, amenities, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, location || '', totalSpots || 50, availableSpots || 25, price || '3.00 EUR/час',
      rating || 4.0, reviews || 0, description || '', lat || 42.5149, lng || 27.4612,
      JSON.stringify(amenities || []), status || 'available']
  );

  const row = dbGet('SELECT * FROM parkings WHERE id = ?', [r.lastInsertRowid]);
  saveDB();
  res.status(201).json(formatParking(row));
});

app.put('/api/parkings/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location, totalSpots, availableSpots, price, rating, description, lat, lng, amenities, status } = req.body;

  const existing = dbGet('SELECT id FROM parkings WHERE id = ?', [id]);
  if (!existing) return res.status(404).json({ error: 'Паркингът не е намерен' });

  dbRun(
    `UPDATE parkings SET name=?, location=?, total_spots=?, available_spots=?, price=?,
     rating=?, description=?, lat=?, lng=?, amenities=?, status=? WHERE id=?`,
    [name, location, totalSpots, availableSpots, price, rating, description,
      lat, lng, JSON.stringify(amenities || []), status, id]
  );

  const row = dbGet('SELECT * FROM parkings WHERE id = ?', [id]);
  saveDB();
  res.json(formatParking(row));
});

app.delete('/api/parkings/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const existing = dbGet('SELECT id FROM parkings WHERE id = ?', [id]);
  if (!existing) return res.status(404).json({ error: 'Паркингът не е намерен' });
  dbRun('DELETE FROM parkings WHERE id = ?', [id]);
  saveDB();
  res.json({ ok: true });
});

// ─── FAVORITES ────────────────────────────────────────────────────────────────

app.get('/api/me/favorites', requireAuth, (req, res) => {
  const rows = dbAll('SELECT parking_id FROM favorites WHERE user_id = ?', [req.userId]);
  res.json(rows.map(r => r.parking_id));
});

app.post('/api/me/favorites', requireAuth, (req, res) => {
  const { parkingId } = req.body;
  dbRun('INSERT OR IGNORE INTO favorites (user_id, parking_id) VALUES (?, ?)', [req.userId, parkingId]);
  saveDB();
  res.json({ ok: true });
});

app.delete('/api/me/favorites/:parkingId', requireAuth, (req, res) => {
  dbRun('DELETE FROM favorites WHERE user_id = ? AND parking_id = ?', [req.userId, parseInt(req.params.parkingId)]);
  saveDB();
  res.json({ ok: true });
});

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

app.get('/api/me/bookings', requireAuth, (req, res) => {
  const rows = dbAll('SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC', [req.userId]);
  res.json(rows.map(r => ({
    id: r.id, parkingId: r.parking_id, parkingName: r.parking_name,
    bookingDate: r.booking_date, bookingTime: r.booking_time,
    startTime: r.start_time, endTime: r.end_time,
    duration: r.duration, status: r.status, price: r.price,
    name: r.car_name, phone: r.car_phone, carInfo: r.car_info
  })));
});

app.post('/api/me/bookings', requireAuth, (req, res) => {
  const { parkingId, parkingName, bookingDate, bookingTime, startTime, endTime, duration, price, name, phone, carInfo } = req.body;

  // Deduct wallet
  const priceNum = parseFloat(price);
  const user = dbGet('SELECT wallet FROM users WHERE id = ?', [req.userId]);
  if (!user || user.wallet < priceNum) return res.status(400).json({ error: 'Нямате достатъчно средства в портфейла!' });

  dbRun('UPDATE users SET wallet = wallet - ? WHERE id = ?', [priceNum, req.userId]);
  dbRun('INSERT INTO transactions (user_id, type, name, amount, date) VALUES (?, ?, ?, ?, date("now"))',
    [req.userId, 'parking', `Резервация: ${parkingName}`, priceNum]);

  // Update parking availability
  dbRun('UPDATE parkings SET available_spots = MAX(0, available_spots - 1), status = CASE WHEN available_spots - 1 <= 0 THEN "full" ELSE "reserved" END WHERE id = ?', [parkingId]);

  const r = dbRun(
    `INSERT INTO bookings (user_id, parking_id, parking_name, booking_date, booking_time, start_time, end_time, duration, status, price, car_name, car_phone, car_info)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Активна', ?, ?, ?, ?)`,
    [req.userId, parkingId, parkingName, bookingDate, bookingTime, startTime, endTime, duration, price, name, phone, carInfo]
  );

  // Return updated wallet
  const updatedUser = dbGet('SELECT wallet FROM users WHERE id = ?', [req.userId]);
  saveDB();
  res.status(201).json({ id: r.lastInsertRowid, wallet: updatedUser.wallet });
});

app.delete('/api/me/bookings/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const booking = dbGet('SELECT * FROM bookings WHERE id = ? AND user_id = ?', [id, req.userId]);
  if (!booking) return res.status(404).json({ error: 'Резервацията не е намерена' });

  dbRun('UPDATE bookings SET status = ? WHERE id = ?', ['Отменена', id]);

  // Restore parking spot
  if (booking.parking_id) {
    dbRun('UPDATE parkings SET available_spots = MIN(total_spots, available_spots + 1), status = "available" WHERE id = ?', [booking.parking_id]);
  }

  const updatedParking = dbGet('SELECT * FROM parkings WHERE id = ?', [booking.parking_id]);
  saveDB();
  res.json({ ok: true, parking: updatedParking ? formatParking(updatedParking) : null });
});

// ─── WALLET ───────────────────────────────────────────────────────────────────

app.get('/api/me/wallet', requireAuth, (req, res) => {
  const user = dbGet('SELECT wallet FROM users WHERE id = ?', [req.userId]);
  const txs = dbAll('SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 100', [req.userId]);
  res.json({
    balance: user.wallet,
    transactions: txs.map(t => ({ id: t.id, type: t.type, name: t.name, amount: t.amount, date: t.date }))
  });
});

app.post('/api/me/wallet/add', requireAuth, (req, res) => {
  const { amount } = req.body;
  const amt = parseFloat(amount);
  if (!amt || amt <= 0) return res.status(400).json({ error: 'Невалидна сума' });

  dbRun('UPDATE users SET wallet = wallet + ? WHERE id = ?', [amt, req.userId]);
  dbRun('INSERT INTO transactions (user_id, type, name, amount, date) VALUES (?, ?, ?, ?, date("now"))',
    [req.userId, 'add', 'Добавени средства', amt]);

  const user = dbGet('SELECT wallet FROM users WHERE id = ?', [req.userId]);
  saveDB();
  res.json({ balance: user.wallet });
});

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

app.get('/api/admin/users', requireAdmin, (req, res) => {
  const users = dbAll('SELECT * FROM users ORDER BY id');
  res.json(users.map(u => ({
    ...formatUser(u),
    bookingCount: dbGet('SELECT COUNT(*) AS c FROM bookings WHERE user_id = ?', [u.id]).c
  })));
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const user = dbGet('SELECT * FROM users WHERE id = ?', [id]);
  if (!user) return res.status(404).json({ error: 'Потребителят не е намерен' });
  if (user.is_admin) return res.status(400).json({ error: 'Не можете да изтриете администратор' });
  dbRun('DELETE FROM users WHERE id = ?', [id]);
  saveDB();
  res.json({ ok: true });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const totalUsers = dbGet('SELECT COUNT(*) AS c FROM users WHERE is_admin = 0').c;
  const totalParkings = dbGet('SELECT COUNT(*) AS c FROM parkings').c;
  const totalBookings = dbGet('SELECT COUNT(*) AS c FROM bookings').c;
  const totalRevenue = dbGet("SELECT COALESCE(SUM(amount),0) AS s FROM transactions WHERE type = 'parking'").s;
  const availableParkings = dbGet("SELECT COUNT(*) AS c FROM parkings WHERE status = 'available'").c;
  res.json({ totalUsers, totalParkings, totalBookings, totalRevenue, availableParkings });
});

app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  const rows = dbAll(`
    SELECT b.*, u.name AS user_name, u.email AS user_email
    FROM bookings b LEFT JOIN users u ON b.user_id = u.id
    ORDER BY b.id DESC LIMIT 200
  `);
  res.json(rows.map(r => ({
    id: r.id, userName: r.user_name, userEmail: r.user_email,
    parkingName: r.parking_name, date: r.booking_date, duration: r.duration,
    totalPrice: parseFloat(r.price) || 0, status: r.status
  })));
});

app.get('/api/admin/revenue', requireAdmin, (req, res) => {
  const byParking = dbAll(`
    SELECT name, SUM(amount) AS revenue, COUNT(*) AS bookings
    FROM transactions WHERE type='parking'
    GROUP BY name ORDER BY revenue DESC LIMIT 10
  `);
  res.json(byParking);
});

// ─── USER PASSWORD CHANGE ─────────────────────────────────────────────────────

app.post('/api/me/password', requireAuth, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ error: 'Паролата трябва да е поне 6 символа' });
  dbRun('UPDATE users SET password = ? WHERE id = ?', [newPassword, req.userId]);
  saveDB();
  res.json({ ok: true });
});

app.delete('/api/me', requireAuth, (req, res) => {
  const user = dbGet('SELECT is_admin FROM users WHERE id = ?', [req.userId]);
  if (user && user.is_admin) return res.status(400).json({ error: 'Не можете да изтриете администраторски акаунт' });
  dbRun('DELETE FROM users WHERE id = ?', [req.userId]);
  destroySession(req.token);
  saveDB();
  res.json({ ok: true });
});

// ─── START ────────────────────────────────────────────────────────────────────

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚗  ParkMate server running at http://localhost:${PORT}`);
    console.log(`    Admin login: username=admin  password=admin\n`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
