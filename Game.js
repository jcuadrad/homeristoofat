"use strict";

var DONUT_CREATION_TIME = 1000;
var DONUT_SPEED = 2000;
var VEGETABLE_CREATION_TIME = 1500;
var VEGETABLE_SPEED = 2500;

function Game(gameContainer) {
  var self = this;

  self.containerElement = gameContainer;
  self.state = "Splash";
  self.healthyPoints = 0;
  self.donutsCreated = 0;

  self.resize = function() {
    console.log("resize");
  };

  //DESTROY STATE ELEMENTS//

  self.destroySplash = function() {
    $(".name").remove();
    $("#start-game").remove();
  };

  self.destroyGame = function() {
    $("body").empty();
  };

  self.destroyGameOver = function() {
    $(".game-over").remove();
  };

  //CREATE STATE ELEMENTS//

  self.createSplash = function() {
    var html = `<div class="splash-screen">
    <div class="name"><h1>Homer is too fat</h1></div>
    <button id="start-game"><h3>Let's Help Him</h3></button>
    </div>`;

    $(self.containerElement).html(html);

    $("#start-game").bind("click", function() {
      self.start();
    });

    $("body").css("background-image", "none");
    $("body").css("background-color", "#FCD24C");
  };

  self.createGame = function() {
    self.state = "Game";
    var html = `<div class="healthy-points"><h2>Healthy Points <span>0</span></h2></div>
    <div class="face-container">
    <div class="hair1"></div>
    <div class="hair2"></div>
    <div class="forehead"></div>
    <div class="forehead-conceal"></div>
    <div class="forehead-detail"></div>
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
        <div class="tongue"></div>
        <div class="mouth-inside"></div>
        <div class="end-mouth"></div>
        <div class="conceal-mouth1"></div>
        <div class="conceal-mouth2"></div>
        <div class="conceal-mouth3"></div>
    </div>
    <div class="neck"></div>
    <div class="shirt">
        <div class="collar-left"></div>
        <div class="collar-right"></div>
        <div class="body-conceal"></div>
        <div class="body-top"></div>
        <div class="body-bottom"></div>
    </div>
    </div>`;

    $("body").css("background-color", "none");
    $("body").css(
      "background-image",
      "url(http://vignette4.wikia.nocookie.net/simpsons/images/a/a2/Wiki-background_update_2.jpg/revision/latest?cb=20111014041518)"
    );
    $(self.containerElement).html(html);
  };

  self.createGameOver = function() {
    var points = self.healthyPoints;
    self.state = "Game-Over";
    var html = `  <div class="game-over">
    <div class="tv-container">
        <img src="https://media.giphy.com/media/xT5LMBk9CIQXji0wNy/giphy.gif" alt="" class="gif">
        <img src="/Users/juancuadra/prework/code/personal/Homer-Mouth-Open/images/the-simpsons-tv.png" alt="" class="frame">
    </div>
    <div class="text-container">
        <h1>GAME OVER!</H1>
        <h4>You only got
            <span>0</span> healthy points!</h4>
    </div>
    <div class="button-container">
        <button class="reset-button">GO BACK</button>
    </div>
</div>`;

    $("body").css("background-image", "none");
    $("body").css("background-color", "#FD7AB0");
    $(self.containerElement).html(html);
    $(".game-over h4 span").html(points);
  };

  //CREATE FLYING OBJECTS//

  self.createDonut = function() {
    self.donutsCreated++;
    var d = $(document.createElement("div"));
    d.addClass("donut-animate");

    var maxheight = $("body").height() - 200;
    var topSpace = Math.round(maxheight * Math.random());

    d.css("top", topSpace + "px");
    d.css("left", $("body").width() + "px");

    d.bind("click", function() {
      $(this).stop();
      $(this).remove();
    });

    $("body").append(d);

    d.animate({ left: 0 }, DONUT_SPEED, function() {
      var b = $(this);
      console.log(parseInt(b.css("left")));
      if (parseInt(b.css("left")) == 0) {
        self.gameOver();
      }
    });
  };

  self.createBroccoli = function() {
    var d = $(document.createElement("div"));
    d.attr("id", "broccoli-animate");

    var maxheight = $("body").height() - 200;
    var topSpace = Math.round(maxheight * Math.random());

    d.css("top", topSpace + "px");
    d.css("left", $("body").width() + "px");

    d.bind("click", function() {
      self.gameOver();
    });

    $("body").append(d);

    d.animate({ left: "-17.5vw" }, VEGETABLE_SPEED, function() {
      var b = $(this);
      b.remove();

      //Only trigger the animationComplete
      if (b.css("left") == "-17.5vw" && self.state === "Game") {
        self.healthyPoints++;
        $(".healthy-points span").html(self.healthyPoints);
      }
    });
  };

  //ANIMATIONS//

  self.animationForward = function() {
    $(".mouth-container").animate(
      {
        height: "23vw",
        width: "18vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".detail1").animate(
      {
        top: "6.9vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".detail2").animate(
      {
        height: "10vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".detail3").animate(
      {
        top: "17vw",
        left: "13.5vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".end-mouth").animate(
      {
        left: "5.2vw",
        opacity: "0%"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".conceal-mouth2").animate(
      {
        top: "5.9vw",
        width: "18.3vw",
        height: "7.8vw",
        "border-bottom-left-radius": "0%",
        "border-top-right-radius": "27%"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".conceal-mouth3").animate(
      {
        left: "11.1vw",
        top: "19.6vw",
        height: "5.09vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".mouth-inside").animate(
      {
        height: "8vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".tongue").animate(
      {
        height: "4vw"
      },
      500,
      function() {
        self.animationBackward();
      }
    );
  };

  self.animationBackward = function() {
    $(".mouth-container").animate(
      {
        height: "21vw",
        width: "19vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".detail1").animate(
      {
        top: "9.9vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".detail2").animate(
      {
        height: "12vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".detail3").animate(
      {
        top: "14vw",
        left: "15vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".end-mouth").animate(
      {
        left: "4.5vw",
        opacity: "100%"
      },
      500,
      function() {
        self.animationBackward();
      }
    );

    $(".conceal-mouth2").animate(
      {
        top: "7.9vw",
        width: "19vw",
        height: "8vw",
        transform: "rotate(0deg)",
        "border-bottom-left-radius": "41%",
        "border-top-right-radius": "41%"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".conceal-mouth3").animate(
      {
        left: "12.1vw",
        top: "17.1vw",
        height: "5.03vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );
    $(".mouth-inside").animate(
      {
        height: "2vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );

    $(".tongue").animate(
      {
        height: "0vw"
      },
      500,
      function() {
        self.animationForward();
      }
    );
  };

  //GAME TRANSITIONS//

  self.gameOver = function() {
    clearInterval(self.donutIntervalID);
    clearInterval(self.broccoliIntervalID);
    clearInterval(self.homerAnimationIntervalID);
    self.destroyGame();
    self.createGameOver();
    console.log(self.healthyPoints);
    self.resetTimeoutID = setTimeout(self.reset, 4000);
  };

  self.start = function() {
    self.healthyPoints = 0;
    self.destroySplash();
    self.createGame();
    self.donutIntervalID = setInterval(self.createDonut, DONUT_CREATION_TIME);
    self.broccoliIntervalID = setInterval(
      self.createBroccoli,
      VEGETABLE_CREATION_TIME
    );
    self.animationForward();
  };

  self.reset = function() {
    clearTimeout(self.resetTimeoutID);
    self.state = "Splash";
    self.healthyPoints = 0;
    self.destroyGameOver();
    self.createSplash();
  };
}
