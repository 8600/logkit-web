import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Runner from './views/Runner.vue'
import Collection from './views/Collection.vue'
import Reader from './collection/log/Reader.vue'
import Parser from './collection/log/Parser.vue'
import Cluster from './cluster/Index.vue'
import Sender from './collection/Sender.vue'
import Confirm from './collection/Confirm.vue'
import Transformer from './collection/log/Transformer.vue'
import Metric from './collection/info/Metric.vue'
import Keys from './collection/info/Keys.vue'
import Option from './collection/info/Option.vue'
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/collect',
          component: Runner,
          children: [
            {
              path: '/',
              name: 'collection',
              component: Collection,
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
            },
            {
              path: '/metric',
              name: 'metric',
              component: Metric,
            },
            {
              path: '/keys',
              name: 'keys',
              component: Keys,
            },
            {
              path: '/option',
              name: 'option',
              component: Option,
            }
          ]
        },
        {
          path: '/cluster',
          component: Runner,
          children: [
            {
              path: '/',
              name: 'cluster',
              component: Cluster,
            }
          ]
        },
        {
          path: '/machine',
          component: Runner
        }
      ]
    }
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
