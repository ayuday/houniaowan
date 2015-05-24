//模拟下拉框
$(document).ready(function(){
	$(".huiy,#wx").click(function(){
		$("#wx").toggle();
	});

	var contain_W = $('.sub-about').width();

	//返回顶部
	
	$('.sub-about').append('<div class="backtopbox" id="go_top_panel"><a class="backtop" href="javascript:scroll(0,0)"></a></div>');
	$('.backtop').click(function(){
		$("html, body").animate({
			scrollTop: 0
		},
		500)
	});
	
	$backToTopFun = function () {
		var st = $(document).scrollTop(),
		winh = $(window).height(); (st > 0) ? $('.backtop').show().css("display","block") : $('.backtop').hide();
		
	};
	$(window).bind("scroll", $backToTopFun);

	$('#go_top_panel').css({
		left: contain_W+350
	});
	//客服
	$('.kf-btn').click(function(){
		$(this).toggleClass('kf-btn-on');
		if($(this).hasClass('kf-btn-on')){
			$('.kf-pan').animate({"width":36},330);
		}else{
			$('.kf-pan').animate({"width":190});
		}
	});

	//浮动
	function FloatKf(op) {
		var $win = $(window);
		var $winH = $win.height();
		var scro = function() {
			$(op).animate({top:($winH-$(op).height())/2+$win.scrollTop()-30},{duration:300,queue:false});
		};
		scro();
		$win.scroll(function() {
			scro();
		});
	}
	FloatKf('.kf-pan');
  	
  	

  	
  	//预订展开
	var bookvar= 0;
	$('.bookswitch').on('click',function(){
		if(bookvar==0){
			HBox = $('.bookbox').height();
			$('span',this).html('收起');
			$('i',this).addClass('on');
			bookvar=1;
			
			$('.book_cc').stop().animate({
				height:HBox+10
			},{duration:1000,queue:false});
		}
		else{
			$('span',this).html('展开');
			$('i',this).removeClass('on');
			bookvar=0;
			$('.book_cc').stop().animate({
				height:0
			},'fast');
		}
	});
	
	/*下拉选择*/
	$('.selected').on('click',function(){
		$(this).children('i').toggleClass('on');
		$(this).next('ul').slideToggle('fast');
	});
	
	$('.select ul').mouseleave(function(){
		$(this).slideUp('fast');
		$(this).prev('.selected').children('i').removeClass('on');
	});
	
	$('.select li').on('click',function(){
		$(this).parent().prev('.selected').children('.selected-txt').html($(this).attr('data-type'));
		$(this).parent().next('.selected-value').attr('value',$(this).attr('data-type'));
		$(this).parent().prev('.selected').children('i').removeClass('on');
		$(this).parent('ul').slideToggle('fast');
	});
  
  	
  
  	//天气
	//$('.tianqi').append('<iframe allowtransparency="true" frameborder="0" width="180" height="36" scrolling="no" src="http://tianqi.2345.com/plugin/widget/index.htm?s=3&z=3&t=0&v=0&d=1&bd=0&k=000000&f=004080&q=1&e=0&a=0&c=59644&w=180&h=36&align=center"></iframe>');
	
	

/*新增-------------------------------------------------*/
/*导航图片切换效果*/
	var w1 = $('.suite').outerWidth();
	$('.suite').css({left:-w1});
	$(window).resize(function(){
        var w1 = $('.suite').outerWidth();
		$('.suite').css({left:-w1});
    });
	var _index;
	
	$('.nav li.nav_down').hover(function(){
		_index = $(this).index();
		$('#suitepan').css({"z-index":'15'});
		$('.kf > *').eq(_index).stop().animate({left:0},1000);
		$('.nav li').eq(_index).addClass('nav_non');
		/*$('.kf').css({'z-index':'15'})*/
		
	},function(){
		$('.nav li').eq(_index).removeClass('nav_non');
		$('.suite').stop().animate({left:-w1},{duration:1000,queue:false});
		$('.suite'+(_index+1)).stop().animate({left:-w1},{duration:1000,queue:false});
		$('.suite'+(_index+1)).mouseenter(function(){
			$('.suite'+(_index+1)).stop().animate({left:0},{duration:1000,queue:false});
			$('.nav li').eq(_index).addClass('nav_non');
			$('.kf').css({'z-index':'15'})
		});
		
		$('.suite'+(_index+1)).mouseleave(function(e) {
            $('.suite'+(_index+1)).stop().animate({left:-w1},{duration:1000,queue:false});
			$('.nav li').eq(_index).removeClass('nav_non');
			//$('.kf').css({'z-index':'8'})
			$('#suitepan').stop().animate({"z-index":8},{duration:1000,queue:false});
        });
		$('#suitepan').stop().animate({"z-index":8},{duration:1000,queue:false});
		
	});
	
	
	$('.leftsidebar,.nav li,.nav li a').mouseover(function(e) {
        $('#suitepan').css({"z-index":'15'});
    });


    //图片列表视频列表
    $('.change-color dl').hover(function() {
    	var self = this;
    	$(this).find(".title").stop(true,false).animate({borderBottomColor:'#1C457C'});
		$(this).find(".title a").stop(true,false).animate({color:"#fff"},100);
		$(this).find(".coms").stop(true,false).animate({color:"#fff",borderTopColor:'#1C457C'},400);
		
		$(this).find(".a5").stop(true,false).animate({opacity:1},150);
		$(this).find(".a1").stop(true,false).delay(250).animate({height:'160'},200);
		$(this).find(".a2").stop(true,false).delay(250).animate({height:'160'},200,function(){
			$(self).find(".a3").stop(true,false).animate({width:'50%'},100);
			$(self).find(".a4").stop(true,false).animate({width:'50%'},100);
		});
    }, function() {
    	var self = this;
    	$(this).find(".a3").stop(true,false).animate({width:'0'},100);
		$(this).find(".a4").stop(true,false).animate({width:'0'},100);
		$(this).find(".a1").stop(true,false).delay(200).animate({height:'0'},200);
		$(this).find(".a2").stop(true,false).delay(200).animate({height:'0'},200);
		
		$(this).find(".a5").stop(true,false).delay(500).animate({opacity:0},100);
		$(this).find(".title").stop(true,false).delay(400).animate({borderBottomColor:'#C9C9C9'},400);
		$(this).find(".title a").stop(true,false).delay(400).animate({color:"#2A2B2C",borderBottomColor:'#C9C9C9'},400);
		$(this).find(".coms").stop(true,false).delay(400).animate({color:"#999999",borderTopColor:'#ffffff'},400);
    });
	
	$('.worksimg').hover(function() {
		$('.wzoom', this).stop().animate({
			top: '50px'
		},
		"0.3");
	}, function() {
		$('.wzoom', this).stop().animate({
			top: '-50px'
		},
		"0.3");
	});
});




