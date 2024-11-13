const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const btnSound = document.querySelector('audio[data-sound="btn"]');
const buttons = document.querySelectorAll('button');

buttons.forEach((btn) =>
  btn.addEventListener('click', () => {
    btnSound.currentTime = 0;
    btnSound.play();
  })
);

const hands = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return hands[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log('Its a tie!');
  } else if ((humanChoice === 'rock' && computerChoice === 'scissors') || (humanChoice === 'paper' && computerChoice === 'rock') || (humanChoice === 'scissors' && computerChoice === 'paper')) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    humanScore++;
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    computerScore++;
  }
}
