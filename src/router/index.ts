// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'index',
    redirect: { name: 'dashboard', replace: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
  },
  {
    path: '/groups',
    children: [
      {
        path: '',
        name: 'groups',
        component: () =>
          import(/* webpackChunkName: "groups" */ '@/views/groups/index.vue'),
      },
      {
        path: ':id',
        name: 'group',
        component: () =>
          import(/* webpackChunkName: "group" */ '@/views/groups/[id].vue'),
      },
    ],
  },
  {
    path: '/apps',
    children: [
      {
        path: ':id',
        name: 'app',
        component: () =>
          import(/* webpackChunkName: "app" */ '@/views/apps/[id].vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
