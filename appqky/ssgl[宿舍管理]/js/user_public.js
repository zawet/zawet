
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

//列表删除
function listClose(){
	$(".pba.close").each(function(i) {
        $(this).click(function(){
			$("#del").fadeIn('fast');
			isdelRady(i,"car");
		});
    });
	$(".cao.close").each(function(j) {
        $(this).click(function(){
			$("#del").fadeIn('fast');
			isdelRady(j,"tab");
		});
    });
}

//删除弹窗确认删除按钮执行
function isdelRady(i,typt){
	$("#del .maskBut.one").click(function(){
		$("#del").fadeOut(100);
		if(typt=="car"){
		$(".pba.close").eq(i).parents(".ssgl_lou_list").attr("isplay","no").fadeOut(300,function(){
			$(".cao.close").eq(i).parents("tr").fadeOut(300,function(){
				listXr_add();
				footinbottom(".qky_header",".qky_content",".qky_footer");
			});
		});
		}else{
			$(".cao.close").eq(i).parents("tr").fadeOut(300,function(){
				$(".pba.close").eq(i).parents(".ssgl_lou_list").attr("isplay","no").fadeOut(300,function(){
					listXr_add();
					footinbottom(".qky_header",".qky_content",".qky_footer");
				});
			});
		}
	});
}


/**************自动分配使用的函数***************/
//自动分配和手动录入转接函数
function onfq(id,type,fout,fin){
	$(id).click(function(){
		if(type==1)Xrfplou(louchooseData);
		$(fout).fadeOut(200,function(){$(fin).fadeIn(200,function(){footinbottom(".qky_header",".qky_content",".qky_footer");});});	
	});
}
//自动分配中转到分配完成
function onfqend(id){
	$(id).click(function(){
		Xrfpend(XrfpendData);
		$("#tips,.fenpei").fadeOut(400);
		$(".fenpei_end").fadeIn(400);
	});
}


//自动分配宿舍楼渲染
function Xrfplou(data){
	$("#fplistin").html("");
	for(var i=0;i<data.length;i++){
		$("#fplist_mould .lounames").html(data[i][0]);
		for(var j=0;j<data[i][1];j++){
			var jj=j+1;
			if(j==0){//默认显示1层宿舍房
				$("#fplist_mould .Cceng").append("<a class='cur trn'>"+jj+"层</a>");
				$("#fplist_mould .Cfang").append("<div class='cfang'></div>");//创造一层宿舍房的容器不隐藏
			}else{
				$("#fplist_mould .Cceng").append("<a class='trn'>"+jj+"层</a>");
				$("#fplist_mould .Cfang").append("<div class='cfang yc'></div>");
			}
			for(var k=0;k<data[i][2];k++){
				var kk=k+1;
				if(kk<10) kk="0"+kk; else kk=kk;
				$("#fplist_mould .cfang").eq(j).append("<a class='cho trn'>"+jj+kk+"</a>");//给每层宿舍房容器灌入宿舍
			}
			$("#fplist_mould .cfang").eq(j).append("<div class='clear'></div>");
		}
		
		$("#fplistin").append($("#fplist_mould").html());
		
		$("#fplist_mould .Cceng,#fplist_mould .Cfang").html("");	
	}
	fpChoose();
	listtopClick();
	Cfang_a();
	Cceng_a();
}

//自动分配宿舍楼整栋选择
function fpChoose(){
	$(".fpChoose").each(function(i) {
        $(this).click(function(){
			$(this).parents(".fenpei_list").toggleClass("onchoose").find(".Cfang a").toggleClass("cho");
		});
    });
}


//自动分配下拉选择事件
function listtopClick(){
	$(".listtop").each(function(i) {
		$(this).attr("isclick","no");
        $(this).find("span").click(function(){
			if($(this).parent().attr("isclick")=="no"){
			$(this).parent().parent().css("z-index","77777");
			$(this).parent().attr("isclick","yes");
			}else{
			$(this).parent().parent().css("z-index","5555");
			$(this).parent().attr("isclick","no");
			}
			$(this).parent().parent().find(".listdown").slideToggle(400);
		});
    });
	
}
//分配房间点击取消选中分配
function Cfang_a(){
	$(".Cfang a").each(function(ii) {
       	$(this).click(function(){
			$(this).toggleClass("cho");
		});
    });
}
//分配层点击换层
function Cceng_a(){
	$(".Cceng").each(function(i) {
		$(this).find("a").each(function(ii) {
            $(this).click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				$(".fenpei_list").eq(i).find(".Cfang .cfang").eq(ii).removeClass("yc").siblings().addClass("yc");
			});
        }); 	
    });
}

