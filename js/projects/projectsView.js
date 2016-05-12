var projectsView = {};

projectsView.populateProjectsFilter = function() {
  $('article').each(function() {
    var val = $(this).attr('data-type');
    var optionTag = '<option value="' + val + '">' + val + '</option>';

    if ($('#type-filter option[value="' + val + '"]').length === 0) {
      $('#type-filter').append(optionTag);
    }
  });
};

projectsView.handleProjectsFilter = function() {
  $('#type-filter').on('change', function(){
    var $projects = $('article');
    var $value = $(this).val();
    if ($value === 'show-all') {
      $projects.show();
    } else if ($value) {
      $projects.hide();
      $projects.each(function(){
        if ($(this).data('type') === $value) {
          $(this).show();
        }
      });
    } else {
      $projects.show();
    }
    $('#type-filter').val('');
  });
};

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

$(function(){
  projectsView.handleMainNav();
  projectsView.populateProjectsFilter();
  projectsView.handleProjectsFilter();
});
