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
      console.log($windowSize);
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
(function(module){

  function Project (opts) {
    for (key in opts) this[key] = opts[key];
  }

  Project.all = [];

  Project.prototype.toHtml = function (template) {
    var template = Handlebars.compile((template).html());
    return template(this);
  };

  Project.loadAll = function(dataWePassIn) {
    Project.all = dataWePassIn.map(function(ele){
      return new Project(ele);
    });
  };

  Project.fetchAll = function(next) {
    if (localStorage.portfolioProjects) {
      $.ajax({
        type: 'HEAD',
        url: 'data/portfolioProjects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll(next);
          } else {
            Project.loadAll(JSON.parse(localStorage.portfolioProjects));
            next();
          }
        }
      });
    } else {
      Project.getAll(next);
    }
  };

  Project.getAll = function(next) {
    $.getJSON('data/portfolioProjects.json', function(data) {
      Project.loadAll(data);
      localStorage.setItem('portfolioProjects', JSON.stringify(data));
      next();
    });

  };

  module.Project = Project;
})(window);
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
              t.slice(0,minimizeCharacterCount )+'<span>... </span><a href="#" class="read-more">Read more</a>'+
              '<span class="less">'+ t.slice(minimizeCharacterCount ,t.length)+' <a href="#" class="read-less">Read less</a></span>'
          );
    });

    $('a.read-more', minimizedElements).click(function(event){
      event.preventDefault();
      $(this).hide().prev().hide();
      $(this).next().show();
    });

    $('a.read-less', minimizedElements).click(function(event){
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
