//发送以后后台接收  apiRouter
$(function(){

let onOff1 = false;
let onOff2 = false;
let onOff3 = false;
let onOff4 = false;

 $('#uesrname').blur(function(){
      let username = $('#uesrname').val();
      if(/^[0-9A-Za-z_]{6,20}$/.test(username)){
             $(this).parents('.form-group').find('.error').html(' ');
             onOff1 = true;
      }else if(username.length == ''){
            $(this).parents('.form-group').find('.error').html(' ');
      }else{
             $(this).parents('.form-group').find('.error').html('账户只能为数字字母下划线开头').css('color', 'red');
       }
 });

$('#psd').blur(function() {
      let password = $('#psd').val();
      if(/^.{6,20}$/.test(password)){
            $(this).parents('.form-group').find('.error').html(' ');
            onOff2 = true;
      }else if(password.length == ''){
             $(this).parents('.form-group').find('.error').html(' ');
      }else{
            $(this).parents('.form-group').find('.error').html('密码长度只能在6-20位字符之间').css('color', 'red');
      }
});

$('#psd1').blur(function(){
      let password1 = $('#psd1').val();
      if(password1 == $('#psd').val()){
            $(this).parents('.form-group').find('.error').html(' ');
            onOff3 = true;
      }else if(password1.length == ''){
            $(this).parents('.form-group').find('.error').html(' ');
      }else{
            $(this).parents('.form-group').find('.error').html('两次密码输入不一致').css('color', 'red');
      }
});

$('#tel').blur(function(){
      let tel = $('#tel').val();
      if(/^1((3[0-9])|(4[5-7])|(5[0-3])|(7[0-9])|(8[0-9]))\d{8}$/.test(tel)){
            $(this).parents('.form-group').find('.error').html(' ');
            onOff4 = true;
      }else{
             $(this).parents('.form-group').find('.error').html('手机格式不正确').css('color', 'red');
      }
})

$('.register').on('click',function(){
      if(onOff1 && onOff2 && onOff3 && onOff4){
            $.ajax({
                  type: 'post',
                  url: '/api/user/register',
                  dataType: 'json',
                  data: {
                        username: $('#uesrname').val(),
                        password: $('#psd').val(),
                        password1: $('#psd1').val(),
                        tel: $('#tel').val()
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
      }else{
           $('.modal-body p').html("输入信息有误,请检查输入信息！");
            $('.layer').modal(); 
      }
})

})