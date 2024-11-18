const powerIndicator = document.querySelector('#powerIndicator');
const debugIndicator = document.querySelector('#debugIndicator');
const btnSound = document.querySelector('audio[data-sound="btn"]');
const buttons = document.querySelectorAll('button');
// 0,1,2 = RPS, 3=start, 4=reset, 5=log, 6=off

const screenTopText = document.querySelector('#gameStatusLabel');
const screenBotText = document.querySelector('#screenDesc');
const playerImg = document.querySelector('#playerImg');
const computerImg = document.querySelector('#computerImg');

const roundCounterLabel = document.querySelector('#roundCounter');
const humanScoreLabel = document.querySelector('#humanScore');
const computerScoreLabel = document.querySelector('#computerScore');

let systemStatus = 'off';
let currentRound;
let humanScore;
let computerScore;
let showLogs = false;

buttons.forEach((btn) =>
  btn.addEventListener('click', () => {
    btnSound.currentTime = 0;
    btnSound.play();
  })
);

function updateScreenScore() {
  roundCounterLabel.innerText = currentRound;
  humanScoreLabel.innerText = humanScore;
  computerScoreLabel.innerText = computerScore;
}

for (let i = 0; i < 3; i++) {
  buttons[i].addEventListener('click', (e) => {
    if (systemStatus !== 'playing') return;
    playRound(buttons[i].dataset.action);
  });
}

buttons[3].addEventListener('click', turnOn);
buttons[4].addEventListener('click', playGame);
buttons[5].addEventListener('click', toggleLogs);
buttons[6].addEventListener('click', turnOff);

function toggleLogs() {
  if (systemStatus === 'off') return;
  showLogs = !showLogs;
  debugIndicator.classList.toggle('on');
}

function turnOn() {
  if (!systemStatus === 'off') return;
  powerIndicator.classList.add('on');
  playGame();
}

function turnOff() {
  powerIndicator.classList.remove('on');
  debugIndicator.classList.remove('on');
  systemStatus = 'off';
  screenTopText.innerText = '';
  screenBotText.innerText = '';
  humanScoreLabel.innerText = '';
  computerScoreLabel.innerText = '';
  computerImg.removeAttribute('src');
  playerImg.removeAttribute('src');
  showLogs = false;
  roundCounterLabel.innerText = '';
}

function playGame() {
  humanScore = 0;
  computerScore = 0;
  currentRound = 1;
  updateScreenScore();
  screenTopText.innerText = 'GAME STARTED';
  screenBotText.innerText = 'MAKE A DECISION';
  systemStatus = 'playing';
  playerImg.removeAttribute('src');
  computerImg.removeAttribute('src');
}

function getComputerChoice() {
  return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
}

function playRound(humanChoice) {
  computerChoice = getComputerChoice();
  showLogs && console.log(`Round #${currentRound} \n H: ${humanChoice} C:${computerChoice}`);
  playerImg.setAttribute('src', `img/${humanChoice}.png`);
  computerImg.setAttribute('src', `img/${computerChoice}.png`);
  screenBotText.innerText = 'ROUND OVER. PICK A NEW HAND';

  if (humanChoice === computerChoice) {
    screenTopText.innerText = 'Its a tie';
    showLogs && console.log(`Its a tie`);
  } else if ((humanChoice === 'rock' && computerChoice === 'scissors') || (humanChoice === 'paper' && computerChoice === 'rock') || (humanChoice === 'scissors' && computerChoice === 'paper')) {
    screenTopText.innerText = 'You won this round';
    showLogs && console.log(`Human won`);
    humanScore++;
  } else {
    screenTopText.innerText = 'Computer won this round';
    showLogs && console.log(`Computer won`);
    computerScore++;
  }

  updateScreenScore();

  if (currentRound === 5) {
    systemStatus = 'gameOver';
    showLogs && console.log('Game over');
    if (humanScore === computerScore) {
      screenTopText.innerText = `IT'S A TIE. ${humanScore} TO ${computerScore}`;
    } else {
      screenTopText.innerText = humanScore > computerScore ? `HUMAN WON ${humanScore} TO ${computerScore}` : `COMPUTER WON ${computerScore} to ${humanScore}`;
    }

    screenBotText.innerText = 'PRESS START TO START A NEW GAME';
  } else {
    currentRound++;
  }

  showLogs && console.log(`Score: P:${humanScore} C:${computerScore}`);
}
