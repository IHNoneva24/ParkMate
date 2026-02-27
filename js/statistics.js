// ============ STATISTICS ============
function loadStatistics() {
    const totalBookings = bookings.length;
    const totalSpent = bookings.reduce((sum, b) => sum + parseFloat(b.price) || 0, 0);
    const totalHours = bookings.reduce((sum, b) => sum + (parseFloat(b.duration) || 0), 0);
    const avgRating = 4.5;

    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalSpent').textContent = totalSpent.toFixed(2) + ' BGN';
    document.getElementById('totalHours').textContent = totalHours.toFixed(1) + 'h';
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);

    const chartsContainer = document.getElementById('chartsContainer');
    const feb = Math.min(totalSpent, 100);
    const jan = 40;
    const dec = 65;
    
    chartsContainer.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h3 style="color: var(--text-dark); margin-bottom: 20px;">Разходи по месеци</h3>
            <div style="display: flex; align-items: flex-end; gap: 15px; height: 200px; margin-bottom: 20px;">
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #3498DB 0%, #3498DB ${feb}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Февруари</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">${totalSpent.toFixed(2)} BGN</p>
                </div>
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #27AE60 0%, #27AE60 ${jan}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Януари</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">28.00 BGN</p>
                </div>
                <div style="text-align: center; flex: 1;">
                    <div style="background: linear-gradient(to top, #E74C3C 0%, #E74C3C ${dec}%); width: 100%; height: 150px; border-radius: 5px; margin-bottom: 10px;"></div>
                    <p style="color: var(--text-light); font-size: 0.9em; margin: 0;">Декември</p>
                    <p style="color: var(--text-dark); font-weight: 600; margin: 5px 0 0;">45.50 BGN</p>
                </div>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid var(--border-color);">
                <p style="color: var(--text-light); margin: 0;">Средна месячна разход: <span style="color: var(--text-dark); font-weight: 600; font-size: 1.2em;">${((totalSpent + 28 + 45.5) / 3).toFixed(2)} BGN</span></p>
            </div>
        </div>
        <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: var(--text-dark); margin-bottom: 20px;">Заетост на паркингите</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                ${parkingData.slice(0, 6).map(parking => {
                    const occupancyPercent = ((parking.totalSpots - parking.availableSpots) / parking.totalSpots) * 100;
                    const color = occupancyPercent > 80 ? '#E74C3C' : occupancyPercent > 50 ? '#F39C12' : '#27AE60';
                    return `
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="width: 120px; font-size: 0.9em; color: var(--text-dark); font-weight: 600;">${parking.name}</div>
                            <div style="flex: 1; background: #ecf0f1; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="width: ${occupancyPercent}%; height: 100%; background: ${color}; border-radius: 4px;"></div>
                            </div>
                            <div style="width: 60px; text-align: right; font-size: 0.9em; color: var(--text-light);">${Math.round(occupancyPercent)}%</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.9em; color: var(--text-light);">
                        <span style="color: #27AE60;">●</span> Свободен (< 50%) 
                        <span style="color: #F39C12; margin-left: 10px;">●</span> Среден (50-80%) 
                        <span style="color: #E74C3C; margin-left: 10px;">●</span> Пълен (> 80%)
                    </div>
                    <button onclick="loadStatistics()" style="background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                        <i class="fas fa-sync"></i> Обнови
                    </button>
                </div>
            </div>
        </div>
    `;
}