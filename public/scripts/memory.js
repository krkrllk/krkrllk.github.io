window.memoryCards = [];
window.memoryFlipped = [];
window.memoryMatched = [];
window.memoryLock = false;

window.startMemoryGame = function() {
    const categorySelect = document.getElementById('memoryCategory');
    const pairCountInput = document.getElementById('memoryPairCount');
    if (!categorySelect || !pairCountInput || !window.vocabulary) return;

    const category = categorySelect.value;
    const pairCount = Math.max(2, Math.min(20, parseInt(pairCountInput.value, 10) || 6));
    let pool = category === 'all' ? [...window.vocabulary] : window.vocabulary.filter(w => w.category === category);

    if (pool.length < pairCount) {
        window.showMessage && window.showMessage('Not enough words for selected number of pairs', 'error');
        return;
    }

    pool = window.shuffleArray ? window.shuffleArray(pool) : pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, pairCount);
    window.memoryCards = window.shuffleArray(
        selected.flatMap(word => [
            { id: word.id + '_w', type: 'word', value: word.word, pairId: word.id },
            { id: word.id + '_t', type: 'translation', value: word.translation, pairId: word.id }
        ])
    );
    window.memoryFlipped = [];
    window.memoryMatched = [];
    window.memoryLock = false;
    window.renderMemoryGrid();
};

window.renderMemoryGrid = function() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    window.memoryCards.forEach((card, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card' +
            (window.memoryFlipped.includes(idx) ? ' flipped' : '') +
            (window.memoryMatched.includes(idx) ? ' matched' : '');
        cardDiv.onclick = () => window.flipMemoryCard(idx);
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${window.memoryFlipped.includes(idx) || window.memoryMatched.includes(idx) ? card.value : ''}</div>
            </div>
        `;
        grid.appendChild(cardDiv);
    });
};

window.flipMemoryCard = function(idx) {
    if (window.memoryLock || window.memoryFlipped.includes(idx) || window.memoryMatched.includes(idx)) return;
    window.memoryFlipped.push(idx);
    window.renderMemoryGrid();

    if (window.memoryFlipped.length === 2) {
        window.memoryLock = true;
        setTimeout(() => {
            const [i1, i2] = window.memoryFlipped;
            const c1 = window.memoryCards[i1];
            const c2 = window.memoryCards[i2];
            if (c1.pairId === c2.pairId && c1.type !== c2.type) {
                window.memoryMatched.push(i1, i2);
                if (window.memoryMatched.length === window.memoryCards.length) {
                    window.showMessage && window.showMessage('You matched all pairs! 🎉', 'success');
                }
            }
            window.memoryFlipped = [];
            window.memoryLock = false;
            window.renderMemoryGrid();
        }, 900);
    }
};