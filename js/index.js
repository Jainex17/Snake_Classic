let scorediv = document.getElementById('score');
let highscorediv = document.getElementById('highscore');

let music = new Audio('music/music.mp3'); 
music.volume = 0.7;
let gameover = new Audio('music/gameover.mp3'); 
let eat = new Audio('music/food.mp3'); 
let movesound = new Audio('music/move.mp3'); 


let inputDir = {x: 0, y: 0};
let speed = 10;
let lastpainttime = 0;
let snakeArr = [
    {x: 15,y: 5}
];
let food = {x:5,y:5}
let score = 0;
let highscore = 0;
if(localStorage.getItem("highscore")){
    highscore = localStorage.getItem("highscore");
}


function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
    scorediv.innerHTML = score;
    highscorediv.innerHTML = highscore;
}

function iscolided(snake){

    //colide wall
    if(snake[0].x >= 18 || snake[0].y >= 18 || snake[0].x <=0 ||snake[0].y <=0){
        return true;
    }
    //colide itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
}

function gameEngine(){
    //snake update
    if(iscolided(snakeArr)){
        gameover.play();
        music.pause();
        inputDir = {x:0, y:0};
        alert("game over :)");
        snakeArr = [
            {x:15,y:5}
        ];
        if( parseInt(score) > parseInt(highscore)){
            highscore = score;
            localStorage.setItem("highscore",highscore);
        }
        score = 0;
    }
    //food update
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        eat.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 17
        food = {x:Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())};
        score += 1;
    }

    //snake move
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //snake display
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

// game logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
    inputDir = {x: 0, y: 0}
    
    switch (e.key) {
        case "ArrowUp":
            // if(board.classList.contains('headleft','headdown','headright')){
            //     document.classList.remove('headleft');
            //     document.classList.remove('headdown');
            //     document.classList.remove('headright');
            // }
            // document.classList.add('headup');
            music.play();
            movesound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "ArrowDown":
            music.play();
            movesound.play();
            // console.log("down");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowRight":
            music.play();
            movesound.play();
            // console.log("right");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    
        case "ArrowLeft":
            music.play();
            movesound.play();
            // console.log("left");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
});