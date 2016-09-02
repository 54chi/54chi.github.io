/**
 * Main JS file for Bleakr+54 behaviours
 */


 function scaleVideoContainer() {

     var height = $(window).height() + 5;
     var unitHeight = parseInt(height) + 'px';
     $('.homepage-hero-module').css('height',unitHeight);

 }

 function initBannerVideoSize(element){

     $(element).each(function(){
         $(this).data('height', $(this).height());
         $(this).data('width', $(this).width());
     });

     scaleBannerVideoSize(element);

 }

 function scaleBannerVideoSize(element){

     var windowWidth = $(window).width(),
     windowHeight = $(window).height() + 5,
     videoWidth,
     videoHeight;

     var windowAspectRatio=windowHeight/windowWidth;

    console.log(windowAspectRatio);

     $(element).each(function(){
         var videoAspectRatio = $(this).data('height')/$(this).data('width');
         console.log(videoAspectRatio);

         videoWidth = windowWidth;
         videoHeight = windowHeight;

        if (videoAspectRatio<windowAspectRatio){
          //the video is higher than the screen...adjust the height
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});


        }else{
          videoHeight = videoWidth * videoAspectRatio;
        }

        console.log("h: "+ videoHeight);
        console.log("w: " + videoWidth);

        $(this).width(videoWidth).height(videoHeight);

         $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

     });
 }

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

      scaleVideoContainer();

      initBannerVideoSize('.video-container .poster img');
      initBannerVideoSize('.video-container .filter');
      initBannerVideoSize('.video-container video');

      $(window).on('resize', function() {
          scaleVideoContainer();
          scaleBannerVideoSize('.video-container .poster img');
          scaleBannerVideoSize('.video-container .filter');
          scaleBannerVideoSize('.video-container video');
      });


        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
