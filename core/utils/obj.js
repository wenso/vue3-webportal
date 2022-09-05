
/**
 * 深度复制对象数据
 * @param obj
 * @returns {any}
 */
export const deepClone=(obj) => {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 获取数组中元素对象，防止越界异常
 * @param arr 数组
 * @param index 索引
 * @returns {null|*}
 */
export const getArrObj=(arr,index)=>{
    if(arr) {
        if (arr.length > index) {
            return arr[index]
        }else{
            //越界返回null
            return null;
        }
    }
    //空数据返回null
    return null;
}

/**
 * 对象是否为空
 * @param obj
 * @returns {boolean}
 */
export const isEmpty=(obj) => {
    if(typeof obj === "undefined" || obj === null || obj === ""){
        return true;
    }else{
        return false;
    }
}


export const isRangeTime=(val,start,end)=>{
    if(!isEmpty(val)){
        if(isEmpty(start)&&isEmpty(end)){
            return true;
        }else{
            if(isEmpty(start)){
                return new Date(val)<=new Date(end)
            }else if(isEmpty(end)){
                return new Date(val)>=new Date(start)
            }else{
                return new Date(val)<=new Date(end)&&new Date(val)>=new Date(start);
            }
        }
    }
    return false;
}
/**
 * 是否符合单选条件
 * @param val 当前数据值
 * @param target  条件值
 * @returns {boolean}
 */
export const isSelected=(val,target)=>{
    if(!isEmpty(val)){
        if(isEmpty(target)){
            return true;
        }else{
            if(val===target){
                return true;
            }else{
                return false;
            }
        }
    }
    return false;
}
/**
 * 是否包含对应的字符
 * @param val 数据值
 * @param targe 条件值
 * @returns {boolean}
 */
export const isInclude=(val,target)=> {
    if (!isEmpty(val)) {
        if(isEmpty(target)){
            return true
        }else{
            return val.indexOf(target) != -1
        }
    }else{
        return target===val
    }
}



export const isEmptyObj =(obj) =>{
    let storeObj=JSON.parse(JSON.stringify(obj));
    if(Object.keys(storeObj)>0){
        return false;
    }
    return true;
}