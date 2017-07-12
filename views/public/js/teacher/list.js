/**
 * Created by Administrator on 2017/7/12.
 */
define(['jquery','template'],function ($,template){
     //跳转到这个页面的时候，要向服务器发送ajax请求，获取所有的讲师，渲染在当前页面上
    $.ajax({
      url:'/api/teacher',
      type:'get',
      success:function (info){
        if(info.code ==200){
          var htmlStr = template('tc_list_tpl',info);
          $('#tc_list_tBody').html(htmlStr);
        }
      }
    })
});