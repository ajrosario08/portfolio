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
