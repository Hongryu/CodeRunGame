const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let characterIdx = 0;
let drawTimer = 0;
let StageCount = 0;
let characterCount = 0;
let localStorageIdx = localStorage.getItem('index');

// Event Listeners
//키를 누르고 있으면 그 키는 true
document.addEventListener('keydown', function (e) {
    keys[e.code] = true;
    //console.log(e.code)
});
//키를 떼면 그 키는 false
document.addEventListener('keyup', function (e) {
    keys[e.code] = false;
});

function paintImage() {
    if(StageCount===0){
        canvas.style.backgroundImage = "url(../Stage0Img/mapBG.png)";  
    }
    else if(StageCount===1){
        canvas.style.backgroundImage="url(../Stage1Img/mapBG.png)";
        console.log("확인")
    }
    else if(StageCount===2){
        canvas.style.backgroundImage = "url(../Stage2Img/mapBG.png)";  
    }
    else if(StageCount===3){
        canvas.style.backgroundImage = "url(../Stage3Img/mapBG.png)";  
    }
}

class Player {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dy = 0;    //direction y
        this.jumpForce = 18;
        this.originalWidth = w;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
        this.isSlide = false;
        this.groundHeight = canvas.height/4

        this.characterImg = new Image();
        this.characterImg.src="../characterImg/DefaultRun"+characterCount+"_0.png"
    }

    Animate () {
        // Jump
        if (keys['Space']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;   //점프 시간을 0으로 초기화
        }

        if (keys['ControlLeft']) {
            this.isSlide = true;
            this.w = this.originalHeight+5;
            this.h = this.originalWidth-10;
            this.Slide();
        } else {
            this.isSlide = false;
            this.h = this.originalHeight;
            this.w = this.originalWidth;
        }

        //내려가는 속도 배로 빨라짐
        //기본 y높이를 dy로 조절
        this.y += this.dy;
        
        //console.log(canvas.height);
        if (this.y + this.h < canvas.height-this.groundHeight) {      //바닥에 붙어있지 않으면
            //console.log("확인")
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h - this.groundHeight;
        }

        this.Draw();
    }

    Slide(){
        //console.log("슬라이드 하고 있습니다.")
        this.characterImg.src="../characterImg/Slide"+characterCount+".png";
    }

    Jump () {
        //console.log("뛰고있습니다.")
        this.characterImg.src="../characterImg/Jump"+characterCount+".png";
        //땅에 붙어있고, jumpTimer가 0일떄(Jump를 호출하지 않을때 Jump를 호출하면)
        //y는 마이너스일수록 위로 올라간다!!
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;    //jumpForce만큼 dy값 변경하여 캐릭터 띄우기
        } 
        //이미 점프를 하고 있는 상황일때
        else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++; //JumpTimer를 증가시켜
            this.dy = -this.jumpForce - (this.jumpTimer/50);  //꾹누르면 누를수록 더 올라감(snwjr)
        }
    }

    Draw () {
        drawTimer++;
        let check = drawTimer%(10-(Math.round(gameSpeed*0.5)));
        if(check <=10) check = drawTimer%(10-(Math.round(gameSpeed*0.5)));
        else check = 10;
        if(check==0&&this.grounded&&!this.isSlide){

            //console.log(Math.round(gameSpeed));
            characterIdx++;
            characterIdx%=4;
            //console.log(characterIdx);
            //console.log(this.characterImg.src);
            this.characterImg.src="../characterImg/DefaultRun"+characterCount+"_"+ characterIdx +".png";
        }
        ctx.drawImage(this.characterImg, this.x, this.y, this.w, this.h);
    }
}

class Obstacle {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y-canvas.height/4;
        this.w = w;
        this.h = h;

        this.dx = -gameSpeed;

        this.obstacleImg = new Image();
        this.obstacleImg.src="../Stage"+StageCount+"Img/obstacle0.png";
    }

    Update () {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw () {
        //console.log("그림을 그립니다.");
        ctx.drawImage(this.obstacleImg, this.x, this.y, this.w, this.h);
    }
}

//이미지 객체 생성
const backgroundLayer1 = new Image()
backgroundLayer1.src="../Stage"+StageCount+"Img/backgroundBack.png"
const backgroundLayer2 = new Image()
backgroundLayer2.src="../Stage"+StageCount+"Img/backgroundFront.png"
const backgroundLayer3 = new Image()
backgroundLayer3.src="../Stage"+StageCount+"Img/mapGround.png"

