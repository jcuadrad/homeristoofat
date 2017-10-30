"use strict";

function Game(gameContainer) {
  var self = this;

  self.containerElement = gameContainer;
  self.state = "Splash";
  self.healthyPoints = 0;

  self.destroySplash = function() {
    $(".name").remove();
    $("#start-game").remove();
  };

  self.createSplash = function() {
    var html = `<div class="splash-screen">
    <div class="name"><h1>Homer is too fat</h1></div>
  <button id="start-game">Let's Help Him</button>
  </div>`;

    $(self.containerElement).html(html);

    $("#start-game").bind("click", function() {
      self.start();
    });
  };

  self.createGame = function() {
    var html = `<div class="face-container">
    <div class="forehead"></div>
    <div class="face-top">
        <div class="eye-container" id="left">
            <div class="pupil"></div>
        </div>
        <div class="eye-container" id="right">
            <div class="pupil"></div>
        </div>
    </div>
    <div class="face-bottom">
        <div class="nose"></div>
        <div class="mouth-container"></div>
        <div class="detail1"></div>
        <div class="detail2"></div>
        <div class="detail3"></div>
        <div class="end-mouth"></div>
        <div class="conceal-mouth1"></div>
        <div class="conceal-mouth2"></div>
        <div class="conceal-mouth3"></div>
    </div>
    <div class="neck"></div>
    <div class="shirt">
        <div class="collar-left"></div>
        <div class="collar-right"></div>
    </div>
</div>`;

    $(self.containerElement).html(html);
  };

  self.createDonut = function() {
    var gamefield = self.containerElement;

    var d = $(document.createElement("div"));
    d.attr("id", "donut-animate");

    var maxheight = $("body").height() - 100;
    var top = Math.round(maxheight * Math.random());

    d.css("top", top + "px");
    d.css("right", "0px");

    d.click(function goDown() {
      $("#donut-animate").animate(
        {
          top: height
        },
        600,
        function() {
          $("#donut-animate").remove();
        }
      );
    });

    $("body").append(d);

    d.animate({ right: $("body").width() }, 3000, function() {
      var b = $(this);
      var w = $("body").width();

      //Only trigger the animationComplete if the balloon is at the
      // top of the play area.
      if (parseInt(b.css("right")) >= w) {
        console.log("Done");
      }
    });
  };
  self.start = function() {
    self.healthyPoints = 0;
    self.destroySplash();
    self.createGame();
    setInterval(self.createDonut, 5000);
  };
}
