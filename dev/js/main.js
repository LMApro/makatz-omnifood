$(document).ready(function() {
    
    $("#features").waypoint(function(direction){
        $("header nav").toggleClass("sticky");
    }, { offset: '64px' });
    
    
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top - 64
            }, 1000);
            return false;
          }
        }
      });
    
    $('.feature-list').waypoint(function() {
        $('.feature-list').addClass('animated fadeIn');
    }, { offset: "80%" });
    
    $('.city-list').waypoint(function() {
        $('.city-list').addClass('animated fadeInUp');
    }, { offset: "80%" });
    
    $('.plan-premium').waypoint(function() {
        $('.plan-premium').addClass('animated flash');
    }, { offset: "30%" });
    
    $('#contact-form').waypoint(function() {
        $('#contact-form').addClass('animated fadeInRight');
    }, { offset: "70%" });
    
    $('.iphone').waypoint(function() {
        $('.iphone').addClass('animated fadeInUp');
    }, { offset: "70%" });
    
    $("#toggle-mobile-nav").click(function() {
        var nav = $(".main-nav");
        nav.slideToggle(200);
        $('.mobile-nav-icon i').toggleClass('ion-navicon-round').toggleClass('ion-close-round');
    });
    
    
});