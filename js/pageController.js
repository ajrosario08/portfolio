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

$(function(){
  pageViewController.toggleMoblieMenu();
});
