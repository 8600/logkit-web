import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      server: ''
    },
    logConfig: {
      name: 'test',
      batch_interval: 60,
      batch_size: '209715',
      cleaner: {}
    }
  },
  mutations: {
    setConfig (state, payload) {
      state.config = payload.data
      console.log('存储设置:', state.config)
    },
    setLogConfig (state, payload) {
      console.log('设置配置:', payload.data)
      for (let key in payload.data) {
        state.logConfig[key] = payload.data[key]
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
