$('#pageHeader i').on('click', function(){

  if ($('#pageHeader nav').css('display') === 'none') {
    $('#pageHeader nav').show();
  } else {
    $('#pageHeader nav').hide();
  }
});

$('#pageHeader nav').on('click', 'li', function(){
  var $value = $(this).attr('data-content');
  if (!($(this).find('a').text() === 'Github')) {
    $('.tab-content').hide();
    $('.tab-content').each(function(){
      if($(this).attr('id') === $value){
        $(this).show();
      }
    });
  }
});
