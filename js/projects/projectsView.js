var projectsView = {};

projectsView.handleMainNav = function() {

  $('#pageHeader nav').on('click', 'li', function(){
    var $value = $(this).attr('data-content');
    if (!($(this).find('a').text() === 'Github')) {
      $('.tab-content').hide();
      $('.tab-content').each(function(){
        if($(this).attr('id') === $value){
          $(this).show();
        }
      });
    }
  });

};

$(document).ready(function(){
  projectsView.handleMainNav();
});
