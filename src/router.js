import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Runner from './views/Runner.vue'
import DataTable from './views/DataTable.vue'
import Reader from './views/Reader.vue'
import Parser from './views/Parser.vue'
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
          path: '/runner',
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
