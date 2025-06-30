window.categories = ["general", "business", "academic", "travel"];
try {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) window.categories = JSON.parse(savedCategories);
} catch (e) {}

window.updateCategoryDropdown = function() {
    const selects = [
        ...document.querySelectorAll(".categories-select"),
        ...["flashcardCategory","quizCategory","memoryCategory","typingCategory","hangmanCategory","wordSearchCategory","filterCategory","category"].map(id=>document.getElementById(id)).filter(Boolean)
    ];
    selects.forEach(select => {
        select.innerHTML = '';
        if (
            select.id === "filterCategory" ||
            select.id === "flashcardCategory" ||
            select.id === "quizCategory" ||
            select.id === "memoryCategory" ||
            select.id === "typingCategory" ||
            select.id === "hangmanCategory" ||
            select.id === "wordSearchCategory"
        ) {
            const allOpt = document.createElement("option");
            allOpt.value = "all";
            allOpt.textContent = "All Categories";
            select.appendChild(allOpt);
        } else {
            const selOpt = document.createElement("option");
            selOpt.value = "";
            selOpt.textContent = "Select Category";
            select.appendChild(selOpt);
        }
        window.categories.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            select.appendChild(opt);
        });
        // Auto-select last used category for the add word form
        let user = localStorage.getItem('currentUser');
        const lastCat = user ? localStorage.getItem('lastCategory_' + user) : localStorage.getItem('lastCategory');
        if (select.id === "category") {
            if (lastCat && window.categories.includes(lastCat)) {
                select.value = lastCat;
            }
        }
    });
};

window.displayCategoryFolders = function() {
    const categoryFolders = document.getElementById("categoryFolders");
    if (!categoryFolders) return;
    categoryFolders.innerHTML = "";
    window.categories.forEach(category => {
        const folder = document.createElement("div");
        folder.className = "category-folder";
        const span = document.createElement("span");
        span.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        folder.appendChild(span);
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-category-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            window.deleteCategory(category);
        };
        folder.appendChild(deleteBtn);
        folder.onclick = () => window.filterByCategory(category);
        categoryFolders.appendChild(folder);
    });
};

window.addCustomCategory = function() {
    const newCategoryInput = document.getElementById("newCategory");
    if (!newCategoryInput) return;
    const newCategory = newCategoryInput.value.trim().toLowerCase();
    if (!newCategory) { window.showMessage("Category name cannot be empty", "error"); return; }
    if (window.categories.includes(newCategory)) { window.showMessage("Category already exists", "error"); return; }
    window.categories.push(newCategory);
    window.saveCategories();
    window.updateCategoryDropdown();
    window.displayCategoryFolders();
    newCategoryInput.value = "";
    window.showMessage("Category added successfully!");
};

window.saveCategories = function() {
    try { localStorage.setItem("categories", JSON.stringify(window.categories)); } catch (e) { }
};

window.deleteCategory = function(category) {
    if (!confirm(`Are you sure you want to delete the category "${category}"? This will also delete all words in this category.`)) return;
    window.categories = window.categories.filter(cat => cat !== category);
    if (window.vocabulary) {
        window.vocabulary = window.vocabulary.filter(word => word.category !== category);
        window.saveVocabulary && window.saveVocabulary();
        window.displayDictionary && window.displayDictionary();
    }
    window.saveCategories();
    window.updateCategoryDropdown();
    window.displayCategoryFolders();
    window.showMessage && window.showMessage(`Category "${category}" and its words have been deleted.`, "success");
};

window.filterByCategory = function(category) {
    if (!window.vocabulary || !window.displayDictionary) return;
    const filteredVocab = window.vocabulary.filter(item => item.category === category);
    window.displayDictionary(filteredVocab);
};