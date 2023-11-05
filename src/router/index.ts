// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/dashboard.vue'),
      },
    ],
  },
  {
    path: '/groups',
    children: [
      {
        path: '',
        name: 'groups',
        component: () => import('@/layouts/groups.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/groups.vue'),
          },
        ],
      },
      {
        path: ':id',
        name: 'group',
        component: () => import('@/layouts/group.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/group.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/apps',
    children: [
      {
        path: ':id',
        component: () => import('@/layouts/app.vue'),
        children: [
          {
            path: '',
            name: 'app',
            component: () => import('@/views/app.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
