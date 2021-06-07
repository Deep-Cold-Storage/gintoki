import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Items from '../views/Items.vue';
import Outh from '../views/Outh.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
  },
  {
    path: '/outh',
    name: 'Outh',
    component: Outh,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
