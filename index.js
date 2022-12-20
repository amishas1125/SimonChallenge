var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"]; 

var gameStart = false;

var level = 0;

$(document).keypress(function() {
    if(!gameStart) {

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}) ;

function nextSequence() {

    level++;

    $("#level-title").text("Level "+ level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

};

function playSound(name) {
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        var wrongAudio = new Audio("wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over! Press any key to restart.");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}





