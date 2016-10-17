// JavaScript Document
 
function Xrech(barid,pieid,datas){
	var bar_labels =["总数"];
	var bar_values =[0];
	var pie_labels =new Array();
	var pie_values = new Array();
	for(var keys in datas){
		bar_values[0]+=datas[keys][0];
	}
	for(var key in datas){
		bar_labels.push(key);
		pie_labels.push(key);
		bar_values.push(datas[key][0]);
		pie_values.push({value:datas[key][0],name:key,itemStyle:{normal:{color:datas[key][1]}}});
	}	 
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart_bar = echarts.init(document.getElementById(barid));
	var myChart_pie = echarts.init(document.getElementById(pieid));
	option_bar = {
			tooltip : {trigger:'axis',axisPointer :{type : 'shadow'}},
			grid:{left: '4%',right: '4%',bottom: '6%',top: '10%',containLabel: true},
			xAxis:[{axisLine:{lineStyle:{color:"#737373"}},type:'category',data:bar_labels,axisTick:{alignWithLabel:true}}],
			yAxis:[{axisLine:{lineStyle:{color:"#2eadb7"}},type:'value',splitArea:{show:true,areaStyle:{color:["#def2fb","#cde9f6"]}},splitLine:{show:false}}],
			series : [
				{
					name:'教师人数',
					type:'bar',
					barWidth: '40%',
					itemStyle:{normal:{color:"#2eadb7"}},
					data:bar_values,
					label:{normal:{show:true,textStyle:{color:"#737373",fontSize:14},position:"top"}}
				}
			]
	};	
	option_pie = {
			tooltip : {trigger: 'item',formatter: "{b}{a} : {c}<br/>  ({d}%)"},
			//legend: {orient: 'vertical',left: 'right',data: pie_labels},
			series : [
				{
					name: '教师人数',
					type: 'pie',
					radius : '60%',
					startAngle:0,
					center: ['50%', '50%'],
					data:pie_values,
					label:{normal:{formatter:"{b}\n{c}人({d}%)",show:true,textStyle:{color:"#666"}}},
					labelLine:{normal:{smooth:true,lineStyle:{color:"#666"}}},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
	};
    // 使用刚指定的配置项和数据显示图表。
    myChart_bar.setOption(option_bar);
	myChart_pie.setOption(option_pie);
}

        
		
		