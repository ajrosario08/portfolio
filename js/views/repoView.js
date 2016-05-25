(function(module){
  var repoView = {};

  var ui = function() {
    var $github = $('#github');

    $github.find('ul').empty();
    $github.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();
    $('#github ul').append(repos.with('name').map(render));

  };

  module.repoView = repoView;
})(window);
