var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.author = opts.author;
  this.created = opts.created;
  this.description = opts.description;
  this.link = opts.link;
}

Project.prototype.toHtml = function () {
  var $newProject = $('article.template').clone();

  $newProject.find('h1').text(this.title);
  $newProject.find('span').text(this.author);
  $newProject.find('time').text(this.created);
  $newProject.find('section.project-description').html(this.description);
  $newProject.find('a').attr('href', this.link);

  $newProject.removeClass('template');

  return $newProject;
};

localProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
