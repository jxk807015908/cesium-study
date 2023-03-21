import {RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/imageryProvider',
    meta: {
      title: '叠加影像地图服务'
    },
    component: () => import('../views/imageryProvider/index.vue'),
  },
  {
    path: '/test',
    meta: {
      title: '测试'
    },
    component: () => import('../views/test/index.vue'),
  },
]

export default routes