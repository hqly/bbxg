/**
 * Created by Administrator on 2017/7/15.
 */
define(['jquery','template','ckeditor','uploadify','datepicker','datepickerzh','region','form'],function ($,template,CKEDITOR,uploadify){

  //1.向服务器发送请求， 渲染模板
  $.ajax({
    url:'/api/teacher/profile',
    type:'get',
    success:function (info){
       if(info.code==200){
         var htmlStr = template('profile_tpl',info.result);
         $('.settings').html(htmlStr);

         //2. 文件上传插件的使用   因为模板渲染完成之后才会显示当前的页面样式
         $('#upfile').uploadify({
           'swf'      : '/views/public/assets/uploadify/uploadify.swf',  //引入的flash文件
           'uploader' : '/api/uploader/avatar',   // 要提交给的目标接口
           'height':120,
           'width':120,
           'buttonText':'',
           'fileObjName':'tc_avatar',
           onUploadSuccess:function (file,data,response){
             //上传成功之后，服务器会返回此图片在服务器的一个路径信息
             //可以将此图片渲染到当前页面上
             // console.log(data);
             // var obj = JSON.parse(data);
             // $('.preview img').attr('src',obj.result.path);
             $('.preview img').attr('src',JSON.parse(data).result.path);
           }
         });

         //3. 使用日期插件
         $('input[name=tc_join_date],input[name=tc_birthday]').datepicker({
           format:'yyyy-mm-dd',
           language:'zh-CN'
         });

         //4. 省市区三级联动
          $('#region').region({
            url:'/views/public/assets/jquery-region/region.json'
          });
          //5. 富文本编辑器的使用
         CKEDITOR.replace('introduce',{
           toolbarGroups:[
             { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
             { name: 'links' },
             { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
             { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
             { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] }
           ]
         });//CKEDITOR

       }//if
    }//success
  });


  // 给按钮注册事件，保存信息

  $('.settings').on('click','.saveBtn',function (){
        //先更新一下当前富文本编辑器的内容
      $("#introduce").val(CKEDITOR.instances.introduce.getData());
         $('form').ajaxSubmit({
           url:'/api/teacher/modify',
           type:'post',
           success:function (info){
              if(info.code==200){
                alert('保存成功...');
                location.href='/settings';
              }
           }
         })
         return false;//阻止默认刷新行为
  })
})