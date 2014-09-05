;(function ($) {
  Drupal.behaviors.mediaBrowserOverrideSkipViewMode = {
    attach: function (context, settings) {
      $('.fake-ok').click();
    }
  }
})(jQuery);