import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Runner from './views/Runner.vue'
import DataTable from './views/DataTable.vue'
import Reader from './views/Reader.vue'
import Parser from './views/Parser.vue'
import Sender from './views/Sender.vue'
import Confirm from './views/Confirm.vue'
import Transformer from './views/Transformer.vue'
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'runner',
          component: Runner,
          children: [
            {
              path: '/',
              name: 'dataTable',
              component: DataTable,
            },
            {
              path: '/reader',
              name: 'reader',
              component: Reader,
            },
            {
              path: '/parser',
              name: 'parser',
              component: Parser,
            },
            {
              path: '/transformer',
              name: 'transformer',
              component: Transformer,
            },
            {
              path: '/sender',
              name: 'sender',
              component: Sender,
            },
            {
              path: '/confirm',
              name: 'confirm',
              component: Confirm,
            }
          ]
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
