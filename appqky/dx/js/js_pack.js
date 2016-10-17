
// 框架动态尺寸
function resizeWin(){
  $("#menu").height($(window).height()-54+'px');
  $("#nav").height($(window).height()-93+'px');
  $("#main").height($(window).height()-54+'px').width($(window).width()-206+'px');
  $("#mainn iframe").height($(window).height()-83+'px');
  $("#timeout").height($(window).height());

};

function footinbottom(){
	var body_h=$(".content02").outerHeight()+$(".header").outerHeight()+$(".foot").outerHeight();
	if($(window).height()>=body_h){
		var foot_mt=$(window).height()-body_h;
	  $(".foot").css("margin-top",foot_mt+"px");
	}
	}
$(window).load(function(){
	resizeWin();
	popZise();
	$("#liulan_file").change(function(){  // 当 id 为 file 的对象发生变化时
		$("#lilan_txt").val($("#liulan_file").val());  //将 #file 的值赋给 #a 
 	});
	footinbottom();
});
//$(window).resize(function(){resizeWin();footinbottom();popZise()});
$(window).on('resize',function(){
	footinbottom();resizeWin();popZise();
});

// 输入框提示
function TxtOF(o){if(o.value==o.defaultValue){o.value='';o.style.color='#333'}};
function TxtOB(o){if(o.value==''){o.value=o.defaultValue;o.style.color='#666'}};

function PassOF(o){$(o).hide();$(o).prev('input').focus();};
function PassOB(o){if(o.value==''){$(o).next('b').show();}};


// 弹窗
function popOut(i){$(i).fadeOut('fast')};
function popIn(i){$(i).fadeIn('fast')};
function popZise(){$(".pop_bg").height($(window).height() > $(document.body).height() ? $(window).height() : ($(document.body).height())+40);};


// 站点设置
$(document).ready(function(){
  $('.stop li').click(function(){$(this).siblings().removeClass('cur');$(this).addClass('cur');})
});
//【tab切换】
function selectTag(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("tags").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	// 操作内容
	for(i=0; j=document.getElementById("tagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}
