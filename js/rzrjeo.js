function preventScrollOnThisEl(selector) {
  $(selector)
    .bind("mousewheel DOMMouseScroll", function(e) {
      var scrollTo = null;

      if (e.type == "mousewheel") {
        scrollTo = e.originalEvent.wheelDelta * -1;
      } else if (e.type == "DOMMouseScroll") {
        scrollTo = 40 * e.originalEvent.detail;
      }

      if (scrollTo) {
        e.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
      }
    })
    .on("touchmove", function(e) {
      e.stopPropagation();
      e.preventDefault();
    });
}

preventScrollOnThisEl('.js-dont-scroll');

/*

Mouse: https://stackoverflow.com/a/7571867/142410
Touch: https://stackoverflow.com/a/25280715/142410 

*/
