/**
 * Created by Administrator on 2017/7/17.
 */
define(['utils','jquery','template'],function (utils,$,template){
    // 根据url中的id，去数据库查询数据，获取值
   var id = utils.queryString().cs_id;
   // 发送请求获取数据
  $.ajax({
    url:'/api/course/lesson',
    type:'get',
    data:{
      cs_id:id
    },
    success:function (info){
       // 渲染模板
      var htmlStr = template('cs_lesson_tpl',info.result);
      $('.steps').html(htmlStr);
    }
  })
})