document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    

    let WordList = [
        'cigar',
        'rebut',
        'sissy',
        'humph',
        'awake',
        'blush',
        'focal',
        'evade',
        'naval',
        'serve',
        'heath',
        'dwarf',
        'model',
        'karma',
        'stink',
        'grade',
        'quiet',
        'bench',
        'abate',
        'feign',
        'major',
        'death',
        'fresh',
        'crust',
        'stool',
        'colon',
        'abase',
        'marry',
        'react',
        'batty',
        'pride',
        'floss',
        'helix',
        'croak',
        'staff',
        'paper',
        'unfed',
        'whelp',
        'trawl',
        'outdo',
        'adobe',
        'crazy',
        'sower',
        'repay',
        'digit',
        'crate',
        'cluck',
        'spike',
        'mimic',
        'pound',
        'maxim',
        'linen',
        'unmet',
        'flesh',
        'booby',
        'forth',
        'first',
        'stand',
        'belly',
        'ivory',
        'seedy',
        'print',
        'yearn',
        'drain',
        'bribe',
    ];

    let word = WordList[Math.floor(Math.random() * WordList.length)];;
    let guessWords = [[]];
    let availableSpace = 1;
    let guessWordCount = 0;
    

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWordArr() {
        const numberOfGuessWords = guessWords.length;
        return guessWords[numberOfGuessWords - 1];
    }

    function updateGuessWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }

    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessWords[guessWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosion = word.charAt(index);
        const isCorrectPosion = (letter === letterInThatPosion);

        if (isCorrectPosion) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters!");
        }
        const currentWord = currentWordArr.join('');

        const firstLetterId = guessWordCount * 5 + 1;


        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = 'background-color:' + tileColor + ';border-color:' + tileColor;

            }, interval * index);
        });

        guessWordCount += 1;

        if (currentWord === word) {
            window.alert("Bingo!");
        }

        if (guessWords.length === 6) {
            window.alert("Sorry, you have no more chance! The word is " + word);
        }

        guessWords.push([]);
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter') {
                handleSubmitWord();
                return;
            }

            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }

            updateGuessWords(letter);
        }
    }
})