function maskchoose(){
	$(".maskchoose").each(function(i) {
        $(this).not( $(".oncho")).click(function(){
			$(this).toggleClass("cur");
		});
    });
}

//自动分配完后 分配后渲染分配信息
function Xrfpend(data){
	var tableF="<tr><td class='one'><input type='checkbox'></td>";
	var tableE='<td><a class="cao trn edit"><i class="qkyicon">&#xe6cf;</i>编辑</a></td><td><a class="cao trn close"><i class="qkyicon">&#xe6aa;</i>删除</a></td></tr>';
	var tablehtml="";
	for(var i=0;i<data.length;i++){
		//表格列表赋值渲染
		tablehtml="<tr><td class='one'><a class='qkychbox trn zi ' ischoose='0' id='ks_"+i+"'><i class='qkyicon'>&#xe69f;</i></a></td>";
		for(var j=0;j<data[i].length;j++){
			
			tablehtml+="<td>"+data[i][j]+"</td>"
		}
		
		tablehtml+=tableE;
		$(".fenpei_end .intable tbody").append(tablehtml);
		//var tablehtml=tableF;
	}
	qkychbox();
	listClose();//卡片和表格列表删除
	inEdit();
	footinbottom(".qky_header",".qky_content",".qky_footer");//整体渲染增强
}

/**************信息录入使用的函数***************/

//入住信息卡片列表渲染
function Xrinlist(data){
	var tableF="<tr><td class='one'><a class='qkychbox trn zi seachbox' ischoose='0' id='ks_'></td>";
	var tableE='<td><a class="cao trn edit"><i class="qkyicon">&#xe6cf;</i>编辑</a></td><td><a class="cao trn close"><i class="qkyicon">&#xe6aa;</i>删除</a></td></tr>';
	var tablehtml=tableF;
	
	for(var i=0;i<data.length;i++){
		//卡片列表赋值
		$("#Inlist_mould .louname_s").html(data[i][0]);
		$("#Inlist_mould .cengcount").html(data[i][1]);
		$("#Inlist_mould .fangcount").html(data[i][2]);
		$("#Inlist_mould .chuangcount").html(data[i][3]);
		$("#Inlist_mould .stu_name").html(data[i][4]);
		$("#Inlist_mould .grade,#Inlist_mould .kaoqing").html(data[i][5]);
		$("#Inlist_mould .beizhu").html(data[i][6]);
		$("#joinbefor").before($("#Inlist_mould").html());
		var tablehtml="<tr><td class='one'><a class='qkychbox trn zi ' ischoose='0' id='ks_"+i+"'><i class='qkyicon'>&#xe69f;</i></a></td>";
		//表格列表赋值渲染
		for(var j=0;j<data[i].length;j++){
			tablehtml+="<td>"+data[i][j]+"</td>"
		}
		tablehtml+=tableE;
		$(".ssgl_lou_box .intable tbody").append(tablehtml);
		
	}
	qkychbox();
	listXr_add();//渲染增强
	listClose();//卡片和表格列表删除
	inEdit();//卡片编辑按钮
	inChoose();//卡片选择按钮
	allChoose();//卡片全选按钮
	footinbottom(".qky_header",".qky_content",".qky_footer");//整体渲染增强
}

//卡片选择按钮点击
function inChoose(){
	$(".pba.choose").each(function(i) {
		$(this).attr("isclick","no");
        $(this).click(function(){
			if($(this).attr("isclick")=="no"){
				$(this).parent().attr("ischoose","yes");
				$(this).attr("isclick","yes");
			}else{
				$(this).parent().attr("ischoose","no");
				$(this).attr("isclick","no");
			}
			$(this).toggleClass("on");
			$(this).parents(".ssgl_lou_list").find(".chooseMask").fadeToggle(200);
			
		});
    });
}

//大选择按钮（只能选择卡片列表）
function allChoose(){
	$("#allChoose").attr("isclick","no");
	$("#allChoose").click(function(){
		if($(this).attr("isclick")=="no"){
		$(".ssgl_lou_list[ischoose='no']").find(".chooseMask").fadeIn(200);
		$(".ssgl_lou_list[ischoose='no']").find(".pba.choose").addClass("on");
		$(".ssgl_lou_list[ischoose='no']").attr("ischoose","yes");
		$("#allChoose").attr("isclick","yes");
		}
		else{
		$(".ssgl_lou_list[ischoose='yes']").find(".chooseMask").fadeOut(200);
		$(".ssgl_lou_list[ischoose='yes']").find(".pba.choose").removeClass("on");
		$(".ssgl_lou_list[ischoose='yes']").attr("ischoose","no");
		$("#allChoose").attr("isclick","no");
		}
	});
	allClose();
}

