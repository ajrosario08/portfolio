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

projectsView.handleTruncatedDescription = function() {
  var minimizedElements = $('.project-description p');
  console.log(minimizedElements);
  var minimizeCharacterCount = 100;

  minimizedElements.each(function(){
    var t = $(this).text();
    if(t.length < minimizeCharacterCount ) return;

    $(this).html(
            t.slice(0,minimizeCharacterCount )+'<span>... </span><a href="#" class="more">More</a>'+
            '<span class="less">'+ t.slice(minimizeCharacterCount ,t.length)+' <a href="#" class="less">Less</a></span>'
        );
  });

  $('a.more', minimizedElements).click(function(event){
    event.preventDefault();
    $(this).hide().prev().hide();
    $(this).next().show();
  });

  $('a.less', minimizedElements).click(function(event){
    event.preventDefault();
    $(this).parent().hide().prev().show().prev().show();
  });
};

$(function(){
  projectsView.handleMainNav();
  projectsView.populateProjectsFilter();
  projectsView.handleProjectsFilter();
  projectsView.handleTruncatedDescription();
});
