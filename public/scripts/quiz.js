window.quizQuestions = [];
window.quizCurrent = 0;
window.quizScore = 0;

window.startQuiz = function() {
    const categorySelect = document.getElementById('quizCategory');
    const wordCountInput = document.getElementById('quizWordCount');
    if (!categorySelect || !wordCountInput || !window.vocabulary) return;

    const category = categorySelect.value;
    const count = parseInt(wordCountInput.value, 10) || 10;
    let pool = category === 'all' ? [...window.vocabulary] : window.vocabulary.filter(w => w.category === category);

    if (pool.length < 2) {
        window.showMessage && window.showMessage('Not enough words for a quiz in this category', 'error');
        return;
    }

    pool = window.shuffleArray ? window.shuffleArray(pool) : pool.sort(() => Math.random() - 0.5);
    window.quizQuestions = pool.slice(0, Math.min(count, pool.length));
    window.quizCurrent = 0;
    window.quizScore = 0;
    document.getElementById('quizResults').innerHTML = '';
    window.showQuizQuestion();
};

window.showQuizQuestion = function() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;

    if (window.quizCurrent >= window.quizQuestions.length) {
        window.showQuizResults();
        return;
    }

    const current = window.quizQuestions[window.quizCurrent];
    // Prepare options (correct + 3 random wrong)
    let options = [current.translation];
    let wrong = window.vocabulary.filter(w => w.id !== current.id).map(w => w.translation);
    wrong = window.shuffleArray ? window.shuffleArray(wrong) : wrong.sort(() => Math.random() - 0.5);
    options = options.concat(wrong.slice(0, 3));
    options = window.shuffleArray ? window.shuffleArray(options) : options.sort(() => Math.random() - 0.5);

    quizContent.innerHTML = `
        <div class="quiz-question">
            <p>What is the translation of <b>${current.word}</b>?</p>
            <div class="quiz-options">
                ${options.map((opt, idx) => `
                    <div class="quiz-option-row" onclick="window.selectQuizOption('${opt.replace(/'/g,"\\'")}')">
                        <input type="radio" name="quizOption" id="quizOpt${idx}" class="quiz-option-radio">
                        <label class="quiz-option-label" for="quizOpt${idx}">${opt}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

window.selectQuizOption = function(selected) {
    const current = window.quizQuestions[window.quizCurrent];
    const quizContent = document.getElementById('quizContent');
    const optionRows = quizContent.querySelectorAll('.quiz-option-row');
    optionRows.forEach(row => {
        const label = row.querySelector('.quiz-option-label');
        if (!label) return;
        const text = label.textContent;
        if (text === current.translation) {
            row.classList.add('correct');
        }
        if (text === selected && text !== current.translation) {
            row.classList.add('incorrect');
        }
        if (text === selected) {
            row.querySelector('input[type="radio"]').checked = true;
        }
    });

    if (selected === current.translation) {
        window.quizScore++;
    }

    // Disable further selection
    optionRows.forEach(row => row.onclick = null);

    setTimeout(() => {
        window.quizCurrent++;
        window.showQuizQuestion();
    }, 900);
};

window.showQuizResults = function() {
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    if (quizContent) quizContent.innerHTML = '';
    if (quizResults) {
        quizResults.innerHTML = `Quiz finished!<br>Score: <b>${window.quizScore}</b> / ${window.quizQuestions.length}`;
    }
};