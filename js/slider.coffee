window.app = angular.module('app', ['ngTouch'])
app.controller 'mainCtrl', ['$scope', ($scope)->
  $scope.minimum = 14
  $scope.maximum = 65
  $scope.$watch 'minimum', ->
    console.log $scope.minimum

]
app.directive 'slider', ->
  restrict : 'A'
  scope :
    minValue : '='
    maxValue : '='
    step     : '='

  templateUrl : './templates/slider-template.html'

  link: (scope, element) ->
    console.log scope
    # moving max pointer
    width = element[0].clientWidth
    minElement = document.getElementsByClassName('slider-btn min')[0]
    maxElement = document.getElementsByClassName('slider-btn max')[0]
    sliderContainer = document.getElementsByClassName('slider-container')[0]
    sliderRange = document.getElementById('slider-range')


    maxWidthRange = sliderContainer.clientWidth
    maxElement.style.right = -30
    minElement.style.left = -30
    #set init value
    sliderRange.style.left = 0
    sliderRange.style.right = 0
    step = sliderRange.clientWidth / (scope.maxValue - scope.minValue)
    console.log step

    initMaxValue = scope.maxValue
    initMinValue = scope.minValue

    sliderRangeCurrentXMAX = 150 - 30
    sliderRangeCurrentXMIN = 150
    onDragEventMIN = false
    onDropEventMAX = false
    startPosition = 0
    finishPosition = 0
    maxPosition =  100000
    minPosition = -100000

    maxElement.addEventListener 'mousedown', (event)->
      maxPosition =  100000
      minPosition = -100000
      if maxElement.style.right
        sliderRangeCurrentXMAX = sliderRange.style.right.slice(0,-2)
      onDropEventMAX = true
      startPosition = event.clientX

    minElement.addEventListener 'mousedown', (event)->
      maxPosition =  100000
      minPosition = -100000
      if minElement.style.left
        sliderRangeCurrentXMIN = sliderRange.style.left.slice(0,-2)
      onDragEventMIN = true
      startPosition = event.clientX


    document.addEventListener 'mouseup', (event)->
      onDropEventMAX = false
      onDragEventMIN = false


    document.body.onmousemove = (event)->
      #for max
      if onDropEventMAX
        finishPosition = event.clientX

        if (finishPosition < maxPosition) && (finishPosition > minPosition)
          sliderRange.style.right = sliderRangeCurrentXMAX - (finishPosition - startPosition)
          setMaxValue()
#          scope.maxValue = initMaxValue - Math.floor sliderRange.style.right.slice(0,-2)/step if Math.floor sliderRange.style.right.slice(0,-2) > 0
#          scope.maxValue = scope.minValue + 1 if scope.maxValue <= scope.minValue
          scope.$apply()
        if (sliderRange.style.right.slice(0,-2) < 0)
          sliderRange.style.right = '0px'
          maxPosition = event.clientX
        if (maxWidthRange < ((1*sliderRange.style.left.slice(0,-2) + 1*sliderRange.style.right.slice(0,-2) + sliderRange.clientWidth))) && (finishPosition < maxPosition)
          minPosition = event.clientX
          sliderRange.style.right = maxWidthRange - sliderRange.style.left.slice(0,-2)

      #     for min
      if onDragEventMIN
        finishPosition = event.clientX
        if (finishPosition < maxPosition) && (finishPosition > minPosition)
          sliderRange.style.left = sliderRangeCurrentXMIN - (startPosition - finishPosition)
          setMinValue()
#          scope.minValue = initMinValue + Math.floor sliderRange.style.left.slice(0,-2)/step if sliderRange.style.left.slice(0,-2) > 0
#          scope.minValue = scope.maxValue - 1  if scope.maxValue  <= scope.minValue
          scope.$apply()
        if (sliderRange.style.left.slice(0,-2) < 0)
          sliderRange.style.left = '0px'
          minPosition = event.clientX
        if (maxWidthRange < ((1*sliderRange.style.left.slice(0,-2) + 1*sliderRange.style.right.slice(0,-2) + sliderRange.clientWidth))) && (finishPosition < maxPosition)
          maxPosition = event.clientX
          sliderRange.style.left = maxWidthRange - sliderRange.style.right.slice(0,-2)


    setMaxValue = ()->
      scope.maxValue = initMaxValue - Math.floor sliderRange.style.right.slice(0,-2)/step if Math.floor sliderRange.style.right.slice(0,-2) > 0
      scope.maxValue = scope.minValue + 1 if scope.maxValue <= scope.minValue
    setMinValue = ()->
      scope.minValue = initMinValue + Math.floor sliderRange.style.left.slice(0,-2)/step if sliderRange.style.left.slice(0,-2) > 0
      scope.minValue = scope.maxValue - 1  if scope.maxValue  <= scope.minValue


    false








