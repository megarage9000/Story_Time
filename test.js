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

function WordTurnList() {
    this.word_turns = [];

    this.push_word_turn = function(word_turn) {
        this.word_turns.push(word_turn);
    }

    this.reset = function() {
        this.word_turns.length = 0;
    }

    this.print_story = function() {
        let num_turns = this.word_turns.length;
        let story = "";
        for(let curr_word_idx = 0; curr_word_idx < num_turns; curr_word_idx++) {
            story += this.word_turns[curr_word_idx].get_words();
            story += " ";
        }

        return story;
    }
}

function Game(num_players, num_turns, max_words) {
    this.num_players = num_players;
    this.num_turns = num_turns;
    this.max_words = max_words;

    this.player_list = [];
    this.word_turn_list = new WordTurnList();
    this.current_player_idx = 0;
    this.current_turn = 0;

    this.initialize_game = function(prompt_player_creation) {
        this.player_list = [];
        this.word_turn_list = new WordTurnList();
        this.current_player_idx = 0;
        this.current_turn = 0;

        for (let player_num = 0; player_num < this.num_players; player_num++) {
            let player_name = prompt_player_creation(player_num);
            this.player_list.push(
                new Player(player_name)
            );
        }
        console.log(this);
    }

    this.execute_turn = function(fetch_player_words, send_error_message) {
        
        console.log("current_turn = " + this.current_turn);
        console.log("current_player_idx = " + this.current_player_idx);

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

        this.word_turn_list.push_word_turn(current_word_turn);

        this.current_player_idx++;

        // Checking bounds
        if(this.current_player_idx >= this.num_players) {
            this.current_player_idx = 0;
            this.current_turn++;
        }
    }

    this.is_finished = function() {
        return (this.current_turn > this.num_turns);
    }

    this.on_finish = function(show_story) {
        show_story(this.word_turn_list.print_story());
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

let game = new Game(2, 2, 2);
game.initialize_game(get_player_name);
while(!game.is_finished()) {
    game.execute_turn(get_player_words, output_to_user);
}
game.on_finish(output_to_user);

function get_player_name(player_index) {
    console.log("Enter player name for player " + player_index);
    let name = window.prompt("Enter player name for player " + player_index);
    return name;
}

function get_player_words() {
    console.log("Enter words for player");
    let words = window.prompt("Enter words for player");
    return words;
}

function output_to_user(message) {
    alert(message);
    console.log(message);
}