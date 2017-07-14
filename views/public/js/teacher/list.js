/**
 * Created by Administrator on 2017/7/12.
 */
define(['jquery','template','bootstrap'],function ($,template,bt){
     //跳转到这个页面的时候，要向服务器发送ajax请求，获取所有的讲师，渲染在当前页面上
  // 显示所有的讲师列表
    $.ajax({
      url:'/api/teacher',
      type:'get',
      success:function (info){
        if(info.code ==200){
          var htmlStr = template('tc_list_tpl',info);
          $('#tc_list_tBody').html(htmlStr);
        }
      }
    });

    //显示单独的某一个讲师的信息
    // $('#check-info').on('click',function (){
  //  模板里面的元素，相当于是动态创建出来的元素，直接注册事件不起作用
    //        alert(123);
    // })

  $('#tc_list_tBody').on('click','a.check-info',function (){
         // alert(123);
    var id = $(this).parent().attr('data-id');
      $.ajax({
        url:'/api/teacher/view',
        type:'get',
        data:{tc_id:id},
        success:function (info){
          if(info.code ==200){
            //要渲染模板
            var htmlStr = template('tc_info_tpl',info.result);
            $('#teacherModal tbody').html(htmlStr);
            $('#teacherModal').modal();  //让模态框弹出来
          }
        }
      })
  })

    // 启用或者注销功能
   $('#tc_list_tBody').on('click','a.btnHandle',function (){
          // alert(123);
        // 向服务器发送ajax请求，会改变当前状态
     var id = $(this).parent().attr('data-id');
      // var that =    $(this);
     var _this = $(this);
     $.ajax({
       url: '/api/teacher/handle',
       type:'post',
       data:{
         tc_id:id,
         tc_status:$(this).attr('data-status')
       },
       success:function (info){
         _this.attr('data-status',info.result.tc_status);//将服务器返回来的状态码数据更新一下
          if(info.code==200){
            //当状态为0的时候，是一个启用的状态 ，但是按钮的文字 显示的是注销，当status为1的时候，是一个注销的状态，但是按钮显示的文字是启用
            // alert('修改成功');
            if(info.result.tc_status==0){
              _this.text('注 销');
            }else {
              _this.text('启 用');
            }

          }
       }
     })
   })
});