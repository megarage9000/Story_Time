// Creating player class

function Player(name) {
    this.name = name;
    this.get_player_name = function() {
        return this.name;
    }
}

function WordTurn(player_name, words, turn_number) {
    this.player_name = player_name;
    this.words = words;
    this.words_length = words.length;
    this.turn_number = turn_number;

    this.get_words = function() {
        return this.words;
    }

    this.get_words_length = function() {
        return this.words_length;
    }

    this.get_turn_number = function() {
        return this.turn_number;
    }

    this.get_player = function() {
        return this.player_name;
    }
}

test_player = new Player("John");
test_word_turn = new WordTurn(test_player.get_player_name(), "Once upon a time", 10);
console.log("hello world!");
console.log(test_player);
console.log(test_word_turn);