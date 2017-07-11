
	// NProgress.start();
  //
	// NProgress.done();
  //
	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

	if(!$.cookie('PHPSESSID')&&location.pathname!='/login'){   //如果自己当前就是login页面的话，就不需要再跳转了，只有不是login页面的时候，才需要跳转
    location.href='login';
  }

  // 渲染模板    login页面是不需要用户名和头像渲染的，需要排除掉
  if(location.pathname!='/login'&&location.pathname!='/dashboard/login'&&location.pathname!='/views/dashboard/login'){
    var tcInfo = JSON.parse($.cookie('tcInfo')); // 把字符串转换成对象
    var htmlStr = template('tp_aside_avatar',tcInfo);  // 拼接模板字符串
    $('.aside>.profile').html(htmlStr); //渲染模板
  }
