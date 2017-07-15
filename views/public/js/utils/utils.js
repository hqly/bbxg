/**
 * Created by Administrator on 2017/7/15.
 */
//现在是进行了模块化的开发，因此现在的这个与业务不相关的功能，也要封闭成一个模块，这就是一个工具模块
//专门用来获取?后面的id
define(function (){
  var o = {
    queryString:function (){
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
      return obj; //要把对象返回值
    }

  }
    return o;
})