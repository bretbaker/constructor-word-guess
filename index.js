const inquirer = require('inquirer');
const Word = require('./word');

let word = new Word();

let alreadyGuessed;
let guessedLetters = [];
let guessCount = 13;
let splitCount = 0;

const wordComplete = (notBlank) => {
    return notBlank !== '_';
};

const newWord = () => {
    word = new Word();
};


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

            // console.log(answers.letter);
            // console.log(word.wordSelected);
            
            alreadyGuessed = false;
            for (let i = 0; i < guessedLetters.length; i++) {
                if (answers.letter === guessedLetters[i]) {
                    alreadyGuessed = true;
                };
            };

            // console.log(alreadyGuessed);

            if (alreadyGuessed === true) {

                console.log('\n----------------------------------------------------\n\nYou already guessed that letter!  Guess again!');
                gamePrompt();

            } else if (alreadyGuessed === false || alreadyGuessed === undefined) {

                guessCount--;
                if (guessCount === 0) {
                    
                    console.log('\n----------------------------------------------------\n\nYou lose! The word was "' + word.wordSelected + '"!\n');

                    inquirer

                        .prompt([
                            {
                                type: 'confirm',
                                name: 'res',
                                message: 'Play again?'
                            }
                        ])

                        .then(answers => {

                            if (answers.res) {
                                newWord();
                                gamePrompt();
                            };

                        })

                        .catch(error => {
                            console.log(error);
                        });

                } else {

                    console.log('\n----------------------------------------------------\n\nYou have ' + guessCount + ' guesses remaining!');

                    guessedLetters.push(answers.letter);
                    // console.log(guessedLetters);

                    word.blankArr = word.blankArr.split(' ');
                    // console.log(word.blankArr);


                    if (splitCount === 0) {
                        for (let i = 0; i < word.blankArr.length; i++) {
                            if (word.blankArr[i] === '') {
                                word.blankArr.splice((i + 1), 1);
                            };
                        };
                    }

                    splitCount++;
                    // console.log(splitCount);
                    // console.log(word.blankArr);

                    for (let i = 0; i < word.wordSelected.length; i++) {
                        if (guessedLetters[guessedLetters.length - 1] === word.wordSelected[i].toLowerCase()) {
                            word.blankArr[i] = guessedLetters[guessedLetters.length - 1];
                            // console.log(word.blankArr);
                        };
                    };

                    if (word.blankArr.every(wordComplete)) {

                        console.log('\n----------------------------------------------------\n\nYou win! The word was "' + word.wordSelected + '"!\n');

                        inquirer

                            .prompt([
                                {
                                    type: 'confirm',
                                    name: 'res',
                                    message: 'Play again?'
                                }
                            ])

                            .then(answers => {

                                if (answers.res) {
                                    newWord();
                                    gamePrompt();
                                };

                            })

                            .catch(error => {
                                console.log(error);
                            });

                    } else {
                        word.blankArr = word.blankArr.join(' ');
                        gamePrompt();
                    };
                    
                };                

            };

        })
    
        .catch(error => {
            console.log(error);
        });
};

gamePrompt();
