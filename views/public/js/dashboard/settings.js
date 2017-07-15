/**
 * Created by Administrator on 2017/7/15.
 */
define(['jquery','template'],function ($,template){

  //1.向服务器发送请求， 渲染模板
  $.ajax({
    url:'/api/teacher/profile',
    type:'get',
    success:function (info){
       if(info.code==200){
         var htmlStr = template('profile_tpl',info.result);
         $('.settings').html(htmlStr);
       }
    }
  })
})