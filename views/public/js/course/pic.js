/**
 * Created by Administrator on 2017/7/17.
 */
define(['utils','jquery','template','uploadify','jcrop'],function (utils,$,template,uploadify){
  var id = utils.queryString().cs_id;
  var jcrop_obj = null;// 先定义一个缩略图的空对象
    $.ajax({
      url:'/api/course/picture',
      type:'get',
      data:{
        cs_id:id
      },
      success:function (info){
        if(info.code==200){
          //渲染模板
          var htmlStr = template('cs_pic_tpl',info.result);
          $('.steps').html(htmlStr);

          //
          $('#upload').uploadify({
            swf:'/views/public/assets/uploadify/uploadify.swf',
            uploader:'/api/uploader/cover',
            buttonText:'选择图片',
            width: 85,
            height:'auto',
            buttonClass:'btn btn-success btn-sm',
            formData:{cs_id:id},
            fileObjName:'cs_cover_original',
            itemTemplate:'<span><span>',
            onUploadSuccess:function (file,data,response){
              // http://static.botue.com/images/cover/596c21435c35e.gif
              //显示上传的图片
              // console.log(typeof data);
              $('.preview img').attr('src',JSON.parse(data).result.path);
              //将裁切图片的按钮状态 改变 为可用
              $('#cropBtn').prop('disabled',false);
              // 在hmtl当中属性值只有一个的时候，在用js进行设置的时候，要换成boolean类型的值
              // jquery当中在设置元素的启用或是禁用的时候，有三个是比较特殊的，disabled  checked selected ，在设置的时候，必须用prop(), 用attr的话，多次使用的时候，会有问题
            }
          });


          // 给裁切图片按钮 注册事件
          // $('#cropbtn').on('click')
          $('.steps').on('click','#cropBtn',function (){
            if($(this).attr('data-status')!='save'){   //
              //如果没有data-status这个自定义 属性或是属性值不为save的话，则说明这是第一次单击按钮
              $(this).attr('data-status','save').text('保 存');
              $('.preview img').Jcrop({
                aspectRatio: 2,  //设置宽高的比例
                setSelect: [20,20,240,120],
                boxWidth:400
              },function (){
                // 这里面的这些数据是用来设置缩略图的
                jcrop_obj = this;  //this就是当前的缩略图对象
                jcrop_obj.initComponent('Thumbnailer', { width: 240, height: 120 });
                //将缩略图追加到左上角的盒子当中
                // $('.jcrop-thumb').appendTo($('.thumb'));
                $('.thumb').append($('.jcrop-thumb'));
              });
            }else {
              // 到了这里面执行代码 的时候，就表示现在是一个保存的功能
               var result = jcrop_obj.getSelection();
              $.ajax({
                url:'/api/course/update/picture',
                type:'post',
                data:{
                  cs_id:id,
                  x: result.x,
                  y:result.y,
                  w:result.w,
                  h:result.h
                },
                success:function (info){
                   if(info.code ==200){
                     alert('图片裁切之后保存成功。。。');
                     location.href='/course/lesson?cs_id='+info.result.cs_id;
                  }
                }
              })
            }

          })
        }
      }
    })
})