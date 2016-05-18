(function(module){
  var pageViewController = {};

  pageViewController.toggleMoblieMenu = function() {
    $('#pageHeader i').on('click', function(){
      if ($('#wrapper').css('right') === '240px' ) {
        $('#wrapper').css('right', 0);
        $('#page-nav').css('right', '-240px');
      } else {
        $('#wrapper').css('right', '240px');
        $('#page-nav').css('right', '0');
      }
    });
  };

  pageViewController.toggleProjectsFilter = function() {
    $('#show-filters').on('click',function(){
      if ($(this).text() === 'Show filter') {
        $('#projects-filters ul').show();
        $(this).text('Hide filter');
      } else {
        $('#projects-filters ul').hide();
        $(this).text('Show filter');
      }
    });
  };

  pageViewController.windowResize = function(){
    $(window).resize(function(){
      $windowSize = $(window).width();
      if ($windowSize >= 640) {
        if ($(wrapper).css('right') === '240px' ){
          $('#pageHeader i').click();
        }
      }
    });
  };

  $(function(){
    pageViewController.toggleMoblieMenu();
    pageViewController.toggleProjectsFilter();
    pageViewController.windowResize();
  });

  module.pageViewController = pageViewController;
})(window);
