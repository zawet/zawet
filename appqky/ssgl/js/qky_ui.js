// JavaScript Document

//下拉菜单交互函数
function  qkysel(){
	$(".qkysel").each(function(i) {
        $(this).find(".selectON").click(function(){
			$(this).parent().find(".optionbox").slideToggle(200);
			$(this).parents(".qkysel").siblings().find(".optionbox").slideUp(100);
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


/***************全课云日历******************/

var Shtml='<div class="qky_calsel fl mb10">';
var yhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_year"></a><div class="caloptionbox yearbox"></div></div><span class="mr16 fl ml6">年</span>';
var mhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_moon"></a><div class="caloptionbox moonbox"></div></div><span class="fl ml6">月</span>';
var Sthtml='<table cellpadding="0" cellspacing="0" border="0" class="qky_cal_tab"></table>';
var ed='</div>';
var et='</table>';
var clear='<div class="clear"></div>';
var showdate='<div class="showdate fr mb10"></div>';

var thisDate = new Date();
var TY=thisDate.getFullYear();
var TD=thisDate.getDate();
var TM=thisDate.getMonth()+1;

//日历启动装置
function calendar(clickid,createid){
	cal_create(createid,TY,TM,TD);
	$(clickid).each(function(i) {
        $(this).click(function(){
			$(this).parent().find(createid).slideToggle(200);	
		});
    });
}

//创建日历
function cal_create(id,y,m,d){
	y=Number(y);
	m=Number(m);
	d=Number(d);
	var moonboxHtml=yearboxHtml="";
	
	//渲染框架
	$(id).html(Shtml+yhtml+mhtml+clear+ed+showdate+clear+Sthtml);
	
	//渲染年月下拉
	$(".cal_year").html(y);
	$(".cal_moon").html(m);
	$(".showdate").html(y+"-"+m+"-"+d);
	$(".caldate").val(y+"-"+m+"-"+d);
	for(var i=1;i<=12;i++){moonboxHtml+='<a class="option trn dian3" value="'+i+'">'+i+'</a>';}
	for(var i=y-5;i<y+12;i++){yearboxHtml+='<a class="option trn dian3" value="'+i+'">'+i+'</a>';}
	$(".moonbox").html(moonboxHtml);
	$(".yearbox").html(yearboxHtml);
	qkysels();
	
	//渲染日期列表
	 cal_Xr(y,m,d,$(".qky_cal_tab"));
	
}
//日历独立下拉事件
function  qkysels(){
	$(".qky_calendar .qky_calsel").each(function(i) {
        $(this).find(".calselectON").click(function(){
			$(this).parent().find(".caloptionbox").slideToggle(200);
		});
		$(this).find(".caloptionbox a.option").each(function(j) {
            $(this).click(function(){
				var xrid=$(this).parents(".qky_calendar");
				
				$(this).parent().slideUp(200).parent().find(".calselectON").html($(this).attr("value"));
				
				cal_Xr(xrid.find(".cal_year").html(),xrid.find(".cal_moon").html(),TD,xrid.find(".qky_cal_tab"));//重新渲染当前年月的日历
			}); 
        });
	});
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
					if(thisday==d){
						weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today">'+ds+'</a></td>';
					}else{
						weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'">'+ds+'</a></td>';
					}
				}
			}
		}
		moomHtml+=weekHtml+"</tr>";
		weekHtml="<tr>";
	}
	id.append(moomHtml);
	cal_click();
}


//获取指定年月的天数
function DayNumOfMonth(Year,Month){
      var d = new Date(Year,Month,0);
      return d.getDate();
}

//日历日期点击
function cal_click(){
	$(".qky_cal_tab a").each(function(i) {
        $(this).click(function(){
			$(".qky_cal_tab a").removeClass("cur");
			$(this).addClass("cur");
			$(this).parents(".qky_cal_tab").parent().find(".showdate").html($(this).attr("date"));
			$(this).parents(".hicon").find(".caldate").val($(this).attr("date"));
		});
    });
}

