import {tokens,users} from "@core/mock/token"
import error from "@core/mock/error"
import {isInclude, isRangeTime, isSelected} from "@core/utils/obj";
const service = 'api/system/'
const accountApi=[
    //搜索账号信息
    {
        url:service+'account/search',
        method: 'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.body;
            const info=users[authorization];
            if(!info){
                return error.noAuth
            }else{
                let userData=filterData(param);
                return Object.assign({},error.success,{data:userData});
            }
        }
    },
    //添加账号信息
    {
        url:service+'account/add',
        method:'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.body;
            const info=users[authorization];
            if(!info){
                return error.noAuth;
            }else{
                return error.success;
            }
        }
    },
    //编辑指定账号
    {
        url:service+'account/edit',
        method:'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.body;
            const info=users[authorization];
            if(!info){
                return error.noAuth;
            }else{
                return error.success;
            }
        }
    },
    //删除指定账号
    {
        url:service+'account/delete',
        method:'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.query;
            const info=users[authorization];
            if(!info){
                return error.noAuth;
            }else{
                return error.success;
            }
        }
    },
    //查看账号详情
    {
        url:service+'account/detail',
        method:'get',
        response:config=>{
            const {authorization}=config.headers;
            const id=config.query.id;
            const info=users[authorization];
            if(!info){
                return error.noAuth;
            }else{
                let user=getInfo(id)
                return Object.assign({},error.success,{data:user});
            }
        }
    }
]

/**
 * 获取对应id的数据
 * @param id
 * @returns {{}}
 */
function getInfo(id){
    let obj={};
    for(let i=0;i<data.length;i++){
        obj=data[i];
        if(data[i].id===id){
            break;
        }
    }
    return obj;
}


/**
 * 过滤数据
 * @param param 条件
 * @returns {*}  符合条件的数据
 */
function filterData(param){
    //符合条件的数据
    let tableData= [];
    //起始索引
    let startIndex=param.limit*(param.page-1);
    //结束索引
    let endIndex=startIndex+param.limit;
    for(let i=0;i<data.length;i++){
        let obj=data[i];
        //判断是否符合检索条件
        if(isInclude(obj.account,param.account)&&
            isInclude(obj.phone,param.phone)&&
            isSelected(obj.status,param.status)&&
            isRangeTime(obj.createTime,param.startTime,param.endTime))
        {
            //如果符合所有条件
            tableData.push(obj);
        }
    }
    //分页数据及分页信息
    let pageData= {
        total:tableData.length,
        limit:param.limit,
        page:param.page,
        list:[]
    }
    //过滤掉索引范围之外的数据
    for(let n=0;n<tableData.length;n++){
        if(n>=startIndex&&n<endIndex){
            //如果在起始和截至索引之间
            pageData.list.push(tableData[n]);
        }
    }
    return pageData;
}



//账号列表示例数据
const data=[{
        age:18,
        sex:1,
        status:'active',
        createTime:'2021-09-22 10:12:33',
        phone:'135****0240',
        roles:[2],
        account:"wenso",
        realName:"祝融",
        id:'22D34G564H3F'
    },{
        age:19,
        sex:1,
        status:'active',
        createTime:'2021-09-26 10:12:33',
        phone:'135****0240',
        roles:[1],
        account:'admin',
        realName:"黄帝",
        id:'12D34G564H4F'
    },{
        age:28,
        sex:0,
        status:'lock',
        createTime:'2021-09-28 21:12:34',
        phone:'135****0240',
        roles:[2,3],
        account:"kity",
        realName:"雅典娜",
        id:'32D34G564H5F'
    }
]
export default accountApi;