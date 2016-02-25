var pointsArray = document.getElementsByClassName('point');

// animate the .selling-points via CSS transition
var animatePoints = function(points) {
  // set the time in ms that each point will wait before animating
  var delay = 50;

  for(i = 0, j = points.length; i < j; i++) {
    // each selling-point in points will display at different intervals
    delay += 100;

    // reveal each point after delay
    (function revealPoint(i) {
      setTimeout(function() {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
      }, delay);
    })(i);
  }
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
