function Word() {

    this.wordSelected;
    this.blankArr = [];

    this.words = ['Anna Karenina', 'Madame Bovary', 'War and Peace', 'The Great Gatsby', 'Lolita', 'Middlemarch', 'The Adventures of Huckleberry Finn', 'The Stories of Anton Chekhov', 'In Search of Lost Time', 'Hamlet', 'Moby Dick', 'Don Quixote', 'Ulysses', 'Great Expectations', 'One Hundred Years of Solitude'];

    this.randWordSelector = function() {
        let randNum = Math.floor(Math.random() * this.words.length);
        this.wordSelected = this.words[randNum];
    };

    this.displayBlank = function() {
        for (let i = 0; i < this.wordSelected.length; i++) {
            // blankArr.push(wordSelected[i]);
            if (this.wordSelected[i] === ' ') {
                this.blankArr.push(' ');
            } else {
                this.blankArr.push('_');
            };
        };
        this.blankArr = this.blankArr.join(' ');
    };

    this.randWordSelector();
    this.displayBlank();

};

module.exports = Word;