var currentViewObject = {
	viewId: '#view-1',
	backgroundId: '#background-1',
	overlayId: '#overlay-1',
	textElementId: '#text-1',
	index: 0
};
var nextViewObject = {
	viewId: '#view-2',
	backgroundId: '#background-2',
	overlayId: '#overlay-2',
	textElementId: '#text-2',
	index: 0
};

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
		// 'height': '100vh'
	};
	$('.scroll').css(scrollStyles);
}

function placeScrollStops() {

	for(var i = 0; i < viewOptions.length; i++) {
		var stop = $(document.createElement('div'));
		var color = '#' + (i*30) + (i*30) + (i*30);
		stop.css('height', '300vh');
		stop.css('position', 'relative');
		// stop.css('background-color', color);
		stop.addClass('scrollStop-' + i);
		$('.scroll').append(stop);
	}
}

function createViews() {
	viewOptions.reverse();
	for (var i = 0; i < viewOptions.length; i++) {
		var viewWrapper = $(document.createElement('div'));
		var viewBackground = $(document.createElement('div'));
		var overlay = $(document.createElement('div'));
		var overlayText = $(document.createElement('h3'));
		viewWrapper.css({
			'z-index': i,
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
			'padding': '20px',
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
		// nextView.css('display', 'block');
		overlay.append(overlayText);
		viewBackground.append(overlay);
		viewWrapper.append(viewBackground);
		$('body').append(viewWrapper);
	}
}

function updateLoop() {

}

function getCurrentScrollPosition() {

}

setup();
