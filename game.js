var gamePattern = []; 
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    //the user click patter should change every time the next sequence is called
    //then in the check answer function, the click pattern can be compared to the game pattern
    //thus resetting the user click pattern
    userClickedPattern = [];  

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);     
}
// here the current level will be the index of the last answer in the user's sequence
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var a = new Audio("sounds/wrong.mp3");
        a.play();
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        $("#level-title").text("game over, press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },500);
    }
}

//button click

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//key press

$(document).keypress(function(){
    if(level == 0){
        nextSequence();
        $("#level-title").text("Level " + level);
    }
})

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    },100)
 }

function playSound(name){
    var audi = new Audio("sounds/"+ name + ".mp3");
    audi.play();
}