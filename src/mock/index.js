//导入modules目录文件
const files=import.meta.globEager('./modules/*.js')
let modules= [];

//遍历文件列表，将模块节点添加到数组
Object.keys(files).forEach(key => {
    modules.push(...files[key].default)
})

export default modules;