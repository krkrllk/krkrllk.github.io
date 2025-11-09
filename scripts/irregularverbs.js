window.irregularVerbsList = [
    { word: "do", past: "did", part: "done", ua: "робити" },
    { word: "go", past: "went", part: "gone", ua: "йти" },
    { word: "be", past: "was/were", part: "been", ua: "бути" },
    { word: "have", past: "had", part: "had", ua: "мати" },
    { word: "see", past: "saw", part: "seen", ua: "бачити" },
    { word: "eat", past: "ate", part: "eaten", ua: "їсти" },
    { word: "take", past: "took", part: "taken", ua: "брати" },
    { word: "come", past: "came", part: "come", ua: "приходити" },
    { word: "get", past: "got", part: "gotten/got", ua: "отримувати" },
    { word: "give", past: "gave", part: "given", ua: "давати" },
    { word: "make", past: "made", part: "made", ua: "робити/створювати" },
    { word: "find", past: "found", part: "found", ua: "знаходити" },
    { word: "run", past: "ran", part: "run", ua: "бігти" },
    { word: "begin", past: "began", part: "begun", ua: "починати" },
    { word: "say", past: "said", part: "said", ua: "сказати" },
    { word: "know", past: "knew", part: "known", ua: "знати" },
    { word: "think", past: "thought", part: "thought", ua: "думати" },
    { word: "tell", past: "told", part: "told", ua: "розповідати" },
    { word: "become", past: "became", part: "become", ua: "ставати" },
    { word: "show", past: "showed", part: "shown/showed", ua: "показувати" },
    { word: "leave", past: "left", part: "left", ua: "залишати" },
    { word: "feel", past: "felt", part: "felt", ua: "відчувати" },
    { word: "put", past: "put", part: "put", ua: "класти" },
    { word: "bring", past: "brought", part: "brought", ua: "приносити" },
    { word: "keep", past: "kept", part: "kept", ua: "тримати" },
    { word: "hold", past: "held", part: "held", ua: "тримати" },
    { word: "hear", past: "heard", part: "heard", ua: "чути" },
    { word: "meet", past: "met", part: "met", ua: "зустрічати" },
    { word: "pay", past: "paid", part: "paid", ua: "платити" },
    { word: "sit", past: "sat", part: "sat", ua: "сидіти" },
    { word: "stand", past: "stood", part: "stood", ua: "стояти" },
    { word: "lose", past: "lost", part: "lost", ua: "втрачати" },
    { word: "sell", past: "sold", part: "sold", ua: "продавати" },
    { word: "speak", past: "spoke", part: "spoken", ua: "говорити" },
    { word: "read", past: "read", part: "read", ua: "читати" },
    { word: "build", past: "built", part: "built", ua: "будувати" },
    { word: "buy", past: "bought", part: "bought", ua: "купувати" },
    { word: "catch", past: "caught", part: "caught", ua: "ловити" },
    { word: "choose", past: "chose", part: "chosen", ua: "вибирати" },
    { word: "cost", past: "cost", part: "cost", ua: "коштувати" },
    { word: "cut", past: "cut", part: "cut", ua: "різати" },
    { word: "draw", past: "drew", part: "drawn", ua: "малювати" },
    { word: "drink", past: "drank", part: "drunk", ua: "пити" },
    { word: "drive", past: "drove", part: "driven", ua: "водити" },
    { word: "fall", past: "fell", part: "fallen", ua: "падати" },
    { word: "fly", past: "flew", part: "flown", ua: "літати" },
    { word: "forget", past: "forgot", part: "forgotten", ua: "забувати" },
    { word: "freeze", past: "froze", part: "frozen", ua: "замерзати" },
    { word: "grow", past: "grew", part: "grown", ua: "рости" },
    { word: "hide", past: "hid", part: "hidden", ua: "ховати" },
    { word: "hold", past: "held", part: "held", ua: "тримати" },
    { word: "hurt", past: "hurt", part: "hurt", ua: "боліти/завдавати болю" },
    { word: "let", past: "let", part: "let", ua: "дозволяти" },
    { word: "light", past: "lit", part: "lit", ua: "запалювати" },
    { word: "mean", past: "meant", part: "meant", ua: "означати" },
    { word: "ride", past: "rode", part: "ridden", ua: "їхати верхи" },
    { word: "ring", past: "rang", part: "rung", ua: "дзвонити" },
    { word: "rise", past: "rose", part: "risen", ua: "підніматися" },
    { word: "send", past: "sent", part: "sent", ua: "надсилати" },
    { word: "set", past: "set", part: "set", ua: "встановлювати" },
    { word: "shake", past: "shook", part: "shaken", ua: "трясти" },
    { word: "shoot", past: "shot", part: "shot", ua: "стріляти" },
    { word: "shut", past: "shut", part: "shut", ua: "закривати" },
    { word: "sing", past: "sang", part: "sung", ua: "співати" },
    { word: "sleep", past: "slept", part: "slept", ua: "спати" },
    { word: "spend", past: "spent", part: "spent", ua: "витрачати" },
    { word: "swim", past: "swam", part: "swum", ua: "плавати" },
    { word: "teach", past: "taught", part: "taught", ua: "викладати" },
    { word: "throw", past: "threw", part: "thrown", ua: "кидати" },
    { word: "understand", past: "understood", part: "understood", ua: "розуміти" },
    { word: "wake", past: "woke", part: "woken", ua: "прокидатися" },
    { word: "wear", past: "wore", part: "worn", ua: "носити (одяг)" },
    { word: "win", past: "won", part: "won", ua: "вигравати" },
    { word: "write", past: "wrote", part: "written", ua: "писати" }
];




