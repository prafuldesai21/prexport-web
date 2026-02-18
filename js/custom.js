(function ($) {
  "use strict";

    // 1. COUNTER NUMBERS
    if (jQuery('.counter-thumb').length > 0) {
        jQuery('.counter-thumb').appear(function() {
            jQuery('.counter-number').countTo();
        });
    }
    
    // 2. SMOOTH SCROLL & AUTO-CLOSE
    $('.smoothscroll, .nav-link.click-scroll').click(function(e){
        var el = $(this).attr('href');
        
        // Ensure it's an internal link
        if (el && el.startsWith('#')) {
            var elWrapped = $(el);
            var header_height = $('.navbar').height();

            // Perform Scroll
            var offsetTop = elWrapped.offset().top;
            var totalScroll = offsetTop - header_height;

            $('body,html').animate({
                scrollTop: totalScroll
            }, 300);

            // MOBILE FIX: Close the navbar menu after clicking a link
            var navCollapse = document.getElementById('navbarNav');
            // Check if menu is currently open
            if (navCollapse.classList.contains('show')) {
                // Use Native Bootstrap 5 API to close
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (!bsCollapse) {
                    bsCollapse = new bootstrap.Collapse(navCollapse);
                }
                bsCollapse.hide();
            }

            return false;
        }
    });
    
})(window.jQuery);
