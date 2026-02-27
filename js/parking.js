// ============ PARKING DISPLAY ============
function loadAllParkings() {
    const container = document.getElementById('parkingListContainer');
    container.innerHTML = '';

    parkingData.forEach(parking => {
        const card = createParkingCard(parking);
        container.appendChild(card);
    });
}

function createParkingCard(parking) {
    const card = document.createElement('div');
    card.className = 'parking-card';
    const isFavorite = favorites.includes(parking.id);
    const statusText = parking.status === 'available' ? 'Свободен' :
                      parking.status === 'full' ? 'Пълен' : 'Резервиран';
    const statusClass = `status-${parking.status}`;

    card.innerHTML = `
        <div class="parking-header">
            <h3 class="parking-name">${parking.name}</h3>
            <span class="parking-status ${statusClass}">${statusText}</span>
        </div>
        <div class="parking-info">
            <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${parking.location}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-car"></i>
                <span>${parking.availableSpots} / ${parking.totalSpots} места</span>
            </div>
            <div class="info-item">
                <i class="fas fa-dollar-sign"></i>
                <span class="parking-price">${parking.price}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-star" style="color: #FFD700;"></i>
                <span>${parking.rating}/5 (${parking.reviews} Отзива)</span>
            </div>
        </div>
        <p class="parking-description">${parking.description}</p>
        <div class="parking-footer">
            <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" 
                    onclick="toggleFavorite(event, ${parking.id})">
                <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-compare" onclick="toggleCompare(event, ${parking.id})">
                <i class="fas fa-balance-scale"></i>
            </button>
            <button class="btn btn-view" onclick="showParkingDetails(${parking.id})">
                <i class="fas fa-eye"></i> Детайли
            </button>
            <button class="btn btn-reserve btn-success" onclick="makeBooking(${parking.id})">
                <i class="fas fa-calendar"></i> Резервирай
            </button>
        </div>
    `;

    return card;
}

function showParkingDetails(parkingId) {
    const parking = parkingData.find(p => p.id === parkingId);
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');

    const statusText = parking.status === 'available' ? 'Свободен' :
                      parking.status === 'full' ? 'Пълен' : 'Резервиран';

    const spots = [];
    for (let i = 1; i <= parking.totalSpots; i++) {
        const isAvailable = i <= parking.availableSpots;
        spots.push(`
            <div class="spot ${isAvailable ? 'available' : 'occupied'}" 
                 onclick="${isAvailable ? `selectSpot(${parking.id}, ${i})` : ''}" 
                 data-spot="${i}">
                ${i}
            </div>
        `);
    }

    const directions = currentLocation ? getDirectionsToParking(parking) : null;

    details.innerHTML = `
        <div style="max-width: 600px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: var(--text-dark);">${parking.name}</h2>
                <p style="color: var(--text-light); margin: 5px 0;">${parking.location}</p>
                <div style="display: inline-flex; align-items: center; gap: 8px; background: ${parking.status === 'available' ? '#d4edda' : parking.status === 'full' ? '#f8d7da' : '#cce7ff'}; color: ${parking.status === 'available' ? '#155724' : parking.status === 'full' ? '#721c24' : '#004085'}; padding: 8px 16px; border-radius: 20px; font-weight: 600;">
                    ${statusText}
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-parking" style="font-size: 24px; color: #3498DB; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.availableSpots}/${parking.totalSpots}</div>
                    <div style="font-size: 12px; color: var(--text-light);">Свободни места</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-euro-sign" style="font-size: 24px; color: #27AE60; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.price}</div>
                    <div style="font-size: 12px; color: var(--text-light);">На час</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-star" style="font-size: 24px; color: #FFD700; margin-bottom: 8px;"></i>
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-dark);">${parking.rating}/5</div>
                    <div style="font-size: 12px; color: var(--text-light);">${parking.reviews} Отзива</div>
                </div>
            </div>

            ${directions ? `
            <div style="background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); border: 1px solid #3498DB; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <i class="fas fa-route" style="color: #3498DB; font-size: 18px; margin-right: 10px;"></i>
                    <span style="font-size: 14px; font-weight: 700; color: #2C3E50;">Посока до паркинга</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #3498DB;">${directions.distance} km</div>
                        <div style="font-size: 11px; color: #7F8C8D;">РАЗСТОЯНИЕ</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #27AE60;">${directions.time} мин</div>
                        <div style="font-size: 11px; color: #7F8C8D;">С КОЛА</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; color: #F39C12;">${directions.walkingTime} мин</div>
                        <div style="font-size: 11px; color: #7F8C8D;">ПЕША</div>
                    </div>
                </div>
            </div>
            ` : ''}

            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: var(--text-dark); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-parking"></i>
                    Изберете паркомясто
                </h3>
                <div class="spot-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); gap: 8px; max-height: 200px; overflow-y: auto; padding: 10px; background: #f8f9fa; border-radius: 10px;">
                    ${spots.join('')}
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: var(--text-light);">
                    <span style="color: #27AE60;">●</span> Свободно 
                    <span style="color: #E74C3C; margin-left: 15px;">●</span> Заето
                    <span style="color: #3498DB; margin-left: 15px;">●</span> Избрано
                </div>
            </div>

            <div style="background: #f8f9fa; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-dark);">Описание</h4>
                <p style="margin: 0; color: var(--text-light); line-height: 1.5;">${parking.description}</p>
                
                <h4 style="margin: 15px 0 10px 0; color: var(--text-dark);">Удобства</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${parking.amenities.map(a => `<span style="background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 15px; font-size: 12px; display: flex; align-items: center; gap: 4px;"><i class="fas fa-check"></i>${a}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function selectSpot(parkingId, spotNumber) {
    document.querySelectorAll('.spot.selected').forEach(spot => {
        spot.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    
    showNotification(`Избрахте място №${spotNumber}`, 'success');
}

// ============ FAVORITES ============
async function toggleFavorite(event, parkingId) {
    event.stopPropagation();
    const isFav = favorites.includes(parkingId);
    try {
        if (isFav) {
            await API.removeFavorite(parkingId);
            favorites = favorites.filter(id => id !== parkingId);
            showNotification('Премахнато от любими!', 'info');
        } else {
            await API.addFavorite(parkingId);
            favorites.push(parkingId);
            showNotification('Добавено в любими!', 'success');
        }
        // refresh heart buttons
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            const idMatch = btn.getAttribute('onclick').match(/\d+\)$/);
            if (idMatch) {
                const bid = parseInt(idMatch[0]);
                btn.classList.toggle('active', favorites.includes(bid));
            }
        });
    } catch (e) {
        showNotification(e.message || 'Грешка!', 'error');
    }
}

