var pointsArray = document.getElementsByClassName('point');

// animate the .selling-points via CSS transition
var animatePoints = function(points) {
  // initial delay for first selling point transition
  var delay = 50;

  // set styles on each point in points
  // each point will animate later than the previous by the delay value
  forEach({array: points, callback: function(point) {
      delay += 100;
      setTimeout(function() {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
      }, delay);
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
