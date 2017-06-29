$(function () {
	// Carousel initializtion
    $('.jcarousel').jcarousel({
        // Configuration goes here
        wrap: 'both',
    }).jcarouselAutoscroll({
		interval: 2000,
		target: '+=1',
		autostart: true
	});

    $('.jcarousel-prev').click(function() {
    	$('.jcarousel').jcarousel('scroll', '-=1');
	});

	$('.jcarousel-next').click(function() {
	    $('.jcarousel').jcarousel('scroll', '+=1');
	});

});