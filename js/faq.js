// ============ FAQ ============

function loadFAQ() {
    const container = document.getElementById('faqContainer');
    container.innerHTML = '';

    faqData.forEach((faq, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        if (index === 0) item.classList.add('active');

        item.innerHTML = `
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">${faq.answer}</div>
        `;
        container.appendChild(item);
    });

    // Актуализираме езика на новодобавеното съдържание
    if (typeof updatePageLanguage === 'function') updatePageLanguage();
}

function toggleFAQ(element) {
    element.closest('.faq-item').classList.toggle('active');
}