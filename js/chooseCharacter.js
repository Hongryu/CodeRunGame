let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let character0 = new Image();
character0.src="../characterImg/main0.png"
let character1 = new Image();
character1.src="../characterImg/main1.png"
let character2 = new Image();
character2.src="../characterImg/main2.png"
let character3 = new Image();
character3.src="../characterImg/main3.png"
let character4 = new Image();
character4.src="../characterImg/main4.png"



document.addEventListener('onload', function () {
    context.drawImage(character0, 100, 100, 250, 250)
    context.drawImage(character1, 400, 100, 250, 250)
    context.drawImage(character2, 100, 100, 250, 250)
    context.drawImage(character3, 100, 100, 250, 250)
    context.drawImage(character4, 100, 100, 250, 250)
})
