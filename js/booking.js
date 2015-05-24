//Parameter
var hotelCode="03964", language="cn", decorate = false;	//code根据酒店进行修改
var hotelName = "三亚君澜度假酒店";
//var prefixURL = "http://211.144.87.40/dhsite";

//lightbox跳出窗口
var GB_ROOT_DIR = "../booking/greybox/";
$import("/booking/greybox/AJS.js","js");
$import("/booking/greybox/gb_scripts.js","js");

//lightbox结束
$import("/booking/my97/WdatePicker.js","js");//日历
//$import("../script/calendar/calendar.js","js");//日历
//$import("/hcrm/website/hotelhome/js/md5.js","js");//登录加密
$import(prefixURL + "/explore/js?hc=" + hotelCode,"js");

//********日期函数********
var gDateDelimiter="-";		//日期分隔符
function gGetDateTimeStr(iChoice,oDate){
	var yy=oDate.getFullYear(), mm=oDate.getMonth()+1, dd=oDate.getDate();
	var hh=oDate.getHours(), nn=oDate.getMinutes(), ss=oDate.getSeconds();
	if(mm<10) mm="0"+mm;
	if(dd<10) dd="0"+dd;
	if(hh<10) hh="0"+hh;
	if(nn<10) nn="0"+nn;
	if(ss<10) ss="0"+ss;
	if(iChoice==0) return (yy+gDateDelimiter+mm+gDateDelimiter+dd);
	if(iChoice==1) return (hh+":"+nn+":"+ss);
	if(iChoice==2) return (yy+gDateDelimiter+mm+gDateDelimiter+dd+" "+hh+":"+nn+":"+ss);
	return "";
}
function gDateAdd(dateStr,addYear,addMonth,addDate){
	var dt=new Date(Date.parse(gReplace(dateStr,"-","/")));
	dt.setFullYear(dt.getFullYear()+addYear);
	dt.setMonth(dt.getMonth()+addMonth);
	dt.setDate(dt.getDate()+addDate);
	return gGetDateTimeStr(0,dt);
}
function gGetToday(){
	return gGetDateTimeStr(0,new Date());
}
function gReplace(src,sFor,sBy){
	if(sFor==""||sBy=="") return src;
	for(var l=sFor.length,s="",p0=0,p;(p=src.indexOf(sFor,p0))>=0;s+=src.substring(p0,p)+sBy,p0=p+l);
	return (s+src.substring(p0));
}
//********日期函数结束********

//预订自动加载时间
function MM_preloadcalendar() { //v3.0
  try{
	var sdt=gGetToday();
	var f=document.queryPriceForm;
	f.checkInDate.value=sdt;
	f.checkOutDate.value=gDateAdd(sdt,0,0,1);		
	f.hotelCode.value=hotelCode;
	f.language.value=language;
	f.action="/hcrm/"+language+"/hotelhome/"+hotelCode+"/reservation-booking.jsp";
  }
  catch (e){
  }
}
MM_preloadcalendar();

function afterSetDay(){
	//check checkinDate
	var f=document.forms.queryPriceForm;
	if(outObject.name=="checkInDate" && f.checkInDate.value>=f.checkOutDate.value)	
		f.checkOutDate.value=gDateAdd(f.checkInDate.value,0,0,1);
	else if(outObject.name=="checkOutDate" && f.checkInDate.value>f.checkOutDate.value)
		f.checkInDate.value=gDateAdd(f.checkOutDate.value,0,0,-1);
}

//用户登录
function validate(){
	var f=document.forms.loginForm;
	f.hotelCode.value=hotelCode;
	f.language.value=language;
	if (f.loginName1.value==""){
		window.alert("用户名不能为空！");
		f.loginName1.focus();
		return false;
	}
	if (f.password1.value==""){
		window.alert("密码不能为空！");
		f.password1.focus();
		return false;
	}
	f.password.value=f.password1.value;
	f.loginName.value=f.loginName1.value;
	f.password1.value="";
	f.loginName1.value="";
	return true;
}

