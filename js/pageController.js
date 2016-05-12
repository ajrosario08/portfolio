var pageViewController = {};

pageViewController.toggleMoblieMenu = function() {
  $('#pageHeader i').on('click', function(){

    if ($('#pageHeader nav').css('display') === 'none') {
      $('#pageHeader nav').show();
    } else {
      $('#pageHeader nav').hide();
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
