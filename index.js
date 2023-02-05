var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$("*").keypress(function () { 
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor (Math.random() * 4) ;
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);

}

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    makeSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        startOver();
    }
}

function makeSound(key){
    switch (key) {
        case "blue":
            var audio_blue = new Audio("/sounds/blue.mp3");
            audio_blue.play();
            break;

        case "green":
            var audio_green = new Audio("/sounds/green.mp3");
            audio_green.play();
            break;

        case "red":
            var audio_red = new Audio("/sounds/red.mp3");
            audio_red.play();
            break;

        case "yellow":
            var audio_yellow = new Audio("/sounds/yellow.mp3");
            audio_yellow.play();
            break;

        
        case "wrong":
            var audio_wrong = new Audio("/sounds/wrong.mp3");
            audio_wrong.play();
            break;

        default:
            break;
    }
}

function animatePress(currentColour){
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");

    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