//大删除按钮删除选中信息（只能删除卡片列表）
function allClose(){
	$("#allClose").click(function(){
		$(".ssgl_lou_list[ischoose='yes']").attr("isplay","no").hide();
		listXr_add();
		footinbottom(".qky_header",".qky_content",".qky_footer");
	});
}

//入住信息编辑
function inEdit(){
	$(".pba.edit,.cao.edit").each(function(i) {
        $(this).click(function(){
			popIn('#addInfo');
		});
    });
}

//卡片列表和表格列表转换
function carORtab(){
	$("#carORtab").attr("isclick","no");
	$("#carORtab").click(function(){
		$(".ssgl_nav").toggleClass("mb14");
		if($(this).attr("isclick")=="no"){
			$(this).html('<i class="qkyicon">&#xe649;</i>卡片模式');
			$("#carORtab").attr("isclick","yes");
			$(".ssgl_infocarbox").fadeOut(200);
			$(".ssgl_intablebox").fadeIn(300,function(){footinbottom(".qky_header",".qky_content",".qky_footer");});
		}else{
			$(this).html('<i class="qkyicon">&#xe613;</i>列表模式');
			$("#carORtab").attr("isclick","no");
			$(".ssgl_infocarbox").fadeIn(200);
			$(".ssgl_intablebox").fadeOut(300,function(){footinbottom(".qky_header",".qky_content",".qky_footer");});
		}
		qkychbox();
	});
}


/**************宿舍楼设置使用的函数***************/

//楼卡片列表渲染
function Xrloulist(data){
	for(var i=0;i<data.length;i++){
		$("#Loulist_mould .louname_s").html(data[i][0]);
		$("#Loulist_mould .cengcount").html(data[i][1]).attr("cengN",data[i][1]);
		$("#Loulist_mould .fangcount").html(data[i][2]*data[i][1]).attr("fangN",data[i][2]);
		$("#Loulist_mould .chuangcount").html(data[i][3]*data[i][1]*data[i][2]).attr("chuangN",data[i][3]);
		$("#joinbefor").before($("#Loulist_mould").html());
	}
	listXr_add();
	listClose();
	listEdit();
	footinbottom(".qky_header",".qky_content",".qky_footer");
}

//楼卡片增加
function listAdd(){
	$("#addLou").fadeOut(100);
	louname=$("#addLou #louname").val();
	cengnum=Number($("#addLou #cengnum").val());
	fangnum=Number($("#addLou #fangnum").val());
	chuangnum=Number($("#addLou #chuangnum").val());
	var adddata=[[louname,cengnum,fangnum,chuangnum]];
	Xrloulist(adddata);
}

//楼卡片列表渲染增强
function listXr_add(){
	$(".ssgl_lou_list[isplay='yes']").each(function(i) {
		$(this).removeClass("min");
		if((i+1)%3==2){
			$(this).addClass("min");
		}
    });
}

//楼卡片编辑
function listEdit(){
	//楼列表转楼内设置
	$(".pba.edit").each(function(i) {
        $(this).click(function(){
			var louname_s=$(this).parents(".ssgl_lou_list").find(".louname_s").html();
			var cengn=$(this).parents(".ssgl_lou_list").find(".cengcount").attr("cengN");
			var fangn=$(this).parents(".ssgl_lou_list").find(".fangcount").attr("fangN");
			var chuangn=$(this).parents(".ssgl_lou_list").find(".chuangcount").attr("chuangN");
			console.log(cengn,fangn,chuangn);
			Xrinlou(louname_s,cengn,fangn,chuangn);
            $(".ssgl_lou_box").fadeOut(100);
			$(".ssgl_inlou_box").fadeIn(250,function(){
				chuangadd();
				footinbottom(".qky_header",".qky_content",".qky_footer");
			});
		});
    });
	
	//楼内设置转楼列表
	$(".pba.back").click(function(){
		$(".ssgl_inlou_box").fadeOut(100);
		$(".ssgl_lou_box").fadeIn(250,function(){
				footinbottom(".qky_header",".qky_content",".qky_footer");
		});
	});
	
}

