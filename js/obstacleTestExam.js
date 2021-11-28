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
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.dy = 0;
        this.jumpForce = 25;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate(){
        //Jump
        if(keys['ArrowUp']){
            //console.log('Jump');
            this.Jump();
        }else{
            this.jumpTimer = 0;
        }

        //Slide
        if(keys['ArrowDown']){
            //console.log('Slide');
            this.height = this.originalHeight/2;
        }else{
            this.height = this.originalHeight;
        }
        this.y += this.dy;

        // Gravity
        if (this.y + this.height < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.height;
        }

        this.Draw();
    }

    Jump () {
        
        if (this.grounded && this.jumpTimer == 0) {
            //console.log(jumpTimer);
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            //console.log(jumpTimer);

            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw () {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.closePath();
    }

}

class Player2{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.dy = 0;
        this.jumpForce = 25;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate(){
        //Jump
        if(keys['KeyW']){
            //console.log('Jump');
            this.Jump();
        }else{
            this.jumpTimer = 0;
        }

        //Slide
        if(keys['KeyS']){
            //console.log('Slide');
            this.height = this.originalHeight/2;
        }else{
            this.height = this.originalHeight;
        }
        this.y += this.dy;

        // Gravity
        if (this.y + this.height < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.height;
        }

        this.Draw();
    }

    Jump () {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw () {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.closePath();
    }

}

class Obstacle{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.dx = -gameSpeed;
    }

    Update(){
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
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

//Game Functions
function SpawnObstacle(){
    let size = RandomIntInRange(50, 100);
    //console.log(size);
    let type = RandomIntInRange(0, 1);
    //console.log(type);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2484E4');

    if(type == 1){
        obstacle.y -= player.originalHeight - 10;
        obstacle.y -= player2.originalHeight - 10;
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

    player = new Player(600, 0, 200, 200, "#FF5858");
    player2 = new Player2(200, 0, 200, 200, "#8588FF");
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
        if(player2.x<o.x + o.width && player2.x + player2.width>o.x && player2.y<o.y + o.height&&player2.y + player2.height>o.y){
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
    player2.Animate();
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

