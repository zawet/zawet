// JavaScript Document
//此js主要用于档案添加、修改页面的交互和数据增加
var datas={
"jg_sheng":["请选择省级机构"],
"jg_shi":["请选择市级机构"],
"jg_xian":["请选择县级机构"],
"jg_zheng":["请选择镇级机构"],
"jg_school":["请选择学校","全通学校"],
"gj":["中国大陆"],
"mz":["汉族"],
"zzmm":["请选择", "中共党员","中共预备党员","共青团员","民革党员","民盟盟员","民建会员","民进会员","农工党党员", "致公党党员","九三学社社员","台盟盟员","无党派民主人士","群众","其他"],
"hyzk":["请选择","已婚","未婚","离异","丧偶"],
"gwlb":["请选择","管理岗位","教师岗位","工勤技能岗位","其他专业技能岗位"],
"szbm":["请选择","校长室","行政处","教务处","政教处","财务处","后勤处","语文组","数学组","英语组","政治组","历史组",
"地理组","物理组","化学组","生物组","音乐组","美术组","体育组","计算机组","通用组","其他"],
"xzzw":["请选择","校长","副校长","教导主任","招生办主任","政教处主任","教务处主任","团支部主任","年级主任","科组长","无","其他"],
"zgxl":["请选择","初中","高中","初中中专","高中中专","大专","本科","研究生"],
"zgxw":["请选择","学士","硕士","博士","无","其他"],

"zyjsgw":["请选择","副高级","中级","助理级","员级","未评级"],
"zyjszw":["请选择"],
"zyjszgzc":["请选择"],

"rksd":["请选择","幼儿园","小学","初中","高中"],
"xzycsjm":["请选择","语文","数学","英语","政治","历史","地理","物理","化学","生物","音乐","美术","体育","计算机","通用"],
"rkzt":["选择","基础课","专业课","选修课","其他"],
"jszcdj":["请选择","正高级教师","高级教师","一级教师","二级教师","三级教师"]
};

var zyjszw={
"请选择":["请选择","专业技术一级","专业技术二级","专业技术三级","专业技术四级"],
"副高级":["请选择","专业技术五级","专业技术六级","专业技术七级"],
"中级":["请选择","专业技术八级","专业技术九级","专业技术十级"],
"助理级":["请选择","专业技术十一级","专业技术十二级"],
"员级":["专业技术十三级"],
"未评级":["未评级"]
}
var zyjszgzc={
"请选择":["请选择"],
"副高级":["请选择","中学高级教师","小学副高级教师"],
"中级":["请选择","中学一级教师","小学高级教师","幼儿园高级教师"],
"助理级":["请选择","中学二级教师","小学一级教师","幼儿园一级教师"],
"员级":["请选择","中学三级教师","小学二级教师","幼儿园二级教师","小学三级教师","幼儿园三级教师"],
"未评级":["未评级"]
}

//执行函数
$(function(){
xr_option(datas);
qkychbox_sigle();
qkysel();
rlt_height(".main_bg.one",".main_bg.two");
var thisss;
$(".datetime").calendar({s_value:false,s_hssel:false},function(thiss,s_o,s_hs){
	cal_anmate(thiss,".timeicon",".qky_calendar");//交互动画事件
	});	
$(".dt_datetime").calendar({s_value:false,s_hssel:false},function(thiss,s_o,s_hs){});

cal_click(true,false,true);
qkysels(false);//提供下拉事件
cleardate();//清除日历事件

ldxr_option("#zyjsgw","#zyjszw",zyjszw);
ldxr_option("#zyjsgw","#zyjszgzc",zyjszgzc);

zhijin();
add_model(".addjc","#jc_model");
add_model(".addjl","#jl_model");


$(".jl_nav li").each(function(i) {
    $(this).click(function(){
		$(this).find("a").addClass("cur");
		$(this).siblings().find("a").removeClass("cur");
	});
});
jlnav();
});
$(window).on('resize',function(){
	jlnav();

});

//简历导航漂浮执行
function jlnav(){
	var w=$(window).width();
	var rw;
	if(w<=1000) rw=0;
	else rw=(w-1000)/2;
	$(".jl_nav").css("right",rw+"px");
}

