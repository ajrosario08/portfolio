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
