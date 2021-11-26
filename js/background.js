const canvas = document.querySelector("#canvas1");
const context = canvas.getContext('2d');

const CANVAS_WIDTH =canvas.width=1650;
const CANVAS_HEIGHT =canvas.height=700;

let gameSpeed = 5;


const backgroundLayer1 = new Image()
backgroundLayer1.src="../img/background3.png"

let x = 0;
let x2 = 4198

function animate(){
    context.drawImage(backgroundLayer1, x, 0);
    context.drawImage(backgroundLayer1, x2, 0);
    console.log(x);
    console.log(x2);
    if(x<-4198) x = 0;
    else x-=gameSpeed;
    if(x2<-4198) x2 = 0;
    else x2-=gameSpeed;

    requestAnimationFrame(animate);
}

animate();