// --- FLASHCARDS: Only translation, click to flip and see all forms ---
window.startFlashcardsGame = function() {
    const container = document.getElementById('irregularVerbFlashcardsGame');
    if (!container) return;

    window.irregularVerbFlashcardsWords = window.shuffleArray
        ? window.shuffleArray([...window.irregularVerbsList])
        : [...window.irregularVerbsList].sort(() => Math.random() - 0.5);
    window.irregularVerbFlashcardsIndex = 0;

    window.showIrregularVerbFlashcard();
};

window.showIrregularVerbFlashcard = function() {
    const container = document.getElementById('irregularVerbFlashcardsGame');
    if (!container) return;

    if (
        !window.irregularVerbFlashcardsWords ||
        window.irregularVerbFlashcardsIndex >= window.irregularVerbFlashcardsWords.length
    ) {
        container.innerHTML = `<div>Flashcards finished!</div>`;
        return;
    }

    const verb = window.irregularVerbFlashcardsWords[window.irregularVerbFlashcardsIndex];

    container.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner" id="flashcardInner">
                <div class="flip-card-front" style="cursor:pointer;">
                    <b>Ukrainian:</b> ${verb.ua}<br>
                    <div style="margin-top:1em;color:#888;">Click to see the answer</div>
                </div>
                <div class="flip-card-back">
                    <b>Infinitive:</b> ${verb.word}<br>
                    <b>Past Simple:</b> ${verb.past}<br>
                    <b>Past Participle:</b> ${verb.part}<br>
                    <button id="flashNextBtn">Next</button>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.flip-card-front').onclick = function() {
        document.getElementById('flashcardInner').classList.add('flipped');
    };

    document.getElementById('flashNextBtn').onclick = function() {
        window.irregularVerbFlashcardsIndex++;
        window.showIrregularVerbFlashcard();
    };
};

// --- TYPING GAME: User types all three forms ---


window.showIrregularVerbQuestion = function() {
    const container = document.getElementById('irregularVerbGame');
    if (!container) return;
    if (window.irregularVerbGameIndex >= window.irregularVerbGameWords.length) {
        container.innerHTML = `<div>Game Over!<br>Score: <b>${window.irregularVerbGameScore}</b> / ${window.irregularVerbGameWords.length}</div>`;
        return;
    }
    const verb = window.irregularVerbGameWords[window.irregularVerbGameIndex];
    container.innerHTML = `
        <div>
            <b>Ukrainian:</b> ${verb.ua}<br>
            <form id="typingForm" autocomplete="off">
                <label>Infinitive: <input type="text" id="typingInf"></label><br>
                <label>Past Simple: <input type="text" id="typingPast"></label><br>
                <label>Past Participle: <input type="text" id="typingPart"></label><br>
                <button type="submit" id="typingCheckBtn">Check</button>
            </form>
            <div id="typingFeedback"></div>
        </div>
    `;

    document.getElementById('typingForm').onsubmit = function(e) {
        e.preventDefault();
        const inf = document.getElementById('typingInf').value.trim().toLowerCase();
        const past = document.getElementById('typingPast').value.trim().toLowerCase();
        const part = document.getElementById('typingPart').value.trim().toLowerCase();

        let correct = 0;
        if (inf === verb.word.toLowerCase()) correct++;
        if (verb.past.toLowerCase().split('/').includes(past)) correct++;
        if (verb.part.toLowerCase().split('/').includes(part)) correct++;

        let feedback = "";
        if (correct === 3) {
            window.irregularVerbGameScore++;
            feedback = `<span style="color:green;">Perfect!</span>`;
        } else {
            feedback = `<span style="color:red;">Try again!</span><br>
                Correct answers:<br>
                Infinitive: <b>${verb.word}</b><br>
                Past Simple: <b>${verb.past}</b><br>
                Past Participle: <b>${verb.part}</b>`;
        }
        document.getElementById('typingFeedback').innerHTML = feedback;

        setTimeout(() => {
            window.irregularVerbGameIndex++;
            window.showIrregularVerbQuestion();
        }, 1200);
    };
};

