function Project (opts) {
  for (key in opts) this[key] = opts[key];
}

Project.all = [];

Project.prototype.toHtml = function (template) {
  var template = Handlebars.compile($(template).html());
  return template(this);
};

localProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
