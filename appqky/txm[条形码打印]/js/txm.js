// JavaScript Document
//默认数据容器 x(left) y(top) w h [坐标数据]
var add_data=[
	[15,65,78,102],
	[164,72,132,26],
	[164,116,132,26],
	[121,149,177,37]
];
var testimg_f="images/u45.png";//默认/测试 正面图
var testimg_b="images/u47.png";//默认/测试 背面图
var ka_w=314;//默认/测试 学生卡大小宽
var ka_h=193;//默认/测试 学生卡大小高

var pyl=[];
function is_tm(type,up,down,printtype){
	if(type==1){
		$(up).hide();
		$(down).slideDown(400);
	}else{
		$(down).hide();
		$(up).slideDown(400);
	}
	qkysel();
 	qkychbox_sigle();
	if(printtype==1){
		$("#printbut").attr("onClick","tmPrint('.printview_box',2)");
	}else{
		$("#printbut").attr("onClick","tmPrint('.printview_box')");
	}
	//footinbottom(".qky_header",".qky_content",".qky_footer");
}
  
  
//输入长宽进行长宽变化
function toresize(){
  	$(".tmbox").css({"width":$("#tmwidth").val()+"px","height":$("#tmheight").val()+"px"});
	$("#tmwidth,#tmheight").focusout(function() {
  		$(".tmbox").css({"width":$("#tmwidth").val()+"px","height":$("#tmheight").val()+"px"});
	});
	$("#tmfaceurl").change(function() {
  		//console.log($("#tmfaceurl").val());
	});
}

//把坐标和大小塞进指定id（有数据后的初始化）
function inlay(id,i,data){
	$(id).css({"left":data[i][0]+"px","top":data[i][1]+"px","width":data[i][2]+"px","height":data[i][3]+"px","line-height":data[i][3]+"px"})
}
	
//交互效果执行	
function Interactive(id){
	var w=$(id).width();
	var h=$(id).height();
	var x=$(id).position().left;
	var y=$(id).position().top;
	$(id).draggable({
		containment: "parent",
		scroll: false,
		stop: function(){
			x=$(id).position().left;
			y=$(id).position().top;
			$(id).attr("lay_info",x+"_"+y+"_"+w+"_"+h);
		}
	}).resizable({ containment:"parent"});//拖动缩放
	
	$(id).resize(function(){
		w=$(id).width();
		h=$(id).height();
		$(id).css("line-height",h+"px");
		$(id).attr("lay_info",x+"_"+y+"_"+w+"_"+h);
	});//改变长宽触发器
}
 
//选择类型进行渲染
function isshow(printpage){
	if(getchbox("#f_or_b")=="1"){Xrprint(mould_data,stu_data,0,printpage);if(printpage==2)$("#print_tit").html("试打-打印预览（正反面）"); else $("#print_tit").html("打印预览（正反面）");}
	if(getchbox("#stu_info")=="1"){Xrprint(mould_data,stu_data,1,printpage);if(printpage==2)$("#print_tit").html("试打-打印预览（单学生信息）"); else $("#print_tit").html("打印预览（单学生信息）");}
	if(getchbox("#only_f")=="1"){Xrprint(mould_data,stu_data,2,printpage);if(printpage==2)$("#print_tit").html("试打-打印预览（只正面）"); else $("#print_tit").html("打印预览（只正面）");}
	if(getchbox("#only_b")=="1"){Xrprint(mould_data,stu_data,4,printpage);if(printpage==2)$("#print_tit").html("试打-打印预览（只反面）");else $("#print_tit").html("打印预览（只反面）");}
}
 