//宿舍楼内设置渲染
function Xrinlou(louname,cengn,fangn,chuangn){
	$(".inlouTit").html(louname).attr("cfc",fangn+"-"+chuangn);//楼名渲染
	cengn=Number(cengn);
	fangn=Number(fangn);
	chuangn=Number(chuangn);
	//楼层渲染
	var cenghtml="";
	for(var i=0;i<cengn;i++){
		$("#cenglist_mould b").html(i+1+"F").parent().attr("f",i+1);
		cenghtml+=$("#cenglist_mould").html();
	}
	$(".inlouL_down").html(cenghtml);
	$(".inlouL_down a").eq(0).addClass("cur");
	
	huanCeng();
	
	//宿舍渲染
	Xrfanglist(1,fangn,chuangn);
	fangadd();
	
}

//宿舍渲染
function Xrfanglist(cengnum,fangn,chuangn){
	
	$(".inlou_right .fangrq .sushe").html("");
	for(var i=0;i<fangn;i++){
		for(var j=0;j<chuangn;j++){
			var cn;
			if(j<10)
			cn="0"+(j+1);
			else cn=j+1; 
			$("#chuanglist_mould01 b").html(cn);
			$("#fanglist_mould .chuangbox .chuangrq").append($("#chuanglist_mould01").html());	
		}
		var fn=i+1;
		
		$("#fanglist_mould .txtone").html(cengnum+"0"+fn);
		if(fn%2==0){
			$(".inlou_right .fangrq .frr .sushe").append($("#fanglist_mould").html());
		}else{
			$(".inlou_right .fangrq .fll .sushe").append($("#fanglist_mould").html());
			}
		
		$("#fanglist_mould .chuangbox .chuangrq").html("");
	}
	
}

//楼层转换
function huanCeng(){
	$(".inlouL_down a").each(function(i) {
        $(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			var cfc=$(".inlouTit").attr("cfc").split("-");
			Xrfanglist(i+1,cfc[0],cfc[1]);
			 fangadd();
		});
    });
}



//宿舍房间添加
function fangadd(){
	var cfc=$(".inlouTit").attr("cfc").split("-");
	var ceng=$(".inlouL_down a.cur").attr("f");
	var cfc1=Number(cfc[0]);
	
	$(".fadd").click(function(){
		cfc1++;
		console.log(cfc1,cfc[1]);
		Xrfanglist(ceng,cfc1,cfc[1]);
		chuangadd();
		fangjian("sig");
	});
	fangjian("all");
}

//宿舍房间删除
function fangjian(ty){
	
		if(ty=="all"){
			//宿舍房x按钮显示
			$(".fjian").click(function(){
				$(this).parents(".fangrq").find(".inlouR_list .ss_close").toggle();
			});
		
			//宿舍房x按钮点击
			$(".inlouR_list").each(function(d) {
				$(this).find(".ss_close").click(function(){
					$(this).parent().hide();
				});
			});
	   }else{
			//宿舍房x按钮点击
			$(".inlouR_list").each(function(d) {
				$(this).find(".ss_close").click(function(){
					$(this).parent().hide();
				});
			});
		}
}

//床位添加
function chuangadd(){
	$(".chuangbox").each(function(i) {
        $(this).find(".add").click(function(){
			var chuangsig='<a class="chuanglist fl"><i class="qkyicon">&#xe73b;</i><input type="text" value="09"  id="chuangnum" class="addinput chuangin"  onkeyup="this.value=this.value.replace(/\D/gi,"")"><span><img src="images/chuangclose.png"></span></a>';
			$(this).before(chuangsig);
			$(this).parent().find(".chuanglist").not( $(".chooseon") ).find("span").hide();
			chuangjian("sig");
		});
    });
	chuangjian("all");
}

//床位删除
function chuangjian(ty){
	if(ty=="all"){
		//床位x按钮显示
		$(".chuangbox").each(function(i) {
			$(this).find(".jian").click(function(){
				$(this).parent().find(".chuanglist").not( $(".chooseon") ).find("span").toggle();
			});
		});
		//床位x按钮点击
		$(".chuanglist").each(function(d) {
			$(this).find("span").click(function(){
				$(this).parent().hide();
			});
		});
	}else{
		//床位x按钮点击
		$(".chuanglist").each(function(d) {
			$(this).find("span").click(function(){
				$(this).parent().hide();
			});
		});
	}
}






