$('.logout').on('click',function(){
        $.ajax({
                type: 'get',
                url: '/api/user/logout',
                data: {},
                success: function(data){
                        if(data.status === 0){
                                $('.modal-body p').html(data.data.info);
                                $('.layer').modal();
                                setTimeout(function() {
                                        window.location.reload();
                                  }, 1000);
                        }else{
                                alert("退出失败！");
                        }
                }
        })
})