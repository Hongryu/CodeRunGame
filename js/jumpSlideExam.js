
//캐릭터 움직이기
//브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생합니다.
document.addEventListener('DOMContentLoaded', ()=>{
    const character = document.querySelector('.character')
    let bottom = 300;
    let isJumping = false;
    let isGoingLeft =false;
    let isGoingRight = false;
    let left = 100;
    let leftTimerId = 0;
    let rightTimerId = 0; 

    function jump(){
        if(isJumping) {
            //console.log("뛰고 있습니다");
            return;
        }
        let timerUpId = setInterval(function(){
            if(bottom > 550){
                clearInterval(timerUpId);
                let timerDownId = setInterval(function(){
                    //console.log("내려갑니다.")
                    if(bottom < 300){
                        clearInterval(timerDownId);
                        isJumping = false;
                    }
                    bottom -= 10;
                    character.style.bottom = bottom + 'px';
                }, 20)
            }
            isJumping = true;
            bottom += 30;
            console.log(bottom);
            character.style.bottom = bottom+'px';
        }, 20)
    }

    //왼쪽으로 이동
    function goingLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function(){
            if(left<0){
                clearInterval(leftTimerId);
                isGoingLeft = false;
            }
            left -= 5;
            console.log('going left')
            console.log('left : ', left);
            character.style.left = left+"px";
        }, 20);
    }

    //오른쪽으로 이동
    function goingRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function(){
            if(left>2500){
                clearInterval(rightTimerId);
                isGoingRight = false;
            }
            left += 5;
            console.log('going right')
            console.log('right : ', left);
            character.style.left = left+"px";
        }, 20);
    }

    function slide(){
        character.classList.add('character-slide'); 
        character.classList.remove('character');
        setTimeout(function(){
            character.classList.remove('character-slide'); 
            character.classList.add('character');
        }, 1000);
    }

    //상하좌우
    function control(e){
        if(e.keyCode === 38){   //↑
            jump()
        }else if(e.keyCode===37){   //←
            goingLeft();
        }else if(e.keyCode===39){   //→
            goingRight();
        }else if(e.keyCode===40){   //↓
            slide();
        }
    }

    //키보드를 누르면 control에서 조건 체크
    document.addEventListener('keydown', control)
})

