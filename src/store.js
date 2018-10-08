import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      server: '',
      // 集群模式
      cluster: false
    },
    logConfig: {
      name: '',
      batch_interval: 60,
      batch_size: 2097152,
      collect_interval: 3,
      extra_info: false
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
    },
    clearLogConfig (state, payload) {
      state.logConfig = {
        name: '',
        batch_interval: 60,
        batch_size: 2097152,
        collect_interval: 3,
        extra_info: false
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
    },
    clearLogConfig ({commit, state}, payload) {
      commit({
        type: 'clearLogConfig',
        data: payload.data
      })
    }
  }
})
