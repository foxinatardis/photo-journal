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
		var view = {
			viewWrapper: createViewWrapper(viewOptions[i], viewOptions.length - i),
			viewBackground: createViewBackground(viewOptions[i]),
			overlay: createOverlay(viewOptions[i]),
			overlayText: createOverlayText(viewOptions[i]),
			scrollStop: $('.scrollStop-' + (i + 1))
		};
		view.overlay.append(view.overlayText);
		view.viewBackground.append(view.overlay);
		view.viewWrapper.append(view.viewBackground);
		$('body').append(view.viewWrapper);
		views.push(view);
	}
}

function createViewWrapper(viewOptions, index) {
	var viewWrapper = $(document.createElement('div'));
	viewWrapper.css({
		'z-index': index,
		'position': 'fixed',
		'top': 0,
		'width': '100%',
		'display': 'block',
		'opacity': 1
	});
	return viewWrapper;
}

function createViewBackground(viewOptions) {
	var viewBackground = $(document.createElement('div'));
	if(viewOptions.backgroundStyles) viewBackground.css(viewOptions.backgroundStyles);
	viewBackground.css({
		'position': 'relative',
		'height': '100vh',
		'background': viewOptions.backgroundUrl,
		'background-position': 'center',
		'background-repeat': 'no-repeat',
		'background-size': '100%',
	});
	return viewBackground;
}

function createOverlay(viewOptions) {
	var overlay = $(document.createElement('div'));
	overlay.css({
		'background-color': '#eee',
		'border-radius': '5px',
		'padding': '5vh 5vw',
		'max-width': '50vw',
		'left': '5vw',
		'box-shadow': '0 0 10px #111',
		'opacity': '0.8'
	});
	if(viewOptions.overlayStyles) overlay.css(viewOptions.overlayStyles);
	overlay.css({
		'max-height': '90vh',
		'position': 'absolute',
		'top': '100vh'
	});
	return overlay;
}

function createOverlayText(viewOptions) {
	var overlayText = $(document.createElement('p'));
	overlayText.text(viewOptions.overlayText);
	if(viewOptions.overlayTextStyles) overlayText.css(viewOptions.overlayTextStyles);
	return overlayText;
}

function updateLoop() {
	var scrollStopOffsetTop = views[currentViewIndex].scrollStop.offset().top;
	var scrollStopHeight = views[currentViewIndex].scrollStop.height();
	var overlay = views[currentViewIndex].overlay;

	var viewBackground = views[currentViewIndex].viewBackground;

	var viewWrapper = views[currentViewIndex].viewWrapper;
	var overlayHeight = overlay.height();
	var windowHeight = $(window).height();
	var heightToScrollOverlay = overlayHeight + windowHeight;
	var scrollPercentageFromTop = scrollStopOffsetTop / scrollStopHeight;

	var newOverlayTopOffset = heightToScrollOverlay - (windowHeight * (1 - scrollPercentageFromTop) * 1.3);

	overlay.css('top', newOverlayTopOffset);

	// if(scrollPercentageFromTop > 0) viewBackground.css('transform', 'scale(' + (1 + ((1 - scrollPercentageFromTop))) + ')');

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