//Login
function g_login(){
	var f = document.forms.loginForm;
	var loginName = encodeURI(f.loginName1.value);
	var password = f.password1.value;
	DH6.login(loginName, password, language, decorate, function(url){
		var vv2 = url+"&t="+new Date().getTime();
//		alert(vv2);
		openWinOrForwardUrl(vv2, 600, 800);
		//window.open(vv2, "xxx");
	})
}

//Query rate
function queryPrice(){
	doQueryPrice(true);
}

function queryPrice2(){
	doQueryPrice(false);
}

function queryPriceWithDate(checkinId, checkoutId, isShowRsvCode) {
	var f = document.forms.queryPriceForm;
    var vCheckin = document.getElementById(checkinId).value;
    var vCheckout = document.getElementById(checkoutId).value;
    if (vCheckin < gGetToday()) {
        alert("入住日期先于今日！");
        document.getElementById(checkinId).value = gGetToday();
        document.getElementById(checkoutId).value = gDateAdd(vCheckin, 0, 0, 1);
        return false;
    }
    if (vCheckin >= vCheckout) {
        alert("离店日期先于入住日期！");
        return false;
    }
    if (vCheckout > gDateAdd(vCheckin, 1, 0, 0)) {
        alert("入住时间大于一年！");
        document.getElementById(checkoutId).value = gDateAdd(vCheckin, 1, 0, 0);
        return false;
    }
    var paction = "checkin=" + vCheckin + "&checkout=" + vCheckout + "&rooms=" + f.roomNum.value + "&adults=" + f.adults.value;
    if (isShowRsvCode) {
        paction += "&showRsvCode=true";
    }
    openWinOrForward("booking/query", 600, 800, paction);
}

function doQueryPrice(isShowRsvCode){
	var f=document.forms.queryPriceForm;
	if(f.checkInDate.value<gGetToday()){
		alert("入住日期先于今日！");
		f.checkInDate.value=gGetToday();
		f.checkOutDate.value=gDateAdd(f.checkInDate.value,0,0,1);
		return false;
	}
	
	if(f.checkInDate.value>=f.checkOutDate.value){
		alert("离店日期先于入住日期！");
		return false;
	}
	if(f.checkOutDate.value>gDateAdd(f.checkInDate.value,1,0,0)){
		alert("入住时间大于一年！");
		f.checkOutDate.value=gDateAdd(f.checkInDate.value,1,0,0);
		return false;
	}

	var paction = "checkin="+f.checkInDate.value 
		+"&checkout="+f.checkOutDate.value+"&rooms="+f.roomNum.value+"&adults="+f.adults.value;
	if (isShowRsvCode) {
		paction += "&showRsvCode=true";
	}
	openWinOrForward("booking/query", 600, 800, paction);
}

function queryRoomPrice(roomTypeId){
	var paction = "roomTypeId="+roomTypeId;
	openWinOrForward("booking/query", 600, 800, paction);
}

//My booking
function mybooking(){
	openWinOrForward("order/query", 600, 800);
}

//Get Password
function findPassword(){
	openWinOrForward("entry/find-pwd", 600, 800);
}

//Register
function register(){
	openWinOrForward("entry/sign-up", 600, 800);
}

//News more
//function onLoadWebNews(){
//	top.location="/hcrm/website/hotelhome/"+hotelCode+"/cn/allNews.jsp?hotelCode="+hotelCode+"&langCode="+language+"&type=1";
//}

//Promotion more
//function onLoadPromotions(){
//	top.location="/hcrm/website/hotelhome/"+hotelCode+"/cn/allNews.jsp?hotelCode="+hotelCode+"&langCode="+language+"&type=0";
//}

function basicParams(){
	return "?hc=" + hotelCode + "&lr=" + language + "&de=" + decorate;
}

