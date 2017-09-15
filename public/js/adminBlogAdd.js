$('.save').on('click', function(){
  let btnVal = $('.save').text();
  if(btnVal == '保存'){
    $.ajax({
      type: 'post',
      url: '/api/admin/blogadd',
      dataType: 'json',
      data: {
        title: $('#title').val(),
        description: $('#description').val(),
        content: $('#content').val()
      },
      success: function(data){
        if(data.status == 0){
          $('.modal-body p').html(data.data.info);
          $('.layer').modal();
          setTimeout(function() {
                  window.location.href = '/admin/bloglist';
            }, 1000);
        }else{
          $('.modal-body p').html(data.data.info);
          $('.layer').modal();
        }
      }
    })
  }else{
   let id = $(this).attr('dataId');
   $.ajax({
      type: 'post',
      url: '/api/admin/modify',
      dataType: 'json',
      data: {
        title: $('#title').val(),
        description: $('#description').val(),
        content: $('#content').val(),
        id:id
      },
      success: function(data){
        console.log(data);
        if(data.status == 0){
          $('.modal-body p').html(data.data.info);
          $('.layer').modal();
          setTimeout(function() {
                  window.location.href = '/admin/bloglist';
            }, 1000);
        }
      }
    })
  }
})