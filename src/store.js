import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      server: ''
    },
    logConfig: {
      cleaner: {}
    }
  },
  mutations: {
    setConfig (state, payload) { // 设置当前焦点元素
      state.config = payload.data
      console.log('存储设置:', state.config)
    },
    setLogConfig (state, payload) { // 设置当前焦点元素
      for (let key in payload.data) {
        state.logConfig[key] = payload.data.key
      }
    } 
  },
  actions: {
    setConfig ({commit, state}, payload) {
      commit({
        type: 'setConfig',
        data: payload.data
      })
    },
    setLogConfig ({commit, state}, payload) {
      commit({
        type: 'setLogConfig',
        data: payload.data
      })
    }  
  }
})
