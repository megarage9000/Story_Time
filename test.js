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
    this.words_length = count_words(this.words);
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

function Game(num_players, num_turns, max_words) {
    this.num_players = num_players;
    this.num_turns = num_turns;
    this.max_words = max_words;

    this.player_list = [];
    this.word_turn_list = [];
    this.current_player_idx = 0;
    this.current_turn = 0;

    this.initialize_game = function() {

    }

    this.execute_turn = function(fetch_player_words, send_error_message) {
        
        
        let current_player = this.player_list[this.current_player_idx];
        let word_count = this.max_words + 1;
        let words = "";
        while(word_count > this.max_words) {
            words = fetch_player_words();
            word_count = count_words(words);
            if(word_count > this.max_words) {
                send_error_message("Too many words! Detected number of words: " + word_count);
            }
        }

        let current_word_turn = new WordTurn(
            current_player.name,
            words,
            this.current_turn + 1
        );

        word_turn_list.push(current_word_turn);

        // Checking bounds
        if(this.current_player_idx > this.num_players - 1) {
            this.current_player_idx = 0;
            this.current_turn++;
        }
        else {
            this.current_player_idx++;
        }
    }

    this.is_finished = function() {
        return (this.current_turn)
    }
}

// Count words based on number of spaces
function count_words(words) {
    // Trim start and end words
    let trimmed = words.trim();
    // Replace tabs, multiple spaces with one space
    trimmed = trimmed.replace(/\s\s+/g, ' ');
    // A sequence of words would contain [number of spaces] + 1 words.
    return trimmed.split(" ").length;
}

