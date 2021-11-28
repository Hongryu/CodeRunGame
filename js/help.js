let body = document.querySelector("#body");
body.width=innerWidth;
body.height=innerHeight;

let backbtn = document.querySelector('#gameBack_btn');
   backbtn.addEventListener('click', function(){
   history.go(-1);
    
})

console.log(body.width)
console.log(body.height)
