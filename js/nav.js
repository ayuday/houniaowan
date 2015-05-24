$(function(){
	var w1 = $('.suite').outerWidth();
	$('.suite').css({left:-w1});
	$(window).resize(function(){
        var w1 = $('.suite').outerWidth();
		$('.suite').css({left:-w1});
    });
	var _index;
	/*$('.nav li').mousemove(function(e) {
        $('#suitepan').css({'z-index':'8'})
    });*/
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
		/*$('.kf').css({'z-index':'8'})*/
	});
});