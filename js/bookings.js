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