window.irregularVerbGameIndex = 0;
window.irregularVerbGameScore = 0;
window.irregularVerbGameWords = [];

window.startFlashcardsGame  = function() {
    window.irregularVerbGameWords = window.shuffleArray
        ? window.shuffleArray([...window.irregularVerbsList])
        : [...window.irregularVerbsList].sort(() => Math.random() - 0.5);
    window.irregularVerbGameIndex = 0;
    window.irregularVerbGameScore = 0;
    window.showIrregularVerbQuestion();
};

window.showIrregularVerbQuestion = function() {
    const container = document.getElementById('irregularVerbGame');
    if (!container) return;
    if (window.irregularVerbGameIndex >= window.irregularVerbGameWords.length) {
        container.innerHTML = `<div>Game Over!<br>Score: <b>${window.irregularVerbGameScore}</b> / ${window.irregularVerbGameWords.length}</div>`;
        return;
    }
    const verb = window.irregularVerbGameWords[window.irregularVerbGameIndex];
    container.innerHTML = `
        <div>
            <b>Ukrainian:</b> ${verb.ua}<br>
            <form id="typingForm" autocomplete="off">
                <label>Infinitive: <input type="text" id="typingInf"></label><br>
                <label>Past Simple: <input type="text" id="typingPast"></label><br>
                <label>Past Participle: <input type="text" id="typingPart"></label><br>
                <button type="submit" id="typingCheckBtn">Check</button>
            </form>
            <div id="typingFeedback"></div>
        </div>
    `;

    document.getElementById('typingForm').onsubmit = function(e) {
        e.preventDefault();
        const inf = document.getElementById('typingInf').value.trim().toLowerCase();
        const past = document.getElementById('typingPast').value.trim().toLowerCase();
        const part = document.getElementById('typingPart').value.trim().toLowerCase();

        let correct = 0;
        if (inf === verb.word.toLowerCase()) correct++;
        if (verb.past.toLowerCase().split('/').includes(past)) correct++;
        if (verb.part.toLowerCase().split('/').includes(part)) correct++;

        let feedback = "";
        if (correct === 3) {
            window.irregularVerbGameScore++;
            feedback = `<span style="color:green;">Perfect!</span>`;
        } else {
            feedback = `<span style="color:red;">Try again!</span><br>
                Correct answers:<br>
                Infinitive: <b>${verb.word}</b><br>
                Past Simple: <b>${verb.past}</b><br>
                Past Participle: <b>${verb.part}</b>`;
        }
        document.getElementById('typingFeedback').innerHTML = feedback;

        setTimeout(() => {
            window.irregularVerbGameIndex++;
            window.showIrregularVerbQuestion();
        }, 1200);
    };
};

