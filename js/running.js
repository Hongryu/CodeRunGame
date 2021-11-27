//달리기 image경로를 배열로 설정
//let runImgArr = ["../img/DefaultRun1.png", "../img/DefaultRun2.png", "../img/DefaultRun3.png", "../img/DefaultRun4.png"]

let runIndex = 0;
let intervalId;

const run = function(){
    console.log("달립니다.")
    runIndex = (runIndex+1)%4;  //0, 1, 2, 3
    //console.log(runIndex);
    document.querySelector("#runImg").setAttribute("src", "../characterImg/DefaultRun" + runIndex + ".png"); //id가 funImg인 태그의 속성중 src의 값을 바꿈
}

const jump = function(){
    console.log("점프합니다.")
    document.querySelector("#runImg").setAttribute("src", "../characterImg/Jump0.png");
}

const slide = function(){
    console.log("슬라이드 합니다.")
    document.querySelector("#runImg").setAttribute("src", "../characterImg/Slide0.png");
}

function running(){
    intervalId = setInterval(run, 100);
}


// const running = document.querySelector("#running");
// running.addEventListener('click', function(){
//     intervalId = setInterval(run, 100)  //0.1초마다 image 변경
// })

// const stopRun = document.querySelector("#stoprun")
// stopRun.addEventListener('click', function(){
//     clearInterval(intervalId)   //setInterval 멈춤
//     //console.log("stop")
// })

const jumping = document.querySelector("#jump")
jumping.addEventListener('click', function(){
    clearInterval(intervalId);
    jump();
    intervalId = setTimeout(running, 3000);
})

const sliding = document.querySelector("#slide")
sliding.addEventListener('click', function(){
    clearInterval(intervalId);
    slide();
    intervalId = setTimeout(running, 3000);
})

running();