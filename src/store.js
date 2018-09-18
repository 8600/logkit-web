import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      server: ''
    }
  },
  mutations: {
    setConfig (state, payload) { // 设置当前焦点元素
      state.config = payload.data
      console.log('存储设置:', state.config)
    }  
  },
  actions: {
    setConfig ({commit, state}, payload) {
      commit({
        type: 'setConfig',
        data: payload.data
      })
    }  
  }
})
