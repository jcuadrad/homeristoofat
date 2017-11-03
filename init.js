"use strict";

function aud_play() {
  var myAudio = document.getElementById("theme-song");
  myAudio.play();
  console.log("Playing");
}

function init() {
  var parentElement = document.getElementsByClassName("game-container");
  $(document).on("touchmove", function(event) {
    if (event.originalEvent.scale !== 1) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
  var game = new Game(parentElement);
  game.createSplash();
  console.log("hey");
}

init();
aud_play();
