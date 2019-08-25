const inquirer = require('inquirer');
const Word = require('./word');

const word = new Word();

let alreadyGuessed;
let guessedLetters = [];
// console.log(guessedLetters);

const gamePrompt = () => {

    console.log('\n' + word.blankArr + '\n');

    inquirer

        .prompt([
            {
                type: 'input',
                name: 'letter',
                message: 'Guess a letter!'
            }
        ])
    
        .then(answers => {

            console.log(answers.letter);
            console.log(word.wordSelected);
            
            for (let i = 0; i < guessedLetters.length; i++) {
                if (answers.letter === guessedLetters[i]) {
                    alreadyGuessed = true;
                } else {
                    alreadyGuessed = false;
                }
            }

            console.log(alreadyGuessed);

            if (alreadyGuessed === true) {
                console.log('You already guessed that letter!  Guess again!');
            } else if (alreadyGuessed === false) {
                guessedLetters.push(answers.letter);
                console.log(guessedLetters);
                for (let i = 0; i < guessedLetters.length; i++) {
                    let tempLetter = guessedLetters[i];
                    for (let j = 0; j < word.wordSelected.length; j++) {
                        if (tempLetter === word.wordSelected[j].toLowerCase()) {
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            // NEED TO FIX SOMETHING HERE WITH SYNCHRONICITY OR SPACES CAUSING ERROR
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            word.blankArr = word.blankArr.split(' ');
                            word.blankArr[j] = tempLetter;
                            word.blankArr = word.blankArr.join(' ');
                        };
                    };
                };
                console.log(word.blankArr);
            } else if (alreadyGuessed === undefined) {
                guessedLetters.push(answers.letter);
                console.log(guessedLetters);
            };

            gamePrompt();

        })
    
        .catch(error => {
            console.log(error);
        });
};

gamePrompt();
