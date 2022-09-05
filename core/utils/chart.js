
/**
 * 两个数字组织取和
 * @param arr
 * @param num
 * @return {*}
 */
const pushSum =(arr,num)=> {
    let index=arr.length-1;
    if(arr[index]!=undefined){
        arr[index]=(arr[index]+num);
    }else{
        arr.push(num);
    }
    return arr.length;
};
/**
 * 添加数组元素，如果存在不添加
 * @param arr
 * @param key
 * @return {*}
 */
const pushDuplicate=(arr,key)=>{
    if(arr.indexOf(key)<0){
        arr.push(key);
    }
    return arr.length;
};
/**
 * 整位取整
 * @param num
 * @return {number}
 */
const ceilNumber=(num)=>{
    let bite = 0;
    if(num < 10){
        return 10;
    }
    while( num >= 10 ){
        num /= 10;
        bite += 1;
    }
    return Math.ceil(num) * Math.pow(10,bite);
}
/**
 * 聚合数据生成以key值的新对象
 * @param data
 * @param key
 * @return {*}
 */
const groupBy=(data,key)=>{
    return data.reduce((prev,curr)=>{
        (prev[curr[key]]=prev[curr[key]]||[]).push(curr)
        return prev
    },{})
}
/**
 * 最大最小值数组
 * @param data
 * @param value
 * @return {*}
 */
const pushLimit=(data,value)=>{
    if(data[0]==undefined){
        data[0]=value;
    }
    if(data[1]==undefined){
        data[1]=value;
    }
    if (parseInt(data[0]) > parseInt(value)) {
        data[0] = value;
    }
    if (parseInt(data[1]) < parseInt(value)) {
        data[1] = value;
    }
    return data;
}
/**
 * 构建echart相关数据,格式countType，count
 * @param data
 * @param type
 * @return {{arr: *, chartData: {countData: *[]}, xData: *[], typeData: *[]}}
 */
const buildColumnData=(data,type)=>{
    let arr=groupBy(data,type);
    let xData=[],//x轴数据
        typeData=[],//图例数据
        chartData={ //chart数据
            countData:[], //chart数据和
            limit:[]
        };

    for(let key in arr){
        chartData.countData.push(0);
        xData.push(key);
        for(let obj in arr[key]){
            let element=arr[key][obj];
            pushDuplicate(typeData,element.countType);
            if(chartData[element.countType]==undefined){
                chartData[element.countType]=[];
            }
            chartData[element.countType].push(element.count);
            pushLimit(chartData.limit,element.count);
            pushSum(chartData.countData,element.count);

        }
    }
    return {arr,xData,typeData,chartData};
}
/**
 * 构建echart相关数据,格式key:count
 * @param data
 * @param type
 * @param keys
 * @return {{arr: *, chartData: {countData: *[]}, xData: *[], typeData}}
 */
const buildColumnKeysData=(data,type,keys)=>{
    let arr=groupBy(data,type);
    let xData=[],//x轴数据
        typeData=keys,//图例数据
        chartData={ //chart数据
            countData:[], //chart数据和
            limit:[]
        };

    for(let key in arr){
        chartData.countData.push(0);
        xData.push(key);
        typeData.forEach(function(v,i){
            let keysArr=[];
            for(let obj in arr[key]){
                let element=arr[key][obj];
                if(chartData[v]==undefined){
                    chartData[v]=[];
                }
                chartData[v].push(element[v]);
                pushLimit(chartData.limit,element[v]);
                pushSum(chartData.countData,element[v]);
            }
        })
    }
    return {arr,xData,typeData,chartData};
}


/**
 * 自定义echart数据提示
 * @param params
 * @return {string}
 */
const makeTooltip=(params)=>{
    let str = "";
    params.forEach(item=>{
        if(item.seriesName!=="sum"){
            str += "<span style='display: inline-block;width: 60px;'>"+item.marker+" "+ item.seriesName+"</span>:<span style='text-align: right;width:20px;display: inline-block'>"+item.value+"</span></br>"
        }
    })
    return str
}
/**
 * 生成anvt图标的叠加总计数据
 * @param data
 * @param type
 * @return {*[]}
 */
const buildAnnotations=(data,type)=>{
    const annotations = [];
    const arr=groupBy(data,type);
    for(let key in arr){
        let value=0;
        for(let i in arr[key]){
            value=arr[key][i].count+value;
        }
        annotations.push({
            type: 'text',
            position: [key, value],
            content: `${value}`,
            style: { textAlign: 'center', fontSize: 14, fill: 'rgba(0,0,0,0.85)' },
            offsetY: -10,
        });
    }
    return annotations;
}
/**
 * 拆分数据集，格式{countType:"",count:""}
 * @param data
 * @param types
 * @return {*[]}
 */
