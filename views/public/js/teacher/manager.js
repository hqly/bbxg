/**
 * Created by Administrator on 2017/7/14.
 */
define(['jquery','template','form','datepicker'],function ($,template,form,dp){
       // alert('调用成功');
  // 获取当前url中的tc_id
  var search = location.search;//  ?tc_id=14&name=zhangsan&age=20
  search = search.slice(1); //第一个参数是从哪里开始截取，第二个参数是截取到哪里，如果不写默认是截取到最后
  // console.log(search);
  var searchArr = search.split('&');  //searchArr是一个数组
  // console.log(searchArr);
  var obj = {};  //定义一个空对象 ，用来存储数据
  for(var i=0;i<searchArr.length;i++){
     var temp =  searchArr[i].split('='); //temp也是一个数组
     // console.log(temp);
    obj[temp[0]] = temp[1];
  }
  var id = obj.tc_id;
    if(id){  // 如果不是boolean  会默认的调用 Boolean()
      //根据当前的id给服务器发送ajax请求，获取当前id下面的讲师的信息
      $.ajax({
        url:'/api/teacher/edit',
        type:'get',
        data:{tc_id:obj.tc_id},
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