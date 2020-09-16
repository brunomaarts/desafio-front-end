$(function() {
  
  $("#burger").on('click', function() {
    $("#navbar, #blackshadow").addClass('active');
  });

  $("#blackshadow").on('click', function() {
    $(this).removeClass("active");
    $("#navbar").removeClass('active');
  });

  $(".submenu > a").on('click', function(e) {
    e.preventDefault()
    $(this).next('ul').toggleClass('active');

  });

});