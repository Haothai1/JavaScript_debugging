const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.querySelectorAll('.message');  // Using querySelectorAll for uniformity
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');


let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function checkGuess() {
  const guess = parseInt(guessInput.value, 10);
  attempts += 1;


  hideAllMessages();


  if (guess === targetNumber) {
    // Guessed correctly
    correctMessage.textContent = 'Guessed correctly';  // Update the message
    correctMessage.style.display = '';
    numberOfGuessesMessage.style.display = 'none'; // Hide the number of guesses message
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    // If guess was incorrect
    if (attempts < maxNumberOfAttempts) {
      // More attempts available
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.textContent = `Incorrect, try again. ${maxNumberOfAttempts - attempts} guesses remaining.`;
    } else {
      // No more attempts available
      maxGuessesMessage.style.display = '';
      maxGuessesMessage.textContent = '0 guesses remaining';
      submitButton.disabled = true;
      guessInput.disabled = true;
    }


    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
      tooLowMessage.textContent = 'Your guess is too low.';
    } else {
      tooHighMessage.style.display = '';
      tooHighMessage.textContent = 'Your guess is too high.';
    }
  }


  guessInput.value = ''; // Clear the input field
}


function hideAllMessages() {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => {
    message.style.display = 'none';
    message.textContent = '';  // Optionally clear text content if it's dynamically set
  });
}


function setup() {
  targetNumber = getRandomNumber(1, 100);
  attempts = 0;
  guessInput.disabled = false;
  submitButton.disabled = false;
  guessInput.value = '';
  hideAllMessages();
  resetButton.style.display = '';
}


submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);


// Initialize the game when the page is loaded
document.addEventListener('DOMContentLoaded', setup);
