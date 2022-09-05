<template>
  <div class="chart-box">
    <div class="chart-btns">
      <el-radio-group v-model="state.timeType" @change="checkedTimeTypeChange" size="small">
        <el-radio-button :label=1>今日</el-radio-button>
        <el-radio-button :label=2>本周</el-radio-button>
        <el-radio-button :label=3>本月</el-radio-button>
        <el-radio-button :label=4>全年</el-radio-button>
      </el-radio-group>
    </div>
    <div id="container1" style="width: 100%; height: 100%"></div>
  </div>

  <div class="chart-box">
    <div class="chart-btns">
      <el-radio-group v-model="state.timeType" @change="checkedTimeTypeChange" size="small">
        <el-radio-button :label=1>今日</el-radio-button>
        <el-radio-button :label=2>本周</el-radio-button>
        <el-radio-button :label=3>本月</el-radio-button>
        <el-radio-button :label=4>全年</el-radio-button>
      </el-radio-group>
    </div>
    <div id="container2" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "DeviceManage"
}
</script>

<script setup>

import * as echarts from 'echarts';
import chart from '@utils/chart';
import { reactive, ref, toRefs,onMounted } from 'vue'
const state=reactive({timeType:1});
onMounted (() =>{
  init();
})

const checkedTimeTypeChange = (value) => {
  state.timeType=value;
}
const buildChartA = () => {
  let result1 = {
    "msg": "success",
    "success": true,
    "code": "200",
    "data": [
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType": "类型1",
        "count": 5,
        "time": "2022-04-15"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType": "类型1",
        "count": 6,
        "time": "2022-04-16"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType": "类型1",
        "count": 8,
        "time": "2022-04-17"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "countType": "类型2",
        "count": 5,
        "time": "2022-04-15"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "countType": "类型2",
        "count": 7,
        "time": "2022-04-16"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "countType": "类型2",
        "count": 9,
        "time": "2022-04-17"
      }
    ]
  }

  const myEchartDiv1 = document.getElementById('container1')
  const myEchart1 = echarts.init(myEchartDiv1)
  //构建封装数据

  //构建默认配置数据
  const option = chart.makeEchartBarOptions(result1.data, "设备检测信息", "time", true);
  //增加辅助线
  chart.addEchartMarkLine(option.series, "早班  晚班", '2022-04-16');

  //取消图例点击事件
  myEchart1.on('legendselectchanged', (params) => {
    // 阻止默认事件（原理就是将点击的图例重新选中）
    myEchart1.dispatchAction({
      type: 'legendSelect',
      name: params.name
    });
  });
  window.addEventListener("resize", function () {
    myEchart1.resize();
  });
  //生效配置
  myEchart1.setOption(option);
}

const buildChartB=()=>{
  let result2={
    "msg": "success",
    "success": true,
    "code": "200",
    "data": [

      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "ng":692,
        "ok":552,
        "time": "2022-04-15"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "ok":189,
        "ng":747,
        "time": "2022-04-16"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "ok":980,
        "ng":432,
        "time": "2022-04-17"
      }
    ]
  }
  let result3={
    "msg": "success",
    "success": true,
    "code": "200",
    "data": [
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType":"ok",
        "count": 20,
        "time": "2022-04-15"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType":"ok",
        "count": 10,
        "time": "2022-04-16"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254408",
        "countType":"ok",
        "count":8,
        "time": "2022-04-17"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "countType":"ng",
        "count":5,
        "time": "2022-04-15"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "countType":"ng",
        "count":7,
        "time": "2022-04-16"
      },
      {
        "deviceId": "310000197807145388",
        "productId": "210000201508254409",
        "count":9,
        "countType":"ng",
        "time": "2022-04-17"
      }
    ]
  }
  const myEchartDiv2 = document.getElementById('container2')
  const myEchart2 = echarts.init(myEchartDiv2)
  //构建封装数据

  //构建默认配置数据
  const option=chart.makeEchartDubbleLineOptions(result2.data,"检测NG/OK数统计","time",["ng","ok"]);
  //const option=chart.makeEchartLineOptions(result3.data,"检测NG/OK数统计","time");
  //增加辅助线
  chart.addEchartMarkLine(option.series,"早班  晚班",'2022-04-16');

  //取消图例点击事件
  myEchart2.on('legendselectchanged', (params) => {
    // 阻止默认事件（原理就是将点击的图例重新选中）
    myEchart2.dispatchAction({
      type: 'legendSelect',
      name: params.name
    });
  });
  window.addEventListener("resize",function(){
    myEchart2.resize();
  });
  //生效配置
  myEchart2.setOption(option);
}

const init=()=>{
  buildChartA();
  buildChartB();
}
</script>

<style scoped>
.chart-box{ position: relative; width:800px;  height: 320px; border: #ccc; background: #f4f4f4; border-radius: 4px;}
.chart-title{ position:absolute; left: 20px; top:16px; font-size: 16px; color: #333;}
.chart-btns { position: absolute; right: 20px; top:10px; z-index: 99999;}
.chart-btns span.el-radio-button__inner{ color:#999;}
.chart-canvas{ }
.chart-label-ly{ position: absolute; top:48px; left: 20px; font-size: 12px; color:#999}
.chart-label-ry{ position: absolute; top:48px; right: 20px; font-size: 12px; color:#999}
</style>