class Layer{
    constructor(image, speedModifier, plus){
        this.x = 0;
        this.y = 0;
        this.width=innerWidth;
        this.height = innerHeight;
        this.x2 = this.width + plus;
        this.image = image
        this.speedModifier = speedModifier;
        this.speed = gameSpeed = this.speedModifier;
        this.plus = plus;
    }
    update(){
        backgroundLayer1.src="../Stage"+StageCount+"Img/backgroundBack.png"
        backgroundLayer2.src="../Stage"+StageCount+"Img/backgroundFront.png"
        backgroundLayer3.src="../Stage"+StageCount+"Img/mapGround.png"
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
        this.draw();
    }
    draw(){
        //이미지 그리기(이미지 객체 2개가 그려짐)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.8, 1200);
const layer2 = new Layer(backgroundLayer2, 1.2, 960);
const layer3 = new Layer(backgroundLayer3, 3, 0);

class Text {
    constructor (t, x, y, a, c, s) {
      this.t = t;
      this.x = x;
      this.y = y;
      this.a = a;
      this.c = c;
      this.s = s;
    }
  
    Draw () {
      ctx.beginPath();
      ctx.fillStyle = this.c;
      ctx.font = this.s + "px sans-serif";
      ctx.textAlign = this.a;
      if(StageCount==3){
          ctx.fillStyle="#FFFFFF";
      }
      ctx.fillText(this.t, this.x, this.y);
      ctx.closePath();
    }
  }

// Game Functions
function SpawnObstacle () {
    let size = RandomIntInRange(20+gameSpeed, 80+gameSpeed);
    if(size>150){size = 150;}
    //console.log(size);
    let type = RandomIntInRange(0, 1);
    let obstacle;
    if(StageCount===0&&type===1){
        obstacle = new Obstacle(canvas.width, canvas.height - 80,90, 80);
        obstacle.obstacleImg.src = "../Stage0Img/obstacle1.png";
    }else if(type===0){
        obstacle = new Obstacle(canvas.width, canvas.height - 70,70, 70);
        obstacle.obstacleImg.src = "../Stage"+StageCount+"Img/obstacle0.png";
        //console.log("../Stage"+StageCount+"Img/obstacle0.png")
    }else if(type===1){
        obstacle = new Obstacle(canvas.width, 0 , 100, canvas.height-150);
        obstacle.obstacleImg.src = "../Stage"+StageCount+"Img/obstacle1.png";
    }
    obstacles.push(obstacle);
    //console.log(obstacles)
}

function RandomIntInRange (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function Start () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";
    
    gameSpeed = 4;
    //console.log(gameSpeed)
    gravity = 1;

    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
      highscore = localStorage.getItem('highscore');
    }

    player = new Player(200, 0, 150, 180);

    scoreText = new Text("연봉: " + score + "만원", 15, 35, "left", "#212121", canvas.width/70);
    highscoreText = new Text("최고 연봉 : " + highscore, canvas.width - 15, 35, "right", "#212121", canvas.width/70);
    //console.log(canvas.width/5)

    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update () {
requestAnimationFrame(Update);

ctx.clearRect(0, 0, canvas.width, canvas.height);

    layer1.update();
    layer2.update();
    layer3.update();

    spawnTimer--;
    if (spawnTimer <= 0) {
        SpawnObstacle();
        //console.log(obstacles);
        spawnTimer = initialSpawnTimer - gameSpeed * 8;
        
        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }
    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.w < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < o.x + o.w &&
            player.x + player.w > o.x &&
            player.y < o.y + o.h &&
            player.y + player.h > o.y
            ) {
                obstacles = [];
                score = 0;
                spawnTimer = initialSpawnTimer;
                gameSpeed = 4;
                localStorageIdx = localStorage.getItem('index');
                if(localStorage.getItem('highscore'+(localStorageIdx-1))!=highscore){
                    window.localStorage.setItem('highscore'+localStorageIdx++, highscore);
                    localStorage.setItem('index', localStorageIdx);
                    console.log(localStorageIdx);
                }
                
                
        }

        o.Update();
    }
    player.Animate();

    
    score++;
    scoreText.t = "연봉: " + score+"만원";
    
    scoreText.Draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = "최고 연봉 : " + highscore;
    }
    
    highscoreText.Draw();
    
    if(score % 1000===0){
        ctx.beginPath();
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        console.log("지나갑니다.")
        
        let intervalId = setInterval(function(){
            console.log("이렇게")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            StageCount++;
            if(StageCount==4) StageCount = 3;
            console.log("스테이지 : " + StageCount)
            clearInterval(intervalId);
            paintImage();
        }, 1000);
    }
    
    if(gameSpeed <=10){
        gameSpeed += 0.003;
    }else{
        gameSpeed = 10;
    }
}

//gameSpeed = prompt("초기속도를 설정해 주세요");
paintImage();
Start();