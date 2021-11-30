let startBtn = document.querySelector('#gameStart_btn');
startBtn.addEventListener('click', function(){
    window.location.href = '../html/checkPlayer.html';
})

let helpBtn = document.querySelector('#gameHelp_btn');
helpBtn.addEventListener('click', function(){
    window.location.href = '../html/help.html';
})


let rankBtn = document.querySelector('#ranking_btn');

rankBtn.addEventListener('click', function(){
    window.location.href = '../html/ranking.html';
})



function setName(){
    username = document.querySelector("#name").value;
    localStorage.setItem('name', username);
}

function getName(){
    return localStorage.getItem('name');
}