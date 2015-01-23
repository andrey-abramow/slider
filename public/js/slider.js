window.app = angular.module('app', ['ngSlider', 'ngTouch']);

app.controller('mainCtrl', [
  '$scope', function($scope) {
    $scope.minimum = 1;
    $scope.maximum = 10;
    return $scope.$watch('minimum', function() {
      return console.log($scope.minimum);
    });
  }
]);

angular.module('ngSlider', []).directive('slider', [
  function() {
    return {
      restrict: 'A',
      scope: {
        minValue: '=',
        maxValue: '='
      },
      templateUrl: './templates/slider-template.html',
      link: function(scope) {
        var calculatePosition, checkBubblesCollision, checkOutOfTheRange, dragMaxBubble, dragMinBubble, dropBubble, finishPosition, getPixelsOfSliderRangeProperty, initMaxValue, initMinValue, maxElement, maxPosition, maxWidthRange, minElement, minPosition, onDragEventMIN, onDropEventMAX, resetPosition, setMaxPosition, setMaxValue, setMinPosition, setMinValue, setSliderLeftPosition, setSliderRightPosition, sliderContainer, sliderRange, sliderRangeCurrentX, startPosition, step;
        minElement = document.getElementById('slider-btn-min');
        maxElement = document.getElementsByClassName('slider-btn max')[0];
        sliderContainer = document.getElementsByClassName('slider-container')[0];
        sliderRange = document.getElementById('slider-range');
        maxWidthRange = sliderContainer.clientWidth;
        scope.$watch(minElement, function() {
          return minElement.style.left = -minElement.offsetWidth;
        });
        scope.$watch(maxElement, function() {
          return maxElement.style.right = -maxElement.offsetWidth;
        });
        sliderRange.style.left = 0;
        sliderRange.style.right = 0;
        step = sliderRange.clientWidth / (scope.maxValue - scope.minValue);
        initMaxValue = scope.maxValue;
        initMinValue = scope.minValue;
        sliderRangeCurrentX = 0;
        onDragEventMIN = false;
        onDropEventMAX = false;
        startPosition = 0;
        finishPosition = 0;
        maxPosition = Number.MAX_VALUE;
        minPosition = -Number.MAX_VALUE;
        resetPosition = function() {
          maxPosition = Number.MAX_VALUE;
          return minPosition = -Number.MAX_VALUE;
        };
        maxElement.addEventListener('mousedown', function(event) {
          return dragMinBubble(event);
        });
        maxElement.addEventListener('touchstart', function(event) {
          return dragMinBubble(event);
        });
        minElement.addEventListener('mousedown', function(event) {
          return dragMaxBubble(event);
        });
        minElement.addEventListener('touchstart', function(event) {
          return dragMaxBubble(event);
        });
        document.addEventListener('mouseup', function() {
          return dropBubble();
        });
        document.addEventListener('touchend', function() {
          return dropBubble();
        });
        dragMinBubble = function(event) {
          if (event.changedTouches) {
            event = event.changedTouches[0];
          }
          console.log('ppppppppppppppp');
          resetPosition();
          if (maxElement.style.right) {
            sliderRangeCurrentX = getPixelsOfSliderRangeProperty('right');
          }
          onDropEventMAX = true;
          return startPosition = Math.floor(event.clientX);
        };
        dragMaxBubble = function(event) {
          if (event.changedTouches) {
            event = event.changedTouches[0];
          }
          console.log('ppppppppppppppp');
          resetPosition();
          if (minElement.style.left) {
            sliderRangeCurrentX = getPixelsOfSliderRangeProperty('left');
          }
          onDragEventMIN = true;
          return startPosition = Math.floor(event.clientX);
        };
        dropBubble = function() {
          onDropEventMAX = false;
          return onDragEventMIN = false;
        };
        document.body.addEventListener('touchmove', function(event) {
          if (event.changedTouches) {
            event = event.changedTouches[0];
          }
          if (onDropEventMAX) {
            calculatePosition(event, 'right', 'left', setMaxValue, setMaxPosition, setMinPosition);
          }
          if (onDragEventMIN) {
            return calculatePosition(event, 'left', 'right', setMinValue, setMinPosition, setMaxPosition);
          }
        });
        document.body.onmousemove = function(event) {
          if (onDropEventMAX) {
            calculatePosition(event, 'right', 'left', setMaxValue, setMaxPosition, setMinPosition);
          }
          if (onDragEventMIN) {
            return calculatePosition(event, 'left', 'right', setMinValue, setMinPosition, setMaxPosition);
          }
        };
        calculatePosition = function(event, myPosition, siblingPosition, setValue, setLeftPosition, setRightPosition) {
          finishPosition = Math.floor(event.clientX);
          console.log(minPosition, finishPosition, maxPosition);
          if ((minPosition < finishPosition && finishPosition < maxPosition)) {
            setValue();
            scope.$apply();
          }
          console.log(getPixelsOfSliderRangeProperty(myPosition));
          if (getPixelsOfSliderRangeProperty(myPosition) < 0) {
            sliderRange.style[myPosition] = '0px';
            setLeftPosition(event);
            console.log('2222222');
          }
          if (checkBubblesCollision()) {
            console.log('3333333');
            setRightPosition(event);
            return sliderRange.style[myPosition] = maxWidthRange - getPixelsOfSliderRangeProperty(siblingPosition);
          }
        };
        setMinPosition = function(event) {
          return minPosition = Math.floor(event.clientX);
        };
        setMaxPosition = function(event) {
          return maxPosition = Math.floor(event.clientX);
        };
        setMaxValue = function() {
          setSliderRightPosition();
          if (Math.floor(getPixelsOfSliderRangeProperty('right') > 0)) {
            scope.maxValue = initMaxValue - Math.floor(getPixelsOfSliderRangeProperty('right') / step);
          }
          if (scope.maxValue <= scope.minValue) {
            return scope.maxValue = scope.minValue + 1;
          }
        };
        setMinValue = function() {
          setSliderLeftPosition();
          if (getPixelsOfSliderRangeProperty('left') > 0) {
            scope.minValue = initMinValue + Math.floor(getPixelsOfSliderRangeProperty('left') / step);
          }
          if (scope.maxValue <= scope.minValue) {
            return scope.minValue = scope.maxValue - 1;
          }
        };
        setSliderRightPosition = function() {
          sliderRange.style.right = sliderRangeCurrentX - (finishPosition - startPosition);
          return console.log(sliderRangeCurrentX, finishPosition, startPosition);
        };
        setSliderLeftPosition = function() {
          return sliderRange.style.left = sliderRangeCurrentX - (startPosition - finishPosition);
        };
        checkBubblesCollision = function() {
          console.log(checkOutOfTheRange());
          return checkOutOfTheRange() && (finishPosition < maxPosition);
        };
        checkOutOfTheRange = function() {
          console.log(maxWidthRange, 1 * getPixelsOfSliderRangeProperty('left'), 1 * getPixelsOfSliderRangeProperty('right'), sliderRange.clientWidth);
          return maxWidthRange < (1 * getPixelsOfSliderRangeProperty('left') + 1 * getPixelsOfSliderRangeProperty('right') + sliderRange.clientWidth);
        };
        getPixelsOfSliderRangeProperty = function(property) {
          return sliderRange.style[property].slice(0, -2);
        };
        return false;
      }
    };
  }
]);
