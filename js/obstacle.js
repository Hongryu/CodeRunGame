minHeight = 20;
maxHeight = 100;
minWidth = 10;
maxWidth = 20;
minGap = 200;
maxGap = 500;

let myObstacles = [];

function startGame(){
    gamearea.start();
}

function obstacle(){
    this.height = Math.floor(minHeight+Math.random() * (maxHeight-minHeight+1));
    this.width = Math.floor(minHeight+Math.random() * (maxHeight-minHeight+1));
    this.x = 1200;
    this.y = gamearea.canvas.height-this.height;
    this.draw = function(){
        gamearea.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

let gamearea = {
    canvas : document.createElement("canvas"),
    context : this.canvas.getContext('2d'),
    start:function(){
        this.canvas.height=500;
        this.canvas.width=1200;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //this.
        myObstacles.push(new obstacle());
        this.interval = setInterval(this.updateGameArea,5);
    },
    updateGameArea:function(){
        gamearea.clear();
        myObstacles[0].x = -1;
        myObstacles[0].draw();
    },
    clear:function(){
        gamearea.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop:function(){

    }
}

document.addEventListener('DOMContentLoaded', startGame);  