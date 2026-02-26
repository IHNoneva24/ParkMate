// ============ REVIEWS ============
function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    const reviews = [
        { parking: 'Паркинг "Градски"', rating: 5, text: 'Отличен паркинг! Модерен и безопасен. Препоръчвам!', author: 'Иван П.' },
        { parking: 'Паркинг "Южен район"', rating: 4.5, text: 'Много хубаво място, удобна локация.', author: 'Мария К.' },
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