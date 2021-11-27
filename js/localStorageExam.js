let index;

localStorage.setItem('index', 0);
index = localStorage.getItem('index');
localStorage.setItem('name'+index, '이름');
localStorage.setItem('score'+index, '점수');

localStorage.setItem('index', (String)(+index + 1));

for(let i = 0; i<index; i++){
    
}