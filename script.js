const myWords = ["antidisenstablishmentarianism","apple","banana","cherry","melon","fig","grape","lemon","cheap","peach"]

const gameArea = document.querySelector(".gameArea");
const btn = gameArea.querySelector(".button");
const output= gameArea.querySelector(".output")
const input=  gameArea.querySelector(".myInput")
const scoreBoard= gameArea.querySelector(".scoreBoard");
const hint= gameArea.querySelector(".hint")

const game= {
  sel:'',
  scramble: '',
  score: 0,
  incorrect: 0,
  wordsLeft: myWords.length,
  played: 0,
  winning: false
};

function nextQ(){
  console.log("the game has started");
  if(myWords.length <=0){
    console.log('game over');
    gameArea.innerHTML = `<div class="gameOver">THE GAME IS SET</div>`;
    gameArea.innerHTML += `<div class = "textOver">It took you ${game.score + game.incorrect} guess to decrypt ${game.score} words</div>`;
  } else{
  btn.style.display = 'none';
    scoreBoard.style.display = 'block';
    output.style.padding = '10px';
    myWords.sort(() => { return 0.5 - Math.random(); });

  let sel = myWords.shift();
  game.sel = sel;
  console.log('Selected word is:', sel);

  let scramble = sel.split('').sort(() => { return 0.5 - Math.random(); }).join('')
    while (scramble == sel){
      scramble = sel.split('').sort(() => { return 0.5 - Math.random(); }).join('')
    }

    output.textContent = scramble;

    input.style.display = 'block';
    input.disabled = false
    input.focus(); 
  }
}

btn.addEventListener('click',nextQ);
  

function addScore(){
  let tempOutput = `<i>SCORE:</i> : <b>${game.score}</b> CORRECT, <b>${game.incorrect}</b> INCORRECT, <small>${game.wordsLeft} left</small>`;
    scoreBoard.innerHTML = tempOutput;
}

    function winChecker() {
      console.log("hfhfh");
      if (input.value == game.sel) {
        console.log("correct");
        game.score++;
        btn.style.display = 'block';
        btn.textContent = "CLICK FOR NEXT WORD";
        scoreBoard.style.backgroundColor = 'green';
        hint.textContent = '';
        game.winning = true;
        game.wordsLeft--;
      } else {
        game.incorrect++;
        game.winning = false;
        btn.style.display = 'none';
        scoreBoard.style.backgroundColor = 'red';
        if (game.sel != "antidisenstablishmentarianism") {
          if (game.sel == "apple" || game.sel == "banana" || game.sel == "cherry" || game.sel == "fig" || game.sel == "grape" || game.sel == "peach") {
            hint.textContent = "Hint: it's a fruit";
          } else if (game.sel == "lemon") {
            hint.textContent = "Hint: it's a yellow round fruit";
          } else if (game.sel == "melon") {
            hint.textContent = "Hint: it's a green round fruit";
          }
        } else if (game.sel == "cheap" || game.sel == "antidisenstablishmentarianism") {
          if (game.sel == "cheap") {
            hint.textContent = "Hint: it's a price";
          } else if (game.sel == "antidisenstablishmentarianism") {
            hint.textContent = "Hint: it's a belief about the Church of England";
          }
        }
      }
      addScore();
      input.value = '';
    }

input.addEventListener('keyup', (e) =>{
  console.log("aaaaa")
  if ( e.code === 'Enter'&& game.winning == true){
    nextQ();
    game.winning = false
  }else if (e.code ==='Enter' ){
    winChecker();
  };
});