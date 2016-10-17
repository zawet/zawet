// JavaScript Document

function datebuts(){
	$(".datebuts a").each(function(i) {
        $(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			$(".show_txt").html($(this).attr("txt"));
		});
    });
}

function toothtea(){
	$(".othtea_box .qkychbox").each(function(i) {
		$(this).click(function(){
			$("#othtea").html($(this).attr("value"));
		});
    });
}