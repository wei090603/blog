$('.login').on('click',function(){
      $.ajax({
            type: 'post',
            url: '/api/user/login',
            dataType: 'json',
            data: {
                  username: $('#uesrname').val(),
                  password: $('#psd').val()
            },
            success:function(data){
                  if(data){
                        if(data.status == 0){
                              $('.modal-body p').html(data.data.info);
                              $('.layer').modal();
                              setTimeout(function() {
                                    window.location.href = '/';
                              }, 1000);
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
