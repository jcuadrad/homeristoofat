"use strict";

function init() {
  var parentElement = document.getElementsByTagName("body");
  var game = new Game(parentElement);
  game.start();
  console.log("hey");
}

init();
