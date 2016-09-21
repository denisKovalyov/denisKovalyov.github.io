// Tabs toggle

$(function () {
	$('.tabs__link').click(function(e) {
		$('.tabs__link').removeClass('active');
		$(e.currentTarget).addClass('active');
		
		$('.tabs__content').removeClass('shown');
		$('.tabs__content').eq($('li').index(this.parentElement)).addClass('shown');
		
		
		e.preventDefault();
	});
});


