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

// Robust CSV parser for a single line
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
            if (char === '"') {
                if (line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
    }
    result.push(current);
    return result;
}

// Export to textarea (robust CSV)
function exportDictionaryToText() {
    if (!vocabulary.length) {
        showMessage("No words to export.", "error");
        return;
    }
    const lines = vocabulary.map(item =>
        [item.word, item.translation, item.category || "general"]
            .map(val => {
                if (val == null) return '';
                // Quote if contains comma, quote, or newline
                if (/[",\n\r]/.test(val)) {
                    // Escape quotes by doubling them
                    return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            })
            .join(',')
    );
    document.getElementById('dictionaryTextArea').value = lines.join('\n');
    showMessage("Exported to text area. You can now copy it!", "success");
}

// Import from textarea (robust CSV)
function importDictionaryFromText() {
    const text = document.getElementById('dictionaryTextArea').value.trim();
    if (!text) {
        showMessage("No text to import.", "error");
        return;
    }
    const lines = text.split(/\r?\n/).filter(Boolean);
    let added = 0;
    lines.forEach(line => {
        const parts = parseCSVLine(line);
        const [word, translation, category] = parts.map(s => s.trim());
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

