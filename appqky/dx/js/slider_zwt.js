// JavaScript Document
//滑动教材
    var swiper = new Swiper('.swiper-container', {
		prevButton:'.slide_but_l',
		nextButton:'.slide_but_r',
        slidesPerView: 4,
        freeMode: true
    });
	//收起或者展开教材
	$(".main_slide_but_box").click(function(){
		if($(this).find("span").text()=="收起"){
			$(".main_slide").slideUp(500);
			$(this).find("span").text("展开");
			$(this).find("img").attr("src","../images/daoxue/dx_book_down.png");
		}else{
			$(".main_slide").slideDown(500);
			$(this).find("span").text("收起");
			$(this).find("img").attr("src","../images/daoxue/dx_book_up.png");
		}
	});
	
	//点击教材管理时
	var manage_html='<div class="slidr_manage"><img src="../images/daoxue/dx_slider_manage.png"></div>';
	$(".slidr_box").before(manage_html);
	$(".wbut").click(function(){
		
		if($(this).attr("isclick")=="no"){
			$(".slidr_manage").fadeIn(300);
			$(this).attr("isclick","yes");	
		}else{
			var manage_html='';
			$(".slidr_manage").fadeOut(300);
			$(this).attr("isclick","no");
		}	
	});
	//点击教材红框时
    $(".slidr_manage").each(function(i) {
		$(this).click(function(){
			$(this).parent().fadeOut(300);
		});   
    });
	
	//点击教材添加后
	$(".mbb").click(function(){
			$("#join").fadeOut(300);
			var xk= $("#xk").find("option:selected").text(); 
			var nj= $("#nj").find("option:selected").text();
			var cs= $("#cs").find("option:selected").text();
			var bb= $("#bb").find("option:selected").text();
			addteach(xk,nj,cs,bb);
		}); 
	function addteach(xk,nj,cs,bb){
		var slider_html='<div class="slidr_manage"><img src="../images/daoxue/dx_slider_manage.png"></div><div class="swiper-slide"><div class="slidr_box" style="background:url(../images/daoxue/dx_gbook.png) no-repeat;"><div class="big_text">'+xk+'</div><div class="min_text">'+nj+cs+'</div><div class="s_text">'+bb+'</div></div></div>';
		$("#jointhis").before(slider_html);
		
		var swiper = new Swiper('.swiper-container', {
			prevButton:'.slide_but_l',
			nextButton:'.slide_but_r',
			slidesPerView: 4,
			freeMode: true
    	});
		
		
	}


