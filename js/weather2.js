var weather=function(){
	var tmp=0;
	var style='qq';
	var SWther={};
    this.getWeather=function(city,type){//根据city的值获取天气信息
		$.getScript("http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=2&city="+city+"&dfc=3",function(){echo(city);});}
		
	function dis_img(weather){//显示不同天气对应的图片
		var route="qq/";//文件夹路径
		if(style=='unknow'){var forder='unknow';}
		  else{var forder='';}
		var style_img="http://www.bhly.cn/Content/Images/uploaded/s_13.png";
		if(weather.indexOf("多云")!==-1||weather.indexOf("晴")!==-1){//多云转晴，以下类同 indexOf:包含字串
			style_img="http://www.bhly.cn/Content/Images/uploaded/s_1.png";}
		else if(weather.indexOf("多云")!==-1&&weather.indexOf("阴")!==-1){
			style_img="http://www.bhly.cn/Content/Images/uploaded/s_2.png";}
		else if(weather.indexOf("阴")!==-1&&weather.indexOf("雨")!==-1){
			style_img="http://www.bhly.cn/Content/Images/uploaded/s_3.png";}
		else if(weather.indexOf("晴")!==-1&&weather.indexOf("雨")!==-1){
			style_img="http://www.bhly.cn/Content/Images/uploaded/s_3.png";}
		else if(weather.indexOf("晴")!==-1&&weather.indexOf("雾")!==-1){
			style_img="http://www.bhly.cn/Content/Images/uploaded/s_12.png";}
		else if(weather.indexOf("晴")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_13.png";}
		else if(weather.indexOf("多云")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_2.png";}
		else if(weather.indexOf("阵雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_3.png";}
	    else if(weather.indexOf("小雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_3.png";}
		else if(weather.indexOf("中雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_4.png";}
		else if(weather.indexOf("大雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_5.png";}
		else if(weather.indexOf("暴雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_5.png";}
		else if(weather.indexOf("冰雹")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_6.png";}
		else if(weather.indexOf("雷阵雨")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_7.png";}
		else if(weather.indexOf("小雪")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_8.png";}
		else if(weather.indexOf("中雪")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_9.png";}
		else if(weather.indexOf("大雪")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_10.png";}
		else if(weather.indexOf("暴雪")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_10.png";}
		else if(weather.indexOf("扬沙")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_11.png";}
		else if(weather.indexOf("沙尘")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_11.png";}
		else if(weather.indexOf("雾")!==-1){style_img="http://www.bhly.cn/Content/Images/uploaded/s_12.png";}
		else{style_img="http://www.bhly.cn/Content/Images/uploaded/s_2.png";}
        
		return style_img;
		}
		
	function echo(city){
	//console.log(window.SWther.w[city]);
	if(window.SWther.w[city]===undefined){alert('请输入一个正确的城市名称');return false;}
    uisy.query('return');
	$('#city').html(city);
	$('#weather').html(window.SWther.w[city][0].s1);
	$('#temperature').html(window.SWther.w[city][0].t1+'&deg;');
	$('#wind').html(window.SWther.w[city][0].p1);
	$('#direction').html(window.SWther.w[city][0].d1);
	$('#T_weather').html(window.SWther.w[city][0].s1);
	var T_weather_img=dis_img(window.SWther.w[city][0].s1);//今天天气的参数传递
	$('#T_weather_img').html("<img src='"+T_weather_img+"' title='"+window.SWther.w[city][0].s1+"' alt='"+window.SWther.w[city][0].s1+"' />");
	$('#T_temperature').html(window.SWther.w[city][0].t1+'&deg;-'+window.SWther.w[city][0].t2+'&deg;');
	$('#T_wind').html(window.SWther.w[city][0].p1);
	$('#T_direction').html(window.SWther.w[city][0].d1);
	$('#M_weather').html(window.SWther.w[city][1].s1);
	var M_weather_img=dis_img(window.SWther.w[city][1].s1);
	$('#M_weather_img').html("<img src='"+M_weather_img+"' title='"+window.SWther.w[city][1].s1+"' alt='"+window.SWther.w[city][1].s1+"' />");
	$('#M_temperature').html(window.SWther.w[city][1].t1+'&deg; ~ '+window.SWther.w[city][1].t2+' &deg;');
	$('#M_wind').html(window.SWther.w[city][1].p1);
	$('#M_direction').html(window.SWther.w[city][1].d1);
	$('#L_weather').html(window.SWther.w[city][2].s1);
	var L_weather_img=dis_img(window.SWther.w[city][2].s1);
	$('#L_weather_img').html("<img src='"+L_weather_img+"' title='"+window.SWther.w[city][2].s1+"' alt='"+window.SWther.w[city][2].s1+"' />");
	$('#L_temperature').html(window.SWther.w[city][2].t1+'&deg; ~ '+window.SWther.w[city][2].t2);$('#L_wind').html(window.SWther.w[city][2].p1);
	$('#L_direction').html(window.SWther.w[city][2].d1);}}
    var uisy={
		query:function(ent){//切换状态
			if(ent=='search'){
				$('#weather_sub >input').disabled===true;
				$('#weather_res_case').fadeOut(500,function(){$(this).addClass('common_hide')})}
            else if(ent=='return'){//出现下面的元素
				$('#weather_sub >input').disabled===false;
				$('#weather_res_case').fadeIn(500,function(){$(this).removeClass('common_hide')})}}
	    }
    var onEvent={
		onEvent:function(){
			var has_daluzai=onEvent.daluzai();
		    if(has_daluzai===true){
			    $('#weather_sub >input').click(function(){onEvent.searchWeather();})
					Enter_Ctrl('weather_search',13,"onEvent.searchWeather()");
					}},
					
		searchWeather:function(){
					uisy.query('search');
					var city=$('#weather_search >input').val();
					city=$.trim(city);weather_.getWeather(city);},
					
		daluzai:function(){
						var has_author=$('#weather_author');
						if(has_author.length===0){return false;}
						else{has_author.click(function(){go_URL('blank','http://www.cnblogs.com/blue-lg/archive/2012/03/04/2379564.html');})
							return true;}},
							
		killError:function(){
					   function killErrors(){return true;}
					   window.onerror=killErrors;}
}


//页面以某方式跳转到某页面
function go_URL(type,url){if(type=='blank'){window.open(url,'');}else{window.location=url;}}

//利用keycode=13使得回车与点击查询按钮功能一致
function Enter_Ctrl(get_id,ent,fun){
	if(typeof(get_id)=='undefined'||get_id==''){//若get_id对象非空，则绑定keypress事件！
		var set_obj=$(document);}
	else{var set_obj=$('#'+get_id);}
    
	if(ent==13){
		set_obj.keypress(function(e){if(e.which==13||e.which==10){eval(fun);}})}
	else{set_obj.keypress(function(e){if(e.ctrlKey&&e.which==13||e.which==10){eval(fun);}})}
	
}
//
function def_value(get_id,msg){//输入框的默认提示
	var set_obj=$('#'+get_id).find('input');
    if(set_obj.val()==""){
		set_obj.val(msg);
		set_obj.css('color','#949494');
	}
    set_obj.click(function(){
		if($(this).val()==msg){
			$(this).val('');
			set_obj.css('color','');
		}});
	set_obj.bind("blur",function(){
		if($(this).val()==''){
			$(this).val(msg);
			set_obj.css('color','#949494');
		}});
}