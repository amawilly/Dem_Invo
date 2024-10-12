var score = 0;
var currentWord = "democracy"; // Updated word
var wordleState = Array(currentWord.length).fill("_");
var attempts = 0;

// Update score display
function updateScoreDisplay() {
    document.getElementById('scoreDisplay').innerText = "Score: " + score;
    document.getElementById('secondScoreDisplay').innerText = "Score: " + score;
    document.getElementById('thirdScoreDisplay').innerText = "Score: " + score;
    document.getElementById('fourthScoreDisplay').innerText = "Score: " + score;
}

// Start the game
function startGame() {
    document.getElementById('firstDialog').showModal();
    updateScoreDisplay();
}

// First Dialog (Name Check)
function checkName() {
    var input = document.getElementById('nameInput').value;
    if (input === "Emilian") {
        score += 3;
        updateScoreDisplay();
        document.getElementById('firstDialog').close();
        openSecondDialog();
    } else {
        alert("Try again!");
    }
}

function closeFirst() {
    score = 0;
    updateScoreDisplay();
    document.getElementById('firstDialog').close();
}

// Second Dialog (Sentence Arrangement)
function openSecondDialog() {
    var words = ["We", "are", "the", "best", "team", "ever"];
    words = shuffleArray(words);
    var container = document.getElementById('buttonsContainer');
    container.innerHTML = '';
    words.forEach(function(word) {
        var button = document.createElement('button');
        button.innerText = word;
        button.onclick = function() {
            button.disabled = true;
            container.appendChild(button);
        };
        container.appendChild(button);
    });
    document.getElementById('secondDialog').showModal();
}

function checkSentence() {
    var container = document.getElementById('buttonsContainer');
    var sentence = Array.from(container.querySelectorAll('button')).map(btn => btn.innerText).join(' ');
    if (sentence === "We are the best team ever") {
        score += 5;
        updateScoreDisplay();
        document.getElementById('secondDialog').close();
        openThirdDialog();
    } else {
        alert("Try again!");
        resetButtons(container);
    }
}

function closeSecond() {
    score = 0;
    updateScoreDisplay();
    document.getElementById('secondDialog').close();
}

// Third Dialog (Wordle - Democracy)
function openThirdDialog() {
    document.getElementById('thirdDialog').showModal();
    document.getElementById('nextLevelBtn').style.display = 'block'; // Make sure the submit button is always visible
}

// Check letter functionality
function checkLetter() {
    var letter = document.getElementById('letterInput').value;
    if (letter && currentWord.toLowerCase().includes(letter.toLowerCase())) {
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i].toLowerCase() === letter.toLowerCase()) {
                wordleState[i] = letter; // Actualizăm starea cuvântului
            }
        }
        document.getElementById('wordleDisplay').innerText = wordleState.join(" ");
        // Verifică dacă cuvântul a fost completat
        if (wordleState.join("") == currentWord) {
            goToNextLevel();
        }
    } else {
        alert("Try another letter!");
    }
}


// Go to next level
function goToNextLevel() {
    // Verifică dacă wordleState este completat corect
    if (wordleState.join("") == currentWord) {
        score += 10;
        updateScoreDisplay();
        document.getElementById('thirdDialog').close();
        openFourthDialog();
    } else {
        alert("Incorrect word, try another one!");
    }
}


function closeThird() {
    score = 0;
    updateScoreDisplay();
    document.getElementById('thirdDialog').close();
}

// Fourth Dialog (Guess the Age)
function openFourthDialog() {
    document.getElementById('fourthDialog').showModal();
}

function checkAge() {
    var age = document.getElementById('ageInput').value;
    attempts++;
    if (age == 18) {
        score += 10;
        updateScoreDisplay();
        alert("You guessed it in " + attempts + " attempts!");
        document.getElementById('fourthDialog').close();
        openFinalDialog();
    } else if (age > 18) {
        document.getElementById('hint').innerText = "Try a smaller number!";
    } else {
        document.getElementById('hint').innerText = "Try a bigger number!";
    }
}

function closeFourth() {
    score = 0;
    updateScoreDisplay();
    document.getElementById('fourthDialog').close();
}

// Final Dialog (Congratulate and Show Score)
function openFinalDialog() {
    document.getElementById('finalScoreMessage').innerText = "Your total score is: " + score;
    document.getElementById('finalDialog').showModal();
}

function closeFinal() {
    score = 0;
    updateScoreDisplay();
    document.getElementById('finalDialog').close();
}

// Utility to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Reset buttons
function resetButtons(container) {
    Array.from(container.querySelectorAll('button')).forEach(btn => btn.disabled = false);
}
