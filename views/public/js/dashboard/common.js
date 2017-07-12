
	// NProgress.start();
  //
	// NProgress.done();
  //
	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

  // function fn(){
  //
  // }


	define(['jquery','cookie','template'],function ($,cookie,template){
    //登陆的功能
  if(!$.cookie('PHPSESSID')&&location.pathname!='/login'){   //如果自己当前就是login页面的话，就不需要再跳转了，只有不是login页面的时候，才需要跳转
      location.href='login';
    }

    //登陆之后渲染头像和用户名
    // 渲染模板    login页面是不需要用户名和头像渲染的，需要排除掉
    if(location.pathname!='/login'&&location.pathname!='/dashboard/login'&&location.pathname!='/views/dashboard/login'){
      var tcInfo = JSON.parse($.cookie('tcInfo')); // 把字符串转换成对象
      var htmlStr = template('tp_aside_avatar',tcInfo);  // 拼接模板字符串
      $('.aside>.profile').html(htmlStr); //渲染模板
    }

          //退出功能
          $('#logoutBtn').on('click',function (){
          // alert(123);
          $.ajax({
            url:'/api/logout',
            type:'post',
            success:function (info){
              if(info.code ==200){
                alert('退出成功');
                //退出成功之跳转到登陆页面
                location.href = '/login';
              }
            }
        })
    })

    //侧边栏的交互功能
    $('.navs a+ul').prev().on('click',function (){
        $(this).next().slideToggle();
    })
	});
