const canvas = document.querySelector("#canvas1");
const context = canvas.getContext('2d');

const CANVAS_WIDTH =canvas.width = 1920;
const CANVAS_HEIGHT =canvas.height = 1080;


//-----------------배경 이미지 설정---------------------------------
let gameSpeed = 15;

//이미지 객체 생성
const backgroundLayer1 = new Image()
backgroundLayer1.src="../image/backCloud.png"
const backgroundLayer2 = new Image()
backgroundLayer2.src="../image/frontCloud.png"
const backgroundLayer3 = new Image()
backgroundLayer3.src="../image/map1Ground.png"

class Layer{
    constructor(image, speedModifier, plus){
        this.x = 0;
        this.y = 0;
        this.width=1920;
        this.height = 1080;
        this.x2 = this.width + plus;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed = this.speedModifier;
        this.plus = plus;
    }
    update(){
        //x는 오->왼으로 이동
        this.speed = gameSpeed * this.speedModifier;
        if(this.x<= -this.width){
            this.x = (this.width + this.x2 + this.plus) - this.speed;
        }
        if(this.x2<= -this.width){
            this.x2 = (this.width + this.x + this.plus) - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        //이미지 그리기(이미지 객체 2개가 그려짐)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.8, 1200);
const layer2 = new Layer(backgroundLayer2, 1.5, 960);
const layer3 = new Layer(backgroundLayer3, 4, 0);

function animate(){
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer1.update();
    layer1.draw();

    layer2.update();
    layer2.draw();

    layer3.update();
    layer3.draw();
    requestAnimationFrame(animate);
}

animate();

//배경 이미지 설정 끝-----------------------------------------------------------------

const character = document.querySelector('.character')
//캐릭터 움직이기
//브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생합니다.
document.addEventListener('DOMContentLoaded', ()=>{
    let bottom = 400;
    let isJumping = false;
    let isSliding = false;
    let runIndex = 0;
    let intervalRunId;

    function jump(){
        if(isJumping) {
            //console.log("뛰고 있습니다");
            return;
        }
        //650전까지 뛰어올라감
        let timerUpId = setInterval(function(){
            if(bottom > 650){
                //650보다 크면 내려감
                clearInterval(timerUpId);
                let timerDownId = setInterval(function(){
                    //console.log("내려갑니다.")

                    //350이하면 멈추고 달림
                    if(bottom < 350){
                        clearInterval(timerDownId);
                        isJumping = false;
                        intervalRunId = setInterval(run, 100) 
                    }
                    bottom -= 20;
                    character.style.bottom = bottom + 'px';
                }, 20)
            }
            isJumping = true;
            character.setAttribute("src", "../characterImg/Jump0.png");
            bottom += 30;
            //console.log(bottom);
            character.style.bottom = bottom+'px';
        }, 20)
    }

    function slide(){
        if(isSliding) {
            //console.log("슬라이드 하고 있습니다");
            return;
        }
        //console.log("슬라이드 합니다.")
        isSliding = true;
        character.classList.add('character-slide'); 
        character.classList.remove('character');
        character.setAttribute("src", "../characterImg/Slide0.png");
        
        setTimeout(function(){
            character.classList.remove('character-slide'); 
            character.classList.add('character');
            intervalRunId = setInterval(run, 100)
            isSliding = false;
        }, 1000);
    }

    function run(){
        runIndex = (runIndex+1)%4;  //0, 1, 2, 3
        //console.log(runIndex);
        character.setAttribute("src", "../characterImg/DefaultRun" + runIndex + ".png"); //id가 funImg인 태그의 속성중 src의 값을 바꿈
    }

    intervalRunId = setInterval(run, 100)  //0.1초마다 image 변경
    
    //상하좌우
    function control(e){
        if(e.keyCode === 38){   //↑
            clearInterval(intervalRunId);   //지금까지 달리던 것을 멈추고
            jump();
        }else if(e.keyCode===37){   //←
            goingLeft();
        }else if(e.keyCode===39){   //→
            goingRight();
        }else if(e.keyCode===40){   //↓
            clearInterval(intervalRunId);
            slide();
        }
    }

    //키보드를 누르면 control에서 조건 체크
    document.addEventListener('keydown', control)
})


context.beginPath();
context.arc(100, 100, 50, 0, radius(360), false)//호 그리기(0~360), (위치는 가운데 기준, 반지름)
context.fill();

//애니메이션 실습
let xPos = 10;
let count = 0;
function draw(){
    count++;

    if(count%10===0){
        //지우고
        context.clearRect(0, 0, canvas.width, canvas.height )
        context.beginPath();
        //그리기
        context.arc(xPos+=3, 150, 5, 0, Math.PI*2, false);
        context.fill();
    }
    

    requestAnimationFrame(draw);
}