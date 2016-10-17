
/****************************公共使用函数*******************************/

//底部自动漂浮在最低
function footinbottom(header,content,foot){
	var body_h=$(content).outerHeight()+$(header).outerHeight()+$(foot).outerHeight();
	if($(window).height()>=body_h){
		var foot_mt=$(window).height()-body_h;
	  $(foot).css("margin-top",foot_mt+"px");
	  
	}else{
		$(foot).css("margin-top","16px");
	}
	$(content).css({"margin-top":$(header).outerHeight()+"px"});
}	

// 弹窗
function popOut(i){$(i).fadeOut('fast')};
function popIn(i){$(i).fadeIn('fast');qkymaskmian_td(i+" .qky_maskmian");};

$(window).load(function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");
});
//$(window).resize(function(){resizeWin();footinbottom();popZise()});
$(window).on('resize',function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");

});



