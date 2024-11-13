const humanScoreLabel = document.querySelector('#humanScore');
const computerScoreLabel = document.querySelector('#computerScore');
const buttons = document.querySelectorAll('button');
// 0,1,2 = RPS, 3=start, 4=reset, 5=log, 6=off

const btnSound = document.querySelector('audio[data-sound="btn"]');
const powerIndicator = document.querySelector('#powerIndicator');

const gameStatusLabel = document.querySelector('#gameStatusLabel');
const screenDescLabel = document.querySelector('#screenDesc');
const playerImg = document.querySelector('#playerImg');
const computerImg = document.querySelector('#computerImg');

let showLogs = false;
let systemStatus = 0;
let humanChoice;
let computerChoice;
let humanScore = 0;
let computerScore = 0;
let round = 0;

buttons.forEach((btn) =>
  btn.addEventListener('click', () => {
    btnSound.currentTime = 0;
    btnSound.play();
  })
);

function updateScore() {
  humanScoreLabel.innerText = humanScore;
  computerScoreLabel.innerText = computerScore;
}

for (let i = 0; i < 3; i++) {
  buttons[i].addEventListener('click', (e) => {
    if (systemStatus === 0 || systemStatus === 3) return;
    humanChoice = buttons[i].dataset.action;
    playerImg.setAttribute('src', `img/${humanChoice}.png`);
    playRound();
  });
}

buttons[3].addEventListener('click', () => {
  if (systemStatus) return;
  powerIndicator.classList.add('on');
  updateScore();
  gameStatusLabel.innerText = 'Game Active. Make a decision.';
  systemStatus = 1;
});

buttons[6].addEventListener('click', turnOff);

function turnOff() {
  powerIndicator.classList.remove('on');
  systemStatus = 0;
  gameStatusLabel.innerText = '';
  screenDescLabel.innerText = '';
  humanScoreLabel.innerText = '';
  computerScoreLabel.innerText = '';
  computerImg.removeAttribute('src');
  playerImg.removeAttribute('src');
}

const hands = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  return hands[Math.floor(Math.random() * 3)];
}

function playRound() {
  computerChoice = getComputerChoice();
  if (humanChoice === computerChoice) {
    gameStatusLabel.innerText = 'Its a tie!';
  } else if ((humanChoice === 'rock' && computerChoice === 'scissors') || (humanChoice === 'paper' && computerChoice === 'rock') || (humanChoice === 'scissors' && computerChoice === 'paper')) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    gameStatusLabel.innerText = 'Human won';
    humanScore++;
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    gameStatusLabel.innerText = 'Computer won';
    computerScore++;
  }
  computerImg.setAttribute('src', `img/${computerChoice}.png`);
  updateScore();
  round++;

  if (round === 5) {
    systemStatus = 3;
    gameStatusLabel.innerText = humanScore > computerScore ? 'HUMAN WON' : 'COMPUTER WON';
    screenDescLabel.innerText = 'PRESS START TO START A NEW GAME';
    computerImg.removeAttribute('src');
    playerImg.removeAttribute('src');
  } else {
    systemStatus = 2;
    screenDescLabel.innerText = 'MAKE A CHOICE TO CONTINUE';
  }
}
