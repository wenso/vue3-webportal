import {createStore} from "vuex";

//导入modules目录文件
const files=import.meta.globEager('./modules/*.js')
let modules= {};

//遍历文件列表，将模块节点添加到数组
Object.keys(files).forEach(key => {
    const keyName = key.replace(/(\.\/modules\/|\.js)/g, '')
    modules[keyName] = files[key].default;
    modules[keyName]['namespaced'] = true;
})

export default modules;




