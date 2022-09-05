import {createI18n} from "vue-i18n";
import Store from '@store'
import Router from '@router'
import elementEnLocale from 'element-plus/es/locale/lang/en'
import elementZhlocale from 'element-plus/es/locale/lang/zh-cn'
import enLocal from './en'
import zhLocal from './zh'

export const messages={
    'en':{
        ...enLocal,
        ...elementEnLocale
    },
    'zh-cn':{
        ...zhLocal,
        ...elementZhlocale
    }
}

export default createI18n({
    locale:Store.getters.language,
    messages
})