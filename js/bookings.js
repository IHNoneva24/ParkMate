// ============ BOOKING TIMER ============
function startBookingTimer(bookingId, durationMinutes) {
    if (bookingTimers[bookingId]) clearInterval(bookingTimers[bookingId]);
    let timeRemaining = durationMinutes * 60;
    bookingTimers[bookingId] = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(bookingTimers[bookingId]);
            delete bookingTimers[bookingId];
            const b = bookings.find(b => b.id === bookingId);
            if (b) showNotification(`⏰ Вашата резервация за ${b.parkingName} е изтекла!`, 'warning');
        }
        updateBookingTimerDisplay(bookingId, timeRemaining);
    }, 1000);
}

function updateBookingTimerDisplay(bookingId, timeRemaining) {
    const el = document.getElementById(`timer-${bookingId}`);
    if (el) {
        const h = Math.floor(timeRemaining / 3600);
        const m = Math.floor((timeRemaining % 3600) / 60);
        const s = timeRemaining % 60;
        el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if (timeRemaining < 600) el.style.color = '#E74C3C';
    }
}

// ============ BOOKINGS ============
function makeBooking(parkingId) {
    const parking = parkingData.find(p => p.id === parkingId);
    if (!parking) return;
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
                <input type="tel" id="resPhone" required placeholder="+359888123456" value="${currentUser ? (currentUser.phone || '') : ''}">
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
            <div style="background:#f8f9fa;border-radius:8px;padding:12px;margin-bottom:15px;font-size:0.9em;">
                <i class="fas fa-wallet" style="color:#27ae60;"></i>
                Баланс: <strong style="color:#27ae60;">${wallet.toFixed(2)} EUR</strong>
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn btn-reserve">Резервирай</button>
                <button type="button" class="btn btn-primary" onclick="closeParkingModal()">Отмени</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
}

async function handleReservationSubmit(event, parkingId) {
    event.preventDefault();
    const parking = parkingData.find(p => p.id === parkingId);
    const name      = document.getElementById('resName').value;
    const phone     = document.getElementById('resPhone').value;
    const carInfo   = document.getElementById('resCarInfo').value;
    const startTime = document.getElementById('resStartTime').value;
    const endTime   = document.getElementById('resEndTime').value;

    const start = new Date(startTime);
    const end   = new Date(endTime);
    const durationHours = (end - start) / (1000 * 60 * 60);
    if (durationHours <= 0) { showNotification('Крайният час трябва да е след началния!', 'error'); return; }

    const pricePerHour = parseFloat(parking.price);
    const totalCost    = durationHours * pricePerHour;
    if (wallet < totalCost) { showNotification('Нямаш достатъчно средства! Добави средства в портфейла.', 'error'); return; }

    const btn = document.querySelector('#reservationForm button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = '...'; }

    try {
        const result = await API.createBooking({
            parkingId,
            parkingName: parking.name,
            bookingDate: new Date().toLocaleDateString('bg-BG'),
            bookingTime: new Date().toLocaleTimeString('bg-BG'),
            startTime, endTime,
            duration: `${durationHours.toFixed(1)} часа`,
            price: totalCost.toFixed(2),
            name, phone, carInfo
        });

        // Update local state
        wallet = result.wallet;
        transactions.unshift({ type: 'parking', name: `Резервация: ${parking.name}`, amount: totalCost, date: new Date().toLocaleDateString('bg-BG') });

        // Update parking locally
        const idx = parkingData.findIndex(p => p.id === parkingId);
        if (idx !== -1) {
            parkingData[idx].availableSpots = Math.max(0, parkingData[idx].availableSpots - 1);
            if (parkingData[idx].availableSpots === 0) parkingData[idx].status = 'full';
            else parkingData[idx].status = 'reserved';
        }

        // Reload bookings from server
        bookings = await API.getBookings();

        showNotification('Резервация направена успешно!', 'success');
        closeParkingModal();
        loadAllParkings();
    } catch (err) {
        showNotification(err.message || 'Грешка при резервация!', 'error');
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Резервирай'; }
    }
}

function loadBookings() {
    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '';

    const activeBookings = bookings.filter(b => b.status === 'Активна').length;
    const totalHours = bookings.reduce((sum, b) => sum + parseFloat(b.duration) || 0, 0);

    document.getElementById('activeBookingsCount').textContent = activeBookings;
    document.getElementById('totalReservedHours').textContent = totalHours.toFixed(1) + 'h';

    if (bookings.length === 0) {
        document.getElementById('noBookingsMessage').style.display = 'block';
        return;
    }
    document.getElementById('noBookingsMessage').style.display = 'none';

    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-details">
                <h3>${booking.parkingName}</h3>
                <p><i class="fas fa-calendar"></i> Дата: ${booking.bookingDate}</p>
                <p><i class="fas fa-clock"></i> Продължителност: ${booking.duration}</p>
                <p><i class="fas fa-tag"></i> Цена: ${booking.price} EUR</p>
                <p><strong style="color:#27AE60;">${booking.status}</strong></p>
                ${booking.status === 'Активна' ? `
                <div style="background:#e3f2fd;padding:10px;border-radius:8px;margin-top:10px;text-align:center;">
                    <div style="font-size:0.9em;color:var(--text-light);margin-bottom:5px;">Време до края:</div>
                    <div id="timer-${booking.id}" style="font-family:monospace;font-size:1.3em;font-weight:700;color:#3498DB;">00:00:00</div>
                </div>` : ''}
            </div>
            <div class="booking-actions">
                ${booking.status === 'Активна' ? `<button class="btn btn-cancel" onclick="cancelBooking(${booking.id})">Отмени</button>` : ''}
            </div>
        `;
        container.appendChild(card);
        if (booking.status === 'Активна') {
            const durationMin = parseFloat(booking.duration) * 60;
            startBookingTimer(booking.id, durationMin);
        }
    });
}

async function cancelBooking(bookingId) {
    if (!confirm('Сигурен ли си, че искаш да отмениш тази резервация?')) return;
    try {
        const result = await API.cancelBooking(bookingId);
        bookings = await API.getBookings();

        // Update parking locally if returned
        if (result.parking) {
            const idx = parkingData.findIndex(p => p.id === result.parking.id);
            if (idx !== -1) parkingData[idx] = result.parking;
        }

        loadBookings();
        loadAllParkings();
        showNotification('Резервация отменена!', 'success');
    } catch (err) {
        showNotification(err.message || 'Грешка!', 'error');
    }
}
