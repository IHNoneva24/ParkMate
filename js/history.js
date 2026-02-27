// ============ HISTORY ============
function loadHistory() {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';

    const demoCompletedBookings = [
    { parkingName: 'Градски гараж', bookingDate: '18 февруари 2026', duration: '2 часа', price: '7.00 BGN', status: '✓ Завършена' },
    { parkingName: 'Южен район', bookingDate: '15 февруари 2026', duration: '3 часа', price: '7.50 BGN', status: '✓ Завършена' },
    { parkingName: 'Северен район', bookingDate: '10 февруари 2026', duration: '1 час', price: '2.75 BGN', status: '✓ Завършена' },
    { parkingName: 'Централен гараж', bookingDate: '05 февруари 2026', duration: '2 часа', price: '10.00 BGN', status: '✓ Завършена' }
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