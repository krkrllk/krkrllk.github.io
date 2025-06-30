window.vocabulary = [];
try {
    const savedVocab = localStorage.getItem('vocabulary');
    window.vocabulary = savedVocab ? JSON.parse(savedVocab) : [];
} catch (e) {}

window.handleSubmit = function(event) {
    event.preventDefault();
    window.addWord();
};

window.showMessage = function(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    messageDiv.className = type;
    messageDiv.textContent = text;
    setTimeout(() => messageDiv.textContent = '', 3000);
};

window.addWord = function() {
    const wordInput = document.getElementById('word');
    const translationInput = document.getElementById('translation');
    const categorySelect = document.getElementById('category');
    if (!wordInput || !translationInput || !categorySelect) return;
    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    const category = categorySelect.value;
    if (!category) { window.showMessage('Please select a category', 'error'); return; }
    if (window.vocabulary.some(item => item.word.toLowerCase() === word.toLowerCase())) {
        window.showMessage('This word already exists in your dictionary', 'error'); return;
    }
    const newWord = {
        id: Date.now(),
        word: word,
        translation: translation,
        category: category,
        dateAdded: new Date().toISOString()
    };
    window.vocabulary.push(newWord);
    window.saveVocabulary();
    localStorage.setItem('lastCategory', category);
    document.getElementById('addWordForm').reset();
    window.showMessage('Word added successfully!');
    window.updateStats();
    window.displayDictionary();
};

window.saveVocabulary = function() {
    try { localStorage.setItem('vocabulary', JSON.stringify(window.vocabulary)); } catch (e) { }
};

window.deleteWord = function(id) {
    if (confirm('Are you sure you want to delete this word?')) {
        window.vocabulary = window.vocabulary.filter(item => item.id !== id);
        window.saveVocabulary();
        window.updateStats();
        window.displayDictionary();
        window.showMessage('Word deleted successfully');
    }
};

window.updateStats = function() {
    const stats = document.getElementById('stats');
    if (!stats) return;
    const totalWords = window.vocabulary.length;
    const categoryCounts = window.vocabulary.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});
    stats.innerHTML = `Total Words: ${totalWords}<br>${Object.entries(categoryCounts).map(([category, count]) => `${category}: ${count}`).join(' | ')}`;
};

window.displayDictionary = function(wordsToDisplay = window.vocabulary) {
    const grid = document.getElementById('dictionaryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (wordsToDisplay.length === 0) {
        grid.innerHTML = '<p>No words found. Add some words to your dictionary!</p>';
        return;
    }
    wordsToDisplay.forEach(item => {
        const wordDiv = document.createElement('div');
        wordDiv.textContent = item.word;
        const translationDiv = document.createElement('div');
        translationDiv.textContent = item.translation;
        const categoryDiv = document.createElement('div');
        categoryDiv.textContent = item.category;
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => window.deleteWord(item.id);
        grid.appendChild(wordDiv);
        grid.appendChild(translationDiv);
        grid.appendChild(categoryDiv);
        grid.appendChild(deleteBtn);
    });
};

window.searchDictionary = function() {
    const searchTerm = document.getElementById('searchWord').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const filteredVocab = window.vocabulary.filter(item => {
        const matchesSearch = item.word.toLowerCase().includes(searchTerm) || item.translation.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || item.category === category;
        return matchesSearch && matchesCategory;
    });
    window.displayDictionary(filteredVocab);
};

window.filterDictionary = function() { window.searchDictionary(); };


// Add the verbs if not present
window.irregularVerbsList.forEach(verb => {
    if (!window.vocabulary.some(v => v.word === verb.word && v.category === "irregular verbs")) {
        window.vocabulary.push({
            id: Date.now() + Math.random(),
            word: verb.word,
            translation: `${verb.past}, ${verb.part}`,
            category: "irregular verbs",
            past: verb.past,
            part: verb.part,
            ua: verb.ua,
            dateAdded: new Date().toISOString()
        });
    }
});
window.saveVocabulary && window.saveVocabulary();