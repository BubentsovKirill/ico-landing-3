var Layout = function(){

    var initialHeightTopBlock = function(){
      var height = $(window).height();
      if($(window).width() > 767){
		 $('#top-block-desktop').css({
	        'minHeight': 0,
	        'maxHeight': 'none',
	        'height': height - 90
	      });
      }
      else if($(window).width() <= 767){
		  $('#top-block-mobile').css({
	        'minHeight': 0,
	        'maxHeight': 'none',
	        'height': height
	      });
      }
   
    }

    var fixedDesktopHeader = function(){
 		var header = $('#desktop-header'); 
     	var topBlockHeight = $('#top-block-desktop').height();
     	var desktopLogo = $('#logo-deskotop-navigation img');
      var aboutBlock = $('#about');
     	$(window).bind('scroll', function() {
     		if($(window).width() > 767){
     			if ($(window).scrollTop() > topBlockHeight + 20){
       			header.css('position', 'fixed');
       			desktopLogo.css('display', 'block');
           aboutBlock.css('padding', '190px 0px 100px 0px');
	     		}else{
	     			header.css('position', 'static');
	     			desktopLogo.css('display', 'none');
            aboutBlock.css('padding', '100px 0px 100px 0px');
	     		}
     		}
     		else if($(window).width() < 767){
     			
     		}
     		
     	})
    }

     var mobileMenuButton = function(){
      $(".menu-trigger, .navigation").click(function(){
        $("#mobile-menu").toggleClass('show-mobile-menu');
      })
      $(".menu-trigger, .navigation").click(function(){
      
        $(".top-menu").toggleClass('top-animate');
        $(".mid-menu").toggleClass('mid-animate');
        $(".bottom-menu").toggleClass('bottom-animate');
      });
      $(".menu-trigger, .navigation").on('click', function(){
          $('body').toggleClass('over-active');
      })
    }

    var openMobileMenu = function(){
    	var mobileMenu = $('#mobile-menu');
    	var button = $(".menu-trigger");
    	var body = $('body');
    	button.on('click', function(event){
			event.preventDefault();
			mobileMenu.toggleClass('open');
			body.toggleClass('overlay');
    	})
    }

    var conters = function(){
      $('.count-block').viewportChecker({
        callbackFunction: function(elem, action){
          $('.timer').countTo();
        },
      });
    }

    var colorBoxgallery = function(){
      $('#strategy a').simpleLightbox();
    }

    var newsSlider = function(){
      $(document).ready(function(){
        $(".owl-carousel").owlCarousel({
          loop:true,
          margin:10,
          nav: true,
          responsive:{
            0:{
              items: 1
            },
              700:{
                  items:2
              },
              900:{
                  items:3
              },
              1000:{
                  items:4
              }
          }
        });
        var owl = $('.owl-carousel');
        owl.owlCarousel();
        $(".slider-nav .prev").click(function() {
            owl.trigger('prev.owl.carousel');
        });
        $(".slider-nav .next").click(function() {
            owl.trigger('next.owl.carousel');
        });
      });
    }

    var scrollPage = function(){
          var menu = $('#mobile-menu');
          var button = $(".menu-trigger");
          $("#desktop-header, #mobile-menu").on("click","a", function (event) {
            menu.removeClass('open');
            $(".top-menu").removeClass('top-animate');
            $(".mid-menu").removeClass('mid-animate');
            $(".bottom-menu").removeClass('bottom-animate');
             $('body').removeClass('overlay');
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top - 50;
            $('body, html').animate({scrollTop: top},1000);
        });
    }

	return {
     initScrollPage: function(){
        scrollPage()
     },
     initNewsSlider : function(){
        newsSlider();
     },
     initColorBoxgallery : function(){
        colorBoxgallery();
     },
		 initMobileMenuButton: function(){
		 	mobileMenuButton();
		 },
		 initInitialHeightTopBlock: function(){
		 	initialHeightTopBlock();
		 },
		 initFixedDesktopHeader: function(){
			fixedDesktopHeader()
		 },
		 initOpenMobileMenu: function(){
		 	openMobileMenu();
		 },
     initConters: function(){
        conters();
     },
		 init: function(){
      this.initScrollPage();
      this.initNewsSlider();
      this.initColorBoxgallery();
      this.initConters();
		 	this.initOpenMobileMenu();
 			this.initInitialHeightTopBlock();
 			this.initFixedDesktopHeader();
 			this.initMobileMenuButton();
        }
	}
}()