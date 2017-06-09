var scrollPosition = 0;
var currentViewId = '#view-1';
var activeDivId = "#background-1";
var nextViewId = '#view-2';
var currentIndex = 0;
var nextViewSet;

var views = [
  {
    background: '/images/background1.jpg'
  },
  {
    background: '/images/background-2.jpg'
  },
  {
    background: '/images/background-3.jpg'
  }
];



function showLoading() {
  // TODO this is where we will show a loading spinner until the window load event
}

function updateLoop() {
  var newScrollPosition = checkScrollPosition();
  // console.log(newScrollPosition);
}

function checkScrollPosition() {
  var activeDivScrollTop = $(activeDivId)[0].scrollTop;
  var activeDivScrollHeight = $(activeDivId)[0].offsetHeight;
  var activeOverlayHeight = $(activeDivId).find('.overlay')[0].offsetHeight;
  var activeScrollOffset = activeDivScrollHeight - activeDivScrollTop + activeOverlayHeight;

  if(activeScrollOffset <= 100) {
    console.log('transitioning');
    transitionToNextView(activeScrollOffset);
  } else if (activeScrollOffset <= 200 && !nextViewSet) {
    setNextView();
  }
}

function setNextView() {
  var nextView = $(nextViewId);
  var nextBackground = nextView.find('.background');
  var nextImageUrl = 'url(' + views[currentIndex + 1].background + ')';
  nextBackground.css('background', nextImageUrl);
  nextBackground.css('background-position', 'center');
  nextBackground.css('background-repeat', 'no-repeat');
  nextBackground.css('background-size', 'cover');
  nextView.css('display', 'block');
  nextViewSet = true;
}

function transitionToNextView(activeScrollOffset) {
  adjustZindexes();
  setCurrentDisplayOpacity(activeScrollOffset/100);
  nextViewSet = false;
}

function adjustZindexes() {
  var currentView = $(currentViewId);
  var nextView = $(nextViewId);
  currentView.css('z-index', '1');
  nextView.css('z-index', '0');
}

function setCurrentDisplayOpacity(opacity) {
  var currentView = $(currentViewId);
  currentView.css('opacity', opacity);
}

setInterval(updateLoop, 1000/60);

$(document).ready(function() {

});
