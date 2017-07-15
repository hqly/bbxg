/**
 * Created by Administrator on 2017/7/14.
 */
define(['utils','jquery','template','form','datepicker','datepickerzh'],function (utils,$,template,form,dp,dpzh){
       // alert('调用成功');

  // var id = obj.tc_id;
  var id = utils.queryString().tc_id;
    if(id){  // 如果不是boolean  会默认的调用 Boolean()
      //根据当前的id给服务器发送ajax请求，获取当前id下面的讲师的信息
      $.ajax({
        url:'/api/teacher/edit',
        type:'get',
        data:{tc_id:id},
        success:function (info){
          info.result.title='讲师编辑';
          info.result.saveBtnText = '保存';
          if(info.code == 200){
            // 要渲染页面模板
            var htmlStr = template('tc_manager_tpl',info.result);
            $('.teacher').html(htmlStr);

            //页面渲染完毕之后，再来渲染插件
            $('input[name=tc_join_date]').datepicker({
              format:'yyyy/mm/dd',      //让日期插件的格式 变成年月日的方式
              language:'zh-CN'
            });
          }
        }
      });

      // 单击保存按钮 ，将保存后的信息，发送给服务器，保存在数据库里面
      $('.teacher').on('click','.btnSave',function (){

        $('form').ajaxSubmit({
          //使用此种方式提交 的好处是，可以把表单里面的一切信息都自动的提交给服务器
          url:'/api/teacher/update',
          type:'post',
          success:function (info){
            if(info.code==200){
              alert('保存成功,即将跳转到列表页...');
              location.href='/teacher/list';
            }
          }
        });
        return false;
      });
    }else {
      // 添加的功能    跳转过来之后，首先也得渲染模板
      var htmlStr = template('tc_manager_tpl',{
         title:'讲师添加',
        saveBtnText:'添加',
        tc_gender:0   //添加一个默认的值
      });
      $('.teacher').html(htmlStr);

      //一定要在模板 渲染完毕来添加日期插件
      $('input[name=tc_join_date]').datepicker({
        format:'yyyy/mm/dd',      //让日期插件的格式 变成年月日的方式
        language:'zh-CN'
      });
    //  单击按钮 ，要把表单上的数据提交到数据库

     $('.teacher').on('click','.btnSave',function (){
       $('form').ajaxSubmit({
         url:'/api/teacher/add',
         type:'post',
         success:function (info){
           if(info.code==200){
             alert('添加讲师成功');
             location.href='/teacher/list';
           }
         }
       })//ajaxSubmit
       return false;
     })//on
    }//else

})