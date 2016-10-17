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
$(window).load(function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");
});
$(window).on('resize',function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");

});


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

/************************************************************************* 单/复选择**************/

//复选框点击公用
function qkychbox(){
	$(".qkychbox.fang").each(function(i) {
		$(".qkychbox.fang").attr("ischoose","0");
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
//指定id下的复选框点击
function qkychbox_id(id){
	$(id+" .qkychbox.fang").each(function(i) {
		$(id+" .qkychbox.fang").attr("ischoose","0");
		$(id+" .qkychbox.fang.cur").attr("ischoose","1");
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
function qkychbox_id_fun(id,fun){
	$(id+" .qkychbox.fang").each(function(i) {
		$(id+" .qkychbox.fang").attr("ischoose","0");
		$(id+" .qkychbox.fang.cur").attr("ischoose","1");
        $(this).click(function(){
			$(this).toggleClass("cur");
			if($(this).attr("ischoose")=="0"){
				$(this).attr("ischoose","1");
			}else{
				$(this).attr("ischoose","0");
			}
			fun($(this));
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

//指点id单选框点击
function qkychbox_sigle_id(id){
	$(id+" .qkychbox.yuan").each(function(i) {
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
//指点id单选框点击
function qkychbox_sigle_id_fun(id,fun){
	$(id+" .qkychbox.yuan").each(function(i) {
        $(this).click(function(){
			if($(this).attr("ischoose")=="0"){
				$(this).addClass("cur").attr("ischoose","1");
				$(this).siblings().removeClass("cur").attr("ischoose","0");
			}else{
				$(this).removeClass("cur").attr("ischoose","0");
			}
			fun($(this));
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
	$(id).css({"top":tops+"px","left":left+"px"});
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

/*****************************************************************************全课云日历 2016-8-9进阶优化版********/
var Shtml='<div class="qky_calsel fl mb10">';
var yhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_year"></a><div class="caloptionbox yearbox scroll"></div></div><span class="mr10 fl ml2">年</span>';
var mhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_moon"></a><div class="caloptionbox moonbox"></div></div><span class="fl ml2">月</span>';
var Sthtml='<table cellpadding="0" cellspacing="0" border="0" class="qky_cal_tab"></table>';
var ed='</div>';
var et='</table>';
var clear='<div class="clear"></div>';
var showdate='<div class="showdate fr mb10"></div>';
var clearbut='<a class="qkybut hbg brad4 cleardate  mt10 fl">清除日期</a>';
var hsel='<div class="calselshow fl MS77 ml16 mt10 upsel" id="hour"><a class="calselectON dian3 cal_hour"></a><div class="caloptionbox scroll date_hour" maxnumber="24"></div></div>';
var ssel='<div class="calselshow fl MS77 mt10 upsel" id="minute"><a class="calselectON dian3 cal_minute"></a><div class="caloptionbox scroll date_minute"  maxnumber="60"></div></div>';
var maohao='<span class="fl mt10 muhao" style="line-height:34px; margin:0 6px;">：</span>';

var thisDate = new Date();
var TY=thisDate.getFullYear();
var TD=thisDate.getDate();
var TM=thisDate.getMonth()+1;
var TH=thisDate.getHours();       //获取当前小时数(0-23)
var TMI=thisDate.getMinutes();
var s_value=0;
var s_hssel=1;
var create_id=""; 
var click_id="";
var s_oldday=0;

//日历启动装置（ 点击的元素id/class，容器元素id/class，是否默认给当天日期值0/1【默认不显示】，是否显示时分下拉选项0/1【默认显示】,是否让过去的天数显示正常0/1【默认显示】）
function calendar(clickid,createid,showtodayvalue,isshow_hs_sel,isshow_oldday){
	s_value=showtodayvalue;
	s_hssel=isshow_hs_sel;
	create_id=createid;
	s_oldday=isshow_oldday;
	cal_create();
	
	//日历启动交互动画
	$(clickid).each(function(i) {
        $(this).click(function(){
			$(this).parent().css("z-index","8888888").find(createid).slideToggle(200);
			$(this).parents(".qkysel").siblings().find(clickid).parent().css("z-index","99");
			$(this).parents(".qkysel").siblings().find(createid).slideUp(100);	
		});
    });
	
	/***以为区域点击 s**/
	 $(document).not($(createid)).click(function(){
        $(createid).slideUp(500);
    });
	$(document).not($(clickid)).click(function(){
        $(createid).slideUp(500);
    });
    /*防止事件冒泡*/
    $(createid).click(function(event){
        event.stopPropagation();
    });
	$(clickid).click(function(event){
        event.stopPropagation();
    });
	
}


//创建日历
function cal_create(){
	var moonboxHtml=yearboxHtml="";
	
	//渲染框架
	$(create_id).html(Shtml+yhtml+mhtml+clear+ed+showdate+clear+Sthtml+clearbut+Shtml+hsel+maohao+ssel+clear+ed);
	
	//初始化时间输入框值和日历显示当前选中值
	change_value(TY,TM,TD,TH,TMI,$(create_id).find(".showdate"),$(create_id).parent().find(".caldate"));
	
	
	//渲染年月下拉
	for(var i=1;i<=12;i++){moonboxHtml+='<a class="option trn dian3" value="'+i+'">'+i+'</a>';}
	 var s_year;
	if(s_oldday==0) s_year=TY; else s_year=2000;
	for(var i=s_year;i<TY+12;i++){yearboxHtml+='<a class="option trn dian3" value="'+i+'">'+i+'</a>';}
	$(create_id).find(".moonbox").html(moonboxHtml);
	$(create_id).find(".yearbox").html(yearboxHtml);
	
	//渲染时分秒下拉选项
	datesel($(create_id).find(".date_minute"));
	datesel($(create_id).find(".date_hour"));
	
	//初始化下拉默认值
	$(create_id).find(".cal_year").html(TY);
	$(create_id).find(".cal_moon").html(TM);
	$(create_id).find(".cal_hour").html(TH);
	$(create_id).find(".cal_minute").html(TMI);
	
	//提供下拉事件
	qkysels();
	
	//渲染日期列表
	cal_Xr(TY,TM,TD,$(create_id).find(".qky_cal_tab"));
	
	
	if(s_hssel=="0"){
		$(create_id).find("#hour").hide();
		$(create_id).find("#minute").hide();
		$(create_id).find(".muhao").hide();
	}	
	if(s_value=="0"){$(create_id).parent().find(".caldate").val("");}
}

function change_value(y,m,d,h,mi,showid1,showid2){
	if(s_hssel!="0"){
		showid1.html(y+"-"+m+"-"+d+" "+h+":"+mi);
		showid2.val(y+"-"+m+"-"+d+" "+h+":"+mi);
	}else{
		showid1.html(y+"-"+m+"-"+d);
		showid2.val(y+"-"+m+"-"+d);
	}
}

//渲染日历指定年月的列表
function cal_Xr(y,m,d,id){
	var weekHtml="<tr>";
	var moomHtml="";
	md=DayNumOfMonth(y,m);//获取当前月天数
	var dates=new Date(y,m-1,1);
	var mfd=dates.getDay();//获取第一天星期几，0为星期天
	//获取此月周数
	var forweek=Math.ceil((md+mfd)/7);
	id.html('<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'); 
	for(var i=0;i<forweek;i++){
		for(var j=0;j<7;j++){
			//j+(i*7)为加了前空白期的循环下标
			if((j+(i*7))<mfd){
			weekHtml+='<td>&nbsp;</td>';
			}else{
				var thisday=j+(i*7)-mfd+1;
				//(j+(i*7))-mfd+1为真正日数，即几号；
				if(thisday>md){
					weekHtml+='<td>&nbsp;</td>';
				}else {
					var ds='';
					if(thisday<10)ds="0"+thisday;else ds=thisday;
					if(thisday==d&&y==TY&&m==TM){
						weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today" type="news">'+ds+'</a></td>';
					}else{
						weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" type="news">'+ds+'</a></td>';
					}
				}
			}
		}
		moomHtml+=weekHtml+"</tr>";
		weekHtml="<tr>";
	}
	id.append(moomHtml);
	cal_click();//天数点击
	cleardate();//清除日历	
}
//获取指定年月的天数
function DayNumOfMonth(Year,Month){
      var d = new Date(Year,Month,0);
      return d.getDate();
}


//创建时，分，秒下拉选项
function datesel(id){
	var maxnum=Number(id.attr("maxnumber"));
	var selhtml='';
	for(var i=0;i<maxnum;i++){
		var temi;
		if(i<10)temi="0"+i; else temi=i;
		selhtml+='<a class="option trn dian3" value="'+temi+'">'+temi+'</a>';
	}
	id.html(selhtml);
}

//日历独立下拉事件
function  qkysels(){
	$(create_id).find(".qky_calsel").each(function(i) {
        $(this).find(".calselectON").click(function(){
			$(this).parent().find(".caloptionbox").slideToggle(200);
		});
		$(this).find(".caloptionbox a.option").each(function(j) {
            $(this).click(function(){
				var xrid=$(this).parents(create_id);
				$(this).parent().slideUp(200).parent().find(".calselectON").html($(this).attr("value"));
				var dq_date=get_dqdates(xrid.find(".showdate"));//获取现在已经选中的日期时间
				cal_Xr(xrid.find(".cal_year").html(),xrid.find(".cal_moon").html(),dq_date[2],xrid.find(".qky_cal_tab"));//重新渲染当前年月的日历
				change_value(xrid.find(".cal_year").html(),xrid.find(".cal_moon").html(),dq_date[2],xrid.find(".cal_hour").html(),xrid.find(".cal_minute").html(),xrid.find(".showdate"),xrid.parents(".hicon").find(".caldate"));//更换值
			}); 
        });
	});
}

//日历日期点击
function cal_click(){
	if(s_oldday=="0"){
		$(".qky_cal_tab a").each(function(t) {
			var thistime=new Date($(this).attr("date").replace(/\-/g, "\/"));
			var todaytime=new Date(TY,TM-1,TD);
			if(thistime<todaytime){
				$(this).addClass("oldday").attr("type","old");
			}
		});
	}
	$(".qky_cal_tab a[type='news']").each(function(i) {
        $(this).click(function(){
			$(".qky_cal_tab a").removeClass("cur");
			$(this).addClass("cur");
			var dq_date=get_dqdates($(this).parents(create_id).find(".showdate"));//获取现在已经选中的日期时间
			var chodate=$(this).attr("date").split("-");
			change_value(chodate[0],chodate[1],chodate[2],dq_date[3],dq_date[4],$(this).parents(create_id).find(".showdate"),$(this).parents(".hicon").find(".caldate"));
		});
    });
}

//获取当前选中日历时间
function get_dqdates(sd_id){
	var dqdates;
	var dqtimes;
	if(s_hssel!="0"){
		dqtimes=sd_id.html().split(" ")[1].split(":");
		dqdates=sd_id.html().split(" ")[0].split("-");
	}else{
		dqtimes=["00","00"];
		dqdates=sd_id.html().split("-");
	}
	dqdates=dqdates.concat(dqtimes);
	return dqdates;
}

//清除日期
function cleardate(){
	$(create_id).find(".cleardate").click(function(){
		$(this).parent().find(".qky_cal_tab a").removeClass("cur");
		$(this).parents(".hicon").find(".caldate").val("");
	});
}

