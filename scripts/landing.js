var pointsArray = document.getElementsByClassName('point');

// animate the .selling-points via CSS transition
var animatePoints = function(points) {
  // initial delay for first selling point transition
  var delay = 50;

  // for each point in points, apply the IIFE to change style, delayed by delay
  forEach({array: points, callback: function() {
     (function revealPoint(i) {
      delay += 100;
      setTimeout(function() {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
      }, delay);
    })(i);
  }});
};

window.onload = function() {
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }

  var sellingPoints = document.getElementsByClassName("selling-points")[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

  window.addEventListener("scroll", function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  });
}
