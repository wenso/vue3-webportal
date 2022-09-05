import {createStore} from "vuex";

const files = import.meta.globEager('./modules/*.js')
const modules = {}
Object.keys(files).forEach(key => {
    const keyName = key.replace(/(\.\/modules\/|\.js)/g, '');
    modules[keyName] = files[key].default;
    modules[keyName]['namespaced'] = true;
})

export const registerModule=(stores)=>{
    Object.keys(stores).forEach(key=>{
        store.registerModule(key,stores[key]);
    })
}

export const store=createStore({
    modules
});

export default store;