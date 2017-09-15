$('.login').on('click',function(){
  $.ajax({
    type: 'post',
    url: '/api/admin/login',
    dataType: 'json',
    data: {
          username: $('#uesrname').val(),
          password: $('#psd').val()
    },
    success:function(data){
          if(data){
                if(data.status == 0){
                      window.location.href = '/admin/';
                }else{
                      $('.modal-body p').html(data.data.info);
                      $('.layer').modal();
                }
          }else{
                $('.modal-body p').html(data.data.info);
                $('.layer').modal();
          }
    }
  })
})