(function(module){
  var pageViewController = {};

  pageViewController.toggleMoblieMenu = function() {
    $('#pageHeader i').on('click', function(){
      if ($('#page-nav').css('left') === '-240px' ) {
        $('#page-nav').css('left', 0);
      } else {
        $('#page-nav').css('left', '-240px');
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

  $(function(){
    pageViewController.toggleMoblieMenu();
    pageViewController.toggleProjectsFilter();
  });

  module.pageViewController = pageViewController;
})(window);
