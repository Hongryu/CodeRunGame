let body = document.querySelector("#body");
body.width=innerWidth;
body.height=innerHeight;

let backbtn = document.querySelector('#gameBack_btn');
   backbtn.addEventListener('click', function(){
      window.location.href = 'index.html';
    
})

console.log(body.width)
console.log(body.height)
