"use strict";

function init() {
  var parentElement = document.getElementsByTagName("body");
  var game = new Game(parentElement);
  game.createSplash();
  console.log("hey");
  window.addEventListener("resize", function() {
    game.resize();
  });
}

init();
