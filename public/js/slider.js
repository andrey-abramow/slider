window.app = angular.module('app', []);

app.controller('mainCtrl', [
  function($scope) {
    $scope.minimum = 4;
    return $scope.maxValue = 3;
  }
]);

app.directive('slider', function() {
  return {
    restrict: 'A',
    scope: {
      minValue: '=',
      maxValue: '=',
      step: '='
    },
    templateUrl: './templates/slider-template.html',
    link: function(scope, element) {
      var currentX, finishPosition, maxElement, minElement, onDragEvent, onDropEvent, sliderRange, sliderRangeCurrentX, startPosition;
      minElement = document.getElementsByClassName('slider-btn min')[0];
      maxElement = document.getElementsByClassName('slider-btn max')[0];
      sliderRange = document.getElementById('slider-range');
      currentX = -31;
      sliderRangeCurrentX = 150 - 31;
      console.log(sliderRange);
      onDragEvent = false;
      onDropEvent = false;
      startPosition = 0;
      finishPosition = 0;
      maxElement.addEventListener('mousedown', function(event) {
        console.log(currentX);
        if (maxElement.style.right) {
          console.log(maxElement.style.right);
          currentX = maxElement.style.right.slice(0, -2);
          sliderRangeCurrentX = sliderRange.style.right.slice(0, -2);
        } else {
          console.log('----------------------');
        }
        onDragEvent = true;
        return startPosition = event.clientX;
      });
      document.addEventListener('mouseup', function(event) {
        return onDragEvent = false;
      });
      document.body.onmousemove = function(event) {
        console.log('move');
        finishPosition = event.clientX;
        if (onDragEvent) {
          sliderRange.style.right = sliderRangeCurrentX - (finishPosition - startPosition);
          maxElement.style.right += finishPosition - startPosition;
          console.log(startPosition, finishPosition, maxElement.style.right, currentX, sliderRange.style.right);
          return scope.maxValue = maxElement.style.right;
        }
      };
      return false;
    }
  };
});