function toggleCompare(event, parkingId) {
    event.stopPropagation();
    if (compareList.includes(parkingId)) {
        compareList = compareList.filter(id => id !== parkingId);
        showNotification('Премахнато от сравнение!', 'info');
    } else {
        if (compareList.length >= 3) {
            showNotification('Можете да сравнявате максимум 3 паркинга!', 'warning');
            return;
        }
        compareList.push(parkingId);
        showNotification('Добавено за сравнение!', 'success');
    }
    saveToLocalStorage();
    
    updateCompareButtons();
    updateCompareBar();
}

function updateCompareButtons() {
    document.querySelectorAll('.btn-compare').forEach(btn => {
        const parkingId = parseInt(btn.onclick.toString().match(/\d+/)[0]);
        if (compareList.includes(parkingId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateCompareBar() {
    let compareBar = document.getElementById('compareBar');
    if (!compareBar) {
        compareBar = document.createElement('div');
        compareBar.id = 'compareBar';
        compareBar.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            display: none;
            align-items: center;
            gap: 15px;
            font-weight: 600;
        `;
        document.body.appendChild(compareBar);
    }
    
    if (compareList.length > 0) {
        const compareParkings = compareList.map(id => parkingData.find(p => p.id === id));
        compareBar.innerHTML = `
            <span>Сравняване: ${compareParkings.map(p => p.name).join(', ')}</span>
            <button onclick="showCompareModal()" style="background: white; color: var(--primary-color); border: none; padding: 5px 15px; border-radius: 15px; cursor: pointer; font-weight: 600;">Сравни</button>
            <button onclick="clearCompare()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 5px 10px; border-radius: 50%; cursor: pointer;">×</button>
        `;
        compareBar.style.display = 'flex';
    } else {
        compareBar.style.display = 'none';
    }
}

function clearCompare() {
    compareList = [];
    saveToLocalStorage();
    updateCompareButtons();
    updateCompareBar();
    showNotification('Сравнението е изчистено!', 'info');
}

function showCompareModal() {
    const modal = document.getElementById('parkingModal');
    const details = document.getElementById('modalParkingDetails');
    
    const compareParkings = compareList.map(id => parkingData.find(p => p.id === id));
    
    details.innerHTML = `
        <h2>Сравнение на паркинги</h2>
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background: var(--primary-light);">
                        <th style="padding: 12px; text-align: left; border: 1px solid var(--border-color);">Характеристика</th>
                        ${compareParkings.map(p => `<th style="padding: 12px; text-align: left; border: 1px solid var(--border-color);">${p.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Локация</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.location}</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Цена/час</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.price}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Общо места</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.totalSpots}</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Свободни места</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.availableSpots}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Рейтинг</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.rating}/5</td>`).join('')}
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Отзиви</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.reviews}</td>`).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid var(--border-color); font-weight: 600;">Удобства</td>
                        ${compareParkings.map(p => `<td style="padding: 12px; border: 1px solid var(--border-color);">${p.amenities.join(', ')}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top: 20px; text-align: center;">
            <button class="btn btn-primary" onclick="closeParkingModal()">Затвори</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function loadFavorites() {
    const container = document.getElementById('favoritesContainer');
    const emptyMessage = document.getElementById('noFavoritesMessage');
    container.innerHTML = '';

    const favoritesParkings = parkingData.filter(p => favorites.includes(p.id));

    if (favoritesParkings.length === 0) {
        container.style.display = 'none';
        emptyMessage.style.display = 'block';
    } else {
        container.style.display = 'grid';
        emptyMessage.style.display = 'none';
        
        favoritesParkings.forEach(parking => {
            const card = createParkingCard(parking);
            container.appendChild(card);
        });
    }
}

// Search and filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchParkings');
    const filterSelect = document.getElementById('filterStatus');
    const priceFilter = document.getElementById('priceFilter');

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const filterValue = filterSelect ? filterSelect.value : '';
        const maxPrice = priceFilter ? parseFloat(priceFilter.value) || Infinity : Infinity;
        
        const cards = document.querySelectorAll('.parking-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const status = card.querySelector('.parking-status');
            const priceText = card.querySelector('.parking-price')?.textContent || '';
            const price = parseFloat(priceText.replace(' BGN/час', '')) || 0;
            
            const matchesSearch = text.includes(searchTerm);
            const matchesStatus = !filterValue || status.className.includes(filterValue);
            const matchesPrice = price <= maxPrice;
            
            card.style.display = matchesSearch && matchesStatus && matchesPrice ? 'block' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', applyFilters);
    }

    if (priceFilter) {
        priceFilter.addEventListener('input', applyFilters);
    }
});