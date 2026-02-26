// ============ NEWS ============
function loadNews() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-image">${news.icon}</div>
            <div class="news-content">
                <div class="news-date">${news.date}</div>
                <div class="news-title">${news.title}</div>
                <div class="news-description">${news.description}</div>
                <div class="news-footer">
                    <a class="read-more" href="#">Прочети повече →</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
