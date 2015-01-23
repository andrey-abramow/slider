window.app = angular.module('app', ['ngTouch']);

app.controller('mainCtrl', [
  '$scope', function($scope) {
    $scope.minimum = 14;
    $scope.maximum = 65;
    return $scope.$watch('minimum', function() {
      return console.log($scope.minimum);
    });
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
      var finishPosition, initMaxValue, initMinValue, maxElement, maxPosition, maxWidthRange, minElement, minPosition, onDragEventMIN, onDropEventMAX, setMaxValue, setMinValue, sliderContainer, sliderRange, sliderRangeCurrentXMAX, sliderRangeCurrentXMIN, startPosition, step, width;
      console.log(scope);
      width = element[0].clientWidth;
      minElement = document.getElementsByClassName('slider-btn min')[0];
      maxElement = document.getElementsByClassName('slider-btn max')[0];
      sliderContainer = document.getElementsByClassName('slider-container')[0];
      sliderRange = document.getElementById('slider-range');
      maxWidthRange = sliderContainer.clientWidth;
      maxElement.style.right = -30;
      minElement.style.left = -30;
      sliderRange.style.left = 0;
      sliderRange.style.right = 0;
      step = sliderRange.clientWidth / (scope.maxValue - scope.minValue);
      console.log(step);
      initMaxValue = scope.maxValue;
      initMinValue = scope.minValue;
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
            setMaxValue();
            scope.$apply();
          }
          if (sliderRange.style.right.slice(0, -2) < 0) {
            sliderRange.style.right = '0px';
            maxPosition = event.clientX;
          }
          if ((maxWidthRange < (1 * sliderRange.style.left.slice(0, -2) + 1 * sliderRange.style.right.slice(0, -2) + sliderRange.clientWidth)) && (finishPosition < maxPosition)) {
            minPosition = event.clientX;
            sliderRange.style.right = maxWidthRange - sliderRange.style.left.slice(0, -2);
          }
        }
        if (onDragEventMIN) {
          finishPosition = event.clientX;
          if ((finishPosition < maxPosition) && (finishPosition > minPosition)) {
            sliderRange.style.left = sliderRangeCurrentXMIN - (startPosition - finishPosition);
            setMinValue();
            scope.$apply();
          }
          if (sliderRange.style.left.slice(0, -2) < 0) {
            sliderRange.style.left = '0px';
            minPosition = event.clientX;
          }
          if ((maxWidthRange < (1 * sliderRange.style.left.slice(0, -2) + 1 * sliderRange.style.right.slice(0, -2) + sliderRange.clientWidth)) && (finishPosition < maxPosition)) {
            maxPosition = event.clientX;
            return sliderRange.style.left = maxWidthRange - sliderRange.style.right.slice(0, -2);
          }
        }
      };
      setMaxValue = function() {
        if (Math.floor(sliderRange.style.right.slice(0, -2) > 0)) {
          scope.maxValue = initMaxValue - Math.floor(sliderRange.style.right.slice(0, -2) / step);
        }
        if (scope.maxValue <= scope.minValue) {
          return scope.maxValue = scope.minValue + 1;
        }
      };
      setMinValue = function() {
        if (sliderRange.style.left.slice(0, -2) > 0) {
          scope.minValue = initMinValue + Math.floor(sliderRange.style.left.slice(0, -2) / step);
        }
        if (scope.maxValue <= scope.minValue) {
          return scope.minValue = scope.maxValue - 1;
        }
      };
      return false;
    }
  };
});
