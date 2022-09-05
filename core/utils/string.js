import moment from "moment";
import {isEmpty} from "./obj";

/**
 * 格式化带时区的日期
 */
function formatDate(date) {
    let arr = date.split("T");
    let d = arr[0];
    let darr = d.split('-');
    let t = arr[1];
    let tarr = t.split('.000');
    let marr = tarr[0].split(':');
    let dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
    return formatDateTime(dd);
}

function formatDateTime(date) {
    let time = new Date(Date.parse(date));
    time.setTime(time.setHours(time.getHours() + 8));
    let Y = time.getFullYear() + '-';
    let M = addZero(time.getMonth() + 1) + '-';
    let D = addZero(time.getDate()) + ' ';
    let h = addZero(time.getHours()) + ':';
    let m = addZero(time.getMinutes()) + ':';
    let s = addZero(time.getSeconds());
    return Y + M + D;
}
function addZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * 字符串转换为YYYY-MM-DD时间格式
 * @param str
 * @returns {string|null}
 */
export const toDateTime=(str)=>{
    if(str){
        return moment(str).format("YYYY-MM-DD")
    }
    return null;
}
/**
 *
 * @param start
 * @param end
 * @returns {[undefined, undefined]|*[]}
 */
export const toRangDate=(start,end)=>{
    if(isEmpty(start)&&isEmpty(end)){
        return [];
    }else{
        return [start,end];
    }
}