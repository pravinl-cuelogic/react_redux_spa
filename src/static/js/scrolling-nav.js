(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('.js-scroll-trigger').bind('touchend click',function() {
    $('#navbarSupportedContent > ul > li').removeClass("active");
    $(this).parent().addClass("active");
    $("body").removeClass("opacity-body");
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      console.log(target)
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 110)
        }, 1000, "easeInOutExpo");
        
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  // $('.js-scroll-trigger').click(function() {
  //   $('.navbar-collapse').collapse('hide');
  // });
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 80) {
        $('header').addClass("fixed-header");
    } else {
      $('header').removeClass("fixed-header");
      
    }
});
$(".menu-btn").click(function(){
    $("body").toggleClass("opacity-body");
});

// $(".nav-link").click(function(){
//   $("body").toggleClass("opacity-body");
// });
  // Activate scrollspy to add active class to navbar items on scroll
  // $('body').scrollspy({
  //   target: '#mainNav',
  //   offset: 100
  // });

})(jQuery); // End of use strict
