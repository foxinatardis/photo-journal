var currentViewIndex = 0;
var views = [];

var viewOptions = [
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

function setup() {
	setScrollDiv();
	placeScrollStops();
	createViews();
}

function setScrollDiv() {
	var scrollStyles = {
		'position': 'relative',
		'z-index': viewOptions.length * 10,
	};
	var scrollDiv = $(document.createElement('div'));
	scrollDiv.css(scrollStyles);
	scrollDiv.addClass('scroll');
	$('body').append(scrollDiv);
}

function placeScrollStops() {

	for(var i = 0; i < viewOptions.length + 1; i++) {
		var stop = $(document.createElement('div'));
		stop.css('height', '300vh');
		stop.css('position', 'relative');
		stop.addClass('scrollStop-' + i);
		$('.scroll').append(stop);
	}
}

function createViews() {
	for (var i = 0; i < viewOptions.length; i++) {
		var view;
		var viewWrapper = $(document.createElement('div'));
		var viewBackground = $(document.createElement('div'));
		var overlay = $(document.createElement('div'));
		var overlayText = $(document.createElement('p'));
		viewWrapper.css({
			'z-index': viewOptions.length - i,
			'position': 'fixed',
			'top': 0,
			'width': '100%',
			'display': 'block',
			'opacity': 1
		});
		if(viewOptions[i].backgroundStyles) viewBackground.css(viewOptions[i].backgroundStyles);
		viewBackground.css({
			'position': 'relative',
			'height': '100vh',
			'background': viewOptions[i].backgroundUrl,
			'background-position': 'center',
			'background-repeat': 'no-repeat',
			'background-size': 'cover',
		});
		overlay.css({
			'background-color': '#eee',
			'border-radius': '5px',
			'padding': '5vh 5vw',
			'max-width': '50vw',
			'left': '5vw',
			'box-shadow': '0 0 10px #111'
		});
		if(viewOptions[i].overlayStyles) overlay.css(viewOptions[i].overlayStyles);
		overlay.css({
			'max-height': '90vh',
			'position': 'absolute',
			'top': '100vh'
		});
		overlayText.text(viewOptions[i].overlayText);
		if(viewOptions[i].overlayTextStyles) overlayText.css(viewOptions[i].overlayTextStyles);
		overlay.append(overlayText);
		viewBackground.append(overlay);
		viewWrapper.append(viewBackground);
		$('body').append(viewWrapper);
		view = {
			viewWrapper: viewWrapper,
			viewBackground: viewBackground,
			overlay: overlay,
			overlayText: overlayText,
			scrollStop: $('.scrollStop-' + (i + 1))
		};
		views.push(view);
	}
}

function updateLoop() {
	var scrollStopOffsetTop = views[currentViewIndex].scrollStop.offset().top;
	var scrollStopHeight = views[currentViewIndex].scrollStop.height();
	var overlay = views[currentViewIndex].overlay;
	var viewWrapper = views[currentViewIndex].viewWrapper;
	var overlayHeight = overlay.height();
	var windowHeight = $(window).height();
	var heightToScrollOverlay = overlayHeight + windowHeight;
	var scrollPercentageFromTop = scrollStopOffsetTop / scrollStopHeight;

	var newOverlayTopOffset = heightToScrollOverlay - (windowHeight * (1 - scrollPercentageFromTop) * 1.3);

	overlay.css('top', newOverlayTopOffset);

	if(scrollPercentageFromTop > 0.9 && currentViewIndex > 0) {

		currentViewIndex--;

	} else if (scrollPercentageFromTop > 0.1) {

		viewWrapper.css('opacity', '1');

	} else if(scrollPercentageFromTop < 0.1 && scrollPercentageFromTop >= 0 && currentViewIndex < views.length - 1) {

		viewWrapper.css('opacity', (scrollPercentageFromTop * 10));

	} else if (scrollPercentageFromTop < 0 && currentViewIndex < views.length - 1) {

		viewWrapper.css('opacity', '0');
		currentViewIndex++;
	}

}

setup();
setInterval(updateLoop, 1000/60);
