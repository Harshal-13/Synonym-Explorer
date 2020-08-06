 !(function ($) {
   "use strict";
   if ($('.typed').length) {
     var typed_strings = $(".typed").data('typed-items');
     typed_strings = typed_strings.split(',')
     new Typed('.typed', {
       strings: typed_strings,
       loop: true,
       typeSpeed: 50,
       backSpeed: 10,
       backDelay: 2000
     });
   } // Activate smooth scroll on page load with hash links in the url
 })(jQuery);