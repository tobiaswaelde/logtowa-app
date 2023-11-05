// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
      },
    ],
  },
  {
    path: '/groups',
    name: 'groups',
    children: [
      {
        path: '',
        name: 'groups-list',
        component: () => import('@/layouts/groups.vue'),
        children: [
          {
            path: '',
            name: 'groups-list-view',
            component: () =>
              import(/* webpackChunkName: "groups" */ '@/views/groups.vue'),
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
            name: 'group-view',
            component: () =>
              import(/* webpackChunkName: "group" */ '@/views/group.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/apps',
    name: 'apps',
    children: [
      {
        path: ':id',
        name: 'app',
        component: () => import('@/layouts/app.vue'),
        children: [
          {
            path: '',
            name: 'app-view',
            component: () =>
              import(/* webpackChunkName: "app" */ '@/views/app.vue'),
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
