// ============ HISTORY ============
function loadHistory() {
    const container = document.getElementById('historyContainer');
    container.innerHTML = '';

    const completed = bookings.filter(b => b.status !== 'Активна');
    document.getElementById('completedCount').textContent = completed.length;

    const ratings = parkingData.map(p => p.rating).filter(Boolean);
    const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '0.0';
    document.getElementById('historyRating').textContent = avg;

    if (!completed.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>Все още нямаш завършени резервации</p></div>';
        return;
    }

    completed.forEach(b => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-details">
                <h3>${b.parkingName}</h3>
                <p><i class="fas fa-calendar"></i> Дата: ${b.bookingDate}</p>
                <p><i class="fas fa-clock"></i> Продължителност: ${b.duration}</p>
                <p><i class="fas fa-tag"></i> Цена: ${b.price} BGN</p>
                <span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:0.82em;font-weight:700;background:${b.status==='Отменена'?'#fdecea':'#d5f5e3'};color:${b.status==='Отменена'?'#c0392b':'#1e8449'};">${b.status}</span>
            </div>
            <div class="booking-actions">
                <button class="btn btn-primary" onclick="showReviewForm('${b.parkingName}')" style="padding:8px 15px;font-size:0.9em;">
                    <i class="fas fa-star"></i> Напиши отзив
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}