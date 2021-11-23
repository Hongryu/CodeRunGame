const canvas = document.querySelector("#drawCanvas")
const context = canvas.getContext('2d');    //canvas의 context를 사용하여 그림을 그린다.

//사각형 찍고
context.fillRect(50, 50, 100, 100)

//색깔바꾼후
context.fillStyle='red'
//사각형 하나 더 찍음
context.fillRect(0, 0, 100, 100)    //윤곽선 +채운 도형
context.clearRect(80, 80, 100, 100) //윤곽선 없는 도형
context.strokeRect(150, 150, 100, 100)  //윤곽선만 있는 도형


context.beginPath();    //선그리기 시작
context.moveTo(100, 100)    //어디서 시작할것인지
context.lineTo(300, 200)   //어디서 끝날것인가
context.stroke()    //선그림
//context.fill();   //색을 채우는건데 선에는 색채우기 안되므로 의미 X
context.closePath(); //선그리기 종료

context.arc(300, 300, 50, 0, 360)   //호 그리기(0~360), (위치는 가운데 기준, 반지름)
