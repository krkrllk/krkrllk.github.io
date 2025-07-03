// Tab switching and button event listeners for all games

function switchTab(tabId) {
    // Hide all game containers
    document.querySelectorAll('.game-container').forEach(el => el.classList.remove('active'));
    // Remove active from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Show selected game container
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    // Set active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });
}



// Toggle dictionary visibility
function toggleDictionary() {
    const grid = document.getElementById('dictionaryGrid');
    const stats = document.getElementById('stats');
    const btn = document.getElementById('toggleDictionaryBtn');
    if (!grid || !btn) return;
    if (grid.style.display === 'none') {
        grid.style.display = '';
        if (stats) stats.style.display = '';
        btn.textContent = 'Hide Dictionary';
    } else {
        grid.style.display = 'none';
        if (stats) stats.style.display = 'none';
        btn.textContent = 'Show Dictionary';
    }
}

// Toggle import/export section visibility
function toggleImportExport() {
    const section = document.getElementById('importExportSection');
    const btn = document.getElementById('toggleImportExportBtn');
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        btn.textContent = 'Hide Import/Export';
    } else {
        section.style.display = 'none';
        btn.textContent = 'Show Import/Export';
    }
}

// Toggle manage categories visibility
function toggleManageCategories() {
    const content = document.getElementById('manageCategoriesContent');
    const folders = document.getElementById('categoryFolders');
    const btn = document.getElementById('toggleManageCategoriesBtn');
    if (!content || !folders || !btn) return;
    if (content.style.display === 'none') {
        content.style.display = '';
        folders.style.display = '';
        btn.textContent = 'Hide Categories';
    } else {
        content.style.display = 'none';
        folders.style.display = 'none';
        btn.textContent = 'Show Categories';
    }
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    if (window.updateCategoryDropdown) window.updateCategoryDropdown();
    if (window.displayCategoryFolders) window.displayCategoryFolders();
    if (window.updateStats) window.updateStats();
    if (window.displayDictionary) window.displayDictionary();

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.startsWith('switchTab')) {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const match = onclick.match(/switchTab\('([^']+)'\)/);
                if (match) switchTab(match[1]);
            });
        }
    });

    // Flashcards
    const flashBtn = document.querySelector('#flashcards .controls button');
    if (flashBtn) {
        flashBtn.removeAttribute('onclick');
        flashBtn.addEventListener('click', () => window.startFlashcards && window.startFlashcards());
    }
    // Quiz
    const quizBtn = document.querySelector('#quiz .controls button');
    if (quizBtn) {
        quizBtn.removeAttribute('onclick');
        quizBtn.addEventListener('click', () => window.startQuiz && window.startQuiz());
    }
    // Memory
    const memoryBtn = document.querySelector('#memory .controls button');
    if (memoryBtn) {
        memoryBtn.removeAttribute('onclick');
        memoryBtn.addEventListener('click', () => window.startMemoryGame && window.startMemoryGame());
    }
    // Typing
    const typingBtn = document.querySelector('#typing .controls button');
    if (typingBtn) {
        typingBtn.removeAttribute('onclick');
        typingBtn.addEventListener('click', () => window.startTypingGame && window.startTypingGame());
    }
    // Hangman
    const hangmanBtn = document.querySelector('#hangman .controls button');
    if (hangmanBtn) {
        hangmanBtn.removeAttribute('onclick');
        hangmanBtn.addEventListener('click', () => window.startHangman && window.startHangman());
    }
    // Word Search
    const wsBtn = document.querySelector('#wordSearch .controls button');
    if (wsBtn) {
        wsBtn.removeAttribute('onclick');
        wsBtn.addEventListener('click', () => window.startWordSearch && window.startWordSearch());
    }

    // Flashcard flip and navigation
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.onclick = () => window.flipCard && window.flipCard();
    }
    const prevBtn = document.querySelector('.flashcard-controls button:first-child');
    if (prevBtn) {
        prevBtn.removeAttribute('onclick');
        prevBtn.addEventListener('click', e => {
            e.stopPropagation();
            window.previousCard && window.previousCard();
        });
    }
    const nextBtn = document.querySelector('.flashcard-controls button:last-child');
    if (nextBtn) {
        nextBtn.removeAttribute('onclick');
            nextBtn.addEventListener('click', e => {
                e.stopPropagation();
                window.nextCard && window.nextCard();
            });
        }
    });

document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
document.getElementById('addCategoryInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addCategory();
});

function addCategory() {
  const input = document.getElementById('addCategoryInput');
  const newCategory = input.value.trim();
  if (!newCategory) return;
  let categories = JSON.parse(localStorage.getItem('categories') || '[]');
  if (!categories.includes(newCategory)) {
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    displayCategoryFolders();
    updateCategoryDropdown();
  }
  input.value = '';
  input.focus();
}

// Navigation dropdown handler
document.addEventListener("DOMContentLoaded", function() {
  const navDropdown = document.getElementById('navDropdown');
  if (navDropdown) {
    navDropdown.addEventListener('change', function() {
      const selectedValue = this.value;
      if (selectedValue) {
        const [tabId, isGame] = selectedValue.split('|');
        switchTab(tabId);
        if (isGame === 'true') {
          // If it's a game, start the game directly
          const startGameFunc = window[`start${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`];
          if (typeof startGameFunc === 'function') {
            startGameFunc();
          }
        }
      }
    });
  }
});

// Dropdown toggle logic (only one instance!)
document.addEventListener('DOMContentLoaded', function() {
  const dropbtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropbtn && dropdownContent) {
    dropbtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function() {
      dropdownContent.style.display = 'none';
    });
  }
});