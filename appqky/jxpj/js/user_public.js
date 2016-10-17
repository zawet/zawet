
/*************************************************************
基础信息：
	主明：此js为公共应用的脚本函数，几乎所有模块能用上的函数脚本放在这
	可以添加和修改里面的方法，但得注明版本和更新内容;
	版本：1.0;
	初始化人员：zwt;
	日期：2016/01/14;
**********************************************************
更新信息：
	更新人员：
	更新后版本号：
	更新内容：

**************************************************************/

$(function(){
	$(".jxpj_nav a").each(function(i) {
        $(this).click(function(){
			$(this).addClass("cur");
			$(this).siblings().removeClass("cur");
		});
    });
	
	});

//底部自动漂浮在最低
function footinbottom(header,content,foot){
	var body_h=$(content).outerHeight()+$(header).outerHeight()+$(foot).outerHeight();
	if($(window).height()>=body_h){
		var foot_mt=$(window).height()-body_h;
	  $(foot).css("margin-top",foot_mt+"px");
	  
	}else{
		$(foot).css("margin-top","0px");
	}
	$(content).css({"margin-top":$(header).outerHeight()+"px"});
}	

// 弹窗
function popOut(i){$(i).fadeOut('fast')};
function popIn(i){$(i).fadeIn('fast')};

$(window).load(function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");
});
//$(window).resize(function(){resizeWin();footinbottom();popZise()});
$(window).on('resize',function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");

});








