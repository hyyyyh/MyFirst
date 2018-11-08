/**
 * Created by Administrator on 2018/9/11.
 */
var conUrl=config.getUrl();
require(["jquery","config","comm","restUrl","alertify","slider"], function ($,config,comm,restUrl,alertify) {
    $(".codeImg").attr("src",conUrl+"vassmobile/custInfo.do?cmd=genQRCode&accessToken=ABCDEFGHIJKLNMOPQRSTUVWXYZ&partId="+comm.getQueryString("partId")+"&appid="+comm.getQueryString("appid")+"&openid="+comm.getQueryString("openid")+"&ecno="+comm.getQueryString("ecno"));
    //页面加载的接口
    comm.doPost({url: restUrl.custInfo,data:{
        "cmd":"getCustInfo",
        "partId":comm.getQueryString("partId"),
        'accessToken':'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
    }}, function (result){
    if(result.code=="000"){
        if( result.data.gender=="2"){//女
            $(".people").css("background","url(../img/nv.png) no-repeat");
        }else  if( result.data.gender=="1"){
            $(".people").css("background","url(../img/ren.png) no-repeat")
        }
        $(".people_nam label").text(result.data.name);//客户姓名
       /** if(result.data.lv=="0"){
            $(".people_nam img").attr("src","../img/30vip/zhunxing.png");//当前星级来展示图标
        }else{
            $(".people_nam img").attr("src","../img/30vip/"+result.data.lv+"xing.png");//当前星级来展示图标]

             }*/
        if(result.data.lv=="0"||result.data.lv=="1"){
            $(".star span").css("background"," url(../img/putong.png) no-repeat");
            // $(".people_nam .people-for").text("普通客户");
        }else{
            $(".star span").css("background"," url(../img/icon-"+result.data.lv+"xing.png) no-repeat");
            // $(".people_nam .people-for").text(result.data.lvName+"客户");
        }
        //$(".pepple-time").text(result.data.endDate+"到期");//结束时间
    }else{
        alertify.alert(result.message);
    }
    });
});
