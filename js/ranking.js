let backbtn = document.querySelector('#gameBack_btn');
backbtn.addEventListener('click', function(){
   window.location.href = '../html/index.html';
});

let body = document.querySelector("body");
body.width=innerWidth;
body.height=innerHeight;

//로컬스토리지
// let localStorageIdx = localStorage.getItem('index')
// console.log("1인 플레이 랭킹")
// let num = 1;
// for(let i = localStorageIdx-1; i>localStorageIdx-11; i--){
//     if(localStorage.getItem(`highscore${i}`)==null){
//         console.log(num+"등 : 0점");
//     }else{
//         console.log(num+"등 : "+ localStorage.getItem(`highscore${i}`)+"점");
//     }
//     num++;
// }

// let localStorageIdx2 = localStorage.getItem('index2')
// console.log("2인 플레이 랭킹")
// let num2 = 1;
// for(let i = localStorageIdx-1; i>localStorageIdx-11; i--){
//     if(localStorage.getItem(`highscore2player${i}`)==null){
//         console.log(num2 +"등 : 0점");
//     }else{
//         console.log(num2 +"등 : "+ localStorage.getItem(`highscore2player${i}`)+"점");
//     }
//     num2++;
// }

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
canvas.width=innerWidth*(3/4);
canvas.height = innerHeight*(3/4);

ctx.fillStyle = "#FFFFFF"
ctx.fillRect((innerWidth-canvas.width)/2, (innerHeight-canvas.height)/2, canvas.width, canvas.height)

ctx.fillStyle = "#000000"
ctx.font = '48px sans-serif';
ctx.fillText('Ranking', (innerWidth-canvas.width)/2+350, (innerHeight-canvas.height)/2+50);

ctx.font = '20px sans-serif';
let localStorageIdx = localStorage.getItem('index')
let num = 1;
for(let i = 0; i<8; i++){
    if(localStorage.getItem(`highscore${i}`)==null){
        ctx.fillText(num+"등 : 0점", (innerWidth-canvas.width)/2+30, (innerHeight-canvas.height)/2+(num*50));
        console.log(num+"등 : 0점");
    }else{
        ctx.fillText(num+"등 : "+ localStorage.getItem(`highscore${i}`)+"점", (innerWidth-canvas.width)/2+30, (innerHeight-canvas.height)/2+(num*50));
        console.log(num+"등 : "+ localStorage.getItem(`highscore${i}`)+"점");
    }
    num++;
}

let localStorageIdx2 = localStorage.getItem('index2')
let num2 = 1;
for(let i = 0; i<8; i++){
    if(localStorage.getItem(`highscore2player${i}`)==null){
        ctx.fillText(num2+"등 : 0점", (innerWidth-canvas.width)/2+700, (innerHeight-canvas.height)/2+(num2*50));
        console.log(num2 +"등 : 0점");
    }else{
        ctx.fillText(num2+"등 : "+ localStorage.getItem(`highscore2player${i}`)+"점", (innerWidth-canvas.width)/2+700, (innerHeight-canvas.height)/2+(num2*50));
        console.log(num2 +"등 : "+ localStorage.getItem(`highscore2player${i}`)+"점");
    }
    num2++;
}