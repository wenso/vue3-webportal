import {
    Starter,
    app
} from "../core/index";
import 'element-plus/theme-chalk/index.css'
import '@core/theme/reset.css'
import {mergedSettings} from "../core/utils/setting";
import settings from "./config/index";
import {setupMockServer} from '@core/mock'
import {store,registerModule} from '@core/store'
import router from '@core/router'
import SocketIO from '@core/plugins/io'
import stores from './store'
import mocks from './mock'
import 'virtual:svg-icons-register'
import SvgIcon from '@core/base/components/icon/SvgIcon'
import * as Icons from '@element-plus/icons-vue'
window.constant = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_GATEWAY_URL: import.meta.env.VITE_GATEWAY_URL
};

const options={
    settings:mergedSettings(settings),
    store:store,
    router:router,
    socket:SocketIO
}
//注册src的stores
registerModule(stores);
//是否启动本地mock服务
setupMockServer(mocks);

app.use(Starter,options);

app.component('svg-icon', SvgIcon);

for (const name in Icons) {
    app.component(name, Icons[name]);
}
app.mount('#app')
