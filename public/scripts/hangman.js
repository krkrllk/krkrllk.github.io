window.hangmanWord = '';
window.hangmanDisplay = [];
window.hangmanWrong = [];
window.hangmanMaxWrong = 6;
window.hangmanGameActive = false;

// Example vocabulary array for demonstration; replace or import as needed
if (typeof vocabulary === 'undefined') {
    window.vocabulary = [
        { word: 'apple', category: 'fruit' },
        { word: 'banana', category: 'fruit' },
        { word: 'car', category: 'vehicle' },
        { word: 'dog', category: 'animal' }
    ];
}

function startHangman() {
        const category = document.getElementById('hangmanCategory').value;
        const words = category === 'all' ? [...vocabulary] : vocabulary.filter(word => word.category === category);
        if (words.length === 0) { alert('No words available for selected category'); return; }
        const word = words[Math.floor(Math.random() * words.length)].word.toLowerCase();
        let guessedLetters = new Set();
        let remainingGuesses = 6;
        const canvas = document.getElementById('hangmanCanvas');
        const ctx = canvas.getContext('2d');
        const wordDisplay = document.getElementById('hangmanWord');
        const lettersDiv = document.getElementById('hangmanLetters');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHouseBase(ctx); // Draw the ground/base
        lettersDiv.innerHTML = '';
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach((letter, i) => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            btn.setAttribute('data-color', i % 10); // Assign color index 0-9 in a loop
            btn.onclick = function () {
                guessLetter(letter, btn);
            };
            lettersDiv.appendChild(btn);
        });
        function updateWordDisplay() {
            wordDisplay.textContent = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
        }
        function guessLetter(letter, btn) {
            if (guessedLetters.has(letter)) return;
            guessedLetters.add(letter);
            // Remove the button after it is clicked
            if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
            if (!word.includes(letter)) {
                remainingGuesses--;
                drawHouse(ctx, 6 - remainingGuesses);
            }
            updateWordDisplay();
            if (!word.split('').some(l => !guessedLetters.has(l))) {
                alert('You won!');
            } else if (remainingGuesses === 0) {
                alert(`Game Over! The word was: ${word}`);
            }
        }
        updateWordDisplay();
    }

    // Draw the ground/base for the house
    function drawHouseBase(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 2;
        // Draw ground
        ctx.beginPath();
        ctx.moveTo(30, 140);
        ctx.lineTo(170, 140);
        ctx.stroke();
    }

    // Draw house parts step by step
    function drawHouse(ctx, step) {
        ctx.lineWidth = 2;
        switch(step) {
            case 1: // House base (walls)
                ctx.fillStyle = "#ffe082"; // yellow
                ctx.strokeStyle = "#bfa14a";
                ctx.beginPath();
                ctx.rect(60, 90, 80, 50);
                ctx.fill();
                ctx.stroke();
                break;
            case 2: // Roof
                ctx.fillStyle = "#e57373"; // red
                ctx.strokeStyle = "#b71c1c";
                ctx.beginPath();
                ctx.moveTo(60, 90);
                ctx.lineTo(100, 50);
                ctx.lineTo(140, 90);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
            case 3: // Door
                ctx.fillStyle = "#8d6e63"; // brown
                ctx.strokeStyle = "#5d4037";
                ctx.beginPath();
                ctx.rect(95, 120, 20, 20);
                ctx.fill();
                ctx.stroke();
                // Door knob
                ctx.beginPath();
                ctx.arc(112, 130, 2, 0, Math.PI * 2);
                ctx.fillStyle = "#ffd54f";
                ctx.fill();
                break;
            case 4: // Left window
                ctx.fillStyle = "#81d4fa"; // blue
                ctx.strokeStyle = "#0288d1";
                ctx.beginPath();
                ctx.rect(70, 100, 15, 15);
                ctx.fill();
                ctx.stroke();
                // Window panes
                ctx.strokeStyle = "#0288d1";
                ctx.beginPath();
                ctx.moveTo(70, 107.5);
                ctx.lineTo(85, 107.5);
                ctx.moveTo(77.5, 100);
                ctx.lineTo(77.5, 115);
                ctx.stroke();
                break;
            case 5: // Right window
                ctx.fillStyle = "#81d4fa"; // blue
                ctx.strokeStyle = "#0288d1";
                ctx.beginPath();
                ctx.rect(115, 100, 15, 15);
                ctx.fill();
                ctx.stroke();
                // Window panes
                ctx.strokeStyle = "#0288d1";
                ctx.beginPath();
                ctx.moveTo(115, 107.5);
                ctx.lineTo(130, 107.5);
                ctx.moveTo(122.5, 100);
                ctx.lineTo(122.5, 115);
                ctx.stroke();
                break;
            case 6: // Chimney
                ctx.fillStyle = "#bdbdbd"; // gray
                ctx.strokeStyle = "#616161";
                ctx.beginPath();
                ctx.rect(125, 60, 10, 20);
                ctx.fill();
                ctx.stroke();
                break;
        }
    }