/**
 * Created by Administrator on 2017/7/11.
 */
define(['jquery','cookie'],function ($,cookie){
  $('#formLogin').submit(function (){  // 输入内容之后，按回车即可进行提交

    //获取用户名和密码，发送ajax请求
    var data = $(this).serializeArray();//将表单里面的数据序列化成对象
    console.log(data);
    // 发送ajax请求
    $.ajax({
      url:'/api/login',
      type:'post',
      data:data,
      success:function (info){
        if(info.code ==200){
          alert('登陆成功');
          var infoStr = JSON.stringify(info.result) ;//将对象转换成字符串
          console.log(infoStr);
          $.cookie('tcInfo',infoStr);//将服务器返回来的数据(用户名和头像信息)存储在cookie，cookie可以在同一域名下面的页面之间互相传递
          window.location.href = 'index';
        }
      },
      error:function (errorInfo){
        console.log('用户名或是密码不对...');
      }
    })
    // 阻止默认行为
    return false;
  })
})