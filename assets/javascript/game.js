// List of films
var favFilms = ["THE GODFATHER", "A FEW GOOD MEN", "PRETTY WOMAN", "FORREST GUMP", "THE OUTSIDERS", "INCEPTION", "GOOD WILL HUNTING", "AMERICAN BEAUTY", "TOMBSTONE", "INTERSTELLAR", "BRAVEHEART", "PULP FICTION", "UNFORGIVEN", "JURASSIC PARK", "DRACULA", "THE TERMINATOR", "INDIANA JONES", "BACK TO THE FUTURE", "WALL STREET", "STAR WARS" ];
// Keep track of words guessed right and display them
var wins = 0;
var losses = 0;
document.getElementById("wins").innerHTML = wins;
document.getElementById("losses").innerHTML = losses;
// Choose a random film title
var ranChoice = Math.floor(Math.random() * 10);
var randomFilm = favFilms[ranChoice];
// User gets a number of guesses equal to the film's length + 3
var allowedGuesses = randomFilm.length + 2;
// Keep track of user's number of guesses and guesses left and display them
var guessesTaken = 0;
var guessesRemaining = allowedGuesses - guessesTaken;
document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
// Initialize array to change blanks to letters as they are guessed
var wordInProgress = [];
// Array to store letters already guessed then call to display them
var lettersGuessed = ['none'];
document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
// Import game lose audio from Freesound.org
var showdown = document.createElement("audio");
showdown.setAttribute("src", "assets/audio/showdownShort.wav");
// Import game win audio from zapsplat.com
var winGame = document.createElement("audio");
winGame.setAttribute("src", "assets/audio/win.wav");

// Game boolean
var playAgain = true;

// Take the random film and make an array of same length with blanks _ instead
var filmBlanks = function(){
for(var i in randomFilm){
		if(randomFilm[i] === " "){
			wordInProgress.push("&nbsp;");
		}
		else{
			wordInProgress.push("_");
		}
	}
};

filmBlanks();
var blankWord = wordInProgress.join(" ");
document.getElementById("blanks").innerHTML = blankWord;

// Function to replace the array of blanks as user guesses right letters
var updateWord = function(userKey){
	for(var i in randomFilm){
			if(randomFilm[i] === " "){
				wordInProgress[i] = "&nbsp;";
			}
			else if(randomFilm[i] === userKey){
				wordInProgress[i] = userKey;
			}
	}
};

// The win function
// Count a win or loss and reset the game
var win = function(){
	if(wordInProgress.indexOf('_') === -1){
		winGame.play();
		wins++;
		document.getElementById("wins").innerHTML = wins;
		ranChoice = Math.floor(Math.random() * 10);
		randomFilm = favFilms[ranChoice];
		wordInProgress = [];
		filmBlanks();
		blankWord = wordInProgress.join(" ");
		document.getElementById("blanks").innerHTML = blankWord;
		guessesTaken = 0;
		allowedGuesses = randomFilm.length + 2;
		guessesRemaining = allowedGuesses - guessesTaken;
		document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
		lettersGuessed = ['none'];
		document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
	}
	else if(guessesRemaining===0){
		showdown.play();
		losses++;
		document.getElementById("losses").innerHTML = losses;
		ranChoice = Math.floor(Math.random() * 10);
		randomFilm = favFilms[ranChoice];
		wordInProgress = [];
		filmBlanks();
		blankWord = wordInProgress.join(" ");
		document.getElementById("blanks").innerHTML = blankWord;
		guessesTaken = 0;
		allowedGuesses = randomFilm.length + 2;
		guessesRemaining = allowedGuesses - guessesTaken;
		document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
		lettersGuessed = ['none'];
		document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
	}
}

// So letters guessed doesn't add non-alpha characters like shift, etc
var validInput = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//****************************************************//
//******* Game starts with user keyboard event *******//
//****************************************************//

document.onkeyup = function(event) {

var userKey = event.key.toUpperCase();

// Replace blanks array with letters
updateWord(userKey);

// Combine into string to display to user
blankWord = wordInProgress.join(" ");
document.getElementById("blanks").innerHTML = blankWord;

// Get rid of lettersGuessed initial placeholder
if(lettersGuessed[0]==="none" && playAgain === true){
		lettersGuessed.pop();
	}

// Keep track of letters already guessed, doesn't add duplicates
// Stopped invalid keystrokes with valid key array
if(validInput.indexOf(event.key.toUpperCase()) != -1){

	// If guess is in word update blank(s) and lose a guess
	if(lettersGuessed.indexOf(event.key.toUpperCase())===-1){
		lettersGuessed.push(event.key.toUpperCase());
		document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
		guessesRemaining--;
		document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
	}
}
//Did user win?
win();
};