// Optional: simple shuffle function
window.shuffleArray = function(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

window.renderIrregularVerbsTable = function() {
    const container = document.getElementById('irregularVerbsTableContainer');
    if (!container) return;
    container.innerHTML = `
        <table style="width:100%;margin-bottom:1em;border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="border-bottom:1px solid #ccc;">Infinitive</th>
                    <th style="border-bottom:1px solid #ccc;">Past Simple</th>
                    <th style="border-bottom:1px solid #ccc;">Past Participle</th>
                    <th style="border-bottom:1px solid #ccc;">Ukrainian</th>
                </tr>
            </thead>
            <tbody>
                ${window.irregularVerbsList.map(v => `
                    <tr>
                        <td style="padding:0.3em 0.5em;">${v.word}</td>
                        <td style="padding:0.3em 0.5em;">${v.past}</td>
                        <td style="padding:0.3em 0.5em;">${v.part}</td>
                        <td style="padding:0.3em 0.5em;">${v.ua}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
};

window.startIrregularVerbGame = function() {
    const container = document.getElementById('irregularVerbFlashcardsGame');
    if (!container) return;

    window.irregularVerbFlashcardsWords = window.shuffleArray
        ? window.shuffleArray([...window.irregularVerbsList])
        : [...window.irregularVerbsList].sort(() => Math.random() - 0.5);
    window.irregularVerbFlashcardsIndex = 0;

    window.showIrregularVerbFlashcard();
};

window.showIrregularVerbFlashcard = function() {
    const container = document.getElementById('irregularVerbFlashcardsGame');
    if (!container) return;

    if (
        !window.irregularVerbFlashcardsWords ||
        window.irregularVerbFlashcardsIndex >= window.irregularVerbFlashcardsWords.length
    ) {
        container.innerHTML = `<div>Flashcards finished!</div>`;
        return;
    }

    const verb = window.irregularVerbFlashcardsWords[window.irregularVerbFlashcardsIndex];

    container.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner" id="flashcardInner">
                <div class="flip-card-front" style="cursor:pointer;">
                    <b>Ukrainian:</b> ${verb.ua}<br>
                    <div style="margin-top:1em;color:#888;">Click to see the answer</div>
                </div>
                <div class="flip-card-back">
                    <b>Infinitive:</b> ${verb.word}<br>
                    <b>Past Simple:</b> ${verb.past}<br>
                    <b>Past Participle:</b> ${verb.part}<br>
                    <button id="flashNextBtn">Next</button>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.flip-card-front').onclick = function() {
        document.getElementById('flashcardInner').classList.add('flipped');
    };

    document.getElementById('flashNextBtn').onclick = function() {
        window.irregularVerbFlashcardsIndex++;
        window.showIrregularVerbFlashcard();
    };
};


window.startQuizGame = function() {
    const container = document.getElementById('irregularVerbQuizGame');
    if (!container) return;

    // Shuffle verbs for quiz
    window.irregularVerbQuizWords = window.shuffleArray
        ? window.shuffleArray([...window.irregularVerbsList])
        : [...window.irregularVerbsList].sort(() => Math.random() - 0.5);
    window.irregularVerbQuizIndex = 0;
    window.irregularVerbQuizScore = 0;

    window.showIrregularVerbQuizQuestion();
};

window.showIrregularVerbQuizQuestion = function() {
    const container = document.getElementById('irregularVerbQuizGame');
    if (!container) return;

    if (
        !window.irregularVerbQuizWords ||
        window.irregularVerbQuizIndex >= window.irregularVerbQuizWords.length
    ) {
        container.innerHTML = `<div>Quiz finished!<br>Score: <b>${window.irregularVerbQuizScore}</b> / ${window.irregularVerbQuizWords.length}</div>`;
        return;
    }

    const verb = window.irregularVerbQuizWords[window.irregularVerbQuizIndex];

    // Randomly choose which form to ask for
    const forms = [
        { key: 'word', label: 'Infinitive' },
        { key: 'past', label: 'Past Simple' },
        { key: 'part', label: 'Past Participle' }
    ];
    const askIndex = Math.floor(Math.random() * forms.length);
    const askForm = forms[askIndex];

    // Prepare the options: always the three forms of this verb, in random order
    let options = [
        { key: 'word', label: 'Infinitive', value: verb.word },
        { key: 'past', label: 'Past Simple', value: verb.past.split('/')[0] },
        { key: 'part', label: 'Past Participle', value: verb.part.split('/')[0] }
    ];
    options = window.shuffleArray(options);

    container.innerHTML = `
        <div>
            <b>Ukrainian:</b> ${verb.ua}<br>
            <b>Choose the <span style="color:#007bff">${askForm.label}</span> form:</b>
            <div id="quizOptions" style="margin-top:1em;display:flex;gap:1em;justify-content:center;">
                ${options.map(opt => `
                    <button class="quizOptionBtn" style="font-size:1.2em;padding:0.7em 2em;">
                        ${opt.value}
                    </button>
                `).join('')}
            </div>
        </div>
        <div id="quizFeedback" style="margin-top:1em;"></div>
    `;

    Array.from(document.getElementsByClassName('quizOptionBtn')).forEach((btn, idx) => {
        btn.onclick = function() {
            const selected = options[idx];
            const isCorrect = selected.key === askForm.key;
            const feedback = document.getElementById('quizFeedback');
            if (isCorrect) {
                window.irregularVerbQuizScore++;
                feedback.innerHTML = `<span style="color:green;">Correct!</span>`;
            } else {
                feedback.innerHTML = `<span style="color:red;">Wrong! Correct answer: <b>${verb[askForm.key]}</b></span>`;
            }
            Array.from(document.getElementsByClassName('quizOptionBtn')).forEach(b => b.disabled = true);
            setTimeout(() => {
                window.irregularVerbQuizIndex++;
                window.showIrregularVerbQuizQuestion();
            }, 1200);
        };
    });
};


