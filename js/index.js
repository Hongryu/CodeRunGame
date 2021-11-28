let startBtn = document.querySelector('#gameStart_btn');
startBtn.addEventListener('click', function(){
    window.location.href = 'checkPlayer.html';
})

let helpBtn = document.querySelector('#gameHelp_btn');
helpBtn.addEventListener('click', function(){
    window.location.href = 'help.html';
})


let rankBtn = document.querySelector('#ranking_btn');

rankBtn.addEventListener('click', function(){
    window.location.href = 'rank.html';
})