//左右同高执行
function rlt_height(one,two){
	var h=$(one).outerHeight();
	$(two).css("height",h+"px");
}

//整体渲染下拉列表项
function xr_option(datass){
	for(var key in datass){
		$("#"+key).html("");
		for(var i=0;i<datass[key].length;i++){
			$("#"+key).append('<a class="option trn dian3 t_l" value="'+datass[key][i]+'">'+datass[key][i]+'</a>');
		}
		$("#"+key).parent().find(".selectON").html(datass[key][0]).attr("title",datass[key][0]);
	}
	
	//渲染年下拉列表
	for(var i=1970;i<2040;i++){
			$("#year").append('<a class="option trn dian3 t_l" value="'+i+'年">'+i+'年</a>');
	}
	$("#year").parent().find(".selectON").html("2016年").attr("title","2016年");
	//渲染月下拉列表
	for(var i=1;i<13;i++){
		var ii;
		if(i<10) ii="0"+i; else ii=i; 
		$("#moon").append('<a class="option trn dian3 t_l" value="'+ii+'月">'+ii+'月</a>');
	}
	$("#moon").parent().find(".selectON").html("08月").attr("title","08月");	
}

//联动渲染下拉列表项 selid联动点击执行id，id被联动的下拉选项容器，data_a联动数据
function ldxr_option(selid,id,data_a){
	$(selid).find("a").each(function(i) {
        $(this).click(function(){
			$(id).html("");
			var thiskey=$(this).parents(".selshow").find(".selectON").html();
			for(var i=0;i<data_a[thiskey].length;i++){
			$(id).append('<a class="option trn dian3 t_l" value="'+data_a[thiskey][i]+'">'+data_a[thiskey][i]+'</a>');
			}
			$(id).parent().find(".selectON").html(data_a[thiskey][0]).attr("title",data_a[thiskey][0]);
			idselclick(id);
		});
    });
}
//联动后补充选项点击执行函数
function idselclick(id){
	$(id+" a.option").each(function(j) {
		$(this).click(function(){
			$(this).parent().slideUp(200).parent().find(".selectON").attr("title",$(this).attr("value")).html($(this).attr("value"));
		}); 
	});
}

//增加模板（奖罚/个人履历）
function add_model(clickid,moid){
	$(clickid).click(function(){
		$(clickid).before($(moid).html());
		$(".dt_datetime").each(function(ie) {
			console.log($(this));
           cal_anmate($(this),".timeicon",".qky_calendar");//交互动画事件 
        });	
		qkysels(false);
		cal_click(true,false,true);
		cleardate();//清除日历事件
		jian();
		zhijin();
	});
}
//至今按钮
function zhijin(){
	$(".zhijin").each(function(i) {
		$(this).click(function(){
			$(this).prev().first().find(".caldate").val(toyear+"-"+tomoon+"-"+today);
		}); 
    });
}
//减模板
function jian(){
	$(".jian").each(function(i) {
        $(this).click(function(){
			$(this).parent().remove();
		});
    });
}

//保存按钮执行函数
function jl_submit(txt){
	var jl_pass;
	$("#jl_submit").click(function(){
		jl_pass=0;
		$(".bt").each(function(i) {
            if(isNull($(this).val())=="kong"){
				alert_msg_dl(txt,$(this).attr("er_mag"));
			}else{jl_pass++}
        });
		
		if($("#six_val .qkychbox.cur").length<=0){
			alert_msg_dl(txt,$("#six_val").attr("er_mag"));
		}else{jl_pass++}
		
		var jgval=$("#jg_val .selshow").eq(4).find(".selectON").html();
		if(isNull(jgval)=="kong"||jgval=="请选择学校"){
			alert_msg_dl(txt,$("#jg_val").attr("er_mag"));
		}else{jl_pass++}
		
		if(jl_pass==5){
			alert_msg_dl(txt,txt+"成功！",1);
		}
	});
}

//公用函数，判断一个字符串是否为空
function isNull(data){ 
return (data == "" || data == undefined || data == null) ? "kong" : data; 
}