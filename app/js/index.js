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
		  $('#top-block-desktop').css({
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
     	$(window).bind('scroll', function() {
     		if($(window).width() > 767){
     			if ($(window).scrollTop() > topBlockHeight){
     			header.css('position', 'fixed');
     			desktopLogo.css('display', 'block');
	     		}else{
	     			header.css('position', 'static');
	     			desktopLogo.css('display', 'none');
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

	return {
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
		 init: function(){
		 	this.initOpenMobileMenu();
 			this.initInitialHeightTopBlock();
 			this.initFixedDesktopHeader();
 			this.initMobileMenuButton();
        }
	}
}()