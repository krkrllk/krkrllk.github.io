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
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';
grid.style.gap = '16px';

wordsToDisplay.forEach((wordObj) => {
    const row = document.createElement('div');
    row.className = 'dictionary-row';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.border = '1px solid #e2e8f0';
    row.style.borderRadius = '8px';
    row.style.padding = '8px 16px';
    row.style.marginBottom = '0';
    row.style.background = '#fff';
    row.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';

    row.innerHTML = `
      <span>
        <b>${wordObj.word}</b> — ${wordObj.translation} <span style="color:#667eea;">[${wordObj.category}]</span>
      </span>
      <button class="edit-word-btn" style="margin-left:10px;" onclick="editWordById(${wordObj.id})">Edit</button>
      <button class="delete-btn" style="margin-left:5px;" onclick="deleteWord(${wordObj.id})">Delete</button>
      <button class="voice-btn" title="Hear pronunciation">🔊</button>
    `;

    // ✅ Fix here: use wordObj instead of entry
    row.querySelector(".voice-btn").addEventListener("click", () => {
        speakWord(wordObj.word, "en-US");  // Speak the English word
        // Or also speak the translation:
        // speakWord(wordObj.translation, "uk-UA");
    });

    grid.appendChild(row);
});

};

// Edit by id (since vocabulary uses id, not index)
window.editWordById = function(id) {
    const grid = document.getElementById('dictionaryGrid');
    const idx = window.vocabulary.findIndex(w => w.id === id);
    if (idx === -1) return;
    const wordObj = window.vocabulary[idx];
    const row = grid.children[idx];
    row.innerHTML = `
      <input type="text" value="${wordObj.word}" id="editWord${id}" style="width:100px;">
      <input type="text" value="${wordObj.translation}" id="editTranslation${id}" style="width:100px;">
      <input type="text" value="${wordObj.category}" id="editCategory${id}" style="width:100px;">
      <button onclick="saveWordEditById(${id})">Save</button>
      <button onclick="displayDictionary()">Cancel</button>
    `;
};

window.saveWordEditById = function(id) {
    const idx = window.vocabulary.findIndex(w => w.id === id);
    if (idx === -1) return;
    const newWord = document.getElementById(`editWord${id}`).value.trim();
    const newTranslation = document.getElementById(`editTranslation${id}`).value.trim();
    const newCategory = document.getElementById(`editCategory${id}`).value.trim();
    if (!newWord || !newTranslation || !newCategory) {
        alert('All fields required!');
        return;
    }
    window.vocabulary[idx].word = newWord;
    window.vocabulary[idx].translation = newTranslation;

    // If new category doesn't exist, add it to dropdowns
    const allCategories = window.vocabulary.map(w => w.category);
    if (!allCategories.includes(newCategory)) {
        window.vocabulary[idx].category = newCategory;
        window.saveVocabulary();
        updateAllCategoryDropdowns(); // Update filter dropdown
        // If you have other category dropdowns, update them too
        // e.g. updateAddWordCategoryDropdown();
    } else {
        window.vocabulary[idx].category = newCategory;
        window.saveVocabulary();
    }
    window.displayDictionary();
    searchDictionary(); // Refresh filtered view
};

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

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('dictionarySearchInput');
    const categorySelect = document.getElementById('dictionaryCategorySelect');
    if (searchInput) {
        searchInput.addEventListener('input', updateDictionaryDisplay);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', updateDictionaryDisplay);
    }
    updateDictionaryDisplay();
});

function searchDictionary() {
    const searchValue = document.getElementById('searchWord').value.trim().toLowerCase();
    const selectedCategory = document.getElementById('filterCategory').value;
    let filtered = window.vocabulary;

    if (selectedCategory) {
        filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (searchValue) {
        filtered = filtered.filter(item =>
            item.word.toLowerCase().includes(searchValue) ||
            item.translation.toLowerCase().includes(searchValue)
        );
    }
    window.displayDictionary(filtered);
}

function filterDictionary() {
    searchDictionary(); // Just reuse the search logic for filtering
}

// Optionally, call this after adding/removing words or categories to update the category dropdown:
function updateCategoryDropdown() {
    const select = document.getElementById('filterCategory');
    if (!select) return;
    const categories = Array.from(new Set(window.vocabulary.map(w => w.category).filter(Boolean)));
    select.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function updateAllCategoryDropdowns() {
    const categories = Array.from(new Set(window.vocabulary.map(w => w.category).filter(Boolean)));

    // Update add word form category dropdown
    const addWordSelect = document.getElementById('category');
    if (addWordSelect) {
        addWordSelect.innerHTML = '';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            addWordSelect.appendChild(option);
        });
    }

    // Update filter dropdown above dictionary
    const filterSelect = document.getElementById('filterCategory');
    if (filterSelect) {
        filterSelect.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            filterSelect.appendChild(option);
        });
    }
}

// After adding/removing words, call updateCategoryDropdown() and searchDictionary() to refresh the UI.