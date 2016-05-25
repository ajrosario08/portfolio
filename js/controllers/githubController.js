(function(module){
  var githubController = {};

  githubController.index = function() {

    repos.requestRepos(repoView.index);

    $('.tab-content').hide();
    $('#github').show();
  };

  module.githubController = githubController;
})(window);
