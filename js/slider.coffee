window.app = angular.module('app', [])
app.controller 'mainCtrl', [($scope)->
  $scope.minimum = 4
  $scope.maxValue = 3

]
app.directive 'slider', ->
  restrict : 'A'
  scope :
    minValue : '='
    maxValue : '='
    step     : '='

  templateUrl : './templates/slider-template.html'

  link: (scope, element) ->
    # moving max pointer
    width = element[0].clientWidth
    minElement = document.getElementsByClassName('slider-btn min')[0]
    maxElement = document.getElementsByClassName('slider-btn max')[0]
    maxElement.style.right = -30
    minElement.style.left = -30


    sliderRange = document.getElementById('slider-range')
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
      console.log 'f'
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
          sliderRange.style.right  = sliderRangeCurrentXMAX - (finishPosition - startPosition)
          maxElement.style.right += finishPosition - startPosition
        if (sliderRange.style.right.slice(0,-2) < 0)
          sliderRange.style.right = '0px'
          maxPosition = event.clientX
        console.log sliderRange.clientWidth
        if sliderRange.clientWidth <= -1
          sliderRange.style.right = (sliderRange.style.right.slice(0,-2)-1)+'px'
          minPosition = event.clientX

#     for min
      if onDragEventMIN
        console.log 'efef'
        finishPosition = event.clientX
        console.log finishPosition,maxPosition,minPosition
        if (finishPosition < maxPosition) && (finishPosition > minPosition)
          sliderRange.style.left  = sliderRangeCurrentXMIN - (startPosition - finishPosition)
          minElement.style.left +=  startPosition - finishPosition
          console.log minElement.style.left
        if (sliderRange.style.left.slice(0,-2) < 0)
          sliderRange.style.left = '0px'
          maxPosition = event.clientX
        if sliderRange.clientWidth <= -1
          sliderRange.style.left = (sliderRange.style.left.slice(0,-2)-1)+'px'
          minPosition = event.clientX



    false








