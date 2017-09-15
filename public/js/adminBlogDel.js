$('.del').on('click', function(){
 // console.log($(this).attr('dataId'));

  $.ajax({
    type: 'get',
    url: '/api/admin/delete?id='+$(this).attr('dataId'),
    data: {},
    dataType: 'json',
    success: function(data){
      if(data.status == 0){
        $('.modal-body p').html(data.data.info);
        $('.layer').modal();
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }else{
        $('.modal-body p').html(data.data.info);
        $('.layer').modal();
      }
    }
  })
})