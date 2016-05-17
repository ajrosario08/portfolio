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
function Project (opts) {
  for (key in opts) this[key] = opts[key];
}

Project.all = [];

Project.prototype.toHtml = function (template) {
  var template = Handlebars.compile((template).html());
  return template(this);
};

Project.loadAll = function(dataWePassIn) {
  dataWePassIn.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if (localStorage.portfolioProjects) {
    Project.processData(JSON.parse(localStorage.portfolioProjects));
  } else {
    $.getJSON('data/portfolioProjects.json', function(data) {
      Project.processData(data);
    });
  }
};

Project.processData = function(data) {
  Project.loadAll(data);
  localStorage.setItem('portfolioProjects', JSON.stringify(data));
  projectsView.initIndexPage();
};
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
