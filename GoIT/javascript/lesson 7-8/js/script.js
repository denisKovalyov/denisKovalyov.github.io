// Tabs toggle

$(function() {
	$('.tabs__link').click(function(e) {
		$('.tabs__link').removeClass('active');
		$(e.currentTarget).addClass('active');

		$('.tabs__paragraph').removeClass('shown');
		$('.tabs__paragraph').eq($('li').index(e.currentTarget.parentElement)).addClass('shown');
		
		e.preventDefault();
	});
});

// Show/hide form

$(function() {
	$('.showForm').click(function(e) {
		var state =$(this.parentElement).data('state');

		if (!(state) || state == 'hidden') {
            $(this.parentElement).data('state', 'shown');
            $(this.parentElement).animate({right: '0px'}, 'slow');
        } else {
            $(this.parentElement).data('state', 'hidden');
            $(this.parentElement).animate({right: '-455px'}, 'slow');
        }
		e.preventDefault();
	});
});

// Show/hide hints

$(function() {
	$('input[type="text"], input[type="email"]').hover(function() {
		
		switch ( $(this).attr('name')) {
			case 'firstname': 
				var text = 'Please, provide your firstname';
				break;
			case 'lastname': 
				var text = 'Please, provide also your lastname';
				break;
			case 'email': 
				var text = 'Please, enter your email';
				break;
		};

			$(this).parent().find('span').stop();
			$(this).parent().append('<span class="help">' + text + '</span>');
			$(this).next('span').animate({opacity: 1}, 'slow');
	}, function() {
		$(this).parent().find('span').stop();
		$(this).next('span').animate({opacity: 0}, 'fast', function() {
			$(this).parent().find('span').remove();
		});
	});
});

$(function() {
	$('.showHelp').click(function() {
		$('input[type="text"], input[type="email"').mouseover();
	});
});