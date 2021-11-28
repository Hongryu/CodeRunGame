const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

let score;  //현재 점수
let scoreText;
let highscore; //최고 점수
let highscoreText;
let player; //플레이어
let player2;
let gravity;
let obstacles = []; //장애물
let gameSpeed;  //스피드
let keys = {};
let check= 0;
let isEnd = false;

const runPlayer1 = new Image()
runPlayer1.src="../characterImg/DefaultRun0.png"

//키보드를 누르고 있으면 true
document.addEventListener('keydown', function(e){
    keys[e.code] = true;
    //console.log(e.code);
});
//키보드를 떼고 있으면 false
document.addEventListener('keyup', function(e){
    keys[e.code] = false;
});

//player객체
class Player{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;

        this.orginWidth = width;
        this.orginHeight = height;

        this.dy = 0;    //diction y
        this.jumpForce = 25;    //뛰는 높이
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate(){
        //Jump
        if(keys['ArrowUp']){
            //console.log('Jump');
            this.image.src="../characterImg/Jump0.png"
            this.Jump();
        }else{
            this.jumpTimer = 0;
            this.image.src="../characterImg/DefaultRun0.png"
        }

        //Slide
        if(keys['ArrowDown']){
            //console.log('Slide');
            this.width = this.orginHeight;
            this.height = this.orginWidth
            this.image.src="../characterImg/Slide0.png"
        }else{
            this.width = this.orginWidth;
            this.height = this.originalHeight;
            this.image.src="../characterImg/DefaultRun0.png"
        }

        //내려가는 속도 배로 빨라짐
        //기본 y높이를 dy로 조절
        //y높이 변경도와주는 dy
        this.y += this.dy;

        // Gravity
        //※ y좌표는 클수록 아래를 향한다.
        //this.y + this.height는 이미지의 바닥부분
        //하늘에 떠 있으면
        if (this.y + this.height < canvas.height) { 
            this.dy += gravity;     
            this.grounded = false;
        } 
        //땅에 붙어있으면(땅 밑으로 빠지지 않게 모두 bottom으로 초기화)
        else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.height;
        }

        this.Draw();
    }

    Jump () {
        this.image.src="../characterImg/Jump0.png";
        //땅에 붙어있고, jumpTimer가 0일떄(Jump를 호출하지 않을때)
        if (this.grounded && this.jumpTimer == 0) {
            //console.log(jumpTimer);
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } 
         //위에 떠 있을때
         else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            //console.log(jumpTimer);
            this.dy = -this.jumpForce - (this.jumpTimer / 50);  //누르는 시간에 따라 더 높이 올라가게 만듦(나누기 작을 수록더 올라감 ->0.02)
        }
    }

    Draw () {
        context.beginPath();
        context.drawImage(this.image, this.x, this.y-this.height, this.width, this.height);
        context.closePath();
    }

}

class Obstacle{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;

        this.dx = -gameSpeed;
    }

    Update(){
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw(){
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.closePath();
    }
}

class Text{
    constructor(text, x, y, alignment, color, size){
        this.text = text;
        this.x = x;
        this.y = y;
        this.alignment = alignment;
        this.color = color;
        this.size = size;
    }

    Draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.font = this.s + "px sans-serif";
        context.textAlign = this.alignment;
        context.fillText(this.text, this.x, this.y);
        context.closePath();
    }
}
//장애물
const rock = new Image()
obstacle1.src="../image/rock.png";
const grass = new Image()
obstacle2.src="../image/grass.png";

//Game Functions
function SpawnObstacle(){
    let type = RandomIntInRange(0, 1);
    //console.log(type);

    if(type == 1){
        let obstacle = new Obstacle(canvas.width + 50, canvas.height - 30, 50, 30, rock);
    }else{
        let obstacle = new Obstacle(canvas.width + 50, canvas.height - 30, 50, 30, grass);
    }

    obstacles.push(obstacle);
}

function RandomIntInRange(min, max){
    return Math.round(Math.random() * (max-min)+min);
}

function Start(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.font = "20px sans-serif";

    gameSpeed = 10;
    gravity = 1;
    score = 1500;
    highscore = 0;

    player = new Player(600, 0, 200, 180, runPlayer1);
    scoreText = new Text("연봉 : " + score + "만원", 25, 25, "left", "#212121", "20");
    // player2 = new Player(450, canvas.height - 300, 200, 180, "#8585FF");
    // player2.Draw();

    requestAnimationFrame(Update);
}


let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update(){
    requestAnimationFrame(Update);
    context.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if(spawnTimer <= 0){
        SpawnObstacle();
        console.log(obstacles);
        check++;
        spawnTimer = initialSpawnTimer-gameSpeed * 8;
        
        if(spawnTimer<60){
            spawnTimer = 60;
        }
    }

    for(let i = 0; i<obstacles.length; i++){
        let o = obstacles[i];

        if(o.x + o.width < 0){
            obstacles.splice(i, 1);
        }
        o.Update();

        if(player.x<o.x + o.width && player.x + player.width>o.x && player.y<o.y + o.height&&player.y + player.height>o.y){
            obstacles = [];
            score = 1500;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 0;
            let gameOver = new Text("Game Over", canvas.width/2, canvas.height/2, "center", 60);
            gameOver.Draw();
            isEnd = true;
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    player.Animate();
    //장애물이 2번째 생성될때부터 계산 시작
    scoreText.Draw();

    if(check){
        score++;
        scoreText.text = "연봉 : " + score + "만원";
        scoreText.Draw();
        //console.log(score);   
    }

    gameSpeed += 0.003;
}



Start();

