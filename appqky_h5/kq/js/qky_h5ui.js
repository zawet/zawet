// JavaScript Document
/**********************************************************
更新信息：
	更新日期：2016/08/9
	更新人员：zwt
	更新后版本号：1.2
	更新内容：新增几个ui空间交互函数，优化了日期选择的显示影藏事件，新增清除日期数据按钮
	优化日期插件：
	新增时分下拉选择；
	新增功能选择（是否默认显示当天日期到输入框，是否要时分下拉框，是否把过去的日期天全变不可交互不可选）；
	优化年月时分下拉选后的交互数据的变化；
	日历可独立脱离分化，就是可以一个页面多种类型的日期控件，通过不同id去锁定启动器，也可以公用一个启动器！

**************************************************************/


/****************************************************************************整体公用*************/

function qkybut_lt(){
	$(".qkybut_lt a").each(function(i) {
        $(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
		});
    });
}

/****************************************************************************下拉菜单*************/

//下拉菜单交互函数
function  qkysel(){
	$(".qkysel").each(function(i) {
        $(this).find(".selectON").click(function(){
			$(this).parent().find(".optionbox").slideToggle(200);
			$(this).parents(".qkysel").siblings().find(".optionbox").slideUp(100);
			$(this).parent().siblings().find(".optionbox").slideUp(100);
		});
		$(this).find(".optionbox a.option").each(function(j) {
            $(this).click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				$(this).parent().slideUp(200).parent().find(".selectON label").html($(this).attr("value"));
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

/************************************************************************* 单/复选择**************/

//复选框点击
function qkychbox(){
	$(".qkychbox.fang").each(function(i) {
		$(".qkychbox.fang.cur").attr("ischoose","1");
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
//单选框点击
function qkychbox_sigle(){
	$(".qkychbox.yuan").each(function(i) {
        $(this).click(function(){
			if($(this).attr("ischoose")=="0"){
				
				$(this).addClass("cur").attr("ischoose","1");
				$(this).siblings().removeClass("cur").attr("ischoose","0");
			}else{
				$(this).removeClass("cur").attr("ischoose","0");
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

function qkyProgress(percent){
	$(".qkyProgress_zi").animate({"width":percent+"%"},200);
	$(".qkyProgress_show").html(percent+"%");
}

/***************************************************************************** 弹窗**************/
function alert_msg(tit,txt){
	$("#del_msg .qky_masktit").html(tit);
	$("#del_msg .sigtext").html(txt);
	popIn('#del_msg');
}
function popOut(i){$(i).fadeOut('fast');};
function popIn(i){$(i).fadeIn('fast');qkymaskmian_td(i+" .qky_maskmian");};
//弹窗拖动和始终上下左右居中对齐
function qkymaskmian_td(id){
	var left=0;var top=0;var thisw=0;var thish=0;
	thisw=$(id).width();
	thish=$(id).outerHeight();
	left=$(window).width()-thisw;
	tops=$(window).outerHeight()-thish;
	//console.log(thisw,thish,tops,left);
	if(tops<=0){tops=0;}else{tops=tops/2;}
	if(left<=0){left=0;}else{left=left/2;}
	$(id).css({"top":tops+"px","left":left+"px","bottom":"auto"});
	if(tops>0&&left>0){
	$(id).draggable({containment: "parent", scroll: true });//拖动
	}
}

/******************************************************************************导航*************/

//导航标题交互
function qkynav(){
	$(".qkynav label").each(function(i) {
		$(this).not($(this).find("a")).click(function(){
			$(".clbox_right").hide();
			$(this).parent().find("ul").slideDown(400);
			$(this).find("a").addClass("r90")
			$(this).parent().siblings().find("ul").slideUp(400);
			$(this).parent().siblings().find("label a").removeClass("r90");
			$(".clbox_right").eq(i).slideDown(300);
		});
	});
	//qkynav_li();
}

//上下按钮选择值
function qkyu_d(){
	$(".u_d").each(function(i) {
        $(this).find("i").eq(0).click(function(){
			$(this).siblings().removeClass("noc");
			var up=$(this).parent().attr("up_down").split("_")[1];//只允许的最大值
			var this_va=Number($(this).parent().parent().find(".u_d_sel").val());//当前值
			var up_v=this_va+1;
			var up_vv;//替换容器
			if(up_v<10){
				up_vv="0"+up_v;
			}else if(up_v>up){
				up_vv=up;
				$(this).addClass("noc");
			}else{
				up_vv=up_v;
			}
			$(this).parent().parent().find(".u_d_sel").val(up_vv);
		});
		$(this).find("i").eq(1).click(function(){
			$(this).siblings().removeClass("noc");
			var down=$(this).parent().attr("up_down").split("_")[0];//只允许的最小值
			var this_va=Number($(this).parent().parent().find(".u_d_sel").val());//当前值
			var down_v=this_va-1;
			var down_vv;//替换容器
			if(down_v<10&&down_v>down){
				down_vv="0"+down_v;
			}else if(down_v<=down){
				down_vv="0"+down;
				$(this).addClass("noc");
			}else{
				down_vv=down_v;
			}
			$(this).parent().parent().find(".u_d_sel").val(down_vv);
		});
    });
}

/******************************************************************************移动端专属区域*************/
//移动端导航点击样式变换
function qkyh5_navclick(){
	$(".qkyh5_barnav a").each(function(i) {
		$(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
		});
	});
}

function qkyh5_navclick2(fun){
	$(".qkyh5_barnav a").each(function(i) {
		$(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			fun($(this));
		});
	});
}

//自动变化以头部的距离，i为想离头部有多远，可以负数
function qkyh5_topa_header(i,jq){
	if(jq==1){
	var titHeight = $('.qkyh5_header').height()+i;
	}else{
	var titHeight = $('.qkyh5_header').offset().height+i;}
	//console.log(titHeight);
	$(".qkyh5_main").css({"paddingTop":titHeight+"px"});
}

function qkyh5_topa_header2(i,h,m){
	var titHeight = $(h).height()+i;
	$(m).css({"paddingTop":titHeight+"px"});
}

//点击样式变换公用版（id 要换点击换样式的父类，onclass 点击后会加上的样式名）
function qkyh5_style_cho(id, onclass) {
	$(id).each(function(i) {
		$(this).click(function() {
		$(this).addClass(onclass);
		$(this).siblings().removeClass(onclass);
		});
	});
}

//字母滑动启动装置 id人员列表框; selid 滑动字母放的id; datas人员数据；type显示类型；rliclick 外接人员点击后事件 
function qky_zmlist(id,selid,datas,showtype,laystype,zjid,zjdatas,rliclick){
	 var zm=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"];
	$(id).html("");
	for(var i=0;i<zm.length;i++){
		if(zm[i]=="#"){
		$(id).append("<div class='zmul oth'><a name='oth' class='zmul_tit iskuai'>"+zm[i]+"</a></div>");
		$(selid).append("<a class='zmsel oth' href='#oth'>"+zm[i]+"</a>");
		}else{
		$(id).append("<div class='zmul "+zm[i]+"'><a name='"+zm[i]+"' class='zmul_tit iskuai'>"+zm[i]+"</a></div>");
		$(selid).append("<a class='zmsel "+zm[i]+"' href='#"+zm[i]+"'>"+zm[i]+"</a>");
		}
	}
	for(var j=0;j<datas.length;j++){
		var tmp=getPy(datas[j])[0].charAt(0).toUpperCase();
		var tmps;
		var reg= /^[A-Za-z]+$/;
		//判断是否符合正则表达式
		if (reg.test(tmp)){tmps=tmp;}else{tmps="oth";}
		if(laystype==1){
			$(".zmul."+tmps).append('<a class="renli trn clear3"><span class="qkychbox yuan trn mt4 fl"><i class="qkyicon">&#xe69f;</i></span><label class="ml6 fl">'+datas[j]+'</label></a>');
			
		}else{
			$(".zmul."+tmps).append('<a class="renli trn ">'+datas[j]+'</a>');
		}
		//显示状态类型选择 1为只有拥有字项的才显示 2为列表只显示有子类，滑动字母项全部显示26个字母，不填或者其他则全部都显示
		if(showtype==1){
			$(".zmul."+tmps).show();
			$(".zmsel."+tmps).css("display","block");
		}else if(showtype==2){
			$(".zmul."+tmps).show();
			$(".zmsel").css("display","block");
		}else{
			$(".zmul").show();
			$(".zmsel").css("display","block");
		}
	}
	for(var k=0;k<zjdatas.length;k++){
		if(laystype==1){
			$(zjid).append('<a class="renli trn clear3"><span class="qkychbox yuan trn mt4 fl"><i class="qkyicon">&#xe69f;</i></span><label class="ml6 fl">'+zjdatas[k]+'</label></a>');
			
		}else{
			$(zjid).append('<a class="renli trn ">'+zjdatas[k]+'</a>');
		}
	}
	$(".renli").each(function(i) {
        $(this).click(function(){
			rliclick($(this));
		});
    });
}

//h5新下拉选择菜单
function newsh5_select(){
	$(".newsh5_select").each(function(i) {
        $(this).find(".news_select").click(function(){
			$(this).toggleClass("r90").toggleClass("r_90");
			$(".news_optionbox").slideToggle(200);
		});
		$(this).find(".news_option").each(function(j) {
            $(this).click(function(){
				$(this).toggleClass("co_z6").toggleClass("co_gr");
				$(this).siblings().addClass("co_z6").removeClass("co_gr");
				$(this).parents(".newsh5_select").find(".news_value").html($(this).find("a").html());
			});
        });
    });
}

//h5新增页下拉选择菜单
function  teasel(){
	var isv;
	$(".teasel_but").each(function(i) {
        $(this).click(function(){
			isv=$(this).attr("isvalue");
			$(".tea_selbox").addClass("show");
		});
    });
	$(".tea_selbox .teaoption").each(function(j) {
        $(this).click(function(){
			$(this).toggleClass("co_z1").toggleClass("co_gr");
			$(this).siblings().addClass("co_z1").removeClass("co_gr");
			$(".teasel_val[isvalue='"+isv+"']").html($(this).html());
			$(".tea_selbox").removeClass("show");
		});
    });
}


/******************************************************H5专属滚动选择日期控件***************s**************************/


/*H5专属滚动选择日期控件启动器*/
function time_h5(){
	/*初始化基础值*/
	var thisDate = new Date();
	var ty=thisDate.getFullYear();
	var tm=thisDate.getMonth()+1;
	var td=thisDate.getDate();
	var th=thisDate.getHours();//获取当前小时数(0-23)
	var tmi=thisDate.getMinutes();
	
	
	/*创建控件下拉*/
	cr_timesel(ty,tm,td,th,tmi);
	
	/*交互动画*/
	am_timesel();
}

/***交互动画**/
function am_timesel(){
	var isval;//指定哪个输入框接受信息
	
	/***点出交互**/
	$(".time_h5").each(function(i) {
        $(this).click(function(){
			isval=$(this).attr("isval");
			$(".timeh5_box").toggleClass("show");
			//inblur([".qkyh5_header",".qkyh5_main",".qkyh5_footbg"]);
		});
    });
	
	/***完成/关闭交互**/
	$(".time_true").click(function(){
		var h5date="";
		$(".news_date span").each(function(i) {h5date+=$(this).html();});
		$(".time_h5[isval='"+isval+"']").val(h5date);
		$(".timeh5_box").removeClass("show");
		//outblur([".qkyh5_header",".qkyh5_main",".qkyh5_footbg"]);
	});
	
	/***以为区域点击 s**/
	 $(document).not($(".timeh5_box")).click(function(){
        $(".timeh5_box").removeClass("show");
		//outblur([".qkyh5_header",".qkyh5_main",".qkyh5_footbg"]);
    });
	$(document).not($(".time_h5")).click(function(){
        $(".timeh5_box").removeClass("show");
		//outblur([".qkyh5_header",".qkyh5_main",".qkyh5_footbg"]);
    });
	
    /*防止事件冒泡*/
    $(".timeh5_box").click(function(event){
        event.stopPropagation();
    });
	$(".time_h5").click(function(event){
        event.stopPropagation();
    });
}


//增加高斯
function inblur(id_array){
	for(var i=0;i<id_array.length;i++){
		$(id_array[i]).addClass("blur");	
	}
}
//去除高斯
function outblur(id_array){
	for(var i=0;i<id_array.length;i++){
		$(id_array[i]).removeClass("blur");	
	}
}



//创建移动端专属滚动选择日历选择项
function cr_timesel(y,m,d,h,mi){
	var min_,max_,year,moon,day,hour,minute;
	$(".time_optionbox").each(function(i) {
		var sig=$(this).attr("sig");//后面带的单位
		var range=$(this).attr("range");//循环区间
		if(range=="day"){
			min_=1;
			max_=DayNumOfMonth(y,m-1);
		}else if(range=="year"){
			min_=y-10;
			max_=y+10;
		}else{
			min_=Number(range.split("-")[0]);
			max_=Number(range.split("-")[1]);
		}
		xr_time_qj(min_,max_,$(this),sig);
    });

	year = new Swiper('.year', {
        direction: 'vertical',
		loop : true,
		slidesPerView : 3,
		centeredSlides : true,
		onSlideChangeEnd: function(){
			$("#yb").html($(".swiper-container.year .swiper-slide.swiper-slide-active").find("a").html());
    	}
    });
	moon = new Swiper('.moon', {
        direction: 'vertical',
		loop : true,
		slidesPerView : 3,
		centeredSlides : true,
		onSlideChangeEnd: function(){
			$("#mb").html($(".swiper-container.moon .swiper-slide.swiper-slide-active").find("a").html());
			//var maxss=DayNumOfMonth(Number($("#yb").html().replace("年","")),Number($("#mb").html().replace("月","")));
			//xr_time_qj(1,maxss,$(".time_optionbox").eq(2),"日");
			
    	}
    });
	day = new Swiper('.day', {
        direction: 'vertical',
		loop : true,
		slidesPerView : 3,
		centeredSlides : true,
		onSlideChangeEnd: function(){
			$("#db").html($(".swiper-container.day .swiper-slide.swiper-slide-active").find("a").html());
    	}
    });
	hour = new Swiper('.hour', {
        direction: 'vertical',
		loop : true,
		slidesPerView : 3,
		centeredSlides : true,
		onSlideChangeEnd: function(){
			$("#hb").html($(".swiper-container.hour .swiper-slide.swiper-slide-active").find("a").html());
    	}
    });
	minute = new Swiper('.minute', {
        direction: 'vertical',
		loop : true,
		slidesPerView : 3,
		centeredSlides : true,
		onSlideChangeEnd: function(){
			$("#mib").html($(".swiper-container.minute .swiper-slide.swiper-slide-active").find("a").html());
    	}
    });
	year.slideTo($(".year .swiper-slide a[val="+y+"]").parent().index());
	moon.slideTo($(".moon .swiper-slide a[val="+m+"]").parent().index());	
	day.slideTo($(".day .swiper-slide a[val="+d+"]").parent().index());
	hour.slideTo($(".hour .swiper-slide a[val="+h+"]").parent().index());
	minute.slideTo($(".minute .swiper-slide a[val="+mi+"]").parent().index());
}
//获取指定年月的天数
function DayNumOfMonth(Year,Month){
	var d = new Date(Year,Month,0);
	return d.getDate();
}

//渲染滑动选择项
function xr_time_qj(mins,maxs,id,sig){
	id.find(".swiper-wrapper").html("");
	for(var i=mins;i<=maxs;i++){
		var ii;
		if(i<10) ii="0"+i; else ii=i; 
		id.find(".swiper-wrapper").append("<div class='swiper-slide'><a val='"+i+"'>"+ii+sig+"</a></div>");
	}
}

/******************************************************H5专属滚动选择日期控件***************e**************************/