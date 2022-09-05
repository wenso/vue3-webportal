import Cache from '@core/utils/cache';
import {THEME_SET,LANGUAGE_SET,LOG_ADD,LOG_CLEAR} from "../mutations";


const getDefaultState = () => {
    return {
        theme:"default",
        language:"zh-cn",
        logger:[]
    }
}

const state = getDefaultState();
const actions = {

}

const getters = {
    theme: (state) => Cache.getLS("THEME")?Cache.getLS("THEME"):state.theme,
    language: (state) => Cache.getLS("LANGUAGE")?Cache.getLS("LANGUAGE"):state.language,
    logger:(state) =>Cache.getLS("LOGGER")
}

const mutations = {
    [THEME_SET](state,theme){
        state.theme = theme;
        Cache.setLS("THEME",theme);
    },
    [LANGUAGE_SET](state, lang){
        state.language = lang;
        Cache.setLS("LANGUAGE",lang);
    },
    [LOG_ADD](state,{type,message,stack,info}){
        state.logger.push(Object.assign({
            url: window.location.href,
            time: "format('YYYY-MM-DD HH:mm:ss')"
        }, {
            type,
            message,
            stack,
            info: info.toString()
        }))
        Cache.setLS("LOGGER",state.logger)
    },
    [LOG_CLEAR](state){
        state.logger=[];
        Cache.setLS("LOGGER",state.logger)
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}