window.startMemoryGame = function() {
    const container = document.getElementById('irregularVerbMemoryGame');
    if (!container) return;

    // Prepare cards: each verb gives 3 cards (infinitive, past, part)
    let cards = [];
    window.irregularVerbsList.slice(0, 8).forEach(v => { // Use 8 verbs for a 24-card game
        cards.push({ text: v.word, id: v.word + '_inf', group: v.word });
        cards.push({ text: v.past.split('/')[0], id: v.word + '_past', group: v.word });
        cards.push({ text: v.part.split('/')[0], id: v.word + '_part', group: v.word });
    });
    cards = window.shuffleArray(cards);

    let flipped = [];
    let matched = [];
    let moves = 0;

    function render() {
        container.innerHTML = `
            <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
                ${cards.map((card, i) => `
                    <button class="memoryCard" data-idx="${i}" style="width:80px;height:40px;">
                        ${matched.includes(i) || flipped.includes(i) ? card.text : "?"}
                    </button>
                `).join('')}
            </div>
            <div>Moves: ${moves} | Matches: ${matched.length/3} / 8</div>
            <div id="memoryFeedback"></div>
        `;
        Array.from(container.getElementsByClassName('memoryCard')).forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(btn.getAttribute('data-idx'));
                if (flipped.includes(idx) || matched.includes(idx) || flipped.length === 2) return;
                flipped.push(idx);
                render();
                if (flipped.length === 2) {
                    moves++;
                    const [a, b] = flipped;
                    if (cards[a].group === cards[b].group && cards[a].id !== cards[b].id) {
                        matched.push(a, b);
                        flipped = [];
                        render();
                        if (matched.length === 16) {
                            document.getElementById('memoryFeedback').innerHTML = "<b>Game finished!</b>";
                        }
                    } else {
                        setTimeout(() => {
                            flipped = [];
                            render();
                        }, 800);
                    }
                }
            };
        });
    }
    render();
};


window.toggleIrregularVerbsTable = function() {
    const table = document.getElementById('irregularVerbsTableContainer');
    const btn = document.getElementById('showTableBtn');
    const gameContainer = document.getElementById('gameContainer');
    if (!table || !btn) return;
    if (table.style.display === 'none' || table.style.display === '') {
        table.style.display = 'block';
        btn.textContent = 'Hide Irregular Verbs Table';
        window.renderIrregularVerbsTable && window.renderIrregularVerbsTable();
        if (gameContainer) gameContainer.style.display = 'none';
        window.hideAllGames();
    } else {
        table.style.display = 'none';
        btn.textContent = 'Show Irregular Verbs Table';
    }
};

window.hideAllGames = function() {
    document.getElementById('irregularVerbGame').style.display = 'none';
    document.getElementById('irregularVerbFlashcardsGame').style.display = 'none';
    document.getElementById('irregularVerbQuizGame').style.display = 'none';
    document.getElementById('irregularVerbMemoryGame').style.display = 'none';
};

window.showGame = function(game) {
    // Hide table and all games
    const table = document.getElementById('irregularVerbsTableContainer');
    const gameContainer = document.getElementById('gameContainer');
    if (table) table.style.display = 'none';
    document.getElementById('showTableBtn').textContent = 'Show Irregular Verbs Table';
    window.hideAllGames();
    if (gameContainer) gameContainer.style.display = 'block';

    if (game === 'typing') {
        const el = document.getElementById('irregularVerbGame');
        el.style.display = 'block';
        window.startIrregularVerbGame && window.startIrregularVerbGame();
    } else if (game === 'flashcards') {
        const el = document.getElementById('irregularVerbFlashcardsGame');
        el.style.display = 'block';
        window.startFlashcardsGame && window.startFlashcardsGame();
    } else if (game === 'quiz') {
        const el = document.getElementById('irregularVerbQuizGame');
        el.style.display = 'block';
        window.startQuizGame && window.startQuizGame();
    } else if (game === 'memory') {
        const el = document.getElementById('irregularVerbMemoryGame');
        el.style.display = 'block';
        window.startMemoryGame && window.startMemoryGame();
    }
};