const splitData=(data,types)=>{
    let result=[];
    types.forEach(function(value,index){
        let typeArr=[];
        for(let i in data){
            if(data[i].countType==value){
                typeArr.push(data[i]);
                typeArr.push(data[i]);
            }
        }
        result.push(typeArr);
    })
    return result;
}
/**
 * 查询指定key在对象中的序列
 * @param obj
 * @param key
 * @return {number}
 */
const findObjIndex=(obj,key)=>{
    let index=0;
    for(let i in obj){
        if(i==key){
            return index;
        }
        index++;
    }
    return -1;
}
/**
 * 创建所有对象相同的数组
 * @param obj
 */
const buildSameArray=(obj,length)=>{
    let arr=[];
    for(let i=0;i<length;i++){
        arr.push(obj);
    }
    return arr;
}
/**
 * 构建Echart 柱形options数据
 * @param data
 * @param title
 * @param type
 * @param isSum
 * @return {{yAxis: [{axisLine: {lineStyle: {color: string}}, splitLine: {show: boolean}, type: string}], xAxis: [{data: *[], type: string}], grid: {top: number, borderWidth: number, bottom: number, textStyle: {color: string}}, legend: {top: number, data: *[], itemHeight: number, x: string, itemWidth: number, textStyle: {padding: number[], color: string, fontSize: number}}, series: *[], tooltip: {formatter: (function(*): string), axisPointer: {label: {show: boolean}, type: string}, trigger: string}, title: {top: number, left: number, text}}}
 */
const makeEchartBarOptions=(data,title,type,isSum)=>{
    let {arr,xData,typeData,chartData}=buildColumnData(data,type);
    let result= splitData(chartData,typeData);
    let option = {
        title: {
            text: title,
            left:10,
            top:16,
            fontSize:16
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            },
            formatter: makeTooltip
        },
        grid: {
            borderWidth: 0,
            top: 88,
            left:60,
            right:60,
            bottom: 40,
            color: "#fff",
        },
        legend: {
            x: "center",
            top: 16,
            itemHeight: 12,
            itemWidth:12,
            color: "#999",
            fontSize: 12,
            padding: [0, 0,-3, 0],
            data: typeData,
        },
        xAxis: [
            {
                type: "category",
                data: xData,
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "图片数量/片",
                splitLine: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                    },
                }
            },
        ],
        series:[]
    };
    //添加主数据
    typeData.forEach(function(v,i){
        let obj={
            name: v,
            type: "bar",
            stack: "总量",
            label: {
                show: false,
                position: "center",
                formatter: function (p) {
                    return p.value;
                },
            },
        }
        obj.data= chartData[v];
        option.series.push(obj);
    })
    if(isSum){
        //增加合计数据
        option.series.push({
            name: "sum",
            type: "bar",
            stack: "总量",
            barWidth : 30,
            label: {
                show: true,
                color:"#999",
                position: "insideBottom",
                formatter: function (p) {
                    return chartData.countData[findObjIndex(arr, p.name)];
                },
            },
            itemStyle: {
                color: 'rgba(128, 128, 128, 0)'
            },
            data:buildSameArray(1,chartData.countData.length)
        })
    }
    return option;
}

/**
 * 构建Echart 双轴折线图options数据
 * @param data
 * @param title
 * @param type
 * @param isSum
 * @return {{yAxis: [{axisLine: {lineStyle: {color: string}}, splitLine: {show: boolean}, type: string}], xAxis: [{data: *[], type: string}], grid: {top: number, borderWidth: number, bottom: number, textStyle: {color: string}}, legend: {top: number, data: *[], itemHeight: number, x: string, itemWidth: number, textStyle: {padding: number[], color: string, fontSize: number}}, series: *[], tooltip: {formatter: (function(*): string), axisPointer: {label: {show: boolean}, type: string}, trigger: string}, title: {top: number, left: number, text}}}
 */
