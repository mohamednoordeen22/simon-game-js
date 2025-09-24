
let gamePattern = [];
let userPattern = [];
let buttonColor = ["red", "blue", "green", "yellow"];
let level = 0;
let started=false;

$(document).keypress(()=>{
    if(!started){
        $("#level-title ").text("Level "+level);
         nextSequence();
    }
   started=true;
})

function nextSequence() {
    level++;
    $("#level-title ").text("Level "+level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor)
    playSound(randomChosenColor);
    
}

function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");    
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


$(".btn").on("click",function(){
    let userChosenColor=$(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userPattern.push(userChosenColor);
    checkAnswer(userPattern.length-1);

})

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userPattern[currentlevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(()=>{
                nextSequence();
                userPattern=[];
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title ").text("Game Over press A Key To start");
        gamePattern=[];
        userPattern=[];
        started=false;
        level=0;
    }
}
