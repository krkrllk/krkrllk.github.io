window.typingWords = [];
window.typingCurrent = 0;
window.typingScore = 0;
window.typingStartTime = 0;
window.typingEndTime = 0;

window.startTypingGame = function() {
    const categorySelect = document.getElementById('typingCategory');
    if (!categorySelect || !window.vocabulary) return;
    const category = categorySelect.value;
    window.typingWords = category === 'all'
        ? [...window.vocabulary]
        : window.vocabulary.filter(w => w.category === category);

    if (window.typingWords.length === 0) {
        window.showMessage && window.showMessage('No words available for selected category', 'error');
        return;
    }
    window.typingWords = window.shuffleArray ? window.shuffleArray(window.typingWords) : window.typingWords.sort(() => Math.random() - 0.5);
    window.typingCurrent = 0;
    window.typingScore = 0;
    window.typingStartTime = Date.now();
    window.typingUserAnswers = []; // Initialize user answers array
    window.showTypingWord();
};

window.showTypingWord = function() {
    if (window.typingCurrent >= window.typingWords.length) {
        window.typingEndTime = Date.now();
        window.showTypingStats();
        return;
    }
    const wordObj = window.typingWords[window.typingCurrent];
    document.getElementById('wordToType').textContent = wordObj.translation;
    const input = document.getElementById('typingInput');
    if (input) {
        input.value = '';
        input.disabled = false;
        input.focus();
        input.onkeydown = function(e) {
            if (e.key === 'Enter') {
                window.checkTypingInput();
            }
        };
    }
    window.updateTypingStats();
};
window.checkTypingInput = function() {
    const input = document.getElementById('typingInput');
    if (!input) return;
    const userInput = input.value.trim();
    const wordObj = window.typingWords[window.typingCurrent];
    // Store the user's answer
    if (!window.typingUserAnswers) window.typingUserAnswers = [];
    window.typingUserAnswers[window.typingCurrent] = userInput;
    if (userInput.toLowerCase() === wordObj.word.toLowerCase()) {
        window.typingScore++;
        window.showMessage && window.showMessage('Correct!', 'success');
    } else {
        window.showMessage && window.showMessage(`Wrong! The correct word was: ${wordObj.word}`, 'error');
    }
    window.typingCurrent++;
    window.showTypingWord();
};


window.updateTypingStats = function() {
    const statsDiv = document.getElementById('typingStats');
    if (statsDiv) {
        statsDiv.textContent = `Word ${window.typingCurrent + 1} of ${window.typingWords.length}`;
    }
};

window.showTypingStats = function() {
    const statsDiv = document.getElementById('typingStats');
    const input = document.getElementById('typingInput');
    if (input) input.disabled = true;
    const totalTime = ((window.typingEndTime - window.typingStartTime) / 1000).toFixed(1);
    if (statsDiv) {
        statsDiv.innerHTML = `Game Over!<br>Score: <b>${window.typingScore}</b> / ${window.typingWords.length}<br>Time: ${totalTime} seconds`;
    }
};

window.showTypingStats = function() {
    const statsDiv = document.getElementById('typingStats');
    const input = document.getElementById('typingInput');
    if (input) input.disabled = true;
    window.typingEndTime = window.typingEndTime || Date.now();
    const totalTime = ((window.typingEndTime - window.typingStartTime) / 1000).toFixed(1);

    // Build list of words with user answers and correct answers
    let resultList = '<ul style="margin-top:10px">';
    for (let i = 0; i < window.typingWords.length; i++) {
        const wordObj = window.typingWords[i];
        const isIngredient = wordObj.ingredient === true || wordObj.ingredient === 'yes';
        // Get user's answer if available
        const userAnswer = (window.typingUserAnswers && window.typingUserAnswers[i]) || '';
        const correct = userAnswer.trim().toLowerCase() === wordObj.word.toLowerCase();
        resultList += `<li>
            <b>${wordObj.translation}</b> 
            ${isIngredient ? '(ingredient)' : ''}<br>
            Your answer: <span style="color:${correct ? 'green' : 'red'}">${userAnswer || '<i>No answer</i>'}</span>
            ${!correct ? `<br>Correct: <span style="color:green">${wordObj.word}</span>` : ''}
        </li>`;
    }
    resultList += '</ul>';

    if (statsDiv) {
        statsDiv.innerHTML = `Game Over!<br>Score: <b>${window.typingScore}</b> / ${window.typingWords.length}<br>Time: ${totalTime} seconds<br><br>Words:${resultList}`;
    }
};