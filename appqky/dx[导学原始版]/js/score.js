
var wcqks={"未完成":10,"已完成":35}
var wcqks={"未完成":14,"已完成":31}	
$(function(){
	wcqk_f(wcqks);yxfx_f(wcqks);
});


//完成情况分析
var pieChart2 = null;
function wcqk_f(datas){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}

	// 基于准备好的dom，初始化echarts图表
	if(!pieChart2){
		pieChart2 = echarts.init(document.getElementById('wcqk'));
	}
	
	var labelTop = {
		normal : {
			borderColor: '#fff',
			borderWidth: 2,
			label : {
				show : true,
				position : '',
				formatter : '{b}',
				textStyle: {
					baseline : 'bottom',
					fontSize:16
				}
			},
			labelLine : {
				show : true,
				lineStyle:{
					color:'#000'
					}
			}
		}
	};
	//调色

	var labelTop2 = $.extend(true,{},labelTop);
	var labelTop3 = $.extend(true,{},labelTop);
	labelTop2.normal.color =labelTop2.normal.label.textStyle.color=labelTop2.normal.labelLine.lineStyle.color='#ed9678';
	labelTop3.normal.color =labelTop3.normal.label.textStyle.color=labelTop3.normal.labelLine.lineStyle.color='#c8e49c';
	
	option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
	 legend: {
        orient : 'vertical',
        x : 'left',
        data:['未完成','已完成']
    },
    calculable : true,
    series : [
        
        {
            name:'完成情况分析',
            type:'pie',
            radius : [82,116],
			center:['50%','50%'],
            data:[
                {value:values[1], name:labels[1],itemStyle :labelTop3},
                {value:values[0], name:labels[0],itemStyle :labelTop2},
                

            ]
        }
    ]
};
		// 为echarts对象加载数据 
	pieChart2.setOption(option); 
}

//预习情况分析
var yxfxChart = null;
function yxfx_f(datas){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}

	// 基于准备好的dom，初始化echarts图表
	if(!yxfxChart){
		yxfxChart = echarts.init(document.getElementById('ycfx'));
	}
	
	var labelTop = {
		normal : {
			borderColor: '#fff',
			borderWidth: 2,
			label : {
				show : true,
				position : '',
				formatter : '{b}',
				textStyle: {
					baseline : 'bottom',
					fontSize:16
				}
			},
			labelLine : {
				show : true,
				lineStyle:{
					color:'#000'
					}
			}
		}
	};
	//调色

	var labelTop2 = $.extend(true,{},labelTop);
	var labelTop3 = $.extend(true,{},labelTop);
	labelTop2.normal.color =labelTop2.normal.label.textStyle.color=labelTop2.normal.labelLine.lineStyle.color='#fe9616';
	labelTop3.normal.color =labelTop3.normal.label.textStyle.color=labelTop3.normal.labelLine.lineStyle.color='#44b7d3';
	
	option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
	 legend: {
        orient : 'vertical',
        x : 'left',
        data:['未完成','已完成']
    },
    calculable : true,
    series : [
        
        {
            name:'完成情况分析',
            type:'pie',
            radius : [82,116],
			center:['50%','50%'],
            data:[
                 {value:values[1], name:labels[1],itemStyle :labelTop3},
                {value:values[0], name:labels[0],itemStyle :labelTop2}
               

            ]
        }
    ]
};
		// 为echarts对象加载数据 
	yxfxChart.setOption(option); 
}



