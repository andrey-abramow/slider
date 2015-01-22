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
    minElement = document.getElementsByClassName('slider-btn min')[0]
    maxElement = document.getElementsByClassName('slider-btn max')[0]
    sliderRange = document.getElementById('slider-range')
    currentX = -31
    sliderRangeCurrentX = 150 - 31
    console.log sliderRange
    onDragEvent = false
    onDropEvent = false
    startPosition = 0
    finishPosition = 0

    maxElement.addEventListener 'mousedown', (event)->
      console.log currentX
      if maxElement.style.right
          console.log maxElement.style.right
          currentX = maxElement.style.right.slice(0,-2)
          sliderRangeCurrentX = sliderRange.style.right.slice(0,-2)
      else
        console.log '----------------------'
#      console.log currentX

      onDragEvent = true
      startPosition = event.clientX

    document.addEventListener 'mouseup', (event)->
      onDragEvent = false



    document.body.onmousemove = (event)->
      console.log 'move'
#      console.log  onDragEvent
      finishPosition = event.clientX
      if onDragEvent
        sliderRange.style.right  = sliderRangeCurrentX - (finishPosition - startPosition)
        maxElement.style.right += finishPosition - startPosition
        console.log startPosition, finishPosition, maxElement.style.right, currentX, sliderRange.style.right
        scope.maxValue = maxElement.style.right


    false








