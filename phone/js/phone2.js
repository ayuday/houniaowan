var config = {
		h: $(window).height(),
		w: $(window).width(),
		amount: '10',//每页条数
		now_page: 1,//初始页
		cid: 1 ,//默认分类id
		search:''
	};
;
(function($){
	var dd = 0;
	var touchEnd;
	//页面加载 文档流加载完取消loading class=loading
	$(window).bind('DOMContentLoaded', function() {
		setTimeout(function() {
			if (!document.getElementById('newwrap')) {
				img_loader();
			}
			$('html').removeClass('loading');
		}, 400);
	});

	$(window).bind('load', function() {
		reset();
	});
	$(window).bind('resize', function() {
		reset();
		$('.works').each(function() {
			$(this).find('img').attr('width', '').attr('height', '');
		});
	});

	function reset() {
		config.w = $(window).width();
		config.h = $(window).height();
		$('#menu').height(config.h);
		config.ww = $('.website').width();
		$('.website li,.website').width(config.ww);
		config.wl = $('.website li').length;
		$('.website ul').width(config.wl * config.ww);
		$('.ct').height(config.h - 60);
		if ($('.title_d').width() - $('.title').width() > 0) {
			$('.title_d').addClass('round');
		} else {
			$('.title_d').removeClass('round');
		};
		if (document.getElementById('newwrap_t')) {
			$('#newwrap_t,#newwrap').width(config.w);
		}
		$('#myfavorites li').width(($('#myfavorites ul').width() - 10) / 2);
		$('#myfavorites li span').width(($('#myfavorites li').width() - 20) / 3);
	}


	function tcst() {
		$('#list li').bind('touchstart touchmove touchend', function(e) {
			if (e.type == 'touchstart') {
				$(this).addClass('touch');
			} else if (e.type == 'touchend') {
				$(this).removeClass('touch');
			} else {
				var _this = $(this);
				clearTimeout(touchEnd);
				touchEnd = setTimeout(function() {
					_this.removeClass('touch');
				}, 100);
			}
		});
	}
	tcst();

	
	// 菜单点击动画
	$('.menu_open').bind('click', function(e) {

		if ($('#container').hasClass('pull') == false) {

			if (dd == 0) {
				
				$('#container,#menu,#header,#us_panel').addClass('push');
				dd = 1;
				
				$('#us_panel').addClass('hide');
			} else {
			
				$('#container,#menu,#header,#us_panel').removeClass('push');
				dd = 0;
				$(window).unbind('touchmove');
			};
		}
		return false;
	});

	// 用户点击动画
	$('.search_open').bind('click', function(e) {
		if ($('#container').hasClass('push') == false) {
			if (dd == 0) {
				$('#container,#user,#header,#us_panel').addClass('pull');
				dd = 1;
				
				$('#us_panel').addClass('hide');
			} else {
				$('#container,#user,#header,#us_panel').removeClass('pull');
				dd = 0;
				
			}
		}
		return false;
	});
	$('.push_msk').bind('touchmove', function(e) {
		if ($('#container').hasClass('pull')) {
			$('.search_open').trigger('click');
		} else if ($('#container').hasClass('push')) {
			$('.menu_open').trigger('click');
		}
		return false;
	});
	// 分类属性点击
	$('.hd .fr,.ct_submit,.user_logout,.comment_reply_submit,.more_comment,.visit_site a,.sort_b,.cancel_share a,.message_system li,.delete_check_sure,.delete_check_cancel,#choose_album li a').bind('touchstart touchend', function(e) {
		if (e.type == 'touchstart') {
			$(this).addClass('ton');
		} else {
			$(this).removeClass('ton');
		}
	});

	//弹出层
	$('#sort td').bind('click', function() {
		$('#sort_content').addClass('show');
		$('.asort').eq($(this).index()).addClass('show');
	});
	// 关闭弹出层
	$('.asort .hd .fr').bind('click', function() {
		$('#sort_content').removeClass('show');
		var _this = $(this);
		setTimeout(function() {
			_this.parent().parent().parent().removeClass('show');
		}, 300);
	});

	// 点击分享
	$('.menu_share').click(function() {
		$('#share').addClass('show');
		$(window).bind('touchmove', function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
		});
	});
	$('.cancel_share,.share_msk').click(function() {
		$('#share').removeClass('show');
		$(window).unbind('touchmove');
	});
	// 所有链接事件
	$('a').click(function() {
		var _this = $(this);
		if (_this.parent().hasClass('menu_back')) {
			if (window.parent.document.getElementById('newwrap')) {
				var d = $(window.parent.document).find('#newwrap').attr('dataurl'),
					dt = $(window.parent.document).find('#newwrap').attr('datatitle');
				$(window.parent.document).find('#newwrap_t').removeClass('show');
				$(window.parent.document).find('#header,#container').removeClass('newframe');
				setTimeout(function() {
					$(window.parent.document).find('#newwrap').attr('src', '');
				}, 400);
				window.parent.history.replaceState(null, dt, d);
				window.parent.document.title = dt;
				_this.attr('href', '');
				$('.alist').openNewFrame();
			} else {
				$('html').addClass('loading2');
				$('html').addClass('loading');
				setTimeout(function() {
					window.location.href = _this.attr('href');
				}, 200);
			}
			return false;
		} else if (_this.parent().hasClass('menu_back2')) {
			$('html').addClass('loading2');
			$('html').addClass('loading');
			setTimeout(function() {
				window.location.href = _this.attr('href');
			}, 200);
		} else if (_this.parent().hasClass('sort_b') || _this.parent().hasClass('home_profile_c') || _this.parent().hasClass('cancel_share') || _this.parent().hasClass('relationship') || _this.attr('id') == 'reg_now' || _this.attr('class') == 'login_submit' || _this.attr('class') == 'more_comment' || _this.attr('class') == 'delete_check_sure' || _this.attr('class') == 'delete_check_cancel' || _this.attr('href') == '' || _this.attr('href') == '#' || _this.attr('href') == 'javascript:void(0);' || $(this).attr('target') == "_blank") {} else {
			$('html').addClass('loading');
			setTimeout(function() {
				window.location.href = _this.attr('href');
			}, 400);
			return false;
		}
	});
	

	var reply_lock = false;
	$('#content').bind('touchstart touchmove touchend', function(e) {
		if ($('#container').hasClass('push') == false && $('#container').hasClass('pull') == false) {
			var t = event.touches[0];
			if (e.type == 'touchstart') {
				config.touchY = t.pageY;
			} else if (e.type == 'touchmove') {
				config.touchEY = t.pageY - config.touchY;
				if (config.touchEY > 0) {
					$('#header,#us_panel,#us_panel2').removeClass('hide');
					$('.post_comment_content textarea').blur();
					$('.post_comment_content,#send_msg').removeClass('show');
					$('#us_panel').css({
						'position': 'fixed',
						'bottom': '0'
					});
					reply_lock = false;
				} else if (config.touchEY < 0) {
					$('#header,#us_panel,#us_panel2').addClass('hide');
					$('.post_comment_content textarea').blur();
					$('#us_panel').css({
						'position': 'fixed',
						'bottom': '0'
					});
					$('.post_comment_content,#send_msg').removeClass('show');
					reply_lock = false;
				}
			} else {}
		}
	});
	
	// ajax加载分类数据
	var dt = ['', '', '', ''],
		scLock;
	$('.ct li').click(function() {
		if (document.getElementById('add_favorites_choose')) {
			var _this = $(this),
				d = $(this).attr('data-id');
			if ($(this).hasClass('a_selected') == false) {
				$.post("http://www.xxx.com/service/addLike", {
					timestamp: YYToken.timestamp,
					token: YYToken.token,
					postid: commentId2,
					cid: d
				}, function() {
					_this.siblings().removeClass('a_selected');
					_this.addClass('a_selected');
					$('#add_favorite .hd .fr').trigger('click');
					$('.us_panel_like').addClass('liked');
					$('.us_panel_like span em').html(parseInt($('.us_panel_like span em').html()) + 1);
				});
			}
		} else {
			var v = $(this).find('span').html();
			var i = $(this).parent().parent().parent().parent().index();
			if ($(this).hasClass('a_selected') && $(this).find('.s').attr('class') == undefined) {
				var _this = $(this);
				dt[1] = '';
				$.get('http://www.xxx.com/list/', {
					fid: dt[0],
					owner: dt[1],
					sort: dt[2],
					search: search_value
				}, function(data) {
					$('.sort_tag .sort_b_inner span').html('检索列表');
					var v = $(data).find('#list ul').html();
					$('#list ul').html(v);
					tcst();
					_this.removeClass('a_selected');
					var dd = _this.parent().parent().parent().parent().find('.fr');
					dd.trigger('click');
					$('.alist').openNewFrame();
				});
			} else {
				$(this).parent().parent().find('li').removeClass('a_selected');
				$(this).addClass('a_selected');
				if ($(this).attr('c_data')) {
					if ($(this).attr('c_data') != '') {
						dt[0] = $(this).attr('c_data');
					} else {
						dt[0] = '';
					}
				} else if ($(this).attr('t_data')) {
					dt[1] = $(this).attr('t_data').substring($(this).attr('t_data').indexOf('=') + 1, $(this).attr('t_data').length);
				} else {
					dt[2] = $(this).attr('s_data');
				}
				var dd = $(this).parent().parent().parent().parent().find('.fr');
				$.get('http://www.xxx.com/list/', {
					fid: dt[0],
					owner: dt[1],
					sort: dt[2],
					search: search_value
				}, function(data) {
					var v = $(data).find('#list ul').html();
					$('#list ul').html(v);
					dd.trigger('click');
					tcst();
					$('.alist').openNewFrame();
				});
				$('#sort td').eq(i).find('.sort_b_inner span').html(v);
				if ($(this).find('.s').attr('class')) {
					var d = $(this).find('.s').attr('class');
					$('#sort td').eq(i).find('.sort_b_inner i').attr('class', d);
				}
			}
			scLock = true, now_page = 1;
			$('.list_loading').html('<i></i><span>努力加载中...</span>');
		}
	});
	//列表滚动ajax加载
	if (document.getElementById('list')) {
		$(window).bind('load', function() {
			scLock = true;
			$('.alist').openNewFrame();
			$('#container').bind('scroll', function() {
				var t = $('#container').scrollTop();
				console.log(t);
				if (t >= ($('#list').height() - $(window).height()) && scLock == true) {
					config.now_page++;
					scLock = false;
					$.get('http://bh.houniaowan.com.cn/portal/ajax/index', {
						page: config.now_page,
						cid: config.cid,
						amount: config.amount,
						search: config.search_value
					}, function(data) {
						console.log(data);
						var outstr ='';
						if(data.status){
							$.each(data, function(index, val) {
								 
								outstr +='<li><div class="wrap"><a class="alist" vhref="/item/'+val.tid+'.html">';
								outstr +='<div class="list_litpic fl"><img src="phone/1429848259756.png"></div>';
								outstr +='<div class="list_info">';
								outstr +='<h4>'+val.post_title+'</h4>';
								outstr +='<h5>by<span>CDS中国设计师沙龙</span><em>(其他平面)</em></h5>';
								outstr +='<div class="list_info_i">';
								outstr +='<dl class="list_info_views"><dt></dt><dd>17248</dd><div class="clear"></div></dl>';
								outstr +='<dl class="list_info_comment"><dt></dt><dd>23</dd><div class="clear"></div></dl>';
								outstr +='<dl class="list_info_like"><dt></dt><dd>22</dd><div class="clear"></div></dl>';
								outstr +='<div class="clear"></div>';
								outstr +='</div>';
								outstr +='</div><div class="clear"></div></a></div></li>';

							});
							$('#list ul').append(outstr);
							scLock = true;
						}
						else{
							$('.list_loading').html('<span>没有了!</span>');
						}
						// var v = $(data).find('#list ul').html();
						// $('#list ul').append(v);
						// var patt1 = new RegExp("alist");
						// if (patt1.test(v)) {
						// 	scLock = true;
						// } else {
						// 	$('.list_loading').html('<span>没有了!</span>');
						// }
						// tcst();
						// $('.alist').openNewFrame();
					});
				}
			});
		});
	}

	// 定义打开窗口函数
	var _thist_ = document.title,
		thistd = window.location.href;
	$.fn.openNewFrame = function() {
		$(this).click(function() {
			var _thisv = $(this).attr('vhref'),

				_thist = $(this).find('.list_info h4').html();
			if (document.getElementById('newwrap')) {
				$('#newwrap').attr('src', _thisv).attr('dataurl', thistd).attr('datatitle', _thist_);
				$('#newwrap_t').addClass('show');
				history.replaceState(null, _thist, _thisv);
				document.title = _thist;
				$('#header,#container').addClass('newframe');
			}
		});
	};
	$('.alist').openNewFrame();
	// 图片加载
	var img_loader = function() {
		var imgReady = (function() {
			var list = [],
				intervalId = null,
				tick = function() {
					var i = 0;
					for (; i < list.length; i++) {
						list[i].end ? list.splice(i--, 1) : list[i]();
					};
					!list.length && stop();
				},
				stop = function() {
					clearInterval(intervalId);
					intervalId = null;
				};
			return function(url, ready, load, error) {
				var onready, width, height, newWidth, newHeight, img = new Image();
				img.src = url;
				if (img.complete) {
					ready.call(img);
					load && load.call(img);
					return;
				};
				width = img.width;
				height = img.height;
				img.onerror = function() {
					error && error.call(img);
					onready.end = true;
					img = img.onload = img.onerror = null;
				};
				onready = function() {
					newWidth = img.width;
					newHeight = img.height;
					if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
						ready.call(img);
						onready.end = true;
					};
				};
				onready();
				img.onload = function() {
					!onready.end && onready();
					load && load.call(img);
					img = img.onload = img.onerror = null;
				};
				if (!onready.end) {
					list.push(onready);
					if (intervalId === null) intervalId = setInterval(tick, 40);
				};
			};
		})();
		$('.works').each(function() {
			var e = $(this).find('img'),
				v = e.attr('vsrc');
			imgReady(v, function() {
				e.attr('width', this.width);
				e.attr('height', (($(window).width() - 10) / this.width) * this.height);
				e.attr('src', v);
			});
		});
	}

})(Zepto)