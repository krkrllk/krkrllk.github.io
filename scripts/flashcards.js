window.currentCards = [];
window.currentCardIndex = 0;

window.startFlashcards = function() {
    const categorySelect = document.getElementById('flashcardCategory');
    if (!categorySelect) return;
    const category = categorySelect.value;
    if (!window.vocabulary) return;
    window.currentCards = category === 'all' ? [...window.vocabulary] : window.vocabulary.filter(word => word.category === category);
    if (window.currentCards.length === 0) {
        window.showMessage && window.showMessage('No words available for selected category', 'error');
        return;
    }
    window.currentCards = window.shuffleArray(window.currentCards);
    window.currentCardIndex = 0;
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) flashcard.classList.remove('flipped');
    window.updateFlashcard();
};

window.updateFlashcard = function() {
    if (!window.currentCards.length) return;
    const card = window.currentCards[window.currentCardIndex];
    const wordElem = document.getElementById('cardWord');
    const translationElem = document.getElementById('cardTranslation');
    const progressElem = document.getElementById('cardProgress');
    if (wordElem) wordElem.textContent = card.word;
    if (translationElem) translationElem.textContent = card.translation;
    if (progressElem) progressElem.textContent = `${window.currentCardIndex + 1}/${window.currentCards.length}`;
};

window.flipCard = function() {
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) flashcard.classList.toggle('flipped');
};

window.nextCard = function() {
    if (window.currentCardIndex < window.currentCards.length - 1) {
        window.currentCardIndex++;
        window.updateFlashcard();
        const flashcard = document.querySelector('.flashcard');
        if (flashcard) flashcard.classList.remove('flipped');
    }
};

window.previousCard = function() {
    if (window.currentCardIndex > 0) {
        window.currentCardIndex--;
        window.updateFlashcard();
        const flashcard = document.querySelector('.flashcard');
        if (flashcard) flashcard.classList.remove('flipped');
    }
};

window.shuffleArray = function(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};