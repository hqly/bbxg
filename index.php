<?php
  header("Content-type:text/html;charset=utf-8");

// php文件里面可以执行 php代码，也可以用来解析html代码
//  echo  '这是刚刚创建的php文件，用于在页面中输入内容';

//	 include 'views/dashboard/index.html';

//	 include 'views/dashboard/login.html';
//	 include 'views/teacher/list.html';
//	 include 'views/teacher/add.html';

//			var_dump($_SERVER) ;
			// 通过打印输出，我们发现，PATH_INFO属性里面存着index.php后面的一切信息
			// http://studyit.com/index.php/views/dashboard/login
			//'PATH_INFO' => string '/views/teacher/add' (length=12)

			$path = '' ;//先声明一个变量，来存储字符串
			// 如果访问的网址是stydyit.com/index.php的话，则$_SERVER中的PATH_INFO是不存在的，因此，需要进行判断
			if(array_key_exists('PATH_INFO',$_SERVER) ){
			//php中定义变量是用$
      			$path = $_SERVER['PATH_INFO'];   // 获取PATH_INFO的内容，包括/,但是include加载文件路径的时候，如果前面还有/的话，是加载 不出来的
      		  $path = substr($path,1);  // 截取字符串

      			// 如果在地址栏中输入studyit.com/index.php/dashboard/index  ,要获取要内容，切割字符串，然后再拼接起来
      			$arr = explode('/',$path);//explode是将字符串切割成数组
      			// stydyit.com/index.php/login
      			if(count($arr)==2){    // count是获取数组中元素的长度，类似于js中数组的length属性
      				$path = 'views/'.$arr[0].'/'.$arr[1];
      			}else if(count($arr)==1) {
      				$path = 'views/dashboard/'.$arr[0];
      			}

			}else {			//如果程序到了这个分支里面，说明是用的stutyit.com/index.php进行访问的
					$path = 'views/dashboard/index';
			}

//			include 'views'.$path.'.html';
			include   $path.'.html';   //拼接成要加载的字符串，给到include加载
?>