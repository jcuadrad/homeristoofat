"use strict";

function init() {
  var parentElement = document.getElementsByTagName("body");
  var game = new Game(parentElement);
  game.createSplash();
  console.log("hey");
}

init();
