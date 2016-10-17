
var xtdata={"成绩":83,"成绩":17}	
$(function(){
	xt_f(xtdata);
});


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
		xtChart = echarts.init(document.getElementById('xt_data'));
	}
	
	var labelTop = {
    normal : {
		color:'#ff9900',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
				fontSize:16,
                baseline : 'middle'
            }
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
				fontSize:26,
                baseline : 'middle'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
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
var radius = [50,76];
	
	option = {
	
    calculable : false,
    series : [
        {
            type : 'pie',
            center : ['50%', '50%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:17, itemStyle : labelBottom},
                {name:'', value:83,itemStyle : labelTop}
            ]
        }
    ]
};
		// 为echarts对象加载数据 
	xtChart.setOption(option); 
}

