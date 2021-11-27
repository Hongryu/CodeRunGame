const canvas = document.querySelector("#canvas1");
const context = canvas.getContext('2d');

const CANVAS_WIDTH =canvas.width=1920;
const CANVAS_HEIGHT =canvas.height=1080;

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