var conUrl=config.getUrl();
require(["jquery","config","comm","restUrl","alertify","slider"], function ($,config,comm,restUrl,alertify) {

   //点击星值埋点
   $("#vipStar").click(function(){
    ecss.log(paramsAdd("0001-0002",""));
    setTimeout(function(){    window.location.href="vipStar.html?partId="+comm.getQueryString("partId")+"&appid="+comm.getQueryString("appid")+"&openid="+comm.getQueryString("openid")+"&ecno="+comm.getQueryString("ecno")


}, 200);

});
//服务经理埋点在上面
//等级规则
    //跳转
    $("#vipGrage").click(function(){
        ecss.log(paramsAdd("0001-0001",""));
        setTimeout(function(){window.location.href="vipGrage.html?partId="+comm.getQueryString("partId");

    }, 200);
        
    });
//     //服务经理点击跳转链接
//     $(".people,.people_nam").click(function(){
// window.ECSS.jumpFunctionModule("W-002-001-012");
//     });
    var provCode="";
    // var result={
    //     "code":"000",
    //     "message":"成功！",
    //     "data":{
    //         "partId":"17837264",
    //         "name":"张淑辖",
    //         "gender":"2",
            
            
    //         "premium":"6000",//当前星值

    //         "prePremium":"4000",//上一级
    //         "preLv":"1",
    //         "preName":"1",

    //         "currPremium":"5000",//中间级
    //         "lv":"2",
    //         "lvName":"2",

    //         "nextPremium":"10000",//下一级
    //         "nextLv":"3",
    //         "nextName":"3",
         
           
        
    //         "diffPremium":"0",
    //         "fullDate":"2018-10-09",
    //         "endDate":"2020-11-06",
    //         "provCode":"110000",
    //         "provName":"北京市分公司",
    //         "agentName":"笋凤琴",
    //         "agentTel":"13012204216",
    //         "agentGender":"2",
    //         "lvList":[
    //             {"endValue":"4000","startValue":"0","lvCode":"0","lvName":"准星"},
    //             {"endValue":"40000","startValue":"4000","lvCode":"1","lvName":"一星"},
    //             {"endValue":"100000","startValue":"40000","lvCode":"2","lvName":"二星"},
    //             {"endValue":"300000","startValue":"100000","lvCode":"3","lvName":"三星"},
    //             {"endValue":"700000","startValue":"300000","lvCode":"4","lvName":"四星"},
    //             {"endValue":"1000000000","startValue":"700000","lvCode":"5","lvName":"五星"}
    //         ],
    //         "promoteStatus":"0",
    //         "custType":"0",
    //         "effectiveStatus":"0"
    //     },
    //     "statusType":null}
    //轮播图--------------------------------------------------
    //页面加载的接口
    
comm.doPost({url: restUrl.custInfo,data:{
    "cmd":"getCustInfo",
    "partId":comm.getQueryString("partId"),
    'accessToken': 'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
   
}}, function (result){
   
        if(result.code=="000"){
        
            $(".starTwo span").addClass("ballon");
          
            if(result.data.promoteStatus=="1"){//升级
    
                   $("#xingdianzhi").text("还需"+result.data.diffPremium+"星点值即可升级为"+result.data.nextName+"客户");
            
            }else{
             
				if (result.data.lv=="5"&&result.data.diffPremium=="0"){
                $("#xingdianzhi").text("恭喜您成为我司最高等级客户");
            }
				else{
                $("#xingdianzhi").text("距保持当前等级还差"+result.data.diffPremium+"星点值");}
            }
            provCode=result.data.provCode;
            // comm.doGet({url: restUrl.property+"?cmd=getjecsspath"}, function (result){//0还是总公司 轮播图，1是分公司服务区
            //     if(result.code=="000"){
            //         $("#scriptY").append("<script src="+result.data+"></script>")
            //     }
            // });
            ecss.log(paramsAdd("0001-0009",""));
            $(".am-progress").show();
            //先判断当前级别 更换icon  且前后是否需要显示icon
           
            if (result.data.lv == "0") {//当前级别是准星 那左边就回空着  升级
              
                $(".starTwo").show();
                $(".starThree").show();
                $(".am-progress").css("margin-left", $(".starTwo").offset().left+40+"px");//进度条缩短左边的不显示
                $("#progressA").hide();//左边进度条消失
                $(".starOne").hide();//左边图标消失
                $(".starTwo span").eq(0).css("background", "url('../img/30vip/zhunxing.png') no-repeat");
                $(".starThree span").eq(0).css("background", "url('../img/30vip/1xing.png') no-repeat");
                $(".starThree label").text(result.data.nextName+"客户");//下一级别的名称
               //当前星点值-中间星点值/下一级星点值-中间星点值
              
                    var qujianNum=(result.data.premium-result.data.currPremium)/(result.data.nextPremium-result.data.currPremium); 
                    if(qujianNum>0.92){
                        qujianNum=0.92;
                    }
                    $("#progressB").css("width",qujianNum*100+"%");
            } else if (result.data.lv == "5") {//进度条右边不显示  保级
                $(".starTwo span").eq(0).css("background", "url('../img/30vip/5xing.png') no-repeat");
                $(".starThree").hide();//最右边的图标消失
                $(".starOne").show();
                $("#progressA").css("width",$(".starOne").offset().left+30+"px");
                $(".starTwo").show();
                $(".am-progress").css("width", $(".starTwo").offset().left+40+"px");//进度条缩短左边的不显示
                $(".starOne label").text(result.data.preName+"客户");//下一级别的名称
                $(".starOne span").eq(0).css("background", "url('../img/30vip/4xing.png') no-repeat");
                $("#posi").css("left",$(".starOne").offset().left+30+"px");
                //当前星点值-上一个开始值/结束值-开始值
                var qujianNum=(result.data.premium-result.data.prePremium)/(result.data.currPremium-result.data.prePremium);
                if(qujianNum>0.92){
                    qujianNum=0.92;
                }
                $("#progressB").css("width",qujianNum*100+"%");
            } else {//保级+升级
                $(".starOne").show();
                $(".starTwo").show();
                $(".starThree").show();
           
                if (result.data.lv == "1") {//一星  左右都会有星
                    $(".starTwo span").eq(0).css("background", "url('../img/30vip/1xing.png') no-repeat");
                    $(".starOne span").eq(0).css("background", "url('../img/30vip/zhunxing.png') no-repeat");
                    $(".starThree span").eq(0).css("background", "url('../img/30vip/2xing.png') no-repeat");
                    $(".am-progress").css("margin-left",$(".starOne").offset().left+30+"px");
                }else if(result.data.lv == "2"){
                    $(".starTwo span").eq(0).css("background", "url('../img/30vip/2xing.png') no-repeat");
                    $(".starOne span").eq(0).css("background", "url('../img/30vip/1xing.png') no-repeat");
                    $(".starThree span").eq(0).css("background", "url('../img/30vip/3xing.png') no-repeat");
                }else if(result.data.lv == "3"){
                    $(".starTwo span").eq(0).css("background", "url('../img/30vip/3xing.png') no-repeat");
                    $(".starOne span").eq(0).css("background", "url('../img/30vip/2xing.png') no-repeat");
                    $(".starThree span").eq(0).css("background", "url('../img/30vip/4xing.png') no-repeat");
                }else if(result.data.lv == "4"){
                    $(".starTwo span").eq(0).css("background", "url('../img/30vip/4xing.png') no-repeat");
                    $(".starOne span").eq(0).css("background", "url('../img/30vip/3xing.png') no-repeat");
                    $(".starThree span").eq(0).css("background", "url('../img/30vip/5xing.png') no-repeat");
                }

               
                $(".starOne label").text(result.data.preName+"客户");//前一级别
                $(".starThree label").text(result.data.nextName+"客户");//后一级别
                //如果当前星点值大于中间图标的值是升级
                $("#posi").css("left",$(".starTwo").offset().left+40+"px");
                if(result.data.lv == "4"){
                    $(".am-progress").css("width",$(".starThree").offset().left+30+"px")
                }
                if(parseInt(result.data.premium)>parseInt(result.data.currPremium)){//升级
                    if (result.data.lv != "1"){
                        $("#progressA").css("width",$(".starTwo").offset().left+40+"px");
                       
                    }else{
                        $("#progressA").css("width",$(".starTwo").offset().left-20+"px");
                    }

                    var qujianNum=(result.data.premium-result.data.currPremium)/(result.data.nextPremium-result.data.currPremium);
                    if(qujianNum>0.92){
                        qujianNum=0.92;
                    }
                    $("#progressB").css("width",qujianNum*100+"%");
                
                }else{//保级
                 
                    if (result.data.lv != "1"){
                        $("#progressA").css("width",$(".starOne").offset().left+30+"px");
                    }else{
                        $("#progressA").hide();
                    }
                  
                //当前星点值-上一级/中间值-上一级
                var qujianNum=(result.data.premium-result.data.prePremium)/(result.data.currPremium-result.data.prePremium);
                if(qujianNum>0.92){
                    qujianNum=0.92;
                }
                $("#poC").show();
                $("#poC").css("width",$(".starTwo").offset().left-$(".starOne").offset().left+10+"px")
                $("#progressC").css("width",qujianNum*100+"%");
                $("#posi").hide();
             
                
                }

            }
               //开始极端进度条的值 当前值-开始值/终点值-开始值
      
            $(".starTwo label").text(result.data.lvName+"客户");//当前星级名称
            $(".labNum").text("当前星点值"+result.data.premium);//当前星点值
            // $("#xingNum").text(result.data.diffPremium);//还差星点值
            var time=result.data.endDate.split("-");
            var endData=time[0]+"."+time[1]+"."+time[2];
            $("#endTime").text(endData)//有效时间
            $("#nameK").text(result.data.name);//客户姓名
            if(result.data.agentTel==""||result.data.agentTel==undefined){
                $(".footers").hide();
                $("footer").hide();
                $("footer").css("background","#fff");
                $("footer").css("opacity","1");
            }else{
                $("footer").show();
                $(".people_nam label").text(result.data.agentName);//服务经理姓名
                $(".people_nam span").text(result.data.agentTel);//服务经理电话
            }

            $("#addr span").text(result.data.provName);//服务地
         
    
            //$(".am-radius").css("left",qujianNum*100+"%");
            //根据性别判断用户的头像
            if(result.data.gender=="2"){//客户是2的话 是女  其他是男
                $(".head_name span").css("background","url(../img/nv.png)no-repeat")
            }else  if(result.data.gender=="1"){
                $(".head_name span").css("background","url(../img/ren.png)no-repeat")
            }
            if(result.data.agentGender=="2"){//客户是2的话 是女  其他是男
                $(".people").css("background","url(../img/nv.png)no-repeat")
            }else  if(result.data.agentGender=="1"){
                $(".people").css("background","url(../img/ren.png)no-repeat")
            }
            if(result.data.custType=="1"){//特殊客户隐藏星值
                $("#xingdianzhi").hide();
                $(".labNum").hide();
            }else{
                $("#xingdianzhi").show();
                $(".labNum").show();
            }
            //联系人点击事件
            $("#btn").on("click",function(){

                ecss.log( paramsAdd("0001-0005",""));
                $("#mask").show();
                $(".iphone").show();
                $("#iphoneNum").text(result.data.agentTel);
                $("#call a").attr("href","tel:"+result.data.agentTel)
            });
        }else{
            alertify.alert(result.data.message);
        }

   });
    //图片渲染接口
    comm.doPost({url: restUrl.pic,data:{
        "cmd":"getImgs",
        "type":"0",
        "partId":comm.getQueryString("partId"),
        'accessToken':'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
    }}, function (result){//0还是总公司 轮播图，1是分公司服务区
        if(result.code=="000"){
     
            var length=result.data.length;
            if(length!=0){
                var str="";
                var olStr="";
                for(var i=0;i<length;i++){
                    str+='<li  data-url="'+result.data[i].url+'" data-id="'+result.data[i].id+'" >'+
                    
                        '<img  src="'+conUrl+'vassmobile/pic.do?cmd=download&id='+result.data[i].id+'&partId='+comm.getQueryString("partId")+'" alt="" width="100%" height="100%"/>'+
                      
                        '</li>';
                    olStr+='<li><a class="">'+(i+1)+'</a></li>'
                }
                $("#slides").append(str);
                $(".flex-control-nav").append(olStr);
                $('.flexslider').flexslider({
                    directionNav: false,   //是否显示左右控制按钮
                    controlNav: true,   //是否显示底部切换按钮
                    pauseOnAction: false,  //手动切换后是否继续自动轮播,继续(false),停止(true),默认true
                    animation: 'slide',   //淡入淡出(fade)或滑动(slide),默认fade
                    slideshowSpeed: 5000,  //自动轮播间隔时间(毫秒),默认5000ms
                    animationSpeed: 150,   //轮播效果切换时间,默认600ms
                    direction: 'horizontal',  //设置滑动方向:左右horizontal或者上下vertical,需设置animation: "slide",默认horizontal
                    randomize: false,   //是否随机幻切换
                    animationLoop: true   //是否循环滚动
                });
                setTimeout($('.flexslider img').fadeIn());
                   //轮播图埋点  banner
                $("#slides li").click(function(){
            
                    var picId=$(this).attr("data-id");
            
                    ecss.log(paramsAdd("0001-0003",picId));
                    var _this=$(this);
                    setTimeout(function(){window.location.href=_this.attr("data-url");

                }, 200);
               
                })
            }else{
                $(".wrapper").hide();
            }
        }
    });
    comm.doPost({url: restUrl.pic,data:{
        "cmd":"getImgs",
        "type":"1",
        "partId":comm.getQueryString("partId"),
        'accessToken':'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
    }}, function (result){//0还是总公司 轮播图，1是分公司服务区
        if(result.code=="000"){
            var length=result.data.length;
            if(length!=0){
                var str="";

                for(var i=0;i<length;i++){
                    str+='<span data-id="'+result.data[i].id+'" data-url="'+result.data[i].url+'" style="background:url('+conUrl+'vassmobile/pic.do?cmd=download&id='+result.data[i].id+'&partId='+comm.getQueryString("partId")+') no-repeat"></span>'

                }
                $("#title_img").append(str);

            //服务专区
                $("#title_img span").click(function(){
                    var imgId=$(this).attr("data-id");
                    ecss.log( paramsAdd("0001-0004",imgId));
                    var _this=$(this);
                    setTimeout(function(){window.location.href=_this.attr("data-url");

                }, 200);
                   
                })
            }
            /**
             *
             *
             * ***/



            /**
             * /vassmobile/pic.do

             ?cmd=download&id=，下载图片
             * **/
        }
    });
    /*****参数type=0表示获取总公司的图片，type=1表示获取分公司的图片* **/
    //联系人取消按钮
    $("#chanel").on("click",function(){
        $("#mask").hide();
        $(".iphone").hide()
    });
    //埋点集合
    function paramsAdd(operationid,p1){
        var params={
            "data":{
                "appid":comm.getQueryString("appid"),
                "openid":comm.getQueryString("openid"),
                "ecno":comm.getQueryString("ecno"),//用户id
                "s_operationins":"",
                "s_operationcode":"",
                "s_errorcode":"",
                "errorreason":"",
                "url":"",
                "area":"",
                "expjsonstr":"",
                "operationid":operationid,//VIP服务首页->客户信息展示区->级别Logo
                "p1":p1,//图片id
                "p2":comm.getQueryString("partId"),//partId
                "p3":provCode,//branchId
                "p4":"",
                "p5":""
            }
        }
        return params;
    }
   
});