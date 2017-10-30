var width = $(window).width();
var height = $(window).height();

function goLeft() {
  $("#donut-animate").animate({
      right: width + 280
    },
    7000,
    function () {
      $("#donut-animate").remove();
    }
  );
}

function goDown() {
  $("#donut-animate").animate({
      top: height
    },
    600,
    function () {
      $("#donut-animate").remove();
    }
  );
}

setTimeout(goLeft, 500);

$("#donut-animate").on("click", function () {
  $("#donut-animate").stop();
  goDown();
});