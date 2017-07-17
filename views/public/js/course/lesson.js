/**
 * Created by Administrator on 2017/7/17.
 */
define(['utils','jquery','template','bootstrap','form'],function (utils,$,template,bt){
    // 根据url中的id，去数据库查询数据，获取值
   var id = utils.queryString().cs_id;
   // 1.发送请求获取数据
  renderLesson();

  //2. 当我们单击添加按钮的时候，要显示模态框
  $('.steps').on('click','#addLesson',function (){
      var htmlStr = template('cs_modal_tpl',{
        title:'课时添加',
        savaBtnText:'添加'
      });
      $('#editPanel').html(htmlStr);
         $('#lesson').modal();
  });

  //3. 当我们单击编辑按钮的时候，要显示当前课程的所有信息在模态框上

  //4. 单击保存按钮的时候，要把当前的信息内容提交给服务器
  $('#editPanel').on('click','#saveBtn',function (){
         // alert(123);
    var ct_is_free  =Number($('#ct_is_free').prop('checked')); //将复选框的状态，转换成number类型
         // ct  chapter 章节
    $('form').ajaxSubmit({
      url:'/api/course/chapter/add',
      type:'post',
      data:{
        ct_is_free:ct_is_free,
        ct_cs_id:id
      },
      success:function (info){
        if(info.code==200){
          alert('课程添加成功');

          // 重新渲染页面
          renderLesson();
          $('#lesson').modal('hide');
        }

      }
    })
  });//on


  /**
   * 封装了一个刷新当前页面的函数
   */
  function renderLesson(){
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
  }
})