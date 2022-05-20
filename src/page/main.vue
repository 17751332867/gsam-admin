<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row>
            <el-col :span="11">
                <el-card>
                    <div style="width: 500px;height: 500px"></div>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="11">
                <el-card>
                    <div style="width: 500px;height: 500px"></div>
                </el-card>
            </el-col>
            <el-col :span="11">
                <el-card>
                    <div id="url" style="width: 500px;height: 500px"></div>
                </el-card>
            </el-col>
            <el-col :offset="1" :span="11">
                <el-card>
                    <div id="time" style="width: 500px;height: 500px"></div>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import headTop from '../components/headTop'
import {getTimeCountList, getUrlCountList} from "../api/getData";
export default {
    name: "main",
    components: {
        headTop,
    },
    data(){
        return{
            urlCountList:[],
            urlCountListX:[],
            timeCountList:[]
        }
    },methods:{
        drawTime(data){
            var chartDom = document.getElementById('time');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '访问数',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '时间:访问数',
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        },
        drawUrl(x,d){
            console.log(document.getElementById('url'))
            var myChart = echarts.init(document.getElementById('url'));
            var option;
            let data = d
            let dataAxis = x
            let yMax = 500;
            let dataShadow = [];
            for (let i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }
            option = {
                title: {
                    text: '模块访问情况',
                },
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        inside: true,
                        color: '#fff'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999'
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ])
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ])
                            }
                        },
                        data: data
                    }
                ]
            };
            const zoomSize = 10;
            myChart.on('click', function (params) {
                console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue:
                        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                });
            });

            option && myChart.setOption(option);
        },
        init(){
            this.urlCountListX = []
            this.urlCountList = []
            this.timeCountList = []
            getUrlCountList().then(res=>{
                res.data.forEach(data=>{
                    this.urlCountListX.push(data.url)
                    this.urlCountList.push(data.cnt)
                })
                this.drawUrl(this.urlCountListX,this.urlCountList)
            })
            getTimeCountList().then(res=>{
                res.data.forEach(data=>{
                    if(data.cnt==0)return;
                    this.timeCountList.push({name:data.hour+"",value:data.cnt})
                })
                console.log(this.timeCountList)
                this.drawTime(this.timeCountList)
            })
        }
    },mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>

</style>
