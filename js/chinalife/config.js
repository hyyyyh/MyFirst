/**
 * 配置说明
 * Created by yy on 2016/6/14.
 */
(function(window){
    var url = "";
    var type = "post";
     var domainUrl="http://10.253.127.121:8096/";
    // var domainUrl="http://view.activity.clic:8087/";
    var datatype = "JSON";
    var datatypes = "text";
    //test:本地测试 publish:生产发布
    var model = "publish";
    var keyP="cgcahvcghvKuGhjbchbdsj";
    if(model=="local"){
        url = "";
    }else if(model=="publish"){
       url = "http://10.253.127.121:8096/"
        //  url = "http://view.activity.clic:8087/";//servicebd
    }
    function config() {
        var getType = function(){
            return type;
        };
        var getUrl = function () {
            return url;
        };
        var getDataType = function () {
            return datatype;
        };
        var getDomain =function(){
            return domainUrl;
        };
        var valKey=function(){
            return keyP;
        };
        return {
            getUrl: getUrl,
            getType:getType,
            getDataType: getDataType,
            getDomain:getDomain,
            valKey:valKey
        }
    }
    window.config = new config();
})(window);