function openWinOrForward(action, height, width, params) {
	var url = prefixURL + "/" + action + basicParams();
	if (params) {
		url = url + "&" + params;
	}
	openWinOrForwardUrl(url, height, width);
}

function openWinOrForwardUrl(url, height, width) {
	if (decorate) {
		location.href = url;
	} else {
		GB_showCenter(hotelName, url, height, width);//酒店名字，高，宽，根据需要修改。
	}
}

function $import(path, type){
  if (type == "css") {
      document.write("<" + "link rel=\"stylesheet\" rev=\"stylesheet\" href=\"" + path + "\" type=\"text/css\" media=\"screen\" />");
  } else {
      document.write("<" + "script src=\"" + path + "\" type=\"text/javascript\"></" + "script>");
  }
}




//date util
function checkMultiDate(checkinId, checkoutId) {
	var vCheckin = document.getElementById(checkinId).value;
	var vCheckout = document.getElementById(checkoutId).value;
	var now = new Date();
	if (vCheckin == "")	{
		document.getElementById(checkinId).value = dateOffset(now, 1).format("yyyy-MM-dd");
		document.getElementById(checkoutId).value = dateOffset(now, 2).format("yyyy-MM-dd");
	}
}

function dateOffset(date, addDays) {
	var c = new Date().getTime()+(addDays*24*60*60*1000);
	return new Date(c);
}

Date.prototype.format = function(format) //author: meizz 
{ 
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(),    //day 
    "h+" : this.getHours(),   //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1, 
    (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o)if(new RegExp("("+ k +")").test(format)) 
    format = format.replace(RegExp.$1, 
      RegExp.$1.length==1 ? o[k] : 
        ("00"+ o[k]).substr((""+ o[k]).length)); 
  return format; 
}

//判断登录的，基本上不需要改动 //如有需要改动地址，这边也请加上！
/**
function ajax_validate(){	
	var url = '/hcrm/website/hotelhome/logon.jsp';
	var f=document.forms.loginForm;
	var paras = 'hotelCode='+f.hotelCode.value
				+'&language='+f.language.value
				+'&loginName='+f.loginName.value
				+'&password='+f.password.value;	
	var result={};
	var request = new XmlRequest();
	if (request){
	  var connect = request.connect(
	  	url,
	  	'post',
	  	paras,
	  	function(x){
	  	  try{
	  	    result=eval(x.responseText);
	  	    if (!result.isSuccess){
	  	  	  if (result.msg)alert(result.msg);
	  	    }
	  	  }catch(e){}
	  	}
	  );
	  if (!connect){
	  	return false;
	  }
	}else{
	  alert("XMLHttpRequest not available. Try a newer/better browser.");
	  return false;
	}
	return (!result.isSuccess)?false:result.isHotel?'hotel':'guest';
}
function XmlRequest(){
  var request,cp;
  try{request=new ActiveXObject("Msxml2.XMLHTTP");}
  catch(e){try{request=new ActiveXObject("Microsoft.XMLHTTP");}
  catch(e){try{request=new XMLHttpRequest();}
  catch(e){request=false;}}}
  if(!request)return null;
  this.connect=function(url,m,v,fn){
    if(!request)return false;
    cp=false;
    m=m.toUpperCase();
    try{
      if(m=="GET"){
        request.open(m,url+"?"+v,false);
        v="";
      }else{
        request.open(m,url,false);
        request.setRequestHeader("Method","POST "+url+" HTTP/1.1");
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      }
      request.send(v);
	  
	if (request.readyState == 4) {
		if (request.status == 200) {
			fn(request);
		}
	}

    }
    catch(z){return false;}
    return true;
  };
  return this;
}
**/

function querySpecial(rateType, rateId, isShowRsvCode) {//优惠页面直接预订
    var url = prefixURL + "/" + "booking/query" + basicParams() + "&rateType=" + rateType + "&rateId=" + rateId;
    if (isShowRsvCode) {
        url += "&showRsvCode=true";
    }
    openWinOrForwardUrl(url, 600, 800);
}