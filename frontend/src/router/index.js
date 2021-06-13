import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue'),
  },
  {
    path: '/items/create',
    name: 'CreateItem',
    component: () => import(/* webpackChunkName: "items" */ '../views/CreateItem.vue'),
  },
  {
    path: '/items/:itemID',
    name: 'ViewItem',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "items" */ '../views/CreateItem.vue'),
  },
  {
    path: '/auth/:magicToken?',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
