// Ajax requests for svg-sprites loading

$(function() {
  $.ajax({
    url: '/img/sprite.svg',
    dataType : 'html',
    success: function(svg) {
      $('body').prepend(svg);
      alert('test sprite');
    },
  });
});

$(function() {
  $.ajax({
    url: '/img/svg_text.svg',
    dataType : 'html',
    success: function(svg) {
      $('.title').prepend(svg);
      alert('test text');
    },
  });
});


// Image change on hover (used due to vector gradient)

$(function() {
  var $aboutMe__link = $('.bigButton');
  $aboutMe__link.hover(
    function() {
      $aboutMe__link.find('use').attr('xlink:href', '#arrowWhite');
  }, 
    function() {
      $aboutMe__link.find('use').attr('xlink:href', '#arrow');
  });
});


// Smooth scroll to anchors

$(function() {
  $('a[href^="#"]:not(a[href="#"])').click(function(e) { 
  var $element = $('.' + $(this).attr('href').substr(1));
  $('html, body').animate({ scrollTop: $element.offset().top - 25}, 500);
  e.preventDefault();
  });
});