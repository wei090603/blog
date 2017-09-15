$('.del').on('click', function(){
  let id = $(this).parents('tr').find('.userid').text();
  $.ajax({
    type: 'post',
    url: '/api/admin/userdelete',
    data: {id:id},
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