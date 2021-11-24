//달리기 image경로를 배열로 설정
//let runImgArr = ["../img/DefaultRun1.png", "../img/DefaultRun2.png", "../img/DefaultRun3.png", "../img/DefaultRun4.png"]

let runIndex = 0;
let intervalId;

const run = function(){
    runIndex = (runIndex+1)%4;  //0, 1, 2, 3
    //console.log(runIndex);
    document.querySelector("#runImg").setAttribute("src", "../img/DefaultRun" + runIndex + ".png"); //id가 funImg인 태그의 속성중 src의 값을 바꿈
}

const jump = function(){
    runIndex = (runIndex+1)%3
    document.querySelector("#runImg").setAttribute("src", "../img/Jump" + runIndex + ".png");
}

const slide = function(){
    runIndex = (runIndex+1)%1
    document.querySelector("#runImg").setAttribute("src", "../img/Slide" + runIndex + ".png");
}

const running = document.querySelector("#running");
running.addEventListener('click', function(){
    intervalId = setInterval(run, 100)  //0.1초마다 image 변경
})

const stopRun = document.querySelector("#stoprun")
stopRun.addEventListener('click', function(){
    clearInterval(intervalId)   //setInterval 멈춤
    //console.log("stop")
})

const jumping = document.querySelector("jump")
jumping.addEventListener('click', function(){
    intervalId = setInterval(jump, 100);
})

const sliding = document.querySelector("#slide")