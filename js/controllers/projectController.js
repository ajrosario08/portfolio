(function(module){
  var projectsController = {};

  projectsController.index = function(){

    if ($('#projects article').length === 0) {
      Project.fetchAll(projectsView.initIndexPage);
    }

    $('.tab-content').hide();
    $('#projects').show();
  };

  module.projectsController = projectsController;
})(window);
