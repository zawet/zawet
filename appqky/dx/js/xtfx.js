
var xtdata={"成绩":83,"成绩":17}	
$(function(){
	xt_f(xtdata);xt_f2(xtdata);
});

	var labelTop = {
    normal : {
		color:'#ffcc33',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
        },
        labelLine : {
            show : false
        }
    }
};
	var labelTop2 = {
    normal : {
		color:'#33ccff',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
				color:'#ffcc33',
				fontSize:20,
                baseline : 'middle'
            }
        }
    },
}
var labelFromatter2 = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
				color:'#33ccff',
				fontSize:20,
                baseline : 'middle'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#f1f1f1',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [50,74];

//完成情况分析
var xtChart = null;
function xt_f(datas){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}

	// 基于准备好的dom，初始化echarts图表
	if(!xtChart){
		xtChart = echarts.init(document.getElementById('xt_stucyl'));
	}

	option = {
	calculable : true,
    series : [
        {
            type : 'pie',
            center : ['50%', '50%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:47.4, itemStyle : labelBottom},
                {name:'', value:52.6,itemStyle : labelTop}
            ]
        }
    ]
};
		// 为echarts对象加载数据 
	xtChart.setOption(option); 
}

//完成情况分析
var xtChart2 = null;
function xt_f2(datas){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}

	// 基于准备好的dom，初始化echarts图表
	if(!xtChart2){
		xtChart2 = echarts.init(document.getElementById('xt_ctl'));
	}
	option = {
		calculable : true,
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter2,
				
				data : [
					{name:'other', value:13.7, itemStyle : labelBottom},
					{name:'', value:86.2,itemStyle : labelTop2}
				]
			}
		]
};
		// 为echarts对象加载数据 
	xtChart2.setOption(option); 
}

