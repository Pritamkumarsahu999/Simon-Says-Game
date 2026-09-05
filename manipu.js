let gameStart = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let hiScore = 0;
let body = document.querySelector('body');

function gameFlash(btn) {
     btn.classList.add('gamflash');
   setTimeout(function () {
      btn.classList.remove('gamflash');
   }, 250);

   console.log(gameSeq);

}

function userFlash(btn) {
   btn.classList.add('useflash');
   setTimeout(function () {
      btn.classList.remove('useflash');
   }, 250);
}

function gomFlash(btn){

   for(let i=0;i<gameSeq.length;i++){
      let flashSeq = document.querySelector(`.${gameSeq[i]}`)
      setTimeout(function(){
         gameFlash(flashSeq);
      },i*500);
   }
}

function reset(){
   userSeq =[];
   gameSeq = [];
   level = 0;
   gameStart = false;
   let h4 = document.querySelector('h4');
   h4.innerText = 'Press any key to RESTART';
}
function anima(){
    let h4 = document.querySelector('h4');
    h4.classList.add('level');
    setTimeout(() => {
      h4.classList.remove('level');
    },1000);
}

function levelUp(){
   userSeq = [];
   level++;
   anima();
   let h4 = document.querySelector('h4');
   h4.innerText = `level ${level}`;
    let randBtn = Math.floor(Math.random() * 4);
   let color = ['red', 'green', 'yellow', 'purple'];
   let randColor = color[randBtn];
   let colBtn = document.querySelector(`.${randColor}`);
   let gameColor = colBtn.getAttribute('id');
   gameSeq.push(gameColor);
   gomFlash();
   

}

body.addEventListener('keypress', function () {
   if(gameStart == false){
      gameStart = true;
      levelUp();
   } 
});

let btns = document.querySelectorAll('.btn');
for (let btn of btns) {
   btn.addEventListener('click', function () {
      let userColor = btn.getAttribute('id');
      userSeq.push(userColor);
      userFlash(btn);
      checkAns();

   })
}

function checkAns(){
    let idx = userSeq.length - 1;
     if(userSeq[idx] === gameSeq[idx]){
      if(userSeq.length == gameSeq.length){
         setTimeout(function(){
         levelUp();
      },1000);
      }
     }else{
      let h4 =document.querySelector('h4');
      setTimeout(function(){
         h4.innerText = 'GAME OVER PLEASE RESTART THE GAME.';
            },2000);
      let body = document.querySelector('body');
      body.classList.add('wrongFlash');
      setTimeout(function(){
         body.classList.remove('wrongFlash');
      },500);
         let h3 = document.querySelector('h3');
         if(level >= hiScore){
            hiScore = level;
            h3.innerText = `Highest Score :${hiScore}`;
         }else{
            hiScore != level;
         }
      reset();
     }
}

