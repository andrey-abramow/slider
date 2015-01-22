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
      var finishPosition, maxElement, maxPosition, minElement, minPosition, onDragEventMIN, onDropEventMAX, sliderRange, sliderRangeCurrentXMAX, sliderRangeCurrentXMIN, startPosition, width;
      width = element[0].clientWidth;
      minElement = document.getElementsByClassName('slider-btn min')[0];
      maxElement = document.getElementsByClassName('slider-btn max')[0];
      maxElement.style.right = -30;
      minElement.style.left = -30;
      sliderRange = document.getElementById('slider-range');
      sliderRangeCurrentXMAX = 150 - 30;
      sliderRangeCurrentXMIN = 150;
      onDragEventMIN = false;
      onDropEventMAX = false;
      startPosition = 0;
      finishPosition = 0;
      maxPosition = 100000;
      minPosition = -100000;
      maxElement.addEventListener('mousedown', function(event) {
        maxPosition = 100000;
        minPosition = -100000;
        if (maxElement.style.right) {
          sliderRangeCurrentXMAX = sliderRange.style.right.slice(0, -2);
        }
        onDropEventMAX = true;
        return startPosition = event.clientX;
      });
      minElement.addEventListener('mousedown', function(event) {
        maxPosition = 100000;
        minPosition = -100000;
        console.log('f');
        if (minElement.style.left) {
          sliderRangeCurrentXMIN = sliderRange.style.left.slice(0, -2);
        }
        onDragEventMIN = true;
        return startPosition = event.clientX;
      });
      document.addEventListener('mouseup', function(event) {
        onDropEventMAX = false;
        return onDragEventMIN = false;
      });
      document.body.onmousemove = function(event) {
        if (onDropEventMAX) {
          finishPosition = event.clientX;
          if ((finishPosition < maxPosition) && (finishPosition > minPosition)) {
            sliderRange.style.right = sliderRangeCurrentXMAX - (finishPosition - startPosition);
            maxElement.style.right += finishPosition - startPosition;
          }
          if (sliderRange.style.right.slice(0, -2) < 0) {
            sliderRange.style.right = '0px';
            maxPosition = event.clientX;
          }
          console.log(sliderRange.clientWidth);
          if (sliderRange.clientWidth <= -1) {
            sliderRange.style.right = (sliderRange.style.right.slice(0, -2) - 1) + 'px';
            minPosition = event.clientX;
          }
        }
        if (onDragEventMIN) {
          console.log('efef');
          finishPosition = event.clientX;
          console.log(finishPosition, maxPosition, minPosition);
          if ((finishPosition < maxPosition) && (finishPosition > minPosition)) {
            sliderRange.style.left = sliderRangeCurrentXMIN - (startPosition - finishPosition);
            minElement.style.left += startPosition - finishPosition;
            console.log(minElement.style.left);
          }
          if (sliderRange.style.left.slice(0, -2) < 0) {
            sliderRange.style.left = '0px';
            maxPosition = event.clientX;
          }
          if (sliderRange.clientWidth <= -1) {
            sliderRange.style.left = (sliderRange.style.left.slice(0, -2) - 1) + 'px';
            return minPosition = event.clientX;
          }
        }
      };
      return false;
    }
  };
});