//根据数据和选择的类型进行渲染打印预览 mdata【模板数据妹子】,data【数据妹子】,type【姿势】（高级，难于理解就不要理解了，就算我自己写的，第二次再看，我也看不懂了！）
function Xrprint(mdata,data,type,printpage){
	/*****格式化数据阶段 （前戏，捣鼓捣鼓数据妹子）*****************************************************************************/
	var f_b=f=b=o_f="";
	var inhtml="";
	for(var i=0;i<data.length;i++){
		//放数据
		$("#tmmould #p_face .bg").html("<img src='"+mdata[0]+"'/>");
		$("#tmmould #p_face .photo").html("<img src='"+data[i][0]+"'/>");
		$("#tmmould #p_face .name").html(data[i][1]);
		$("#tmmould #p_face .number").html(data[i][2]);
		$("#tmmould #p_face .txm").html("<img src='"+data[i][3]+"'/>");
		$("#tmmould #p_back .bg").html("<img src='"+mdata[1]+"'/>");
		$("#tmmould #p_onlyface .bg").html("<img src='"+mdata[0]+"'/>");
		
		//定位置
		$("#tmmould .tmbox").css({"width":ka_w+"px","height":ka_h+"px"});
		$("#tmmould #p_face .bg img").css({"width":ka_w+"px","height":ka_h+"px"});
		$("#tmmould #p_back .bg img").css({"width":ka_w+"px","height":ka_h+"px"});
		inlay("#tmmould #p_face .photo",0,add_data);
		inlay("#tmmould #p_face .name",1,add_data);
		inlay("#tmmould #p_face .number",2,add_data);
		inlay("#tmmould #p_face .txm",3,add_data);
		
		//定显示类型
		f_b+=$("#tmmould #p_face").html()+$("#tmmould #p_back").html();
		f+=$("#tmmould #p_face").html();
		b+=$("#tmmould #p_back").html();
		o_f+=$("#tmmould #p_onlyface").html();
	}
	$(".printview_box").html('');
	if(type==0){inhtml=f;}//正面背景加信息
	else if(type==1){inhtml=f;}
	else if(type==2){inhtml=o_f;}
	else if(type==3){inhtml=f_b;}
	else{inhtml=b;}
	
	/****分页机制阶段 （高潮，你懂的）***************printview_box（这个没定高度，高潮全没用）******************************************************/	
	$(".printview_box").remove();//移除所有打印纸
	$(".tmprint_show").append('<div class="printview_box mt16"></div>');//加一个打印纸为起始0
	$(".printview_box").html(inhtml+'<div class="clear"></div>');//把要加进去的数据加进去，起到一个全部数据的容器的作用；
	
	var tmbox_count=$(".printview_box .tmbox").length;//总个数
	
	var tmbox_w=$(".printview_box .tmbox .bg img").width();//一个卡片多宽
	var tmbox_h=$(".printview_box .tmbox .bg img").height();//一个卡片多高
	
	var printbox_w=$(".printview_box").outerWidth();//一页多宽
	var printbox_h=$(".printview_box").outerHeight();//一页多高
	
	
	//列数数
	var one_lei=parseInt(Number(printbox_w)/Number(tmbox_w));
	//console.log(one_lei);
	//行数
	var one_heng=parseInt(Number(printbox_h)/Number(tmbox_h));
	
	
	var oneall=one_heng*one_lei;//一页最多放多少个
	
	//页数
	var page=Math.ceil(tmbox_count/oneall);
	
	
	var tmphtml="";//缓存重组html
	
	if(page>1){//超过一页后进行加页和进行重组html
		for(var jj=1;jj<=page;jj++){//循环页数
			  $(".tmprint_show").append('<div class="printview_box mt16"></div>');
			  for(var oo=0;oo<oneall;oo++){//循环一页内的个数
					var tmeq=oo+((jj-1)*oneall);//个数下标
					if(tmeq>=tmbox_count){//下标超过总数时不进行html的增加
						tmphtml+="";
					}else{
						tmphtml+='<div class="tmbox" style="width:'+tmbox_w+'px;height:'+tmbox_h+'px">'+$(".printview_box").eq(0).find(".tmbox").eq(tmeq).html()+'</div>';//把起初0里的html塞到缓存里
					}
			  }
			  $(".printview_box").eq(jj).html(tmphtml+'<div class="clear"></div>');//把html缓存塞进大框里
			  tmphtml="";//清除缓存
		}
		$(".printview_box").eq(0).remove();//移除起初0的层
	}

	/****分页完成后，排版加强（事后烟时间）*********************************************************************************************/
	
	if(type==1){
		$(".printview_box .tmbox").css("height",tmbox_h+"px");
		$(".printview_box .tmbox").addClass("nobg");
	}
	$(".printview_box .tmbox").each(function(kk) {
		$(this).addClass("pintv").addClass("fl");
		if(kk==0){$(this).after("<div class='jianju'></div>")}
		if(kk%2==0&&kk>=2){$(this).after("<div class='jianju'></div>")}
		if(kk%2==1){$(this).after("<div class='jianju_s'></div>")}
		
		//if((kk+1)%2!=0){$(this).addClass("fl");}else {$(this).addClass("fr").after('<div class="clear"></div>');}	
    });
	pyl[0]=$("#toppx").val();
	pyl[1]=$("#leftpx").val();
	pyl[2]=$("#wminpx").val();
	pyl[3]=$("#hminpx").val();
	$(".printview_box").css("padding",pyl[0]+"px "+pyl[1]+"px");
	$(".jianju").css("width",pyl[2]+"px");
	$(".jianju_s").css("height",pyl[3]+"px");
	
	$(".printview_box").hide();
	if(printpage==2){
	$(".printview_box").eq(0).show();	$(".printview_box").eq(1).show();
		}else{$(".printview_box").show();}	
}

//打印
function tmPrint(id,page){
   var ptinthtml="";
   bdhtml=window.document.body.innerHTML;
   //$(id).css("height","auto");
    var dd=id.replace(".","");
   if(page==2){
	ptinthtml+="<div class='"+dd+"' style='height:auto;padding:"+pyl[0]+"px "+pyl[1]+"px'>"+$(id).eq(0).html()+"</div>"; 
	ptinthtml+="<div class='"+dd+"' style='height:auto;padding:"+pyl[0]+"px "+pyl[1]+"px'>"+$(id).eq(1).html()+"</div>";    
	}else{
   $(id).each(function(i) {
    ptinthtml+="<div class='"+dd+"' style='height:auto;padding:"+pyl[0]+"px "+pyl[1]+"px'>"+$(this).html()+"</div>";
	});
}
   window.document.body.innerHTML=ptinthtml;
   window.print();
   window.document.body.innerHTML=bdhtml;
}