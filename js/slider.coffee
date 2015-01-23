window.app = angular.module('app', ['ngSlider', 'ngTouch'])
app.controller 'mainCtrl', ['$scope', ($scope)->
  $scope.minimum = 1
  $scope.maximum = 10
  $scope.$watch 'minimum', -> console.log $scope.minimum

]
angular.module('ngSlider',[]).directive 'slider',[ ->
  restrict : 'A'
  scope :
    minValue : '='
    maxValue : '='

  templateUrl : './templates/slider-template.html'

  link: (scope) ->
    minElement = document.getElementById('slider-btn-min')
    maxElement = document.getElementsByClassName('slider-btn max')[0]
    sliderContainer = document.getElementsByClassName('slider-container')[0]
    sliderRange = document.getElementById('slider-range')
    maxWidthRange = sliderContainer.clientWidth
    scope.$watch minElement, -> minElement.style.left = -minElement.offsetWidth
    scope.$watch maxElement, -> maxElement.style.right = -maxElement.offsetWidth


    #set init value
    sliderRange.style.left = 0
    sliderRange.style.right = 0
    step = sliderRange.clientWidth / (scope.maxValue - scope.minValue)

    initMaxValue = scope.maxValue
    initMinValue = scope.minValue

    sliderRangeCurrentX = 0
    onDragEventMIN = false
    onDropEventMAX = false
    startPosition = 0
    finishPosition = 0
    maxPosition =  Number.MAX_VALUE
    minPosition = -Number.MAX_VALUE
    resetPosition = ->
      maxPosition =  Number.MAX_VALUE
      minPosition = -Number.MAX_VALUE

    maxElement.addEventListener 'mousedown', (event)-> dragMinBubble(event)
    maxElement.addEventListener 'touchstart', (event)-> dragMinBubble(event)

    minElement.addEventListener 'mousedown', (event)-> dragMaxBubble(event)
    minElement.addEventListener 'touchstart', (event)-> dragMaxBubble(event)


    document.addEventListener 'mouseup', -> dropBubble()
    document.addEventListener 'touchend', -> dropBubble()





    dragMinBubble = (event) ->
      if event.changedTouches
        event = event.changedTouches[0]
      console.log 'ppppppppppppppp'
      resetPosition()
      if maxElement.style.right
        sliderRangeCurrentX = getPixelsOfSliderRangeProperty('right')
      onDropEventMAX = true
      startPosition = Math.floor event.clientX

    dragMaxBubble = (event) ->
      if event.changedTouches
        event = event.changedTouches[0]

      console.log 'ppppppppppppppp'
      resetPosition()
      if minElement.style.left
        sliderRangeCurrentX = getPixelsOfSliderRangeProperty('left')
      onDragEventMIN = true
      startPosition = Math.floor event.clientX

    dropBubble = ->
      onDropEventMAX = false
      onDragEventMIN = false






    document.body.addEventListener 'touchmove', (event)->
      if event.changedTouches
        event = event.changedTouches[0]
#        console.log event.clientX
      calculatePosition(event, 'right', 'left', setMaxValue, setMaxPosition, setMinPosition  ) if onDropEventMAX
      calculatePosition(event, 'left', 'right', setMinValue, setMinPosition, setMaxPosition  ) if onDragEventMIN

    document.body.onmousemove = (event)->
      calculatePosition(event, 'right', 'left', setMaxValue, setMaxPosition, setMinPosition  ) if onDropEventMAX
      calculatePosition(event, 'left', 'right', setMinValue, setMinPosition, setMaxPosition  ) if onDragEventMIN

    calculatePosition = (event, myPosition, siblingPosition, setValue, setLeftPosition, setRightPosition )->
      finishPosition = Math.floor event.clientX
      console.log minPosition, finishPosition, maxPosition
      if minPosition < finishPosition < maxPosition
        setValue()
        scope.$apply()
      console.log getPixelsOfSliderRangeProperty(myPosition)
      if (getPixelsOfSliderRangeProperty(myPosition) < 0)
        sliderRange.style[myPosition] = '0px'
        setLeftPosition(event)
        console.log '2222222'
      if checkBubblesCollision()
        console.log '3333333'
        setRightPosition(event)
        sliderRange.style[myPosition] = maxWidthRange - getPixelsOfSliderRangeProperty(siblingPosition)


    setMinPosition = (event)->
      minPosition = Math.floor event.clientX
    setMaxPosition = (event)->
      maxPosition = Math.floor event.clientX

    setMaxValue = ->
      setSliderRightPosition()
      scope.maxValue = initMaxValue - Math.floor getPixelsOfSliderRangeProperty('right')/step if Math.floor getPixelsOfSliderRangeProperty('right') > 0
      scope.maxValue = scope.minValue + 1 if scope.maxValue <= scope.minValue

    setMinValue = ->
      setSliderLeftPosition()
      scope.minValue = initMinValue + Math.floor getPixelsOfSliderRangeProperty('left')/step if getPixelsOfSliderRangeProperty('left') > 0
      scope.minValue = scope.maxValue - 1  if scope.maxValue  <= scope.minValue

    setSliderRightPosition = ->
      sliderRange.style.right = sliderRangeCurrentX - (finishPosition - startPosition)
      console.log sliderRangeCurrentX, finishPosition, startPosition

    setSliderLeftPosition = ->  sliderRange.style.left = sliderRangeCurrentX - (startPosition - finishPosition)

    checkBubblesCollision = ->
      console.log checkOutOfTheRange()
      checkOutOfTheRange() && (finishPosition < maxPosition)

    checkOutOfTheRange = ->
      console.log maxWidthRange, 1*getPixelsOfSliderRangeProperty('left'), 1*getPixelsOfSliderRangeProperty('right'), sliderRange.clientWidth
      maxWidthRange < (1*getPixelsOfSliderRangeProperty('left') + 1*getPixelsOfSliderRangeProperty('right') + sliderRange.clientWidth)

    getPixelsOfSliderRangeProperty = (property)-> sliderRange.style[property].slice(0, -2)

    false
]








