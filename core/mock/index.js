import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const files=import.meta.globEager('./modules/*.js')
const modules=[];

//遍历文件列表，将模块节点添加到数组
Object.keys(files).forEach(key => {
    modules.push(...files[key].default)
})

export const setupMockServer=(mocks)=>{
    modules.concat(mocks);
    createProdMockServer(modules);
}

export default {setupMockServer};