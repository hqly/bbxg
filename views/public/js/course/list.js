/**
 * Created by Administrator on 2017/7/17.
 */
define(['jquery','template'],function ($,template){

  // 发送ajax请求，渲染当前页面
  $.ajax({
    url:'/api/course',
    type:'get',
    success:function (info){
      if(info.code==200){
        var htmlStr = template('ct_list_tpl',info);
        $('.courses').html(htmlStr);
      }
    }
  })
})