function Project (opts) {
  for (key in opts) this[key] = opts[key];
}

Project.all = [];

Project.prototype.toHtml = function (template) {
  var template = Handlebars.compile($(template).html());
  return template(this);
};

Project.loadAll = function(dataWePassIn) {
  dataWePassIn.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};
