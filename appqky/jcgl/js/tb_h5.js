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
function Xrech(id,c_name,main_data,color,y_m,showsday,showeday){
	
	//生成横坐标的日期
	 var yr=Number(y_m.split("_")[0]);
	 var mo=Number(y_m.split("_")[1]);
	 var thismdays=DayNumOfMonth(yr,mo);
	 var rqdata=[];
	 for(var i=0;i<thismdays;i++){
		rqdata.push(yr+"/"+mo+"/"+(i+1));
	 }
	 
	 //计算渲染起始
	 var st,et;
	 if(showsday=='' || showsday==undefined || showsday==null){
		st=0;
	}else{
		st=Math.floor(((showsday-1)/thismdays)*100);
		}
	if(showeday=='' || showeday==undefined || showeday==null){
		et=100;
	}else{
		et=Math.floor((showeday/thismdays)*100);
		}
	 
	 
	 
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart = echarts.init(document.getElementById(id));
		option = {
			
			tooltip : {
				trigger: 'axis',
				backgroundColor:color[2]
			},
			
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid:{
				left: '6%',
				right: '8%',
				bottom: '14%',
				containLabel: true
				},
			dataZoom: [
			{
				type: 'inside',
				start:st,
				end: et
			}, 
			{
				start: st,
				end: et,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],	
			xAxis : [
				{
					type : 'category',
					boundaryGap : true,
					data: rqdata,
					axisTick:{
						show:false
					},
					axisLine:{
						lineStyle:{
							color:color[0],
							width:'3'
						}
					},
					axisLabel : {
						textStyle : {
							margin:4,
							color:'#888',
							fontSize:'14'
						}
					}
				},
				
			],
			yAxis : [
				{
					type : 'value',
					axisLine:{
						lineStyle:{
							color:color[0],
							width:'3'
						}
					},
					axisTick:{
						show:false
					},
					splitLine:{
						show: false
					},
					axisLabel : {
						textStyle : {
							color:'#fff',
							fontSize:'14'
						}
					}
				}
			],
			series : [
				
				{
					name:c_name,
					type:'line',
					symbolSize: 10,
					label: {normal: {show: true,position: 'top',color:'#b5c334'}},
					itemStyle:{normal: {color:color[0]}},
					areaStyle: {normal: {color:color[1]}},
					data: main_data,
					markLine: {
						data: [{type: 'average', name: '平均值'}],
						label: {
							normal: {
								show: true,
								position: 'start',
								textStyle : {
									color:'#888',
									fontSize:'14'
								}
							}
						},
						itemStyle:{normal: {color:color[0]}}
						
					}
				}
			]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}
        
		
		