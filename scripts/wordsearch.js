window.wordSearchWords = [];
window.wordSearchTranslations = [];

window.startWordSearch = function() {
    const category = document.getElementById('wordSearchCategory').value;
    const count = parseInt(document.getElementById('wordSearchCount').value, 10) || 4;
    // Dummy words for demonstration; replace with actual category filtering logic
    const words = ['apple', 'banana', 'cat', 'dog', 'fish', 'house', 'tree', 'book', 'car', 'star'];
    const selectedWords = words.slice(0, count);

    // Display words
    document.getElementById('wordSearchWords').innerHTML = selectedWords.map(w => `<span>${w}</span>`).join(' ');

    // Generate a simple grid (for demonstration)
    let grid = '';
    for (let i = 0; i < count; i++) {
        grid += '<div>' + selectedWords[i].split('').join(' ') + '</div>';
    }
    document.getElementById('wordSearchGrid').innerHTML = grid;
};

window.generateWordSearchGrid = function() {
    // Simple square grid, size based on word count
    const size = Math.max(8, Math.ceil(Math.sqrt(window.wordSearchWords.join('').length)) + 2);
    let grid = Array.from({length: size}, () => Array(size).fill(''));
    let directions = [
        [0,1], [1,0], [1,1], [-1,1]
    ];

    function canPlace(word, row, col, dr, dc) {
        for (let i = 0; i < word.length; i++) {
            let r = row + dr * i, c = col + dc * i;
            if (r < 0 || r >= size || c < 0 || c >= size) return false;
            if (grid[r][c] && grid[r][c] !== word[i]) return false;
        }
        return true;
    }

    function placeWord(word) {
        for (let tries = 0; tries < 100; tries++) {
            let drdc = directions[Math.floor(Math.random() * directions.length)];
            let dr = drdc[0], dc = drdc[1];
            let row = Math.floor(Math.random() * size);
            let col = Math.floor(Math.random() * size);
            if (canPlace(word, row, col, dr, dc)) {
                for (let i = 0; i < word.length; i++) {
                    let r = row + dr * i, c = col + dc * i;
                    grid[r][c] = word[i];
                }
                return true;
            }
        }
        return false;
    }

    // Place all words
    grid = Array.from({length: size}, () => Array(size).fill(''));
    window.wordSearchWords.forEach(word => placeWord(word));

    // Fill empty cells with random letters
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (!grid[r][c]) {
                grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
    window.wordSearchGrid = grid;
};

window.renderWordSearch = function() {
    const gridDiv = document.getElementById('wordSearchGrid');
    const wordsDiv = document.getElementById('wordSearchWords');
    if (!gridDiv || !wordsDiv) return;
    gridDiv.innerHTML = '';
    wordsDiv.innerHTML = '';

    // Render grid (unchanged)
    gridDiv.style.gridTemplateColumns = `repeat(${window.wordSearchGrid.length}, 2em)`;
    gridDiv.style.gridTemplateRows = `repeat(${window.wordSearchGrid.length}, 2em)`;
    for (let r = 0; r < window.wordSearchGrid.length; r++) {
        for (let c = 0; c < window.wordSearchGrid.length; c++) {
            const cell = document.createElement('div');
            cell.className = 'word-search-cell';
            cell.textContent = window.wordSearchGrid[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.onclick = () => window.selectWordSearchCell(r, c, cell);
            gridDiv.appendChild(cell);
        }
    }

    // Render word list as a two-column table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    for (let i = 0; i < window.wordSearchWords.length; i++) {
        const tr = document.createElement('tr');
        const tdWord = document.createElement('td');
        const tdTrans = document.createElement('td');
        tdWord.className = 'ws-word' + (window.wordSearchFound.includes(window.wordSearchWords[i]) ? ' ws-found' : '');
        tdWord.textContent = window.wordSearchWords[i];
        tdWord.style.padding = '2px 8px';
        tdTrans.textContent = window.wordSearchTranslations[i];
        tdTrans.style.padding = '2px 8px';
        tr.appendChild(tdWord);
        tr.appendChild(tdTrans);
        table.appendChild(tr);
    }
    wordsDiv.appendChild(table);

    window.wordSearchSelection = [];
};

window.wordSearchSelection = [];

window.selectWordSearchCell = function(row, col, cell) {
    if (!cell) return;
    // Add to selection
    window.wordSearchSelection.push({row, col, cell});
    cell.classList.add('selected');

    // If selection is at least 2, check for a word
    if (window.wordSearchSelection.length >= 2) {
        const word = window.getWordSearchSelection();
        if (window.wordSearchWords.includes(word)) {
            window.wordSearchFound.push(word);
            window.wordSearchSelection.forEach(sel => sel.cell.classList.add('found'));
            window.wordSearchSelection = [];
            window.renderWordSearch();
            if (window.wordSearchFound.length === window.wordSearchWords.length) {
                window.showMessage && window.showMessage('You found all words! 🎉', 'success');
            }
        } else {
            setTimeout(() => {
                window.wordSearchSelection.forEach(sel => sel.cell.classList.remove('selected'));
                window.wordSearchSelection = [];
            }, 500);
        }
    }
};

window.getWordSearchSelection = function() {
    if (window.wordSearchSelection.length < 2) return '';
    const sel = window.wordSearchSelection;
    const dr = sel[1].row - sel[0].row;
    const dc = sel[1].col - sel[0].col;
    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = dr === 0 ? 0 : dr / (len - 1);
    const stepC = dc === 0 ? 0 : dc / (len - 1);
    let word = '';
    for (let i = 0; i < len; i++) {
        const r = Math.round(sel[0].row + stepR * i);
        const c = Math.round(sel[0].col + stepC * i);
        word += window.wordSearchGrid[r][c];
    }
    return word;
};

window.startMemoryGame = function() {
    const categorySelect = document.getElementById('memoryCategory');
    const countInput = document.getElementById('memoryCount');
    if (!categorySelect || !window.vocabulary) return;

    const category = categorySelect.value;
    let pool = category === 'all' ? [...window.vocabulary] : window.vocabulary.filter(w => w.category === category);

    // Shuffle and pick up to 8 pairs (16 cards)
    const pairCount = Math.max(2, Math.min(10, parseInt(countInput?.value, 10) || 4)); // default 4 pairs, min 2, max 10
    pool = window.shuffleArray ? window.shuffleArray(pool) : pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, pairCount);

    // Create pairs: one card for word, one for translation
    const cards = [];
    selected.forEach(w => {
        cards.push({ value: w.word, pair: w.translation, type: 'word', id: w.word + '_w' });
        cards.push({ value: w.translation, pair: w.word, type: 'translation', id: w.word + '_t' });
    });

    // Shuffle cards
    const shuffled = window.shuffleArray ? window.shuffleArray(cards) : cards.sort(() => Math.random() - 0.5);

    // Render cards
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    shuffled.forEach((card, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card';
        cardDiv.dataset.index = idx;
        cardDiv.dataset.value = card.value;
        cardDiv.dataset.pair = card.pair;
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${card.value}</div>
            </div>
        `;
        cardDiv.onclick = function() { window.flipMemoryCard(cardDiv); };
        grid.appendChild(cardDiv);
    });

    // Dynamically set grid columns/rows for a compact layout
    const totalCards = cards.length;
    let columns = Math.ceil(Math.sqrt(totalCards));
    let rows = Math.ceil(totalCards / columns);
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(80px, 1fr))`;
    grid.style.gridAutoRows = '1fr';
    window.memoryFlipped = [];
    window.memoryMatched = [];
};

window.flipMemoryCard = function(cardDiv) {
    if (cardDiv.classList.contains('flipped') || cardDiv.classList.contains('matched')) return;
    if (window.memoryFlipped.length === 2) return;

    cardDiv.classList.add('flipped');
    window.memoryFlipped.push(cardDiv);

    if (window.memoryFlipped.length === 2) {
        const [first, second] = window.memoryFlipped;
        // Check if they are a pair (word and its translation)
        if (
            first.dataset.value === second.dataset.pair &&
            second.dataset.value === first.dataset.pair
        ) {
            first.classList.add('matched');
            second.classList.add('matched');
            window.memoryMatched.push(first, second);
            window.memoryFlipped = [];
            // Optionally, check for win
            if (window.memoryMatched.length === document.querySelectorAll('.memory-card').length) {
                window.showMessage && window.showMessage('You matched all pairs! 🎉', 'success');
            }
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                window.memoryFlipped = [];
            }, 900);
        }
    }
};