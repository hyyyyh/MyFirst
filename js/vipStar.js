/**
 * Created by Administrator on 2018/9/11.
 */
require(["jquery","config","comm","restUrl","alertify","proaress","slider"], function ($,config,comm,restUrl,alertify) {

    $("#vipGrage").click(function(){
        ecss.log(paramsAdd("0001-0006"));
        setTimeout(function(){window.location.href="vipGrage.html?partId="+comm.getQueryString("partId")+"&appid="+comm.getQueryString("appid")+"&openid="+comm.getQueryString("openid")+"&ecno="+comm.getQueryString("ecno");
    }, 200);
    });
   //跳转
    $("#vipCode").click(function(){
        ecss.log( paramsAdd("0001-0007"));
        setTimeout(function(){window.location.href="vipCode.html?partId="+comm.getQueryString("partId")+"&appid="+comm.getQueryString("appid")+"&openid="+comm.getQueryString("openid")+"&ecno="+comm.getQueryString("ecno");

    }, 200);
    });
    //服务经理点击跳转链接
    // $(".people,.people_nam").click(function(){
    //     window.ECSS.jumpFunctionModule("W-002-001-012");
    //         });
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
    //         "lv":"5",
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
    //页面加载的接口
    comm.doPost({url: restUrl.custInfo,data:{
        "cmd":"getCustInfo",
        "partId":comm.getQueryString("partId"),
        'accessToken':'ABCDEFGHIJKLNMOPQRSTUVWXYZ'
    }}, function (result){
        if(result.code=="000"){
            provCode=result.data.provCode;
            //判断是几星级客户
            if(result.data.lv=="0"){//准星
              $(".vipCodeEr").css("background","url(../img/Page1@2x.png) no-repeat");
              $(".vipCodeEr").css("background-size","100%");
            }else  if(result.data.lv=="1"){//
                $(".vipCodeEr").css("background","url(../img/2Page1@2x.png) no-repeat");
                $(".vipCodeEr").css("background-size","100%");
              }
              else  if(result.data.lv=="2"){//
                $(".vipCodeEr").css("background","url(../img/3Page1@2x.png) no-repeat");
                $(".vipCodeEr").css("background-size","100%");
              } else  if(result.data.lv=="3"){//
                $(".vipCodeEr").css("background","url(../img/4Page1@2x.png) no-repeat");
                $(".vipCodeEr").css("background-size","100%");
              } else  if(result.data.lv=="4"){//
                $(".vipCodeEr").css("background","url(../img/5Page1@2x.png) no-repeat");
                $(".vipCodeEr").css("background-size","100%");
              }else  if(result.data.lv=="5"){//
                $(".vipCodeEr").css("background","url(../img/6Page1@2x.png) no-repeat");
                $(".vipCodeEr").css("background-size","100%");
              }
            //进度条的走向
            $(function(){
                var geshu = $(".djwai").children(".dengji").length;
                var wid = $(".djwai").width()/geshu/2;
                var widt = wid + "px";
                $(".xianpa").css({"margin-left":widt,"margin-right":widt});
                // $(".yixiaof").css("margin-left",widt);
                $(".yixiaof").css("top","-8px");
                $(".yixiaof").text(parseInt(result.data.premium))

            });
            if(result.data.lvList[5].startValue!=result.data.lvList[5].endValue){
                //数字换算成万
                var lastNum=result.data.lvList[5].startValue/10000+"万以上";
            }else{
                var lastNum=result.data.lvList[5].startValue
            }
            var premium=parseInt(result.data.premium)
            if(premium=="0"){
                premium=1;
            }
			if (premium>result.data.lvList[5].startValue)
			{
				premium=result.data.lvList[5].startValue;
			}
            $(".progress").startProgress({
                "nodes":[
                    {"name":"准星","num":result.data.lvList[0].startValue},
                    {"name":"一星","num":result.data.lvList[1].startValue},
                    {"name":"二星","num":result.data.lvList[2].startValue},
                    {"name":"三星","num":result.data.lvList[3].startValue},
                    {"name":"四星","num":result.data.lvList[4].startValue},
                    {"name":"五星","num":result.data.lvList[5].startValue}
                ],
                "hasPay":premium
            });
            $(".new").text(result.data.premium);
            //更换客户的背景图片
            if(result.data.lv==0){//准星
                $(".head_bg").css("background","url('../img/zhunxing.png')no-repeat");
            }else    if(result.data.lv==1){//1星
                $(".head_bg").css("background","url('../img/yixing.png')no-repeat");
            }else    if(result.data.lv==2){//2星
                $(".head_bg").css("background","url('../img/erxing.png')no-repeat");
            }else    if(result.data.lv==3){//3星
                $(".head_bg").css("background","url('../img/sanxing.png')no-repeat");
            }else    if(result.data.lv==4){//4星
                $(".head_bg").css("background","url('../img/sixing.png')no-repeat");
            }else    if(result.data.lv==5){//5星
                $(".head_bg").css("background","url('../img/wuxing.png')no-repeat");
            }
//渲染客户等级
            if(result.data.lv=="0"||result.data.lv=="1"){
                $("#list h4").text("普通客户");//当前星级
            }else{
                $("#list h4").text("VIP"+result.data.lvName+"客户");//当前星级
            }

            var time=result.data.endDate.split("-");
            var endData=time[0]+"年"+time[1]+"月"+time[2]+"日";
            $("#list .time span").text(endData);//时间
                //升级判断
                if(result.data.custType=="1"){//特殊客户隐藏星值
                    $(".waic ").hide();
                    $("#changeContent").val("荣誉");
                    $("#changeDetail").text("恭喜您成为我司尊贵的荣誉客户");
                    $(".bg").css("height","auto")
                    $(".bg").css("padding-bottom","10%");
                    $(".txt_").text('荣誉级别由您的专属服务人员为您申请，了解详情可致电您的专属服务人员')
                    
                }else{
                    $(".waic ").show();
                    if(result.data.promoteStatus=="1"){
                        $("#changeContent").val("升级");
					//	if (result.data.lv=="0"){
					//		$("#changeDetail").text("再获取"+result.data.diffPremium+"星点值即可升级至VIP客户")
					//	}else{
                        $("#changeDetail").text("再获取"+result.data.diffPremium+"星点值即可升级至"+result.data.nextName+"级别")
                    }else  if(result.data.promoteStatus=="0"){//升级状态（"1"升级、"0"维持、"-1"出错了）"
                        $("#changeContent").val("保级");
						if (result.data.lv=="5"&&result.data.diffPremium=="0"){
							$("#changeDetail").text("恭喜您成为我司最高星级客户")
						}else{
                        $("#changeDetail").text("再获取"+result.data.diffPremium+"星点值即可保持"+result.data.lvName+"级别")}
                    }
                    //	当客户级别为准星客户时：
                if(result.data.lv=="0"||result.data.lv=="1"){
                    $(".txt_").text('提示:您还未是我司VIP客户，暂时不能享受VIP客户服务。')
                }else{
                    if(result.data.effectiveStatus=="1"){//	对正常有效期内VIP客户
                        $(".txt_").text( '提示：有效期更新后根据星点值重新计算星级')
                    }
                    if(result.data.effectiveStatus=="0"){//	对维持有效期内客户
                        $(".txt_").text( '提示：您当前处于维持有效期，'+endData+'前您将继续享有'+result.data.lvName+'级服务，维持有效期更新后根据星点值重新计算星级')
                    }
                }
                }
           

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
            //根据性别判断用户的头像
            if(result.data.agentGender=="2"){//客户是2的话 是女  其他是男
                $(".people").css("background","url(../img/nv.png)no-repeat")
            }else  if(result.data.agentGender=="1"){
                $(".people").css("background","url(../img/ren.png)no-repeat")
            }

    
            //联系人点击事件
            $("#btn").on("click",function(){

                ecss.log( paramsAdd("0001-0008"));
                $("#mask").show();
                $(".iphone").show();
                $("#iphoneNum").text(result.data.agentTel);
                $("#call a").attr("href","tel:"+result.data.agentTel)
            });
        }else{
            alertify.alert(result.message);
        }

    });
    //联系人取消按钮
    $("#chanel").on("click",function(){
        $("#mask").hide();
        $(".iphone").hide()
    });
   //埋点集合
    function paramsAdd(operationid){
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
                "p1":"",
                "p2":comm.getQueryString("partId"),//partId
                "p3":provCode,//branchId
                "p4":"",
                "p5":""
            }
        }
        return params;
    }



});