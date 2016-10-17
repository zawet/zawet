
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
function popIn(i){$(i).fadeIn('fast')};

$(window).load(function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");
});
//$(window).resize(function(){resizeWin();footinbottom();popZise()});
$(window).on('resize',function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");

});

//隐藏显示左边栏
function lbox_zt(how){
	if(how=="close"){
		$(".kw_lbox").animate({"width":"0"},300,function(){$("#showlbox").show();footinbottom(".qky_header",".qky_content",".qky_footer");});
		$(".kw_lbox").hide();
		$(".kw_rbox").animate({"width":"100%"},300);
		
	}else{
		$("#showlbox").hide();
		$(".kw_lbox").show().animate({"width":"19.2%"},300,function(){footinbottom(".qky_header",".qky_content",".qky_footer");});
		$(".kw_rbox").animate({"width":"79%"},300);
		
	}
}
//考务安排隐藏显示左边栏
function lbox_zts(lbox,rbox){
	$("#onof").attr("isclick","no");
	$("#onof").click(function(){
		
		if($("#onof").attr("isclick")=="no"){
			$(rbox).animate({"width":"94%"},300);
			$(lbox).addClass("slbox");
			$(this).attr("isclick","yes").find("i").html("&#xe72a;");
		}else{
			$(rbox).animate({"width":"79%"},300,function(){$(lbox).removeClass("slbox");});
			
			$(this).attr("isclick","no").find("i").html("&#xe72b;");
		}
		
	});
	
}


//下拉菜单交互函数
function  qkysel(){
	$(".qkysel").each(function(i) {
        $(this).find(".selectON").click(function(){
			$(this).parent().find(".optionbox").slideToggle(200);
		});
		$(this).find(".optionbox a.option").each(function(j) {
            $(this).click(function(){
				$(this).parent().slideUp(200).parent().find(".selectON").html($(this).attr("value"));
			}); 
        });
		
		//三维交互
		$(this).find("a.twosel").click(function(){
			$(this).parent().find(".optionbox2").slideToggle(200);
		});
		$(this).find(".optionbox2").each(function(t) {
            $(this).find("a.option2").each(function(s) {
				$(this).click(function(){
					var value=$(this).parents(".option").find(".twosel").attr("value")+$(this).attr("value");
					$(this).parents(".optionbox").slideUp(200).parent().find(".selectON").html(value);
				}); 
        	});
        });
		
    });
}

//下拉菜单取值函数
function getqkysel_Value(id){
	return $(id).html();
}


//复选框点击
function qkychbox(){
	$(".qkychbox").each(function(i) {
		$(".qkychbox.cur").attr("ischoose","1");
        $(this).click(function(){
			$(this).toggleClass("cur");
			if($(this).attr("ischoose")=="0"){
				$(this).attr("ischoose","1");
			}else{
				$(this).attr("ischoose","0");
			}
		});
    });
}

//zhu复选框根据id进行联动zi复选框 zhu的id一定要在zi的id的_前面保持一致
function liandai_chbox(){
	$(".qkychbox.zhu").each(function(i) {
		$(this).attr("isclick","no");
    	$(this).click(function(){
			var zhuid=$(this).attr("id");
			if($("#"+zhuid).attr("isclick")=="no"){	
				$(".qkychbox.zi").each(function(j) {
					var ziid=$(this).attr("id").split("_");
					if(ziid[0]==zhuid){$(this).attr("ischoose","1").addClass("cur");}
				});
				$("#"+zhuid).attr("isclick","yes");
			}else{
				$(".qkychbox.zi").each(function(j) {
					var ziid=$(this).attr("id").split("_");
					if(ziid[0]==zhuid){$(this).attr("ischoose","0").removeClass("cur");}
				});
				$("#"+zhuid).attr("isclick","no");
			}
		}); 
    });
}

//获取复选框是否选中 1为选中，0为未选 ,type为获取的类型是什么，值（value）还是选中状态
function getchbox(id,type){
	if(type=="value")return $(id).attr("value");
	else return $(id).attr("ischoose");
}


