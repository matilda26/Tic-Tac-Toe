
var gameBlock = document.querySelectorAll('.block');
var winnerStatus = document.querySelector('.status');
var playerOneScore = document.querySelector('.pOne-score');
var playerTwoScore = document.querySelector('.pTwo-score');
var resetBtn = document.querySelector('.reset');
var redCheer = document.getElementById('red-cheer');
var blueCheer = document.getElementById('blue-cheer');

var playerOne = [];
var playerTwo = [];
var played = [];
var turn = 0;
var tally = [0,0];
var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

var checkTurn = function(event) {
  if (played.includes(Number(event.target.id)) === true) {
    document.getElementById(event.target.id).classList.add('nope');
    setTimeout(function(){ document.getElementById(event.target.id).classList.remove('nope') }, 600);
  } else if (turn % 2 !== 0) {
    event.target.style.backgroundImage = 'url(images/cross.png)';
    playerOne.push(Number(event.target.id));
    played.push(Number(event.target.id));
    turn++;
    containsWinning(playerOne);
  } else {
    event.target.style.backgroundImage = 'url(images/circle.png)';
    playerTwo.push(Number(event.target.id));
    played.push(Number(event.target.id));
    turn++;
    containsWinning(playerTwo);
  }
}
function containsWinning(player) {
  winningCombos.forEach(function(combo) {
    for (var i = 0; i < 3; i++) {
      if (player.includes(combo[i]) && player.includes(combo[i+1]) && player.includes(combo[i+2])) {
        if (turn % 2 !== 0) {
          tally[0] += 1;
          playerOneScore.textContent = tally[0];
          document.getElementById(combo[i]).classList.add('winner');
          document.getElementById(combo[i+1]).classList.add('winner');
          document.getElementById(combo[i+2]).classList.add('winner');
          document.querySelector('.blue-jump').classList.add('jump-animate');
          blueCheer.play();
        } else {
          // winnerStatus.textContent = 'PLAYER TWO WINS';
          tally[1] += 1;
          playerTwoScore.textContent = tally[1];
          document.getElementById(combo[i]).classList.add('winner');
          document.getElementById(combo[i+1]).classList.add('winner');
          document.getElementById(combo[i+2]).classList.add('winner');
          document.querySelector('.red-jump').classList.add('jump-animate');
          redCheer.play();
        }
      } else if (false && player.length > 4) {
        winnerStatus.textContent = "IT'S A DRAW";
        //ADD DISAPPOINTED ANIMATION
      }
    }
  })
}
var resetGame = function () {
  playerOne = [];
  playerTwo = [];
  played = [];
  gameBlock.forEach(function(block) {
    block.style.backgroundImage = 'url(images/empty.png)';
    block.classList.remove('winner');
  })
  winnerStatus.textContent = '';
  document.querySelector('.blue-jump').classList.remove('jump-animate');
  document.querySelector('.red-jump').classList.remove('jump-animate');
}

gameBlock.forEach(function(block) {
  block.addEventListener('click', checkTurn);
})
resetBtn.addEventListener('click', resetGame);
