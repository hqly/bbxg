/**
 * Created by Administrator on 2017/7/12.
 */
require.config({
  baseUrl:'/views/public',
  paths:{
    'jquery':'assets/jquery/jquery.min',
    'cookie':'assets/jquery-cookie/jquery.cookie',
    'bootstrap':'assets/bootstrap/js/bootstrap.min',
    'nprogress':'assets/nprogress/nprogress',
    'template':'assets/artTemplate/template',
//      'common':'js/common'
    'common':'js/dashboard/common',
    'login':'js/dashboard/login',
    'form':'assets/jquery-form/jquery.form'
  },
  shim:{
    'bootstrap':{
      deps:['jquery']
    }
  }
});
require(['common']);