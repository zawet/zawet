// JavaScript Document


/*渲染图表视图：不支持<ie9
 id（渲染到那个元素);
 c_name（数据类型名字）;
 main_data（主要数据）;
 color（颜色数组【主要色，区域颜色，提示框颜色】）;
 y_m（渲染哪年哪月的数据有格式要求 如2016_7）;
 showsday(数据从当月几号开始渲染);不填就从1号开始渲染
 showeday(数据从当月几号结束渲染);不填就渲染到本月最后一天
 */
function Xrech(id,datas){
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
				}
			},
			grid: {
				left: '4%',
				right: '16%',
				bottom: '0',
				top: '16%',
				containLabel: true
			},
			xAxis : [
				{	name:'学生姓名',
					nameTextStyle:{
						fontWeight:'700',
						color:'#666',
						fontSize:'14'
					},
					axisLine:{
						lineStyle:{
							color:"#999"
						}
					},
					type : 'category',
					data : labels,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis : [
				{	name:'家访次数',
					nameTextStyle:{
						fontWeight:'700',
						color:'#666',
						fontSize:'14'
					},
					axisLine:{
						lineStyle:{
							color:"#999"
						}
					},
					type : 'value'
				}
			],
			series : [
				{
					name:'被家访次数',
					type:'bar',
					barWidth: '60%',
					itemStyle:{
						normal:{
							color:"#8cd03e"
						}
					},
					
					data:values
				}
			]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}


function Xrech2(id,datas){
	
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push(datas[key]);
	}
	//console.log(labels,values);
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart = echarts.init(document.getElementById(id));
		option = {
			tooltip : {
				trigger: 'axis',axisPointer : {type : 'shadow'},extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
				 formatter: function (params) {
				//console.log(params[0]);
				//console.log(params[0].name.split("\n")[2]);
				var pm=params[0].name.split("\n");
				var nhtml="<span class='fz_16 fz_we co_ye mr4'>[ "+pm[0]+" ]</span>"+params[0].seriesName+"："+params[0].data+"<br/>";
				for(var i=1;i<=pm.length-1;i++){
					nhtml+=pm[i]+"次<br/>";
				}
                return nhtml;
            }
			},
			grid: {
				left: '2%',right: '5%',bottom: '0',top: '16%',containLabel: true
			},
			xAxis:[{
				name:'班级',
				nameTextStyle:{fontWeight:'700',color:'#666',fontSize:'14'},
				axisLine:{lineStyle:{color:"#999"}},
				type : 'category',
				data : labels,
				axisTick: {alignWithLabel: true},
				axisLabel:{formatter:'{value}'}
			}],
			yAxis:[{
				name:'家访次数',
				nameTextStyle:{fontWeight:'700',color:'#666',fontSize:'14'},
				axisLine:{lineStyle:{color:"#999"}},
				type : 'value'
			}],
			series:[
				{name:"家访总次数",type:'bar',barWidth: '50%',itemStyle:{normal:{color:"#8cd03e"}},data:values}
			]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}
        
		
		