const makeEchartDubbleLineOptions=(data,title,type,keys)=>{
    let {arr,xData,typeData,chartData}=buildColumnKeysData(data,type,keys);
    let option = {
        title: {
            text: title,
            left:10,
            top:16,
            fontSize:16
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            },
            formatter: makeTooltip
        },
        grid: {
            borderWidth: 0,
            top: 88,
            left:60,
            right:60,
            bottom: 40,
            color: "#fff",
        },
        legend: {
            x: "center",
            itemGap: 16,
            top: 16,
            itemHeight: 12,
            itemWidth:12,
            color: "#999",
            fontSize: 12,
            padding: [0, 0,-3, 0],
            data: typeData,
        },
        xAxis: [
            {
            type: "category",
            data: xData,
            //boundaryGap: false
            },
        ],
        yAxis: [
            {
                type: "value",
                name: typeData[0].toUpperCase()+"数量",
                min:0,
                max:ceilNumber(chartData.limit[1]),
                splitNumber: 5, //设置坐标轴的分割段数
                interval: ceilNumber(chartData.limit[1]) / 5,
                splitLine: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: '#999',
                    },
                }
            },{
                type: "value",
                name: typeData[1].toUpperCase()+"数量",
                min:0,
                max:ceilNumber(chartData.limit[1]),
                splitNumber: 5, //设置坐标轴的分割段数
                interval: ceilNumber(chartData.limit[1]) / 5,
                splitLine: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: '#999',
                    },
                }
            },
        ],
        series:[{
            name: typeData[0],
            type: "line",
            yAxisIndex:0,
            label: {
                show: true,
                color:'rgba(120, 210, 150, 1)',
                position: "top",
                formatter: function (p) {
                    return p.value;
                },
            },
            lineStyle: { // 设置线条的style等
                color: 'rgba(120, 210, 150, 1)', // 折线线条颜色:红色
            },
            itemStyle: {
                // 设置线条上点的颜色（和图例的颜色）
                color: 'rgba(120, 210, 150, 1)',
            },
            data:chartData[typeData[0]]
        }, {
            name: typeData[1],
            type: "line",
            yAxisIndex:1,
            label: {
                show: true,
                color:'rgba(220, 110, 120, 1)',
                position: "top",
                formatter: function (p) {
                    return p.value;
                },
            },
            lineStyle: { // 设置线条的style等
                color: 'rgba(220, 110, 120, 1)', // 折线线条颜色:红色
            },
            itemStyle: {
                // 设置线条上点的颜色（和图例的颜色）
                color: 'rgba(220, 110, 120, 1)',
            },
            data:chartData[typeData[1]]
        }]
    };

    return option;
}

/**
 * 构建Echart 双轴折线图options数据 countType:"",count:3
 * @param data
 * @param title
 * @param type
 * @param isSum
 * @return {{yAxis: [{axisLine: {lineStyle: {color: string}}, splitLine: {show: boolean}, type: string}], xAxis: [{data: *[], type: string}], grid: {top: number, borderWidth: number, bottom: number, textStyle: {color: string}}, legend: {top: number, data: *[], itemHeight: number, x: string, itemWidth: number, textStyle: {padding: number[], color: string, fontSize: number}}, series: *[], tooltip: {formatter: (function(*): string), axisPointer: {label: {show: boolean}, type: string}, trigger: string}, title: {top: number, left: number, text}}}
 */
const makeEchartLineOptions=(data,title,type)=>{
    let {arr,xData,typeData,chartData}=buildColumnData(data,type);
    let option = {
        title: {
            text: title,
            left:10,
            top:16,
            fontSize:16
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            },
            formatter: makeTooltip
        },
        grid: {
            borderWidth: 0,
            top: 88,
            left:60,
            right:60,
            bottom: 40,
            color: "#fff",
        },
        legend: {
            x: "center",
            itemGap: 16,
            top: 16,
            itemHeight: 12,
            itemWidth:12,
            color: "#999",
            fontSize: 12,
            padding: [0, 0,-3, 0],
            data: typeData,
        },
        xAxis: [
            {
                type: "category",
                data: xData,

                //boundaryGap: false //x轴留白
            },
        ],
        yAxis: [
            {
                type: "value",
                name: typeData[0].toUpperCase()+"数量",
                max:ceilNumber(chartData.limit[1]),
                splitNumber: 5, //设置坐标轴的分割段数
                interval: ceilNumber(chartData.limit[1]) / 5,
                splitLine: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                    },
                }
            },{
                type: "value",
                name: typeData[1].toUpperCase()+"数量",
                max:ceilNumber(chartData.limit[1]),
                splitNumber: 5, //设置坐标轴的分割段数
                interval: ceilNumber(chartData.limit[1]) / 5,
                splitLine: {
                    show: true,
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                    },
                }
            },
        ],
        series:[]
    };
    //添加主数据
    typeData.forEach(function(v,i){
        let obj={
            name: v,
            type: "line",
            yAxisIndex:i,
            label: {
                show: false,
                position: "center",
                formatter: function (p) {
                    return p.value;
                },
            },
        }
        obj.data= chartData[v];
        option.series.push(obj);
    })

    return option;
}
/**
 * 添加Echart MarkLine
 * @param series
 * @param label  line label
 * @param x 指定x坐标值
 */
const addEchartMarkLine=(series,label,x)=>{
    //增加辅助线
    if(series){
        series.push({
            type: "line",
            showSymbol: false,
            markLine: {
                symbol: 'none',
                label: {
                    formatter: label
                },
                data: [
                    {
                        name: "辅助线",
                        xAxis: x,
                        lineStyle: {
                            color: '#ccc',
                            type: "dashed",
                            width: 1
                        },
                    },
                ]
            }
        })
    }
}
export default {
    pushSum,
    pushDuplicate,
    buildColumnData,
    groupBy,
    buildAnnotations,
    splitData,
    findObjIndex,
    makeTooltip,
    makeEchartBarOptions,
    makeEchartLineOptions,
    makeEchartDubbleLineOptions,
    addEchartMarkLine
}