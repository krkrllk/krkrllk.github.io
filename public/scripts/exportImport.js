vocabulary.push({
    id: Date.now() + Math.random(),
    word,
    translation,
    category: category || "general",
    sourceLanguage: sourceLanguage || "en",      // e.g. "en", "uk", "pl"
    targetLanguage: targetLanguage || "uk",      // e.g. "en", "uk", "pl"
    dateAdded: new Date().toISOString()
});
 

// Show word editor modal
function showWordEditor() {
    const modal = document.getElementById('wordEditorModal');
    const tbody = document.getElementById('wordEditorTable').querySelector('tbody');
    tbody.innerHTML = '';
    vocabulary.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input value="${item.word}" /></td>
            <td><input value="${item.translation}" /></td>
            <td><input value="${item.category || ''}" /></td>
            <td><button onclick="this.closest('tr').remove()">🗑️</button></td>
        `;
        tbody.appendChild(tr);
    });
    modal.style.display = 'flex';
}
function addWordEditorRow() {
    const tbody = document.getElementById('wordEditorTable').querySelector('tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><button onclick="this.closest('tr').remove()">🗑️</button></td>
    `;
    tbody.appendChild(tr);
}
function saveWordEditor() {
    const tbody = document.getElementById('wordEditorTable').querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const newVocab = [];
    rows.forEach(row => {
        const [word, translation, category] = Array.from(row.querySelectorAll('input')).map(i => i.value.trim());
        if (word && translation) {
            newVocab.push({
                id: Date.now() + Math.random(),
                 word,
                translation,
                category: category || "general",
                dateAdded: new Date().toISOString()
            });
        }
    });
    vocabulary = newVocab;
    saveVocabulary();
    updateStats();
    displayDictionary();
    closeWordEditor();
    showMessage("Words updated!", "success");
}
function closeWordEditor() {
    document.getElementById('wordEditorModal').style.display = 'none';
}

function importDictionaryFromText() {
    const text = document.getElementById('dictionaryTextArea').value.trim();
    if (!text) {
        showMessage("No text to import.", "error");
        return;
    }
    const lines = text.split(/\r?\n/).filter(Boolean);
    let added = 0;
    lines.forEach(line => {
        // Split by comma, but allow commas in translation if quoted
        const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        const [word, translation, category] = parts.map(s => s.replace(/^"|"$/g, '').trim());
        if (word && translation && !vocabulary.some(w => w.word.toLowerCase() === word.toLowerCase() && w.translation === translation)) {
            vocabulary.push({
                id: Date.now() + Math.random(),
                word,
                translation,
                category: category || "general",
                dateAdded: new Date().toISOString()
            });
            added++;
        }
    });
    saveVocabulary();
    updateStats && updateStats();
    displayDictionary && displayDictionary();
    refreshCategoryDropdowns && refreshCategoryDropdowns();

    const vocabCategories = Array.from(new Set(vocabulary.map(w => (w.category || "general").toLowerCase())));
    let changed = false;
    vocabCategories.forEach(cat => {
        if (!window.categories.includes(cat)) {
            window.categories.push(cat);
            changed = true;
        }
    });
    if (changed) {
        window.saveCategories && window.saveCategories();
        window.updateCategoryDropdown && window.updateCategoryDropdown();
        window.displayCategoryFolders && window.displayCategoryFolders();
    }

    showMessage(`Imported ${added} new words!`, "success");
}

// Ensure all categories from vocabulary are in window.categories
const vocabCategories = Array.from(new Set(vocabulary.map(w => (w.category || "general").toLowerCase())));
let changed = false;
vocabCategories.forEach(cat => {
    if (!window.categories.includes(cat)) {
        window.categories.push(cat);
        changed = true;
    }
});
if (changed) {
    window.saveCategories && window.saveCategories();
    window.updateCategoryDropdown && window.updateCategoryDropdown();
    window.displayCategoryFolders && window.displayCategoryFolders();
}

function refreshCategoryDropdowns() {
    // Get all unique categories from vocabulary
    const categories = Array.from(new Set(vocabulary.map(w => w.category || "general")));
    // For each dropdown you want to update:
    const dropdownIds = [
        'flashcardCategory',
        'quizCategory',
        'memoryCategory',
        'typingCategory',
        'exportCategory'
        // Add more IDs if you have more category dropdowns
    ];
    dropdownIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = '';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                select.appendChild(option);
            });
        }
    });
}

// Export to textarea (text format)
function exportDictionaryToText() {
    if (!vocabulary.length) {
        showMessage("No words to export.", "error");
        return;
    }
    const lines = vocabulary.map(item =>
        [item.word, item.translation, item.category || "general"]
            .map(val => val && val.includes(',') ? `"${val}"` : val)
            .join(',')
    );
    document.getElementById('dictionaryTextArea').value = lines.join('\n');
    showMessage("Exported to text area. You can now copy it!", "success");
}

