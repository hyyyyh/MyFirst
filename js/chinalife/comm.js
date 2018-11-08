/**
 *  共用库
 * Created by cyx on 16/10/13.
 */
define(["jquery","alertify"], function ($,alertify) {
  var isProduct=true;

  var option={
    url : "",
    data : "",
      dataType :"json",
      cache : false,
      timeout:300000
};

  // 静态资源
  var serverUrl = function (url) {
    if(isProduct){
      return config.getUrl()+url;
     //return "http://myservice.activity.clic:8089/"+url
    }else{
      return url;
    }
  };

  // 封装Ajax请求
  var doGet = function (options, callback1, callback2) {
    $.extend(option,options);
    $.support.cors = true;
    $.ajax({
      type: 'get',
      url: serverUrl(option.url),
      timeout: option.timeout,
      cache : option.cache,
      dataType: option.dataType,
      xhrFields: {
        withCredentials: true
      },
      success: function (o) {
        if(o.rcode&&o.rcode=='03'){
          window.location.href="/";
        }
        if(o.rcode&&o.rcode!='000'){
          if(o.message){
            alertify.alert(o.message);
            return ;
          }
          alertify.alert("系统错误,请稍后重试")
        }

        callback1(o);
      },
      error: function (err) {
        if (!callback2) {
          alertify.alert("系统错误，请稍后再试");
          // 默认错误处理
        } else {
          callback2(err);
        }
      }
    });
  };

  var doPost = function (options, callback1, callback2) {
    $.extend(option,options);
    $.support.cors = true;
    $.ajax({
      type: 'post',
      url: serverUrl(option.url),
      cache:option.cache,
      data: option.data,
      dataType: option.dataType,
      timeout: option.timeout,
      xhrFields: {
        withCredentials: true
      },
      success: function (o) {
        if(o.rcode&&o.rcode=='03'){
          window.location.href="/";
        }
        if(o.rcode&&o.rcode!='000'){
          if(o.message){
            alertify.alert(o.message);
            return ;
          }
          alertify.alert("系统错误,请稍后重试")
        }
        callback1(o);
      },
      error: function (err) {
        if (!callback2) {
          alertify.alert("系统错误，请稍后再试");
          // 默认错误处理
        } else {
          callback2(err);
        }
      }
    });
  };

  // 去空格
  var trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };


  // 将null、undefined、NaN转为0
  var parseNum = function (obj) {
    if (obj === undefined || obj === null || !parseFloat(obj)) {
      return 0;
    } else {
      return parseFloat(obj);
    }
  };




  //获取url参数值
  var  getQueryString =function(key) {
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  } ;
  //$("body") .append("<div id='maskT'style='display:none;position:fixed;top:0;bottom:0;background:#000;width:100%;filter:alpha(opacity:70); opacity:0.7; -moz-opacity:0.7;-khtml-opacity: 0.7;z-index: 9999'></div><div id='progressBar'  style='display: none;width:250px;height:150px;padding:10px; font-size: 14px;text-align:center; position: fixed; top:40%;left: 50%;margin-top:-75px;margin-left:-150px;z-index:3;font-family: Arial, sans-serif; z-index:10000;background:#fff;border-radius:10px;filter:alpha(opacity:90); opacity:0.9; -moz-opacity:0.9;-khtml-opacity: 0.9;'><span id='close' style='float:right;width:20px;height:20px;background:url(../../img/close.png) no-repeat'></span><span style='color:#000;display:block;line-height: 90px;'>数据加载中，请稍等...</span><img src='../../img/loading.gif'style='' /></div>");
  //
  //$(document).ajaxStart(function () {
  //  var ajaxbg = $("#progressBar");
  //  var ajaxMask=$("#maskT");
  //  ajaxbg.show();
  //  ajaxMask.show();
  //  $("#close").click(function(){
  //    ajaxbg.hide();
  //    ajaxMask.hide();
  //  })
  //}).ajaxStop(function () {
  //  var ajaxbg = $("#progressBar");
  //  var ajaxMask=$("#maskT");
  //  ajaxbg.hide();
  //  ajaxMask.hide();
  //}).ajaxError(function(){
  //  var ajaxbg = $("#progressBar");
  //  var ajaxMask=$("#maskT");
  //  ajaxbg.hide();
  //  ajaxMask.hide();
  //});
  return {
    doGet: doGet,
    doPost: doPost,
    trim: trim,    // 去空格
    parseNum: parseNum, // 将null、undefined、NaN转为0
    getQueryString:getQueryString,
    serverUrl:serverUrl
  };
});

