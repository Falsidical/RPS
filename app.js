const hands = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return hands[Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  let humanChoice;
  do {
    humanChoice = prompt('Rock | Paper | Scissors').toLowerCase();
  } while (!hands.includes(humanChoice));
  return humanChoice;
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

function playGame() {
  for (let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);
  }

  if (humanScore === computerScore) {
    console.log('Wow! its a tie!');
  } else if (humanScore > computerScore) {
    console.log('You won the game!');
  } else {
    console.log('You lost the game!');
  }

  console.log(`Final score: H: ${humanScore} C: ${computerScore}`);
}

playGame();
