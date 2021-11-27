const dino = document.querySelector('#dino');
const cactus = document.querySelector('#cactus')
const scoreBar = document.querySelector(".scoreBar")


let score = 0;

function jump(){
    if(dino.classList!="jump"){
        dino.classList.add("jump");

        setTimeout(function(){
            dino.classList.remove("jump");
        }, 300);
        
    }
}

let isAlive = setTimeout(function crash(){
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    if(cactusLeft<50&&cactusLeft>0&&dinoTop>=140){
        alert("Game Over");
        localStorage.setItem(Number,score);
        score = 0;
    }
    setTimeout(crash, 10);
}, 10);

document.addEventListener("keydown", function(event){
    jump();
    changeScore();
});

function changeScore(){
    scoreBar.textContent = "점수 : " + ++score
}
