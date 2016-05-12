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
