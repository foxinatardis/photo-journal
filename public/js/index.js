// var lastScrollOffset = 0;
// var scrollingDown = true;
// var currentViewId = '#view-1';
// var activeDivId = "#background-1";
// var nextViewId = '#view-2';
// var currentIndex = 0;
// var nextViewSet = false;
var transitionComplete = false;
var lastOffsetTop = 0;
var currentIndex = 0;
var nextIndex = 0;
currentViewObject = {
  viewId: '#view-1',
  backgroundId: '#background-1',
  overlayId: '#overlay-1',
  textElementId: '#text-1',
  index: 0
};
nextViewObject = {
  viewId: '#view-2',
  backgroundId: '#background-2',
  overlayId: '#overlay-2',
  textElementId: '#text-2',
  index: 0
};

var views = [
  {
    backgroundUrl: 'url(/images/background-1.jpg)',
    backgroundStyles: null,
    overlayText: 'Here is some exciting text!!!',
    overlayTextStyles: null,
    overlayStyles: null
  },
  {
    backgroundUrl: 'url(/images/background-2.jpg)',
    backgroundStyles: null,
    overlayText: 'Here is some more exciting text!!!',
    overlayTextStyles: null,
    overlayStyles: null
  },
  {
    backgroundUrl: 'url(/images/background-3.jpg)',
    backgroundStyles: null,
    overlayText: 'Here is some boring text.',
    overlayTextStyles: null,
    overlayStyles: null
  }
];



function showLoading() {
  // TODO this is where we will show a loading spinner until the window load event
}

function updateLoop() {
    var activeDivScrollTop = $(currentViewObject.backgroundId)[0].scrollTop;
    var activeDivScrollHeight = $(currentViewObject.backgroundId)[0].offsetHeight;
    var activeOverlayHeight = $(currentViewObject.overlayId)[0].offsetHeight;
    var overlayOffsetTop = activeDivScrollHeight - activeDivScrollTop;
    var overlayOffsetBottom = activeDivScrollHeight - overlayOffsetTop - activeOverlayHeight;

// Set next view conditional tree
    if (overlayOffsetTop < 20 && nextViewObject.index <= currentViewObject.index) {
    // console.log('overlayOffsetTop < 20 && nextIndex !== currentIndex + 1');
        console.log('time to set next view');
        setNextView(currentViewObject.index + 1);
        transitionComplete = false;

    }  else if (overlayOffsetBottom < 20 && nextViewObject.index >= currentViewObject.index && currentViewObject.index > 0) {

        console.log('setPreviousView');
        setNextView(currentViewObject.index - 1);
        transitionComplete = false;

    } else if (overlayOffsetTop > 20 && overlayOffsetBottom > 20) {
      transitionComplete = true;
    }

  // console.log('overlayOffsetTop: ' + overlayOffsetTop);
  // console.log('overlayOffsetBottom: ' + overlayOffsetBottom);

    if(-overlayOffsetTop / activeOverlayHeight >= 1 && currentViewObject.index < nextViewObject.index && !transitionComplete) {

        console.log('setNextViewToCurrent');
        transitionComplete = true;
        setNextViewToCurrent();

    } else if(overlayOffsetTop <= 0 && currentViewObject.index < nextViewObject.index && overlayOffsetBottom > 20) {

        console.log('fade to next view');
        fadeToNextView(1 - (-overlayOffsetTop / activeOverlayHeight));

    } else if (-overlayOffsetBottom / activeOverlayHeight >= 1 && currentViewObject.index > 0 && currentViewObject.index > nextViewObject.index && !transitionComplete) {

        console.log('setPreviousViewToCurrent');
        transitionComplete = true;
        setNextViewToCurrent();

    } else if (overlayOffsetBottom <= 0 && currentViewObject.index > 0) {

        console.log(-overlayOffsetBottom / activeOverlayHeight);
        fadeToNextView(1 + overlayOffsetBottom / activeOverlayHeight);

    }

}

function setNextView(index) {
  var viewObject = views[index];
  var nextView = $(nextViewObject.viewId);
  var nextBackground = $(nextViewObject.backgroundId);
  var nextOverlay = $(nextViewObject.overlayId);
  var nextTextElement = $(nextViewObject.textElementId);
  nextBackground.css('background', viewObject.backgroundUrl);
  if(viewObject.backgroundStyles) nextBackground.css(viewObject.backgroundStyles);
  nextBackground.css('background-position', 'center');
  nextBackground.css('background-repeat', 'no-repeat');
  nextBackground.css('background-size', 'cover');
  if(viewObject.overlayStyles) nextOverlay.css(viewObject.overlayStyles);
  nextOverlay.css('max-height', '90vh');
  nextTextElement.text(viewObject.overlayText);
  if(viewObject.overlayTextStyles) nextTextElement.css(viewObject.overlayTextStyles);
  nextView.css('display', 'block');
  nextViewObject.index = index;
  adjustZindexes();
}

function fadeToNextView(opacityValue) {
  setCurrentDisplayOpacity(opacityValue + 0.5);
  setNextDisplayOpacity(0.5 - opacityValue);
}

function adjustZindexes() {
  var currentView = $(currentViewObject.viewId);
  var nextView = $(nextViewObject.viewId);
  currentView.css('z-index', '1');
  nextView.css('z-index', '0');
}

function setCurrentDisplayOpacity(opacity) {
  var currentView = $(currentViewObject.viewId);
  currentView.css('opacity', opacity);
}
function setNextDisplayOpacity(opacity) {
  var nextView = $(nextViewObject.viewId);
  nextView.css('opacity', opacity);
}

function setNextViewToCurrent() {
  var tempViewObject = currentViewObject;
  currentViewObject = nextViewObject;
  nextViewObject = tempViewObject;
  $(currentViewObject.viewId).css('z-index', '10');
}

setInterval(updateLoop, 1000/60);
// setInterval(updateLoop, 1000);

$(document).ready(function() {

});