// Hide all on page load
document.addEventListener("DOMContentLoaded", () => {
    window.hideAllGames && window.hideAllGames();
    const table = document.getElementById('irregularVerbsTableContainer');
    if (table) table.style.display = 'none';
    const btn = document.getElementById('showTableBtn');
    if (btn) btn.textContent = 'Show Irregular Verbs Table';
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) gameContainer.style.display = 'none';
});

// Example verbs array (use your real one if you have it in irregularverbs.js)
const irregularVerbs = [
  { base: "be", past: "was/were" },
  { base: "become", past: "became" },
  { base: "begin", past: "began" },
  { base: "break", past: "broke" },
  { base: "bring", past: "brought" },
  { base: "build", past: "built" },
  { base: "buy", past: "bought" },
  { base: "catch", past: "caught" },
  { base: "choose", past: "chose" },
  { base: "come", past: "came" },
  { base: "cost", past: "cost" },
  { base: "cut", past: "cut" },
  { base: "do", past: "did" },
  { base: "draw", past: "drew" },
  { base: "drink", past: "drank" },
  { base: "drive", past: "drove" },
  { base: "eat", past: "ate" },
  { base: "fall", past: "fell" },
  { base: "feel", past: "felt" },
  { base: "find", past: "found" },
  { base: "fly", past: "flew" },
  { base: "forget", past: "forgot" },
  { base: "get", past: "got" },
  { base: "give", past: "gave" },
  { base: "go", past: "went" },
  { base: "have", past: "had" },
  { base: "hear", past: "heard" },
  { base: "keep", past: "kept" },
  { base: "know", past: "knew" },
  { base: "leave", past: "left" }
  // ...add more as needed
];

let quizVerbs = [];
let quizIndex = 0;
let quizScore = 0;

document.getElementById('startIrregularQuizBtn').addEventListener('click', function() {
  const count = parseInt(document.getElementById('verbCountSelect').value, 10);
  quizVerbs = irregularVerbs.slice(0, count);
  quizIndex = 0;
  quizScore = 0;
  document.getElementById('irregularQuizSection').style.display = '';
  document.getElementById('irregularQuizFeedback').textContent = '';
  document.getElementById('irregularQuizScore').textContent = '';
  showIrregularQuizQuestion();
});

function showIrregularQuizQuestion() {
  if (quizIndex < quizVerbs.length) {
    const verb = quizVerbs[quizIndex];
    document.getElementById('irregularQuizQuestion').innerHTML = `What is the <b>past simple</b> of <b>${verb.base}</b>?`;
    document.getElementById('irregularQuizInput').value = '';
    document.getElementById('irregularQuizInput').focus();
  } else {
    document.getElementById('irregularQuizQuestion').innerHTML = `<b>Quiz finished!</b>`;
    document.getElementById('irregularQuizInput').style.display = 'none';
    document.getElementById('irregularQuizSubmit').style.display = 'none';
    document.getElementById('irregularQuizFeedback').innerHTML = `Your score: <b>${quizScore} / ${quizVerbs.length}</b>`;
    document.getElementById('irregularQuizScore').innerHTML = `<button onclick="restartIrregularQuiz()">Play Again</button>`;
  }
}

document.getElementById('irregularQuizSubmit').addEventListener('click', function() {
  const userAnswer = document.getElementById('irregularQuizInput').value.trim().toLowerCase();
  const correct = quizVerbs[quizIndex].past.toLowerCase();
  if (userAnswer === correct) {
    document.getElementById('irregularQuizFeedback').innerHTML = `<span style="color:green;">✅ Correct!</span>`;
    quizScore++;
  } else {
    document.getElementById('irregularQuizFeedback').innerHTML = `<span style="color:red;">❌ Correct answer: <b>${quizVerbs[quizIndex].past}</b></span>`;
  }
  quizIndex++;
  setTimeout(showIrregularQuizQuestion, 1200);
});

function restartIrregularQuiz() {
  document.getElementById('irregularQuizInput').style.display = '';
  document.getElementById('irregularQuizSubmit').style.display = '';
  document.getElementById('irregularQuizScore').innerHTML = '';
  document.getElementById('irregularQuizSection').style.display = 'none';
}