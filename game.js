
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function(){

  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = this.id;
  // nextSequence();  was calling nextSequence here idk why.
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{  //bracket ki galti
    playSound("wrong");

    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
    // userClickedPattern = [];  called here instad of nextSequence
}
// function checkAnswer(currentLevel) {
//
//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }
//     } else {
//       playSound("wrong");
//       $("body").addClass("game-over");
//       $("#level-title").text("Game Over, Press Any Key to Restart");
//
//       setTimeout(function () {
//         $("body").removeClass("game-over");
//       }, 200);
//
//       startOver();
//     }
// }



function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);  //0-3
  //return randomNumber;
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  var buttonId = "#" + randomChosenColor;
  $(buttonId).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name){
  var forAudio = "sounds/" + name + ".mp3";
  var audio = new Audio(forAudio);
  audio.play();
}

function animatePress(currentColor){
  var currentColorId = "#" + currentColor;
  $(currentColorId).addClass("pressed");
  setTimeout(function(){
    $(currentColorId).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
