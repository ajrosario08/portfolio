(function(module){
  var aboutController = {};

  aboutController.index = function(){
    $('.tab-content').hide();
    $('#about').show();
  };

  module.aboutController = aboutController;
})(window);
