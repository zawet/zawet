// JavaScript Document


/*渲染图表视图：不支持<ie9
 id（渲染到那个元素);
 */
function Xrech(id,datas,ipt){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}
	 
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart = echarts.init(document.getElementById(id));
		option = {
			
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},formatter:"{b}"
			},
			grid: {
				left: '1%',
				right: '4%',
				bottom: '0',
				top: '30%',
				containLabel: true
			},
			xAxis : [
				{
					axisLine:{
						lineStyle:{
							color:"#ccc"
						}
					},axisLabel:{show:false},axisTick:{show:false},splitLine:{show:false},
					type : 'category',
					data : labels,
					
				}
			],
			yAxis : [
				{	axisLabel:{show:false},axisTick:{show:false},splitLine:{show:false},
					axisLine:{show:false,lineStyle:{color:"#999"}},
					type : 'value'
				}
			],
			series : [
				{
					name:ipt["dw"],
					type:'bar',
					barWidth: '60%',
					barMinHeight:"40",
					itemStyle:{
						normal:{
							color:ipt["zhucolor"]
						}
					},
					label:{normal:{show:true,position:"top",textStyle:{color:ipt["zicolor"]},formatter:"{c}{a}"}},
					data:values
				}
			]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}

        
		
		