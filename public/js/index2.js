var currentViewIndex = 0;
var views = [];

var viewOptions = [
	{
		backgroundUrl: 'url(/images/background-1.jpg)',
		backgroundStyles: null,
		overlayText: [
			{
				textType: 'title',
				text: 'Here is some exciting text!!!'
			}
		],
		overlayTextStyles: null,
		overlayStyles: null,
		overlayOptions: {
			position: 'right',
			textAlign: 'right'
		}
	},
	{
		backgroundUrl: 'url(/images/background-2.jpg)',
		backgroundStyles: null,
		overlayText: [{
			text: 'Here is some more exciting text!!!',
			bold: true,
			italic: false,
			textAlign: 'center'
		}],
		overlayTextStyles: null,
		overlayStyles: null,
		overlayOptions: {
			position: 'center',
			textAlign: 'right'
		}
	},
	{
		backgroundUrl: 'url(/images/background-3.jpg)',
		backgroundStyles: null,
		overlayText: [
			{
				textType: 'title',
				text: 'Here is some boring text.',
				bold: false,
				italic: true,
				textAlign: 'right'
			},
			{
				textType: 'sub-title',
				text: 'Here is some even more boring text.',
				bold: true,
				italic: false,
				textAlign: 'left'
			},
			{
				textType: 'plain-title',
				text: 'And here is a description of just how incredibly boring the text is. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				bold: false,
				italic: false,
				textAlign: 'justify'
			}
		],
		overlayTextStyles: null,
		overlayStyles: null,
		overlayOptions: {
			position: 'left',
			textAlign: 'left'
		}
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
			viewWrapper: createFixedViewWrapper(viewOptions[i], viewOptions.length - i),
			relativeViewWrapper: createRelativeViewWrapper(),
			viewBackground: createViewBackground(viewOptions[i]),
			overlay: createOverlay(viewOptions[i]),
			overlayText: createOverlayText(viewOptions[i]),
			scrollStop: $('.scrollStop-' + (i + 1))
		};
		view.relativeViewWrapper.append(view.viewBackground);
		view.overlay.append(view.overlayText);
		view.relativeViewWrapper.append(view.overlay);
		view.viewWrapper.append(view.relativeViewWrapper);
		$('body').append(view.viewWrapper);
		views.push(view);
	}
}

function createFixedViewWrapper(viewOptions, index) {
	var fixedViewWrapper = $(document.createElement('div'));
	fixedViewWrapper.css({
		'z-index': index,
		'position': 'fixed',
		'top': 0,
		'width': '100%',
		'display': 'block',
		'opacity': 1
	});
	return fixedViewWrapper;
}

function createRelativeViewWrapper() {
	var relativeViewWrapper = $(document.createElement('div'));
	relativeViewWrapper.css({
		'position': 'relative'
	});
	return relativeViewWrapper;
}

function createViewBackground(viewOptions) {
	var viewBackground = $(document.createElement('div'));
	if(viewOptions.backgroundStyles) viewBackground.css(viewOptions.backgroundStyles);
	viewBackground.css({
		'position': 'absolute',
		'top': 0,
		'height': '100vh',
		'width': '100%',
		'background': viewOptions.backgroundUrl,
		'background-position': 'center',
		'background-repeat': 'no-repeat',
		'background-size': 'cover',
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
		'box-shadow': '0 0 10px #111',
		'opacity': '0.8'
	});
	if(viewOptions.overlayOptions) {
		var position = viewOptions.overlayOptions.position;
		var textAlign = viewOptions.overlayOptions.textAlign;
		if(position && position === 'right') {
			position = { 'right': '5vw' };
		} else if (position && position === 'center') {
			position = { 'right': '25vw', 'left': '25vw' };
		} else {
			position = { 'left': '5vw' };
		}
		if(textAlign) overlay.css('text-align', textAlign);
		overlay.css(position);
	}
	if(viewOptions.overlayStyles) overlay.css(viewOptions.overlayStyles);
	overlay.css({
		'max-height': '90vh',
		'position': 'absolute',
		'top': '100vh',
	});
	return overlay;
}

function createOverlayText(viewOptions) {
	var textWrapper = $(document.createElement('div'));
	if(viewOptions.overlayText.length > 0) {
		for(var i = 0; i < viewOptions.overlayText.length; i++) {
			var textElement = createTextElement(viewOptions.overlayText[i], viewOptions.overlayTextStyles);
			textWrapper.append(textElement);
		}
	}
	return textWrapper;
}

function createTextElement(textOptions, textStyles) {
	var elementType = textOptions.textType;
	var basicTextStyles = {
		'font-style': textOptions.italic ? 'italic' : 'normal',
		'font-weight': textOptions.bold ? 'bold' : 'normal',
		'text-align': textOptions.textAlign ? textOptions.textAlign : 'left'
	};
	var textElement;
	if (elementType === 'sub-title') {
		textElement = $(document.createElement('h3'));
	} else if (elementType === 'title') {
		textElement = $(document.createElement('h2'));
	} else {
		textElement = $(document.createElement('p'));
	}
	textElement.text(textOptions.text);
	textElement.css(basicTextStyles);
	if(textStyles) textElement.css(textStyles);
	return textElement;
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

	if(scrollPercentageFromTop > 0) viewBackground.css('transform', 'scale(' + Math.max(1 + ((1 - scrollPercentageFromTop) * 0.2), 1) + ')');

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
