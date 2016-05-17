(function(module){
  var projectsView = {};

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

  projectsView.initIndexPage = function() {
    Project.all.forEach(function(a){
      if($('#projects-filters option:contains("'+ a.category + '")').length === 0) {
        $('#type-filter').append(a.toHtml($('#type-filter-template')));
      };
      $('#projects').append(a.toHtml($('#project-template')));

    });
    projectsView.handleMainNav();
    projectsView.handleProjectsFilter();
    projectsView.handleTruncatedDescription();
  };

  module.projectsView = projectsView;
})(window);
