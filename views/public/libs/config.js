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
    'form':'assets/jquery-form/jquery.form',
    'datepicker':'assets/bootstrap-datepicker/js/bootstrap-datepicker',
    'datepickerzh':'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min'
  },
  shim:{
    'bootstrap':{
      deps:['jquery']
    },
    'datepickerzh':{
      deps:['jquery']
    }
  }
});
require(['common']);