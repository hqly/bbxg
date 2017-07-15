/**
 * Created by Administrator on 2017/7/15.
 */
define(['utils','jquery','template','ckeditor','form'],function (obj,$,template,CKEDITOR,form){
   //要根据传过来的id，获取当前的所有的信息，渲染到当前页面上来
    var id = obj.queryString().cs_id;
    $.ajax({
      url:'/api/course/basic',
      type:'get',
      data:{
        cs_id:id
      },
      success:function (info){
          if(info.code==200){
            var htmlStr = template('cs_basic_tpl',info.result);
            $('.steps').html(htmlStr);

            //添加富文本编辑器
            CKEDITOR.replace('cs_brief');
          }
      }
    });//ajax

    // 给保存按钮注册事件
  $('.steps').on('click','#btnSave',function (){
         // alert(123);
    $("#cs_brief").val(CKEDITOR.instances.cs_brief.getData());
    $('form').ajaxSubmit({
      url:'/api/course/update/basic',
      type:'post',
      success:function (info){
         if(info.code==200){
           alert('保存成功，即将跳转到图片中心...');
          location.href='/course/pic?cs_id='+info.result.cs_id;
         }
      }
    })
         return false;
  })
})