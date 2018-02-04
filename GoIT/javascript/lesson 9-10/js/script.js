$(function () {
	// Carousel initializtion
    var slider = $('.jcarousel').jcarousel({
        // Configuration goes here
        wrap: 'both',
    }).jcarouselAutoscroll({
		interval: 2000,
		target: '+=1',
		autostart: true
	});

	// Set correct slide width
	setWidth();
	window.addEventListener('resize', setWidth);

	function setWidth() {
		$('.jcarousel li').css({'width': document.documentElement.clientWidth + 'px'});
	};

    $('.jcarousel-prev').click(function() {
    	$('.jcarousel').jcarousel('scroll', '-=1');
	});

	$('.jcarousel-next').click(function() {
	    $('.jcarousel').jcarousel('scroll', '+=1');
	});

	// jQuery Selectric plugin
	var customSelect = $('select').selectric({
		optionsItemBuilder: function(itemData) {
			return itemData.element.val().length ? '<span class="pic pic-' + itemData.index +  '"></span>' + itemData.text : itemData.text;
		},
		labelBuilder: function(currItem) {
			return currItem.element.val().length ? '<span class="pic pic-' + currItem.index +  '"></span>' + currItem.text : currItem.text;
		},
		onChange: function(element) {
   			$('.jcarousel').jcarousel('scroll', element.value - 1);
  		},
	});

	var selectItems = $('[name="choose_best"] option');
	var checkboxs =	$('[type="checkbox"]');

	checkboxs.each((i, item) => {
		if (!item.checked) {
			selectItems.eq(i).attr('disabled', true);
			customSelect.selectric('refresh');
		}
	})

	checkboxs.on('change', function(e) {
		var currentItem = (this.id[this.id.length - 1]) - 1;

		if (this.checked) {
			// Enable item in custom select element
			selectItems.eq(currentItem).attr('disabled', false);
			customSelect.attr('disabled', false)
			customSelect.selectric('refresh');
		} else {
			selectItems.eq(currentItem).attr('disabled', true);
			if ($('[name="choose_best"] option[disabled]').length == selectItems.length) customSelect.attr('disabled', true);
			customSelect.selectric('refresh');
		}
	});

});