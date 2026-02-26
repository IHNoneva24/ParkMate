// ============ WALLET ============
function loadWallet() {
    document.getElementById('walletBalance').textContent = wallet.toFixed(2) + ' BGN';

    const container = document.getElementById('transactionsContainer');
    container.innerHTML = '';

    if (transactions.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light); text-align: center;">Няма транзакции</p>';
        return;
    }

    transactions.forEach(trans => {
        const item = document.createElement('div');
        item.className = 'transaction-item';

        const iconClass = trans.type === 'add' ? 'add' : 'subtract';
        const sign = trans.type === 'add' ? '+' : '-';
        const amountClass = trans.type === 'add' ? 'add' : 'subtract';

        item.innerHTML = `
            <div class="transaction-type">
                <div class="transaction-icon ${iconClass}">
                    ${trans.type === 'add' ? '✓' : '✗'}
                </div>
                <div class="transaction-details">
                    <div class="transaction-name">${trans.name}</div>
                    <div class="transaction-date">${trans.date}</div>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${sign}${trans.amount.toFixed(2)} BGN
            </div>
        `;
        container.appendChild(item);
    });
}

function addFunds() {
    const amount = prompt('Колко средства искаш да добавиш? (BGN)', '20');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        const parsedAmount = parseFloat(amount);
        wallet += parsedAmount;
        transactions.unshift({
            type: 'add',
            name: 'Добавяне на средства',
            amount: parsedAmount,
            date: new Date().toLocaleDateString('bg-BG')
        });
        saveToLocalStorage();
        loadWallet();
        showNotification(`Добавихте ${parsedAmount.toFixed(2)} BGN`, 'success');
    }
}