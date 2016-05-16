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
var localProjects = [
  {
    title: 'CodeStainz Notes',
    author: 'Anthony Rosario',
    created: 'Apr 7, 2016',
    image: 'img/codeStainzNotes.png',
    imageAlt: 'Code Stainz Notes',
    type: 'Web',
    link: 'https://github.com/ajrosario08/codeStainzNotes',
    description: '<p>This project was a simple notes applicaton. It makes use of HTML, CSS, Javascript, LocalStorage, and JSON.  This application uses a html form to collect notes from the user and display them on screen.  The notes are then saved in local storage and they are retrievable even after the browser has been closed.</p>'
  },
  {
    title: 'Ruby Portfolio',
    author: 'Anthony Rosario',
    created: 'Mar 7, 2016',
    image: 'img/portfolioSite.png',
    imageAlt: 'Portfolio Site',
    type: 'Rails',
    link: 'https://github.com/ajrosario08/rails-portfolio',
    description: '<p>This project was my first portfolio site.  It was created in the rails environment.  This project demonstrates the use of MVC: Model, View, Controller.  The site has a database for previous projects and blog post which is iterated through by the controller and displayed by the view.</p>'
  },
  {
    title: 'Psychologist App',
    author: 'Anthony Rosario',
    created: 'Nov 2, 2015',
    image: 'img/iosApp.png',
    imageAlt: 'iOS App',
    type: 'iOS',
    link: 'https://github.com/ajrosario08/Psychologist',
    description: '<p>This app was built by following along on the itunesU class Stanford cs193p lecture 7. The Psychologist app takes a previously build application and embeds it into a splitView controller as its detail view. This app demonstrates the use of multiple MVC and segues. The MVC\'s are embedded in navigation controllers inside of split view controllers. This will allow the app to be able to run on both the iphone and the ipad.</p>'
  }
];
var projects = [];

function Project (opts) {
  for (key in opts) this[key] = opts[key];
}

Project.prototype.toHtml = function () {
  var template = $('#project-template').html();
  var source = Handlebars.compile(template);
  return source(this);
};

localProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
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
