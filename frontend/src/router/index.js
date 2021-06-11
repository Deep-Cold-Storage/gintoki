import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Items from '../views/Items.vue';
import Auth from '../views/Auth.vue';

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
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
