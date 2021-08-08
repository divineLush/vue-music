import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    path: '/manage',
    component: Manage,
  },
  {
    path: '/manage-music',
    // same object passed inside router-links
    redirect: { name: 'manage' },
  },
  {
    // using regex to redirect users to home in case of 404
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  // the process object is a Node object that is globally available in all modules
  // it contains information about the current server
  // BASE_URL property is created by Vue CLI
  // BASE_URL can be configures in Vue UI
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

export default router;
