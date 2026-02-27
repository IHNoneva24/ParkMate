// ============ WALLET ============
function loadWallet() {
    document.getElementById('walletBalance').textContent = wallet.toFixed(2) + ' EUR';
    document.getElementById('transactionCount').textContent = transactions.length;

    const container = document.getElementById('transactionsContainer');
    container.innerHTML = '';

    if (!transactions.length) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:20px;">Няма транзакции</p>';
        return;
    }

    transactions.forEach(tx => {
        const isAdd = tx.type === 'add';
        const div = document.createElement('div');
        div.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border-color);';
        div.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:36px;height:36px;border-radius:50%;background:${isAdd ? '#d5f5e3' : '#fdecea'};display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-${isAdd ? 'plus' : 'minus'}" style="color:${isAdd ? '#27ae60' : '#e74c3c'};font-size:0.85em;"></i>
                </div>
                <div>
                    <div style="font-weight:600;font-size:0.9em;">${tx.name}</div>
                    <div style="font-size:0.78em;color:var(--text-light);">${tx.date}</div>
                </div>
            </div>
            <div style="font-weight:700;color:${isAdd ? '#27ae60' : '#e74c3c'};">
                ${isAdd ? '+' : '-'}${tx.amount.toFixed(2)} EUR
            </div>
        `;
        container.appendChild(div);
    });
}

async function addFunds() {
    const amountStr = prompt('Въведи сума за добавяне (EUR):', '20');
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) { showNotification('Невалидна сума!', 'error'); return; }

    try {
        const result = await API.addFunds(amount);
        wallet = result.balance;
        transactions.unshift({ type: 'add', name: 'Добавени средства', amount, date: new Date().toLocaleDateString('bg-BG') });
        loadWallet();
        showNotification(`Добавени ${amount.toFixed(2)} EUR!`, 'success');
    } catch (err) {
        showNotification(err.message || 'Грешка!', 'error');
    }
}
